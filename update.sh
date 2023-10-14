#!/bin/bash

git clone https://github.com/cmrxnn/influx-agent /tmp;

cd /tmp/influx-agent;
yarn;
yarn build;

sudo mv influx-agent /usr/local/bin;

systemctl restart influx-agent --now;

sudo rm -r /tmp/influx-agent;
