#!/bin/bash

set -eu

if [ $# -eq 0 ]
then
  bash <(curl -s https://codecov.io/bash)
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE -F $INPUT_FLAGS
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -F $INPUT_FLAGS
elif [ "x$INPUT_FLAGS" != "x" ] && [ "x$INPUT_FILE" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -F $INPUT_FLAGS -f $INPUT_FILE
elif [ "x$INPUT_TOKEN" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN
elif [ "x$INPUT_FILE" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -f $INPUT_FILE
elif [ "x$INPUT_FLAGS" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -F $INPUT_FLAGS
else
  exit 1
fi

