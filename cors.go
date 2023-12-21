package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// SetupCORS sets up CORS middleware for the Gin router
func SetupCORS(r *gin.Engine, remote string) {
	// CORS middleware configuration
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{remote}
	r.Use(cors.New(corsConfig))
}
