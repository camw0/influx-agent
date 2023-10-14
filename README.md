# Influx Agent
Influx Agent is a monitoring tool used to send data to Influx Core.

### Prerequisites
- NodeJS v16.x+
- NPM v9.x+
- Yarn v1.x+
- Git (any)
- Linux-based system

### Installation (dev)
```
git clone https://github.com/cmrxnn/influx-agent
cd influx-agent
yarn
yarn start # runs on port 3000 by default
```

### Installation (prod)
```
# Download the install.sh script from the GitHub repository
chmod u+x install.sh
./install.sh
# To stop or edit automatic updates, remove the cron worker which points to /root/influx-tools
```

### Issues
Report all issues on the [GitHub Page](https://github.com/cmrxnn/influx-agent/issues/new)

### Vulnerabilities
Report all security vulnerabilities to `mail@cameronwhite.co.uk`

### License
This project is licensed under the MIT license as of 14th October 2023
