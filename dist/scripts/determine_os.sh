family=$(uname -s | tr '[:upper:]' '[:lower:]')
codecov_os="windows"
[[ $family == "darwin" ]] && codecov_os="macos"

[[ $family == "linux" ]] && codecov_os="linux"
[[ $codecov_os == "linux" ]] && \
  osID=$(grep -e "^ID=" /etc/os-release | cut -c4-)
[[ $osID == "alpine" ]] && codecov_os="alpine"
echo "Detected ${codecov_os}"
echo "export codecov_os=${codecov_os}" >> $BASH_ENV
echo "export codecov_version=${PARAM_VERSION}" >> $BASH_ENV

codecov_filename="codecov"
[[ $codecov_os == "windows" ]] && codecov_filename+=".exe"
echo "export codecov_filename=${codecov_filename}" >> $BASH_ENV
[[ $codecov_os == "macos" ]] && \
  HOMEBREW_NO_AUTO_UPDATE=1 brew install gpg
codecov_url="https://cli.codecov.io"
codecov_url="$codecov_url/${PARAM_VERSION}"
codecov_url="$codecov_url/${codecov_os}/${codecov_filename}"
echo "Downloading ${codecov_url}"
curl -Os $codecov_url -v
