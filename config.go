package main

import (
	"encoding/json"
	"os"
)

// Config represents the configuration structure
type Config struct {
	ServerAddr string `json:"server_addr"`
	CertDir    string `json:"cert_dir"`
	// Add other configuration fields as needed
}

// ReadConfig reads a JSON config file and returns a Config struct
func ReadConfig(filePath string) (Config, error) {
	var config Config

	file, err := os.Open(filePath)
	if err != nil {
		return config, err
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&config)
	if err != nil {
		return config, err
	}

	return config, nil
}
