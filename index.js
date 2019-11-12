const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const name = core.getInput('name');
  console.log(`Hello ${name}!`);
  
  const token = core.getInput('token');
  console.log(`Hello ${name}!`);

  const flags = core.getInput('flags');
  console.log(`Hello ${name}!`);

  const file = core.getInput('file');
  console.log(`Hello ${file}!`);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  
} catch (error) {
  core.setFailed(error.message);
}