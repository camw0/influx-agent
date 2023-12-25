package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// SetupCORS sets up CORS middleware
func SetupCORS(r *gin.Engine, remoteAddr string) {
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{remoteAddr}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type"}
	r.Use(cors.New(config))
}
