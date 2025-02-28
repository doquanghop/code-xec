package utils

import (
	"context"
	"errors"
	"fmt"
	"os/exec"
)

func GetFileExtension(language string) string {
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

func GetExecutionCommand(ctx context.Context, language, filePath, input string) (*exec.Cmd, error) {
	switch language {
	case "python":
		return exec.CommandContext(ctx, "docker", "exec", "code-exec-container", "bash", "-c", fmt.Sprintf("echo '%s' | python3 %s", input, filePath)), nil
	case "c":
		return exec.CommandContext(ctx, "docker", "exec", "code-exec-container", "bash", "-c", fmt.Sprintf("gcc -std=c99 %s -o /app/code.out && echo '%s' | /app/code.out", filePath, input)), nil
	case "cpp":
		return exec.CommandContext(ctx, "docker", "exec", "code-exec-container", "bash", "-c", fmt.Sprintf("g++ %s -o /app/code.out && echo '%s' | /app/code.out", filePath, input)), nil
	case "java":
		return exec.CommandContext(ctx, "docker", "exec", "code-exec-container", "bash", "-c", fmt.Sprintf("javac %s && echo '%s' | java -cp /app Main", filePath, input)), nil
	default:
		return nil, errors.New("unsupported language or file type")
	}
}
