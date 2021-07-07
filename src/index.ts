const fs = require('fs');

const core = require('@actions/core');
const exec = require('@actions/exec');

const superagent = require('superagent');

// import buildExec from './buildExec';

// const {failCi} = buildExec();

try {
  const filename = __dirname + '/uploader';
  superagent.get('https://uploader.codecov.io/latest/codecov-linux')
      .catch('error', (err) => {
        core.setFailed(
            'Codecov: Could not properly download uploader binary: ' +
            `${err.message}`,
        );
      })
      .pipe(fs.createWriteStream(filename))
      .then((err, res) => {
        fs.chmodSync(filename, '777');
        if (fs.existsSync(filename)) {
          console.log('file exists');
        } else {
          console.log('file does not exist');
        }
        console.log(fs.statSync(filename));

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
} catch (err) {
  core.setFailed(
      `Codecov: Encountered an unexpected error: ${err.message}`,
  );
}
