#!/bin/bash

# Exit if any subcommand fails
set -eu

echo "hello $1"

# execute codecov global
bash <(curl -s https://codecov.io/bash)