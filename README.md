<!-- <p align="center"><img  src="./codecov-logo.png"  /></p> -->

# Codecov GitHub Action
### Easily upload coverage reports to Codecov from Github Actions 

## Usage

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
- uses: actions/checkout@master
- uses: actions/codecov-action@v0.2
  with:
    token: ${{secrets.CODECOV_TOKEN}}
```
>**Note**: This assumes that you've set your Codecov token inside settings > secrets as `CODECOV_TOKEN`. If not, you can get an upload token for your specific repo on codecov.io. A token is not required for public repositories. 

## Arguments

| Argument  | Description |
| :---:     |     :---:   | 
| `token`  | Used to authorize coverage report uploads  |


## License 

The code in this project is released under the MIT License
