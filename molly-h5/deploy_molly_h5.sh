#!/usr/bin/env bash

set -e

echo 'stopping molly-h5'
sudo systemctl stop molly-h5-server.service

echo 'removing rpms'
sudo yum remove -y molly-h5

echo 'install rpms'
sudo yum install -y molly-h5-*.rpm

echo 'starting molly-h5'
sudo systemctl start molly-h5-server.service