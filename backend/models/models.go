package models

type Service struct {
	ID          int    `json:"id"`
	Icon        string `json:"icon"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type Stat struct {
	Number string `json:"number"`
	Label  string `json:"label"`
}

type Project struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image"`
	Category    string `json:"category"`
}

type TeamMember struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Position  string `json:"position"`
	Image     string `json:"image"`
	Expertise string `json:"expertise"`
}

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}
