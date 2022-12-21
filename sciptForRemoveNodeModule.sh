#!/bin/bash
echo "Hello World"
CURRENT=`pwd`
echo $CURRENT
if [ -d $CURRENT ] 
then
    echo "Node Module Exists"
    LIST=`ls`
    echo $LIST
    rm -rf node_modules
    echo $LIST
    echo "Node Module Installing...."
    npm i 
    echo "************************** Node Module Install successfully *******************"

else
    echo "Node Module not found"
    LIST=`ls`
    echo $LIST
    echo "Node Module Installing...."
    npm i 
    echo "************************** Node Module Install successfully *******************"
fi