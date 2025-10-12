package handlers

import (
	"fmt"
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
			Description: "Pengembangan aplikasi mobile native dan cross-platform dengan performa optimal dan UX yang memukau.",
			Features:    []string{"iOS & Android", "React Native/Flutter", "Performance Optimization", "App Store Deployment"},
			Color:       "from-purple-500 to-blue-500",
		},
		{
			ID:          2,
			Icon:        "🌐",
			Title:       "Web Development",
			Description: "Pembuatan website dan aplikasi web modern dengan architecture terbaik dan teknologi cutting-edge.",
			Features:    []string{"React/Next.js", "Node.js/Golang", "Microservices", "Cloud Deployment"},
			Color:       "from-green-500 to-teal-500",
		},
		{
			ID:          3,
			Icon:        "🤖",
			Title:       "AI Development",
			Description: "Integrasi kecerdasan buatan dan machine learning untuk automasi dan optimasi proses bisnis.",
			Features:    []string{"Machine Learning", "Computer Vision", "NLP", "Predictive Analytics"},
			Color:       "from-orange-500 to-red-500",
		},
		{
			ID:          4,
			Icon:        "🔌",
			Title:       "IoT Development",
			Description: "Solusi end-to-end Internet of Things dari hardware design hingga cloud integration.",
			Features:    []string{"Sensor Networks", "Edge Computing", "Real-time Dashboard", "Hardware Design"},
			Color:       "from-indigo-500 to-purple-500",
		},
	}

	// Simulate loading for better UX
	time.Sleep(300 * time.Millisecond)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    services,
		"meta": map[string]interface{}{
			"total":   len(services),
			"version": "1.0",
		},
	})
}

func GetStats(c *gin.Context) {
	stats := []models.Stat{
		{Number: "250+", Label: "Proyek Selesai", Icon: "🚀", Change: "+15%"},
		{Number: "80+", Label: "Klien Enterprise", Icon: "🏢", Change: "+25%"},
		{Number: "40+", Label: "Developer Expert", Icon: "👨‍💻", Change: "+10%"},
		{Number: "7+", Label: "Tahun Pengalaman", Icon: "⭐", Change: "+1"},
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    stats,
	})
}

func GetProjects(c *gin.Context) {
	projects := []models.Project{
		{
			ID:          1,
			Title:       "Smart Factory IoT",
			Description: "Sistem IoT comprehensive untuk automasi pabrik dengan real-time monitoring dan predictive maintenance.",
			Image:       "https://images.unsplash.com/photo-1581094794329-cd0b302b91d1?w=600&h=400&fit=crop",
			Category:    "IoT Development",
			Status:      "Completed",
			TechStack:   []string{"React", "Golang", "MQTT", "TensorFlow"},
			Progress:    100,
		},
		{
			ID:          2,
			Title:       "AI-Powered Healthcare Platform",
			Description: "Platform healthcare dengan diagnosa AI, telemedicine, dan manajemen data pasien terintegrasi.",
			Image:       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
			Category:    "AI Development",
			Status:      "In Progress",
			TechStack:   []string{"Python", "FastAPI", "React Native", "PostgreSQL"},
			Progress:    75,
		},
		{
			ID:          3,
			Title:       "Enterprise E-Commerce Suite",
			Description: "Solusi e-commerce enterprise dengan microservices architecture dan real-time analytics.",
			Image:       "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
			Category:    "Web Development",
			Status:      "Completed",
			TechStack:   []string{"Next.js", "Node.js", "MongoDB", "Redis"},
			Progress:    100,
		},
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    projects,
	})
}

func GetTeam(c *gin.Context) {
	team := []models.TeamMember{
		{
			ID:         1,
			Name:       "Dr. Ahmad Rizki, S.Kom, M.T",
			Position:   "Chief Technology Officer",
			Image:      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
			Expertise:  "Cloud Architecture & IoT",
			Experience: "12+ Years",
			Social:     map[string]string{"linkedin": "#", "github": "#", "twitter": "#"},
		},
		{
			ID:         2,
			Name:       "Sari Dewi, M.Sc",
			Position:   "Lead AI Research",
			Image:      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
			Expertise:  "Machine Learning & Data Science",
			Experience: "8+ Years",
			Social:     map[string]string{"linkedin": "#", "github": "#", "twitter": "#"},
		},
		{
			ID:         3,
			Name:       "Budi Santoso, S.Kom",
			Position:   "Senior Mobile Developer",
			Image:      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=200&h=200&fit=crop&crop=face",
			Expertise:  "React Native & Flutter",
			Experience: "6+ Years",
			Social:     map[string]string{"linkedin": "#", "github": "#", "twitter": "#"},
		},
		{
			ID:         4,
			Name:       "Maya Wijaya, S.Ds",
			Position:   "Head of Product Design",
			Image:      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
			Expertise:  "UI/UX & Design System",
			Experience: "7+ Years",
			Social:     map[string]string{"linkedin": "#", "github": "#", "twitter": "#"},
		},
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    team,
	})
}

func GetAnalytics(c *gin.Context) {
	// Generate mock analytics data
	analytics := models.Analytics{
		Revenue: models.ChartData{
			Labels: []string{"Jan", "Feb", "Mar", "Apr", "May", "Jun"},
			Data:   []int{45000, 52000, 48000, 61000, 75000, 82000},
		},
		Projects: models.ChartData{
			Labels: []string{"Web", "Mobile", "AI", "IoT"},
			Data:   []int{45, 30, 15, 10},
		},
		Clients: models.ChartData{
			Labels: []string{"Q1", "Q2", "Q3", "Q4"},
			Data:   []int{15, 22, 18, 25},
		},
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    analytics,
	})
}

func Contact(c *gin.Context) {
	var request models.ContactRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid request data",
			"details": err.Error(),
		})
		return
	}

	// Simulate processing
	time.Sleep(500 * time.Millisecond)

	// Generate ticket number
	ticketNumber := fmt.Sprintf("JVT-%06d", rand.Intn(1000000))

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Pesan berhasil dikirim! Tim kami akan menghubungi Anda dalam 1x24 jam.",
		"data": map[string]interface{}{
			"ticket_number": ticketNumber,
			"submitted_at":  time.Now(),
			"priority":      "Normal",
		},
	})
}

func NewsletterSubscribe(c *gin.Context) {
	var request struct {
		Email string `json:"email" binding:"required,email"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Email tidak valid",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Terima kasih telah berlangganan newsletter Javatech!",
		"data": map[string]interface{}{
			"email":      request.Email,
			"subscribed": true,
			"welcome_kit": []string{
				"E-book: Teknologi IoT 2024",
				"Case Study: Success Stories",
				"Technology Insights Newsletter",
			},
		},
	})
}
