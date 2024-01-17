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

	startServer(config.ListenAddr, r)

	log.Printf("Started - Listening on %s for requests\n", config.ListenAddr)
}
