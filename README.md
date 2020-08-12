# Codecov GitHub Action

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-v1-undefined.svg?logo=github&logoColor=white&style=flat)](https://github.com/marketplace/actions/codecov)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action?ref=badge_shield)
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
    file: ./coverage.xml # optional
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
| `file`  | Path to the coverage report(s) | Optional
| `files`  | Comma-separated paths to the coverage report(s) | Optional
| `directory` | Directory to search for coverage reports. | Optional
| `flags`  | Flag the upload to group coverage metrics (unittests, uitests, etc.). Multiple flags are separated by a comma (ui,chrome) | Optional
| `env_vars`  | Environment variables to tag the upload with. Multiple env variables can be separated with commas (e.g. `OS,PYTHON`) | Optional
| `name`  | Custom defined name for the upload | Optional
| `fail_ci_if_error`  | Specify if CI pipeline should fail when Codecov runs into errors during upload. *Defaults to **false*** | Optional
| `path_to_write_report` | Write upload file to path before uploading | Optional
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
        file: ./coverage.xml
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
