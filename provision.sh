#!/bin/sh

## install compilers
#echo "MG: install compilers"
#sudo yum install gcc gcc-c++ autoconf automake -y


# install various tools
echo "SDJS: install git"
sudo yum install git -y

echo "SDJS: install node.js"
sudo yum install epel-release -y
sudo yum install nodejs -y
sudo yum install npm -y

echo "SDJS: install global dev tools"
npm -g install grunt-cli karma bower

# set local timezone to Pacific
#echo "SDJS: Set local timezone to Pacific"
#sudo rm -f /etc/localtime
#sudo ln -s /usr/share/zoneinfo/US/Pacific /etc/localtime

echo "SDJS: Shell provisioner done!"
