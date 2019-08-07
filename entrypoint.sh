#!/bin/bash

set -eu

if [ $# -eq 0 ]
then
  echo "inside first if"
  bash <(curl -s https://codecov.io/bash)
elif [ "x$INPUT_TOKEN" == "x" ] && [ "x$INPUT_FILE" == "x" ]
then
  echo "inside both"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE
elif [ "x$INPUT_TOKEN" == "x" ]
then
  echo "inside token"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN
elif [ "x$INPUT_FILE" == "x" ]
then
  echo "inside file"
  bash <(curl -s https://codecov.io/bash) -f $INPUT_FILE
fi

