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

const filename = __dirname + '/uploader';
fs.writeFileSync(filename, uploader);
console.log('wrote it');

fs.chmodSync(filename, '700');

console.log('Did it');
console.log(fs.readdirSync(__dirname));
console.log('files');
console.log(__dirname);

(async () => {
  try {
    await exec.exec(filename);
  } catch (err) {
    core.setFailed(
        `Codecov: Could not properly execute uploader binary: ${err.message}`,
    );
  }
})();
