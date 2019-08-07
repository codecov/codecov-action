<div><img align="center" src="./codecov-logo.png"  /></div>

# Codecov Github Action
### Easily upload coverage reports to Codecov from Github Actions 

## Usage

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
- uses: actions/checkout@master
- uses: actions/codecov-action@v1
  with:
    token: ${{secrets.CODECOV_TOKEN}}
```
>**Note**: This assumes that you've set your Codecov token inside settings > secrets as `CODECOV_TOKEN`. If not, you can get an upload token for your specific repo on codecov.io 

## Arguments

| Argument  | Description |
| :---:     |     :---:   | 
| `token`  | Used to authorize coverage report uploads  |


## License 

The code in this project is released under the MIT License