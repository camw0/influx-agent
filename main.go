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

func main() {
	log.Println("starting webserver")
	r := gin.Default()

	configPath := "/etc/influx-agent/config.json"
	if _, err := os.Stat(configPath); os.IsNotExist(err) {
		configPath = "./config.json" // fallback to local config file on Windows
	}

	config, err := ReadConfig(configPath)
	if err != nil {
		log.Fatalf("error reading config file: %v\n", err)
	}

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

	sslCertPath, sslKeyPath := getSSLCertPaths(config.CertDir, "./certs/")
	if sslCertPath == "" || sslKeyPath == "" {
		log.Println("using http (ssl certs do not exist)")
	} else {
		log.Println("using https (certs found at path)")
	}

	startServer(":3000", r, sslCertPath, sslKeyPath)

	log.Println("started - listening on port 3000 for requests")
}
