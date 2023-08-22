# Codecov GitHub Action

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-v3-undefined.svg?logo=github&logoColor=white&style=flat)](https://github.com/marketplace/actions/codecov)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action?ref=badge_shield)
[![Workflow for Codecov Action](https://github.com/codecov/codecov-action/actions/workflows/main.yml/badge.svg)](https://github.com/codecov/codecov-action/actions/workflows/main.yml)
### Easily upload coverage reports to Codecov from GitHub Actions

>The latest release of this Action adds support for tokenless uploads from GitHub Actions!

## ⚠️  Deprecation of v1
**As of February 1, 2022, v1 has been fully sunset and no longer functions**

Due to the [deprecation](https://about.codecov.io/blog/introducing-codecovs-new-uploader/) of the underlying bash uploader,
the Codecov GitHub Action has released `v2`/`v3` which will use the new [uploader](https://github.com/codecov/uploader). You can learn
more about our deprecation plan and the new uploader on our [blog](https://about.codecov.io/blog/introducing-codecovs-new-uploader/).

We will be restricting any updates to the `v1` Action to security updates and hotfixes.

### Migration from `v1` to `v3`
The `v3` uploader has a few breaking changes for users
- Multiple fields have not been transferred from the bash uploader or have been deprecated. Notably
many of the `functionalities` and `gcov_` arguments have been removed. Please check the documentation
below for the full list.

## Usage

To integrate Codecov with your Actions pipeline, specify the name of this repository with a tag number (`@v3` is recommended) as a `step` within your `workflow.yml` file.

If you have a *private repository*, this Action also requires you to [provide an upload token](https://docs.codecov.io/docs/frequently-asked-questions#section-where-is-the-repository-upload-token-found-) from [codecov.io](https://www.codecov.io) (tip: in order to avoid exposing your token, store it as a `secret`). Optionally, you can choose to include up to four additional inputs to customize the upload context. **For public repositories, no token is needed**

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
- uses: actions/checkout@master
- uses: codecov/codecov-action@v3
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    files: ./coverage1.xml,./coverage2.xml # optional
    flags: unittests # optional
    name: codecov-umbrella # optional
    fail_ci_if_error: true # optional (default = false)
    verbose: true # optional (default = false)
```
>**Note**: This assumes that you've set your Codecov token inside *Settings > Secrets* as `CODECOV_TOKEN`. If not, you can [get an upload token](https://docs.codecov.io/docs/frequently-asked-questions#section-where-is-the-repository-upload-token-found-) for your specific repo on [codecov.io](https://www.codecov.io). Keep in mind that secrets are *not* available to forks of repositories.

## Arguments

Codecov's Action supports inputs from the user. These inputs, along with their descriptions and usage contexts, are listed in the table below:

| Input  | Description | Usage |
| :---:     |     :---:   |    :---:   |
| `token`  | Used to authorize coverage report uploads  | *Required |
| `move_coverage_to_trash` | Move discovered coverage reports to the trash | Optional
| `commit_parent` | The commit SHA of the parent for which you are uploading coverage. If not present, the parent will be determined using the API of your repository provider.  When using the repository provider's API, the parent is determined via finding the closest ancestor to the commit. | Optional
| `dry_run` | Don't upload files to Codecov | Optional
| `env_vars`  | Environment variables to tag the upload with. Multiple env variables can be separated with commas (e.g. `OS,PYTHON`) | Optional
| `fail_ci_if_error`  | Specify if CI pipeline should fail when Codecov runs into errors during upload. *Defaults to **false*** | Optional
| `files`  | Comma-separated paths to the coverage report(s). Negated paths are supported by starting with `!` | Optional
| `flags`  | Flag the upload to group coverage metrics (unittests, uitests, etc.). Multiple flags are separated by a comma (ui,chrome) | Optional
| `full_report` | Specify the path of a full Codecov report to re-upload | Optional
| `functionalities` | Toggle functionalities | Optional
| -- `network` | Disable uploading the file network | Optional
| -- `fixes` | Enable file fixes to ignore common lines from coverage | Optional
| -- `search` | Disable searching for coverage files | Optional
| `gcov` | Run with gcov support | Optional
| `gcov_args` | Extra arguments to pass to gcov | Optional
| `gcov_ignore` | Paths to ignore during gcov gathering | Optional
| `gcov_include` | Paths to include during gcov gathering | Optional
| `gcov_executable` | gcov executable to run. Defaults to gcov. | Optional
| `name`  | Custom defined name for the upload | Optional
| `network_filter` | Specify a filter on the files listed in the network section of the Codecov report. Useful for upload-specific path fixing | Optional
| `network_prefix` | Specify a prefix on files listed in the network section of the Codecov report. Useful to help resolve path fixing | Optional
| `os` | Specify the OS (linux, macos, windows, alpine) | Optional
| `override_branch` | Specify the branch name | Optional
| `override_build` | Specify the build number | Optional
| `override_commit` | Specify the commit SHA | Optional
| `override_pr` | Specify the pull request number | Optional
| `override_tag` | Specify the git tag | Optional
| `root_dir` | Used when not in git/hg project to identify project root directory | Optional
| `directory` | Directory to search for coverage reports. | Optional
| `slug` | Specify the slug manually (Enterprise use) | Optional
| `swift` | Run with swift coverage support | Optional
| -- `swift_project` | Specify the swift project to speed up coverage conversion | Optional
| `upstream_proxy` | The upstream http proxy server to connect through | Optional
| `url` | Change the upload host (Enterprise use) | Optional
| `verbose` | Specify whether the Codecov output should be verbose | Optional
| `version` | Specify which version of the Codecov Uploader should be used. Defaults to `latest` | Optional
| `working-directory` | Directory in which to execute `codecov.sh` | Optional
| `xtra_args` | Add additional uploader args that may be missing in the Action | Optional


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
      PYTHON: '3.10'
    steps:
    - uses: actions/checkout@master
    - name: Setup Python
      uses: actions/setup-python@master
      with:
        python-version: 3.10
    - name: Generate coverage report
      run: |
        pip install pytest
        pip install pytest-cov
        pytest --cov=./ --cov-report=xml
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        token: ${{ secrets.CODECOV_TOKEN }}
        directory: ./coverage/reports/
        env_vars: OS,PYTHON
        fail_ci_if_error: true
        files: ./coverage1.xml,./coverage2.xml,!./cache
        flags: unittests
        name: codecov-umbrella
        verbose: true
```
## Contributing

Contributions are welcome! Check out the [Contribution Guide](CONTRIBUTING.md).

## License

The code in this project is released under the [MIT License](LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action?ref=badge_large)
