#!/bin/bash

# You need to set these variables before running the install script.
export GIT_NAME=
export GIT_TOKEN=
# You need to set these variables before running the install script.

git clone https://$GIT_NAME:$GIT_TOKEN@github.com/cmrxnn/influx-agent /tmp;

cd /tmp/influx-agent;
yarn;
yarn build;

sudo mv influx-agent /usr/local/bin;

systemctl restart influx-agent --now;

sudo rm -r /tmp/influx-agent
