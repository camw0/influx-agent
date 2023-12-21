package main

import (
	"log"
	"net/http"
	"os"
)

func getSSLCertPaths(certDirs ...string) (string, string) {
	for _, certDir := range certDirs {
		certPath := certDir + "cert.pem"
		keyPath := certDir + "key.pem"
		if _, err := os.Stat(certPath); err == nil {
			log.Printf("Found SSL certificate at %s\n", certPath)
			return certPath, keyPath
		} else {
			log.Printf("Error checking SSL certificate at %s: %v\n", certPath, err)
		}
	}
	return "", ""
}

func startServer(addr string, router http.Handler, certPath, keyPath string) {
	if certPath != "" && keyPath != "" {
		log.Fatal(http.ListenAndServeTLS(addr, certPath, keyPath, router))
	} else {
		log.Fatal(http.ListenAndServe(addr, router))
	}
}
