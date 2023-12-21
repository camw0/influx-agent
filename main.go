package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/mem"
	"github.com/shirou/gopsutil/net"
)

func getSSLCertPaths(certDirs ...string) (string, string) {
	for _, certDir := range certDirs {
		if _, err := os.Stat(certDir + "cert.pem"); err == nil {
			return certDir + "cert.pem", certDir + "key.pem"
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

func main() {
	log.Println("starting webserver")
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		log.Println("serving request at root")
		startTime := time.Now()

		cpuPercent, err := cpu.Percent(0, false)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get CPU usage"})
			return
		}

		memInfo, err := mem.VirtualMemory()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get memory info"})
			return
		}

		diskInfo, err := disk.Usage("/")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get disk usage"})
			return
		}

		netInfo, err := net.IOCounters(true)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get network info"})
			return
		}

		response := gin.H{
			"cpu": cpuPercent[0],
			"memory": gin.H{
				"total":     memInfo.Total,
				"used":      memInfo.Used,
				"free":      memInfo.Free,
				"percent":   memInfo.UsedPercent,
				"cached":    memInfo.Cached,
				"buffered":  memInfo.Buffers,
				"available": memInfo.Available,
			},
			"disk": gin.H{
				"total":          diskInfo.Total,
				"used":           diskInfo.Used,
				"free":           diskInfo.Free,
				"percent":        diskInfo.UsedPercent,
				"inodes_total":   diskInfo.InodesTotal,
				"inodes_used":    diskInfo.InodesUsed,
				"inodes_free":    diskInfo.InodesFree,
				"inodes_percent": diskInfo.InodesUsedPercent,
			},
			"network": gin.H{
				"sent":         netInfo[0].BytesSent,
				"recv":         netInfo[0].BytesRecv,
				"packets_sent": netInfo[0].PacketsSent,
				"packets_recv": netInfo[0].PacketsRecv,
			},
		}

		elapsedTime := time.Since(startTime)
		response["elapsed_time_ms"] = elapsedTime.Milliseconds()

		c.JSON(http.StatusOK, response)
	})

	// Check if SSL files exist
	sslCertPath, sslKeyPath := getSSLCertPaths("/etc/influx-agent/certs/", "./certs/")
	if sslCertPath == "" || sslKeyPath == "" {
		log.Println("using http (ssl certs do not exist)")
	} else {
		log.Println("using https (certs found at path)")
	}

	// Start the server (HTTP or HTTPS)
	startServer(":3000", r, sslCertPath, sslKeyPath)

	log.Println("started - listening on port 3000 for requests")
}
