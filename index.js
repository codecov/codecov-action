const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request');

const exec = require('@actions/exec');


//const execSh = require('./node_modules/exec-sh/lib/exec-sh');
const execFileSync = require('child_process').execFileSync;
// import { execFileSync } from 'child_process';  // replace ^ if using ES modules
// the default is 'buffer'

//const { exec } = require('child_process');

try {
  // `who-to-greet` input defined in action metadata file
  const name = core.getInput('name');
  console.log(`Name: ${name}`);
  
  let token = core.getInput('token');
  console.log(`Token: ${token}`);

  const flags = core.getInput('flags');
  console.log(`Flags: ${flags}`);

  const file = core.getInput('file');
  console.log(`File: ${file}`);

  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);

  let myOutput = '';
  let myError = '';

  const options = {};
  options.listeners = {
    stdout: (data) => {
      myOutput += data.toString();
    },
    stderr: (data) => {
      myError += data.toString();
    }
  };
  options.env = {CODECOV_TOKEN: 'e0f9f29c-c2e4-4dd3-b440-0c2bc6937859', GITHUB_ACTION: process.env.GITHUB_ACTION, GITHUB_REF: process.env.GITHUB_REF, GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY, GITHUB_SHA: process.env.GITHUB_SHA};

  exec.exec('bash', ['bash.sh'], options);

  //execFileSync('bash',['bash.sh'], {shell: true, env:{CODECOV_TOKEN: 'e0f9f29c-c2e4-4dd3-b440-0c2bc6937859', GITHUB_ACTION: process.env.GITHUB_ACTION, GITHUB_REF: process.env.GITHUB_REF, GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY, GITHUB_SHA: process.env.GITHUB_SHA}}); 


  request('https://codecov.io/bash',  (error, response, body) => {
    //console.log('error:', error); 
    //console.log('statusCode:', response && response.statusCode); 
    //console.log('body:', body); 
    // token = token.toString()

    // execSh([`export CODECOV_TOKEN=${token}`, body], true, (err, stdout, stderr)=>{
    //     //console.log("error: ", err);
    //     console.log("stdout: ", stdout);
    //     //console.log("stderr: ", stderr);

    // })

    // execSh(body, true, (err, stdout, stderr)=>{
    //     //console.log("error: ", err);
    //     console.log("stdout: ", stdout);
    //     //console.log("stderr: ", stderr);

    // })

    //body = body.replace("#!/usr/bin/env bash", "#!/bin/sh")

    
   


    // const command = `bash ${body}`
    // //const command = `bash ${body} -t ${token} -n ${name} -F ${flags} -f ${file}`
    // exec(command, (err, stdout, stderr) => {
    //     if (err) {
    //     //some err occurred
    //     console.error(err)
    //     } else {
    //     // the *entire* stdout and stderr (buffered)
    //     console.log(`stdout: ${stdout}`);
    //     console.log(`stderr: ${stderr}`);
    //     }
    // });
  })
  

//   const command = `bash <(curl -s https://codecov.io/bash) -t ${token} -n ${name} -F ${flags} -f ${file}`
//   exec(command, (err, stdout, stderr) => {
//     if (err) {
//       //some err occurred
//       console.error(err)
//     } else {
//      // the *entire* stdout and stderr (buffered)
//      console.log(`stdout: ${stdout}`);
//      console.log(`stderr: ${stderr}`);
//     }
//   });

} catch (error) {
  core.setFailed(error.message);
}