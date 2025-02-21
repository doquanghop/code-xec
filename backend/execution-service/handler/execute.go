package handler

import (
	"bytes"
	"context"
	"errors"
	"execution-service/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os/exec"
	"time"
)

const timeoutPerTest = 2 * time.Second

func ExecuteCode(c *gin.Context) {
	var req models.ExecuteRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fileName := fmt.Sprintf("code.%s", getFileExtension(req.Language))
	filePath := fmt.Sprintf("/app/%s", fileName)

	// Ghi code vào file trong container
	cmdWrite := exec.Command("docker", "exec", "-i", "code-exec-container", "bash", "-c", fmt.Sprintf("cat > %s", filePath))
	cmdWrite.Stdin = bytes.NewReader([]byte(req.Code))
	if err := cmdWrite.Run(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to write code"})
		return
	}

	var results []models.ExecuteResponse
	var totalTimeUsed float64

	for i, testCase := range req.TestCases {
		start := time.Now()
		ctx, cancel := context.WithTimeout(context.Background(), timeoutPerTest)

		var cmd *exec.Cmd
		switch req.Language {
		case "python":
			cmd = exec.CommandContext(ctx, "docker", "exec", "code-exec-container", "python3", filePath)
		case "c":
			cmd = exec.CommandContext(ctx, "docker", "exec", "code-exec-container", "bash", "-c", fmt.Sprintf("gcc %s -o /app/code.out && /app/code.out", filePath))
		case "cpp":
			cmd = exec.CommandContext(ctx, "docker", "exec", "code-exec-container", "bash", "-c", fmt.Sprintf("g++ %s -o /app/code.out && /app/code.out", filePath))
		case "java":
			cmd = exec.CommandContext(ctx, "docker", "exec", "code-exec-container", "bash", "-c", fmt.Sprintf("javac %s && java -cp /app code", filePath))
		default:
			cancel()
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unsupported language"})
			return
		}

		var out bytes.Buffer
		cmd.Stdout = &out

		err := cmd.Run()
		cancel()

		timeUsed := time.Since(start).Seconds()
		totalTimeUsed += timeUsed

		if errors.Is(err, context.DeadlineExceeded) {
			results = append(results, models.ExecuteResponse{
				TestCaseIndex: i,
				Output:        "Timeout error",
				Expected:      testCase.Output,
				TimeUsed:      timeUsed,
				Passed:        false,
			})
			continue
		}

		if err != nil {
			results = append(results, models.ExecuteResponse{
				TestCaseIndex: i,
				Output:        "Execution failed",
				Expected:      testCase.Output,
				TimeUsed:      timeUsed,
				Passed:        false,
			})
			continue
		}

		actualOutput := out.String()
		passed := actualOutput == testCase.Output
		results = append(results, models.ExecuteResponse{
			TestCaseIndex: i,
			Output:        actualOutput,
			Expected:      testCase.Output,
			TimeUsed:      timeUsed,
			Passed:        passed,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"totalTimeUsed": totalTimeUsed,
		"results":       results,
	})
}

func getFileExtension(language string) string {
	switch language {
	case "python":
		return "py"
	case "c":
		return "c"
	case "cpp":
		return "cpp"
	case "java":
		return "java"
	default:
		return "txt"
	}
}
