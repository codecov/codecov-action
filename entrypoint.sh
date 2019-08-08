#!/bin/bash

# Codecov @codecov

set -eu

CODECOV_ENV="git/hg"

if [ $# -eq 0 ]
then
  echo "Please provide an upload token from codecov.io"
  exit 1
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_FLAGS" != "x" ] && [ "x$INPUT_NAME" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE -F $INPUT_FLAGS -n $INPUT_NAME
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE -F $INPUT_FLAGS
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_NAME" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE -n $INPUT_NAME
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_NAME" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -n $INPUT_NAME -F $INPUT_FLAGS
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -F $INPUT_FLAGS
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_NAME" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -n $INPUT_NAME
elif [ "x$INPUT_TOKEN" != "x" ]
then
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN
else
  echo "Please provide an upload token from codecov.io with valid arguments"
  exit 1
fi
