#!/bin/bash

set -eu


echo $INPUT_FILE

if [ "x$INPUT_FILE" == "x"  ] || [ "x$INPUT_TOKEN" == "x"  ];                                                                
then
    echo "some variables are null"
fi


if [ $# -eq 0 ]
  then
    bash <(curl -s https://codecov.io/bash)
else
  bash <(curl -s https://codecov.io/bash) -t $1
fi

