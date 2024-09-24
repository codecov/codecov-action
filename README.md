# Codecov GitHub Action

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-v4-undefined.svg?logo=github&logoColor=white&style=flat)](https://github.com/marketplace/actions/codecov)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action?ref=badge_shield)
[![Workflow for Codecov Action](https://github.com/codecov/codecov-action/actions/workflows/main.yml/badge.svg)](https://github.com/codecov/codecov-action/actions/workflows/main.yml)
### Easily upload coverage reports to Codecov from GitHub Actions

## v4 Release
`v4` of the Codecov GitHub Action will use the [Codecov CLI](https://github.com/codecov/codecov-cli) to upload coverage reports to Codecov.

### Breaking Changes
- Tokenless uploading is unsupported. However, PRs made from forks to the upstream public repos will support tokenless (e.g. contributors to OSS projects do not need the upstream repo's Codecov token). For details, [see our docs](https://docs.codecov.com/docs/codecov-uploader#supporting-token-less-uploads-for-forks-of-open-source-repos-using-codecov)
- Various arguments to the Action have been removed

### Dependabot
- For repositories using `Dependabot`, users will need to ensure that it has access to the Codecov token for PRs from Dependabot to upload coverage. To do this, please add your `CODECOV_TOKEN` as a Dependabot Secret. For more information, see ["Configuring access to private registries for Dependabot."](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/configuring-access-to-private-registries-for-dependabot#storing-credentials-for-dependabot-to-use)

`v3` versions and below will not have access to CLI features (e.g. global upload token, ATS).

## Usage

To integrate Codecov with your Actions pipeline, specify the name of this repository with a tag number (`@v4` is recommended) as a `step` within your `workflow.yml` file.

This Action also requires you to [provide an upload token](https://docs.codecov.io/docs/frequently-asked-questions#section-where-is-the-repository-upload-token-found-) from [codecov.io](https://www.codecov.io) (tip: in order to avoid exposing your token, [store it](https://docs.codecov.com/docs/adding-the-codecov-token#github-actions) as a `secret`).

Currently, the Action will identify linux, macos, and windows runners. However, the Action may misidentify other architectures. The OS can be specified as
- alpine
- alpine-arm64
- linux
- linux-arm64
- macos
- windows

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
- uses: actions/checkout@main
- uses: codecov/codecov-action@v4
  with:
    fail_ci_if_error: true # optional (default = false)
    files: ./coverage1.xml,./coverage2.xml # optional
    flags: unittests # optional
    name: codecov-umbrella # optional
    token: ${{ secrets.CODECOV_TOKEN }} # required
    verbose: true # optional (default = false)
```

The Codecov token can also be passed in via environment variables:

```yaml
steps:
- uses: actions/checkout@main
- uses: codecov/codecov-action@v4
  with:
    fail_ci_if_error: true # optional (default = false)
    files: ./coverage1.xml,./coverage2.xml # optional
    flags: unittests # optional
    name: codecov-umbrella # optional
    verbose: true # optional (default = false)
  env:
    CODECOV_TOKEN: ${{ secrets.CODECOV_TOKEN }}
```
> [!NOTE]
> This assumes that you've set your Codecov token inside *Settings > Secrets* as `CODECOV_TOKEN`. If not, you can [get an upload token](https://docs.codecov.io/docs/frequently-asked-questions#section-where-is-the-repository-upload-token-found-) for your specific repo on [codecov.io](https://www.codecov.io). Keep in mind that secrets are *not* available to forks of repositories.

### Using OIDC
For users with [OpenID Connect(OIDC) enabled](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect), the Codecov token is not necessary. You can use OIDC with the `use_oidc` argument as following.

```yaml
- uses: codecov/codecov-action@v4
  with:
    use_oidc: true
```

Any token supplied will be ignored, as Codecov will default to the OIDC token for verification.

## Arguments

Codecov's Action supports inputs from the user. These inputs, along with their descriptions and usage contexts, are listed in the table below:

| Input  | Description | Required |
| :---       |     :---     |    :---:   |
| `token` | Repository Codecov token. Used to authorize report uploads | *Required
| `codecov_yml_path` | Specify the path to the Codecov YML | Optional
| `commit_parent` | Override to specify the parent commit SHA | Optional
| `directory` | Directory to search for coverage reports. | Optional
| `disable_search` | Disable search for coverage files. This is helpful when specifying what files you want to upload with the --file option. | Optional
| `disable_file_fixes` | Disable file fixes to ignore common lines from coverage (e.g. blank lines or empty brackets) | Optional
| `dry_run` | Don't upload files to Codecov | Optional
| `env_vars` | Environment variables to tag the upload with (e.g. PYTHON \| OS,PYTHON) | Optional
| `exclude` | Folders to exclude from search | Optional
| `fail_ci_if_error` | Specify whether or not CI build should fail if Codecov runs into an error during upload | Optional
| `file` | Path to coverage file to upload | Optional
| `files` | Comma-separated list of files to upload | Optional
| `flags` | Flag upload to group coverage metrics (e.g. unittests \| integration \| ui,chrome) | Optional
| `handle_no_reports_found` | Raise no exceptions when no coverage reports found | Optional
| `job_code` | The job code | Optional
| `name` | User defined upload name. Visible in Codecov UI | Optional
| `os` | Override the assumed OS. Options are linux \| macos \| windows \| . | Optional
| `override_branch` | Specify the branch name | Optional
| `override_build` | Specify the build number | Optional
| `override_build_url` | The URL of the build where this is running | Optional
| `override_commit` | Specify the commit SHA | Optional
| `override_pr` | Specify the pull request number | Optional
| `plugin` | plugins to run. Options: xcode, gcov, pycoverage. The default behavior runs them all. | Optional
| `plugins` | Comma-separated list of plugins for use during upload. | Optional
| `report_code` | The code of the report. If unsure, do not include | Optional
| `root_dir` | Used to specify the location of your   .git   root to identify project root directory | Optional
| `slug` | Specify the slug manually (Enterprise use) | Optional
| `url` | Specify the base url to upload (Enterprise use) | Optional
| `use_legacy_upload_endpoint` | Use the legacy upload endpoint | Optional
| `use_oidc` | Use OpenID Connect for verification instead of token. This will ignore any token supplied. Please see [GitHub documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect) for details.
| `verbose` | Specify whether the Codecov output should be verbose | Optional
| `version` | Specify which version of the Codecov CLI should be used. Defaults to `latest` | Optional
| `working-directory` | Directory in which to execute codecov.sh | Optional

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
    - uses: actions/checkout@main
    - name: Setup Python
      uses: actions/setup-python@main
      with:
        python-version: 3.10
    - name: Generate coverage report
      run: |
        pip install pytest
        pip install pytest-cov
        pytest --cov=./ --cov-report=xml
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v4
      with:
        directory: ./coverage/reports/
        env_vars: OS,PYTHON
        fail_ci_if_error: true
        files: ./coverage1.xml,./coverage2.xml,!./cache
        flags: unittests
        name: codecov-umbrella
        token: ${{ secrets.CODECOV_TOKEN }}
        verbose: true
```
## Contributing

Contributions are welcome! Check out the [Contribution Guide](CONTRIBUTING.md).

## License

The code in this project is released under the [MIT License](LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action?ref=badge_large)
