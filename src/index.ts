const fs = require('fs');

const core = require('@actions/core');
const exec = require('@actions/exec');

const superagent = require('superagent');

// import buildExec from './buildExec';

// const {failCi} = buildExec();

try {
  const uploader = () => {
    return async () => {
      try {
        const uploadBinary = await superagent.get('https://uploader.codecov.io/latest/codecov-linux');
        return uploadBinary;
      } catch (err) {
        core.setFailed(
            'Codecov: Could not properly download uploader binary: ' +
            `${err.message}`,
        );
      }
    };
  };
  console.log(uploader);
  const filename = __dirname + '/uploader';
  fs.writeFileSync(filename, uploader);
  console.log('wrote it');

  fs.chmodSync(filename, '700');

  console.log('Did it');
  console.log(fs.readdirSync(__dirname));
  console.log(__dirname);

  () => {
    return async () => {
      try {
        await exec.exec(filename);
      } catch (err) {
        core.setFailed(
            'Codecov: Could not properly run uploader binary: ' +
            `${err.message}`,
        );
      }
    };
  };
} catch (err) {
  core.setFailed(
      `Codecov: Encountered an unexpected error: ${err.message}`,
  );
}
