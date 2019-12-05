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
/******/ 		return __webpack_require__(34);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function() {

eval("require")("@actions/core");


/***/ }),

/***/ 34:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(6);
const exec = __webpack_require__(273);
const request = __webpack_require__(63);
const fs = __webpack_require__(747);

try {
  const name = core.getInput("name");
  const token = core.getInput("token");
  const flags = core.getInput("flags");
  const file = core.getInput("file");
  const yml = core.getInput("yml");
  const fail_ci = core.getInput("fail_ci_if_error");
  fail_ci = fail_ci.toLowerCase();

  request("https://codecov.io/bash", (error, response, body) => {
    if (error) throw error;

    fs.writeFile("codecov.sh", body, err => {
      if (err) throw err;

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
        GITHUB_SHA: process.env.GITHUB_SHA
      };

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

      if (file) {
        if (fail_ci) {
          exec
            .exec(
              "bash",
              [
                "codecov.sh",
                "-f",
                `${file}`,
                "-n",
                `${name}`,
                "-F",
                `${flags}`,
                "-y",
                `${yml}`,
                "-Z"
              ],
              options
            )
            .then(() => {
              unlinkFile();
            });
        } else {
          exec
            .exec(
              "bash",
              [
                "codecov.sh",
                "-f",
                `${file}`,
                "-n",
                `${name}`,
                "-F",
                `${flags}`,
                "-y",
                `${yml}`
              ],
              options
            )
            .then(() => {
              unlinkFile();
            });
        }
      } else {
        if (fail_ci) {
          exec
            .exec(
              "bash",
              [
                "codecov.sh",
                "-n",
                `${name}`,
                "-F",
                `${flags}`,
                "-y",
                `${yml}`,
                "-Z"
              ],
              options
            )
            .then(() => {
              unlinkFile();
            });
        } else {
          exec
            .exec(
              "bash",
              ["codecov.sh", "-n", `${name}`, "-F", `${flags}`, "-y", `${yml}`],
              options
            )
            .then(() => {
              unlinkFile();
            });
        }
      }

      const unlinkFile = () => {
        fs.unlink("codecov.sh", err => {
          if (err) throw err;
        });
      };
    });
  });
} catch (error) {
  core.setFailed(error.message);
}


/***/ }),

/***/ 63:
/***/ (function() {

eval("require")("request");


/***/ }),

/***/ 273:
/***/ (function() {

eval("require")("@actions/exec");


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ })

/******/ });