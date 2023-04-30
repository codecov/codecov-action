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
    'functionalities': 'network',
    'full_report': 'oldDir/oldReport.json',
    'gcov': 'true',
    'gcov_args': '-v',
    'gcov_ignore': '*.fake',
    'gcov_include': 'real_file',
    'gcov_executable': 'gcov2',
    'move_coverage_to_trash': 'true',
    'name': 'codecov',
    'network_filter': 'src/',
    'network_prefix': 'build/',
    'override_branch': 'thomasrockhu/test',
    'override_build': '1',
    'override_commit': '9caabca5474b49de74ef5667deabaf74cdacc244',
    'override_pr': '2',
    'override_tag': 'v1.2',
    'root_dir': 'root/',
    'swift': 'true',
    'swift_project': 'MyApp',
    'slug': 'fakeOwner/fakeRepo',
    'token': 'd3859757-ab80-4664-924d-aef22fa7557b',
    'upstream_proxy': 'https://codecov.example.com',
    'url': 'https://codecov.enterprise.com',
    'verbose': 't',
    'xcode': 'true',
    'xcode_archive_path': '/test.xcresult',
    'xtra_args': '--some --other --args',
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
    '--full',
    'oldDir/oldReport.json',
    '-F',
    'test',
    '-F',
    'test2',
    '-g',
    '--ga',
    '-v',
    '--gi',
    '*.fake',
    '--gI',
    'real_file',
    '--gx',
    'gcov2',
    '-i',
    'src/',
    '-k',
    'build/',
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
    '--xs',
    '--xsp',
    'MyApp',
    '-U',
    'https://codecov.example.com',
    '-u',
    'https://codecov.enterprise.com',
    '-v',
    '--xc',
    '--xp',
    '/test.xcresult',
    '--some --other --args',
  ]);
  expect(failCi).toBeTruthy();

  for (const env of Object.keys(envs)) {
    delete process.env['INPUT_' + env.toUpperCase()];
  }
});

describe('trim arguments after splitting them', () => {
  const baseExpectation = [
    '-n',
    expect.stringContaining(''),
    '-Q',
    expect.stringContaining('github-action'),
  ];

  test('files', () => {
    const envs = {'files': './client-coverage.txt, ./lcov.info'};

    for (const [name, value] of Object.entries(envs)) {
      process.env['INPUT_' + name.toUpperCase()] = value;
    }

    const {execArgs} = buildExec();

    expect(execArgs).toEqual(
        expect.arrayContaining([
          ...baseExpectation,
          '-f',
          './client-coverage.txt',
          '-f',
          './lcov.info',
        ]),
    );

    for (const env of Object.keys(envs)) {
      delete process.env['INPUT_' + env.toUpperCase()];
    }
  });

  test('flags', () => {
    const envs = {'flags': 'ios, mobile'};

    for (const [name, value] of Object.entries(envs)) {
      process.env['INPUT_' + name.toUpperCase()] = value;
    }

    const {execArgs} = buildExec();

    expect(execArgs).toEqual(
        expect.arrayContaining([
          ...baseExpectation,
          '-F',
          'ios',
          '-F',
          'mobile',
        ]),
    );

    for (const env of Object.keys(envs)) {
      delete process.env['INPUT_' + env.toUpperCase()];
    }
  });

  test('functionalities', () => {
    const envs = {'functionalities': 'network, gcov'};

    for (const [name, value] of Object.entries(envs)) {
      process.env['INPUT_' + name.toUpperCase()] = value;
    }

    const {execArgs} = buildExec();

    expect(execArgs).toEqual(
        expect.arrayContaining([
          ...baseExpectation,
          '-X',
          'network',
          '-X',
          'gcov',
        ]),
    );

    for (const env of Object.keys(envs)) {
      delete process.env['INPUT_' + env.toUpperCase()];
    }
  });
});
