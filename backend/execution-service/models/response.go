package models

type ApiResponse struct {
	TotalTimeUsed float64           `json:"totalTimeUsed"`
	Results       []ExecuteResponse `json:"results"`
}
