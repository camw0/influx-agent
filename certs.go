package main

import (
	"fmt"
)

// getSSLCertPaths returns SSL certificate paths
func getSSLCertPaths(certDir, fallbackDir string) (string, string) {
	sslCertPath := fmt.Sprintf("%sfullchain.pem", certDir)
	sslKeyPath := fmt.Sprintf("%sprivkey.pem", certDir)

	return sslCertPath, sslKeyPath
}
