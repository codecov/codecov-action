#!/bin/bash

set -eu

if [ $# -eq 0 ]
then
  echo "inside no args"
  bash <(curl -s https://codecov.io/bash)
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_FLAGS" != "x" ] && [ "x$INPUT_NAME" != "x" ]
then
  echo "inside all 4"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE -F $INPUT_FLAGS -n $INPUT_NAME
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  echo "inside token file flags"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE -F $INPUT_FLAGS
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_NAME" != "x" ]
then
  echo "inside token file name"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE -n $INPUT_NAME
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_NAME" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  echo "inside token name flags"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -n $INPUT_NAME -F $INPUT_FLAGS
elif [ "x$INPUT_NAME" != "x" ] && [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  echo "inside name file flags"
  bash <(curl -s https://codecov.io/bash) -n $INPUT_NAME -f $INPUT_FILE -F $INPUT_FLAGS
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FILE" != "x" ]
then
  echo "inside token file"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -f $INPUT_FILE
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_FLAGS" != "x" ]
then
  echo "inside token flags"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -F $INPUT_FLAGS
elif [ "x$INPUT_FLAGS" != "x" ] && [ "x$INPUT_FILE" != "x" ]
then
  echo "inside flags file"
  bash <(curl -s https://codecov.io/bash) -F $INPUT_FLAGS -f $INPUT_FILE
elif [ "x$INPUT_FLAGS" != "x" ] && [ "x$INPUT_NAME" != "x" ]
then
  echo "inside flags name"
  bash <(curl -s https://codecov.io/bash) -F $INPUT_FLAGS -n $INPUT_NAME
elif [ "x$INPUT_TOKEN" != "x" ] && [ "x$INPUT_NAME" != "x" ]
then
  echo "inside token name"
  bash <(curl -s https://codecov.io/bash) -t $INPUT_TOKEN -n $INPUT_NAME
elif [ "x$INPUT_FILE" != "x" ] && [ "x$INPUT_NAME" != "x" ]
then
  echo "inside file name"
  bash <(curl -s https://codecov.io/bash) -f $INPUT_FILE -n $INPUT_NAME
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
elif [ "x$INPUT_NAME" != "x" ]
then
  echo "inside name"
  bash <(curl -s https://codecov.io/bash) -n $INPUT_NAME
else
  echo "error"
  exit 1
fi

