#!/usr/bin/env bash

set -e

git pull

./gradlew clean testRpm

echo 'stopping molly-h5-server'
sudo systemctl stop molly-h5-server

echo 'removing rpms'
sudo yum remove -y molly-h5-test

echo 'install rpms'
sudo yum install -y build/distributions/molly-h5-test*.rpm

echo 'starting molly-h5-server'
sudo systemctl start molly-h5-server
