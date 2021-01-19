import buildExec from './buildExec';

test('no arguments', () => {
  const {execArgs, filepath, failCi} = buildExec();
  expect(execArgs).toEqual([
    'codecov.sh',
    '-n',
    '',
    '-F',
    '',
    '-Q',
    'github-action',
  ]);
  expect(filepath).toEqual('codecov.sh');
  expect(failCi).toBeFalsy();
});

test('all arguments', () => {
  const envs = {
    'move_coverage_to_trash': 'true',
    'commit_parent': '83231650328f11695dfb754ca0f540516f188d27',
    'aws_curl_args': '--timeout 1',
    'codecov_curl_args': '--timeout 2',
    'env_vars': 'OS,PYTHON',
    'fail_ci_if_error': 'true',
    'file': 'coverage.xml',
    'files': 'dir1/coverage.xml,dir2/coverage.xml',
    'flags': 'test',
    'functionalities':
      'gcov,coveragepy,fix,search,code,network,gcovout,html,recursesubs',
    'gcov_args': '--timeout 3',
    'gcov_root_dr': 'gcov_dir/',
    'gcov_path_exclude': '**/exclude-dir/*.*',
    'gcov_executable': 'gcov',
    'gcov_path_include': '**/include-dir/*.*',
    'gcov_prefix': 'demo',
    'name': 'codecov',
    'override_branch': 'thomasrockhu/test',
    'override_build': '1',
    'override_commit': '9caabca5474b49de74ef5667deabaf74cdacc244',
    'override_pr': '2',
    'override_tag': 'v1.2',
    'root_dir': 'root/',
    'directory': 'coverage/',
    'token': 'd3859757-ab80-4664-924d-aef22fa7557b',
    'verbose': 't',
    'working-directory': 'src',
    'path_to_write_report': 'codecov/',
    'xcode_derived_data': '~/Library/Developer/Xcode/DerivedData',
    'xcode_package': 'MyApp',
  };

  for (const env of Object.keys(envs)) {
    process.env['INPUT_' + env.toUpperCase()] = envs[env];
  }

  const {execArgs, filepath, failCi} = buildExec();
  expect(execArgs).toEqual([
    'src/codecov.sh',
    '-n',
    'codecov',
    '-F',
    'test',
    '-Q',
    'github-action',
    '-c',
    '-N',
    '83231650328f11695dfb754ca0f540516f188d27',
    '-A',
    '--timeout 1',
    '-U',
    '--timeout 2',
    '-e',
    'OS,PYTHON',
    '-Z',
    '-f',
    'coverage.xml',
    '-f',
    'dir1/coverage.xml',
    '-f',
    'dir2/coverage.xml',
    '-X',
    'gcov',
    '-X',
    'coveragepy',
    '-X',
    'fix',
    '-X',
    'search',
    '-X',
    'code',
    '-X',
    'network',
    '-X',
    'gcovout',
    '-X',
    'html',
    '-X',
    'recursesubs',
    '-a',
    '--timeout 3',
    '-g',
    '**/exclude-dir/*.*',
    '-x',
    'gcov',
    '-G',
    '**/include-dir/*.*',
    '-k',
    'demo',
    '-B',
    'thomasrockhu/test',
    '-b',
    '1',
    '-C',
    '9caabca5474b49de74ef5667deabaf74cdacc244',
    '-P',
    '2',
    '-T',
    'v1.2',
    '-N',
    'root/',
    '-s',
    'coverage/',
    '-v',
    '-q',
    'codecov/',
    '-D',
    '~/Library/Developer/Xcode/DerivedData',
    '-J',
    'MyApp',
  ]);
  expect(filepath).toEqual('src/codecov.sh');
  expect(failCi).toBeTruthy();

  for (const env of Object.keys(envs)) {
    delete process.env['INPUT_' + env.toUpperCase()];
  }
});
