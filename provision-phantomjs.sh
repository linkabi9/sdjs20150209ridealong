#!/bin/sh

phantomjsid=phantomjs-1.9.2-linux-x86_64
downloadpath=https://phantomjs.googlecode.com/files/${phantomjsid}.tar.bz2
installpath=/usr/local/share/applications
binarypath=${installpath}/${phantomjsid}/bin/phantomjs
linkpath=/usr/local/bin/phantomjs

echo "Provisioning support libs for CentOS"
sudo yum install freetype -y
sudo yum install fontconfig -y

echo "Provisioning PhantomJS"
if [ ! -h /usr/local/bin/phantomjs ]; then
	echo "Downloading PhantomJS"
	cd ${installpath}
	wget ${downloadpath}
	if [ $? -eq 0 ]; then
		echo "Unpacking binary"
		tar xvjf ${phantomjsid}.tar.bz2
		if [ $? -eq 0 ]; then
			if [ -f ${binarypath} ]; then
				ln -sf ${binarypath} ${linkpath}
				echo "PhantomJS is installed"
			else
				echo "ERROR: PhantomJS -- Command 'ln' can not run because ${binarypath} does not exist"
			fi
		else
			echo "ERROR: PhantomJS -- Command 'tar' failed with exit code $?"
		fi
	else
		echo "ERROR: PhantomJS -- Command 'wget' failed with exit code $?"
	fi
else
	echo "PhantomJS is already installed"
fi
