#!/bin/bash

curl -Lo /usr/local/bin/influx-agent https://github.com/cmrxnn/influx-agent/releases/download/latest/influx-agent;

systemctl restart influx-agent --now;
