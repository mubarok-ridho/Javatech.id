package main

import (
	"javatech-backend/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Setup CORS
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Routes
	r.GET("/api/services", handlers.GetServices)
	r.GET("/api/stats", handlers.GetStats)
	r.GET("/api/projects", handlers.GetProjects)
	r.GET("/api/team", handlers.GetTeam)
	r.POST("/api/contact", handlers.Contact)

	r.Run(":8080")
}
