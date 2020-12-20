#!/usr/bin/env bash

if ! [ -e .git ]; then
    echo "Please run this from repo root directory"
    exit 1
fi

cd .git/hooks
for i in pre-commit; do
    rm -fv $i
    ln -sv ../../hooks/$i
done
