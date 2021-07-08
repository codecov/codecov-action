const fs = require('fs');

const core = require('@actions/core');
const exec = require('@actions/exec');

const request = require('request');

// import buildExec from './buildExec';

// const {failCi} = buildExec();

try {
  const filename = __dirname + '/uploader';
  request.get('https://uploader.codecov.io/latest/codecov-linux', (err, res, body) => {
    console.log(`err ${err}`);
    console.log(`res ${res}`);
    console.log(`res.ok ${res.ok}`);
    if (err) {
      console.log('there is err');
    }
    if (!res.ok) {
      console.log('there is no res.ok');
    }
    if (err || !res.ok) {
      core.setFailed(
          'Codecov: Could not properly download uploader binary' +
          err ? `: ${err}` : '',
      );
    }
    fs.writeFileSync(filename, body);
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
