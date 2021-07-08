# Codecov Uploader

[![CircleCI](https://circleci.com/gh/codecov/uploader.svg?style=shield&circle-token=def755bf76a1d8c36436c3115530c7eac7fa30e0)](https://circleci.com/gh/codecov/uploader) [![codecov](https://codecov.io/gh/codecov/uploader/branch/master/graph/badge.svg?token=X1gImxfIya)](https://codecov.io/gh/codecov/uploader)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fuploader.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fuploader?ref=badge_shield)

## This is a work in progress.

## Steps to develop

- `make clean`
- `make install`
- `make build`

Note: `make build` does not currently build the Windows binary until I confirm that a Windows binary build under Linux works. It also does not build the Alpine binary, as that needs to be build in an alpine container, using a static build of NodeJS. To build the Windows binary, run `npm run build-windows`

Binaries for Windows, MacOS, and Linux will be in the `out/` directory.


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fuploader.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fuploader?ref=badge_large)
.
