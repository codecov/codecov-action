# Contribution Guide

:tada: Thanks for taking the time to contribute! :tada:

The following is a set of guidelines for contributing to this repository, which is hosted in the [Codecov Organization](https://github.com/codecov) on GitHub. 

## What does this repo do?

This repo is a GitHub Action, meaning it integrates with the GitHub Actions CI/CD pipeline. It's mean to take formatted reports with code coverage stats and upload them to codecov.io. What's essentially happening in the background is that Actions is spinning up a Linux Docker container with the contents of this repository. Inside that container, we then call a shell scipt that runs Codecov's Bash uploader. 

## Improvements

Here's a list of things that would extend the functionality of this Action:

* **Specify file path**:     Currently, there's no way to specify a file path to a coverage report. This would have to be a user input that gets passed through to the Docker container
* **Codecov YAML location**: No way to indicate a path to the `codecov.yml` file. Obtain from user input.
* **Upload flags**: Cannot currently specify any flags. Obtain from user input.

This is primarily an effort in bash scripting and getting the information above from a user through to make a correct curl call