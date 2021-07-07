import buildExec from './buildExec';
const github = require('@actions/github');

const {version} = require('../package.json');

const context = github.context;

test('no arguments', () => {
  const {execArgs, failCi} = buildExec();

  const args = [
    'codecov',
    '-n',
    '',
    '-F',
    '',
    '-Q',
    `github-action-${version}`,
  ];
  if (context.eventName == 'pull_request') {
    args.push('-C', `${context.payload.pull_request.head.sha}`);
  }
  expect(execArgs).toEqual(args);
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
    'network_filter': 'dir1',
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

  const {execArgs, failCi} = buildExec();
  expect(execArgs).toEqual([
    'src/codecov',
    '-n',
    'codecov',
    '-F',
    'test',
    '-Q',
    `github-action-${version}`,
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
    '-i',
    'dir1',
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
    '-R',
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
  expect(failCi).toBeTruthy();

  for (const env of Object.keys(envs)) {
    delete process.env['INPUT_' + env.toUpperCase()];
  }
});
