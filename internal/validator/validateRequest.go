package validator

import (
	"errors"
	"execution-service/models"
	"fmt"
)

func ValidateRequest(req models.ExecuteRequest) error {
	validLanguages := map[string]bool{
		"python": true,
		"c":      true,
		"cpp":    true,
		"java":   true,
	}

	if !validLanguages[req.Language] {
		return fmt.Errorf("unsupported programming language: %s", req.Language)
	}

	if req.Code == "" {
		return errors.New("code cannot be empty")
	}

	if len(req.TestCases) == 0 {
		return errors.New("test cases cannot be empty")
	}

	for i, testCase := range req.TestCases {
		if testCase.Input == "" {
			return fmt.Errorf("test case %d: input cannot be empty", i)
		}
		if testCase.Output == "" {
			return fmt.Errorf("test case %d: expected output cannot be empty", i)
		}
	}

	return nil
}
