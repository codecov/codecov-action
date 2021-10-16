import * as github from '@actions/github';

import buildExec from './buildExec';

/* eslint-disable  @typescript-eslint/no-var-requires */
const {version} = require('../package.json');

const context = github.context;

test('no arguments', () => {
  const {execArgs, failCi} = buildExec();

  const args = [
    '-n',
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
    'commit_parent': '83231650328f11695dfb754ca0f540516f188d27',
    'directory': 'coverage/',
    'dry_run': 'true',
    'env_vars': 'OS,PYTHON',
    'fail_ci_if_error': 'true',
    'file': 'coverage.xml',
    'files': 'dir1/coverage.xml,dir2/coverage.xml',
    'flags': 'test,test2',
    'functionalities':
      'network',
    'move_coverage_to_trash': 'true',
    'name': 'codecov',
    'override_branch': 'thomasrockhu/test',
    'override_build': '1',
    'override_commit': '9caabca5474b49de74ef5667deabaf74cdacc244',
    'override_pr': '2',
    'override_tag': 'v1.2',
    'path_to_write_report': 'codecov/',
    'root_dir': 'root/',
    'slug': 'fakeOwner/fakeRepo',
    'token': 'd3859757-ab80-4664-924d-aef22fa7557b',
    'url': 'https://codecov.enterprise.com',
    'verbose': 't',
    'working-directory': 'src',
  };

  for (const env of Object.keys(envs)) {
    process.env['INPUT_' + env.toUpperCase()] = envs[env];
  }

  const {execArgs, failCi} = buildExec();
  expect(execArgs).toEqual([
    '-n',
    'codecov',
    '-Q',
    `github-action-${version}`,
    '-c',
    '-N',
    '83231650328f11695dfb754ca0f540516f188d27',
    '-d',
    '-e',
    'OS,PYTHON',
    '-X',
    'network',
    '-Z',
    '-f',
    'coverage.xml',
    '-f',
    'dir1/coverage.xml',
    '-f',
    'dir2/coverage.xml',
    '-F',
    'test',
    '-F',
    'test2',
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
    '-r',
    'fakeOwner/fakeRepo',
    '-u',
    'https://codecov.enterprise.com',
    '-v',
  ]);
  expect(failCi).toBeTruthy();

  for (const env of Object.keys(envs)) {
    delete process.env['INPUT_' + env.toUpperCase()];
  }
});
