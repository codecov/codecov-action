<!-- 
Codecov @codecov 
Ibrahim Ali @ibrahim0814
 -->

# Contribution Guide

:tada: Thanks for taking the time to contribute! :tada:

The following is a set of guidelines for contributing to this repository, which is hosted in the [Codecov Organization](https://github.com/codecov) on GitHub. 

## What does this repo do?

This repo is a GitHub Action, meaning it integrates with the GitHub Actions CI/CD pipeline. It's meant to take formatted reports with code coverage stats and upload them to codecov.io. What's essentially happening in the background is that Actions is spinning up a Linux Docker container with the contents of this repository. Inside that container, we then call a shell scipt that runs Codecov's Bash uploader. 

## PRs and Support

Feel free to clone, modify code and request a PR to this repository. All PRs will be reviewed by the Codecov team. If your PR has been sitting for a while or if you have any questions, ping us at support@codecov.io 
