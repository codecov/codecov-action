#!/usr/bin/env bash
CC_WRAPPER_VERSION="0.0.20"
say() {
  echo -e "$1"
}
exit_if_error() {
  say "$r==> $1$x"
  if [ $CC_FAIL_ON_ERROR = true ];
  then
     say "$r    Exiting...$x"
     exit 1;
  fi
}
lower() {
  echo $(echo $1 | sed 's/CC//' | sed 's/_/-/g' | tr '[:upper:]' '[:lower:]')
}
write_existing_args() {
  if [ -n "$(eval echo \$$1)" ];
  then
    echo " -$(lower "$1") $(eval echo \$$1)"
  fi
}
write_truthy_args() {
  if [ "$(eval echo \$$1)" = "true" ] || [ "$(eval echo \$$1)" = "1" ];
  then
    echo " -$(lower $1)"
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
  else
    exit_if_error "Could not find binary file $CC_BINARY"
  fi
else
  if [ -n "$CC_OS" ];
  then
    say "$g==>$x Overridden OS: $b${CC_OS}$x"
    export cc_os=${CC_OS}
  else
    CC_OS="linux"
    family=$(uname -s | tr '[:upper:]' '[:lower:]')
    cc_os="windows"
    [[ $family == "darwin" ]] && cc_os="macos"
    [[ $family == "linux" ]] && cc_os="linux"
    [[ $cc_os == "linux" ]] && \
      osID=$(grep -e "^ID=" /etc/os-release | cut -c4-)
    [[ $osID == "alpine" ]] && cc_os="alpine"
    [[ $(arch) == "aarch64" && $family == "linux" ]] && cc_os+="-arm64"
    say "$g==>$x Detected $b${cc_os}$x"
    export cc_os=${cc_os}
  fi
  export cc_version=${CC_VERSION}
  cc_filename="codecov"
  [[ $cc_os == "windows" ]] && cc_filename+=".exe"
  export cc_filename=${cc_filename}
  [[ $cc_os == "macos" ]]  && \
    ! command -v gpg 2>&1 >/dev/null && \
    HOMEBREW_NO_AUTO_UPDATE=1 brew install gpg
  cc_url="https://cli.codecov.io"
  cc_url="$cc_url/${CC_VERSION}"
  cc_url="$cc_url/${cc_os}/${cc_filename}"
  say "$g ->$x Downloading $b${cc_url}$x"
  curl -Os $cc_url
  say "$g==>$x Finishing downloading $b${cc_os}:${CC_VERSION}$x"
  say " "
fi
if [ "$CC_SKIP_VALIDATION" = "true" ] || [ -n "$CC_BINARY" ];
then
  say "$r==>$x Bypassing validation as requested by user"
else
CC_PUBLIC_PGP_KEY=$(curl https://keybase.io/codecovsecurity/pgp_keys.asc)
  echo "${CC_PUBLIC_PGP_KEY}"  | \
    gpg --no-default-keyring --import
  # One-time step
  say "$g==>$x Verifying GPG signature integrity"
  sha_url="https://cli.codecov.io"
  sha_url="${sha_url}/${cc_version}/${cc_os}"
  sha_url="${sha_url}/${cc_filename}.SHA256SUM"
  say "$g ->$x Downloading $b${sha_url}$x"
  say "$g ->$x Downloading $b${sha_url}.sig$x"
  say " "
  curl -Os "$sha_url"
  curl -Os "${sha_url}.sig"
  if ! gpg --verify "${cc_filename}.SHA256SUM.sig" "${cc_filename}.SHA256SUM";
  then
    exit_if_error "Could not verify signature. Please contact Codecov if problem continues"
  fi
  if ! (shasum -a 256 -c "${cc_filename}.SHA256SUM" || \
    sha256sum -c "${cc_filename}.SHA256SUM");
  then
    exit_if_error "Could not verify SHASUM. Please contact Codecov if problem continues"
  fi
  say "$g==>$x CLI integrity verified"
  say
fi
cc_cli_args=()
cc_cli_args+=( $(write_existing_args CC_AUTO_LOAD_PARAMS_FROM) )
cc_cli_args+=( $(write_existing_args CC_ENTERPRISE_URL) )
cc_cli_args+=( $(write_existing_args CC_YML_PATH) )
cc_cli_args+=( $(write_truthy_args CC_VERBOSE) )
cc_cc_args=()
cc_cc_args+=( $(write_truthy_args CC_FAIL_ON_ERROR) )
cc_cc_args+=( $(write_existing_args CC_GIT_SERVICE) )
cc_cc_args+=( $(write_existing_args CC_PARENT_SHA) )
cc_cc_args+=( $(write_existing_args CC_PR) )
cc_cc_args+=( $(write_existing_args CC_SHA) )
cc_cc_args+=( $(write_existing_args CC_SLUG) )
cc_create_report_args=()
cc_cr_args+=( $(write_existing_args CC_CODE) )
cc_cr_args+=( $(write_truthy_args CC_FAIL_ON_ERROR) )
cc_cr_args+=( $(write_existing_args CC_GIT_SERVICE) )
cc_cr_args+=( $(write_existing_args CC_PR) )
cc_cr_args+=( $(write_existing_args CC_SHA) )
cc_cr_args+=( $(write_existing_args CC_SLUG) )
cc_du_args=()
OLDIFS=$IFS;IFS=,
cc_du_args+=( $(write_existing_args CC_BRANCH) )
cc_du_args+=( $(write_existing_args CC_BUILD) )
cc_du_args+=( $(write_existing_args CC_BUILD_URL) )
cc_du_args+=( $(write_existing_args CC_CODE) )
cc_du_args+=( $(write_existing_args CC_DIR) )
cc_du_args+=( $(write_truthy_args CC_DISABLE_FILE_FIXES) )
cc_du_args+=( $(write_truthy_args CC_DISABLE_SEARCH) )
cc_du_args+=( $(write_truthy_args CC_DRY_RUN) )
cc_du_args+=( $(write_existing_args CC_ENV) )
if [ -n "$CC_EXCLUDES" ];
then
  for directory in $CC_EXCLUDES; do
    cc_du_args+=( " --exclude " "$directory" )
  done
fi
cc_du_args+=( $(write_truthy_args CC_FAIL_ON_ERROR) )
if [ -n "$CC_FILES" ];
then
  for file in $CC_FILES; do
    cc_du_args+=( " --file " "$file" )
  done
fi
if [ -n "$CC_FLAGS" ];
then
  for flag in $CC_FLAGS; do
    cc_du_args+=( " --flag " "$flag" )
  done
fi
cc_du_args+=( $(write_existing_args CC_GCOV_ARGS) )
cc_du_args+=( $(write_existing_args CC_GCOV_EXECUTABLE) )
cc_du_args+=( $(write_existing_args CC_GCOV_IGNORE) )
cc_du_args+=( $(write_existing_args CC_GCOV_INCLUDE) )
cc_du_args+=( $(write_existing_args CC_GIT_SERVICE) )
cc_du_args+=( $(write_truthy_args CC_HANDLE_NO_REPORTS_FOUND) )
cc_du_args+=( $(write_existing_args CC_JOB_CODE) )
cc_du_args+=( $(write_truthy_args CC_LEGACY) )
cc_du_args+=( $(write_existing_args CC_NAME) )
cc_du_args+=( $(write_existing_args CC_NETWORK_FILTER) )
cc_du_args+=( $(write_existing_args CC_NETWORK_PREFIX) )
cc_du_args+=( $(write_existing_args CC_NETWORK_ROOT_FOLDER) )
if [ -n "$CC_PLUGINS" ];
then
  for plugin in $CC_PLUGINS; do
    cc_du_args+=( " --plugin " "$plugin" )
  done
fi
cc_du_args+=( $(write_existing_args CC_PR) )
cc_du_args+=( $(write_existing_args CC_REPORT_TYPE) )
cc_du_args+=( $(write_existing_args CC_SHA) )
cc_du_args+=( $(write_existing_args CC_SLUG) )
cc_du_args+=( $(write_existing_args CC_SWIFT_PROJECT) )
IFS=$OLDIFS
unset NODE_OPTIONS
# See https://github.com/codecov/uploader/issues/475
chmod +x $cc_filename
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
say "$g==>$x Running create-commit"
say "      $b./$cc_filename $(echo "${cc_cli_args[@]}") create-commit$token_str $(echo "${cc_cc_args[@]}")$x"
if ! ./$cc_filename \
  ${cc_cli_args[*]} \
  create-commit \
  ${token_arg[*]} \
  ${cc_cc_args[*]};
then
  exit_if_error "Failed to create-commit"
fi
say " "
say "$g==>$x Running create-report"
say "      $b./$cc_filename $(echo "${cc_cli_args[@]}") create-report$token_str $(echo "${cc_cr_args[@]}")$x"
if ! ./$cc_filename \
  ${cc_cli_args[*]} \
  create-report \
  ${token_arg[*]} \
  ${cc_cr_args[*]};
then
  exit_if_error "Failed to create-report"
fi
say " "
say "$g==>$x Running do-upload"
say "      $b./$cc_filename $(echo "${cc_cli_args[@]}") do-upload$token_str $(echo "${cc_du_args[@]}")$x"
if ! ./$cc_filename \
  ${cc_cli_args[*]} \
  do-upload \
  ${token_arg[*]} \
  ${cc_du_args[*]};
then
  exit_if_error "Failed to upload"
fi
