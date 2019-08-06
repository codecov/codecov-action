#!/bin/bash

set -eu

echo "hello $1"

bash <(curl -s https://codecov.io/bash) 