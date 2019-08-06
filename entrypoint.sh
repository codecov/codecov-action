#!/bin/bash

# Exit if any subcommand fails
set -eu

# execute codecov global
bash <(curl -s https://codecov.io/bash)