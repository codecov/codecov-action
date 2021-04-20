import validateUploader, {retrieveChecksum} from './validate';

const request = require('requestretry');

const bashScript = (async () => {
  try {
    const script = await request({
      json: false,
      maxAttempts: 10,
      timeout: 3000,
      url: 'https://codecov.io/bash',
    });
    return script.body;
  } catch (err) {
    throw err;
  }
});

test('valid checksums', async () => {
  const valid = validateUploader(await bashScript());
  expect(valid).toBeTruthy();
});

test('invalid checksums', async () => {
  const script = await bashScript();
  const valid = validateUploader(script.substring(0, script.length - 1));
  expect(valid).toBeFalsy();
});

test('invalid script version', async () => {
  const script = await bashScript();
  const valid = validateUploader(script.substring(0, 20));
  expect(valid).toBeFalsy();
});

test('invalid public checksum file', () => {
  const checksum = retrieveChecksum('foo', 'bar');
  expect(checksum).toBeFalsy();
});

test('invalid public checksum file', () => {
  const checksum = retrieveChecksum('foo', 'bar');
  expect(checksum).toBeFalsy();
});

test('invalid encryption', () => {
  const checksum = retrieveChecksum('1.0.1', 'foo');
  expect(checksum).toBeFalsy();
});

