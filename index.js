const core = require('@actions/core');
const github = require('@actions/github');
const request = require('request');
const execSh = require('./node_modules/exec-sh/lib/exec-sh');

const { exec } = require('child_process');

try {
  // `who-to-greet` input defined in action metadata file
  const name = core.getInput('name');
  console.log(`Name: ${name}!`);
  
  const token = core.getInput('token');
  console.log(`Token: ${token}!`);

  const flags = core.getInput('flags');
  console.log(`Flags: ${flags}!`);

  const file = core.getInput('file');
  console.log(`File: ${file}!`);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);


  request('http://codecov.io/bash',  (error, response, body) => {
    console.log('error:', error); 
    console.log('statusCode:', response && response.statusCode); 
    //console.log('body:', body); 
    

    execSh([`export CODECOV_TOKEN=${token}`,body], true, (err, stdout, stderr)=>{
        //console.log("error: ", err);
        console.log("stdout: ", stdout);
        //console.log("stderr: ", stderr);

    })

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

  });
  

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