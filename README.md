# Codecov GitHub Action 

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-v1.0.0-undefined.svg?logo=github&logoColor=white&style=flat)](https://github.com/marketplace/actions/codecov)
### Easily upload coverage reports to Codecov from GitHub Actions  

## Usage

To integrate Codecov with your Actions pipeline, specify the name of this repository with a tag number as a `step` within your `workflow.yml` file. This Action also requires you to [provide an upload token](https://docs.codecov.io/docs/frequently-asked-questions#section-where-is-the-repository-upload-token-found-) from [codecov.io](https://www.codecov.io) (tip: in order to avoid exposing your token, store it as a `secret`). Optionally, you can choose to include three additional inputs to customize the upload context.

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
- uses: actions/checkout@master
- uses: actions/codecov-action@v1.0.0
  with:
    token: ${{secrets.CODECOV_TOKEN}} #required
    file: ./coverage.xml #optional
    flags: unittests #optional
    name: codecov-umbrella #optional
```
>**Note**: This assumes that you've set your Codecov token inside *Settings > Secrets* as `CODECOV_TOKEN`. If not, you can [get an upload token](https://docs.codecov.io/docs/frequently-asked-questions#section-where-is-the-repository-upload-token-found-) for your specific repo on [codecov.io](https://www.codecov.io). 

## Arguments

Codecov's Action currently supports four inputs from the user: `token`, `file`, `flags`, and `name`.  These inputs, along with their descriptions and usage contexts, are listed in the table below: 

| Input  | Description | Usage |
| :---:     |     :---:   |    :---:   |
| `token`  | Used to authorize coverage report uploads  | *Required* |
| `file`  | Location of the coverage report | Optional
| `flags`  | Flag upload under a certain group | Optional
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
      uses: codecov/codecov-action@v1.0.0
      with:
        token: ${{secrets.CODECOV_TOKEN}}
        file: ./coverage.xml
        flags: unittests
        name: codecov-umbrella 
```
## Contributing

Contributions are welcome! Check out the [Contribution Guide](CONTRIBUTING.md).

## License 

The code in this project is released under the [MIT License](LICENSE).
