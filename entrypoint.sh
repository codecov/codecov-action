#!/bin/bash

set -eu

if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
fi

bash <(curl -s https://codecov.io/bash) -t $1