#!/bin/bash

echo '############################'
echo '# Starting docker mongo DB #'
echo '############################'
docker run --name mongo -d mongo:latest

echo '############################'
echo '# Building docker node API #'
echo '############################'

docker build -t node-api/mongoose-node-template .

echo '############################'
echo '# Starting docker node API #'
echo '############################'

docker run -p 3000:3000 --name node_api -d node-api/mongoose-node-template

echo '##########################################'
echo '# You application is runing on port 3000 #'
echo '##########################################'
