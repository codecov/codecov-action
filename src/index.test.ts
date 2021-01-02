import { buildExec } from "./index";

test('no arguments', () => {
  let { execArgs, filepath, fail_ci } = buildExec();
  expect(execArgs).toEqual([]);
  expect(filepath).toEqual('codecov.sh');
  expect(fail_ci).toBeFalsy();
});
