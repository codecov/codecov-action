#!/bin/bash

# Codecov @codecov

set -eu

if [ $# -eq 0 ]
then
  echo "Please provide an upload token from codecov.io"
  exit 1
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_FLAGS" != "x" ] && [ "x$INPUT_NAME" != "x" ]
then
  curl -s https://codecov.io/bash | bash -s -- -t $INPUT_TOKEN -f $INPUT_FILE -F $INPUT_FLAGS -n $INPUT_NAME
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  curl -s https://codecov.io/bash | bash -s -- -t $INPUT_TOKEN -f $INPUT_FILE -F $INPUT_FLAGS
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_NAME" != "x" ]
then
  curl -s https://codecov.io/bash | bash -s -- -t $INPUT_TOKEN -f $INPUT_FILE -n $INPUT_NAME
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_NAME" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  curl -s https://codecov.io/bash | bash -s -- -t $INPUT_TOKEN -n $INPUT_NAME -F $INPUT_FLAGS
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ]
then
  curl -s https://codecov.io/bash | bash -s -- -t $INPUT_TOKEN -f $INPUT_FILE
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  curl -s https://codecov.io/bash | bash -s -- -t $INPUT_TOKEN -F $INPUT_FLAGS
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_NAME" != "x" ]
then
  curl -s https://codecov.io/bash | bash -s -- -t $INPUT_TOKEN -n $INPUT_NAME
elif [ "x$INPUT_TOKEN" != "x" ]
then
  curl -s https://codecov.io/bash | bash -s -- -t $INPUT_TOKEN
else
  echo "Please provide an upload token from codecov.io with valid arguments"
  exit 1
fi
