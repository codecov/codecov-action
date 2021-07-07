const fs = require('fs');

const core = require('@actions/core');
const exec = require('@actions/exec');

const superagent = require('superagent');

// import buildExec from './buildExec';

// const {failCi} = buildExec();

console.log('oh hi');
const uploader = (async () => {
  try {
    return await superagent.get('https://uploader.codecov.io/latest/codecov-linux');
  } catch (err) {
    core.setFailed(
        `Codecov: Could not properly download uploader binary: ${err.message}`,
    );
  }
})();

fs.writeFileSync('uploader', uploader);

console.log('Did it');

exec.exec('uploader');
