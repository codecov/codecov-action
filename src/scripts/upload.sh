unset NODE_OPTIONS
# See https://github.com/codecov/uploader/issues/475
source $BASH_ENV

chmod +x $codecov_filename
[ -n "${PARAM_FILE}" ] && \
  set - "${@}" "-f" "${PARAM_FILE}"
[ -n "${PARAM_UPLOAD_ARGS}" ] && \
  set - "${@}" "${PARAM_UPLOAD_ARGS}"

if [ -z "${PARAM_UPLOAD_NAME}" ]; then
  PARAM_UPLOAD_NAME="${CIRCLE_BUILD_NUM}"
fi

FLAGS=""
OLDIFS=$IFS;IFS=,
for flag in $PARAM_FLAGS; do
  eval e="\$$flag"
  for param in "${e}" "${flag}"; do
    if [ -n "${param}" ]; then
      if [ -n "${FLAGS}" ]; then
        FLAGS="${FLAGS},${param}"
      else
        FLAGS="${param}"
      fi
      break
    fi
  done
done
IFS=$OLDIFS

if [ -n "$FLAGS" ]; then
  FLAGS="-F ${FLAGS}"
fi

#create commit
echo "./\"$codecov_filename\" ${PARAM_CLI_ARGS} create-commit -t <redacted>"

./"$codecov_filename" \
  ${PARAM_CLI_ARGS} \
  create-commit \
  -t "$(eval echo \$$PARAM_TOKEN)"

#create report
echo "./\"$codecov_filename\" ${PARAM_CLI_ARGS} create-report -t <redacted>"

./"$codecov_filename" \
  ${PARAM_CLI_ARGS} \
  create-report \
  -t "$(eval echo \$$PARAM_TOKEN)"

#upload reports
# alpine doesn't allow for indirect expansion

echo "./${codecov_filename} ${PARAM_CLI_ARGS} do-upload -t <redacted> -n \"${PARAM_UPLOAD_NAME}\" ${FLAGS} ${PARAM_UPLOAD_ARGS} ${@}"

./"$codecov_filename" \
  ${PARAM_CLI_ARGS} \
  do-upload \
  -t "$(eval echo \$$PARAM_TOKEN)" \
  -n "${PARAM_UPLOAD_NAME}" \
  ${FLAGS} \
  ${PARAM_UPLOAD_ARGS} \
  ${@}
