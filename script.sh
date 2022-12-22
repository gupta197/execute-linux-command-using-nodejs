#!/bin/bash
echo "Checking node_modules"
CURRENT=`pwd`
cd $CURRENT
echo $CURRENT
if [ -d $CURRENT/node_modules ]; then
    echo "exist"
    rm -rf $CURRENT/node_modules && npm i
else
    echo "node_modules not found"
    npm i
fi