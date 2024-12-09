# Codecov GitHub Action

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-v5-undefined.svg?logo=github&logoColor=white&style=flat)](https://github.com/marketplace/actions/codecov)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-action?ref=badge_shield)
[![Workflow for Codecov Action](https://github.com/codecov/codecov-action/actions/workflows/main.yml/badge.svg)](https://github.com/codecov/codecov-action/actions/workflows/main.yml)
### Easily upload coverage reports to Codecov from GitHub Actions

## v5 Release
`v5` of the Codecov GitHub Action will use the [Codecov Wrapper](https://github.com/codecov/wrapper) to encapsulate the [CLI](https://github.com/codecov/codecov-cli). This will help ensure that the Action gets updates quicker.

### Migration Guide
The `v5` release also coincides with the opt-out feature for tokens for public repositories. In the `Global Upload Token` section of the settings page of an organization in codecov.io, you can set the ability for Codecov to receive a coverage reports from any source. This will allow contributors or other members of a repository to upload without needing access to the Codecov token. For more details see [how to upload without a token](https://docs.codecov.com/docs/codecov-tokens#uploading-without-a-token).

> [!WARNING]
> **The following arguments have been changed**
> - `file` (this has been deprecated in favor of `files`)
> - `plugin` (this has been deprecated in favor of `plugins`)

The following arguments have been added:

- `binary`
- `gcov_args`
- `gcov_executable`
- `gcov_ignore`
- `gcov_include`
- `report_type`
- `skip_validation`
- `swift_project`

You can see their usage in the `action.yml` [file](https://github.com/codecov/codecov-action/blob/main/action.yml).

## v4 Release
`v4` of the Codecov GitHub Action will use the [Codecov CLI](https://github.com/codecov/codecov-cli) to upload coverage reports to Codecov.

### Breaking Changes
- Tokenless uploading is unsupported. However, PRs made from forks to the upstream public repos will support tokenless (e.g. contributors to OSS projects do not need the upstream repo's Codecov token). For details, [see our docs](https://docs.codecov.com/docs/codecov-uploader#supporting-token-less-uploads-for-forks-of-open-source-repos-using-codecov)
- Various arguments to the Action have been removed

### Dependabot
- For repositories using `Dependabot`, users will need to ensure that it has access to the Codecov token for PRs from Dependabot to upload coverage. To do this, please add your `CODECOV_TOKEN` as a Dependabot Secret. For more information, see ["Configuring access to private registries for Dependabot."](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/configuring-access-to-private-registries-for-dependabot#storing-credentials-for-dependabot-to-use)

`v3` versions and below will not have access to CLI features (e.g. global upload token, ATS).

## Usage

To integrate Codecov with your Actions pipeline, specify the name of this repository with a tag number (`@v5` is recommended) as a `step` within your `workflow.yml` file.

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
- uses: codecov/codecov-action@v5
  with:
    fail_ci_if_error: true # optional (default = false)
    files: ./coverage1.xml,./coverage2.xml # optional
    flags: unittests # optional
    name: codecov-umbrella # optional
    token: ${{ secrets.CODECOV_TOKEN }}
    verbose: true # optional (default = false)
```

The Codecov token can also be passed in via environment variables:

```yaml
steps:
- uses: actions/checkout@main
- uses: codecov/codecov-action@v5
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
- uses: codecov/codecov-action@v5
  with:
    use_oidc: true
```

Any token supplied will be ignored, as Codecov will default to the OIDC token for verification.

## Arguments

Codecov's Action supports inputs from the user. These inputs, along with their descriptions and usage contexts, are listed in the table below:

| Input  | Description | Required |
| :---       |     :---     |    :---:   |
| `binary` | The file location of a pre-downloaded version of the CLI. If specified, integrity checking will be bypassed. | Optional
| `codecov_yml_path` | The location of the codecov.yml file. This is crrently ONLY used for automated test selection (https://docs.codecov.com/docs/getting-started-with-ats). Note that for all other cases, the Codecov yaml will need to be locate
d as described here: https://docs.codecov.com/docs/codecov-yaml#can-i-name-the-file-codecovyml | Optional
| `commit_parent` | SHA (with 40 chars) of what should be the parent of this commit. | Optional
| `directory` | Folder to search for coverage files. Default to the current working directory | Optional
| `disable_file_fixes` | Disable file fixes to ignore common lines from coverage (e.g. blank lines or empty brackets). Read more here https://docs.codecov.com/docs/fixing-reports | Optional
| `disable_search` | Disable search for coverage files. This is helpful when specifying what files you want to upload with the files option. | Optional
| `disable_safe_directory` | Disable setting safe directory. Set to true to disable. | Optional
| `dry_run` | Don't upload files to Codecov | Optional
| `env_vars` | Environment variables to tag the upload with (e.g. PYTHON \| OS,PYTHON) | Optional
| `exclude` | Comma-separated list of folders to exclude from search. | Optional
| `fail_ci_if_error` | On error, exit with non-zero code | Optional
| `files` | Comma-separated explicit list of files to upload. These will be added to the coverage files found for upload. If you wish to only upload the specified files, please consider using "disable-search" to disable uploading other files. | Optional
| `flags` | Comma-separated list of flags to upload to group coverage metrics. | Optional
| `git_service` | Override the git_service (e.g. github_enterprise) | Optional
| `gcov_args` | Extra arguments to pass to gcov | Optional
| `gcov_executable` | gcov executable to run. Defaults to 'gcov' | Optional
| `gcov_ignore` | Paths to ignore during gcov gathering | Optional
| `gcov_include` | Paths to include during gcov gathering | Optional
| `handle_no_reports_found` | If no coverage reports are found, do not raise an exception. | Optional
| `job_code` |  | Optional
| `name` | Custom defined name of the upload. Visible in the Codecov UI | Optional
| `network_filter` | Specify a filter on the files listed in the network section of the Codecov report. This will only add files whose path begin with the specified filter. Useful for upload-specific path fixing. | Optional
| `network_prefix` | Specify a prefix on files listed in the network section of the Codecov report. Useful to help resolve path fixing. | Optional
| `os` | Override the assumed OS. Options available at cli.codecov.io | Optional
| `override_branch` | Specify the branch to be displayed with this commit on Codecov | Optional
| `override_build` | Specify the build number manually | Optional
| `override_build_url` | The URL of the build where this is running | Optional
| `override_commit` | Commit SHA (with 40 chars) | Optional
| `override_pr` | Specify the pull request number manually. Used to override pre-existing CI environment variables. | Optional
| `plugins` | Comma-separated list of plugins to run. Specify `noop` to turn off all plugins | Optional
| `report_code` | The code of the report if using local upload. If unsure, leave unset. Read more here https://docs.codecov.com/docs/the-codecov-cli#how-to-use-local-upload | Optional
| `report_type` | The type of file to upload, coverage by default. Possible values are "testing", "coverage". | Optional
| `root_dir` | Root folder from which to consider paths on the network section. Defaults to current working directory. | Optional
| `skip_validation` | Skip integrity checking of the CLI. This is NOT recommended. | Optional
| `slug` | [Required when using the org token] Set to the owner/repo slug used instead of the private repo token. Only applicable to some Enterprise users. | Optional
| `swift_project` | Specify the swift project name. Useful for optimization. | Optional
| `token` | Repository Codecov token. Used to authorize report uploads | Optional
| `url` | Set to the Codecov instance URl. Used by Dedicated Enterprise Cloud customers. | Optional
| `use_legacy_upload_endpoint` | Use the legacy upload endpoint. | Optional
| `use_oidc` | Use OIDC instead of token. This will ignore any token supplied | Optional
| `verbose` | Enable verbose logging | Optional
| `version` | Which version of the Codecov CLI to use (defaults to 'latest') | Optional
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
      uses: codecov/codecov-action@v5
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
