package models

import "net/http"

type CustomError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

var (
	ErrBadRequest          = CustomError{Code: http.StatusBadRequest, Message: "Invalid request payload"}
	ErrUnsupportedLanguage = CustomError{Code: http.StatusBadRequest, Message: "Unsupported programming language"}
	ErrExecutionFailed     = CustomError{Code: http.StatusInternalServerError, Message: "Execution failed"}
	ErrTimeout             = CustomError{Code: http.StatusGatewayTimeout, Message: "Execution timeout"}
	ErrTestCaseFailed      = CustomError{Code: http.StatusInternalServerError, Message: "Test case failed"}
)
