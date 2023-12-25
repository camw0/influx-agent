package main

import (
	"io/ioutil"
	"os"

	"gopkg.in/yaml.v2"
)

// Config represents the configuration structure
type Config struct {
	ListenAddr string `yaml:"listenAddr"`
	RemoteAddr string `yaml:"remoteAddr"`
	CertDir    string `yaml:"certDir"`
}

// ReadConfig reads the configuration from the specified path
func ReadConfig() (*Config, error) {
	configPath := "/etc/influx/config.yml"
	if _, err := os.Stat(configPath); os.IsNotExist(err) {
		configPath = "./config.yml" // fallback to local config file on Windows
	}

	data, err := ioutil.ReadFile(configPath)
	if err != nil {
		return nil, err
	}

	var config Config
	err = yaml.Unmarshal(data, &config)
	if err != nil {
		return nil, err
	}

	return &config, nil
}
