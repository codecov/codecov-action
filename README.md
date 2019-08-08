<!-- 
Codecov @codecov 
Ibrahim Ali @ibrahim0814
 -->

# Codecov GitHub Action
### Easily upload coverage reports to Codecov from GitHub Actions 

## Usage

To integrate Codecov with your Actions pipline, specify the name of this repository with a tag number as a `step` within your `workflow.yml` file. Optionally, you can choose to include up to four different inputs to customize the upload context.

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
- uses: actions/checkout@master
- uses: actions/codecov-action@v1
  with:
    token: ${{secrets.CODECOV_TOKEN}} #for private repos
    file: ./coverage.xml #optional
    flags: unittests #optional
    name: codecov-umbrella #optional
```
>**Note**: This assumes that you've set your Codecov token inside *Settings > Secrets* as `CODECOV_TOKEN`. If not, you can get an upload token for your specific repo on [codecov.io](https://www.codecov.io). A token is *not* required for public repositories. 

## Arguments

Codecov's Action currently supports four inputs from the user: `token`, `file`, `flags`, and `name`.  These inputs  help users contextualize more information about their upload on [codecov.io](https://www.codecov.io). 

| Input  | Description | Usage |
| :---:     |     :---:   |    :---:   |
| `token`  | Used to authorize coverage report uploads  | *Required only for private repos* |
| `file`  | Location of the coverage report | Optional
| `flags`  | Flag upload under a certain group name | Optional
| `name`  | Custom defined name for the upload | Optional

### Example `workflow.yml` with Codecov Action

```yaml
name: Example workflow for Codecov
on: [push]
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: Setup Python  
      uses: actions/setup-python@master
      with:
        version: 3.7
    - name: Generate coverage report
      run: |
        pip install pytest
        pip install pytest-cov
        pytest --cov=./ --cov-report=xml
    - name: Upload coverage to Codecov  
      uses: codecov/codecov-action@v1
      with:
        token: ${{secrets.CODECOV_TOKEN}}
        file: ./coverage.xml
        flags: unittests
        name: codecov-umbrella 
```

## License 

The code in this project is released under the [MIT License](LICENSE).
