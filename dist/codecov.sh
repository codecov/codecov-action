#!/usr/bin/env bash
CC_WRAPPER_VERSION="0.0.32"
set +u
say() {
  echo -e "$1"
}
exit_if_error() {
  say "$r==> $1$x"
  if [ "$CC_FAIL_ON_ERROR" = true ];
  then
     say "$r    Exiting...$x"
     exit 1;
  fi
}
lower() {
  echo $(echo $1 | sed 's/CC//' | sed 's/_/-/g' | tr '[:upper:]' '[:lower:]')
}
k_arg() {
  if [ -n "$(eval echo \$"CC_$1")" ];
  then
    echo "--$(lower "$1")"
  fi
}
v_arg() {
  if [ -n "$(eval echo \$"CC_$1")" ];
  then
    echo "$(eval echo \$"CC_$1")"
  fi
}
write_truthy_args() {
  if [ "$(eval echo \$$1)" = "true" ] || [ "$(eval echo \$$1)" = "1" ];
  then
    echo "-$(lower $1)"
  fi
}
b="\033[0;36m"  # variables/constants
g="\033[0;32m"  # info/debug
r="\033[0;31m"  # errors
x="\033[0m"
say "     _____          _
    / ____|        | |
   | |     ___   __| | ___  ___ _____   __
   | |    / _ \\ / _\` |/ _ \\/ __/ _ \\ \\ / /
   | |___| (_) | (_| |  __/ (_| (_) \\ V /
    \\_____\\___/ \\__,_|\\___|\\___\\___/ \\_/
                           $r Wrapper-$CC_WRAPPER_VERSION$x
                                  "
CC_VERSION="${CC_VERSION:-latest}"
CC_FAIL_ON_ERROR="${CC_FAIL_ON_ERROR:-false}"
if [ -n "$CC_BINARY" ];
then
  if [ -f "$CC_BINARY" ];
  then
    cc_filename=$CC_BINARY
    cc_command=$CC_BINARY
  else
    exit_if_error "Could not find binary file $CC_BINARY"
  fi
else
  if [ -n "$CC_OS" ];
  then
    say "$g==>$x Overridden OS: $b${CC_OS}$x"
  else
    CC_OS="windows"
    family=$(uname -s | tr '[:upper:]' '[:lower:]')
    [[ $family == "darwin" ]] && CC_OS="macos"
    [[ $family == "linux" ]] && CC_OS="linux"
    [[ $CC_OS == "linux" ]] && \
      osID=$(grep -e "^ID=" /etc/os-release | cut -c4-)
    [[ $osID == "alpine" ]] && CC_OS="alpine"
    [[ $(arch) == "aarch64" && $family == "linux" ]] && CC_OS+="-arm64"
    say "$g==>$x Detected $b${CC_OS}$x"
  fi
  cc_filename="codecov"
  [[ $CC_OS == "windows" ]] && cc_filename+=".exe"
  cc_command="./$cc_filename"
  [[ $CC_OS == "macos" ]]  && \
    ! command -v gpg 2>&1 >/dev/null && \
    HOMEBREW_NO_AUTO_UPDATE=1 brew install gpg
  cc_url="https://cli.codecov.io"
  cc_url="$cc_url/${CC_VERSION}"
  cc_url="$cc_url/${CC_OS}/${cc_filename}"
  say "$g ->$x Downloading $b${cc_url}$x"
  curl -Os "$cc_url"
  say "$g==>$x Finishing downloading $b${CC_OS}:${CC_VERSION}$x"
  version_url="https://cli.codecov.io/api/${CC_OS}/${CC_VERSION}"
  version=$(curl -s "$version_url" -H "Accept:application/json" | jq -r '.version')
  say "      Version: $b$version$x"
  say " "
fi
if [ "$CC_SKIP_VALIDATION" = "true" ] || [ -n "$CC_BINARY" ];
then
  say "$r==>$x Bypassing validation as requested by user"
else
CC_PUBLIC_PGP_KEY=$(curl -s https://keybase.io/codecovsecurity/pgp_keys.asc)
  echo "${CC_PUBLIC_PGP_KEY}"  | \
    gpg --no-default-keyring --import
  # One-time step
  say "$g==>$x Verifying GPG signature integrity"
  sha_url="https://cli.codecov.io"
  sha_url="${sha_url}/${CC_VERSION}/${CC_OS}"
  sha_url="${sha_url}/${cc_filename}.SHA256SUM"
  say "$g ->$x Downloading $b${sha_url}$x"
  say "$g ->$x Downloading $b${sha_url}.sig$x"
  say " "
  curl -Os --retry 5 --retry-delay 2 --connect-timeout 2 "$sha_url"
  curl -Os --retry 5 --retry-delay 2 --connect-timeout 2 "${sha_url}.sig"
  if ! gpg --verify "${cc_filename}.SHA256SUM.sig" "${cc_filename}.SHA256SUM";
  then
    exit_if_error "Could not verify signature. Please contact Codecov if problem continues"
  fi
  if ! (shasum -a 256 -c "${cc_filename}.SHA256SUM" 2>/dev/null || \
    sha256sum -c "${cc_filename}.SHA256SUM");
  then
    exit_if_error "Could not verify SHASUM. Please contact Codecov if problem continues"
  fi
  say "$g==>$x CLI integrity verified"
  say
fi
if [ -n "$CC_BINARY_LOCATION" ];
then
  mkdir -p "$CC_BINARY_LOCATION" && mv "$cc_filename" $_
  say "$g==>$x Codecov binary moved to ${CC_BINARY_LOCATION}"
fi
if [ "$CC_DOWNLOAD_ONLY" = "true" ];
then
  say "$g==>$x Codecov download only called. Exiting..."
fi
cc_cli_args=()
cc_cli_args+=( $(k_arg AUTO_LOAD_PARAMS_FROM) $(v_arg AUTO_LOAD_PARAMS_FROM))
cc_cli_args+=( $(k_arg ENTERPRISE_URL) $(v_arg ENTERPRISE_URL))
if [ -n "$CC_YML_PATH" ]
then
  cc_cli_args+=( "--codecov-yml-path" )
  cc_cli_args+=( "$CC_YML_PATH" )
fi
cc_cli_args+=( $(write_truthy_args CC_DISABLE_TELEM) )
cc_cli_args+=( $(write_truthy_args CC_VERBOSE) )
cc_uc_args=()
# Args for create commit
cc_uc_args+=( $(write_truthy_args CC_FAIL_ON_ERROR) )
cc_uc_args+=( $(k_arg GIT_SERVICE) $(v_arg GIT_SERVICE))
cc_uc_args+=( $(k_arg PARENT_SHA) $(v_arg PARENT_SHA))
cc_uc_args+=( $(k_arg PR) $(v_arg PR))
cc_uc_args+=( $(k_arg SHA) $(v_arg SHA))
cc_uc_args+=( $(k_arg SLUG) $(v_arg SLUG))
# Args for create report
cc_uc_args+=( $(k_arg CODE) $(v_arg CODE))
# Args for do upload
cc_uc_args+=( $(k_arg ENV) $(v_arg ENV))
OLDIFS=$IFS;IFS=,
cc_uc_args+=( $(k_arg BRANCH) $(v_arg BRANCH))
cc_uc_args+=( $(k_arg BUILD) $(v_arg BUILD))
cc_uc_args+=( $(k_arg BUILD_URL) $(v_arg BUILD_URL))
cc_uc_args+=( $(k_arg DIR) $(v_arg DIR))
cc_uc_args+=( $(write_truthy_args CC_DISABLE_FILE_FIXES) )
cc_uc_args+=( $(write_truthy_args CC_DISABLE_SEARCH) )
cc_uc_args+=( $(write_truthy_args CC_DRY_RUN) )
if [ -n "$CC_EXCLUDES" ];
then
  for directory in $CC_EXCLUDES; do
    cc_uc_args+=( "--exclude" "$directory" )
  done
fi
if [ -n "$CC_FILES" ];
then
  for file in $CC_FILES; do
    cc_uc_args+=( "--file" "$file" )
  done
fi
if [ -n "$CC_FLAGS" ];
then
  for flag in $CC_FLAGS; do
    cc_uc_args+=( "--flag" "$flag" )
  done
fi
cc_uc_args+=( $(k_arg GCOV_ARGS) $(v_arg GCOV_ARGS))
cc_uc_args+=( $(k_arg GCOV_EXECUTABLE) $(v_arg GCOV_EXECUTABLE))
cc_uc_args+=( $(k_arg GCOV_IGNORE) $(v_arg GCOV_IGNORE))
cc_uc_args+=( $(k_arg GCOV_INCLUDE) $(v_arg GCOV_INCLUDE))
cc_uc_args+=( $(write_truthy_args CC_HANDLE_NO_REPORTS_FOUND) )
cc_uc_args+=( $(k_arg JOB_CODE) $(v_arg JOB_CODE))
cc_uc_args+=( $(write_truthy_args CC_LEGACY) )
if [ -n "$CC_NAME" ];
then
  cc_uc_args+=( "--name" "$CC_NAME" )
fi
cc_uc_args+=( $(k_arg NETWORK_FILTER) $(v_arg NETWORK_FILTER))
cc_uc_args+=( $(k_arg NETWORK_PREFIX) $(v_arg NETWORK_PREFIX))
cc_uc_args+=( $(k_arg NETWORK_ROOT_FOLDER) $(v_arg NETWORK_ROOT_FOLDER))
if [ -n "$CC_PLUGINS" ];
then
  for plugin in $CC_PLUGINS; do
    cc_uc_args+=( "--plugin" "$plugin" )
  done
fi
cc_uc_args+=( $(k_arg REPORT_TYPE) $(v_arg REPORT_TYPE))
cc_uc_args+=( $(k_arg SWIFT_PROJECT) $(v_arg SWIFT_PROJECT))
IFS=$OLDIFS
unset NODE_OPTIONS
# See https://github.com/codecov/uploader/issues/475
chmod +x $cc_command
if [ -n "$CC_TOKEN_VAR" ];
then
  token="$(eval echo \$$CC_TOKEN_VAR)"
else
  token="$(eval echo $CC_TOKEN)"
fi
say "$g ->$x Token of length ${#token} detected"
token_str=""
token_arg=()
if [ -n "$token" ];
then
  token_str+=" -t <redacted>"
  token_arg+=( " -t " "$token")
fi
say "$g==>$x Running upload-coverage"
say "      $b$cc_command $(echo "${cc_cli_args[@]}") upload-coverage$token_str $(echo "${cc_uc_args[@]}")$x"
if ! $cc_command \
  ${cc_cli_args[*]} \
  upload-coverage \
  ${token_arg[*]} \
  "${cc_uc_args[@]}";
then
  exit_if_error "Failed to upload coverage"
fi
