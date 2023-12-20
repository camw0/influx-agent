GOOS=linux GOARCH=amd64 go build -o system_info_linux main.go
GOOS=windows GOARCH=amd64 go build -o system_info_windows.exe main.go
