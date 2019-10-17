#!/bin/sh

# Codecov @codecov

set -eu

if [ "x$INPUT_FILE" != 'x' ]; then
	curl -s https://codecov.io/bash | bash -s -- \
		-f "$INPUT_FILE" \
		-t "$INPUT_TOKEN" \
		-n "$INPUT_NAME" \
		-F "$INPUT_FLAGS" \
		-Z || echo 'Codecov upload failed'
else
	curl -s https://codecov.io/bash | bash -s -- \
		-t "$INPUT_TOKEN" \
		-n "$INPUT_NAME" \
		-F "$INPUT_FLAGS" \
		-Z || echo 'Codecov upload failed'
fi
