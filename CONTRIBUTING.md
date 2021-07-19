# Contribution Guide

:tada: Thanks for taking the time to contribute! :tada:

The following is a set of guidelines for contributing to this repository, which is hosted in the [Codecov Organization](https://github.com/codecov) on GitHub.

## What does this repo do?

This repo is a GitHub Action, meaning it integrates with the GitHub Actions CI/CD pipeline. It's meant to take formatted reports with code coverage stats and upload them to codecov.io. Our Node action uses the Actions toolkit to make system calls that allow us to run Codecov's bash uploader inside of Node. Essentially what we're doing in this action is downloading Codecov's bash uploader script from codecov.io/bash, saving it as a file in the current directory, executing the file via `exec` calls, then removing the script from the current directory.

## PRs, Issues, and Support

Feel free to clone, modify code and request a PR to this repository. All PRs and issues will be reviewed by the Codecov team. If your PR/issue has been sitting for a while or if you have any questions, ping us at support@codecov.io
