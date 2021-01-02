import buildExec from "./buildExec";

test('no arguments', () => {
  let { execArgs, options, filepath, fail_ci } = buildExec();
  expect(execArgs).toEqual([
    "codecov.sh",
    "-n",
    "",
    "-F",
    "",
    "-Q",
    "github-action"
  ]);
  expect(filepath).toEqual('codecov.sh');
  expect(fail_ci).toBeFalsy();
});
