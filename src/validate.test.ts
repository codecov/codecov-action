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
  const valid = await validateUploader(await bashScript());
  expect(valid).toBeTruthy();
});

test('invalid checksums', async () => {
  const script = await bashScript();
  const valid = await validateUploader(script.substring(0, script.length - 1));
  expect(valid).toBeFalsy();
});

test('invalid script version', async () => {
  const script = await bashScript();
  const valid = await validateUploader(script.substring(0, 20));
  expect(valid).toBeFalsy();
});

test('invalid public checksum file', async () => {
  const checksum = await retrieveChecksum('foo', 'bar');
  expect(checksum).toBeFalsy();
});
