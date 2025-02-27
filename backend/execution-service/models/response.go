package models

type ApiResponse struct {
	Status          string           `json:"status"`
	Language        string           `json:"language"`
	TotalTimeUsed   float64          `json:"totalTimeUsed"`
	TotalMemoryUsed int64            `json:"totalMemoryUsed"`
	TotalTestCases  int              `json:"totalTestCases"`
	PassedTestCases int              `json:"passedTestCases"`
	FailedResult    *ExecuteResponse `json:"FailedResult"`
}
