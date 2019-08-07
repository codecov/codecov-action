#!/bin/bash

set -eu

#echo $1

if [ -z "$1" ]
  then
    echo "No token supplied"
    exit
fi

bash <(curl -s https://codecov.io/bash) -t $1