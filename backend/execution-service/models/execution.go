package models

type ExecuteRequest struct {
	Language  string     `json:"language"`
	Code      string     `json:"code"`
	TestCases []TestCase `json:"testCases"`
}
type TestCase struct {
	Input  string `json:"input"`
	Output string `json:"output"`
}
type ExecuteResponse struct {
	TestCaseIndex int     `json:"testCaseIndex"`
	Output        string  `json:"output"`
	Expected      string  `json:"expected"`
	TimeUsed      float64 `json:"timeUsed"`
	Passed        bool    `json:"passed"`
}
