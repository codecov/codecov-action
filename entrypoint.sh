#!/bin/bash

set -eu

if [ $# -eq 0 ]
  then
    echo "No arguments supplied. Please make sure to provide an upload token"
    exit
fi

bash <(curl -s https://codecov.io/bash) -t $1