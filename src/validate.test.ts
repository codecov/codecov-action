import validateUploader from './validate';

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

test('validChecksums', async () => {
  const valid = await validateUploader(await bashScript());
  expect(valid).toBeTruthy();
});

test('invalidChecksums', async () => {
  const script = await bashScript();
  const valid = await validateUploader(script.substring(0, script.length - 1));
  expect(valid).toBeFalsy();
});
