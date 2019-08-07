#!/bin/bash

set -eu

echo $INPUT_FLAGS

if [ $# -eq 0 ]
then
  echo "inside zero"
  bash <(curl -s https://codecov.io/bash)
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  echo "inside 3"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE -F $INPUT_FLAGS
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ]
then
  echo "inside token and file"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  echo "inside token and flags"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -F $INPUT_FLAGS
elif [ "x$INPUT_FLAGS" != "x" ] && [ "x$INPUT_FILE" != "x" ]
then
  echo "inside flags and file"
  bash <(curl -s https://codecov.io/bash) -F $INPUT_FLAGS -f $INPUT_FILE
elif [ "x$INPUT_TOKEN" != "x" ]
then
  echo "inside token"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN
elif [ "x$INPUT_FILE" != "x" ]
then
  echo "inside file"
  bash <(curl -s https://codecov.io/bash) -f $INPUT_FILE
elif [ "x$INPUT_FLAGS" != "x" ]
then
  echo "inside flags"
  bash <(curl -s https://codecov.io/bash) -F $INPUT_FLAGS
else
  exit 1
fi

