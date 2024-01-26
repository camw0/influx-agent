package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/host"
	"github.com/shirou/gopsutil/mem"
	"github.com/shirou/gopsutil/net"
)

// setupRouter sets up the Gin router with the required routes
func setupRouter(config *Config) *gin.Engine {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		uuid := uuid.New()
		startTime := time.Now()

		sysInfo, err := host.Info()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get system info"})
			return
		}

		cpuInfo, err := cpu.Info()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get CPU info"})
			return
		}

		cpuTimes, err := cpu.Times(true)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get CPU times"})
			return
		}

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
			"version": "v1.1.2",
			"uuid":    uuid,
			"sysinfo": sysInfo,
			"cpu": gin.H{
				"percent": cpuPercent[0],
				"times":   cpuTimes,
				"info":    cpuInfo,
			},
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

	return r
}

// startServer starts the HTTP server
func startServer(addr string, r *gin.Engine) {
	log.Fatal(http.ListenAndServe(addr, r))
}
