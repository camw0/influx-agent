#!/bin/bash

# You need to set these variables before running the install script.
export GIT_NAME=
export GIT_TOKEN=
# You need to set these variables before running the install script.

sudo apt update;
sudo apt -y install nodejs npm git;
sudo npm i -g yarn pkg;

git clone https://$GIT_NAME:$GIT_TOKEN@github.com/cmrxnn/influx-agent;

cd influx-agent;
yarn install;
yarn build;

sudo mv influx-agent /usr/local/bin;
sudo mkdir -p /var/lib/influx-agent;
sudo mkdir -p /etc/influx-agent;
sudo cp -R settings.json.example /etc/influx-agent/settings.json;

sudo echo "[Unit]
Description=InfluxAgent
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/influx-agent

[Install]
WantedBy=multi-user.target
" > /etc/systemd/system/influx-agent.service;

systemctl start influx-agent --now;
systemctl daemon-reload;

sudo rm -r /root/influx-agent

exit 0;
