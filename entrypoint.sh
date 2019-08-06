#!/bin/bash

set -eu

bash <(curl -s https://codecov.io/bash) -t $1