package main

import (
	"net/http"
	"time"

	"javatech-backend/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	// Setup Gin dengan mode release
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	// Advanced CORS configuration
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length, Content-Range")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// API Routes Supercharged
	api := r.Group("/api")
	{
		api.GET("/services", handlers.GetServices)
		api.GET("/stats", handlers.GetStats)
		api.GET("/projects", handlers.GetProjects)
		api.GET("/team", handlers.GetTeam)
		api.POST("/contact", handlers.Contact)
		api.GET("/testimonials", handlers.GetTestimonials)
		api.GET("/tech-stack", handlers.GetTechStack)
	}

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":    "healthy",
			"timestamp": time.Now(),
			"service":   "Javatech Backend",
			"version":   "1.0.0",
		})
	})

	// Start server dengan configuration optimal
	server := &http.Server{
		Addr:         ":8080",
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	println("🚀 Javatech Super Backend running on :8080")
	println("⭐ Health check: http://localhost:8080/health")
	server.ListenAndServe()
}
