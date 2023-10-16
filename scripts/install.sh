#!/bin/bash

sudo apt update;
sudo apt -y install curl;

curl -L -o /usr/local/bin/influx-agent https://github.com/cmrxnn/influx-agent/releases/latest/download/influx-agent;

sudo chmod u+x /usr/local/bin/influx-agent;

sudo mkdir -p /etc/influx-agent;
sudo mkdir -p /var/lib/influx-agent;

curl -Lo /etc/influx-agent/settings.json https://raw.githubusercontent.com/cmrxnn/influx-agent/dev/settings.json.example;

sudo echo "[Unit]
Description=InfluxAgent
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/influx-agent

[Install]
WantedBy=multi-user.target
" > /etc/systemd/system/influx-agent.service;

mkdir /root/influx-tools
curl -Lo /root/influx-tools/update.sh https://github.com/cmrxnn/influx-agent/blob/dev/scripts/update.sh;
chmod u+x /root/influx-tools/update.sh

cat <(crontab -l) <(echo "0 * * * * /root/influx-tools/update.sh") | crontab -

systemctl enable --now influx-agent;

exit 0;
