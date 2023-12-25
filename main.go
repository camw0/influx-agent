package main

import (
	"log"
)

func main() {
	log.Println("Starting webserver")

	config, err := ReadConfig()
	if err != nil {
		log.Fatalf("Error reading config file: %v\n", err)
	}

	r := setupRouter(config)
	sslCertPath, sslKeyPath := getSSLCertPaths(config.CertDir, "./certs/")

	if sslCertPath == "" || sslKeyPath == "" {
		log.Println("Using HTTP (SSL certs do not exist)")
	} else {
		log.Println("Using HTTPS (certs found at path)")
	}

	SetupCORS(r, config.RemoteAddr)

	startServer(config.ListenAddr, r, sslCertPath, sslKeyPath)

	log.Printf("Started - Listening on %s for requests\n", config.ListenAddr)
}
