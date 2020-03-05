module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(622);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 176:
/***/ (function() {

eval("require")("@actions/exec");


/***/ }),

/***/ 622:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(968);
const exec = __webpack_require__(176);
const request = __webpack_require__(743);
const fs = __webpack_require__(747);

let fail_ci;
try {
  const name = core.getInput("name");
  const token = core.getInput("token");
  const flags = core.getInput("flags");
  const file = core.getInput("file");
  fail_ci = core.getInput("fail_ci_if_error").toLowerCase();

  if (
    fail_ci === "yes" ||
    fail_ci === "y" ||
    fail_ci === "true" ||
    fail_ci === "t" ||
    fail_ci === "1"
  ) {
    fail_ci = true;
  } else {
    fail_ci = false;
  }

  request("https://codecov.io/bash", (error, response, body) => {
    if (error && fail_ci) {
      throw error;
    } else if (error) {
      core.warning(`Codecov warning: ${error.message}`);
    }

    fs.writeFile("codecov.sh", body, err => {
      if (err && fail_ci) {
        throw err;
      } else if (err) {
        core.warning(`Codecov warning: ${err.message}`);
      }

      let output = "";
      let execError = "";
      const options = {};
      options.listeners = {
        stdout: data => {
          output += data.toString();
        },
        stderr: data => {
          execError += data.toString();
        }
      };

      options.env = {
        CODECOV_TOKEN: `${token}`,
        GITHUB_ACTION: process.env.GITHUB_ACTION,
        GITHUB_REF: process.env.GITHUB_REF,
        GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
        GITHUB_SHA: process.env.GITHUB_SHA,
        GITHUB_HEAD_REF: process.env.GITHUB_HEAD_REF || ''
      };

      const execArgs = ["codecov.sh"];
      if (file) {
        execArgs.push(
          "-f", `${file}`
        );
      }

      execArgs.push(
        "-n", `${name}`,
        "-F", `${flags}`
      );

      if (fail_ci) {
        execArgs.push(
          "-Z"
        );
      }

      exec.exec("bash", execArgs, options)
        .catch(err => {
          if (fail_ci) {
            core.setFailed(
              `Codecov failed with the following error: ${err.message}`
            );
          } else {
            core.warning(`Codecov warning: ${err.message}`);
          }
        })
        .then(() => {
          unlinkFile();
        });;

      const unlinkFile = () => {
        fs.unlink("codecov.sh", err => {
          if (err && fail_ci) {
            throw err;
          } else if (err) {
            core.warning(`Codecov warning: ${err.message}`);
          }
        });
      };
    });
  });
} catch (error) {
  if (fail_ci) {
    core.setFailed(`Codecov failed with the following error: ${error.message}`);
  } else {
    core.warning(`Codecov warning: ${error.message}`);
  }
}


/***/ }),

/***/ 743:
/***/ (function() {

eval("require")("request");


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 968:
/***/ (function() {

eval("require")("@actions/core");


/***/ })

/******/ });