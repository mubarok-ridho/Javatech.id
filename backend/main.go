package main

import (
	"log"
	"time"

	"javatech-backend/handlers"
	"javatech-backend/middleware"
	"javatech-backend/websocket"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize WebSocket hub
	hub := websocket.NewHub()
	go hub.Run()

	r := gin.Default()

	// Advanced CORS middleware
	r.Use(middleware.CORS())

	// Rate limiting
	r.Use(middleware.RateLimit(100, time.Minute))

	// Security headers
	r.Use(middleware.SecurityHeaders())

	// Static files
	r.Static("/uploads", "./uploads")

	// API routes
	api := r.Group("/api")
	{
		api.GET("/services", handlers.GetServices)
		api.GET("/stats", handlers.GetStats)
		api.GET("/projects", handlers.GetProjects)
		api.GET("/team", handlers.GetTeam)
		api.GET("/testimonials", handlers.GetTestimonials)
		api.GET("/analytics", handlers.GetAnalytics)
		api.POST("/contact", handlers.Contact)
		api.POST("/newsletter", handlers.NewsletterSubscribe)
	}

	// WebSocket endpoint
	r.GET("/ws", func(c *gin.Context) {
		websocket.ServeWs(hub, c.Writer, c.Request)
	})

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":    "healthy",
			"timestamp": time.Now(),
			"version":   "1.0.0",
		})
	})

	log.Println("🚀 Server running on :8080")
	r.Run(":8080")
}
