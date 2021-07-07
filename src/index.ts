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
fs.chmodSync('uploader', 0o500);

console.log('Did it');
console.log(fs.readdirSync('.'));
console.log('files');
console.log(__dirname);

exec.exec('./uploader');
