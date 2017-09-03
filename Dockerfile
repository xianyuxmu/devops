# Set the base image to CentOS, OFFICIAL REPOSITORY: https://hub.docker.com/_/centos/
FROM centos:7

MAINTAINER RobinChen

# Install Node.js and other dependencies
RUN yum update && \
	yum install -y sudo && \
    yum install -y git && \
    yum install -y gcc-c++ make && \
    curl --silent --location https://rpm.nodesource.com/setup_8.x | bash - && \
    yum -y install nodejs

# Install PM2
RUN npm install -g pm2

RUN mkdir -p /opt/devops

# Define working directory
WORKDIR /opt/devops

ADD . /opt/devops

RUN npm install

# Expose port of you app
EXPOSE 3000

# Run app as fork mode
CMD pm2 start index.js --name bonjour-monde --no-daemon
# CMD node -v && node index.js