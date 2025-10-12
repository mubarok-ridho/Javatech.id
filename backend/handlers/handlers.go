package handlers

import (
	"math/rand"
	"net/http"
	"time"

	"javatech-backend/models"

	"github.com/gin-gonic/gin"
)

func GetServices(c *gin.Context) {
	services := []models.Service{
		{
			ID:          1,
			Icon:        "📱",
			Title:       "Mobile App Development",
			Description: "Pengembangan aplikasi mobile native dan cross-platform dengan performa optimal dan UX terbaik.",
			Features:    []string{"iOS & Android", "React Native/Flutter", "Offline Capability", "Push Notification"},
			Color:       "from-purple-500 to-blue-500",
		},
		{
			ID:          2,
			Icon:        "🌐",
			Title:       "Web Development",
			Description: "Pembuatan website dan aplikasi web modern dengan teknologi terdepan dan arsitektur scalable.",
			Features:    []string{"React/Next.js", "Node.js/Golang", "Microservices", "Cloud Deployment"},
			Color:       "from-green-500 to-teal-500",
		},
		{
			ID:          3,
			Icon:        "🤖",
			Title:       "AI Development",
			Description: "Solusi kecerdasan buatan dan machine learning untuk automasi dan optimasi proses bisnis.",
			Features:    []string{"Computer Vision", "NLP", "Predictive Analytics", "Custom AI Models"},
			Color:       "from-orange-500 to-red-500",
		},
		{
			ID:          4,
			Icon:        "🔌",
			Title:       "IoT Development",
			Description: "Integrasi hardware dan software IoT untuk smart solutions dan real-time monitoring.",
			Features:    []string{"Sensor Networks", "Real-time Dashboard", "Edge Computing", "Predictive Maintenance"},
			Color:       "from-blue-500 to-cyan-500",
		},
		{
			ID:          5,
			Icon:        "☁️",
			Title:       "Cloud Solutions",
			Description: "Infrastructure cloud dan DevOps untuk skalabilitas dan keandalan sistem.",
			Features:    []string{"AWS/Azure/GCP", "Kubernetes", "CI/CD Pipeline", "Monitoring & Logging"},
			Color:       "from-indigo-500 to-purple-500",
		},
		{
			ID:          6,
			Icon:        "🛡️",
			Title:       "Cybersecurity",
			Description: "Proteksi sistem dan data dengan solusi keamanan berlapis dan monitoring 24/7.",
			Features:    []string{"Penetration Testing", "Security Audit", "Threat Detection", "Compliance"},
			Color:       "from-red-500 to-pink-500",
		},
	}

	c.JSON(http.StatusOK, gin.H{
		"data": services,
		"meta": gin.H{
			"total":   len(services),
			"version": "1.0",
		},
	})
}

func GetAnalytics(c *gin.Context) {
	// Simulate real analytics data
	analytics := models.Analytics{
		MonthlyRevenue: []models.RevenueData{
			{Month: "Jan", Revenue: 45000, Projects: 12},
			{Month: "Feb", Revenue: 52000, Projects: 15},
			{Month: "Mar", Revenue: 48000, Projects: 14},
			{Month: "Apr", Revenue: 61000, Projects: 18},
			{Month: "May", Revenue: 58000, Projects: 16},
			{Month: "Jun", Revenue: 72000, Projects: 22},
		},
		ServiceDistribution: []models.ServiceDistribution{
			{Service: "Mobile Dev", Percentage: 35, Color: "#3B82F6"},
			{Service: "Web Dev", Percentage: 25, Color: "#10B981"},
			{Service: "AI/ML", Percentage: 20, Color: "#F59E0B"},
			{Service: "IoT", Percentage: 15, Color: "#EF4444"},
			{Service: "Cloud", Percentage: 5, Color: "#8B5CF6"},
		},
		RealTimeStats: models.RealTimeStats{
			ActiveUsers:    rand.Intn(1000) + 500,
			ActiveProjects: rand.Intn(50) + 25,
			ServerLoad:     rand.Intn(30) + 40,
			ResponseTime:   rand.Float64()*10 + 20,
		},
	}

	c.JSON(http.StatusOK, gin.H{
		"data":      analytics,
		"timestamp": time.Now(),
	})
}

func GetTestimonials(c *gin.Context) {
	testimonials := []models.Testimonial{
		{
			ID:       1,
			Name:     "Budi Santoso",
			Company:  "TechCorp Indonesia",
			Position: "CTO",
			Image:    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
			Content:  "Javatech mengembangkan sistem IoT yang revolusioner untuk pabrik kami. Efisiensi meningkat 40%!",
			Rating:   5,
			Project:  "Smart Factory IoT",
		},
		{
			ID:       2,
			Name:     "Sarah Wijaya",
			Company:  "FinTech Plus",
			Position: "Product Manager",
			Image:    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
			Content:  "Mobile app yang dikembangkan Javatech sangat smooth dan user-friendly. User engagement naik 3x!",
			Rating:   5,
			Project:  "Finance Mobile App",
		},
		{
			ID:       3,
			Name:     "Ahmad Rizki",
			Company:  "RetailChain Group",
			Position: "Operations Director",
			Image:    "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
			Content:  "AI inventory system dari Javatech mengurangi waste kami sebesar 25%. Highly recommended!",
			Rating:   4,
			Project:  "AI Inventory System",
		},
	}

	c.JSON(http.StatusOK, gin.H{
		"data":  testimonials,
		"total": len(testimonials),
	})
}
