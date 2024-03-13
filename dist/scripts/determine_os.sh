family=$(uname -s | tr '[:upper:]' '[:lower:]')
codecov_os="windows"
[[ $family == "darwin" ]] && codecov_os="macos"

[[ $family == "linux" ]] && codecov_os="linux"
[[ $codecov_os == "linux" ]] && \
  osID=$(grep -e "^ID=" /etc/os-release | cut -c4-)
[[ $osID == "alpine" ]] && codecov_os="alpine"
echo "==> ${codecov_os} detected"
echo "CODECOV_OS=${codecov_os}" >> "$GITHUB_OUTPUT"
