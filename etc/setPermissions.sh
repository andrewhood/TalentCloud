#!/bin/bash

mydir=$1
echo "Setting proper app permissions in ${mydir}:"

echo "Setting directory permissions...";
sudo find $mydir -type d -exec chmod 775 {} \;

echo "Setting file permissions...";
sudo find $mydir -type f -exec chmod 664 {} \;

echo "Setting SELinux security context...";
sudo chcon -Rt httpd_sys_content_t $mydir;

echo "Setting SELinx security context on writable directories...";
sudo chcon -Rt httpd_sys_rw_content_t $mydir/storage;

echo "Setting nginx as onwer of all files...";
sudo chown -Rf nginx:nginx $mydir;
