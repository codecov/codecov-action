const core = require('@actions/core');
const request = require('request');
const exec = require('@actions/exec');
const fs   = require('fs')
 
try {

  const name = core.getInput('name');
  console.log(`Name: ${name}`);
  
  let token = core.getInput('token');
  console.log(`Token: ${token}`);

  const flags = core.getInput('flags');
  console.log(`Flags: ${flags}`);

  const file = core.getInput('file');
  console.log(`File: ${file}`);

  request('https://codecov.io/bash',  (error, response, body) => {
    if (error) throw error
    let myOutput = '';
    let myError = '';
    fs.writeFile('codecov.sh', body, (err) => {
      if (err) throw err;
      const options = {};
      options.listeners = {
        stdout: (data) => {
          myOutput += data.toString();
        },
        stderr: (data) => {
          myError += data.toString();
        }
      };
      
      options.env = {
        CODECOV_TOKEN: `${token}`, 
        GITHUB_ACTION: process.env.GITHUB_ACTION, 
        GITHUB_REF: process.env.GITHUB_REF, 
        GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY, 
        GITHUB_SHA: process.env.GITHUB_SHA
      };

      if (file === '' ){
        exec.exec('bash', ['codecov.sh', '-f', `${file}`, '-n', `${name}`, '-F', `${flags}`, ], options);
      }else{
        exec.exec('bash', ['codecov.sh', `${name}`, '-F', `${flags}`, ], options);
      }      
      
    });
  
  })
  
} catch (error) {
  core.setFailed(error.message);
}