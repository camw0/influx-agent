#!/bin/bash

sudo apt update;
sudo apt -y install nodejs npm git;
sudo npm i -g yarn pkg;

git clone https://github.com/cmrxnn/influx-agent /tmp/influx-agent;

sudo mkdir -p /var/lib/influx-agent;
sudo mkdir -p /etc/influx-agent;

cd /tmp/influx-agent/;
yarn;
yarn build;

sudo mv influx-agent /usr/local/bin;
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

mkdir /root/influx-tools
sudo mv /tmp/influx-agent/update.sh /root/influx-tools/update.sh
chmod u+x /root/influx-tools/update.sh

cat <(crontab -l) <(echo "0 * * * * /root/influx-tools/update.sh") | crontab -

systemctl enable --now influx-agent;

exit 0;
