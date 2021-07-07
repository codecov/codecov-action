const fs = require('fs');

const core = require('@actions/core');
const exec = require('@actions/exec');

const superagent = require('superagent');

// import buildExec from './buildExec';

// const {failCi} = buildExec();

try {
  superagent.get('https://uploader.codecov.io/latest/codecov-linux').end((err, res) => {
    if (err) {
      core.setFailed(
          'Codecov: Could not properly download uploader binary: ' +
          `${err.message}`,
      );
    }
    const filename = __dirname + '/uploader';
    fs.writeFile(filename, res, (err) => {
      console.log('Did it');
      if (err) {
        core.setFailed(
            'Codecov: Could not properly write uploader binary: ' +
            `${err.message}`,
        );
      }
      fs.chmodSync(filename, '700');
      console.log('wrote it');
      console.log(fs.readdirSync(__dirname));
      console.log(__dirname);

      exec.exec(filename)
          .catch((err) => {
            core.setFailed(
                `Codecov failed with the following error: ${err.message}`,
            );
          })
          .then(() => {
            console.log('finished!');
          });
    });
  });
} catch (err) {
  core.setFailed(
      `Codecov: Encountered an unexpected error: ${err.message}`,
  );
}
