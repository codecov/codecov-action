#!/bin/bash

set -eu

if [ $# -eq 0 ]
  then
    bash <(curl -s https://codecov.io/bash)
else
  bash <(curl -s https://codecov.io/bash) -t $1
fi

