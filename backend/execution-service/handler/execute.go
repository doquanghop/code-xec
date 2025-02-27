package handler

import (
	"bytes"
	"context"
	"errors"
	"execution-service/models"
	"execution-service/utils"
	"execution-service/validator"
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
	if err := validator.ValidateRequest(req); err != nil {
		HandleError(c, models.ErrBadRequest, err.Error())
		return
	}

	fileName := fmt.Sprintf("code.%s", utils.GetFileExtension(req.Language))
	filePath := fmt.Sprintf("/app/%s", fileName)

	cmdWrite := exec.Command("docker", "exec", "-i", "code-exec-container", "bash", "-c", fmt.Sprintf("cat > %s", filePath))
	cmdWrite.Stdin = bytes.NewReader([]byte(req.Code))

	if err := cmdWrite.Run(); err != nil {
		HandleError(c, models.ErrServerBusy, err.Error())
		return
	}

	var failedResult *models.ExecuteResponse
	var totalTimeUsed float64

	totalTestCases := len(req.TestCases)
	passedTestCases := 0

	for i, testCase := range req.TestCases {
		start := time.Now()
		ctx, cancel := context.WithTimeout(context.Background(), timeoutPerTest)

		cmd, errCmd := utils.GetExecutionCommand(ctx, req.Language, filePath, testCase.Input)
		if errCmd != nil {
			cancel()
			HandleError(c, models.ErrUnsupportedLanguage)
			return
		}

		var out bytes.Buffer
		cmd.Stdout = &out

		err := cmd.Run()
		cancel()

		timeUsed := time.Since(start).Seconds()
		totalTimeUsed += timeUsed

		var output string
		passed := false

		if errors.Is(err, context.DeadlineExceeded) {
			failedResult = &models.ExecuteResponse{
				TestCaseIndex: i,
				Output:        "Timeout",
				Expected:      testCase.Output,
				TimeUsed:      timeUsed,
				Passed:        false,
			}
			break
		} else if err != nil {
			failedResult = &models.ExecuteResponse{
				TestCaseIndex: i,
				Output:        "Execution Error",
				Expected:      testCase.Output,
				TimeUsed:      timeUsed,
				Passed:        false,
			}
			break
		}

		output = out.String()
		normalizedOutput := normalizeOutput(output)
		normalizedExpected := normalizeOutput(testCase.Output)
		passed = normalizedOutput == normalizedExpected

		if !passed {
			failedResult = &models.ExecuteResponse{
				TestCaseIndex: i,
				Output:        output,
				Expected:      testCase.Output,
				TimeUsed:      timeUsed,
				Passed:        false,
			}
			break
		} else {
			passedTestCases++
		}
	}

	status := "Failed"
	httpStatus := http.StatusUnprocessableEntity

	if failedResult == nil {
		status = "Passed"
		httpStatus = http.StatusOK
	}

	response := models.ApiResponse{
		Status:          status,
		Language:        req.Language,
		TotalTimeUsed:   totalTimeUsed,
		TotalMemoryUsed: 0,
		TotalTestCases:  totalTestCases,
		PassedTestCases: passedTestCases,
		FailedResult:    failedResult,
	}

	c.JSON(httpStatus, response)
}
