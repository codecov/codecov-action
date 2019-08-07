#!/bin/bash

set -eu

if [ $# -eq 0 ]
then
  bash <(curl -s https://codecov.io/bash)
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE
elif [ "x$INPUT_TOKEN" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN
elif [ "x$INPUT_FILE" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -f $INPUT_FILE
fi

