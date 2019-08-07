#!/bin/bash

set -eu



if [ -z "$1" ] || [ -z "$2" ]; then
  echo 'Need 2 parameter are not empty'
fi

echo $INPUT_FILE
echo $1
echo $2

if [ $# -eq 0 ]
  then
    bash <(curl -s https://codecov.io/bash)
else
  bash <(curl -s https://codecov.io/bash) -t $1
fi

