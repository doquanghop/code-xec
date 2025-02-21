package routes

import (
	"execution-service/handler"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.POST("/execute", handler.ExecuteCode)
	}
}
