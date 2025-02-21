package handler

import (
	"execution-service/models"

	"github.com/gin-gonic/gin"
)

func HandleError(c *gin.Context, err models.CustomError, details ...interface{}) {
	response := gin.H{"error": err.Message}
	if len(details) > 0 {
		response["details"] = details
	}
	c.JSON(err.Code, response)
}
