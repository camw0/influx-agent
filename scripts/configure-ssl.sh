#!/bin/bash

echo "Please enter the domain you would like to link your agent to: ";
read domain;
echo "Domain confirmed as $domain";

echo "Please enter the email you would like to use to receive SSL expiry alerts:";
read email;
echo "Email confirmed as $email";

echo "
    WARNING -> This script uses Certbot to sign an SSL certificate.
    If you are using a webserver such as NGINX, Apache or Caddy you MUST TURN IT OFF while this script is running.
    Failure to do so will result in the SSL certificate failing to provision, and you will have to restart this process.

    Also ensure that your IP for this system is pointed towards your domain ($domain).

    Continuing in 10 seconds...
"

sleep 10;


sudo apt update;
sudo apt -y install certbot;

certbot certonly -d $domain --standalone --email=$email --accept-tos -n;

mkdir -p /etc/influx-agent/certs;
mv /etc/letsencrypt/live/$domain/cert.pem /etc/influx-agent/certs/;
mv /etc/letsencrypt/live/$domain/privkey.pem /etc/influx-agent/certs/;

echo "Done | Please follow the steps below:";
echo "Done | Set ssl to true in /etc/influx-agent/settings.json";
echo "Done | Add your domain ($domain) to /etc/influx-agent/settings.json";
