# Codecov GitHub Action

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-v1-undefined.svg?logo=github&logoColor=white&style=flat)](https://github.com/marketplace/actions/codecov)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action?ref=badge_shield)
[![Workflow for Codecov Action](https://github.com/codecov/codecov-action/actions/workflows/main.yml/badge.svg)](https://github.com/codecov/codecov-action/actions/workflows/main.yml)
### Easily upload coverage reports to Codecov from GitHub Actions

>The latest release of this Action adds support for tokenless uploads from GitHub Actions!

## Usage

To integrate Codecov with your Actions pipeline, specify the name of this repository with a tag number (`@v1` is recommended) as a `step` within your `workflow.yml` file.

If you have a *private repository*, this Action also requires you to [provide an upload token](https://docs.codecov.io/docs/frequently-asked-questions#section-where-is-the-repository-upload-token-found-) from [codecov.io](https://www.codecov.io) (tip: in order to avoid exposing your token, store it as a `secret`). Optionally, you can choose to include up to four additional inputs to customize the upload context. **For public repositories, no token is needed**

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
- uses: actions/checkout@master
- uses: codecov/codecov-action@v1
  with:
    token: ${{ secrets.CODECOV_TOKEN }} # not required for public repos
    files: ./coverage1.xml,./coverage2.xml # optional
    flags: unittests # optional
    name: codecov-umbrella # optional
    fail_ci_if_error: true # optional (default = false)
    verbose: true # optional (default = false)
```
>**Note**: This assumes that you've set your Codecov token inside *Settings > Secrets* as `CODECOV_TOKEN`. If not, you can [get an upload token](https://docs.codecov.io/docs/frequently-asked-questions#section-where-is-the-repository-upload-token-found-) for your specific repo on [codecov.io](https://www.codecov.io). Keep in mind that secrets are *not* available to forks of repositories.

## Arguments

Codecov's Action currently supports five inputs from the user: `token`, `file`, `flags`,`name`, and `fail_ci_if_error`. These inputs, along with their descriptions and usage contexts, are listed in the table below:

| Input  | Description | Usage |
| :---:     |     :---:   |    :---:   |
| `token`  | Used to authorize coverage report uploads  | *Required for private repos* |
| `files`  | Comma-separated paths to the coverage report(s) | Optional
| `directory` | Directory to search for coverage reports. | Optional
| `flags`  | Flag the upload to group coverage metrics (unittests, uitests, etc.). Multiple flags are separated by a comma (ui,chrome) | Optional
| | |
| `aws_curl_args` | Extra curl arguments to communicate with AWS. | Optional
| `codecov_curl_args` | Extra curl arguments to communicate with Codecov. e.g., -U "--proxy http://http-proxy" | Optional
| `commit_parent` | The commit SHA of the parent for which you are uploading coverage. If not present, the parent will be determined using the API of your repository provider.  When using the repository provider's API, the parent is determined via finding the closest ancestor to the commit. | Optional
| `env_vars`  | Environment variables to tag the upload with. Multiple env variables can be separated with commas (e.g. `OS,PYTHON`) | Optional
| `fail_ci_if_error`  | Specify if CI pipeline should fail when Codecov runs into errors during upload. *Defaults to **false*** | Optional
| `functionalities` | Toggle functionalities | Optional
| | `coveragepy` Disable python coverage |
| | `fix` Disable report fixing |
| | `gcov` Disable gcov |
| | `gcovout` Disable gcov output |
| | `html` Enable coverage for HTML files |
| | `network` Disable uploading the file network |
| | `recursesubs` Enable recurse submodules in git projects when searching for source files | |
| | `search` Disable searching for reports |
| | `xcode` Disable xcode processing |
| `gcov_path_include` | Paths to include during gcov gathering (as a glob) | Optional
| `gcov_args` | extra arguments to pass to gcov | Optional
| `gcov_executable` | gcov executable to run. Defaults to 'gcov' | Optional
| `gcov_path_exclude` | Paths to ignore during gcov gathering (as a glob) | Optional
| `gcov_prefix` | Prefix filepaths to help resolve path fixing | Optional
| `gcov_root_dir` | Project root directory, also used when preparing gcov | Optional
| `move_coverage_to_trash` | Move discovered coverage reports to the trash | Optional
| `name`  | Custom defined name for the upload | Optional
| `override_branch` | Specify the branch name | Optional
| `override_build` | Specify the build number | Optional
| `override_commit` | Specify the commit SHA | Optional
| `override_pr` | Specify the pull request number | Optional
| `override_tag` | Specify the git tag | Optional
| `path_to_write_report` | Write upload file to path before uploading | Optional
| `root_dir` | Used when not in git/hg project to identify project root directory | Optional
| `verbose` | Specify whether the Codecov output should be verbose | Optional
| `working-directory` | Directory in which to execute `codecov.sh` | Optional
| `xcode_derived_data` | Custom Derived Data Path for Coverage.profdata and gcov processing | Optional
| `xcode_package` | Specify packages to build coverage. Uploader will only build these packages. This can significantly reduces time to build coverage reports. -J 'MyAppName' Will match "MyAppName" and "MyAppNameTests" -J '^ExampleApp$' Will match only "ExampleApp" not "ExampleAppTests" | Optional

### Example `workflow.yml` with Codecov Action

```yaml
name: Example workflow for Codecov
on: [push]
jobs:
  run:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    env:
      OS: ${{ matrix.os }}
      PYTHON: '3.7'
    steps:
    - uses: actions/checkout@master
    - name: Setup Python
      uses: actions/setup-python@master
      with:
        python-version: 3.7
    - name: Generate coverage report
      run: |
        pip install pytest
        pip install pytest-cov
        pytest --cov=./ --cov-report=xml
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v1
      with:
        token: ${{ secrets.CODECOV_TOKEN }}
        files: ./coverage1.xml,./coverage2.xml
        directory: ./coverage/reports/
        flags: unittests
        env_vars: OS,PYTHON
        name: codecov-umbrella
        fail_ci_if_error: true
        path_to_write_report: ./coverage/codecov_report.txt
        verbose: true
```
## Contributing

Contributions are welcome! Check out the [Contribution Guide](CONTRIBUTING.md).

## License

The code in this project is released under the [MIT License](LICENSE).


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action?ref=badge_large)
