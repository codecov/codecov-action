#!/bin/bash

set -eu

echo "hello $2"

bash <(curl -s https://codecov.io/bash) 