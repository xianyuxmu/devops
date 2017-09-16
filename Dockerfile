# Set the base image to CentOS, OFFICIAL REPOSITORY: https://hub.docker.com/_/centos/
FROM node:8.5.0-slim

MAINTAINER Robin Chen <xianyuxmu@gmail.com>

# Install Node.js and other dependencies
# RUN yum install -y sudo

# Install PM2
# RUN npm install -g pm2

RUN mkdir -p /opt/devops

# Define working directory
WORKDIR /opt/devops

ADD . /opt/devops

RUN npm install

# Expose port of you app
EXPOSE 3000

# Run app as fork mode

# CMD pm2 start index.js --name bonjour-monde --no-daemon
CMD node -v && node index.js