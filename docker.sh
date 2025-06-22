#!/bin/bash

docker build -t raspberrypi-web-app . || exit 1
docker run -d --restart always -p 8000:8000 raspberrypi-web-app
