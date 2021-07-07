/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2087));
const path = __importStar(__nccwpck_require__(5622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(5747));
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 1514:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getExecOutput = exports.exec = void 0;
const string_decoder_1 = __nccwpck_require__(4304);
const tr = __importStar(__nccwpck_require__(8159));
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */
function exec(commandLine, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandArgs = tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) {
            throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        }
        // Path to tool to execute should be first arg
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new tr.ToolRunner(toolPath, args, options);
        return runner.exec();
    });
}
exports.exec = exec;
/**
 * Exec a command and get the output.
 * Output will be streamed to the live console.
 * Returns promise with the exit code and collected stdout and stderr
 *
 * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
 * @param     args                  optional arguments for tool. Escaping is handled by the lib.
 * @param     options               optional exec options.  See ExecOptions
 * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
 */
function getExecOutput(commandLine, args, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let stdout = '';
        let stderr = '';
        //Using string decoder covers the case where a mult-byte character is split
        const stdoutDecoder = new string_decoder_1.StringDecoder('utf8');
        const stderrDecoder = new string_decoder_1.StringDecoder('utf8');
        const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
        const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
        const stdErrListener = (data) => {
            stderr += stderrDecoder.write(data);
            if (originalStdErrListener) {
                originalStdErrListener(data);
            }
        };
        const stdOutListener = (data) => {
            stdout += stdoutDecoder.write(data);
            if (originalStdoutListener) {
                originalStdoutListener(data);
            }
        };
        const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), { stdout: stdOutListener, stderr: stdErrListener });
        const exitCode = yield exec(commandLine, args, Object.assign(Object.assign({}, options), { listeners }));
        //flush any remaining characters
        stdout += stdoutDecoder.end();
        stderr += stderrDecoder.end();
        return {
            exitCode,
            stdout,
            stderr
        };
    });
}
exports.getExecOutput = getExecOutput;
//# sourceMappingURL=exec.js.map

/***/ }),

/***/ 8159:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.argStringToArray = exports.ToolRunner = void 0;
const os = __importStar(__nccwpck_require__(2087));
const events = __importStar(__nccwpck_require__(8614));
const child = __importStar(__nccwpck_require__(3129));
const path = __importStar(__nccwpck_require__(5622));
const io = __importStar(__nccwpck_require__(7436));
const ioUtil = __importStar(__nccwpck_require__(1962));
const timers_1 = __nccwpck_require__(8213);
/* eslint-disable @typescript-eslint/unbound-method */
const IS_WINDOWS = process.platform === 'win32';
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */
class ToolRunner extends events.EventEmitter {
    constructor(toolPath, args, options) {
        super();
        if (!toolPath) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
        }
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
    }
    _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) {
            this.options.listeners.debug(message);
        }
    }
    _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
        if (IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
                cmd += toolPath;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows + verbatim
            else if (options.windowsVerbatimArguments) {
                cmd += `"${toolPath}"`;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows (regular)
            else {
                cmd += this._windowsQuoteCmdArg(toolPath);
                for (const a of args) {
                    cmd += ` ${this._windowsQuoteCmdArg(a)}`;
                }
            }
        }
        else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args) {
                cmd += ` ${a}`;
            }
        }
        return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
        try {
            let s = strBuffer + data.toString();
            let n = s.indexOf(os.EOL);
            while (n > -1) {
                const line = s.substring(0, n);
                onLine(line);
                // the rest of the string ...
                s = s.substring(n + os.EOL.length);
                n = s.indexOf(os.EOL);
            }
            return s;
        }
        catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
            return '';
        }
    }
    _getSpawnFileName() {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                return process.env['COMSPEC'] || 'cmd.exe';
            }
        }
        return this.toolPath;
    }
    _getSpawnArgs(options) {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
                for (const a of this.args) {
                    argline += ' ';
                    argline += options.windowsVerbatimArguments
                        ? a
                        : this._windowsQuoteCmdArg(a);
                }
                argline += '"';
                return [argline];
            }
        }
        return this.args;
    }
    _endsWith(str, end) {
        return str.endsWith(end);
    }
    _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return (this._endsWith(upperToolPath, '.CMD') ||
            this._endsWith(upperToolPath, '.BAT'));
    }
    _windowsQuoteCmdArg(arg) {
        // for .exe, apply the normal quoting rules that libuv applies
        if (!this._isCmdFile()) {
            return this._uvQuoteCmdArg(arg);
        }
        // otherwise apply quoting rules specific to the cmd.exe command line parser.
        // the libuv rules are generic and are not designed specifically for cmd.exe
        // command line parser.
        //
        // for a detailed description of the cmd.exe command line parser, refer to
        // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
        // need quotes for empty arg
        if (!arg) {
            return '""';
        }
        // determine whether the arg needs to be quoted
        const cmdSpecialChars = [
            ' ',
            '\t',
            '&',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '^',
            '=',
            ';',
            '!',
            "'",
            '+',
            ',',
            '`',
            '~',
            '|',
            '<',
            '>',
            '"'
        ];
        let needsQuotes = false;
        for (const char of arg) {
            if (cmdSpecialChars.some(x => x === char)) {
                needsQuotes = true;
                break;
            }
        }
        // short-circuit if quotes not needed
        if (!needsQuotes) {
            return arg;
        }
        // the following quoting rules are very similar to the rules that by libuv applies.
        //
        // 1) wrap the string in quotes
        //
        // 2) double-up quotes - i.e. " => ""
        //
        //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
        //    doesn't work well with a cmd.exe command line.
        //
        //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
        //    for example, the command line:
        //          foo.exe "myarg:""my val"""
        //    is parsed by a .NET console app into an arg array:
        //          [ "myarg:\"my val\"" ]
        //    which is the same end result when applying libuv quoting rules. although the actual
        //    command line from libuv quoting rules would look like:
        //          foo.exe "myarg:\"my val\""
        //
        // 3) double-up slashes that precede a quote,
        //    e.g.  hello \world    => "hello \world"
        //          hello\"world    => "hello\\""world"
        //          hello\\"world   => "hello\\\\""world"
        //          hello world\    => "hello world\\"
        //
        //    technically this is not required for a cmd.exe command line, or the batch argument parser.
        //    the reasons for including this as a .cmd quoting rule are:
        //
        //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
        //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
        //
        //    b) it's what we've been doing previously (by deferring to node default behavior) and we
        //       haven't heard any complaints about that aspect.
        //
        // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
        // escaped when used on the command line directly - even though within a .cmd file % can be escaped
        // by using %%.
        //
        // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
        // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
        //
        // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
        // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
        // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
        // to an external program.
        //
        // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
        // % can be escaped within a .cmd file.
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\'; // double the slash
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '"'; // double the quote
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _uvQuoteCmdArg(arg) {
        // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
        // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
        // is used.
        //
        // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
        // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
        // pasting copyright notice from Node within this function:
        //
        //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
        //
        //      Permission is hereby granted, free of charge, to any person obtaining a copy
        //      of this software and associated documentation files (the "Software"), to
        //      deal in the Software without restriction, including without limitation the
        //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        //      sell copies of the Software, and to permit persons to whom the Software is
        //      furnished to do so, subject to the following conditions:
        //
        //      The above copyright notice and this permission notice shall be included in
        //      all copies or substantial portions of the Software.
        //
        //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        //      IN THE SOFTWARE.
        if (!arg) {
            // Need double quotation for empty argument
            return '""';
        }
        if (!arg.includes(' ') && !arg.includes('\t') && !arg.includes('"')) {
            // No quotation needed
            return arg;
        }
        if (!arg.includes('"') && !arg.includes('\\')) {
            // No embedded double quotes or backslashes, so I can just wrap
            // quote marks around the whole thing.
            return `"${arg}"`;
        }
        // Expected input/output:
        //   input : hello"world
        //   output: "hello\"world"
        //   input : hello""world
        //   output: "hello\"\"world"
        //   input : hello\world
        //   output: hello\world
        //   input : hello\\world
        //   output: hello\\world
        //   input : hello\"world
        //   output: "hello\\\"world"
        //   input : hello\\"world
        //   output: "hello\\\\\"world"
        //   input : hello world\
        //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
        //                             but it appears the comment is wrong, it should be "hello world\\"
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\';
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '\\';
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _cloneExecOptions(options) {
        options = options || {};
        const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
    }
    _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result['windowsVerbatimArguments'] =
            options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) {
            result.argv0 = `"${toolPath}"`;
        }
        return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            // root the tool path if it is unrooted and contains relative pathing
            if (!ioUtil.isRooted(this.toolPath) &&
                (this.toolPath.includes('/') ||
                    (IS_WINDOWS && this.toolPath.includes('\\')))) {
                // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
                this.toolPath = path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
            }
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield io.which(this.toolPath, true);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug('arguments:');
                for (const arg of this.args) {
                    this._debug(`   ${arg}`);
                }
                const optionsNonNull = this._cloneExecOptions(this.options);
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                    optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
                }
                const state = new ExecState(optionsNonNull, this.toolPath);
                state.on('debug', (message) => {
                    this._debug(message);
                });
                if (this.options.cwd && !(yield ioUtil.exists(this.options.cwd))) {
                    return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
                }
                const fileName = this._getSpawnFileName();
                const cp = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
                let stdbuffer = '';
                if (cp.stdout) {
                    cp.stdout.on('data', (data) => {
                        if (this.options.listeners && this.options.listeners.stdout) {
                            this.options.listeners.stdout(data);
                        }
                        if (!optionsNonNull.silent && optionsNonNull.outStream) {
                            optionsNonNull.outStream.write(data);
                        }
                        stdbuffer = this._processLineBuffer(data, stdbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.stdline) {
                                this.options.listeners.stdline(line);
                            }
                        });
                    });
                }
                let errbuffer = '';
                if (cp.stderr) {
                    cp.stderr.on('data', (data) => {
                        state.processStderr = true;
                        if (this.options.listeners && this.options.listeners.stderr) {
                            this.options.listeners.stderr(data);
                        }
                        if (!optionsNonNull.silent &&
                            optionsNonNull.errStream &&
                            optionsNonNull.outStream) {
                            const s = optionsNonNull.failOnStdErr
                                ? optionsNonNull.errStream
                                : optionsNonNull.outStream;
                            s.write(data);
                        }
                        errbuffer = this._processLineBuffer(data, errbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.errline) {
                                this.options.listeners.errline(line);
                            }
                        });
                    });
                }
                cp.on('error', (err) => {
                    state.processError = err.message;
                    state.processExited = true;
                    state.processClosed = true;
                    state.CheckComplete();
                });
                cp.on('exit', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                cp.on('close', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    state.processClosed = true;
                    this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                state.on('done', (error, exitCode) => {
                    if (stdbuffer.length > 0) {
                        this.emit('stdline', stdbuffer);
                    }
                    if (errbuffer.length > 0) {
                        this.emit('errline', errbuffer);
                    }
                    cp.removeAllListeners();
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(exitCode);
                    }
                });
                if (this.options.input) {
                    if (!cp.stdin) {
                        throw new Error('child process missing stdin');
                    }
                    cp.stdin.end(this.options.input);
                }
            }));
        });
    }
}
exports.ToolRunner = ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */
function argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = '';
    function append(c) {
        // we only escape double quotes.
        if (escaped && c !== '"') {
            arg += '\\';
        }
        arg += c;
        escaped = false;
    }
    for (let i = 0; i < argString.length; i++) {
        const c = argString.charAt(i);
        if (c === '"') {
            if (!escaped) {
                inQuotes = !inQuotes;
            }
            else {
                append(c);
            }
            continue;
        }
        if (c === '\\' && escaped) {
            append(c);
            continue;
        }
        if (c === '\\' && inQuotes) {
            escaped = true;
            continue;
        }
        if (c === ' ' && !inQuotes) {
            if (arg.length > 0) {
                args.push(arg);
                arg = '';
            }
            continue;
        }
        append(c);
    }
    if (arg.length > 0) {
        args.push(arg.trim());
    }
    return args;
}
exports.argStringToArray = argStringToArray;
class ExecState extends events.EventEmitter {
    constructor(options, toolPath) {
        super();
        this.processClosed = false; // tracks whether the process has exited and stdio is closed
        this.processError = '';
        this.processExitCode = 0;
        this.processExited = false; // tracks whether the process has exited
        this.processStderr = false; // tracks whether stderr was written to
        this.delay = 10000; // 10 seconds
        this.done = false;
        this.timeout = null;
        if (!toolPath) {
            throw new Error('toolPath must not be empty');
        }
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) {
            this.delay = options.delay;
        }
    }
    CheckComplete() {
        if (this.done) {
            return;
        }
        if (this.processClosed) {
            this._setResult();
        }
        else if (this.processExited) {
            this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
        }
    }
    _debug(message) {
        this.emit('debug', message);
    }
    _setResult() {
        // determine whether there is an error
        let error;
        if (this.processExited) {
            if (this.processError) {
                error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
            }
            else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
                error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
            }
            else if (this.processStderr && this.options.failOnStdErr) {
                error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
            }
        }
        // clear the timeout
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.done = true;
        this.emit('done', error, this.processExitCode);
    }
    static HandleTimeout(state) {
        if (state.done) {
            return;
        }
        if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${state.delay /
                1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
        }
        state._setResult();
    }
}
//# sourceMappingURL=toolrunner.js.map

/***/ }),

/***/ 1962:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCmdPath = exports.tryGetExecutablePath = exports.isRooted = exports.isDirectory = exports.exists = exports.IS_WINDOWS = exports.unlink = exports.symlink = exports.stat = exports.rmdir = exports.rename = exports.readlink = exports.readdir = exports.mkdir = exports.lstat = exports.copyFile = exports.chmod = void 0;
const fs = __importStar(__nccwpck_require__(5747));
const path = __importStar(__nccwpck_require__(5622));
_a = fs.promises, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
exports.IS_WINDOWS = process.platform === 'win32';
function exists(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.stat(fsPath);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            }
            throw err;
        }
        return true;
    });
}
exports.exists = exists;
function isDirectory(fsPath, useStat = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
exports.isDirectory = isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */
function isRooted(p) {
    p = normalizeSeparators(p);
    if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
    }
    if (exports.IS_WINDOWS) {
        return (p.startsWith('\\') || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
        ); // e.g. C: or C:\hello
    }
    return p.startsWith('/');
}
exports.isRooted = isRooted;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */
function tryGetExecutablePath(filePath, extensions) {
    return __awaiter(this, void 0, void 0, function* () {
        let stats = undefined;
        try {
            // test file exists
            stats = yield exports.stat(filePath);
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
        }
        if (stats && stats.isFile()) {
            if (exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = path.extname(filePath).toUpperCase();
                if (extensions.some(validExt => validExt.toUpperCase() === upperExt)) {
                    return filePath;
                }
            }
            else {
                if (isUnixExecutable(stats)) {
                    return filePath;
                }
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions) {
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield exports.stat(filePath);
            }
            catch (err) {
                if (err.code !== 'ENOENT') {
                    // eslint-disable-next-line no-console
                    console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
                }
            }
            if (stats && stats.isFile()) {
                if (exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = path.dirname(filePath);
                        const upperName = path.basename(filePath).toUpperCase();
                        for (const actualName of yield exports.readdir(directory)) {
                            if (upperName === actualName.toUpperCase()) {
                                filePath = path.join(directory, actualName);
                                break;
                            }
                        }
                    }
                    catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                }
                else {
                    if (isUnixExecutable(stats)) {
                        return filePath;
                    }
                }
            }
        }
        return '';
    });
}
exports.tryGetExecutablePath = tryGetExecutablePath;
function normalizeSeparators(p) {
    p = p || '';
    if (exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, '\\');
        // remove redundant slashes
        return p.replace(/\\\\+/g, '\\');
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, '/');
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function isUnixExecutable(stats) {
    return ((stats.mode & 1) > 0 ||
        ((stats.mode & 8) > 0 && stats.gid === process.getgid()) ||
        ((stats.mode & 64) > 0 && stats.uid === process.getuid()));
}
// Get the path of cmd.exe in windows
function getCmdPath() {
    var _a;
    return (_a = process.env['COMSPEC']) !== null && _a !== void 0 ? _a : `cmd.exe`;
}
exports.getCmdPath = getCmdPath;
//# sourceMappingURL=io-util.js.map

/***/ }),

/***/ 7436:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findInPath = exports.which = exports.mkdirP = exports.rmRF = exports.mv = exports.cp = void 0;
const assert_1 = __nccwpck_require__(2357);
const childProcess = __importStar(__nccwpck_require__(3129));
const path = __importStar(__nccwpck_require__(5622));
const util_1 = __nccwpck_require__(1669);
const ioUtil = __importStar(__nccwpck_require__(1962));
const exec = util_1.promisify(childProcess.exec);
const execFile = util_1.promisify(childProcess.execFile);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */
function cp(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { force, recursive, copySourceDirectory } = readCopyOptions(options);
        const destStat = (yield ioUtil.exists(dest)) ? yield ioUtil.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) {
            return;
        }
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory() && copySourceDirectory
            ? path.join(dest, path.basename(source))
            : dest;
        if (!(yield ioUtil.exists(source))) {
            throw new Error(`no such file or directory: ${source}`);
        }
        const sourceStat = yield ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) {
                throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            }
            else {
                yield cpDirRecursive(source, newDest, 0, force);
            }
        }
        else {
            if (path.relative(source, newDest) === '') {
                // a file cannot be copied to itself
                throw new Error(`'${newDest}' and '${source}' are the same file`);
            }
            yield copyFile(source, newDest, force);
        }
    });
}
exports.cp = cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */
function mv(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield ioUtil.exists(dest)) {
            let destExists = true;
            if (yield ioUtil.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = path.join(dest, path.basename(source));
                destExists = yield ioUtil.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) {
                    yield rmRF(dest);
                }
                else {
                    throw new Error('Destination already exists');
                }
            }
        }
        yield mkdirP(path.dirname(dest));
        yield ioUtil.rename(source, dest);
    });
}
exports.mv = mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */
function rmRF(inputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ioUtil.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            // Check for invalid characters
            // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
            if (/[*"<>|]/.test(inputPath)) {
                throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
            }
            try {
                const cmdPath = ioUtil.getCmdPath();
                if (yield ioUtil.isDirectory(inputPath, true)) {
                    yield exec(`${cmdPath} /s /c "rd /s /q "%inputPath%""`, {
                        env: { inputPath }
                    });
                }
                else {
                    yield exec(`${cmdPath} /s /c "del /f /a "%inputPath%""`, {
                        env: { inputPath }
                    });
                }
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
                yield ioUtil.unlink(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
        }
        else {
            let isDir = false;
            try {
                isDir = yield ioUtil.isDirectory(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
                return;
            }
            if (isDir) {
                yield execFile(`rm`, [`-rf`, `${inputPath}`]);
            }
            else {
                yield ioUtil.unlink(inputPath);
            }
        }
    });
}
exports.rmRF = rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */
function mkdirP(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(fsPath, 'a path argument must be provided');
        yield ioUtil.mkdir(fsPath, { recursive: true });
    });
}
exports.mkdirP = mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */
function which(tool, check) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // recursive when check=true
        if (check) {
            const result = yield which(tool, false);
            if (!result) {
                if (ioUtil.IS_WINDOWS) {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                }
                else {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
                }
            }
            return result;
        }
        const matches = yield findInPath(tool);
        if (matches && matches.length > 0) {
            return matches[0];
        }
        return '';
    });
}
exports.which = which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */
function findInPath(tool) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // build the list of extensions to try
        const extensions = [];
        if (ioUtil.IS_WINDOWS && process.env['PATHEXT']) {
            for (const extension of process.env['PATHEXT'].split(path.delimiter)) {
                if (extension) {
                    extensions.push(extension);
                }
            }
        }
        // if it's rooted, return it if exists. otherwise return empty.
        if (ioUtil.isRooted(tool)) {
            const filePath = yield ioUtil.tryGetExecutablePath(tool, extensions);
            if (filePath) {
                return [filePath];
            }
            return [];
        }
        // if any path separators, return empty
        if (tool.includes(path.sep)) {
            return [];
        }
        // build the list of directories
        //
        // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
        // it feels like we should not do this. Checking the current directory seems like more of a use
        // case of a shell, and the which() function exposed by the toolkit should strive for consistency
        // across platforms.
        const directories = [];
        if (process.env.PATH) {
            for (const p of process.env.PATH.split(path.delimiter)) {
                if (p) {
                    directories.push(p);
                }
            }
        }
        // find all matches
        const matches = [];
        for (const directory of directories) {
            const filePath = yield ioUtil.tryGetExecutablePath(path.join(directory, tool), extensions);
            if (filePath) {
                matches.push(filePath);
            }
        }
        return matches;
    });
}
exports.findInPath = findInPath;
function readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    const copySourceDirectory = options.copySourceDirectory == null
        ? true
        : Boolean(options.copySourceDirectory);
    return { force, recursive, copySourceDirectory };
}
function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return __awaiter(this, void 0, void 0, function* () {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255)
            return;
        currentDepth++;
        yield mkdirP(destDir);
        const files = yield ioUtil.readdir(sourceDir);
        for (const fileName of files) {
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) {
                // Recurse
                yield cpDirRecursive(srcFile, destFile, currentDepth, force);
            }
            else {
                yield copyFile(srcFile, destFile, force);
            }
        }
        // Change the mode for the newly created directory
        yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function copyFile(srcFile, destFile, force) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield ioUtil.lstat(destFile);
                yield ioUtil.unlink(destFile);
            }
            catch (e) {
                // Try to override file permission
                if (e.code === 'EPERM') {
                    yield ioUtil.chmod(destFile, '0666');
                    yield ioUtil.unlink(destFile);
                }
                // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield ioUtil.readlink(srcFile);
            yield ioUtil.symlink(symlinkFull, destFile, ioUtil.IS_WINDOWS ? 'junction' : null);
        }
        else if (!(yield ioUtil.exists(destFile)) || force) {
            yield ioUtil.copyFile(srcFile, destFile);
        }
    });
}
//# sourceMappingURL=io.js.map

/***/ }),

/***/ 4812:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports =
{
  parallel      : __nccwpck_require__(8210),
  serial        : __nccwpck_require__(445),
  serialOrdered : __nccwpck_require__(3578)
};


/***/ }),

/***/ 1700:
/***/ ((module) => {

// API
module.exports = abort;

/**
 * Aborts leftover active jobs
 *
 * @param {object} state - current state object
 */
function abort(state)
{
  Object.keys(state.jobs).forEach(clean.bind(state));

  // reset leftover jobs
  state.jobs = {};
}

/**
 * Cleans up leftover job by invoking abort function for the provided job id
 *
 * @this  state
 * @param {string|number} key - job id to abort
 */
function clean(key)
{
  if (typeof this.jobs[key] == 'function')
  {
    this.jobs[key]();
  }
}


/***/ }),

/***/ 2794:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var defer = __nccwpck_require__(5295);

// API
module.exports = async;

/**
 * Runs provided callback asynchronously
 * even if callback itself is not
 *
 * @param   {function} callback - callback to invoke
 * @returns {function} - augmented callback
 */
function async(callback)
{
  var isAsync = false;

  // check if async happened
  defer(function() { isAsync = true; });

  return function async_callback(err, result)
  {
    if (isAsync)
    {
      callback(err, result);
    }
    else
    {
      defer(function nextTick_callback()
      {
        callback(err, result);
      });
    }
  };
}


/***/ }),

/***/ 5295:
/***/ ((module) => {

module.exports = defer;

/**
 * Runs provided function on next iteration of the event loop
 *
 * @param {function} fn - function to run
 */
function defer(fn)
{
  var nextTick = typeof setImmediate == 'function'
    ? setImmediate
    : (
      typeof process == 'object' && typeof process.nextTick == 'function'
      ? process.nextTick
      : null
    );

  if (nextTick)
  {
    nextTick(fn);
  }
  else
  {
    setTimeout(fn, 0);
  }
}


/***/ }),

/***/ 9023:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var async = __nccwpck_require__(2794)
  , abort = __nccwpck_require__(1700)
  ;

// API
module.exports = iterate;

/**
 * Iterates over each job object
 *
 * @param {array|object} list - array or object (named list) to iterate over
 * @param {function} iterator - iterator to run
 * @param {object} state - current job status
 * @param {function} callback - invoked when all elements processed
 */
function iterate(list, iterator, state, callback)
{
  // store current index
  var key = state['keyedList'] ? state['keyedList'][state.index] : state.index;

  state.jobs[key] = runJob(iterator, key, list[key], function(error, output)
  {
    // don't repeat yourself
    // skip secondary callbacks
    if (!(key in state.jobs))
    {
      return;
    }

    // clean up jobs
    delete state.jobs[key];

    if (error)
    {
      // don't process rest of the results
      // stop still active jobs
      // and reset the list
      abort(state);
    }
    else
    {
      state.results[key] = output;
    }

    // return salvaged results
    callback(error, state.results);
  });
}

/**
 * Runs iterator over provided job element
 *
 * @param   {function} iterator - iterator to invoke
 * @param   {string|number} key - key/index of the element in the list of jobs
 * @param   {mixed} item - job description
 * @param   {function} callback - invoked after iterator is done with the job
 * @returns {function|mixed} - job abort function or something else
 */
function runJob(iterator, key, item, callback)
{
  var aborter;

  // allow shortcut if iterator expects only two arguments
  if (iterator.length == 2)
  {
    aborter = iterator(item, async(callback));
  }
  // otherwise go with full three arguments
  else
  {
    aborter = iterator(item, key, async(callback));
  }

  return aborter;
}


/***/ }),

/***/ 2474:
/***/ ((module) => {

// API
module.exports = state;

/**
 * Creates initial state object
 * for iteration over list
 *
 * @param   {array|object} list - list to iterate over
 * @param   {function|null} sortMethod - function to use for keys sort,
 *                                     or `null` to keep them as is
 * @returns {object} - initial state object
 */
function state(list, sortMethod)
{
  var isNamedList = !Array.isArray(list)
    , initState =
    {
      index    : 0,
      keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
      jobs     : {},
      results  : isNamedList ? {} : [],
      size     : isNamedList ? Object.keys(list).length : list.length
    }
    ;

  if (sortMethod)
  {
    // sort array keys based on it's values
    // sort object's keys just on own merit
    initState.keyedList.sort(isNamedList ? sortMethod : function(a, b)
    {
      return sortMethod(list[a], list[b]);
    });
  }

  return initState;
}


/***/ }),

/***/ 7942:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var abort = __nccwpck_require__(1700)
  , async = __nccwpck_require__(2794)
  ;

// API
module.exports = terminator;

/**
 * Terminates jobs in the attached state context
 *
 * @this  AsyncKitState#
 * @param {function} callback - final callback to invoke after termination
 */
function terminator(callback)
{
  if (!Object.keys(this.jobs).length)
  {
    return;
  }

  // fast forward iteration index
  this.index = this.size;

  // abort jobs
  abort(this);

  // send back results we have so far
  async(callback)(null, this.results);
}


/***/ }),

/***/ 8210:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var iterate    = __nccwpck_require__(9023)
  , initState  = __nccwpck_require__(2474)
  , terminator = __nccwpck_require__(7942)
  ;

// Public API
module.exports = parallel;

/**
 * Runs iterator over provided array elements in parallel
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function parallel(list, iterator, callback)
{
  var state = initState(list);

  while (state.index < (state['keyedList'] || list).length)
  {
    iterate(list, iterator, state, function(error, result)
    {
      if (error)
      {
        callback(error, result);
        return;
      }

      // looks like it's the last one
      if (Object.keys(state.jobs).length === 0)
      {
        callback(null, state.results);
        return;
      }
    });

    state.index++;
  }

  return terminator.bind(state, callback);
}


/***/ }),

/***/ 445:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var serialOrdered = __nccwpck_require__(3578);

// Public API
module.exports = serial;

/**
 * Runs iterator over provided array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function serial(list, iterator, callback)
{
  return serialOrdered(list, iterator, null, callback);
}


/***/ }),

/***/ 3578:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var iterate    = __nccwpck_require__(9023)
  , initState  = __nccwpck_require__(2474)
  , terminator = __nccwpck_require__(7942)
  ;

// Public API
module.exports = serialOrdered;
// sorting helpers
module.exports.ascending  = ascending;
module.exports.descending = descending;

/**
 * Runs iterator over provided sorted array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} sortMethod - custom sort function
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function serialOrdered(list, iterator, sortMethod, callback)
{
  var state = initState(list, sortMethod);

  iterate(list, iterator, state, function iteratorHandler(error, result)
  {
    if (error)
    {
      callback(error, result);
      return;
    }

    state.index++;

    // are we there yet?
    if (state.index < (state['keyedList'] || list).length)
    {
      iterate(list, iterator, state, iteratorHandler);
      return;
    }

    // done here
    callback(null, state.results);
  });

  return terminator.bind(state, callback);
}

/*
 * -- Sort methods
 */

/**
 * sort helper to sort array elements in ascending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */
function ascending(a, b)
{
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * sort helper to sort array elements in descending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */
function descending(a, b)
{
  return -1 * ascending(a, b);
}


/***/ }),

/***/ 8803:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var GetIntrinsic = __nccwpck_require__(4538);

var callBind = __nccwpck_require__(2977);

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ 2977:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var bind = __nccwpck_require__(8334);
var GetIntrinsic = __nccwpck_require__(4538);

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ 5443:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var util = __nccwpck_require__(1669);
var Stream = __nccwpck_require__(2413).Stream;
var DelayedStream = __nccwpck_require__(8611);

module.exports = CombinedStream;
function CombinedStream() {
  this.writable = false;
  this.readable = true;
  this.dataSize = 0;
  this.maxDataSize = 2 * 1024 * 1024;
  this.pauseStreams = true;

  this._released = false;
  this._streams = [];
  this._currentStream = null;
  this._insideLoop = false;
  this._pendingNext = false;
}
util.inherits(CombinedStream, Stream);

CombinedStream.create = function(options) {
  var combinedStream = new this();

  options = options || {};
  for (var option in options) {
    combinedStream[option] = options[option];
  }

  return combinedStream;
};

CombinedStream.isStreamLike = function(stream) {
  return (typeof stream !== 'function')
    && (typeof stream !== 'string')
    && (typeof stream !== 'boolean')
    && (typeof stream !== 'number')
    && (!Buffer.isBuffer(stream));
};

CombinedStream.prototype.append = function(stream) {
  var isStreamLike = CombinedStream.isStreamLike(stream);

  if (isStreamLike) {
    if (!(stream instanceof DelayedStream)) {
      var newStream = DelayedStream.create(stream, {
        maxDataSize: Infinity,
        pauseStream: this.pauseStreams,
      });
      stream.on('data', this._checkDataSize.bind(this));
      stream = newStream;
    }

    this._handleErrors(stream);

    if (this.pauseStreams) {
      stream.pause();
    }
  }

  this._streams.push(stream);
  return this;
};

CombinedStream.prototype.pipe = function(dest, options) {
  Stream.prototype.pipe.call(this, dest, options);
  this.resume();
  return dest;
};

CombinedStream.prototype._getNext = function() {
  this._currentStream = null;

  if (this._insideLoop) {
    this._pendingNext = true;
    return; // defer call
  }

  this._insideLoop = true;
  try {
    do {
      this._pendingNext = false;
      this._realGetNext();
    } while (this._pendingNext);
  } finally {
    this._insideLoop = false;
  }
};

CombinedStream.prototype._realGetNext = function() {
  var stream = this._streams.shift();


  if (typeof stream == 'undefined') {
    this.end();
    return;
  }

  if (typeof stream !== 'function') {
    this._pipeNext(stream);
    return;
  }

  var getStream = stream;
  getStream(function(stream) {
    var isStreamLike = CombinedStream.isStreamLike(stream);
    if (isStreamLike) {
      stream.on('data', this._checkDataSize.bind(this));
      this._handleErrors(stream);
    }

    this._pipeNext(stream);
  }.bind(this));
};

CombinedStream.prototype._pipeNext = function(stream) {
  this._currentStream = stream;

  var isStreamLike = CombinedStream.isStreamLike(stream);
  if (isStreamLike) {
    stream.on('end', this._getNext.bind(this));
    stream.pipe(this, {end: false});
    return;
  }

  var value = stream;
  this.write(value);
  this._getNext();
};

CombinedStream.prototype._handleErrors = function(stream) {
  var self = this;
  stream.on('error', function(err) {
    self._emitError(err);
  });
};

CombinedStream.prototype.write = function(data) {
  this.emit('data', data);
};

CombinedStream.prototype.pause = function() {
  if (!this.pauseStreams) {
    return;
  }

  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.pause) == 'function') this._currentStream.pause();
  this.emit('pause');
};

CombinedStream.prototype.resume = function() {
  if (!this._released) {
    this._released = true;
    this.writable = true;
    this._getNext();
  }

  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.resume) == 'function') this._currentStream.resume();
  this.emit('resume');
};

CombinedStream.prototype.end = function() {
  this._reset();
  this.emit('end');
};

CombinedStream.prototype.destroy = function() {
  this._reset();
  this.emit('close');
};

CombinedStream.prototype._reset = function() {
  this.writable = false;
  this._streams = [];
  this._currentStream = null;
};

CombinedStream.prototype._checkDataSize = function() {
  this._updateDataSize();
  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
  this._emitError(new Error(message));
};

CombinedStream.prototype._updateDataSize = function() {
  this.dataSize = 0;

  var self = this;
  this._streams.forEach(function(stream) {
    if (!stream.dataSize) {
      return;
    }

    self.dataSize += stream.dataSize;
  });

  if (this._currentStream && this._currentStream.dataSize) {
    this.dataSize += this._currentStream.dataSize;
  }
};

CombinedStream.prototype._emitError = function(err) {
  this._reset();
  this.emit('error', err);
};


/***/ }),

/***/ 5507:
/***/ ((__unused_webpack_module, exports) => {

/* jshint node: true */
(function () {
    "use strict";

    function CookieAccessInfo(domain, path, secure, script) {
        if (this instanceof CookieAccessInfo) {
            this.domain = domain || undefined;
            this.path = path || "/";
            this.secure = !!secure;
            this.script = !!script;
            return this;
        }
        return new CookieAccessInfo(domain, path, secure, script);
    }
    CookieAccessInfo.All = Object.freeze(Object.create(null));
    exports.CookieAccessInfo = CookieAccessInfo;

    function Cookie(cookiestr, request_domain, request_path) {
        if (cookiestr instanceof Cookie) {
            return cookiestr;
        }
        if (this instanceof Cookie) {
            this.name = null;
            this.value = null;
            this.expiration_date = Infinity;
            this.path = String(request_path || "/");
            this.explicit_path = false;
            this.domain = request_domain || null;
            this.explicit_domain = false;
            this.secure = false; //how to define default?
            this.noscript = false; //httponly
            if (cookiestr) {
                this.parse(cookiestr, request_domain, request_path);
            }
            return this;
        }
        return new Cookie(cookiestr, request_domain, request_path);
    }
    exports.Cookie = Cookie;

    Cookie.prototype.toString = function toString() {
        var str = [this.name + "=" + this.value];
        if (this.expiration_date !== Infinity) {
            str.push("expires=" + (new Date(this.expiration_date)).toGMTString());
        }
        if (this.domain) {
            str.push("domain=" + this.domain);
        }
        if (this.path) {
            str.push("path=" + this.path);
        }
        if (this.secure) {
            str.push("secure");
        }
        if (this.noscript) {
            str.push("httponly");
        }
        return str.join("; ");
    };

    Cookie.prototype.toValueString = function toValueString() {
        return this.name + "=" + this.value;
    };

    var cookie_str_splitter = /[:](?=\s*[a-zA-Z0-9_\-]+\s*[=])/g;
    Cookie.prototype.parse = function parse(str, request_domain, request_path) {
        if (this instanceof Cookie) {
            var parts = str.split(";").filter(function (value) {
                    return !!value;
                });
            var i;

            var pair = parts[0].match(/([^=]+)=([\s\S]*)/);
            if (!pair) {
                console.warn("Invalid cookie header encountered. Header: '"+str+"'");
                return;
            }

            var key = pair[1];
            var value = pair[2];
            if ( typeof key !== 'string' || key.length === 0 || typeof value !== 'string' ) {
                console.warn("Unable to extract values from cookie header. Cookie: '"+str+"'");
                return;
            }

            this.name = key;
            this.value = value;

            for (i = 1; i < parts.length; i += 1) {
                pair = parts[i].match(/([^=]+)(?:=([\s\S]*))?/);
                key = pair[1].trim().toLowerCase();
                value = pair[2];
                switch (key) {
                case "httponly":
                    this.noscript = true;
                    break;
                case "expires":
                    this.expiration_date = value ?
                            Number(Date.parse(value)) :
                            Infinity;
                    break;
                case "path":
                    this.path = value ?
                            value.trim() :
                            "";
                    this.explicit_path = true;
                    break;
                case "domain":
                    this.domain = value ?
                            value.trim() :
                            "";
                    this.explicit_domain = !!this.domain;
                    break;
                case "secure":
                    this.secure = true;
                    break;
                }
            }

            if (!this.explicit_path) {
               this.path = request_path || "/";
            }
            if (!this.explicit_domain) {
               this.domain = request_domain;
            }

            return this;
        }
        return new Cookie().parse(str, request_domain, request_path);
    };

    Cookie.prototype.matches = function matches(access_info) {
        if (access_info === CookieAccessInfo.All) {
          return true;
        }
        if (this.noscript && access_info.script ||
                this.secure && !access_info.secure ||
                !this.collidesWith(access_info)) {
            return false;
        }
        return true;
    };

    Cookie.prototype.collidesWith = function collidesWith(access_info) {
        if ((this.path && !access_info.path) || (this.domain && !access_info.domain)) {
            return false;
        }
        if (this.path && access_info.path.indexOf(this.path) !== 0) {
            return false;
        }
        if (this.explicit_path && access_info.path.indexOf( this.path ) !== 0) {
           return false;
        }
        var access_domain = access_info.domain && access_info.domain.replace(/^[\.]/,'');
        var cookie_domain = this.domain && this.domain.replace(/^[\.]/,'');
        if (cookie_domain === access_domain) {
            return true;
        }
        if (cookie_domain) {
            if (!this.explicit_domain) {
                return false; // we already checked if the domains were exactly the same
            }
            var wildcard = access_domain.indexOf(cookie_domain);
            if (wildcard === -1 || wildcard !== access_domain.length - cookie_domain.length) {
                return false;
            }
            return true;
        }
        return true;
    };

    function CookieJar() {
        var cookies, cookies_list, collidable_cookie;
        if (this instanceof CookieJar) {
            cookies = Object.create(null); //name: [Cookie]

            this.setCookie = function setCookie(cookie, request_domain, request_path) {
                var remove, i;
                cookie = new Cookie(cookie, request_domain, request_path);
                //Delete the cookie if the set is past the current time
                remove = cookie.expiration_date <= Date.now();
                if (cookies[cookie.name] !== undefined) {
                    cookies_list = cookies[cookie.name];
                    for (i = 0; i < cookies_list.length; i += 1) {
                        collidable_cookie = cookies_list[i];
                        if (collidable_cookie.collidesWith(cookie)) {
                            if (remove) {
                                cookies_list.splice(i, 1);
                                if (cookies_list.length === 0) {
                                    delete cookies[cookie.name];
                                }
                                return false;
                            }
                            cookies_list[i] = cookie;
                            return cookie;
                        }
                    }
                    if (remove) {
                        return false;
                    }
                    cookies_list.push(cookie);
                    return cookie;
                }
                if (remove) {
                    return false;
                }
                cookies[cookie.name] = [cookie];
                return cookies[cookie.name];
            };
            //returns a cookie
            this.getCookie = function getCookie(cookie_name, access_info) {
                var cookie, i;
                cookies_list = cookies[cookie_name];
                if (!cookies_list) {
                    return;
                }
                for (i = 0; i < cookies_list.length; i += 1) {
                    cookie = cookies_list[i];
                    if (cookie.expiration_date <= Date.now()) {
                        if (cookies_list.length === 0) {
                            delete cookies[cookie.name];
                        }
                        continue;
                    }

                    if (cookie.matches(access_info)) {
                        return cookie;
                    }
                }
            };
            //returns a list of cookies
            this.getCookies = function getCookies(access_info) {
                var matches = [], cookie_name, cookie;
                for (cookie_name in cookies) {
                    cookie = this.getCookie(cookie_name, access_info);
                    if (cookie) {
                        matches.push(cookie);
                    }
                }
                matches.toString = function toString() {
                    return matches.join(":");
                };
                matches.toValueString = function toValueString() {
                    return matches.map(function (c) {
                        return c.toValueString();
                    }).join(';');
                };
                return matches;
            };

            return this;
        }
        return new CookieJar();
    }
    exports.CookieJar = CookieJar;

    //returns list of cookies that were set correctly. Cookies that are expired and removed are not returned.
    CookieJar.prototype.setCookies = function setCookies(cookies, request_domain, request_path) {
        cookies = Array.isArray(cookies) ?
                cookies :
                cookies.split(cookie_str_splitter);
        var successful = [],
            i,
            cookie;
        cookies = cookies.map(function(item){
            return new Cookie(item, request_domain, request_path);
        });
        for (i = 0; i < cookies.length; i += 1) {
            cookie = cookies[i];
            if (this.setCookie(cookie, request_domain, request_path)) {
                successful.push(cookie);
            }
        }
        return successful;
    };
}());


/***/ }),

/***/ 8222:
/***/ ((module, exports, __nccwpck_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __nccwpck_require__(6243)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 6243:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __nccwpck_require__(900);

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 8237:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __nccwpck_require__(8222);
} else {
	module.exports = __nccwpck_require__(5332);
}


/***/ }),

/***/ 5332:
/***/ ((module, exports, __nccwpck_require__) => {

/**
 * Module dependencies.
 */

const tty = __nccwpck_require__(3867);
const util = __nccwpck_require__(1669);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __nccwpck_require__(9318);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __nccwpck_require__(6243)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ 8611:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var Stream = __nccwpck_require__(2413).Stream;
var util = __nccwpck_require__(1669);

module.exports = DelayedStream;
function DelayedStream() {
  this.source = null;
  this.dataSize = 0;
  this.maxDataSize = 1024 * 1024;
  this.pauseStream = true;

  this._maxDataSizeExceeded = false;
  this._released = false;
  this._bufferedEvents = [];
}
util.inherits(DelayedStream, Stream);

DelayedStream.create = function(source, options) {
  var delayedStream = new this();

  options = options || {};
  for (var option in options) {
    delayedStream[option] = options[option];
  }

  delayedStream.source = source;

  var realEmit = source.emit;
  source.emit = function() {
    delayedStream._handleEmit(arguments);
    return realEmit.apply(source, arguments);
  };

  source.on('error', function() {});
  if (delayedStream.pauseStream) {
    source.pause();
  }

  return delayedStream;
};

Object.defineProperty(DelayedStream.prototype, 'readable', {
  configurable: true,
  enumerable: true,
  get: function() {
    return this.source.readable;
  }
});

DelayedStream.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};

DelayedStream.prototype.resume = function() {
  if (!this._released) {
    this.release();
  }

  this.source.resume();
};

DelayedStream.prototype.pause = function() {
  this.source.pause();
};

DelayedStream.prototype.release = function() {
  this._released = true;

  this._bufferedEvents.forEach(function(args) {
    this.emit.apply(this, args);
  }.bind(this));
  this._bufferedEvents = [];
};

DelayedStream.prototype.pipe = function() {
  var r = Stream.prototype.pipe.apply(this, arguments);
  this.resume();
  return r;
};

DelayedStream.prototype._handleEmit = function(args) {
  if (this._released) {
    this.emit.apply(this, args);
    return;
  }

  if (args[0] === 'data') {
    this.dataSize += args[1].length;
    this._checkIfMaxDataSizeExceeded();
  }

  this._bufferedEvents.push(args);
};

DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
  if (this._maxDataSizeExceeded) {
    return;
  }

  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  this._maxDataSizeExceeded = true;
  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.'
  this.emit('error', new Error(message));
};


/***/ }),

/***/ 7676:
/***/ ((module) => {

module.exports = stringify
stringify.default = stringify
stringify.stable = deterministicStringify
stringify.stableStringify = deterministicStringify

var arr = []
var replacerStack = []

// Regular stringify
function stringify (obj, replacer, spacer) {
  decirc(obj, '', [], undefined)
  var res
  if (replacerStack.length === 0) {
    res = JSON.stringify(obj, replacer, spacer)
  } else {
    res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)
  }
  while (arr.length !== 0) {
    var part = arr.pop()
    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3])
    } else {
      part[0][part[1]] = part[2]
    }
  }
  return res
}
function decirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: '[Circular]' })
            arr.push([parent, k, val, propertyDescriptor])
          } else {
            replacerStack.push([val, k])
          }
        } else {
          parent[k] = '[Circular]'
          arr.push([parent, k, val])
        }
        return
      }
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, stack, val)
      }
    } else {
      var keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        decirc(val[key], key, stack, val)
      }
    }
    stack.pop()
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer) {
  var tmp = deterministicDecirc(obj, '', [], undefined) || obj
  var res
  if (replacerStack.length === 0) {
    res = JSON.stringify(tmp, replacer, spacer)
  } else {
    res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)
  }
  while (arr.length !== 0) {
    var part = arr.pop()
    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3])
    } else {
      part[0][part[1]] = part[2]
    }
  }
  return res
}

function deterministicDecirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: '[Circular]' })
            arr.push([parent, k, val, propertyDescriptor])
          } else {
            replacerStack.push([val, k])
          }
        } else {
          parent[k] = '[Circular]'
          arr.push([parent, k, val])
        }
        return
      }
    }
    if (typeof val.toJSON === 'function') {
      return
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, stack, val)
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {}
      var keys = Object.keys(val).sort(compareFunction)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        deterministicDecirc(val[key], key, stack, val)
        tmp[key] = val[key]
      }
      if (parent !== undefined) {
        arr.push([parent, k, val])
        parent[k] = tmp
      } else {
        return tmp
      }
    }
    stack.pop()
  }
}

// wraps replacer function to handle values we couldn't replace
// and mark them as [Circular]
function replaceGetterValues (replacer) {
  replacer = replacer !== undefined ? replacer : function (k, v) { return v }
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i]
        if (part[1] === key && part[0] === val) {
          val = '[Circular]'
          replacerStack.splice(i, 1)
          break
        }
      }
    }
    return replacer.call(this, key, val)
  }
}


/***/ }),

/***/ 8329:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

if (global.GENTLY) __nccwpck_require__(4120) = GENTLY.hijack(require);

var util = __nccwpck_require__(1669),
    fs = __nccwpck_require__(5747),
    EventEmitter = __nccwpck_require__(8614).EventEmitter,
    crypto = __nccwpck_require__(6417);

function File(properties) {
  EventEmitter.call(this);

  this.size = 0;
  this.path = null;
  this.name = null;
  this.type = null;
  this.hash = null;
  this.lastModifiedDate = null;

  this._writeStream = null;
  
  for (var key in properties) {
    this[key] = properties[key];
  }

  if(typeof this.hash === 'string') {
    this.hash = crypto.createHash(properties.hash);
  } else {
    this.hash = null;
  }
}
module.exports = File;
util.inherits(File, EventEmitter);

File.prototype.open = function() {
  this._writeStream = new fs.WriteStream(this.path);
};

File.prototype.toJSON = function() {
  var json = {
    size: this.size,
    path: this.path,
    name: this.name,
    type: this.type,
    mtime: this.lastModifiedDate,
    length: this.length,
    filename: this.filename,
    mime: this.mime
  };
  if (this.hash && this.hash != "") {
    json.hash = this.hash;
  }
  return json;
};

File.prototype.write = function(buffer, cb) {
  var self = this;
  if (self.hash) {
    self.hash.update(buffer);
  }

  if (this._writeStream.closed) {
    return cb();
  }

  this._writeStream.write(buffer, function() {
    self.lastModifiedDate = new Date();
    self.size += buffer.length;
    self.emit('progress', self.size);
    cb();
  });
};

File.prototype.end = function(cb) {
  var self = this;
  if (self.hash) {
    self.hash = self.hash.digest('hex');
  }
  this._writeStream.end(function() {
    self.emit('end');
    cb();
  });
};


/***/ }),

/***/ 7973:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

if (global.GENTLY) __nccwpck_require__(4120) = GENTLY.hijack(require);

var crypto = __nccwpck_require__(6417);
var fs = __nccwpck_require__(5747);
var util = __nccwpck_require__(1669),
    path = __nccwpck_require__(5622),
    File = __nccwpck_require__(8329),
    MultipartParser = __nccwpck_require__(1323).MultipartParser,
    QuerystringParser = __nccwpck_require__(825)/* .QuerystringParser */ .l,
    OctetParser       = __nccwpck_require__(8680)/* .OctetParser */ .h,
    JSONParser = __nccwpck_require__(715)/* .JSONParser */ .c,
    StringDecoder = __nccwpck_require__(4304).StringDecoder,
    EventEmitter = __nccwpck_require__(8614).EventEmitter,
    Stream = __nccwpck_require__(2413).Stream,
    os = __nccwpck_require__(2087);

function IncomingForm(opts) {
  if (!(this instanceof IncomingForm)) return new IncomingForm(opts);
  EventEmitter.call(this);

  opts=opts||{};

  this.error = null;
  this.ended = false;

  this.maxFields = opts.maxFields || 1000;
  this.maxFieldsSize = opts.maxFieldsSize || 20 * 1024 * 1024;
  this.maxFileSize = opts.maxFileSize || 200 * 1024 * 1024;
  this.keepExtensions = opts.keepExtensions || false;
  this.uploadDir = opts.uploadDir || (os.tmpdir && os.tmpdir()) || os.tmpDir();
  this.encoding = opts.encoding || 'utf-8';
  this.headers = null;
  this.type = null;
  this.hash = opts.hash || false;
  this.multiples = opts.multiples || false;

  this.bytesReceived = null;
  this.bytesExpected = null;

  this._parser = null;
  this._flushing = 0;
  this._fieldsSize = 0;
  this._fileSize = 0;
  this.openedFiles = [];

  return this;
}
util.inherits(IncomingForm, EventEmitter);
exports.c = IncomingForm;

IncomingForm.prototype.parse = function(req, cb) {
  this.pause = function() {
    try {
      req.pause();
    } catch (err) {
      // the stream was destroyed
      if (!this.ended) {
        // before it was completed, crash & burn
        this._error(err);
      }
      return false;
    }
    return true;
  };

  this.resume = function() {
    try {
      req.resume();
    } catch (err) {
      // the stream was destroyed
      if (!this.ended) {
        // before it was completed, crash & burn
        this._error(err);
      }
      return false;
    }

    return true;
  };

  // Setup callback first, so we don't miss anything from data events emitted
  // immediately.
  if (cb) {
    var fields = {}, files = {};
    this
      .on('field', function(name, value) {
        fields[name] = value;
      })
      .on('file', function(name, file) {
        if (this.multiples) {
          if (files[name]) {
            if (!Array.isArray(files[name])) {
              files[name] = [files[name]];
            }
            files[name].push(file);
          } else {
            files[name] = file;
          }
        } else {
          files[name] = file;
        }
      })
      .on('error', function(err) {
        cb(err, fields, files);
      })
      .on('end', function() {
        cb(null, fields, files);
      });
  }

  // Parse headers and setup the parser, ready to start listening for data.
  this.writeHeaders(req.headers);

  // Start listening for data.
  var self = this;
  req
    .on('error', function(err) {
      self._error(err);
    })
    .on('aborted', function() {
      self.emit('aborted');
      self._error(new Error('Request aborted'));
    })
    .on('data', function(buffer) {
      self.write(buffer);
    })
    .on('end', function() {
      if (self.error) {
        return;
      }

      var err = self._parser.end();
      if (err) {
        self._error(err);
      }
    });

  return this;
};

IncomingForm.prototype.writeHeaders = function(headers) {
  this.headers = headers;
  this._parseContentLength();
  this._parseContentType();
};

IncomingForm.prototype.write = function(buffer) {
  if (this.error) {
    return;
  }
  if (!this._parser) {
    this._error(new Error('uninitialized parser'));
    return;
  }

  this.bytesReceived += buffer.length;
  this.emit('progress', this.bytesReceived, this.bytesExpected);

  var bytesParsed = this._parser.write(buffer);
  if (bytesParsed !== buffer.length) {
    this._error(new Error('parser error, '+bytesParsed+' of '+buffer.length+' bytes parsed'));
  }

  return bytesParsed;
};

IncomingForm.prototype.pause = function() {
  // this does nothing, unless overwritten in IncomingForm.parse
  return false;
};

IncomingForm.prototype.resume = function() {
  // this does nothing, unless overwritten in IncomingForm.parse
  return false;
};

IncomingForm.prototype.onPart = function(part) {
  // this method can be overwritten by the user
  this.handlePart(part);
};

IncomingForm.prototype.handlePart = function(part) {
  var self = this;

  // This MUST check exactly for undefined. You can not change it to !part.filename.
  if (part.filename === undefined) {
    var value = ''
      , decoder = new StringDecoder(this.encoding);

    part.on('data', function(buffer) {
      self._fieldsSize += buffer.length;
      if (self._fieldsSize > self.maxFieldsSize) {
        self._error(new Error('maxFieldsSize exceeded, received '+self._fieldsSize+' bytes of field data'));
        return;
      }
      value += decoder.write(buffer);
    });

    part.on('end', function() {
      self.emit('field', part.name, value);
    });
    return;
  }

  this._flushing++;

  var file = new File({
    path: this._uploadPath(part.filename),
    name: part.filename,
    type: part.mime,
    hash: self.hash
  });

  this.emit('fileBegin', part.name, file);

  file.open();
  this.openedFiles.push(file);

  part.on('data', function(buffer) {
    self._fileSize += buffer.length;
    if (self._fileSize > self.maxFileSize) {
      self._error(new Error('maxFileSize exceeded, received '+self._fileSize+' bytes of file data'));
      return;
    }
    if (buffer.length == 0) {
      return;
    }
    self.pause();
    file.write(buffer, function() {
      self.resume();
    });
  });

  part.on('end', function() {
    file.end(function() {
      self._flushing--;
      self.emit('file', part.name, file);
      self._maybeEnd();
    });
  });
};

function dummyParser(self) {
  return {
    end: function () {
      self.ended = true;
      self._maybeEnd();
      return null;
    }
  };
}

IncomingForm.prototype._parseContentType = function() {
  if (this.bytesExpected === 0) {
    this._parser = dummyParser(this);
    return;
  }

  if (!this.headers['content-type']) {
    this._error(new Error('bad content-type header, no content-type'));
    return;
  }

  if (this.headers['content-type'].match(/octet-stream/i)) {
    this._initOctetStream();
    return;
  }

  if (this.headers['content-type'].match(/urlencoded/i)) {
    this._initUrlencoded();
    return;
  }

  if (this.headers['content-type'].match(/multipart/i)) {
    var m = this.headers['content-type'].match(/boundary=(?:"([^"]+)"|([^;]+))/i);
    if (m) {
      this._initMultipart(m[1] || m[2]);
    } else {
      this._error(new Error('bad content-type header, no multipart boundary'));
    }
    return;
  }

  if (this.headers['content-type'].match(/json/i)) {
    this._initJSONencoded();
    return;
  }

  this._error(new Error('bad content-type header, unknown content-type: '+this.headers['content-type']));
};

IncomingForm.prototype._error = function(err) {
  if (this.error || this.ended) {
    return;
  }

  this.error = err;
  this.emit('error', err);

  if (Array.isArray(this.openedFiles)) {
    this.openedFiles.forEach(function(file) {
      file._writeStream.destroy();
      setTimeout(fs.unlink, 0, file.path, function(error) { });
    });
  }
};

IncomingForm.prototype._parseContentLength = function() {
  this.bytesReceived = 0;
  if (this.headers['content-length']) {
    this.bytesExpected = parseInt(this.headers['content-length'], 10);
  } else if (this.headers['transfer-encoding'] === undefined) {
    this.bytesExpected = 0;
  }

  if (this.bytesExpected !== null) {
    this.emit('progress', this.bytesReceived, this.bytesExpected);
  }
};

IncomingForm.prototype._newParser = function() {
  return new MultipartParser();
};

IncomingForm.prototype._initMultipart = function(boundary) {
  this.type = 'multipart';

  var parser = new MultipartParser(),
      self = this,
      headerField,
      headerValue,
      part;

  parser.initWithBoundary(boundary);

  parser.onPartBegin = function() {
    part = new Stream();
    part.readable = true;
    part.headers = {};
    part.name = null;
    part.filename = null;
    part.mime = null;

    part.transferEncoding = 'binary';
    part.transferBuffer = '';

    headerField = '';
    headerValue = '';
  };

  parser.onHeaderField = function(b, start, end) {
    headerField += b.toString(self.encoding, start, end);
  };

  parser.onHeaderValue = function(b, start, end) {
    headerValue += b.toString(self.encoding, start, end);
  };

  parser.onHeaderEnd = function() {
    headerField = headerField.toLowerCase();
    part.headers[headerField] = headerValue;

    // matches either a quoted-string or a token (RFC 2616 section 19.5.1)
    var m = headerValue.match(/\bname=("([^"]*)"|([^\(\)<>@,;:\\"\/\[\]\?=\{\}\s\t/]+))/i);
    if (headerField == 'content-disposition') {
      if (m) {
        part.name = m[2] || m[3] || '';
      }

      part.filename = self._fileName(headerValue);
    } else if (headerField == 'content-type') {
      part.mime = headerValue;
    } else if (headerField == 'content-transfer-encoding') {
      part.transferEncoding = headerValue.toLowerCase();
    }

    headerField = '';
    headerValue = '';
  };

  parser.onHeadersEnd = function() {
    switch(part.transferEncoding){
      case 'binary':
      case '7bit':
      case '8bit':
      parser.onPartData = function(b, start, end) {
        part.emit('data', b.slice(start, end));
      };

      parser.onPartEnd = function() {
        part.emit('end');
      };
      break;

      case 'base64':
      parser.onPartData = function(b, start, end) {
        part.transferBuffer += b.slice(start, end).toString('ascii');

        /*
        four bytes (chars) in base64 converts to three bytes in binary
        encoding. So we should always work with a number of bytes that
        can be divided by 4, it will result in a number of buytes that
        can be divided vy 3.
        */
        var offset = parseInt(part.transferBuffer.length / 4, 10) * 4;
        part.emit('data', new Buffer(part.transferBuffer.substring(0, offset), 'base64'));
        part.transferBuffer = part.transferBuffer.substring(offset);
      };

      parser.onPartEnd = function() {
        part.emit('data', new Buffer(part.transferBuffer, 'base64'));
        part.emit('end');
      };
      break;

      default:
      return self._error(new Error('unknown transfer-encoding'));
    }

    self.onPart(part);
  };


  parser.onEnd = function() {
    self.ended = true;
    self._maybeEnd();
  };

  this._parser = parser;
};

IncomingForm.prototype._fileName = function(headerValue) {
  // matches either a quoted-string or a token (RFC 2616 section 19.5.1)
  var m = headerValue.match(/\bfilename=("(.*?)"|([^\(\)<>@,;:\\"\/\[\]\?=\{\}\s\t/]+))($|;\s)/i);
  if (!m) return;

  var match = m[2] || m[3] || '';
  var filename = match.substr(match.lastIndexOf('\\') + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#([\d]{4});/g, function(m, code) {
    return String.fromCharCode(code);
  });
  return filename;
};

IncomingForm.prototype._initUrlencoded = function() {
  this.type = 'urlencoded';

  var parser = new QuerystringParser(this.maxFields)
    , self = this;

  parser.onField = function(key, val) {
    self.emit('field', key, val);
  };

  parser.onEnd = function() {
    self.ended = true;
    self._maybeEnd();
  };

  this._parser = parser;
};

IncomingForm.prototype._initOctetStream = function() {
  this.type = 'octet-stream';
  var filename = this.headers['x-file-name'];
  var mime = this.headers['content-type'];

  var file = new File({
    path: this._uploadPath(filename),
    name: filename,
    type: mime
  });

  this.emit('fileBegin', filename, file);
  file.open();
  this.openedFiles.push(file);
  this._flushing++;

  var self = this;

  self._parser = new OctetParser();

  //Keep track of writes that haven't finished so we don't emit the file before it's done being written
  var outstandingWrites = 0;

  self._parser.on('data', function(buffer){
    self.pause();
    outstandingWrites++;

    file.write(buffer, function() {
      outstandingWrites--;
      self.resume();

      if(self.ended){
        self._parser.emit('doneWritingFile');
      }
    });
  });

  self._parser.on('end', function(){
    self._flushing--;
    self.ended = true;

    var done = function(){
      file.end(function() {
        self.emit('file', 'file', file);
        self._maybeEnd();
      });
    };

    if(outstandingWrites === 0){
      done();
    } else {
      self._parser.once('doneWritingFile', done);
    }
  });
};

IncomingForm.prototype._initJSONencoded = function() {
  this.type = 'json';

  var parser = new JSONParser(this)
    , self = this;

  parser.onField = function(key, val) {
    self.emit('field', key, val);
  };

  parser.onEnd = function() {
    self.ended = true;
    self._maybeEnd();
  };

  this._parser = parser;
};

IncomingForm.prototype._uploadPath = function(filename) {
  var buf = crypto.randomBytes(16);
  var name = 'upload_' + buf.toString('hex');

  if (this.keepExtensions) {
    var ext = path.extname(filename);
    ext     = ext.replace(/(\.[a-z0-9]+).*/i, '$1');

    name += ext;
  }

  return path.join(this.uploadDir, name);
};

IncomingForm.prototype._maybeEnd = function() {
  if (!this.ended || this._flushing || this.error) {
    return;
  }

  this.emit('end');
};


/***/ }),

/***/ 5265:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var IncomingForm = __nccwpck_require__(7973)/* .IncomingForm */ .c;
IncomingForm.IncomingForm = IncomingForm;
module.exports = IncomingForm;


/***/ }),

/***/ 715:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

if (global.GENTLY) __nccwpck_require__(4120) = GENTLY.hijack(require);

var Buffer = __nccwpck_require__(4293).Buffer;

function JSONParser(parent) {
  this.parent = parent;
  this.chunks = [];
  this.bytesWritten = 0;
}
exports.c = JSONParser;

JSONParser.prototype.write = function(buffer) {
  this.bytesWritten += buffer.length;
  this.chunks.push(buffer);
  return buffer.length;
};

JSONParser.prototype.end = function() {
  try {
    var fields = JSON.parse(Buffer.concat(this.chunks));
    for (var field in fields) {
      this.onField(field, fields[field]);
    }
  } catch (e) {
    this.parent.emit('error', e);
  }
  this.data = null;

  this.onEnd();
};


/***/ }),

/***/ 1323:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

var Buffer = __nccwpck_require__(4293).Buffer,
    s = 0,
    S =
    { PARSER_UNINITIALIZED: s++,
      START: s++,
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      PART_END: s++,
      END: s++
    },

    f = 1,
    F =
    { PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    },

    LF = 10,
    CR = 13,
    SPACE = 32,
    HYPHEN = 45,
    COLON = 58,
    A = 97,
    Z = 122,

    lower = function(c) {
      return c | 0x20;
    };

for (s in S) {
  exports[s] = S[s];
}

function MultipartParser() {
  this.boundary = null;
  this.boundaryChars = null;
  this.lookbehind = null;
  this.state = S.PARSER_UNINITIALIZED;

  this.index = null;
  this.flags = 0;
}
exports.MultipartParser = MultipartParser;

MultipartParser.stateToString = function(stateNumber) {
  for (var state in S) {
    var number = S[state];
    if (number === stateNumber) return state;
  }
};

MultipartParser.prototype.initWithBoundary = function(str) {
  this.boundary = new Buffer(str.length+4);
  this.boundary.write('\r\n--', 0);
  this.boundary.write(str, 4);
  this.lookbehind = new Buffer(this.boundary.length+8);
  this.state = S.START;

  this.boundaryChars = {};
  for (var i = 0; i < this.boundary.length; i++) {
    this.boundaryChars[this.boundary[i]] = true;
  }
};

MultipartParser.prototype.write = function(buffer) {
  var self = this,
      i = 0,
      len = buffer.length,
      prevIndex = this.index,
      index = this.index,
      state = this.state,
      flags = this.flags,
      lookbehind = this.lookbehind,
      boundary = this.boundary,
      boundaryChars = this.boundaryChars,
      boundaryLength = this.boundary.length,
      boundaryEnd = boundaryLength - 1,
      bufferLength = buffer.length,
      c,
      cl,

      mark = function(name) {
        self[name+'Mark'] = i;
      },
      clear = function(name) {
        delete self[name+'Mark'];
      },
      callback = function(name, buffer, start, end) {
        if (start !== undefined && start === end) {
          return;
        }

        var callbackSymbol = 'on'+name.substr(0, 1).toUpperCase()+name.substr(1);
        if (callbackSymbol in self) {
          self[callbackSymbol](buffer, start, end);
        }
      },
      dataCallback = function(name, clear) {
        var markSymbol = name+'Mark';
        if (!(markSymbol in self)) {
          return;
        }

        if (!clear) {
          callback(name, buffer, self[markSymbol], buffer.length);
          self[markSymbol] = 0;
        } else {
          callback(name, buffer, self[markSymbol], i);
          delete self[markSymbol];
        }
      };

  for (i = 0; i < len; i++) {
    c = buffer[i];
    switch (state) {
      case S.PARSER_UNINITIALIZED:
        return i;
      case S.START:
        index = 0;
        state = S.START_BOUNDARY;
      case S.START_BOUNDARY:
        if (index == boundary.length - 2) {
          if (c == HYPHEN) {
            flags |= F.LAST_BOUNDARY;
          } else if (c != CR) {
            return i;
          }
          index++;
          break;
        } else if (index - 1 == boundary.length - 2) {
          if (flags & F.LAST_BOUNDARY && c == HYPHEN){
            callback('end');
            state = S.END;
            flags = 0;
          } else if (!(flags & F.LAST_BOUNDARY) && c == LF) {
            index = 0;
            callback('partBegin');
            state = S.HEADER_FIELD_START;
          } else {
            return i;
          }
          break;
        }

        if (c != boundary[index+2]) {
          index = -2;
        }
        if (c == boundary[index+2]) {
          index++;
        }
        break;
      case S.HEADER_FIELD_START:
        state = S.HEADER_FIELD;
        mark('headerField');
        index = 0;
      case S.HEADER_FIELD:
        if (c == CR) {
          clear('headerField');
          state = S.HEADERS_ALMOST_DONE;
          break;
        }

        index++;
        if (c == HYPHEN) {
          break;
        }

        if (c == COLON) {
          if (index == 1) {
            // empty header field
            return i;
          }
          dataCallback('headerField', true);
          state = S.HEADER_VALUE_START;
          break;
        }

        cl = lower(c);
        if (cl < A || cl > Z) {
          return i;
        }
        break;
      case S.HEADER_VALUE_START:
        if (c == SPACE) {
          break;
        }

        mark('headerValue');
        state = S.HEADER_VALUE;
      case S.HEADER_VALUE:
        if (c == CR) {
          dataCallback('headerValue', true);
          callback('headerEnd');
          state = S.HEADER_VALUE_ALMOST_DONE;
        }
        break;
      case S.HEADER_VALUE_ALMOST_DONE:
        if (c != LF) {
          return i;
        }
        state = S.HEADER_FIELD_START;
        break;
      case S.HEADERS_ALMOST_DONE:
        if (c != LF) {
          return i;
        }

        callback('headersEnd');
        state = S.PART_DATA_START;
        break;
      case S.PART_DATA_START:
        state = S.PART_DATA;
        mark('partData');
      case S.PART_DATA:
        prevIndex = index;

        if (index === 0) {
          // boyer-moore derrived algorithm to safely skip non-boundary data
          i += boundaryEnd;
          while (i < bufferLength && !(buffer[i] in boundaryChars)) {
            i += boundaryLength;
          }
          i -= boundaryEnd;
          c = buffer[i];
        }

        if (index < boundary.length) {
          if (boundary[index] == c) {
            if (index === 0) {
              dataCallback('partData', true);
            }
            index++;
          } else {
            index = 0;
          }
        } else if (index == boundary.length) {
          index++;
          if (c == CR) {
            // CR = part boundary
            flags |= F.PART_BOUNDARY;
          } else if (c == HYPHEN) {
            // HYPHEN = end boundary
            flags |= F.LAST_BOUNDARY;
          } else {
            index = 0;
          }
        } else if (index - 1 == boundary.length)  {
          if (flags & F.PART_BOUNDARY) {
            index = 0;
            if (c == LF) {
              // unset the PART_BOUNDARY flag
              flags &= ~F.PART_BOUNDARY;
              callback('partEnd');
              callback('partBegin');
              state = S.HEADER_FIELD_START;
              break;
            }
          } else if (flags & F.LAST_BOUNDARY) {
            if (c == HYPHEN) {
              callback('partEnd');
              callback('end');
              state = S.END;
              flags = 0;
            } else {
              index = 0;
            }
          } else {
            index = 0;
          }
        }

        if (index > 0) {
          // when matching a possible boundary, keep a lookbehind reference
          // in case it turns out to be a false lead
          lookbehind[index-1] = c;
        } else if (prevIndex > 0) {
          // if our boundary turned out to be rubbish, the captured lookbehind
          // belongs to partData
          callback('partData', lookbehind, 0, prevIndex);
          prevIndex = 0;
          mark('partData');

          // reconsider the current character even so it interrupted the sequence
          // it could be the beginning of a new sequence
          i--;
        }

        break;
      case S.END:
        break;
      default:
        return i;
    }
  }

  dataCallback('headerField');
  dataCallback('headerValue');
  dataCallback('partData');

  this.index = index;
  this.state = state;
  this.flags = flags;

  return len;
};

MultipartParser.prototype.end = function() {
  var callback = function(self, name) {
    var callbackSymbol = 'on'+name.substr(0, 1).toUpperCase()+name.substr(1);
    if (callbackSymbol in self) {
      self[callbackSymbol]();
    }
  };
  if ((this.state == S.HEADER_FIELD_START && this.index === 0) ||
      (this.state == S.PART_DATA && this.index == this.boundary.length)) {
    callback(this, 'partEnd');
    callback(this, 'end');
  } else if (this.state != S.END) {
    return new Error('MultipartParser.end(): stream ended unexpectedly: ' + this.explain());
  }
};

MultipartParser.prototype.explain = function() {
  return 'state = ' + MultipartParser.stateToString(this.state);
};


/***/ }),

/***/ 8680:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

var EventEmitter = __nccwpck_require__(8614).EventEmitter
	, util = __nccwpck_require__(1669);

function OctetParser(options){
	if(!(this instanceof OctetParser)) return new OctetParser(options);
	EventEmitter.call(this);
}

util.inherits(OctetParser, EventEmitter);

exports.h = OctetParser;

OctetParser.prototype.write = function(buffer) {
    this.emit('data', buffer);
	return buffer.length;
};

OctetParser.prototype.end = function() {
	this.emit('end');
};


/***/ }),

/***/ 825:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

if (global.GENTLY) __nccwpck_require__(4120) = GENTLY.hijack(require);

// This is a buffering parser, not quite as nice as the multipart one.
// If I find time I'll rewrite this to be fully streaming as well
var querystring = __nccwpck_require__(1191);

function QuerystringParser(maxKeys) {
  this.maxKeys = maxKeys;
  this.buffer = '';
}
exports.l = QuerystringParser;

QuerystringParser.prototype.write = function(buffer) {
  this.buffer += buffer.toString('ascii');
  return buffer.length;
};

QuerystringParser.prototype.end = function() {
  var fields = querystring.parse(this.buffer, '&', '=', { maxKeys: this.maxKeys });
  for (var field in fields) {
    this.onField(field, fields[field]);
  }
  this.buffer = '';

  this.onEnd();
};



/***/ }),

/***/ 9320:
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ 8334:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var implementation = __nccwpck_require__(9320);

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ 4538:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __nccwpck_require__(587)();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __nccwpck_require__(8334);
var hasOwn = __nccwpck_require__(6339);
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ 1621:
/***/ ((module) => {

"use strict";


module.exports = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};


/***/ }),

/***/ 587:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __nccwpck_require__(7747);

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ 7747:
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ 6339:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var bind = __nccwpck_require__(8334);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ 7129:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// A linked list to keep track of recently-used-ness
const Yallist = __nccwpck_require__(665)

const MAX = Symbol('max')
const LENGTH = Symbol('length')
const LENGTH_CALCULATOR = Symbol('lengthCalculator')
const ALLOW_STALE = Symbol('allowStale')
const MAX_AGE = Symbol('maxAge')
const DISPOSE = Symbol('dispose')
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet')
const LRU_LIST = Symbol('lruList')
const CACHE = Symbol('cache')
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet')

const naiveLength = () => 1

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  constructor (options) {
    if (typeof options === 'number')
      options = { max: options }

    if (!options)
      options = {}

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number')
    // Kind of weird to have a default max of Infinity, but oh well.
    const max = this[MAX] = options.max || Infinity

    const lc = options.length || naiveLength
    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc
    this[ALLOW_STALE] = options.stale || false
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number')
    this[MAX_AGE] = options.maxAge || 0
    this[DISPOSE] = options.dispose
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false
    this.reset()
  }

  // resize the cache when the max changes.
  set max (mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number')

    this[MAX] = mL || Infinity
    trim(this)
  }
  get max () {
    return this[MAX]
  }

  set allowStale (allowStale) {
    this[ALLOW_STALE] = !!allowStale
  }
  get allowStale () {
    return this[ALLOW_STALE]
  }

  set maxAge (mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number')

    this[MAX_AGE] = mA
    trim(this)
  }
  get maxAge () {
    return this[MAX_AGE]
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator (lC) {
    if (typeof lC !== 'function')
      lC = naiveLength

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC
      this[LENGTH] = 0
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
        this[LENGTH] += hit.length
      })
    }
    trim(this)
  }
  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

  get length () { return this[LENGTH] }
  get itemCount () { return this[LRU_LIST].length }

  rforEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev
      forEachStep(this, fn, walker, thisp)
      walker = prev
    }
  }

  forEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next
      forEachStep(this, fn, walker, thisp)
      walker = next
    }
  }

  keys () {
    return this[LRU_LIST].toArray().map(k => k.key)
  }

  values () {
    return this[LRU_LIST].toArray().map(k => k.value)
  }

  reset () {
    if (this[DISPOSE] &&
        this[LRU_LIST] &&
        this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value))
    }

    this[CACHE] = new Map() // hash of items by key
    this[LRU_LIST] = new Yallist() // list of items in order of use recency
    this[LENGTH] = 0 // length of items in the list
  }

  dump () {
    return this[LRU_LIST].map(hit =>
      isStale(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h)
  }

  dumpLru () {
    return this[LRU_LIST]
  }

  set (key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE]

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number')

    const now = maxAge ? Date.now() : 0
    const len = this[LENGTH_CALCULATOR](value, key)

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key))
        return false
      }

      const node = this[CACHE].get(key)
      const item = node.value

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value)
      }

      item.now = now
      item.maxAge = maxAge
      item.value = value
      this[LENGTH] += len - item.length
      item.length = len
      this.get(key)
      trim(this)
      return true
    }

    const hit = new Entry(key, value, len, now, maxAge)

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value)

      return false
    }

    this[LENGTH] += hit.length
    this[LRU_LIST].unshift(hit)
    this[CACHE].set(key, this[LRU_LIST].head)
    trim(this)
    return true
  }

  has (key) {
    if (!this[CACHE].has(key)) return false
    const hit = this[CACHE].get(key).value
    return !isStale(this, hit)
  }

  get (key) {
    return get(this, key, true)
  }

  peek (key) {
    return get(this, key, false)
  }

  pop () {
    const node = this[LRU_LIST].tail
    if (!node)
      return null

    del(this, node)
    return node.value
  }

  del (key) {
    del(this, this[CACHE].get(key))
  }

  load (arr) {
    // reset the cache
    this.reset()

    const now = Date.now()
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l]
      const expiresAt = hit.e || 0
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v)
      else {
        const maxAge = expiresAt - now
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge)
        }
      }
    }
  }

  prune () {
    this[CACHE].forEach((value, key) => get(this, key, false))
  }
}

const get = (self, key, doUse) => {
  const node = self[CACHE].get(key)
  if (node) {
    const hit = node.value
    if (isStale(self, hit)) {
      del(self, node)
      if (!self[ALLOW_STALE])
        return undefined
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now()
        self[LRU_LIST].unshiftNode(node)
      }
    }
    return hit.value
  }
}

const isStale = (self, hit) => {
  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
    return false

  const diff = Date.now() - hit.now
  return hit.maxAge ? diff > hit.maxAge
    : self[MAX_AGE] && (diff > self[MAX_AGE])
}

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev
      del(self, walker)
      walker = prev
    }
  }
}

const del = (self, node) => {
  if (node) {
    const hit = node.value
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value)

    self[LENGTH] -= hit.length
    self[CACHE].delete(hit.key)
    self[LRU_LIST].removeNode(node)
  }
}

class Entry {
  constructor (key, value, length, now, maxAge) {
    this.key = key
    this.value = value
    this.length = length
    this.now = now
    this.maxAge = maxAge || 0
  }
}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value
  if (isStale(self, hit)) {
    del(self, node)
    if (!self[ALLOW_STALE])
      hit = undefined
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self)
}

module.exports = LRUCache


/***/ }),

/***/ 8752:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var http = __nccwpck_require__(8605);

/**
 * Module exports.
 * @public
 */

module.exports = getCurrentNodeMethods() || getBasicNodeMethods();

/**
 * Get the current Node.js methods.
 * @private
 */

function getCurrentNodeMethods() {
  return http.METHODS && http.METHODS.map(function lowerCaseMethod(method) {
    return method.toLowerCase();
  });
}

/**
 * Get the "basic" Node.js methods, a snapshot from Node.js 0.10.
 * @private
 */

function getBasicNodeMethods() {
  return [
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'
  ];
}


/***/ }),

/***/ 7426:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = __nccwpck_require__(3313)


/***/ }),

/***/ 3583:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var db = __nccwpck_require__(7426)
var extname = __nccwpck_require__(5622).extname

/**
 * Module variables.
 * @private
 */

var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/
var TEXT_TYPE_REGEXP = /^text\//i

/**
 * Module exports.
 * @public
 */

exports.charset = charset
exports.charsets = { lookup: charset }
exports.contentType = contentType
exports.extension = extension
exports.extensions = Object.create(null)
exports.lookup = lookup
exports.types = Object.create(null)

// Populate the extensions/types maps
populateMaps(exports.extensions, exports.types)

/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function charset (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)
  var mime = match && db[match[1].toLowerCase()]

  if (mime && mime.charset) {
    return mime.charset
  }

  // default text/* to utf-8
  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
    return 'UTF-8'
  }

  return false
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */

function contentType (str) {
  // TODO: should this even be in this module?
  if (!str || typeof str !== 'string') {
    return false
  }

  var mime = str.indexOf('/') === -1
    ? exports.lookup(str)
    : str

  if (!mime) {
    return false
  }

  // TODO: use content-type or other module
  if (mime.indexOf('charset') === -1) {
    var charset = exports.charset(mime)
    if (charset) mime += '; charset=' + charset.toLowerCase()
  }

  return mime
}

/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function extension (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)

  // get extensions
  var exts = match && exports.extensions[match[1].toLowerCase()]

  if (!exts || !exts.length) {
    return false
  }

  return exts[0]
}

/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */

function lookup (path) {
  if (!path || typeof path !== 'string') {
    return false
  }

  // get the extension ("ext" or ".ext" or full path)
  var extension = extname('x.' + path)
    .toLowerCase()
    .substr(1)

  if (!extension) {
    return false
  }

  return exports.types[extension] || false
}

/**
 * Populate the extensions and types maps.
 * @private
 */

function populateMaps (extensions, types) {
  // source preference (least -> most)
  var preference = ['nginx', 'apache', undefined, 'iana']

  Object.keys(db).forEach(function forEachMimeType (type) {
    var mime = db[type]
    var exts = mime.extensions

    if (!exts || !exts.length) {
      return
    }

    // mime -> extensions
    extensions[type] = exts

    // extension -> mime
    for (var i = 0; i < exts.length; i++) {
      var extension = exts[i]

      if (types[extension]) {
        var from = preference.indexOf(db[types[extension]].source)
        var to = preference.indexOf(mime.source)

        if (types[extension] !== 'application/octet-stream' &&
          (from > to || (from === to && types[extension].substr(0, 12) === 'application/'))) {
          // skip the remapping
          continue
        }
      }

      // set the extension -> mime
      types[extension] = type
    }
  })
}


/***/ }),

/***/ 6038:
/***/ ((module) => {

"use strict";


/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (let i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (let type in typeMap) {
    let extensions = typeMap[type].map(function(t) {
      return t.toLowerCase();
    });
    type = type.toLowerCase();

    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] === '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      const ext = extensions[0];
      this._extensions[type] = (ext[0] !== '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  let last = path.replace(/^.*[/\\]/, '').toLowerCase();
  let ext = last.replace(/^.*\./, '').toLowerCase();

  let hasPath = last.length < path.length;
  let hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

module.exports = Mime;


/***/ }),

/***/ 9994:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


let Mime = __nccwpck_require__(6038);
module.exports = new Mime(__nccwpck_require__(3114), __nccwpck_require__(8809));


/***/ }),

/***/ 8809:
/***/ ((module) => {

module.exports = {"application/prs.cww":["cww"],"application/vnd.1000minds.decision-model+xml":["1km"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.keynote":["key"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.apple.numbers":["numbers"],"application/vnd.apple.pages":["pages"],"application/vnd.apple.pkpass":["pkpass"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.balsamiq.bmml+xml":["bmml"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.citationstyles.style+xml":["csl"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dbf":["dbf"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-apps.document":["gdoc"],"application/vnd.google-apps.presentation":["gslides"],"application/vnd.google-apps.spreadsheet":["gsheet"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.hydrostatix.sof-data":["sfd-hdstx"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-outlook":["msg"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["*stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.ac+xml":["*ac"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.n-gage.symbian.install":["n-gage"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openblox.game+xml":["obgx"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openstreetmap.data+xml":["osm"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.rar":["rar"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.software602.filler.form+xml":["fo"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.wadl+xml":["wadl"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.syncml.dmddf+xml":["ddf"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["*dmg"],"application/x-arj":["arj"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bdoc":["*bdoc"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-cocoa":["cco"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["*deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-httpd-php":["php"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["*iso"],"application/x-java-archive-diff":["jardiff"],"application/x-java-jnlp-file":["jnlp"],"application/x-keepass2":["kdbx"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-makeself":["run"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdos-program":["*exe"],"application/x-msdownload":["*exe","*dll","com","bat","*msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["*wmf","*wmz","*emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-ns-proxy-autoconfig":["pac"],"application/x-nzb":["nzb"],"application/x-perl":["pl","pm"],"application/x-pilot":["*prc","*pdb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["*rar"],"application/x-redhat-package-manager":["rpm"],"application/x-research-info-systems":["ris"],"application/x-sea":["sea"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl","tk"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["*obj"],"application/x-ustar":["ustar"],"application/x-virtualbox-hdd":["hdd"],"application/x-virtualbox-ova":["ova"],"application/x-virtualbox-ovf":["ovf"],"application/x-virtualbox-vbox":["vbox"],"application/x-virtualbox-vbox-extpack":["vbox-extpack"],"application/x-virtualbox-vdi":["vdi"],"application/x-virtualbox-vhd":["vhd"],"application/x-virtualbox-vmdk":["vmdk"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt","pem"],"application/x-xfig":["fig"],"application/x-xliff+xml":["*xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-m4a":["*m4a"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-realaudio":["*ra"],"audio/x-wav":["*wav"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"image/prs.btif":["btif"],"image/prs.pti":["pti"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.airzip.accelerator.azv":["azv"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["*sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.microsoft.icon":["ico"],"image/vnd.ms-dds":["dds"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.pco.b16":["b16"],"image/vnd.tencent.tap":["tap"],"image/vnd.valve.source.texture":["vtf"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/vnd.zbrush.pcx":["pcx"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["*ico"],"image/x-jng":["jng"],"image/x-mrsid-image":["sid"],"image/x-ms-bmp":["*bmp"],"image/x-pcx":["*pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/vnd.wfa.wsc":["wsc"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.opengex":["ogex"],"model/vnd.parasolid.transmit.binary":["x_b"],"model/vnd.parasolid.transmit.text":["x_t"],"model/vnd.usdz+zip":["usdz"],"model/vnd.valve.source.compiled-map":["bsp"],"model/vnd.vtu":["vtu"],"text/prs.lines.tag":["dsc"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-org":["*org"],"text/x-pascal":["p","pas"],"text/x-processing":["pde"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-suse-ymp":["ymp"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]};

/***/ }),

/***/ 3114:
/***/ ((module) => {

module.exports = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/mrb-consumer+xml":["*xdf"],"application/mrb-publish+xml":["*xdf"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["*xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/ttml+xml":["ttml"],"application/ubjson":["ubj"],"application/urc-ressheet+xml":["rsheet"],"application/urc-targetdesc+xml":["td"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-error+xml":["xer"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["*xsl","xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/amr":["amr"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx","opus"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/avif":["avif"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/ktx2":["ktx2"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/spdx":["spdx"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/iso.segment":["m4s"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

/***/ }),

/***/ 900:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 504:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
var isEnumerable = Object.prototype.propertyIsEnumerable;

var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
    [].__proto__ === Array.prototype // eslint-disable-line no-proto
        ? function (O) {
            return O.__proto__; // eslint-disable-line no-proto
        }
        : null
);

var inspectCustom = __nccwpck_require__(7265).custom;
var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
var toStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag !== 'undefined' ? Symbol.toStringTag : null;

module.exports = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean') {
        throw new TypeError('option "customInspect", if provided, must be `true` or `false`');
    }

    if (
        has(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        return String(obj);
    }
    if (typeof obj === 'bigint') {
        return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + keys.join(', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + [].concat(stringTag || [], protoTag || []).join(': ') + '] ' : '');
        if (ys.length === 0) { return tag + '{}'; }
        if (indent) {
            return tag + '{' + indentedJoin(ys, indent) + '}';
        }
        return tag + '{ ' + ys.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray(obj) { return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isDate(obj) { return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isRegExp(obj) { return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isError(obj) { return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isString(obj) { return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isNumber(obj) { return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj) {
    if (hasShammedSymbols) {
        return obj && typeof obj === 'object' && obj instanceof Symbol;
    }
    if (typeof obj === 'symbol') {
        return true;
    }
    if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
    }
    try {
        symToString.call(obj);
        return true;
    } catch (e) {}
    return false;
}

function isBigInt(obj) {
    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
    }
    try {
        bigIntValueOf.call(obj);
        return true;
    } catch (e) {}
    return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakRefDeref.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16).toUpperCase();
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = Array(opts.indent + 1).join(' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: Array(depth + 1).join(baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
            symMap['$' + syms[k]] = syms[k];
        }
    }

    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        } else if ((/[^\w$]/).test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    if (typeof gOPS === 'function') {
        for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
            }
        }
    }
    return xs;
}


/***/ }),

/***/ 7265:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(1669).inspect;


/***/ }),

/***/ 4334:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var GetIntrinsic = __nccwpck_require__(4538);
var callBound = __nccwpck_require__(8803);
var inspect = __nccwpck_require__(504);

var $TypeError = GetIntrinsic('%TypeError%');
var $WeakMap = GetIntrinsic('%WeakMap%', true);
var $Map = GetIntrinsic('%Map%', true);

var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);

/*
 * This function traverses the list returning the node corresponding to the
 * given key.
 *
 * That node is also moved to the head of the list, so that if it's accessed
 * again we don't need to traverse the whole list. By doing so, all the recently
 * used nodes can be accessed relatively quickly.
 */
var listGetNode = function (list, key) { // eslint-disable-line consistent-return
	for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
		if (curr.key === key) {
			prev.next = curr.next;
			curr.next = list.next;
			list.next = curr; // eslint-disable-line no-param-reassign
			return curr;
		}
	}
};

var listGet = function (objects, key) {
	var node = listGetNode(objects, key);
	return node && node.value;
};
var listSet = function (objects, key, value) {
	var node = listGetNode(objects, key);
	if (node) {
		node.value = value;
	} else {
		// Prepend the new node to the beginning of the list
		objects.next = { // eslint-disable-line no-param-reassign
			key: key,
			next: objects.next,
			value: value
		};
	}
};
var listHas = function (objects, key) {
	return !!listGetNode(objects, key);
};

module.exports = function getSideChannel() {
	var $wm;
	var $m;
	var $o;
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError('Side channel does not contain ' + inspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					/*
					 * Initialize the linked list as an empty node, so that we don't have
					 * to special-case handling of the first node: we can always refer to
					 * it as (previous node).next, instead of something like (list).head
					 */
					$o = { key: {}, next: null };
				}
				listSet($o, key, value);
			}
		}
	};
	return channel;
};


/***/ }),

/***/ 1744:
/***/ ((module) => {

"use strict";


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Agent() {
  this._defaults = [];
}

['use', 'on', 'once', 'set', 'query', 'type', 'accept', 'auth', 'withCredentials', 'sortQuery', 'retry', 'ok', 'redirects', 'timeout', 'buffer', 'serialize', 'parse', 'ca', 'key', 'pfx', 'cert', 'disableTLSCerts'].forEach(function (fn) {
  // Default setting for all requests from this agent
  Agent.prototype[fn] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this._defaults.push({
      fn: fn,
      args: args
    });

    return this;
  };
});

Agent.prototype._setDefaults = function (req) {
  this._defaults.forEach(function (def) {
    req[def.fn].apply(req, _toConsumableArray(def.args));
  });
};

module.exports = Agent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hZ2VudC1iYXNlLmpzIl0sIm5hbWVzIjpbIkFnZW50IiwiX2RlZmF1bHRzIiwiZm9yRWFjaCIsImZuIiwicHJvdG90eXBlIiwiYXJncyIsInB1c2giLCJfc2V0RGVmYXVsdHMiLCJyZXEiLCJkZWYiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLEtBQVQsR0FBaUI7QUFDZixPQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0Q7O0FBRUQsQ0FDRSxLQURGLEVBRUUsSUFGRixFQUdFLE1BSEYsRUFJRSxLQUpGLEVBS0UsT0FMRixFQU1FLE1BTkYsRUFPRSxRQVBGLEVBUUUsTUFSRixFQVNFLGlCQVRGLEVBVUUsV0FWRixFQVdFLE9BWEYsRUFZRSxJQVpGLEVBYUUsV0FiRixFQWNFLFNBZEYsRUFlRSxRQWZGLEVBZ0JFLFdBaEJGLEVBaUJFLE9BakJGLEVBa0JFLElBbEJGLEVBbUJFLEtBbkJGLEVBb0JFLEtBcEJGLEVBcUJFLE1BckJGLEVBc0JFLGlCQXRCRixFQXVCRUMsT0F2QkYsQ0F1QlUsVUFBQ0MsRUFBRCxFQUFRO0FBQ2hCO0FBQ0FILEVBQUFBLEtBQUssQ0FBQ0ksU0FBTixDQUFnQkQsRUFBaEIsSUFBc0IsWUFBbUI7QUFBQSxzQ0FBTkUsSUFBTTtBQUFOQSxNQUFBQSxJQUFNO0FBQUE7O0FBQ3ZDLFNBQUtKLFNBQUwsQ0FBZUssSUFBZixDQUFvQjtBQUFFSCxNQUFBQSxFQUFFLEVBQUZBLEVBQUY7QUFBTUUsTUFBQUEsSUFBSSxFQUFKQTtBQUFOLEtBQXBCOztBQUNBLFdBQU8sSUFBUDtBQUNELEdBSEQ7QUFJRCxDQTdCRDs7QUErQkFMLEtBQUssQ0FBQ0ksU0FBTixDQUFnQkcsWUFBaEIsR0FBK0IsVUFBVUMsR0FBVixFQUFlO0FBQzVDLE9BQUtQLFNBQUwsQ0FBZUMsT0FBZixDQUF1QixVQUFDTyxHQUFELEVBQVM7QUFDOUJELElBQUFBLEdBQUcsQ0FBQ0MsR0FBRyxDQUFDTixFQUFMLENBQUgsT0FBQUssR0FBRyxxQkFBWUMsR0FBRyxDQUFDSixJQUFoQixFQUFIO0FBQ0QsR0FGRDtBQUdELENBSkQ7O0FBTUFLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlgsS0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBBZ2VudCgpIHtcbiAgdGhpcy5fZGVmYXVsdHMgPSBbXTtcbn1cblxuW1xuICAndXNlJyxcbiAgJ29uJyxcbiAgJ29uY2UnLFxuICAnc2V0JyxcbiAgJ3F1ZXJ5JyxcbiAgJ3R5cGUnLFxuICAnYWNjZXB0JyxcbiAgJ2F1dGgnLFxuICAnd2l0aENyZWRlbnRpYWxzJyxcbiAgJ3NvcnRRdWVyeScsXG4gICdyZXRyeScsXG4gICdvaycsXG4gICdyZWRpcmVjdHMnLFxuICAndGltZW91dCcsXG4gICdidWZmZXInLFxuICAnc2VyaWFsaXplJyxcbiAgJ3BhcnNlJyxcbiAgJ2NhJyxcbiAgJ2tleScsXG4gICdwZngnLFxuICAnY2VydCcsXG4gICdkaXNhYmxlVExTQ2VydHMnXG5dLmZvckVhY2goKGZuKSA9PiB7XG4gIC8vIERlZmF1bHQgc2V0dGluZyBmb3IgYWxsIHJlcXVlc3RzIGZyb20gdGhpcyBhZ2VudFxuICBBZ2VudC5wcm90b3R5cGVbZm5dID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICB0aGlzLl9kZWZhdWx0cy5wdXNoKHsgZm4sIGFyZ3MgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG59KTtcblxuQWdlbnQucHJvdG90eXBlLl9zZXREZWZhdWx0cyA9IGZ1bmN0aW9uIChyZXEpIHtcbiAgdGhpcy5fZGVmYXVsdHMuZm9yRWFjaCgoZGVmKSA9PiB7XG4gICAgcmVxW2RlZi5mbl0oLi4uZGVmLmFyZ3MpO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWdlbnQ7XG4iXX0=

/***/ }),

/***/ 5960:
/***/ ((module) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}

module.exports = isObject;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pcy1vYmplY3QuanMiXSwibmFtZXMiOlsiaXNPYmplY3QiLCJvYmoiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7QUFRQSxTQUFTQSxRQUFULENBQWtCQyxHQUFsQixFQUF1QjtBQUNyQixTQUFPQSxHQUFHLEtBQUssSUFBUixJQUFnQixRQUFPQSxHQUFQLE1BQWUsUUFBdEM7QUFDRDs7QUFFREMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCSCxRQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiJdfQ==

/***/ }),

/***/ 4816:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/**
 * Module dependencies.
 */
// eslint-disable-next-line node/no-deprecated-api
var _require = __nccwpck_require__(8835),
    parse = _require.parse;

var _require2 = __nccwpck_require__(5507),
    CookieJar = _require2.CookieJar;

var _require3 = __nccwpck_require__(5507),
    CookieAccessInfo = _require3.CookieAccessInfo;

var methods = __nccwpck_require__(8752);

var request = __nccwpck_require__(1524);

var AgentBase = __nccwpck_require__(1744);
/**
 * Expose `Agent`.
 */


module.exports = Agent;
/**
 * Initialize a new `Agent`.
 *
 * @api public
 */

function Agent(options) {
  if (!(this instanceof Agent)) {
    return new Agent(options);
  }

  AgentBase.call(this);
  this.jar = new CookieJar();

  if (options) {
    if (options.ca) {
      this.ca(options.ca);
    }

    if (options.key) {
      this.key(options.key);
    }

    if (options.pfx) {
      this.pfx(options.pfx);
    }

    if (options.cert) {
      this.cert(options.cert);
    }

    if (options.rejectUnauthorized === false) {
      this.disableTLSCerts();
    }
  }
}

Agent.prototype = Object.create(AgentBase.prototype);
/**
 * Save the cookies in the given `res` to
 * the agent's cookie jar for persistence.
 *
 * @param {Response} res
 * @api private
 */

Agent.prototype._saveCookies = function (res) {
  var cookies = res.headers['set-cookie'];
  if (cookies) this.jar.setCookies(cookies);
};
/**
 * Attach cookies when available to the given `req`.
 *
 * @param {Request} req
 * @api private
 */


Agent.prototype._attachCookies = function (req) {
  var url = parse(req.url);
  var access = new CookieAccessInfo(url.hostname, url.pathname, url.protocol === 'https:');
  var cookies = this.jar.getCookies(access).toValueString();
  req.cookies = cookies;
};

methods.forEach(function (name) {
  var method = name.toUpperCase();

  Agent.prototype[name] = function (url, fn) {
    var req = new request.Request(method, url);
    req.on('response', this._saveCookies.bind(this));
    req.on('redirect', this._saveCookies.bind(this));
    req.on('redirect', this._attachCookies.bind(this, req));

    this._setDefaults(req);

    this._attachCookies(req);

    if (fn) {
      req.end(fn);
    }

    return req;
  };
});
Agent.prototype.del = Agent.prototype.delete;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlL2FnZW50LmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJwYXJzZSIsIkNvb2tpZUphciIsIkNvb2tpZUFjY2Vzc0luZm8iLCJtZXRob2RzIiwicmVxdWVzdCIsIkFnZW50QmFzZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJBZ2VudCIsIm9wdGlvbnMiLCJjYWxsIiwiamFyIiwiY2EiLCJrZXkiLCJwZngiLCJjZXJ0IiwicmVqZWN0VW5hdXRob3JpemVkIiwiZGlzYWJsZVRMU0NlcnRzIiwicHJvdG90eXBlIiwiT2JqZWN0IiwiY3JlYXRlIiwiX3NhdmVDb29raWVzIiwicmVzIiwiY29va2llcyIsImhlYWRlcnMiLCJzZXRDb29raWVzIiwiX2F0dGFjaENvb2tpZXMiLCJyZXEiLCJ1cmwiLCJhY2Nlc3MiLCJob3N0bmFtZSIsInBhdGhuYW1lIiwicHJvdG9jb2wiLCJnZXRDb29raWVzIiwidG9WYWx1ZVN0cmluZyIsImZvckVhY2giLCJuYW1lIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJmbiIsIlJlcXVlc3QiLCJvbiIsImJpbmQiLCJfc2V0RGVmYXVsdHMiLCJlbmQiLCJkZWwiLCJkZWxldGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7OztBQUlBO2VBQ2tCQSxPQUFPLENBQUMsS0FBRCxDO0lBQWpCQyxLLFlBQUFBLEs7O2dCQUNjRCxPQUFPLENBQUMsV0FBRCxDO0lBQXJCRSxTLGFBQUFBLFM7O2dCQUNxQkYsT0FBTyxDQUFDLFdBQUQsQztJQUE1QkcsZ0IsYUFBQUEsZ0I7O0FBQ1IsSUFBTUMsT0FBTyxHQUFHSixPQUFPLENBQUMsU0FBRCxDQUF2Qjs7QUFDQSxJQUFNSyxPQUFPLEdBQUdMLE9BQU8sQ0FBQyxPQUFELENBQXZCOztBQUNBLElBQU1NLFNBQVMsR0FBR04sT0FBTyxDQUFDLGVBQUQsQ0FBekI7QUFFQTs7Ozs7QUFJQU8sTUFBTSxDQUFDQyxPQUFQLEdBQWlCQyxLQUFqQjtBQUVBOzs7Ozs7QUFNQSxTQUFTQSxLQUFULENB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R0FBcEI7O0FBRUEsUUFBSVksRUFBSixFQUFRO0FBQ05aLE1BQUFBLEdBQUcsQ0FBQ2lCLEdBQUosQ0FBUUwsRUFBUjtBQUNEOztBQUVELFdBQU9aLEdBQVA7QUFDRCxHQWREO0FBZUQsQ0FqQkQ7QUFtQkFuQixLQUFLLENBQUNVLFNBQU4sQ0FBZ0IyQixHQUFoQixHQUFzQnJDLEtBQUssQ0FBQ1UsU0FBTixDQUFnQjRCLE1BQXRDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLWRlcHJlY2F0ZWQtYXBpXG5jb25zdCB7IHBhcnNlIH0gPSByZXF1aXJlKCd1cmwnKTtcbmNvbnN0IHsgQ29va2llSmFyIH0gPSByZXF1aXJlKCdjb29raWVqYXInKTtcbmNvbnN0IHsgQ29va2llQWNjZXNzSW5mbyB9ID0gcmVxdWlyZSgnY29va2llamFyJyk7XG5jb25zdCBtZXRob2RzID0gcmVxdWlyZSgnbWV0aG9kcycpO1xuY29uc3QgcmVxdWVzdCA9IHJlcXVpcmUoJy4uLy4uJyk7XG5jb25zdCBBZ2VudEJhc2UgPSByZXF1aXJlKCcuLi9hZ2VudC1iYXNlJyk7XG5cbi8qKlxuICogRXhwb3NlIGBBZ2VudGAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBBZ2VudDtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBBZ2VudGAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBBZ2VudChvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBBZ2VudCkpIHtcbiAgICByZXR1cm4gbmV3IEFnZW50KG9wdGlvbnMpO1xuICB9XG5cbiAgQWdlbnRCYXNlLmNhbGwodGhpcyk7XG4gIHRoaXMuamFyID0gbmV3IENvb2tpZUphcigpO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuY2EpIHtcbiAgICAgIHRoaXMuY2Eob3B0aW9ucy5jYSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMua2V5KSB7XG4gICAgICB0aGlzLmtleShvcHRpb25zLmtleSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMucGZ4KSB7XG4gICAgICB0aGlzLnBmeChvcHRpb25zLnBmeCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY2VydCkge1xuICAgICAgdGhpcy5jZXJ0KG9wdGlvbnMuY2VydCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMucmVqZWN0VW5hdXRob3JpemVkID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5kaXNhYmxlVExTQ2VydHMoKTtcbiAgICB9XG4gIH1cbn1cblxuQWdlbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShBZ2VudEJhc2UucHJvdG90eXBlKTtcblxuLyoqXG4gKiBTYXZlIHRoZSBjb29raWVzIGluIHRoZSBnaXZlbiBgcmVzYCB0b1xuICogdGhlIGFnZW50J3MgY29va2llIGphciBmb3IgcGVyc2lzdGVuY2UuXG4gKlxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5BZ2VudC5wcm90b3R5cGUuX3NhdmVDb29raWVzID0gZnVuY3Rpb24gKHJlcykge1xuICBjb25zdCBjb29raWVzID0gcmVzLmhlYWRlcnNbJ3NldC1jb29raWUnXTtcbiAgaWYgKGNvb2tpZXMpIHRoaXMuamFyLnNldENvb2tpZXMoY29va2llcyk7XG59O1xuXG4vKipcbiAqIEF0dGFjaCBjb29raWVzIHdoZW4gYXZhaWxhYmxlIHRvIHRoZSBnaXZlbiBgcmVxYC5cbiAqXG4gKiBAcGFyYW0ge1JlcXVlc3R9IHJlcVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuQWdlbnQucHJvdG90eXBlLl9hdHRhY2hDb29raWVzID0gZnVuY3Rpb24gKHJlcSkge1xuICBjb25zdCB1cmwgPSBwYXJzZShyZXEudXJsKTtcbiAgY29uc3QgYWNjZXNzID0gbmV3IENvb2tpZUFjY2Vzc0luZm8oXG4gICAgdXJsLmhvc3RuYW1lLFxuICAgIHVybC5wYXRobmFtZSxcbiAgICB1cmwucHJvdG9jb2wgPT09ICdodHRwczonXG4gICk7XG4gIGNvbnN0IGNvb2tpZXMgPSB0aGlzLmphci5nZXRDb29raWVzKGFjY2VzcykudG9WYWx1ZVN0cmluZygpO1xuICByZXEuY29va2llcyA9IGNvb2tpZXM7XG59O1xuXG5tZXRob2RzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgY29uc3QgbWV0aG9kID0gbmFtZS50b1VwcGVyQ2FzZSgpO1xuICBBZ2VudC5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAodXJsLCBmbikge1xuICAgIGNvbnN0IHJlcSA9IG5ldyByZXF1ZXN0LlJlcXVlc3QobWV0aG9kLCB1cmwpO1xuXG4gICAgcmVxLm9uKCdyZXNwb25zZScsIHRoaXMuX3NhdmVDb29raWVzLmJpbmQodGhpcykpO1xuICAgIHJlcS5vbigncmVkaXJlY3QnLCB0aGlzLl9zYXZlQ29va2llcy5iaW5kKHRoaXMpKTtcbiAgICByZXEub24oJ3JlZGlyZWN0JywgdGhpcy5fYXR0YWNoQ29va2llcy5iaW5kKHRoaXMsIHJlcSkpO1xuICAgIHRoaXMuX3NldERlZmF1bHRzKHJlcSk7XG4gICAgdGhpcy5fYXR0YWNoQ29va2llcyhyZXEpO1xuXG4gICAgaWYgKGZuKSB7XG4gICAgICByZXEuZW5kKGZuKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxO1xuICB9O1xufSk7XG5cbkFnZW50LnByb3RvdHlwZS5kZWwgPSBBZ2VudC5wcm90b3R5cGUuZGVsZXRlO1xuIl19

/***/ }),

/***/ 3554:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Stream = __nccwpck_require__(2413);

var util = __nccwpck_require__(1669);

var net = __nccwpck_require__(1631);

var tls = __nccwpck_require__(4016); // eslint-disable-next-line node/no-deprecated-api


var _require = __nccwpck_require__(8835),
    parse = _require.parse;

var semver = __nccwpck_require__(1449);

var http2; // eslint-disable-next-line node/no-unsupported-features/node-builtins

if (semver.gte(process.version, 'v10.10.0')) http2 = __nccwpck_require__(7565);else throw new Error('superagent: this version of Node.js does not support http2');
var _http2$constants = http2.constants,
    HTTP2_HEADER_PATH = _http2$constants.HTTP2_HEADER_PATH,
    HTTP2_HEADER_STATUS = _http2$constants.HTTP2_HEADER_STATUS,
    HTTP2_HEADER_METHOD = _http2$constants.HTTP2_HEADER_METHOD,
    HTTP2_HEADER_AUTHORITY = _http2$constants.HTTP2_HEADER_AUTHORITY,
    HTTP2_HEADER_HOST = _http2$constants.HTTP2_HEADER_HOST,
    HTTP2_HEADER_SET_COOKIE = _http2$constants.HTTP2_HEADER_SET_COOKIE,
    NGHTTP2_CANCEL = _http2$constants.NGHTTP2_CANCEL;

function setProtocol(protocol) {
  return {
    request: function request(options) {
      return new Request(protocol, options);
    }
  };
}

function Request(protocol, options) {
  var _this = this;

  Stream.call(this);
  var defaultPort = protocol === 'https:' ? 443 : 80;
  var defaultHost = 'localhost';
  var port = options.port || defaultPort;
  var host = options.host || defaultHost;
  delete options.port;
  delete options.host;
  this.method = options.method;
  this.path = options.path;
  this.protocol = protocol;
  this.host = host;
  delete options.method;
  delete options.path;

  var sessionOptions = _objectSpread({}, options);

  if (options.socketPath) {
    sessionOptions.socketPath = options.socketPath;
    sessionOptions.createConnection = this.createUnixConnection.bind(this);
  }

  this._headers = {};
  var session = http2.connect("".concat(protocol, "//").concat(host, ":").concat(port), sessionOptions);
  this.setHeader('host', "".concat(host, ":").concat(port));
  session.on('error', function (err) {
    return _this.emit('error', err);
  });
  this.session = session;
}
/**
 * Inherit from `Stream` (which inherits from `EventEmitter`).
 */


util.inherits(Request, Stream);

Request.prototype.createUnixConnection = function (authority, options) {
  switch (this.protocol) {
    case 'http:':
      return net.connect(options.socketPath);

    case 'https:':
      options.ALPNProtocols = ['h2'];
      options.servername = this.host;
      options.allowHalfOpen = true;
      return tls.connect(options.socketPath, options);

    default:
      throw new Error('Unsupported protocol', this.protocol);
  }
}; // eslint-disable-next-line no-unused-vars


Request.prototype.setNoDelay = function (bool) {// We can not use setNoDelay with HTTP/2.
  // Node 10 limits http2session.socket methods to ones safe to use with HTTP/2.
  // See also https://nodejs.org/api/http2.html#http2_http2session_socket
};

Request.prototype.getFrame = function () {
  var _method,
      _this2 = this;

  if (this.frame) {
    return this.frame;
  }

  var method = (_method = {}, _defineProperty(_method, HTTP2_HEADER_PATH, this.path), _defineProperty(_method, HTTP2_HEADER_METHOD, this.method), _method);
  var headers = this.mapToHttp2Header(this._headers);
  headers = Object.assign(headers, method);
  var frame = this.session.request(headers); // eslint-disable-next-line no-unused-vars

  frame.once('response', function (headers, flags) {
    headers = _this2.mapToHttpHeader(headers);
    frame.headers = headers;
    frame.statusCode = headers[HTTP2_HEADER_STATUS];
    frame.status = frame.statusCode;

    _this2.emit('response', frame);
  });
  this._headerSent = true;
  frame.once('drain', function () {
    return _this2.emit('drain');
  });
  frame.on('error', function (err) {
    return _this2.emit('error', err);
  });
  frame.on('close', function () {
    return _this2.session.close();
  });
  this.frame = frame;
  return frame;
};

Request.prototype.mapToHttpHeader = function (headers) {
  var keys = Object.keys(headers);
  var http2Headers = {};

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];
    var value = headers[key];
    key = key.toLowerCase();

    switch (key) {
      case HTTP2_HEADER_SET_COOKIE:
        value = Array.isArray(value) ? value : [value];
        break;

      default:
        break;
    }

    http2Headers[key] = value;
  }

  return http2Headers;
};

Request.prototype.mapToHttp2Header = function (headers) {
  var keys = Object.keys(headers);
  var http2Headers = {};

  for (var _i2 = 0, _keys2 = keys; _i2 < _keys2.length; _i2++) {
    var key = _keys2[_i2];
    var value = headers[key];
    key = key.toLowerCase();

    switch (key) {
      case HTTP2_HEADER_HOST:
        key = HTTP2_HEADER_AUTHORITY;
        value = /^http:\/\/|^https:\/\//.test(value) ? parse(value).host : value;
        break;

      default:
        break;
    }

    http2Headers[key] = value;
  }

  return http2Headers;
};

Request.prototype.setHeader = function (name, value) {
  this._headers[name.toLowerCase()] = value;
};

Request.prototype.getHeader = function (name) {
  return this._headers[name.toLowerCase()];
};

Request.prototype.write = function (data, encoding) {
  var frame = this.getFrame();
  return frame.write(data, encoding);
};

Request.prototype.pipe = function (stream, options) {
  var frame = this.getFrame();
  return frame.pipe(stream, options);
};

Request.prototype.end = function (data) {
  var frame = this.getFrame();
  frame.end(data);
}; // eslint-disable-next-line no-unused-vars


Request.prototype.abort = function (data) {
  var frame = this.getFrame();
  frame.close(NGHTTP2_CANCEL);
  this.session.destroy();
};

exports.setProtocol = setProtocol;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlL2h0dHAyd3JhcHBlci5qcyJdLCJuYW1lcyI6WyJTdHJlYW0iLCJyZXF1aXJlIiwidXRpbCIsIm5ldCIsInRscyIsInBhcnNlIiwic2VtdmVyIiwiaHR0cDIiLCJndGUiLCJwcm9jZXNzIiwidmVyc2lvbiIsIkVycm9yIiwiY29uc3RhbnRzIiwiSFRUUDJfSEVBREVSX1BBVEgiLCJIVFRQMl9IRUFERVJfU1RBVFVTIiwiSFRUUDJfSEVBREVSX01FVEhPRCIsIkhUVFAyX0hFQURFUl9BVVRIT1JJVFkiLCJIVFRQMl9IRUFERVJfSE9TVCIsIkhUVFAyX0hFQURFUl9TRVRfQ09PS0lFIiwiTkdIVFRQMl9DQU5DRUwiLCJzZXRQcm90b2NvbCIsInByb3RvY29sIiwicmVxdWVzdCIsIm9wdGlvbnMiLCJSZXF1ZXN0IiwiY2FsbCIsImRlZmF1bHRQb3J0IiwiZGVmYXVsdEhvc3QiLCJwb3J0IiwiaG9zdCIsIm1ldGhvZCIsInBhdGgiLCJzZXNzaW9uT3B0aW9ucyIsInNvY2tldFBhdGgiLCJjcmVhdGVDb25uZWN0aW9uIiwiY3JlYXRlVW5peENvbm5lY3Rpb24iLCJiaW5kIiwiX2hlYWRlcnMiLCJzZXNzaW9uIiwiY29ubmVjdCIsInNldEhlYWRlciIsIm9uIiwiZXJyIiwiZW1pdCIsImluaGVyaXRzIiwicHJvdG90eXBlIiwiYXV0aG9yaXR5IiwiQUxQTlByb3RvY29scyIsInNlcnZlcm5hbWUiLCJhbGxvd0hhbGZPcGVuIiwic2V0Tm9EZWxheSIsImJvb2wiLCJnZXRGcmFtZSIsImZyYW1lIiwiaGVhZGVycyIsIm1hcFRvSHR0cDJIZWFkZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJvbmNlIiwiZmxhZ3MiLCJtYXBUb0h0dHBIZWFkZXIiLCJzdGF0dXNDb2RlIiwic3RhdHVzIiwiX2hlYWRlclNlbnQiLCJjbG9zZSIsImtleXMiLCJodHRwMkhlYWRlcnMiLCJrZXkiLCJ2YWx1ZSIsInRvTG93ZXJDYXNlIiwiQXJyYXkiLCJpc0FycmF5IiwidGVzdCIsIm5hbWUiLCJnZXRIZWFkZXIiLCJ3cml0ZSIsImRhdGEiLCJlbmNvZGluZyIsInBpcGUiLCJzdHJlYW0iLCJlbmQiLCJhYm9ydCIsImRlc3Ryb3kiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQU1BLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBdEI7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHRCxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFDQSxJQUFNRSxHQUFHLEdBQUdGLE9BQU8sQ0FBQyxLQUFELENBQW5COztBQUNBLElBQU1HLEdBQUcsR0FBR0gsT0FBTyxDQUFDLEtBQUQsQ0FBbkIsQyxDQUNBOzs7ZUFDa0JBLE9BQU8sQ0FBQyxLQUFELEM7SUFBakJJLEssWUFBQUEsSzs7QUFDUixJQUFNQyxNQUFNLEdBQUdMLE9BQU8sQ0FBQyxRQUFELENBQXRCOztBQUVBLElBQUlNLEtBQUosQyxDQUNBOztBQUNBLElBQUlELE1BQU0sQ0FBQ0UsR0FBUCxDQUFXQyxPQUFPLENBQUNDLE9BQW5CLEVBQTRCLFVBQTVCLENBQUosRUFBNkNILEtBQUssR0FBR04sT0FBTyxDQUFDLE9BQUQsQ0FBZixDQUE3QyxLQUVFLE1BQU0sSUFBSVUsS0FBSixDQUFVLDREQUFWLENBQU47dUJBVUVKLEtBQUssQ0FBQ0ssUztJQVBSQyxpQixvQkFBQUEsaUI7SUFDQUMsbUIsb0JBQUFBLG1CO0lBQ0FDLG1CLG9CQUFBQSxtQjtJQUNBQyxzQixvQkFBQUEsc0I7SUFDQUMsaUIsb0JBQUFBLGlCO0lBQ0FDLHVCLG9CQUFBQSx1QjtJQUNBQyxjLG9CQUFBQSxjOztBQUdGLFNBQVNDLFdBQVQsQ0FBcUJDLFFBQXJCLEVBQStCO0FBQzdCLFNBQU87QUFDTEMsSUFBQUEsT0FESyxtQkFDR0MsT0FESCxFQUNZO0FBQ2YsYUFBTyxJQUFJQyxPQUFKLENBQVlILFFBQVosRUFBc0JFLE9BQXRCLENBQVA7QUFDRDtBQUhJLEdBQVA7QUFLRDs7QUFFRCxTQUFTQyxPQUFULENBQWlCSCxRQUFqQixFQUEyQkUsT0FBM0IsRUFBb0M7QUFBQTs7QUFDbEN2QixFQUFBQSxNQUFNLENBQUN5QixJQUFQLENBQVksSUFBWjtBQUNBLE1BQU1DLFdBQVcsR0FBR0wsUUFBUSxLQUFLLFFBQWIsR0FBd0IsR0FBeEIsR0FBOEIsRUFBbEQ7QUFDQSxNQUFNTSxXQUFXLEdBQUcsV0FBcEI7QUFDQSxNQUFNQyxJQUFJLEdBQUdMLE9BQU8sQ0FBQ0ssSUFBUixJQUFnQkYsV0FBN0I7QUFDQSxNQUFNRyxJQUFJLEdBQUdOLE9BQU8sQ0FBQ00sSUFBUixJQUFnQkYsV0FBN0I7QUFFQSxTQUFPSixPQUFPLENBQUNLLElBQWY7QUFDQSxTQUFPTCxPQUFPLENBQUNNLElBQWY7QUFFQSxPQUFLQyxNQUFMLEdBQWNQLE9BQU8sQ0FBQ08sTUFBdEI7QUFDQSxPQUFLQyxJQUFMLEdBQVlSLE9BQU8sQ0FBQ1EsSUFBcEI7QUFDQSxPQUFLVixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLE9BQUtRLElBQUwsR0FBWUEsSUFBWjtBQUVBLFNBQU9OLE9BQU8sQ0FBQ08sTUFBZjtBQUNBLFNBQU9QLE9BQU8sQ0FBQ1EsSUFBZjs7QUFFQSxNQUFNQyxjQUFjLHFCQUFRVCxPQUFSLENBQXBCOztBQUNBLE1BQUlBLE9BQU8sQ0FBQ1UsVUFBWixFQUF3QjtBQUN0QkQsSUFBQUEsY0FBYyxDQUFDQyxVQUFmLEdBQTRCVixPQUFPLENBQUNVLFVBQXBDO0FBQ0FELElBQUFBLGNBQWMsQ0FBQ0UsZ0JBQWYsR0FBa0MsS0FBS0Msb0JBQUwsQ0FBMEJDLElBQTFCLENBQStCLElBQS9CLENBQWxDO0FBQ0Q7O0FBRUQsT0FBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUVBLE1BQU1DLE9BQU8sR0FBRy9CLEtBQUssQ0FBQ2dDLE9BQU4sV0FBaUJsQixRQUFqQixlQUE4QlEsSUFBOUIsY0FBc0NELElBQXRDLEdBQThDSSxjQUE5QyxDQUFoQjtBQUNBLE9BQUtRLFNBQUwsQ0FBZSxNQUFmLFlBQTBCWCxJQUExQixjQUFrQ0QsSUFBbEM7QUFFQVUsRUFBQUEsT0FBTyxDQUFDRyxFQUFSLENBQVcsT0FBWCxFQUFvQixVQUFDQyxHQUFEO0FBQUEsV0FBUyxLQUFJLENBQUNDLElBQUwsQ0FBVSxPQUFWLEVBQW1CRCxHQUFuQixDQUFUO0FBQUEsR0FBcEI7QUFFQSxPQUFLSixPQUFMLEdBQWVBLE9BQWY7QUFDRDtBQUVEOzs7OztBQUdBcEMsSUFBSSxDQUFDMEMsUUFBTCxDQUFjcEIsT0FBZCxFQUF1QnhCLE1BQXZCOztBQUVBd0IsT0FBTyxDQUFDcUIsU0FBUixDQUFrQlYsb0JBQWxCLEdBQXlDLFVBQVVXLFNBQVYsRUFBcUJ2QixPQUFyQixFQUE4QjtBQUNyRSxVQUFRLEtBQUtGLFFBQWI7QUFDRSxTQUFLLE9BQUw7QUFDRSxhQUFPbEIsR0FBRyxDQUFDb0MsT0FBSixDQUFZaEIsT0FBTyxDQUFDVSxVQUFwQixDQUFQOztBQUNGLFNBQUssUUFBTDtBQUNFVixNQUFBQSxPQUFPLENBQUN3QixhQUFSLEdBQXdCLENBQUMsSUFBRCxDQUF4QjtBQUNBeEIsTUFBQUEsT0FBTyxDQUFDeUIsVUFBUixHQUFxQixLQUFLbkIsSUFBMUI7QUFDQU4sTUFBQUEsT0FBTyxDQUFDMEIsYUFBUixHQUF3QixJQUF4QjtBQUNBLGFBQU83QyxHQUFHLENBQUNtQyxPQUFKLENBQVloQixPQUFPLENBQUNVLFVBQXBCLEVBQWdDVixPQUFoQyxDQUFQOztBQUNGO0FBQ0UsWUFBTSxJQUFJWixLQUFKLENBQVUsc0JBQVYsRUFBa0MsS0FBS1UsUUFBdkMsQ0FBTjtBQVRKO0FBV0QsQ0FaRCxDLENBY0E7OztBQUNBRyxPQUFPLENBQUNxQixTQUFSLENBQWtCSyxVQUFsQixHQUErQixVQUFVQyxJQUFWLEVBQWdCLENBQzdDO0FBQ0E7QUFDQTtBQUNELENBSkQ7O0FBTUEzQixPQUFPLENBQUNxQixTQUFSLENBQWtCTyxRQUFsQixHQUE2QixZQUFZO0FBQUE7QUFBQTs7QUFDdkMsTUFBSSxLQUFLQyxLQUFULEVBQWdCO0FBQ2QsV0FBTyxLQUFLQSxLQUFaO0FBQ0Q7O0FBRUQsTUFBTXZCLE1BQU0sMkNBQ1RqQixpQkFEUyxFQUNXLEtBQUtrQixJQURoQiw0QkFFVGhCLG1CQUZTLEVBRWEsS0FBS2UsTUFGbEIsV0FBWjtBQUtBLE1BQUl3QixPQUFPLEdBQUcsS0FBS0MsZ0JBQUwsQ0FBc0IsS0FBS2xCLFFBQTNCLENBQWQ7QUFFQWlCLEVBQUFBLE9BQU8sR0FBR0UsTUFBTSxDQUFDQyxNQUFQLENBQWNILE9BQWQsRUFBdUJ4QixNQUF2QixDQUFWO0FBRUEsTUFBTXVCLEtBQUssR0FBRyxLQUFLZixPQUFMLENBQWFoQixPQUFiLENBQXFCZ0MsT0FBckIsQ0FBZCxDQWR1QyxDQWV2Qzs7QUFDQUQsRUFBQUEsS0FBSyxDQUFDSyxJQUFOLENBQVcsVUFBWCxFQUF1QixVQUFDSixPQUFELEVBQVVLLEtBQVYsRUFBb0I7QUFDekNMLElBQUFBLE9BQU8sR0FBRyxNQUFJLENBQUNNLGVBQUwsQ0FBcUJOLE9BQXJCLENBQVY7QUFDQUQsSUFBQUEsS0FBSyxDQUFDQyxPQUFOLEdBQWdCQSxPQUFoQjtBQUNBRCxJQUFBQSxLQUFLLENBQUNRLFVBQU4sR0FBbUJQLE9BQU8sQ0FBQ3hDLG1CQUFELENBQTFCO0FBQ0F1QyxJQUFBQSxLQUFLLENBQUNTLE1BQU4sR0FBZVQsS0FBSyxDQUFDUSxVQUFyQjs7QUFDQSxJQUFBLE1BQUksQ0FBQ2xCLElBQUwsQ0FBVSxVQUFWLEVBQXNCVSxLQUF0QjtBQUNELEdBTkQ7QUFRQSxPQUFLVSxXQUFMLEdBQW1CLElBQW5CO0FBRUFWLEVBQUFBLEtBQUssQ0FBQ0ssSUFBTixDQUFXLE9BQVgsRUFBb0I7QUFBQSxXQUFNLE1BQUksQ0FBQ2YsSUFBTCxDQUFVLE9BQVYsQ0FBTjtBQUFBLEdBQXBCO0FBQ0FVLEVBQUFBLEtBQUssQ0FBQ1osRUFBTixDQUFTLE9BQVQsRUFBa0IsVUFBQ0MsR0FBRDtBQUFBLFdBQVMsTUFBSSxDQUFDQyxJQUFMLENBQVUsT0FBVixFQUFtQkQsR0FBbkIsQ0FBVDtBQUFBLEdBQWxCO0FBQ0FXLEVBQUFBLEtBQUssQ0FBQ1osRUFBTixDQUFTLE9BQVQsRUFBa0I7QUFBQSxXQUFNLE1BQUksQ0FBQ0gsT0FBTCxDQUFhMEIsS0FBYixFQUFOO0FBQUEsR0FBbEI7QUFFQSxPQUFLWCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFPQSxLQUFQO0FBQ0QsQ0FoQ0Q7O0FBa0NBN0IsT0FBTyxDQUFDcUIsU0FBUixDQUFrQmUsZUFBbEIsR0FBb0MsVUFBVU4sT0FBVixFQUFtQjtBQUNyRCxNQUFNVyxJQUFJLEdBQUdULE1BQU0sQ0FBQ1MsSUFBUCxDQUFZWCxPQUFaLENBQWI7QUFDQSxNQUFNWSxZQUFZLEdBQUcsRUFBckI7O0FBQ0EsMkJBQWdCRCxJQUFoQiwyQkFBc0I7QUFBakIsUUFBSUUsR0FBRyxZQUFQO0FBQ0gsUUFBSUMsS0FBSyxHQUFHZCxPQUFPLENBQUNhLEdBQUQsQ0FBbkI7QUFDQUEsSUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNFLFdBQUosRUFBTjs7QUFDQSxZQUFRRixHQUFSO0FBQ0UsV0FBS2pELHVCQUFMO0FBQ0VrRCxRQUFBQSxLQUFLLEdBQUdFLEtBQUssQ0FBQ0MsT0FBTixDQUFjSCxLQUFkLElBQXVCQSxLQUF2QixHQUErQixDQUFDQSxLQUFELENBQXZDO0FBQ0E7O0FBQ0Y7QUFDRTtBQUxKOztBQVFBRixJQUFBQSxZQUFZLENBQUNDLEdBQUQsQ0FBWixHQUFvQkMsS0FBcEI7QUFDRDs7QUFFRCxTQUFPRixZQUFQO0FBQ0QsQ0FsQkQ7O0FBb0JBMUMsT0FBTyxDQUFDcUIsU0FBUixDQUFrQlUsZ0JBQWxCLEdBQXFDLFVBQVVELE9BQVYsRUFBbUI7QUFDdEQsTUFBTVcsSUFBSSxHQUFHVCxNQUFNLENBQUNTLElBQVAsQ0FBWVgsT0FBWixDQUFiO0FBQ0EsTUFBTVksWUFBWSxHQUFHLEVBQXJCOztBQUNBLDZCQUFnQkQsSUFBaEIsOEJBQXNCO0FBQWpCLFFBQUlFLEdBQUcsY0FBUDtBQUNILFFBQUlDLEtBQUssR0FBR2QsT0FBTyxDQUFDYSxHQUFELENBQW5CO0FBQ0FBLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDRSxXQUFKLEVBQU47O0FBQ0EsWUFBUUYsR0FBUjtBQUNFLFdBQUtsRCxpQkFBTDtBQUNFa0QsUUFBQUEsR0FBRyxHQUFHbkQsc0JBQU47QUFDQW9ELFFBQUFBLEtBQUssR0FBRyx5QkFBeUJJLElBQXpCLENBQThCSixLQUE5QixJQUNKL0QsS0FBSyxDQUFDK0QsS0FBRCxDQUFMLENBQWF2QyxJQURULEdBRUp1QyxLQUZKO0FBR0E7O0FBQ0Y7QUFDRTtBQVJKOztBQVdBRixJQUFBQSxZQUFZLENBQUNDLEdBQUQsQ0FBWixHQUFvQkMsS0FBcEI7QUFDRDs7QUFFRCxTQUFPRixZQUFQO0FBQ0QsQ0FyQkQ7O0FBdUJBMUMsT0FBTyxDQUFDcUIsU0FBUixDQUFrQkwsU0FBbEIsR0FBOEIsVUFBVWlDLElBQVYsRUFBZ0JMLEtBQWhCLEVBQXVCO0FBQ25ELE9BQUsvQixRQUFMLENBQWNvQyxJQUFJLENBQUNKLFdBQUwsRUFBZCxJQUFvQ0QsS0FBcEM7QUFDRCxDQUZEOztBQUlBNUMsT0FBTyxDQUFDcUIsU0FBUixDQUFrQjZCLFNBQWxCLEdBQThCLFVBQVVELElBQVYsRUFBZ0I7QUFDNUMsU0FBTyxLQUFLcEMsUUFBTCxDQUFjb0MsSUFBSSxDQUFDSixXQUFMLEVBQWQsQ0FBUDtBQUNELENBRkQ7O0FBSUE3QyxPQUFPLENBQUNxQixTQUFSLENBQWtCOEIsS0FBbEIsR0FBMEIsVUFBVUMsSUFBVixFQUFnQkMsUUFBaEIsRUFBMEI7QUFDbEQsTUFBTXhCLEtBQUssR0FBRyxLQUFLRCxRQUFMLEVBQWQ7QUFDQSxTQUFPQyxLQUFLLENBQUNzQixLQUFOLENBQVlDLElBQVosRUFBa0JDLFFBQWxCLENBQVA7QUFDRCxDQUhEOztBQUtBckQsT0FBTyxDQUFDcUIsU0FBUixDQUFrQmlDLElBQWxCLEdBQXlCLFVBQVVDLE1BQVYsRUFBa0J4RCxPQUFsQixFQUEyQjtBQUNsRCxNQUFNOEIsS0FBSyxHQUFHLEtBQUtELFFBQUwsRUFBZDtBQUNBLFNBQU9DLEtBQUssQ0FBQ3lCLElBQU4sQ0FBV0MsTUFBWCxFQUFtQnhELE9BQW5CLENBQVA7QUFDRCxDQUhEOztBQUtBQyxPQUFPLENBQUNxQixTQUFSLENBQWtCbUMsR0FBbEIsR0FBd0IsVUFBVUosSUFBVixFQUFnQjtBQUN0QyxNQUFNdkIsS0FBSyxHQUFHLEtBQUtELFFBQUwsRUFBZDtBQUNBQyxFQUFBQSxLQUFLLENBQUMyQixHQUFOLENBQVVKLElBQVY7QUFDRCxDQUhELEMsQ0FLQTs7O0FBQ0FwRCxPQUFPLENBQUNxQixTQUFSLENBQWtCb0MsS0FBbEIsR0FBMEIsVUFBVUwsSUFBVixFQUFnQjtBQUN4QyxNQUFNdkIsS0FBSyxHQUFHLEtBQUtELFFBQUwsRUFBZDtBQUNBQyxFQUFBQSxLQUFLLENBQUNXLEtBQU4sQ0FBWTdDLGNBQVo7QUFDQSxPQUFLbUIsT0FBTCxDQUFhNEMsT0FBYjtBQUNELENBSkQ7O0FBTUFDLE9BQU8sQ0FBQy9ELFdBQVIsR0FBc0JBLFdBQXRCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgbmV0ID0gcmVxdWlyZSgnbmV0Jyk7XG5jb25zdCB0bHMgPSByZXF1aXJlKCd0bHMnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLWRlcHJlY2F0ZWQtYXBpXG5jb25zdCB7IHBhcnNlIH0gPSByZXF1aXJlKCd1cmwnKTtcbmNvbnN0IHNlbXZlciA9IHJlcXVpcmUoJ3NlbXZlcicpO1xuXG5sZXQgaHR0cDI7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG5pZiAoc2VtdmVyLmd0ZShwcm9jZXNzLnZlcnNpb24sICd2MTAuMTAuMCcpKSBodHRwMiA9IHJlcXVpcmUoJ2h0dHAyJyk7XG5lbHNlXG4gIHRocm93IG5ldyBFcnJvcignc3VwZXJhZ2VudDogdGhpcyB2ZXJzaW9uIG9mIE5vZGUuanMgZG9lcyBub3Qgc3VwcG9ydCBodHRwMicpO1xuXG5jb25zdCB7XG4gIEhUVFAyX0hFQURFUl9QQVRILFxuICBIVFRQMl9IRUFERVJfU1RBVFVTLFxuICBIVFRQMl9IRUFERVJfTUVUSE9ELFxuICBIVFRQMl9IRUFERVJfQVVUSE9SSVRZLFxuICBIVFRQMl9IRUFERVJfSE9TVCxcbiAgSFRUUDJfSEVBREVSX1NFVF9DT09LSUUsXG4gIE5HSFRUUDJfQ0FOQ0VMXG59ID0gaHR0cDIuY29uc3RhbnRzO1xuXG5mdW5jdGlvbiBzZXRQcm90b2NvbChwcm90b2NvbCkge1xuICByZXR1cm4ge1xuICAgIHJlcXVlc3Qob3B0aW9ucykge1xuICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHByb3RvY29sLCBvcHRpb25zKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIFJlcXVlc3QocHJvdG9jb2wsIG9wdGlvbnMpIHtcbiAgU3RyZWFtLmNhbGwodGhpcyk7XG4gIGNvbnN0IGRlZmF1bHRQb3J0ID0gcHJvdG9jb2wgPT09ICdodHRwczonID8gNDQzIDogODA7XG4gIGNvbnN0IGRlZmF1bHRIb3N0ID0gJ2xvY2FsaG9zdCc7XG4gIGNvbnN0IHBvcnQgPSBvcHRpb25zLnBvcnQgfHwgZGVmYXVsdFBvcnQ7XG4gIGNvbnN0IGhvc3QgPSBvcHRpb25zLmhvc3QgfHwgZGVmYXVsdEhvc3Q7XG5cbiAgZGVsZXRlIG9wdGlvbnMucG9ydDtcbiAgZGVsZXRlIG9wdGlvbnMuaG9zdDtcblxuICB0aGlzLm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kO1xuICB0aGlzLnBhdGggPSBvcHRpb25zLnBhdGg7XG4gIHRoaXMucHJvdG9jb2wgPSBwcm90b2NvbDtcbiAgdGhpcy5ob3N0ID0gaG9zdDtcblxuICBkZWxldGUgb3B0aW9ucy5tZXRob2Q7XG4gIGRlbGV0ZSBvcHRpb25zLnBhdGg7XG5cbiAgY29uc3Qgc2Vzc2lvbk9wdGlvbnMgPSB7IC4uLm9wdGlvbnMgfTtcbiAgaWYgKG9wdGlvbnMuc29ja2V0UGF0aCkge1xuICAgIHNlc3Npb25PcHRpb25zLnNvY2tldFBhdGggPSBvcHRpb25zLnNvY2tldFBhdGg7XG4gICAgc2Vzc2lvbk9wdGlvbnMuY3JlYXRlQ29ubmVjdGlvbiA9IHRoaXMuY3JlYXRlVW5peENvbm5lY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxuXG4gIHRoaXMuX2hlYWRlcnMgPSB7fTtcblxuICBjb25zdCBzZXNzaW9uID0gaHR0cDIuY29ubmVjdChgJHtwcm90b2NvbH0vLyR7aG9zdH06JHtwb3J0fWAsIHNlc3Npb25PcHRpb25zKTtcbiAgdGhpcy5zZXRIZWFkZXIoJ2hvc3QnLCBgJHtob3N0fToke3BvcnR9YCk7XG5cbiAgc2Vzc2lvbi5vbignZXJyb3InLCAoZXJyKSA9PiB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKSk7XG5cbiAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbn1cblxuLyoqXG4gKiBJbmhlcml0IGZyb20gYFN0cmVhbWAgKHdoaWNoIGluaGVyaXRzIGZyb20gYEV2ZW50RW1pdHRlcmApLlxuICovXG51dGlsLmluaGVyaXRzKFJlcXVlc3QsIFN0cmVhbSk7XG5cblJlcXVlc3QucHJvdG90eXBlLmNyZWF0ZVVuaXhDb25uZWN0aW9uID0gZnVuY3Rpb24gKGF1dGhvcml0eSwgb3B0aW9ucykge1xuICBzd2l0Y2ggKHRoaXMucHJvdG9jb2wpIHtcbiAgICBjYXNlICdodHRwOic6XG4gICAgICByZXR1cm4gbmV0LmNvbm5lY3Qob3B0aW9ucy5zb2NrZXRQYXRoKTtcbiAgICBjYXNlICdodHRwczonOlxuICAgICAgb3B0aW9ucy5BTFBOUHJvdG9jb2xzID0gWydoMiddO1xuICAgICAgb3B0aW9ucy5zZXJ2ZXJuYW1lID0gdGhpcy5ob3N0O1xuICAgICAgb3B0aW9ucy5hbGxvd0hhbGZPcGVuID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0bHMuY29ubmVjdChvcHRpb25zLnNvY2tldFBhdGgsIG9wdGlvbnMpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sJywgdGhpcy5wcm90b2NvbCk7XG4gIH1cbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuUmVxdWVzdC5wcm90b3R5cGUuc2V0Tm9EZWxheSA9IGZ1bmN0aW9uIChib29sKSB7XG4gIC8vIFdlIGNhbiBub3QgdXNlIHNldE5vRGVsYXkgd2l0aCBIVFRQLzIuXG4gIC8vIE5vZGUgMTAgbGltaXRzIGh0dHAyc2Vzc2lvbi5zb2NrZXQgbWV0aG9kcyB0byBvbmVzIHNhZmUgdG8gdXNlIHdpdGggSFRUUC8yLlxuICAvLyBTZWUgYWxzbyBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAyLmh0bWwjaHR0cDJfaHR0cDJzZXNzaW9uX3NvY2tldFxufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuZ2V0RnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmZyYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZnJhbWU7XG4gIH1cblxuICBjb25zdCBtZXRob2QgPSB7XG4gICAgW0hUVFAyX0hFQURFUl9QQVRIXTogdGhpcy5wYXRoLFxuICAgIFtIVFRQMl9IRUFERVJfTUVUSE9EXTogdGhpcy5tZXRob2RcbiAgfTtcblxuICBsZXQgaGVhZGVycyA9IHRoaXMubWFwVG9IdHRwMkhlYWRlcih0aGlzLl9oZWFkZXJzKTtcblxuICBoZWFkZXJzID0gT2JqZWN0LmFzc2lnbihoZWFkZXJzLCBtZXRob2QpO1xuXG4gIGNvbnN0IGZyYW1lID0gdGhpcy5zZXNzaW9uLnJlcXVlc3QoaGVhZGVycyk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBmcmFtZS5vbmNlKCdyZXNwb25zZScsIChoZWFkZXJzLCBmbGFncykgPT4ge1xuICAgIGhlYWRlcnMgPSB0aGlzLm1hcFRvSHR0cEhlYWRlcihoZWFkZXJzKTtcbiAgICBmcmFtZS5oZWFkZXJzID0gaGVhZGVycztcbiAgICBmcmFtZS5zdGF0dXNDb2RlID0gaGVhZGVyc1tIVFRQMl9IRUFERVJfU1RBVFVTXTtcbiAgICBmcmFtZS5zdGF0dXMgPSBmcmFtZS5zdGF0dXNDb2RlO1xuICAgIHRoaXMuZW1pdCgncmVzcG9uc2UnLCBmcmFtZSk7XG4gIH0pO1xuXG4gIHRoaXMuX2hlYWRlclNlbnQgPSB0cnVlO1xuXG4gIGZyYW1lLm9uY2UoJ2RyYWluJywgKCkgPT4gdGhpcy5lbWl0KCdkcmFpbicpKTtcbiAgZnJhbWUub24oJ2Vycm9yJywgKGVycikgPT4gdGhpcy5lbWl0KCdlcnJvcicsIGVycikpO1xuICBmcmFtZS5vbignY2xvc2UnLCAoKSA9PiB0aGlzLnNlc3Npb24uY2xvc2UoKSk7XG5cbiAgdGhpcy5mcmFtZSA9IGZyYW1lO1xuICByZXR1cm4gZnJhbWU7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5tYXBUb0h0dHBIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVycykge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoaGVhZGVycyk7XG4gIGNvbnN0IGh0dHAySGVhZGVycyA9IHt9O1xuICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgIGxldCB2YWx1ZSA9IGhlYWRlcnNba2V5XTtcbiAgICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBIVFRQMl9IRUFERVJfU0VUX0NPT0tJRTpcbiAgICAgICAgdmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBodHRwMkhlYWRlcnNba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGh0dHAySGVhZGVycztcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLm1hcFRvSHR0cDJIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVycykge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoaGVhZGVycyk7XG4gIGNvbnN0IGh0dHAySGVhZGVycyA9IHt9O1xuICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgIGxldCB2YWx1ZSA9IGhlYWRlcnNba2V5XTtcbiAgICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSBIVFRQMl9IRUFERVJfSE9TVDpcbiAgICAgICAga2V5ID0gSFRUUDJfSEVBREVSX0FVVEhPUklUWTtcbiAgICAgICAgdmFsdWUgPSAvXmh0dHA6XFwvXFwvfF5odHRwczpcXC9cXC8vLnRlc3QodmFsdWUpXG4gICAgICAgICAgPyBwYXJzZSh2YWx1ZSkuaG9zdFxuICAgICAgICAgIDogdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaHR0cDJIZWFkZXJzW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBodHRwMkhlYWRlcnM7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5zZXRIZWFkZXIgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5faGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gdmFsdWU7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5nZXRIZWFkZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gdGhpcy5faGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoZGF0YSwgZW5jb2RpbmcpIHtcbiAgY29uc3QgZnJhbWUgPSB0aGlzLmdldEZyYW1lKCk7XG4gIHJldHVybiBmcmFtZS53cml0ZShkYXRhLCBlbmNvZGluZyk7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKHN0cmVhbSwgb3B0aW9ucykge1xuICBjb25zdCBmcmFtZSA9IHRoaXMuZ2V0RnJhbWUoKTtcbiAgcmV0dXJuIGZyYW1lLnBpcGUoc3RyZWFtLCBvcHRpb25zKTtcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIGNvbnN0IGZyYW1lID0gdGhpcy5nZXRGcmFtZSgpO1xuICBmcmFtZS5lbmQoZGF0YSk7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblJlcXVlc3QucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgY29uc3QgZnJhbWUgPSB0aGlzLmdldEZyYW1lKCk7XG4gIGZyYW1lLmNsb3NlKE5HSFRUUDJfQ0FOQ0VMKTtcbiAgdGhpcy5zZXNzaW9uLmRlc3Ryb3koKTtcbn07XG5cbmV4cG9ydHMuc2V0UHJvdG9jb2wgPSBzZXRQcm90b2NvbDtcbiJdfQ==

/***/ }),

/***/ 1524:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Module dependencies.
 */
// eslint-disable-next-line node/no-deprecated-api
var _require = __nccwpck_require__(8835),
    parse = _require.parse,
    format = _require.format,
    resolve = _require.resolve;

var Stream = __nccwpck_require__(2413);

var https = __nccwpck_require__(7211);

var http = __nccwpck_require__(8605);

var fs = __nccwpck_require__(5747);

var zlib = __nccwpck_require__(8761);

var util = __nccwpck_require__(1669);

var qs = __nccwpck_require__(7119);

var mime = __nccwpck_require__(9994);

var methods = __nccwpck_require__(8752);

var FormData = __nccwpck_require__(7966);

var formidable = __nccwpck_require__(5265);

var debug = __nccwpck_require__(8237)('superagent');

var CookieJar = __nccwpck_require__(5507);

var semver = __nccwpck_require__(1449);

var safeStringify = __nccwpck_require__(7676);

var utils = __nccwpck_require__(5523);

var RequestBase = __nccwpck_require__(9723);

var _require2 = __nccwpck_require__(7060),
    unzip = _require2.unzip;

var Response = __nccwpck_require__(9660);

var http2;
if (semver.gte(process.version, 'v10.10.0')) http2 = __nccwpck_require__(3554);

function request(method, url) {
  // callback
  if (typeof url === 'function') {
    return new exports.Request('GET', method).end(url);
  } // url first


  if (arguments.length === 1) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

module.exports = request;
exports = module.exports;
/**
 * Expose `Request`.
 */

exports.Request = Request;
/**
 * Expose the agent function
 */

exports.agent = __nccwpck_require__(4816);
/**
 * Noop.
 */

function noop() {}
/**
 * Expose `Response`.
 */


exports.Response = Response;
/**
 * Define "form" mime type.
 */

mime.define({
  'application/x-www-form-urlencoded': ['form', 'urlencoded', 'form-data']
}, true);
/**
 * Protocol map.
 */

exports.protocols = {
  'http:': http,
  'https:': https,
  'http2:': http2
};
/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

exports.serialize = {
  'application/x-www-form-urlencoded': qs.stringify,
  'application/json': safeStringify
};
/**
 * Default parsers.
 *
 *     superagent.parse['application/xml'] = function(res, fn){
 *       fn(null, res);
 *     };
 *
 */

exports.parse = __nccwpck_require__(913);
/**
 * Default buffering map. Can be used to set certain
 * response types to buffer/not buffer.
 *
 *     superagent.buffer['application/xml'] = true;
 */

exports.buffer = {};
/**
 * Initialize internal header tracking properties on a request instance.
 *
 * @param {Object} req the instance
 * @api private
 */

function _initHeaders(req) {
  req._header = {// coerces header names to lowercase
  };
  req.header = {// preserves header name case
  };
}
/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String|Object} url
 * @api public
 */


function Request(method, url) {
  Stream.call(this);
  if (typeof url !== 'string') url = format(url);
  this._enableHttp2 = Boolean(process.env.HTTP2_TEST); // internal only

  this._agent = false;
  this._formData = null;
  this.method = method;
  this.url = url;

  _initHeaders(this);

  this.writable = true;
  this._redirects = 0;
  this.redirects(method === 'HEAD' ? 0 : 5);
  this.cookies = '';
  this.qs = {};
  this._query = [];
  this.qsRaw = this._query; // Unused, for backwards compatibility only

  this._redirectList = [];
  this._streamRequest = false;
  this.once('end', this.clearTimeout.bind(this));
}
/**
 * Inherit from `Stream` (which inherits from `EventEmitter`).
 * Mixin `RequestBase`.
 */


util.inherits(Request, Stream); // eslint-disable-next-line new-cap

RequestBase(Request.prototype);
/**
 * Enable or Disable http2.
 *
 * Enable http2.
 *
 * ``` js
 * request.get('http://localhost/')
 *   .http2()
 *   .end(callback);
 *
 * request.get('http://localhost/')
 *   .http2(true)
 *   .end(callback);
 * ```
 *
 * Disable http2.
 *
 * ``` js
 * request = request.http2();
 * request.get('http://localhost/')
 *   .http2(false)
 *   .end(callback);
 * ```
 *
 * @param {Boolean} enable
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.http2 = function (bool) {
  if (exports.protocols['http2:'] === undefined) {
    throw new Error('superagent: this version of Node.js does not support http2');
  }

  this._enableHttp2 = bool === undefined ? true : bool;
  return this;
};
/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('http://localhost/upload')
 *   .attach('field', Buffer.from('<b>Hello world</b>'), 'hello.html')
 *   .end(callback);
 * ```
 *
 * A filename may also be used:
 *
 * ``` js
 * request.post('http://localhost/upload')
 *   .attach('files', 'image.jpg')
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {String|fs.ReadStream|Buffer} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.attach = function (field, file, options) {
  if (file) {
    if (this._data) {
      throw new Error("superagent can't mix .send() and .attach()");
    }

    var o = options || {};

    if (typeof options === 'string') {
      o = {
        filename: options
      };
    }

    if (typeof file === 'string') {
      if (!o.filename) o.filename = file;
      debug('creating `fs.ReadStream` instance for file: %s', file);
      file = fs.createReadStream(file);
    } else if (!o.filename && file.path) {
      o.filename = file.path;
    }

    this._getFormData().append(field, file, o);
  }

  return this;
};

Request.prototype._getFormData = function () {
  var _this = this;

  if (!this._formData) {
    this._formData = new FormData();

    this._formData.on('error', function (err) {
      debug('FormData error', err);

      if (_this.called) {
        // The request has already finished and the callback was called.
        // Silently ignore the error.
        return;
      }

      _this.callback(err);

      _this.abort();
    });
  }

  return this._formData;
};
/**
 * Gets/sets the `Agent` to use for this HTTP request. The default (if this
 * function is not called) is to opt out of connection pooling (`agent: false`).
 *
 * @param {http.Agent} agent
 * @return {http.Agent}
 * @api public
 */


Request.prototype.agent = function (agent) {
  if (arguments.length === 0) return this._agent;
  this._agent = agent;
  return this;
};
/**
 * Set _Content-Type_ response header passed through `mime.getType()`.
 *
 * Examples:
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('json')
 *        .send(jsonstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/json')
 *        .send(jsonstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.type = function (type) {
  return this.set('Content-Type', type.includes('/') ? type : mime.getType(type));
};
/**
 * Set _Accept_ response header passed through `mime.getType()`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.accept = function (type) {
  return this.set('Accept', type.includes('/') ? type : mime.getType(type));
};
/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.query = function (val) {
  if (typeof val === 'string') {
    this._query.push(val);
  } else {
    Object.assign(this.qs, val);
  }

  return this;
};
/**
 * Write raw `data` / `encoding` to the socket.
 *
 * @param {Buffer|String} data
 * @param {String} encoding
 * @return {Boolean}
 * @api public
 */


Request.prototype.write = function (data, encoding) {
  var req = this.request();

  if (!this._streamRequest) {
    this._streamRequest = true;
  }

  return req.write(data, encoding);
};
/**
 * Pipe the request body to `stream`.
 *
 * @param {Stream} stream
 * @param {Object} options
 * @return {Stream}
 * @api public
 */


Request.prototype.pipe = function (stream, options) {
  this.piped = true; // HACK...

  this.buffer(false);
  this.end();
  return this._pipeContinue(stream, options);
};

Request.prototype._pipeContinue = function (stream, options) {
  var _this2 = this;

  this.req.once('response', function (res) {
    // redirect
    if (isRedirect(res.statusCode) && _this2._redirects++ !== _this2._maxRedirects) {
      return _this2._redirect(res) === _this2 ? _this2._pipeContinue(stream, options) : undefined;
    }

    _this2.res = res;

    _this2._emitResponse();

    if (_this2._aborted) return;

    if (_this2._shouldUnzip(res)) {
      var unzipObj = zlib.createUnzip();
      unzipObj.on('error', function (err) {
        if (err && err.code === 'Z_BUF_ERROR') {
          // unexpected end of file is ignored by browsers and curl
          stream.emit('end');
          return;
        }

        stream.emit('error', err);
      });
      res.pipe(unzipObj).pipe(stream, options);
    } else {
      res.pipe(stream, options);
    }

    res.once('end', function () {
      _this2.emit('end');
    });
  });
  return stream;
};
/**
 * Enable / disable buffering.
 *
 * @return {Boolean} [val]
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.buffer = function (val) {
  this._buffer = val !== false;
  return this;
};
/**
 * Redirect to `url
 *
 * @param {IncomingMessage} res
 * @return {Request} for chaining
 * @api private
 */


Request.prototype._redirect = function (res) {
  var url = res.headers.location;

  if (!url) {
    return this.callback(new Error('No location header for redirect'), res);
  }

  debug('redirect %s -> %s', this.url, url); // location

  url = resolve(this.url, url); // ensure the response is being consumed
  // this is required for Node v0.10+

  res.resume();
  var headers = this.req.getHeaders ? this.req.getHeaders() : this.req._headers;
  var changesOrigin = parse(url).host !== parse(this.url).host; // implementation of 302 following defacto standard

  if (res.statusCode === 301 || res.statusCode === 302) {
    // strip Content-* related fields
    // in case of POST etc
    headers = utils.cleanHeader(headers, changesOrigin); // force GET

    this.method = this.method === 'HEAD' ? 'HEAD' : 'GET'; // clear data

    this._data = null;
  } // 303 is always GET


  if (res.statusCode === 303) {
    // strip Content-* related fields
    // in case of POST etc
    headers = utils.cleanHeader(headers, changesOrigin); // force method

    this.method = 'GET'; // clear data

    this._data = null;
  } // 307 preserves method
  // 308 preserves method


  delete headers.host;
  delete this.req;
  delete this._formData; // remove all add header except User-Agent

  _initHeaders(this); // redirect


  this._endCalled = false;
  this.url = url;
  this.qs = {};
  this._query.length = 0;
  this.set(headers);
  this.emit('redirect', res);

  this._redirectList.push(this.url);

  this.end(this._callback);
  return this;
};
/**
 * Set Authorization field value with `user` and `pass`.
 *
 * Examples:
 *
 *   .auth('tobi', 'learnboost')
 *   .auth('tobi:learnboost')
 *   .auth('tobi')
 *   .auth(accessToken, { type: 'bearer' })
 *
 * @param {String} user
 * @param {String} [pass]
 * @param {Object} [options] options with authorization type 'basic' or 'bearer' ('basic' is default)
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.auth = function (user, pass, options) {
  if (arguments.length === 1) pass = '';

  if (_typeof(pass) === 'object' && pass !== null) {
    // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }

  if (!options) {
    options = {
      type: 'basic'
    };
  }

  var encoder = function encoder(string) {
    return Buffer.from(string).toString('base64');
  };

  return this._auth(user, pass, options, encoder);
};
/**
 * Set the certificate authority option for https request.
 *
 * @param {Buffer | Array} cert
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.ca = function (cert) {
  this._ca = cert;
  return this;
};
/**
 * Set the client certificate key option for https request.
 *
 * @param {Buffer | String} cert
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.key = function (cert) {
  this._key = cert;
  return this;
};
/**
 * Set the key, certificate, and CA certs of the client in PFX or PKCS12 format.
 *
 * @param {Buffer | String} cert
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.pfx = function (cert) {
  if (_typeof(cert) === 'object' && !Buffer.isBuffer(cert)) {
    this._pfx = cert.pfx;
    this._passphrase = cert.passphrase;
  } else {
    this._pfx = cert;
  }

  return this;
};
/**
 * Set the client certificate option for https request.
 *
 * @param {Buffer | String} cert
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.cert = function (cert) {
  this._cert = cert;
  return this;
};
/**
 * Do not reject expired or invalid TLS certs.
 * sets `rejectUnauthorized=true`. Be warned that this allows MITM attacks.
 *
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.disableTLSCerts = function () {
  this._disableTLSCerts = true;
  return this;
};
/**
 * Return an http[s] request.
 *
 * @return {OutgoingMessage}
 * @api private
 */
// eslint-disable-next-line complexity


Request.prototype.request = function () {
  var _this3 = this;

  if (this.req) return this.req;
  var options = {};

  try {
    var query = qs.stringify(this.qs, {
      indices: false,
      strictNullHandling: true
    });

    if (query) {
      this.qs = {};

      this._query.push(query);
    }

    this._finalizeQueryString();
  } catch (err) {
    return this.emit('error', err);
  }

  var url = this.url;
  var retries = this._retries; // Capture backticks as-is from the final query string built above.
  // Note: this'll only find backticks entered in req.query(String)
  // calls, because qs.stringify unconditionally encodes backticks.

  var queryStringBackticks;

  if (url.includes('`')) {
    var queryStartIndex = url.indexOf('?');

    if (queryStartIndex !== -1) {
      var queryString = url.slice(queryStartIndex + 1);
      queryStringBackticks = queryString.match(/`|%60/g);
    }
  } // default to http://


  if (url.indexOf('http') !== 0) url = "http://".concat(url);
  url = parse(url); // See https://github.com/visionmedia/superagent/issues/1367

  if (queryStringBackticks) {
    var i = 0;
    url.query = url.query.replace(/%60/g, function () {
      return queryStringBackticks[i++];
    });
    url.search = "?".concat(url.query);
    url.path = url.pathname + url.search;
  } // support unix sockets


  if (/^https?\+unix:/.test(url.protocol) === true) {
    // get the protocol
    url.protocol = "".concat(url.protocol.split('+')[0], ":"); // get the socket, path

    var unixParts = url.path.match(/^([^/]+)(.+)$/);
    options.socketPath = unixParts[1].replace(/%2F/g, '/');
    url.path = unixParts[2];
  } // Override IP address of a hostname


  if (this._connectOverride) {
    var _url = url,
        hostname = _url.hostname;
    var match = hostname in this._connectOverride ? this._connectOverride[hostname] : this._connectOverride['*'];

    if (match) {
      // backup the real host
      if (!this._header.host) {
        this.set('host', url.host);
      }

      var newHost;
      var newPort;

      if (_typeof(match) === 'object') {
        newHost = match.host;
        newPort = match.port;
      } else {
        newHost = match;
        newPort = url.port;
      } // wrap [ipv6]


      url.host = /:/.test(newHost) ? "[".concat(newHost, "]") : newHost;

      if (newPort) {
        url.host += ":".concat(newPort);
        url.port = newPort;
      }

      url.hostname = newHost;
    }
  } // options


  options.method = this.method;
  options.port = url.port;
  options.path = url.path;
  options.host = url.hostname;
  options.ca = this._ca;
  options.key = this._key;
  options.pfx = this._pfx;
  options.cert = this._cert;
  options.passphrase = this._passphrase;
  options.agent = this._agent;
  options.rejectUnauthorized = typeof this._disableTLSCerts === 'boolean' ? !this._disableTLSCerts : process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0'; // Allows request.get('https://1.2.3.4/').set('Host', 'example.com')

  if (this._header.host) {
    options.servername = this._header.host.replace(/:\d+$/, '');
  }

  if (this._trustLocalhost && /^(?:localhost|127\.0\.0\.\d+|(0*:)+:0*1)$/.test(url.hostname)) {
    options.rejectUnauthorized = false;
  } // initiate request


  var mod = this._enableHttp2 ? exports.protocols['http2:'].setProtocol(url.protocol) : exports.protocols[url.protocol]; // request

  this.req = mod.request(options);
  var req = this.req; // set tcp no delay

  req.setNoDelay(true);

  if (options.method !== 'HEAD') {
    req.setHeader('Accept-Encoding', 'gzip, deflate');
  }

  this.protocol = url.protocol;
  this.host = url.host; // expose events

  req.once('drain', function () {
    _this3.emit('drain');
  });
  req.on('error', function (err) {
    // flag abortion here for out timeouts
    // because node will emit a faux-error "socket hang up"
    // when request is aborted before a connection is made
    if (_this3._aborted) return; // if not the same, we are in the **old** (cancelled) request,
    // so need to continue (same as for above)

    if (_this3._retries !== retries) return; // if we've received a response then we don't want to let
    // an error in the request blow up the response

    if (_this3.response) return;

    _this3.callback(err);
  }); // auth

  if (url.auth) {
    var auth = url.auth.split(':');
    this.auth(auth[0], auth[1]);
  }

  if (this.username && this.password) {
    this.auth(this.username, this.password);
  }

  for (var key in this.header) {
    if (Object.prototype.hasOwnProperty.call(this.header, key)) req.setHeader(key, this.header[key]);
  } // add cookies


  if (this.cookies) {
    if (Object.prototype.hasOwnProperty.call(this._header, 'cookie')) {
      // merge
      var tmpJar = new CookieJar.CookieJar();
      tmpJar.setCookies(this._header.cookie.split(';'));
      tmpJar.setCookies(this.cookies.split(';'));
      req.setHeader('Cookie', tmpJar.getCookies(CookieJar.CookieAccessInfo.All).toValueString());
    } else {
      req.setHeader('Cookie', this.cookies);
    }
  }

  return req;
};
/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */


Request.prototype.callback = function (err, res) {
  if (this._shouldRetry(err, res)) {
    return this._retry();
  } // Avoid the error which is emitted from 'socket hang up' to cause the fn undefined error on JS runtime.


  var fn = this._callback || noop;
  this.clearTimeout();
  if (this.called) return console.warn('superagent: double callback bug');
  this.called = true;

  if (!err) {
    try {
      if (!this._isResponseOK(res)) {
        var msg = 'Unsuccessful HTTP response';

        if (res) {
          msg = http.STATUS_CODES[res.status] || msg;
        }

        err = new Error(msg);
        err.status = res ? res.status : undefined;
      }
    } catch (err_) {
      err = err_;
    }
  } // It's important that the callback is called outside try/catch
  // to avoid double callback


  if (!err) {
    return fn(null, res);
  }

  err.response = res;
  if (this._maxRetries) err.retries = this._retries - 1; // only emit error event if there is a listener
  // otherwise we assume the callback to `.end()` will get the error

  if (err && this.listeners('error').length > 0) {
    this.emit('error', err);
  }

  fn(err, res);
};
/**
 * Check if `obj` is a host object,
 *
 * @param {Object} obj host object
 * @return {Boolean} is a host object
 * @api private
 */


Request.prototype._isHost = function (obj) {
  return Buffer.isBuffer(obj) || obj instanceof Stream || obj instanceof FormData;
};
/**
 * Initiate request, invoking callback `fn(err, res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */


Request.prototype._emitResponse = function (body, files) {
  var response = new Response(this);
  this.response = response;
  response.redirects = this._redirectList;

  if (undefined !== body) {
    response.body = body;
  }

  response.files = files;

  if (this._endCalled) {
    response.pipe = function () {
      throw new Error("end() has already been called, so it's too late to start piping");
    };
  }

  this.emit('response', response);
  return response;
};

Request.prototype.end = function (fn) {
  this.request();
  debug('%s %s', this.method, this.url);

  if (this._endCalled) {
    throw new Error('.end() was called twice. This is not supported in superagent');
  }

  this._endCalled = true; // store callback

  this._callback = fn || noop;

  this._end();
};

Request.prototype._end = function () {
  var _this4 = this;

  if (this._aborted) return this.callback(new Error('The request has been aborted even before .end() was called'));
  var data = this._data;
  var req = this.req;
  var method = this.method;

  this._setTimeouts(); // body


  if (method !== 'HEAD' && !req._headerSent) {
    // serialize stuff
    if (typeof data !== 'string') {
      var contentType = req.getHeader('Content-Type'); // Parse out just the content type from the header (ignore the charset)

      if (contentType) contentType = contentType.split(';')[0];
      var serialize = this._serializer || exports.serialize[contentType];

      if (!serialize && isJSON(contentType)) {
        serialize = exports.serialize['application/json'];
      }

      if (serialize) data = serialize(data);
    } // content-length


    if (data && !req.getHeader('Content-Length')) {
      req.setHeader('Content-Length', Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data));
    }
  } // response
  // eslint-disable-next-line complexity


  req.once('response', function (res) {
    debug('%s %s -> %s', _this4.method, _this4.url, res.statusCode);

    if (_this4._responseTimeoutTimer) {
      clearTimeout(_this4._responseTimeoutTimer);
    }

    if (_this4.piped) {
      return;
    }

    var max = _this4._maxRedirects;
    var mime = utils.type(res.headers['content-type'] || '') || 'text/plain';
    var type = mime.split('/')[0];
    if (type) type = type.toLowerCase().trim();
    var multipart = type === 'multipart';
    var redirect = isRedirect(res.statusCode);
    var responseType = _this4._responseType;
    _this4.res = res; // redirect

    if (redirect && _this4._redirects++ !== max) {
      return _this4._redirect(res);
    }

    if (_this4.method === 'HEAD') {
      _this4.emit('end');

      _this4.callback(null, _this4._emitResponse());

      return;
    } // zlib support


    if (_this4._shouldUnzip(res)) {
      unzip(req, res);
    }

    var buffer = _this4._buffer;

    if (buffer === undefined && mime in exports.buffer) {
      buffer = Boolean(exports.buffer[mime]);
    }

    var parser = _this4._parser;

    if (undefined === buffer) {
      if (parser) {
        console.warn("A custom superagent parser has been set, but buffering strategy for the parser hasn't been configured. Call `req.buffer(true or false)` or set `superagent.buffer[mime] = true or false`");
        buffer = true;
      }
    }

    if (!parser) {
      if (responseType) {
        parser = exports.parse.image; // It's actually a generic Buffer

        buffer = true;
      } else if (multipart) {
        var form = new formidable.IncomingForm();
        parser = form.parse.bind(form);
        buffer = true;
      } else if (isImageOrVideo(mime)) {
        parser = exports.parse.image;
        buffer = true; // For backwards-compatibility buffering default is ad-hoc MIME-dependent
      } else if (exports.parse[mime]) {
        parser = exports.parse[mime];
      } else if (type === 'text') {
        parser = exports.parse.text;
        buffer = buffer !== false; // everyone wants their own white-labeled json
      } else if (isJSON(mime)) {
        parser = exports.parse['application/json'];
        buffer = buffer !== false;
      } else if (buffer) {
        parser = exports.parse.text;
      } else if (undefined === buffer) {
        parser = exports.parse.image; // It's actually a generic Buffer

        buffer = true;
      }
    } // by default only buffer text/*, json and messed up thing from hell


    if (undefined === buffer && isText(mime) || isJSON(mime)) {
      buffer = true;
    }

    _this4._resBuffered = buffer;
    var parserHandlesEnd = false;

    if (buffer) {
      // Protectiona against zip bombs and other nuisance
      var responseBytesLeft = _this4._maxResponseSize || 200000000;
      res.on('data', function (buf) {
        responseBytesLeft -= buf.byteLength || buf.length;

        if (responseBytesLeft < 0) {
          // This will propagate through error event
          var err = new Error('Maximum response size reached');
          err.code = 'ETOOLARGE'; // Parsers aren't required to observe error event,
          // so would incorrectly report success

          parserHandlesEnd = false; // Will emit error event

          res.destroy(err);
        }
      });
    }

    if (parser) {
      try {
        // Unbuffered parsers are supposed to emit response early,
        // which is weird BTW, because response.body won't be there.
        parserHandlesEnd = buffer;
        parser(res, function (err, obj, files) {
          if (_this4.timedout) {
            // Timeout has already handled all callbacks
            return;
          } // Intentional (non-timeout) abort is supposed to preserve partial response,
          // even if it doesn't parse.


          if (err && !_this4._aborted) {
            return _this4.callback(err);
          }

          if (parserHandlesEnd) {
            _this4.emit('end');

            _this4.callback(null, _this4._emitResponse(obj, files));
          }
        });
      } catch (err) {
        _this4.callback(err);

        return;
      }
    }

    _this4.res = res; // unbuffered

    if (!buffer) {
      debug('unbuffered %s %s', _this4.method, _this4.url);

      _this4.callback(null, _this4._emitResponse());

      if (multipart) return; // allow multipart to handle end event

      res.once('end', function () {
        debug('end %s %s', _this4.method, _this4.url);

        _this4.emit('end');
      });
      return;
    } // terminating events


    res.once('error', function (err) {
      parserHandlesEnd = false;

      _this4.callback(err, null);
    });
    if (!parserHandlesEnd) res.once('end', function () {
      debug('end %s %s', _this4.method, _this4.url); // TODO: unless buffering emit earlier to stream

      _this4.emit('end');

      _this4.callback(null, _this4._emitResponse());
    });
  });
  this.emit('request', this);

  var getProgressMonitor = function getProgressMonitor() {
    var lengthComputable = true;
    var total = req.getHeader('Content-Length');
    var loaded = 0;
    var progress = new Stream.Transform();

    progress._transform = function (chunk, encoding, cb) {
      loaded += chunk.length;

      _this4.emit('progress', {
        direction: 'upload',
        lengthComputable: lengthComputable,
        loaded: loaded,
        total: total
      });

      cb(null, chunk);
    };

    return progress;
  };

  var bufferToChunks = function bufferToChunks(buffer) {
    var chunkSize = 16 * 1024; // default highWaterMark value

    var chunking = new Stream.Readable();
    var totalLength = buffer.length;
    var remainder = totalLength % chunkSize;
    var cutoff = totalLength - remainder;

    for (var i = 0; i < cutoff; i += chunkSize) {
      var chunk = buffer.slice(i, i + chunkSize);
      chunking.push(chunk);
    }

    if (remainder > 0) {
      var remainderBuffer = buffer.slice(-remainder);
      chunking.push(remainderBuffer);
    }

    chunking.push(null); // no more data

    return chunking;
  }; // if a FormData instance got created, then we send that as the request body


  var formData = this._formData;

  if (formData) {
    // set headers
    var headers = formData.getHeaders();

    for (var i in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, i)) {
        debug('setting FormData header: "%s: %s"', i, headers[i]);
        req.setHeader(i, headers[i]);
      }
    } // attempt to get "Content-Length" header


    formData.getLength(function (err, length) {
      // TODO: Add chunked encoding when no length (if err)
      if (err) debug('formData.getLength had error', err, length);
      debug('got FormData Content-Length: %s', length);

      if (typeof length === 'number') {
        req.setHeader('Content-Length', length);
      }

      formData.pipe(getProgressMonitor()).pipe(req);
    });
  } else if (Buffer.isBuffer(data)) {
    bufferToChunks(data).pipe(getProgressMonitor()).pipe(req);
  } else {
    req.end(data);
  }
}; // Check whether response has a non-0-sized gzip-encoded body


Request.prototype._shouldUnzip = function (res) {
  if (res.statusCode === 204 || res.statusCode === 304) {
    // These aren't supposed to have any body
    return false;
  } // header content is a string, and distinction between 0 and no information is crucial


  if (res.headers['content-length'] === '0') {
    // We know that the body is empty (unfortunately, this check does not cover chunked encoding)
    return false;
  } // console.log(res);


  return /^\s*(?:deflate|gzip)\s*$/.test(res.headers['content-encoding']);
};
/**
 * Overrides DNS for selected hostnames. Takes object mapping hostnames to IP addresses.
 *
 * When making a request to a URL with a hostname exactly matching a key in the object,
 * use the given IP address to connect, instead of using DNS to resolve the hostname.
 *
 * A special host `*` matches every hostname (keep redirects in mind!)
 *
 *      request.connect({
 *        'test.example.com': '127.0.0.1',
 *        'ipv6.example.com': '::1',
 *      })
 */


Request.prototype.connect = function (connectOverride) {
  if (typeof connectOverride === 'string') {
    this._connectOverride = {
      '*': connectOverride
    };
  } else if (_typeof(connectOverride) === 'object') {
    this._connectOverride = connectOverride;
  } else {
    this._connectOverride = undefined;
  }

  return this;
};

Request.prototype.trustLocalhost = function (toggle) {
  this._trustLocalhost = toggle === undefined ? true : toggle;
  return this;
}; // generate HTTP verb methods


if (!methods.includes('del')) {
  // create a copy so we don't cause conflicts with
  // other packages using the methods package and
  // npm 3.x
  methods = methods.slice(0);
  methods.push('del');
}

methods.forEach(function (method) {
  var name = method;
  method = method === 'del' ? 'delete' : method;
  method = method.toUpperCase();

  request[name] = function (url, data, fn) {
    var req = request(method, url);

    if (typeof data === 'function') {
      fn = data;
      data = null;
    }

    if (data) {
      if (method === 'GET' || method === 'HEAD') {
        req.query(data);
      } else {
        req.send(data);
      }
    }

    if (fn) req.end(fn);
    return req;
  };
});
/**
 * Check if `mime` is text and should be buffered.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api public
 */

function isText(mime) {
  var parts = mime.split('/');
  var type = parts[0];
  if (type) type = type.toLowerCase().trim();
  var subtype = parts[1];
  if (subtype) subtype = subtype.toLowerCase().trim();
  return type === 'text' || subtype === 'x-www-form-urlencoded';
}

function isImageOrVideo(mime) {
  var type = mime.split('/')[0];
  if (type) type = type.toLowerCase().trim();
  return type === 'image' || type === 'video';
}
/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */


function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[/+]json($|[^-\w])/i.test(mime);
}
/**
 * Check if we should follow the redirect `code`.
 *
 * @param {Number} code
 * @return {Boolean}
 * @api private
 */


function isRedirect(code) {
  return [301, 302, 303, 305, 307, 308].includes(code);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlL2luZGV4LmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJwYXJzZSIsImZvcm1hdCIsInJlc29sdmUiLCJTdHJlYW0iLCJodHRwcyIsImh0dHAiLCJmcyIsInpsaWIiLCJ1dGlsIiwicXMiLCJtaW1lIiwibWV0aG9kcyIsIkZvcm1EYXRhIiwiZm9ybWlkYWJsZSIsImRlYnVnIiwiQ29va2llSmFyIiwic2VtdmVyIiwic2FmZVN0cmluZ2lmeSIsInV0aWxzIiwiUmVxdWVzdEJhc2UiLCJ1bnppcCIsIlJlc3BvbnNlIiwiaHR0cDIiLCJndGUiLCJwcm9jZXNzIiwidmVyc2lvbiIsInJlcXVlc3QiLCJtZXRob2QiLCJ1cmwiLCJleHBvcnRzIiwiUmVxdWVzdCIsImVuZCIsImFyZ3VtZW50cyIsImxlbmd0aCIsIm1vZHVsZSIsImFnZW50Iiwibm9vcCIsImRlZmluZSIsInByb3RvY29scyIsInNlcmlhbGl6ZSIsInN0cmluZ2lmeSIsImJ1ZmZlciIsIl9pbml0SGVhZGVycyIsInJlcSIsIl9oZWFkZXIiLCJoZWFkZXIiLCJjYWxsIiwiX2VuYWJsZUh0dHAyIiwiQm9vbGVhbiIsImVudiIsIkhUVFAyX1RFU1QiLCJfYWdlbnQiLCJfZm9ybURhdGEiLCJ3cml0YWJsZSIsIl9yZWRpcmVjdHMiLCJyZWRpcmVjdHMiLCJjb29raWVzIiwiX3F1ZXJ5IiwicXNSYXciLCJfcmVkaXJlY3RMaXN0IiwiX3N0cmVhbVJlcXVlc3QiLCJvbmNlIiwiY2xlYXJUaW1lb3V0IiwiYmluZCIsImluaGVyaXRzIiwicHJvdG90eXBlIiwiYm9vbCIsInVuZGVmaW5lZCIsIkVycm9yIiwiYXR0YWNoIiwiZmllbGQiLCJmaWxlIiwib3B0aW9ucyIsIl9kYXRhIiwibyIsImZpbGVuYW1lIiwiY3JlYXRlUmVhZFN0cmVhbSIsInBhdGgiLCJfZ2V0Rm9ybURhdGEiLCJhcHBlbmQiLCJvbiIsImVyciIsImNhbGxlZCIsImNhbGxiYWNrIiwiYWJvcnQiLCJ0eXBlIiwic2V0IiwiaW5jbHVkZXMiLCJnZXRUeXBlIiwiYWNjZXB0IiwicXVlcnkiLCJ2YWwiLCJwdXNoIiwiT2JqZWN0IiwiYXNzaWduIiwid3JpdGUiLCJkYXRhIiwiZW5jb2RpbmciLCJwaXBlIiwic3RyZWFtIiwicGlwZWQiLCJfcGlwZUNvbnRpbnVlIiwicmVzIiwiaXNSZWRpcmVjdCIsInN0YXR1c0NvZGUiLCJfbWF4UmVkaXJlY3RzIiwiX3JlZGlyZWN0IiwiX2VtaXRSZXNwb25zZSIsIl9hYm9ydGVkIiwiX3Nob3VsZFVuemlwIiwidW56aXBPYmoiLCJjcmVhdGVVbnppcCIsImNvZGUiLCJlbWl0IiwiX2J1ZmZlciIsImhlYWRlcnMiLCJsb2NhdGlvbiIsInJlc3VtZSIsImdldEhlYWRlcnMiLCJfaGVhZGVycyIsImNoYW5nZXNPcmlnaW4iLCJob3N0IiwiY2xlYW5IZWFkZXIiLCJfZW5kQ2FsbGVkIiwiX2NhbGxiYWNrIiwiYXV0aCIsInVzZXIiLCJwYXNzIiwiZW5jb2RlciIsInN0cmluZyIsIkJ1ZmZlciIsImZyb20iLCJ0b1N0cmluZyIsIl9hdXRoIiwiY2EiLCJjZXJ0IiwiX2NhIiwia2V5IiwiX2tleSIsInBmeCIsImlzQnVmZmVyIiwiX3BmeCIsIl9wYXNzcGhyYXNlIiwicGFzc3BocmFzZSIsIl9jZXJ0IiwiZGlzYWJsZVRMU0NlcnRzIiwiX2Rpc2FibGVUTFNDZXJ0cyIsImluZGljZXMiLCJzdHJpY3ROdWxsSGFuZGxpbmciLCJfZmluYWxpemVRdWVyeVN0cmluZyIsInJldHJpZXMiLCJfcmV0cmllcyIsInF1ZXJ5U3RyaW5nQmFja3RpY2tzIiwicXVlcnlTdGFydEluZGV4IiwiaW5kZXhPZiIsInF1ZXJ5U3RyaW5nIiwic2xpY2UiLCJtYXRjaCIsImkiLCJyZXBsYWNlIiwic2VhcmNoIiwicGF0aG5hbWUiLCJ0ZXN0IiwicHJvdG9jb2wiLCJzcGxpdCIsInVuaXhQYXJ0cyIsInNvY2tldFBhdGgiLCJfY29ubmVjdE92ZXJyaWRlIiwiaG9zdG5hbWUiLCJuZXdIb3N0IiwibmV3UG9ydCIsInBvcnQiLCJyZWplY3RVbmF1dGhvcml6ZWQiLCJOT0RFX1RMU19SRUpFQ1RfVU5BVVRIT1JJWkVEIiwic2VydmVybmFtZSIsIl90cnVzdExvY2FsaG9zdCIsIm1vZCIsInNldFByb3RvY29sIiwic2V0Tm9EZWxheSIsInNldEhlYWRlciIsInJlc3BvbnNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImhhc093blByb3BlcnR5IiwidG1wSmFyIiwic2V0Q29va2llcyIsImNvb2tpZSIsImdldENvb2tpZXMiLCJDb29raWVBY2Nlc3NJbmZvIiwiQWxsIiwidG9WYWx1ZVN0cmluZyIsIl9zaG91bGRSZXRyeSIsIl9yZXRyeSIsImZuIiwiY29uc29sZSIsIndhcm4iLCJfaXNSZXNwb25zZU9LIiwibXNnIiwiU1RBVFVTX0NPREVTIiwic3RhdHVzIiwiZXJyXyIsIl9tYXhSZXRyaWVzIiwibGlzdGVuZXJzIiwiX2lzSG9zdCIsIm9iaiIsImJvZHkiLCJmaWxlcyIsIl9lbmQiLCJfc2V0VGltZW91dHMiLCJfaGVhZGVyU2VudCIsImNvbnRlbnRUeXBlIiwiZ2V0SGVhZGVyIiwiX3NlcmlhbGl6ZXIiLCJpc0pTT04iLCJieXRlTGVuZ3RoIiwiX3Jlc3BvbnNlVGltZW91dFRpbWVyIiwibWF4IiwidG9Mb3dlckNhc2UiLCJ0cmltIiwibXVsdGlwYXJ0IiwicmVkaXJlY3QiLCJyZXNwb25zZVR5cGUiLCJfcmVzcG9uc2VUeXBlIiwicGFyc2VyIiwiX3BhcnNlciIsImltYWdlIiwiZm9ybSIsIkluY29taW5nRm9ybSIsImlzSW1hZ2VPclZpZGVvIiwidGV4dCIsImlzVGV4dCIsIl9yZXNCdWZmZXJlZCIsInBhcnNlckhhbmRsZXNFbmQiLCJyZXNwb25zZUJ5dGVzTGVmdCIsIl9tYXhSZXNwb25zZVNpemUiLCJidWYiLCJkZXN0cm95IiwidGltZWRvdXQiLCJnZXRQcm9ncmVzc01vbml0b3IiLCJsZW5ndGhDb21wdXRhYmxlIiwidG90YWwiLCJsb2FkZWQiLCJwcm9ncmVzcyIsIlRyYW5zZm9ybSIsIl90cmFuc2Zvcm0iLCJjaHVuayIsImNiIiwiZGlyZWN0aW9uIiwiYnVmZmVyVG9DaHVua3MiLCJjaHVua1NpemUiLCJjaHVua2luZyIsIlJlYWRhYmxlIiwidG90YWxMZW5ndGgiLCJyZW1haW5kZXIiLCJjdXRvZmYiLCJyZW1haW5kZXJCdWZmZXIiLCJmb3JtRGF0YSIsImdldExlbmd0aCIsImNvbm5lY3QiLCJjb25uZWN0T3ZlcnJpZGUiLCJ0cnVzdExvY2FsaG9zdCIsInRvZ2dsZSIsImZvckVhY2giLCJuYW1lIiwidG9VcHBlckNhc2UiLCJzZW5kIiwicGFydHMiLCJzdWJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7OztBQUlBO2VBQ21DQSxPQUFPLENBQUMsS0FBRCxDO0lBQWxDQyxLLFlBQUFBLEs7SUFBT0MsTSxZQUFBQSxNO0lBQVFDLE8sWUFBQUEsTzs7QUFDdkIsSUFBTUMsTUFBTSxHQUFHSixPQUFPLENBQUMsUUFBRCxDQUF0Qjs7QUFDQSxJQUFNSyxLQUFLLEdBQUdMLE9BQU8sQ0FBQyxPQUFELENBQXJCOztBQUNBLElBQU1NLElBQUksR0FBR04sT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTU8sRUFBRSxHQUFHUCxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNUSxJQUFJLEdBQUdSLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLElBQU1TLElBQUksR0FBR1QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTVUsRUFBRSxHQUFHVixPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNVyxJQUFJLEdBQUdYLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLElBQUlZLE9BQU8sR0FBR1osT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0EsSUFBTWEsUUFBUSxHQUFHYixPQUFPLENBQUMsV0FBRCxDQUF4Qjs7QUFDQSxJQUFNYyxVQUFVLEdBQUdkLE9BQU8sQ0FBQyxZQUFELENBQTFCOztBQUNBLElBQU1lLEtBQUssR0FBR2YsT0FBTyxDQUFDLE9BQUQsQ0FBUCxDQUFpQixZ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R0FBR0EsSUFBSSxDQUFDb0ksV0FBTCxHQUFtQkMsSUFBbkIsRUFBUDtBQUNWLE1BQUlpRCxPQUFPLEdBQUdELEtBQUssQ0FBQyxDQUFELENBQW5CO0FBQ0EsTUFBSUMsT0FBSixFQUFhQSxPQUFPLEdBQUdBLE9BQU8sQ0FBQ2xELFdBQVIsR0FBc0JDLElBQXRCLEVBQVY7QUFFYixTQUFPckksSUFBSSxLQUFLLE1BQVQsSUFBbUJzTCxPQUFPLEtBQUssdUJBQXRDO0FBQ0Q7O0FBRUQsU0FBU3ZDLGNBQVQsQ0FBd0IxTixJQUF4QixFQUE4QjtBQUM1QixNQUFJMkUsSUFBSSxHQUFHM0UsSUFBSSxDQUFDMEosS0FBTCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsQ0FBWDtBQUNBLE1BQUkvRSxJQUFKLEVBQVVBLElBQUksR0FBR0EsSUFBSSxDQUFDb0ksV0FBTCxHQUFtQkMsSUFBbkIsRUFBUDtBQUVWLFNBQU9ySSxJQUFJLEtBQUssT0FBVCxJQUFvQkEsSUFBSSxLQUFLLE9BQXBDO0FBQ0Q7QUFFRDs7Ozs7Ozs7O0FBUUEsU0FBU2dJLE1BQVQsQ0FBZ0IzTSxJQUFoQixFQUFzQjtBQUNwQjtBQUNBO0FBQ0EsU0FBTyxzQkFBc0J3SixJQUF0QixDQUEyQnhKLElBQTNCLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7QUFRQSxTQUFTNkYsVUFBVCxDQUFvQlMsSUFBcEIsRUFBMEI7QUFDeEIsU0FBTyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQnpCLFFBQS9CLENBQXdDeUIsSUFBeEMsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLWRlcHJlY2F0ZWQtYXBpXG5jb25zdCB7IHBhcnNlLCBmb3JtYXQsIHJlc29sdmUgfSA9IHJlcXVpcmUoJ3VybCcpO1xuY29uc3QgU3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5jb25zdCBodHRwcyA9IHJlcXVpcmUoJ2h0dHBzJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgemxpYiA9IHJlcXVpcmUoJ3psaWInKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCBxcyA9IHJlcXVpcmUoJ3FzJyk7XG5jb25zdCBtaW1lID0gcmVxdWlyZSgnbWltZScpO1xubGV0IG1ldGhvZHMgPSByZXF1aXJlKCdtZXRob2RzJyk7XG5jb25zdCBGb3JtRGF0YSA9IHJlcXVpcmUoJ2Zvcm0tZGF0YScpO1xuY29uc3QgZm9ybWlkYWJsZSA9IHJlcXVpcmUoJ2Zvcm1pZGFibGUnKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc3VwZXJhZ2VudCcpO1xuY29uc3QgQ29va2llSmFyID0gcmVxdWlyZSgnY29va2llamFyJyk7XG5jb25zdCBzZW12ZXIgPSByZXF1aXJlKCdzZW12ZXInKTtcbmNvbnN0IHNhZmVTdHJpbmdpZnkgPSByZXF1aXJlKCdmYXN0LXNhZmUtc3RyaW5naWZ5Jyk7XG5cbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IFJlcXVlc3RCYXNlID0gcmVxdWlyZSgnLi4vcmVxdWVzdC1iYXNlJyk7XG5jb25zdCB7IHVuemlwIH0gPSByZXF1aXJlKCcuL3VuemlwJyk7XG5jb25zdCBSZXNwb25zZSA9IHJlcXVpcmUoJy4vcmVzcG9uc2UnKTtcblxubGV0IGh0dHAyO1xuXG5pZiAoc2VtdmVyLmd0ZShwcm9jZXNzLnZlcnNpb24sICd2MTAuMTAuMCcpKSBodHRwMiA9IHJlcXVpcmUoJy4vaHR0cDJ3cmFwcGVyJyk7XG5cbmZ1bmN0aW9uIHJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKHR5cGVvZiB1cmwgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKS5lbmQodXJsKTtcbiAgfVxuXG4gIC8vIHVybCBmaXJzdFxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QobWV0aG9kLCB1cmwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3Q7XG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogRXhwb3NlIGBSZXF1ZXN0YC5cbiAqL1xuXG5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4vKipcbiAqIEV4cG9zZSB0aGUgYWdlbnQgZnVuY3Rpb25cbiAqL1xuXG5leHBvcnRzLmFnZW50ID0gcmVxdWlyZSgnLi9hZ2VudCcpO1xuXG4vKipcbiAqIE5vb3AuXG4gKi9cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZWAuXG4gKi9cblxuZXhwb3J0cy5SZXNwb25zZSA9IFJlc3BvbnNlO1xuXG4vKipcbiAqIERlZmluZSBcImZvcm1cIiBtaW1lIHR5cGUuXG4gKi9cblxubWltZS5kZWZpbmUoXG4gIHtcbiAgICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogWydmb3JtJywgJ3VybGVuY29kZWQnLCAnZm9ybS1kYXRhJ11cbiAgfSxcbiAgdHJ1ZVxuKTtcblxuLyoqXG4gKiBQcm90b2NvbCBtYXAuXG4gKi9cblxuZXhwb3J0cy5wcm90b2NvbHMgPSB7XG4gICdodHRwOic6IGh0dHAsXG4gICdodHRwczonOiBodHRwcyxcbiAgJ2h0dHAyOic6IGh0dHAyXG59O1xuXG4vKipcbiAqIERlZmF1bHQgc2VyaWFsaXphdGlvbiBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQuc2VyaWFsaXplWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKG9iail7XG4gKiAgICAgICByZXR1cm4gJ2dlbmVyYXRlZCB4bWwgaGVyZSc7XG4gKiAgICAgfTtcbiAqXG4gKi9cblxuZXhwb3J0cy5zZXJpYWxpemUgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBxcy5zdHJpbmdpZnksXG4gICdhcHBsaWNhdGlvbi9qc29uJzogc2FmZVN0cmluZ2lmeVxufTtcblxuLyoqXG4gKiBEZWZhdWx0IHBhcnNlcnMuXG4gKlxuICogICAgIHN1cGVyYWdlbnQucGFyc2VbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ocmVzLCBmbil7XG4gKiAgICAgICBmbihudWxsLCByZXMpO1xuICogICAgIH07XG4gKlxuICovXG5cbmV4cG9ydHMucGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlcnMnKTtcblxuLyoqXG4gKiBEZWZhdWx0IGJ1ZmZlcmluZyBtYXAuIENhbiBiZSB1c2VkIHRvIHNldCBjZXJ0YWluXG4gKiByZXNwb25zZSB0eXBlcyB0byBidWZmZXIvbm90IGJ1ZmZlci5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5idWZmZXJbJ2FwcGxpY2F0aW9uL3htbCddID0gdHJ1ZTtcbiAqL1xuZXhwb3J0cy5idWZmZXIgPSB7fTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGludGVybmFsIGhlYWRlciB0cmFja2luZyBwcm9wZXJ0aWVzIG9uIGEgcmVxdWVzdCBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVxIHRoZSBpbnN0YW5jZVxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9pbml0SGVhZGVycyhyZXEpIHtcbiAgcmVxLl9oZWFkZXIgPSB7XG4gICAgLy8gY29lcmNlcyBoZWFkZXIgbmFtZXMgdG8gbG93ZXJjYXNlXG4gIH07XG4gIHJlcS5oZWFkZXIgPSB7XG4gICAgLy8gcHJlc2VydmVzIGhlYWRlciBuYW1lIGNhc2VcbiAgfTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSB1cmxcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdChtZXRob2QsIHVybCkge1xuICBTdHJlYW0uY2FsbCh0aGlzKTtcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB1cmwgPSBmb3JtYXQodXJsKTtcbiAgdGhpcy5fZW5hYmxlSHR0cDIgPSBCb29sZWFuKHByb2Nlc3MuZW52LkhUVFAyX1RFU1QpOyAvLyBpbnRlcm5hbCBvbmx5XG4gIHRoaXMuX2FnZW50ID0gZmFsc2U7XG4gIHRoaXMuX2Zvcm1EYXRhID0gbnVsbDtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICBfaW5pdEhlYWRlcnModGhpcyk7XG4gIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICB0aGlzLl9yZWRpcmVjdHMgPSAwO1xuICB0aGlzLnJlZGlyZWN0cyhtZXRob2QgPT09ICdIRUFEJyA/IDAgOiA1KTtcbiAgdGhpcy5jb29raWVzID0gJyc7XG4gIHRoaXMucXMgPSB7fTtcbiAgdGhpcy5fcXVlcnkgPSBbXTtcbiAgdGhpcy5xc1JhdyA9IHRoaXMuX3F1ZXJ5OyAvLyBVbnVzZWQsIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBvbmx5XG4gIHRoaXMuX3JlZGlyZWN0TGlzdCA9IFtdO1xuICB0aGlzLl9zdHJlYW1SZXF1ZXN0ID0gZmFsc2U7XG4gIHRoaXMub25jZSgnZW5kJywgdGhpcy5jbGVhclRpbWVvdXQuYmluZCh0aGlzKSk7XG59XG5cbi8qKlxuICogSW5oZXJpdCBmcm9tIGBTdHJlYW1gICh3aGljaCBpbmhlcml0cyBmcm9tIGBFdmVudEVtaXR0ZXJgKS5cbiAqIE1peGluIGBSZXF1ZXN0QmFzZWAuXG4gKi9cbnV0aWwuaW5oZXJpdHMoUmVxdWVzdCwgU3RyZWFtKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXG5SZXF1ZXN0QmFzZShSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogRW5hYmxlIG9yIERpc2FibGUgaHR0cDIuXG4gKlxuICogRW5hYmxlIGh0dHAyLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3QvJylcbiAqICAgLmh0dHAyKClcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogcmVxdWVzdC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3QvJylcbiAqICAgLmh0dHAyKHRydWUpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogRGlzYWJsZSBodHRwMi5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QgPSByZXF1ZXN0Lmh0dHAyKCk7XG4gKiByZXF1ZXN0LmdldCgnaHR0cDovL2xvY2FsaG9zdC8nKVxuICogICAuaHR0cDIoZmFsc2UpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBlbmFibGVcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5odHRwMiA9IGZ1bmN0aW9uIChib29sKSB7XG4gIGlmIChleHBvcnRzLnByb3RvY29sc1snaHR0cDI6J10gPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdzdXBlcmFnZW50OiB0aGlzIHZlcnNpb24gb2YgTm9kZS5qcyBkb2VzIG5vdCBzdXBwb3J0IGh0dHAyJ1xuICAgICk7XG4gIH1cblxuICB0aGlzLl9lbmFibGVIdHRwMiA9IGJvb2wgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBib29sO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUXVldWUgdGhlIGdpdmVuIGBmaWxlYCBhcyBhbiBhdHRhY2htZW50IHRvIHRoZSBzcGVjaWZpZWQgYGZpZWxkYCxcbiAqIHdpdGggb3B0aW9uYWwgYG9wdGlvbnNgIChvciBmaWxlbmFtZSkuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3QvdXBsb2FkJylcbiAqICAgLmF0dGFjaCgnZmllbGQnLCBCdWZmZXIuZnJvbSgnPGI+SGVsbG8gd29ybGQ8L2I+JyksICdoZWxsby5odG1sJylcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBBIGZpbGVuYW1lIG1heSBhbHNvIGJlIHVzZWQ6XG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3QvdXBsb2FkJylcbiAqICAgLmF0dGFjaCgnZmlsZXMnLCAnaW1hZ2UuanBnJylcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7U3RyaW5nfGZzLlJlYWRTdHJlYW18QnVmZmVyfSBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiAoZmllbGQsIGZpbGUsIG9wdGlvbnMpIHtcbiAgaWYgKGZpbGUpIHtcbiAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3VwZXJhZ2VudCBjYW4ndCBtaXggLnNlbmQoKSBhbmQgLmF0dGFjaCgpXCIpO1xuICAgIH1cblxuICAgIGxldCBvID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBvID0geyBmaWxlbmFtZTogb3B0aW9ucyB9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICghby5maWxlbmFtZSkgby5maWxlbmFtZSA9IGZpbGU7XG4gICAgICBkZWJ1ZygnY3JlYXRpbmcgYGZzLlJlYWRTdHJlYW1gIGluc3RhbmNlIGZvciBmaWxlOiAlcycsIGZpbGUpO1xuICAgICAgZmlsZSA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0oZmlsZSk7XG4gICAgfSBlbHNlIGlmICghby5maWxlbmFtZSAmJiBmaWxlLnBhdGgpIHtcbiAgICAgIG8uZmlsZW5hbWUgPSBmaWxlLnBhdGg7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQoZmllbGQsIGZpbGUsIG8pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fZ2V0Rm9ybURhdGEgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHtcbiAgICB0aGlzLl9mb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIHRoaXMuX2Zvcm1EYXRhLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgIGRlYnVnKCdGb3JtRGF0YSBlcnJvcicsIGVycik7XG4gICAgICBpZiAodGhpcy5jYWxsZWQpIHtcbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgaGFzIGFscmVhZHkgZmluaXNoZWQgYW5kIHRoZSBjYWxsYmFjayB3YXMgY2FsbGVkLlxuICAgICAgICAvLyBTaWxlbnRseSBpZ25vcmUgdGhlIGVycm9yLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2FsbGJhY2soZXJyKTtcbiAgICAgIHRoaXMuYWJvcnQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9mb3JtRGF0YTtcbn07XG5cbi8qKlxuICogR2V0cy9zZXRzIHRoZSBgQWdlbnRgIHRvIHVzZSBmb3IgdGhpcyBIVFRQIHJlcXVlc3QuIFRoZSBkZWZhdWx0IChpZiB0aGlzXG4gKiBmdW5jdGlvbiBpcyBub3QgY2FsbGVkKSBpcyB0byBvcHQgb3V0IG9mIGNvbm5lY3Rpb24gcG9vbGluZyAoYGFnZW50OiBmYWxzZWApLlxuICpcbiAqIEBwYXJhbSB7aHR0cC5BZ2VudH0gYWdlbnRcbiAqIEByZXR1cm4ge2h0dHAuQWdlbnR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFnZW50ID0gZnVuY3Rpb24gKGFnZW50KSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdGhpcy5fYWdlbnQ7XG4gIHRoaXMuX2FnZW50ID0gYWdlbnQ7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgX0NvbnRlbnQtVHlwZV8gcmVzcG9uc2UgaGVhZGVyIHBhc3NlZCB0aHJvdWdoIGBtaW1lLmdldFR5cGUoKWAuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCd4bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ2pzb24nKVxuICogICAgICAgIC5zZW5kKGpzb25zdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2VuZChqc29uc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHJldHVybiB0aGlzLnNldChcbiAgICAnQ29udGVudC1UeXBlJyxcbiAgICB0eXBlLmluY2x1ZGVzKCcvJykgPyB0eXBlIDogbWltZS5nZXRUeXBlKHR5cGUpXG4gICk7XG59O1xuXG4vKipcbiAqIFNldCBfQWNjZXB0XyByZXNwb25zZSBoZWFkZXIgcGFzc2VkIHRocm91Z2ggYG1pbWUuZ2V0VHlwZSgpYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMuanNvbiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjY2VwdFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHJldHVybiB0aGlzLnNldCgnQWNjZXB0JywgdHlwZS5pbmNsdWRlcygnLycpID8gdHlwZSA6IG1pbWUuZ2V0VHlwZSh0eXBlKSk7XG59O1xuXG4vKipcbiAqIEFkZCBxdWVyeS1zdHJpbmcgYHZhbGAuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICByZXF1ZXN0LmdldCgnL3Nob2VzJylcbiAqICAgICAucXVlcnkoJ3NpemU9MTAnKVxuICogICAgIC5xdWVyeSh7IGNvbG9yOiAnYmx1ZScgfSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB0aGlzLl9xdWVyeS5wdXNoKHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnFzLCB2YWwpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlIHJhdyBgZGF0YWAgLyBgZW5jb2RpbmdgIHRvIHRoZSBzb2NrZXQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ8U3RyaW5nfSBkYXRhXG4gKiBAcGFyYW0ge1N0cmluZ30gZW5jb2RpbmdcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGRhdGEsIGVuY29kaW5nKSB7XG4gIGNvbnN0IHJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICBpZiAoIXRoaXMuX3N0cmVhbVJlcXVlc3QpIHtcbiAgICB0aGlzLl9zdHJlYW1SZXF1ZXN0ID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiByZXEud3JpdGUoZGF0YSwgZW5jb2RpbmcpO1xufTtcblxuLyoqXG4gKiBQaXBlIHRoZSByZXF1ZXN0IGJvZHkgdG8gYHN0cmVhbWAuXG4gKlxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1N0cmVhbX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIChzdHJlYW0sIG9wdGlvbnMpIHtcbiAgdGhpcy5waXBlZCA9IHRydWU7IC8vIEhBQ0suLi5cbiAgdGhpcy5idWZmZXIoZmFsc2UpO1xuICB0aGlzLmVuZCgpO1xuICByZXR1cm4gdGhpcy5fcGlwZUNvbnRpbnVlKHN0cmVhbSwgb3B0aW9ucyk7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fcGlwZUNvbnRpbnVlID0gZnVuY3Rpb24gKHN0cmVhbSwgb3B0aW9ucykge1xuICB0aGlzLnJlcS5vbmNlKCdyZXNwb25zZScsIChyZXMpID0+IHtcbiAgICAvLyByZWRpcmVjdFxuICAgIGlmIChcbiAgICAgIGlzUmVkaXJlY3QocmVzLnN0YXR1c0NvZGUpICYmXG4gICAgICB0aGlzLl9yZWRpcmVjdHMrKyAhPT0gdGhpcy5fbWF4UmVkaXJlY3RzXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVkaXJlY3QocmVzKSA9PT0gdGhpc1xuICAgICAgICA/IHRoaXMuX3BpcGVDb250aW51ZShzdHJlYW0sIG9wdGlvbnMpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRoaXMucmVzID0gcmVzO1xuICAgIHRoaXMuX2VtaXRSZXNwb25zZSgpO1xuICAgIGlmICh0aGlzLl9hYm9ydGVkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5fc2hvdWxkVW56aXAocmVzKSkge1xuICAgICAgY29uc3QgdW56aXBPYmogPSB6bGliLmNyZWF0ZVVuemlwKCk7XG4gICAgICB1bnppcE9iai5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIgJiYgZXJyLmNvZGUgPT09ICdaX0JVRl9FUlJPUicpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIGVuZCBvZiBmaWxlIGlzIGlnbm9yZWQgYnkgYnJvd3NlcnMgYW5kIGN1cmxcbiAgICAgICAgICBzdHJlYW0uZW1pdCgnZW5kJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgIH0pO1xuICAgICAgcmVzLnBpcGUodW56aXBPYmopLnBpcGUoc3RyZWFtLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLnBpcGUoc3RyZWFtLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXMub25jZSgnZW5kJywgKCkgPT4ge1xuICAgICAgdGhpcy5lbWl0KCdlbmQnKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBzdHJlYW07XG59O1xuXG4vKipcbiAqIEVuYWJsZSAvIGRpc2FibGUgYnVmZmVyaW5nLlxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFt2YWxdXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYnVmZmVyID0gZnVuY3Rpb24gKHZhbCkge1xuICB0aGlzLl9idWZmZXIgPSB2YWwgIT09IGZhbHNlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVkaXJlY3QgdG8gYHVybFxuICpcbiAqIEBwYXJhbSB7SW5jb21pbmdNZXNzYWdlfSByZXNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuX3JlZGlyZWN0ID0gZnVuY3Rpb24gKHJlcykge1xuICBsZXQgdXJsID0gcmVzLmhlYWRlcnMubG9jYXRpb247XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2sobmV3IEVycm9yKCdObyBsb2NhdGlvbiBoZWFkZXIgZm9yIHJlZGlyZWN0JyksIHJlcyk7XG4gIH1cblxuICBkZWJ1ZygncmVkaXJlY3QgJXMgLT4gJXMnLCB0aGlzLnVybCwgdXJsKTtcblxuICAvLyBsb2NhdGlvblxuICB1cmwgPSByZXNvbHZlKHRoaXMudXJsLCB1cmwpO1xuXG4gIC8vIGVuc3VyZSB0aGUgcmVzcG9uc2UgaXMgYmVpbmcgY29uc3VtZWRcbiAgLy8gdGhpcyBpcyByZXF1aXJlZCBmb3IgTm9kZSB2MC4xMCtcbiAgcmVzLnJlc3VtZSgpO1xuXG4gIGxldCBoZWFkZXJzID0gdGhpcy5yZXEuZ2V0SGVhZGVycyA/IHRoaXMucmVxLmdldEhlYWRlcnMoKSA6IHRoaXMucmVxLl9oZWFkZXJzO1xuXG4gIGNvbnN0IGNoYW5nZXNPcmlnaW4gPSBwYXJzZSh1cmwpLmhvc3QgIT09IHBhcnNlKHRoaXMudXJsKS5ob3N0O1xuXG4gIC8vIGltcGxlbWVudGF0aW9uIG9mIDMwMiBmb2xsb3dpbmcgZGVmYWN0byBzdGFuZGFyZFxuICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDMwMSB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMzAyKSB7XG4gICAgLy8gc3RyaXAgQ29udGVudC0qIHJlbGF0ZWQgZmllbGRzXG4gICAgLy8gaW4gY2FzZSBvZiBQT1NUIGV0Y1xuICAgIGhlYWRlcnMgPSB1dGlscy5jbGVhbkhlYWRlcihoZWFkZXJzLCBjaGFuZ2VzT3JpZ2luKTtcblxuICAgIC8vIGZvcmNlIEdFVFxuICAgIHRoaXMubWV0aG9kID0gdGhpcy5tZXRob2QgPT09ICdIRUFEJyA/ICdIRUFEJyA6ICdHRVQnO1xuXG4gICAgLy8gY2xlYXIgZGF0YVxuICAgIHRoaXMuX2RhdGEgPSBudWxsO1xuICB9XG5cbiAgLy8gMzAzIGlzIGFsd2F5cyBHRVRcbiAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAzMDMpIHtcbiAgICAvLyBzdHJpcCBDb250ZW50LSogcmVsYXRlZCBmaWVsZHNcbiAgICAvLyBpbiBjYXNlIG9mIFBPU1QgZXRjXG4gICAgaGVhZGVycyA9IHV0aWxzLmNsZWFuSGVhZGVyKGhlYWRlcnMsIGNoYW5nZXNPcmlnaW4pO1xuXG4gICAgLy8gZm9yY2UgbWV0aG9kXG4gICAgdGhpcy5tZXRob2QgPSAnR0VUJztcblxuICAgIC8vIGNsZWFyIGRhdGFcbiAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgfVxuXG4gIC8vIDMwNyBwcmVzZXJ2ZXMgbWV0aG9kXG4gIC8vIDMwOCBwcmVzZXJ2ZXMgbWV0aG9kXG4gIGRlbGV0ZSBoZWFkZXJzLmhvc3Q7XG5cbiAgZGVsZXRlIHRoaXMucmVxO1xuICBkZWxldGUgdGhpcy5fZm9ybURhdGE7XG5cbiAgLy8gcmVtb3ZlIGFsbCBhZGQgaGVhZGVyIGV4Y2VwdCBVc2VyLUFnZW50XG4gIF9pbml0SGVhZGVycyh0aGlzKTtcblxuICAvLyByZWRpcmVjdFxuICB0aGlzLl9lbmRDYWxsZWQgPSBmYWxzZTtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMucXMgPSB7fTtcbiAgdGhpcy5fcXVlcnkubGVuZ3RoID0gMDtcbiAgdGhpcy5zZXQoaGVhZGVycyk7XG4gIHRoaXMuZW1pdCgncmVkaXJlY3QnLCByZXMpO1xuICB0aGlzLl9yZWRpcmVjdExpc3QucHVzaCh0aGlzLnVybCk7XG4gIHRoaXMuZW5kKHRoaXMuX2NhbGxiYWNrKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBdXRob3JpemF0aW9uIGZpZWxkIHZhbHVlIHdpdGggYHVzZXJgIGFuZCBgcGFzc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAuYXV0aCgndG9iaScsICdsZWFybmJvb3N0JylcbiAqICAgLmF1dGgoJ3RvYmk6bGVhcm5ib29zdCcpXG4gKiAgIC5hdXRoKCd0b2JpJylcbiAqICAgLmF1dGgoYWNjZXNzVG9rZW4sIHsgdHlwZTogJ2JlYXJlcicgfSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXNlclxuICogQHBhcmFtIHtTdHJpbmd9IFtwYXNzXVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBvcHRpb25zIHdpdGggYXV0aG9yaXphdGlvbiB0eXBlICdiYXNpYycgb3IgJ2JlYXJlcicgKCdiYXNpYycgaXMgZGVmYXVsdClcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdXRoID0gZnVuY3Rpb24gKHVzZXIsIHBhc3MsIG9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHBhc3MgPSAnJztcbiAgaWYgKHR5cGVvZiBwYXNzID09PSAnb2JqZWN0JyAmJiBwYXNzICE9PSBudWxsKSB7XG4gICAgLy8gcGFzcyBpcyBvcHRpb25hbCBhbmQgY2FuIGJlIHJlcGxhY2VkIHdpdGggb3B0aW9uc1xuICAgIG9wdGlvbnMgPSBwYXNzO1xuICAgIHBhc3MgPSAnJztcbiAgfVxuXG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7IHR5cGU6ICdiYXNpYycgfTtcbiAgfVxuXG4gIGNvbnN0IGVuY29kZXIgPSAoc3RyaW5nKSA9PiBCdWZmZXIuZnJvbShzdHJpbmcpLnRvU3RyaW5nKCdiYXNlNjQnKTtcblxuICByZXR1cm4gdGhpcy5fYXV0aCh1c2VyLCBwYXNzLCBvcHRpb25zLCBlbmNvZGVyKTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjZXJ0aWZpY2F0ZSBhdXRob3JpdHkgb3B0aW9uIGZvciBodHRwcyByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyIHwgQXJyYXl9IGNlcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYSA9IGZ1bmN0aW9uIChjZXJ0KSB7XG4gIHRoaXMuX2NhID0gY2VydDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgY2xpZW50IGNlcnRpZmljYXRlIGtleSBvcHRpb24gZm9yIGh0dHBzIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtCdWZmZXIgfCBTdHJpbmd9IGNlcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5rZXkgPSBmdW5jdGlvbiAoY2VydCkge1xuICB0aGlzLl9rZXkgPSBjZXJ0O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBrZXksIGNlcnRpZmljYXRlLCBhbmQgQ0EgY2VydHMgb2YgdGhlIGNsaWVudCBpbiBQRlggb3IgUEtDUzEyIGZvcm1hdC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlciB8IFN0cmluZ30gY2VydFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnBmeCA9IGZ1bmN0aW9uIChjZXJ0KSB7XG4gIGlmICh0eXBlb2YgY2VydCA9PT0gJ29iamVjdCcgJiYgIUJ1ZmZlci5pc0J1ZmZlcihjZXJ0KSkge1xuICAgIHRoaXMuX3BmeCA9IGNlcnQucGZ4O1xuICAgIHRoaXMuX3Bhc3NwaHJhc2UgPSBjZXJ0LnBhc3NwaHJhc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fcGZ4ID0gY2VydDtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGNsaWVudCBjZXJ0aWZpY2F0ZSBvcHRpb24gZm9yIGh0dHBzIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtCdWZmZXIgfCBTdHJpbmd9IGNlcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jZXJ0ID0gZnVuY3Rpb24gKGNlcnQpIHtcbiAgdGhpcy5fY2VydCA9IGNlcnQ7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEbyBub3QgcmVqZWN0IGV4cGlyZWQgb3IgaW52YWxpZCBUTFMgY2VydHMuXG4gKiBzZXRzIGByZWplY3RVbmF1dGhvcml6ZWQ9dHJ1ZWAuIEJlIHdhcm5lZCB0aGF0IHRoaXMgYWxsb3dzIE1JVE0gYXR0YWNrcy5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZGlzYWJsZVRMU0NlcnRzID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9kaXNhYmxlVExTQ2VydHMgPSB0cnVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGh0dHBbc10gcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJuIHtPdXRnb2luZ01lc3NhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuUmVxdWVzdC5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucmVxKSByZXR1cm4gdGhpcy5yZXE7XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcXVlcnkgPSBxcy5zdHJpbmdpZnkodGhpcy5xcywge1xuICAgICAgaW5kaWNlczogZmFsc2UsXG4gICAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IHRydWVcbiAgICB9KTtcbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHRoaXMucXMgPSB7fTtcbiAgICAgIHRoaXMuX3F1ZXJ5LnB1c2gocXVlcnkpO1xuICAgIH1cblxuICAgIHRoaXMuX2ZpbmFsaXplUXVlcnlTdHJpbmcoKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB9XG5cbiAgbGV0IHsgdXJsIH0gPSB0aGlzO1xuICBjb25zdCByZXRyaWVzID0gdGhpcy5fcmV0cmllcztcblxuICAvLyBDYXB0dXJlIGJhY2t0aWNrcyBhcy1pcyBmcm9tIHRoZSBmaW5hbCBxdWVyeSBzdHJpbmcgYnVpbHQgYWJvdmUuXG4gIC8vIE5vdGU6IHRoaXMnbGwgb25seSBmaW5kIGJhY2t0aWNrcyBlbnRlcmVkIGluIHJlcS5xdWVyeShTdHJpbmcpXG4gIC8vIGNhbGxzLCBiZWNhdXNlIHFzLnN0cmluZ2lmeSB1bmNvbmRpdGlvbmFsbHkgZW5jb2RlcyBiYWNrdGlja3MuXG4gIGxldCBxdWVyeVN0cmluZ0JhY2t0aWNrcztcbiAgaWYgKHVybC5pbmNsdWRlcygnYCcpKSB7XG4gICAgY29uc3QgcXVlcnlTdGFydEluZGV4ID0gdXJsLmluZGV4T2YoJz8nKTtcblxuICAgIGlmIChxdWVyeVN0YXJ0SW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBxdWVyeVN0cmluZyA9IHVybC5zbGljZShxdWVyeVN0YXJ0SW5kZXggKyAxKTtcbiAgICAgIHF1ZXJ5U3RyaW5nQmFja3RpY2tzID0gcXVlcnlTdHJpbmcubWF0Y2goL2B8JTYwL2cpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGRlZmF1bHQgdG8gaHR0cDovL1xuICBpZiAodXJsLmluZGV4T2YoJ2h0dHAnKSAhPT0gMCkgdXJsID0gYGh0dHA6Ly8ke3VybH1gO1xuICB1cmwgPSBwYXJzZSh1cmwpO1xuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdmlzaW9ubWVkaWEvc3VwZXJhZ2VudC9pc3N1ZXMvMTM2N1xuICBpZiAocXVlcnlTdHJpbmdCYWNrdGlja3MpIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgdXJsLnF1ZXJ5ID0gdXJsLnF1ZXJ5LnJlcGxhY2UoLyU2MC9nLCAoKSA9PiBxdWVyeVN0cmluZ0JhY2t0aWNrc1tpKytdKTtcbiAgICB1cmwuc2VhcmNoID0gYD8ke3VybC5xdWVyeX1gO1xuICAgIHVybC5wYXRoID0gdXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaDtcbiAgfVxuXG4gIC8vIHN1cHBvcnQgdW5peCBzb2NrZXRzXG4gIGlmICgvXmh0dHBzP1xcK3VuaXg6Ly50ZXN0KHVybC5wcm90b2NvbCkgPT09IHRydWUpIHtcbiAgICAvLyBnZXQgdGhlIHByb3RvY29sXG4gICAgdXJsLnByb3RvY29sID0gYCR7dXJsLnByb3RvY29sLnNwbGl0KCcrJylbMF19OmA7XG5cbiAgICAvLyBnZXQgdGhlIHNvY2tldCwgcGF0aFxuICAgIGNvbnN0IHVuaXhQYXJ0cyA9IHVybC5wYXRoLm1hdGNoKC9eKFteL10rKSguKykkLyk7XG4gICAgb3B0aW9ucy5zb2NrZXRQYXRoID0gdW5peFBhcnRzWzFdLnJlcGxhY2UoLyUyRi9nLCAnLycpO1xuICAgIHVybC5wYXRoID0gdW5peFBhcnRzWzJdO1xuICB9XG5cbiAgLy8gT3ZlcnJpZGUgSVAgYWRkcmVzcyBvZiBhIGhvc3RuYW1lXG4gIGlmICh0aGlzLl9jb25uZWN0T3ZlcnJpZGUpIHtcbiAgICBjb25zdCB7IGhvc3RuYW1lIH0gPSB1cmw7XG4gICAgY29uc3QgbWF0Y2ggPVxuICAgICAgaG9zdG5hbWUgaW4gdGhpcy5fY29ubmVjdE92ZXJyaWRlXG4gICAgICAgID8gdGhpcy5fY29ubmVjdE92ZXJyaWRlW2hvc3RuYW1lXVxuICAgICAgICA6IHRoaXMuX2Nvbm5lY3RPdmVycmlkZVsnKiddO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgLy8gYmFja3VwIHRoZSByZWFsIGhvc3RcbiAgICAgIGlmICghdGhpcy5faGVhZGVyLmhvc3QpIHtcbiAgICAgICAgdGhpcy5zZXQoJ2hvc3QnLCB1cmwuaG9zdCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdIb3N0O1xuICAgICAgbGV0IG5ld1BvcnQ7XG5cbiAgICAgIGlmICh0eXBlb2YgbWF0Y2ggPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5ld0hvc3QgPSBtYXRjaC5ob3N0O1xuICAgICAgICBuZXdQb3J0ID0gbWF0Y2gucG9ydDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0hvc3QgPSBtYXRjaDtcbiAgICAgICAgbmV3UG9ydCA9IHVybC5wb3J0O1xuICAgICAgfVxuXG4gICAgICAvLyB3cmFwIFtpcHY2XVxuICAgICAgdXJsLmhvc3QgPSAvOi8udGVzdChuZXdIb3N0KSA/IGBbJHtuZXdIb3N0fV1gIDogbmV3SG9zdDtcbiAgICAgIGlmIChuZXdQb3J0KSB7XG4gICAgICAgIHVybC5ob3N0ICs9IGA6JHtuZXdQb3J0fWA7XG4gICAgICAgIHVybC5wb3J0ID0gbmV3UG9ydDtcbiAgICAgIH1cblxuICAgICAgdXJsLmhvc3RuYW1lID0gbmV3SG9zdDtcbiAgICB9XG4gIH1cblxuICAvLyBvcHRpb25zXG4gIG9wdGlvbnMubWV0aG9kID0gdGhpcy5tZXRob2Q7XG4gIG9wdGlvbnMucG9ydCA9IHVybC5wb3J0O1xuICBvcHRpb25zLnBhdGggPSB1cmwucGF0aDtcbiAgb3B0aW9ucy5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICBvcHRpb25zLmNhID0gdGhpcy5fY2E7XG4gIG9wdGlvbnMua2V5ID0gdGhpcy5fa2V5O1xuICBvcHRpb25zLnBmeCA9IHRoaXMuX3BmeDtcbiAgb3B0aW9ucy5jZXJ0ID0gdGhpcy5fY2VydDtcbiAgb3B0aW9ucy5wYXNzcGhyYXNlID0gdGhpcy5fcGFzc3BocmFzZTtcbiAgb3B0aW9ucy5hZ2VudCA9IHRoaXMuX2FnZW50O1xuICBvcHRpb25zLnJlamVjdFVuYXV0aG9yaXplZCA9XG4gICAgdHlwZW9mIHRoaXMuX2Rpc2FibGVUTFNDZXJ0cyA9PT0gJ2Jvb2xlYW4nXG4gICAgICA/ICF0aGlzLl9kaXNhYmxlVExTQ2VydHNcbiAgICAgIDogcHJvY2Vzcy5lbnYuTk9ERV9UTFNfUkVKRUNUX1VOQVVUSE9SSVpFRCAhPT0gJzAnO1xuXG4gIC8vIEFsbG93cyByZXF1ZXN0LmdldCgnaHR0cHM6Ly8xLjIuMy40LycpLnNldCgnSG9zdCcsICdleGFtcGxlLmNvbScpXG4gIGlmICh0aGlzLl9oZWFkZXIuaG9zdCkge1xuICAgIG9wdGlvbnMuc2VydmVybmFtZSA9IHRoaXMuX2hlYWRlci5ob3N0LnJlcGxhY2UoLzpcXGQrJC8sICcnKTtcbiAgfVxuXG4gIGlmIChcbiAgICB0aGlzLl90cnVzdExvY2FsaG9zdCAmJlxuICAgIC9eKD86bG9jYWxob3N0fDEyN1xcLjBcXC4wXFwuXFxkK3woMCo6KSs6MCoxKSQvLnRlc3QodXJsLmhvc3RuYW1lKVxuICApIHtcbiAgICBvcHRpb25zLnJlamVjdFVuYXV0aG9yaXplZCA9IGZhbHNlO1xuICB9XG5cbiAgLy8gaW5pdGlhdGUgcmVxdWVzdFxuICBjb25zdCBtb2QgPSB0aGlzLl9lbmFibGVIdHRwMlxuICAgID8gZXhwb3J0cy5wcm90b2NvbHNbJ2h0dHAyOiddLnNldFByb3RvY29sKHVybC5wcm90b2NvbClcbiAgICA6IGV4cG9ydHMucHJvdG9jb2xzW3VybC5wcm90b2NvbF07XG5cbiAgLy8gcmVxdWVzdFxuICB0aGlzLnJlcSA9IG1vZC5yZXF1ZXN0KG9wdGlvbnMpO1xuICBjb25zdCB7IHJlcSB9ID0gdGhpcztcblxuICAvLyBzZXQgdGNwIG5vIGRlbGF5XG4gIHJlcS5zZXROb0RlbGF5KHRydWUpO1xuXG4gIGlmIChvcHRpb25zLm1ldGhvZCAhPT0gJ0hFQUQnKSB7XG4gICAgcmVxLnNldEhlYWRlcignQWNjZXB0LUVuY29kaW5nJywgJ2d6aXAsIGRlZmxhdGUnKTtcbiAgfVxuXG4gIHRoaXMucHJvdG9jb2wgPSB1cmwucHJvdG9jb2w7XG4gIHRoaXMuaG9zdCA9IHVybC5ob3N0O1xuXG4gIC8vIGV4cG9zZSBldmVudHNcbiAgcmVxLm9uY2UoJ2RyYWluJywgKCkgPT4ge1xuICAgIHRoaXMuZW1pdCgnZHJhaW4nKTtcbiAgfSk7XG5cbiAgcmVxLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAvLyBmbGFnIGFib3J0aW9uIGhlcmUgZm9yIG91dCB0aW1lb3V0c1xuICAgIC8vIGJlY2F1c2Ugbm9kZSB3aWxsIGVtaXQgYSBmYXV4LWVycm9yIFwic29ja2V0IGhhbmcgdXBcIlxuICAgIC8vIHdoZW4gcmVxdWVzdCBpcyBhYm9ydGVkIGJlZm9yZSBhIGNvbm5lY3Rpb24gaXMgbWFkZVxuICAgIGlmICh0aGlzLl9hYm9ydGVkKSByZXR1cm47XG4gICAgLy8gaWYgbm90IHRoZSBzYW1lLCB3ZSBhcmUgaW4gdGhlICoqb2xkKiogKGNhbmNlbGxlZCkgcmVxdWVzdCxcbiAgICAvLyBzbyBuZWVkIHRvIGNvbnRpbnVlIChzYW1lIGFzIGZvciBhYm92ZSlcbiAgICBpZiAodGhpcy5fcmV0cmllcyAhPT0gcmV0cmllcykgcmV0dXJuO1xuICAgIC8vIGlmIHdlJ3ZlIHJlY2VpdmVkIGEgcmVzcG9uc2UgdGhlbiB3ZSBkb24ndCB3YW50IHRvIGxldFxuICAgIC8vIGFuIGVycm9yIGluIHRoZSByZXF1ZXN0IGJsb3cgdXAgdGhlIHJlc3BvbnNlXG4gICAgaWYgKHRoaXMucmVzcG9uc2UpIHJldHVybjtcbiAgICB0aGlzLmNhbGxiYWNrKGVycik7XG4gIH0pO1xuXG4gIC8vIGF1dGhcbiAgaWYgKHVybC5hdXRoKSB7XG4gICAgY29uc3QgYXV0aCA9IHVybC5hdXRoLnNwbGl0KCc6Jyk7XG4gICAgdGhpcy5hdXRoKGF1dGhbMF0sIGF1dGhbMV0pO1xuICB9XG5cbiAgaWYgKHRoaXMudXNlcm5hbWUgJiYgdGhpcy5wYXNzd29yZCkge1xuICAgIHRoaXMuYXV0aCh0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkKTtcbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IGluIHRoaXMuaGVhZGVyKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmhlYWRlciwga2V5KSlcbiAgICAgIHJlcS5zZXRIZWFkZXIoa2V5LCB0aGlzLmhlYWRlcltrZXldKTtcbiAgfVxuXG4gIC8vIGFkZCBjb29raWVzXG4gIGlmICh0aGlzLmNvb2tpZXMpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX2hlYWRlciwgJ2Nvb2tpZScpKSB7XG4gICAgICAvLyBtZXJnZVxuICAgICAgY29uc3QgdG1wSmFyID0gbmV3IENvb2tpZUphci5Db29raWVKYXIoKTtcbiAgICAgIHRtcEphci5zZXRDb29raWVzKHRoaXMuX2hlYWRlci5jb29raWUuc3BsaXQoJzsnKSk7XG4gICAgICB0bXBKYXIuc2V0Q29va2llcyh0aGlzLmNvb2tpZXMuc3BsaXQoJzsnKSk7XG4gICAgICByZXEuc2V0SGVhZGVyKFxuICAgICAgICAnQ29va2llJyxcbiAgICAgICAgdG1wSmFyLmdldENvb2tpZXMoQ29va2llSmFyLkNvb2tpZUFjY2Vzc0luZm8uQWxsKS50b1ZhbHVlU3RyaW5nKClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcS5zZXRIZWFkZXIoJ0Nvb2tpZScsIHRoaXMuY29va2llcyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgaWYgKHRoaXMuX3Nob3VsZFJldHJ5KGVyciwgcmVzKSkge1xuICAgIHJldHVybiB0aGlzLl9yZXRyeSgpO1xuICB9XG5cbiAgLy8gQXZvaWQgdGhlIGVycm9yIHdoaWNoIGlzIGVtaXR0ZWQgZnJvbSAnc29ja2V0IGhhbmcgdXAnIHRvIGNhdXNlIHRoZSBmbiB1bmRlZmluZWQgZXJyb3Igb24gSlMgcnVudGltZS5cbiAgY29uc3QgZm4gPSB0aGlzLl9jYWxsYmFjayB8fCBub29wO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICBpZiAodGhpcy5jYWxsZWQpIHJldHVybiBjb25zb2xlLndhcm4oJ3N1cGVyYWdlbnQ6IGRvdWJsZSBjYWxsYmFjayBidWcnKTtcbiAgdGhpcy5jYWxsZWQgPSB0cnVlO1xuXG4gIGlmICghZXJyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdGhpcy5faXNSZXNwb25zZU9LKHJlcykpIHtcbiAgICAgICAgbGV0IG1zZyA9ICdVbnN1Y2Nlc3NmdWwgSFRUUCByZXNwb25zZSc7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICBtc2cgPSBodHRwLlNUQVRVU19DT0RFU1tyZXMuc3RhdHVzXSB8fCBtc2c7XG4gICAgICAgIH1cblxuICAgICAgICBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgZXJyLnN0YXR1cyA9IHJlcyA/IHJlcy5zdGF0dXMgOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyXykge1xuICAgICAgZXJyID0gZXJyXztcbiAgICB9XG4gIH1cblxuICAvLyBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBjYWxsYmFjayBpcyBjYWxsZWQgb3V0c2lkZSB0cnkvY2F0Y2hcbiAgLy8gdG8gYXZvaWQgZG91YmxlIGNhbGxiYWNrXG4gIGlmICghZXJyKSB7XG4gICAgcmV0dXJuIGZuKG51bGwsIHJlcyk7XG4gIH1cblxuICBlcnIucmVzcG9uc2UgPSByZXM7XG4gIGlmICh0aGlzLl9tYXhSZXRyaWVzKSBlcnIucmV0cmllcyA9IHRoaXMuX3JldHJpZXMgLSAxO1xuXG4gIC8vIG9ubHkgZW1pdCBlcnJvciBldmVudCBpZiB0aGVyZSBpcyBhIGxpc3RlbmVyXG4gIC8vIG90aGVyd2lzZSB3ZSBhc3N1bWUgdGhlIGNhbGxiYWNrIHRvIGAuZW5kKClgIHdpbGwgZ2V0IHRoZSBlcnJvclxuICBpZiAoZXJyICYmIHRoaXMubGlzdGVuZXJzKCdlcnJvcicpLmxlbmd0aCA+IDApIHtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxuXG4gIGZuKGVyciwgcmVzKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBob3N0IG9iamVjdCxcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIGhvc3Qgb2JqZWN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSBpcyBhIGhvc3Qgb2JqZWN0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUmVxdWVzdC5wcm90b3R5cGUuX2lzSG9zdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIChcbiAgICBCdWZmZXIuaXNCdWZmZXIob2JqKSB8fCBvYmogaW5zdGFuY2VvZiBTdHJlYW0gfHwgb2JqIGluc3RhbmNlb2YgRm9ybURhdGFcbiAgKTtcbn07XG5cbi8qKlxuICogSW5pdGlhdGUgcmVxdWVzdCwgaW52b2tpbmcgY2FsbGJhY2sgYGZuKGVyciwgcmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuX2VtaXRSZXNwb25zZSA9IGZ1bmN0aW9uIChib2R5LCBmaWxlcykge1xuICBjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZSh0aGlzKTtcbiAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXNwb25zZS5yZWRpcmVjdHMgPSB0aGlzLl9yZWRpcmVjdExpc3Q7XG4gIGlmICh1bmRlZmluZWQgIT09IGJvZHkpIHtcbiAgICByZXNwb25zZS5ib2R5ID0gYm9keTtcbiAgfVxuXG4gIHJlc3BvbnNlLmZpbGVzID0gZmlsZXM7XG4gIGlmICh0aGlzLl9lbmRDYWxsZWQpIHtcbiAgICByZXNwb25zZS5waXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcImVuZCgpIGhhcyBhbHJlYWR5IGJlZW4gY2FsbGVkLCBzbyBpdCdzIHRvbyBsYXRlIHRvIHN0YXJ0IHBpcGluZ1wiXG4gICAgICApO1xuICAgIH07XG4gIH1cblxuICB0aGlzLmVtaXQoJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICByZXR1cm4gcmVzcG9uc2U7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdGhpcy5yZXF1ZXN0KCk7XG4gIGRlYnVnKCclcyAlcycsIHRoaXMubWV0aG9kLCB0aGlzLnVybCk7XG5cbiAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICcuZW5kKCkgd2FzIGNhbGxlZCB0d2ljZS4gVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIHN1cGVyYWdlbnQnXG4gICAgKTtcbiAgfVxuXG4gIHRoaXMuX2VuZENhbGxlZCA9IHRydWU7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIHRoaXMuX2VuZCgpO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpXG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soXG4gICAgICBuZXcgRXJyb3IoJ1RoZSByZXF1ZXN0IGhhcyBiZWVuIGFib3J0ZWQgZXZlbiBiZWZvcmUgLmVuZCgpIHdhcyBjYWxsZWQnKVxuICAgICk7XG5cbiAgbGV0IGRhdGEgPSB0aGlzLl9kYXRhO1xuICBjb25zdCB7IHJlcSB9ID0gdGhpcztcbiAgY29uc3QgeyBtZXRob2QgfSA9IHRoaXM7XG5cbiAgdGhpcy5fc2V0VGltZW91dHMoKTtcblxuICAvLyBib2R5XG4gIGlmIChtZXRob2QgIT09ICdIRUFEJyAmJiAhcmVxLl9oZWFkZXJTZW50KSB7XG4gICAgLy8gc2VyaWFsaXplIHN0dWZmXG4gICAgaWYgKHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJykge1xuICAgICAgbGV0IGNvbnRlbnRUeXBlID0gcmVxLmdldEhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgICAvLyBQYXJzZSBvdXQganVzdCB0aGUgY29udGVudCB0eXBlIGZyb20gdGhlIGhlYWRlciAoaWdub3JlIHRoZSBjaGFyc2V0KVxuICAgICAgaWYgKGNvbnRlbnRUeXBlKSBjb250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLnNwbGl0KCc7JylbMF07XG4gICAgICBsZXQgc2VyaWFsaXplID0gdGhpcy5fc2VyaWFsaXplciB8fCBleHBvcnRzLnNlcmlhbGl6ZVtjb250ZW50VHlwZV07XG4gICAgICBpZiAoIXNlcmlhbGl6ZSAmJiBpc0pTT04oY29udGVudFR5cGUpKSB7XG4gICAgICAgIHNlcmlhbGl6ZSA9IGV4cG9ydHMuc2VyaWFsaXplWydhcHBsaWNhdGlvbi9qc29uJ107XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gY29udGVudC1sZW5ndGhcbiAgICBpZiAoZGF0YSAmJiAhcmVxLmdldEhlYWRlcignQ29udGVudC1MZW5ndGgnKSkge1xuICAgICAgcmVxLnNldEhlYWRlcihcbiAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJyxcbiAgICAgICAgQnVmZmVyLmlzQnVmZmVyKGRhdGEpID8gZGF0YS5sZW5ndGggOiBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyByZXNwb25zZVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICByZXEub25jZSgncmVzcG9uc2UnLCAocmVzKSA9PiB7XG4gICAgZGVidWcoJyVzICVzIC0+ICVzJywgdGhpcy5tZXRob2QsIHRoaXMudXJsLCByZXMuc3RhdHVzQ29kZSk7XG5cbiAgICBpZiAodGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGlwZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtYXggPSB0aGlzLl9tYXhSZWRpcmVjdHM7XG4gICAgY29uc3QgbWltZSA9IHV0aWxzLnR5cGUocmVzLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddIHx8ICcnKSB8fCAndGV4dC9wbGFpbic7XG4gICAgbGV0IHR5cGUgPSBtaW1lLnNwbGl0KCcvJylbMF07XG4gICAgaWYgKHR5cGUpIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgIGNvbnN0IG11bHRpcGFydCA9IHR5cGUgPT09ICdtdWx0aXBhcnQnO1xuICAgIGNvbnN0IHJlZGlyZWN0ID0gaXNSZWRpcmVjdChyZXMuc3RhdHVzQ29kZSk7XG4gICAgY29uc3QgcmVzcG9uc2VUeXBlID0gdGhpcy5fcmVzcG9uc2VUeXBlO1xuXG4gICAgdGhpcy5yZXMgPSByZXM7XG5cbiAgICAvLyByZWRpcmVjdFxuICAgIGlmIChyZWRpcmVjdCAmJiB0aGlzLl9yZWRpcmVjdHMrKyAhPT0gbWF4KSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVkaXJlY3QocmVzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tZXRob2QgPT09ICdIRUFEJykge1xuICAgICAgdGhpcy5lbWl0KCdlbmQnKTtcbiAgICAgIHRoaXMuY2FsbGJhY2sobnVsbCwgdGhpcy5fZW1pdFJlc3BvbnNlKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHpsaWIgc3VwcG9ydFxuICAgIGlmICh0aGlzLl9zaG91bGRVbnppcChyZXMpKSB7XG4gICAgICB1bnppcChyZXEsIHJlcyk7XG4gICAgfVxuXG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlcjtcbiAgICBpZiAoYnVmZmVyID09PSB1bmRlZmluZWQgJiYgbWltZSBpbiBleHBvcnRzLmJ1ZmZlcikge1xuICAgICAgYnVmZmVyID0gQm9vbGVhbihleHBvcnRzLmJ1ZmZlclttaW1lXSk7XG4gICAgfVxuXG4gICAgbGV0IHBhcnNlciA9IHRoaXMuX3BhcnNlcjtcbiAgICBpZiAodW5kZWZpbmVkID09PSBidWZmZXIpIHtcbiAgICAgIGlmIChwYXJzZXIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiQSBjdXN0b20gc3VwZXJhZ2VudCBwYXJzZXIgaGFzIGJlZW4gc2V0LCBidXQgYnVmZmVyaW5nIHN0cmF0ZWd5IGZvciB0aGUgcGFyc2VyIGhhc24ndCBiZWVuIGNvbmZpZ3VyZWQuIENhbGwgYHJlcS5idWZmZXIodHJ1ZSBvciBmYWxzZSlgIG9yIHNldCBgc3VwZXJhZ2VudC5idWZmZXJbbWltZV0gPSB0cnVlIG9yIGZhbHNlYFwiXG4gICAgICAgICk7XG4gICAgICAgIGJ1ZmZlciA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwYXJzZXIpIHtcbiAgICAgIGlmIChyZXNwb25zZVR5cGUpIHtcbiAgICAgICAgcGFyc2VyID0gZXhwb3J0cy5wYXJzZS5pbWFnZTsgLy8gSXQncyBhY3R1YWxseSBhIGdlbmVyaWMgQnVmZmVyXG4gICAgICAgIGJ1ZmZlciA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKG11bHRpcGFydCkge1xuICAgICAgICBjb25zdCBmb3JtID0gbmV3IGZvcm1pZGFibGUuSW5jb21pbmdGb3JtKCk7XG4gICAgICAgIHBhcnNlciA9IGZvcm0ucGFyc2UuYmluZChmb3JtKTtcbiAgICAgICAgYnVmZmVyID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNJbWFnZU9yVmlkZW8obWltZSkpIHtcbiAgICAgICAgcGFyc2VyID0gZXhwb3J0cy5wYXJzZS5pbWFnZTtcbiAgICAgICAgYnVmZmVyID0gdHJ1ZTsgLy8gRm9yIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5IGJ1ZmZlcmluZyBkZWZhdWx0IGlzIGFkLWhvYyBNSU1FLWRlcGVuZGVudFxuICAgICAgfSBlbHNlIGlmIChleHBvcnRzLnBhcnNlW21pbWVdKSB7XG4gICAgICAgIHBhcnNlciA9IGV4cG9ydHMucGFyc2VbbWltZV07XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICBwYXJzZXIgPSBleHBvcnRzLnBhcnNlLnRleHQ7XG4gICAgICAgIGJ1ZmZlciA9IGJ1ZmZlciAhPT0gZmFsc2U7XG5cbiAgICAgICAgLy8gZXZlcnlvbmUgd2FudHMgdGhlaXIgb3duIHdoaXRlLWxhYmVsZWQganNvblxuICAgICAgfSBlbHNlIGlmIChpc0pTT04obWltZSkpIHtcbiAgICAgICAgcGFyc2VyID0gZXhwb3J0cy5wYXJzZVsnYXBwbGljYXRpb24vanNvbiddO1xuICAgICAgICBidWZmZXIgPSBidWZmZXIgIT09IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChidWZmZXIpIHtcbiAgICAgICAgcGFyc2VyID0gZXhwb3J0cy5wYXJzZS50ZXh0O1xuICAgICAgfSBlbHNlIGlmICh1bmRlZmluZWQgPT09IGJ1ZmZlcikge1xuICAgICAgICBwYXJzZXIgPSBleHBvcnRzLnBhcnNlLmltYWdlOyAvLyBJdCdzIGFjdHVhbGx5IGEgZ2VuZXJpYyBCdWZmZXJcbiAgICAgICAgYnVmZmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBieSBkZWZhdWx0IG9ubHkgYnVmZmVyIHRleHQvKiwganNvbiBhbmQgbWVzc2VkIHVwIHRoaW5nIGZyb20gaGVsbFxuICAgIGlmICgodW5kZWZpbmVkID09PSBidWZmZXIgJiYgaXNUZXh0KG1pbWUpKSB8fCBpc0pTT04obWltZSkpIHtcbiAgICAgIGJ1ZmZlciA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVzQnVmZmVyZWQgPSBidWZmZXI7XG4gICAgbGV0IHBhcnNlckhhbmRsZXNFbmQgPSBmYWxzZTtcbiAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAvLyBQcm90ZWN0aW9uYSBhZ2FpbnN0IHppcCBib21icyBhbmQgb3RoZXIgbnVpc2FuY2VcbiAgICAgIGxldCByZXNwb25zZUJ5dGVzTGVmdCA9IHRoaXMuX21heFJlc3BvbnNlU2l6ZSB8fCAyMDAwMDAwMDA7XG4gICAgICByZXMub24oJ2RhdGEnLCAoYnVmKSA9PiB7XG4gICAgICAgIHJlc3BvbnNlQnl0ZXNMZWZ0IC09IGJ1Zi5ieXRlTGVuZ3RoIHx8IGJ1Zi5sZW5ndGg7XG4gICAgICAgIGlmIChyZXNwb25zZUJ5dGVzTGVmdCA8IDApIHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgcHJvcGFnYXRlIHRocm91Z2ggZXJyb3IgZXZlbnRcbiAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoJ01heGltdW0gcmVzcG9uc2Ugc2l6ZSByZWFjaGVkJyk7XG4gICAgICAgICAgZXJyLmNvZGUgPSAnRVRPT0xBUkdFJztcbiAgICAgICAgICAvLyBQYXJzZXJzIGFyZW4ndCByZXF1aXJlZCB0byBvYnNlcnZlIGVycm9yIGV2ZW50LFxuICAgICAgICAgIC8vIHNvIHdvdWxkIGluY29ycmVjdGx5IHJlcG9ydCBzdWNjZXNzXG4gICAgICAgICAgcGFyc2VySGFuZGxlc0VuZCA9IGZhbHNlO1xuICAgICAgICAgIC8vIFdpbGwgZW1pdCBlcnJvciBldmVudFxuICAgICAgICAgIHJlcy5kZXN0cm95KGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChwYXJzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFVuYnVmZmVyZWQgcGFyc2VycyBhcmUgc3VwcG9zZWQgdG8gZW1pdCByZXNwb25zZSBlYXJseSxcbiAgICAgICAgLy8gd2hpY2ggaXMgd2VpcmQgQlRXLCBiZWNhdXNlIHJlc3BvbnNlLmJvZHkgd29uJ3QgYmUgdGhlcmUuXG4gICAgICAgIHBhcnNlckhhbmRsZXNFbmQgPSBidWZmZXI7XG5cbiAgICAgICAgcGFyc2VyKHJlcywgKGVyciwgb2JqLCBmaWxlcykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnRpbWVkb3V0KSB7XG4gICAgICAgICAgICAvLyBUaW1lb3V0IGhhcyBhbHJlYWR5IGhhbmRsZWQgYWxsIGNhbGxiYWNrc1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEludGVudGlvbmFsIChub24tdGltZW91dCkgYWJvcnQgaXMgc3VwcG9zZWQgdG8gcHJlc2VydmUgcGFydGlhbCByZXNwb25zZSxcbiAgICAgICAgICAvLyBldmVuIGlmIGl0IGRvZXNuJ3QgcGFyc2UuXG4gICAgICAgICAgaWYgKGVyciAmJiAhdGhpcy5fYWJvcnRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyc2VySGFuZGxlc0VuZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdlbmQnKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sobnVsbCwgdGhpcy5fZW1pdFJlc3BvbnNlKG9iaiwgZmlsZXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVzID0gcmVzO1xuXG4gICAgLy8gdW5idWZmZXJlZFxuICAgIGlmICghYnVmZmVyKSB7XG4gICAgICBkZWJ1ZygndW5idWZmZXJlZCAlcyAlcycsIHRoaXMubWV0aG9kLCB0aGlzLnVybCk7XG4gICAgICB0aGlzLmNhbGxiYWNrKG51bGwsIHRoaXMuX2VtaXRSZXNwb25zZSgpKTtcbiAgICAgIGlmIChtdWx0aXBhcnQpIHJldHVybjsgLy8gYWxsb3cgbXVsdGlwYXJ0IHRvIGhhbmRsZSBlbmQgZXZlbnRcbiAgICAgIHJlcy5vbmNlKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIGRlYnVnKCdlbmQgJXMgJXMnLCB0aGlzLm1ldGhvZCwgdGhpcy51cmwpO1xuICAgICAgICB0aGlzLmVtaXQoJ2VuZCcpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdGVybWluYXRpbmcgZXZlbnRzXG4gICAgcmVzLm9uY2UoJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgcGFyc2VySGFuZGxlc0VuZCA9IGZhbHNlO1xuICAgICAgdGhpcy5jYWxsYmFjayhlcnIsIG51bGwpO1xuICAgIH0pO1xuICAgIGlmICghcGFyc2VySGFuZGxlc0VuZClcbiAgICAgIHJlcy5vbmNlKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIGRlYnVnKCdlbmQgJXMgJXMnLCB0aGlzLm1ldGhvZCwgdGhpcy51cmwpO1xuICAgICAgICAvLyBUT0RPOiB1bmxlc3MgYnVmZmVyaW5nIGVtaXQgZWFybGllciB0byBzdHJlYW1cbiAgICAgICAgdGhpcy5lbWl0KCdlbmQnKTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayhudWxsLCB0aGlzLl9lbWl0UmVzcG9uc2UoKSk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgdGhpcy5lbWl0KCdyZXF1ZXN0JywgdGhpcyk7XG5cbiAgY29uc3QgZ2V0UHJvZ3Jlc3NNb25pdG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGxlbmd0aENvbXB1dGFibGUgPSB0cnVlO1xuICAgIGNvbnN0IHRvdGFsID0gcmVxLmdldEhlYWRlcignQ29udGVudC1MZW5ndGgnKTtcbiAgICBsZXQgbG9hZGVkID0gMDtcblxuICAgIGNvbnN0IHByb2dyZXNzID0gbmV3IFN0cmVhbS5UcmFuc2Zvcm0oKTtcbiAgICBwcm9ncmVzcy5fdHJhbnNmb3JtID0gKGNodW5rLCBlbmNvZGluZywgY2IpID0+IHtcbiAgICAgIGxvYWRlZCArPSBjaHVuay5sZW5ndGg7XG4gICAgICB0aGlzLmVtaXQoJ3Byb2dyZXNzJywge1xuICAgICAgICBkaXJlY3Rpb246ICd1cGxvYWQnLFxuICAgICAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgICAgICBsb2FkZWQsXG4gICAgICAgIHRvdGFsXG4gICAgICB9KTtcbiAgICAgIGNiKG51bGwsIGNodW5rKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHByb2dyZXNzO1xuICB9O1xuXG4gIGNvbnN0IGJ1ZmZlclRvQ2h1bmtzID0gKGJ1ZmZlcikgPT4ge1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IDE2ICogMTAyNDsgLy8gZGVmYXVsdCBoaWdoV2F0ZXJNYXJrIHZhbHVlXG4gICAgY29uc3QgY2h1bmtpbmcgPSBuZXcgU3RyZWFtLlJlYWRhYmxlKCk7XG4gICAgY29uc3QgdG90YWxMZW5ndGggPSBidWZmZXIubGVuZ3RoO1xuICAgIGNvbnN0IHJlbWFpbmRlciA9IHRvdGFsTGVuZ3RoICUgY2h1bmtTaXplO1xuICAgIGNvbnN0IGN1dG9mZiA9IHRvdGFsTGVuZ3RoIC0gcmVtYWluZGVyO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXRvZmY7IGkgKz0gY2h1bmtTaXplKSB7XG4gICAgICBjb25zdCBjaHVuayA9IGJ1ZmZlci5zbGljZShpLCBpICsgY2h1bmtTaXplKTtcbiAgICAgIGNodW5raW5nLnB1c2goY2h1bmspO1xuICAgIH1cblxuICAgIGlmIChyZW1haW5kZXIgPiAwKSB7XG4gICAgICBjb25zdCByZW1haW5kZXJCdWZmZXIgPSBidWZmZXIuc2xpY2UoLXJlbWFpbmRlcik7XG4gICAgICBjaHVua2luZy5wdXNoKHJlbWFpbmRlckJ1ZmZlcik7XG4gICAgfVxuXG4gICAgY2h1bmtpbmcucHVzaChudWxsKTsgLy8gbm8gbW9yZSBkYXRhXG5cbiAgICByZXR1cm4gY2h1bmtpbmc7XG4gIH07XG5cbiAgLy8gaWYgYSBGb3JtRGF0YSBpbnN0YW5jZSBnb3QgY3JlYXRlZCwgdGhlbiB3ZSBzZW5kIHRoYXQgYXMgdGhlIHJlcXVlc3QgYm9keVxuICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuX2Zvcm1EYXRhO1xuICBpZiAoZm9ybURhdGEpIHtcbiAgICAvLyBzZXQgaGVhZGVyc1xuICAgIGNvbnN0IGhlYWRlcnMgPSBmb3JtRGF0YS5nZXRIZWFkZXJzKCk7XG4gICAgZm9yIChjb25zdCBpIGluIGhlYWRlcnMpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaGVhZGVycywgaSkpIHtcbiAgICAgICAgZGVidWcoJ3NldHRpbmcgRm9ybURhdGEgaGVhZGVyOiBcIiVzOiAlc1wiJywgaSwgaGVhZGVyc1tpXSk7XG4gICAgICAgIHJlcS5zZXRIZWFkZXIoaSwgaGVhZGVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYXR0ZW1wdCB0byBnZXQgXCJDb250ZW50LUxlbmd0aFwiIGhlYWRlclxuICAgIGZvcm1EYXRhLmdldExlbmd0aCgoZXJyLCBsZW5ndGgpID0+IHtcbiAgICAgIC8vIFRPRE86IEFkZCBjaHVua2VkIGVuY29kaW5nIHdoZW4gbm8gbGVuZ3RoIChpZiBlcnIpXG4gICAgICBpZiAoZXJyKSBkZWJ1ZygnZm9ybURhdGEuZ2V0TGVuZ3RoIGhhZCBlcnJvcicsIGVyciwgbGVuZ3RoKTtcblxuICAgICAgZGVidWcoJ2dvdCBGb3JtRGF0YSBDb250ZW50LUxlbmd0aDogJXMnLCBsZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBsZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJlcS5zZXRIZWFkZXIoJ0NvbnRlbnQtTGVuZ3RoJywgbGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgZm9ybURhdGEucGlwZShnZXRQcm9ncmVzc01vbml0b3IoKSkucGlwZShyZXEpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgIGJ1ZmZlclRvQ2h1bmtzKGRhdGEpLnBpcGUoZ2V0UHJvZ3Jlc3NNb25pdG9yKCkpLnBpcGUocmVxKTtcbiAgfSBlbHNlIHtcbiAgICByZXEuZW5kKGRhdGEpO1xuICB9XG59O1xuXG4vLyBDaGVjayB3aGV0aGVyIHJlc3BvbnNlIGhhcyBhIG5vbi0wLXNpemVkIGd6aXAtZW5jb2RlZCBib2R5XG5SZXF1ZXN0LnByb3RvdHlwZS5fc2hvdWxkVW56aXAgPSAocmVzKSA9PiB7XG4gIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjA0IHx8IHJlcy5zdGF0dXNDb2RlID09PSAzMDQpIHtcbiAgICAvLyBUaGVzZSBhcmVuJ3Qgc3VwcG9zZWQgdG8gaGF2ZSBhbnkgYm9keVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIGhlYWRlciBjb250ZW50IGlzIGEgc3RyaW5nLCBhbmQgZGlzdGluY3Rpb24gYmV0d2VlbiAwIGFuZCBubyBpbmZvcm1hdGlvbiBpcyBjcnVjaWFsXG4gIGlmIChyZXMuaGVhZGVyc1snY29udGVudC1sZW5ndGgnXSA9PT0gJzAnKSB7XG4gICAgLy8gV2Uga25vdyB0aGF0IHRoZSBib2R5IGlzIGVtcHR5ICh1bmZvcnR1bmF0ZWx5LCB0aGlzIGNoZWNrIGRvZXMgbm90IGNvdmVyIGNodW5rZWQgZW5jb2RpbmcpXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gY29uc29sZS5sb2cocmVzKTtcbiAgcmV0dXJuIC9eXFxzKig/OmRlZmxhdGV8Z3ppcClcXHMqJC8udGVzdChyZXMuaGVhZGVyc1snY29udGVudC1lbmNvZGluZyddKTtcbn07XG5cbi8qKlxuICogT3ZlcnJpZGVzIEROUyBmb3Igc2VsZWN0ZWQgaG9zdG5hbWVzLiBUYWtlcyBvYmplY3QgbWFwcGluZyBob3N0bmFtZXMgdG8gSVAgYWRkcmVzc2VzLlxuICpcbiAqIFdoZW4gbWFraW5nIGEgcmVxdWVzdCB0byBhIFVSTCB3aXRoIGEgaG9zdG5hbWUgZXhhY3RseSBtYXRjaGluZyBhIGtleSBpbiB0aGUgb2JqZWN0LFxuICogdXNlIHRoZSBnaXZlbiBJUCBhZGRyZXNzIHRvIGNvbm5lY3QsIGluc3RlYWQgb2YgdXNpbmcgRE5TIHRvIHJlc29sdmUgdGhlIGhvc3RuYW1lLlxuICpcbiAqIEEgc3BlY2lhbCBob3N0IGAqYCBtYXRjaGVzIGV2ZXJ5IGhvc3RuYW1lIChrZWVwIHJlZGlyZWN0cyBpbiBtaW5kISlcbiAqXG4gKiAgICAgIHJlcXVlc3QuY29ubmVjdCh7XG4gKiAgICAgICAgJ3Rlc3QuZXhhbXBsZS5jb20nOiAnMTI3LjAuMC4xJyxcbiAqICAgICAgICAnaXB2Ni5leGFtcGxlLmNvbSc6ICc6OjEnLFxuICogICAgICB9KVxuICovXG5SZXF1ZXN0LnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKGNvbm5lY3RPdmVycmlkZSkge1xuICBpZiAodHlwZW9mIGNvbm5lY3RPdmVycmlkZSA9PT0gJ3N0cmluZycpIHtcbiAgICB0aGlzLl9jb25uZWN0T3ZlcnJpZGUgPSB7ICcqJzogY29ubmVjdE92ZXJyaWRlIH07XG4gIH0gZWxzZSBpZiAodHlwZW9mIGNvbm5lY3RPdmVycmlkZSA9PT0gJ29iamVjdCcpIHtcbiAgICB0aGlzLl9jb25uZWN0T3ZlcnJpZGUgPSBjb25uZWN0T3ZlcnJpZGU7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fY29ubmVjdE92ZXJyaWRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50cnVzdExvY2FsaG9zdCA9IGZ1bmN0aW9uICh0b2dnbGUpIHtcbiAgdGhpcy5fdHJ1c3RMb2NhbGhvc3QgPSB0b2dnbGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0b2dnbGU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZ2VuZXJhdGUgSFRUUCB2ZXJiIG1ldGhvZHNcbmlmICghbWV0aG9kcy5pbmNsdWRlcygnZGVsJykpIHtcbiAgLy8gY3JlYXRlIGEgY29weSBzbyB3ZSBkb24ndCBjYXVzZSBjb25mbGljdHMgd2l0aFxuICAvLyBvdGhlciBwYWNrYWdlcyB1c2luZyB0aGUgbWV0aG9kcyBwYWNrYWdlIGFuZFxuICAvLyBucG0gMy54XG4gIG1ldGhvZHMgPSBtZXRob2RzLnNsaWNlKDApO1xuICBtZXRob2RzLnB1c2goJ2RlbCcpO1xufVxuXG5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICBjb25zdCBuYW1lID0gbWV0aG9kO1xuICBtZXRob2QgPSBtZXRob2QgPT09ICdkZWwnID8gJ2RlbGV0ZScgOiBtZXRob2Q7XG5cbiAgbWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gIHJlcXVlc3RbbmFtZV0gPSAodXJsLCBkYXRhLCBmbikgPT4ge1xuICAgIGNvbnN0IHJlcSA9IHJlcXVlc3QobWV0aG9kLCB1cmwpO1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZm4gPSBkYXRhO1xuICAgICAgZGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGlmIChtZXRob2QgPT09ICdHRVQnIHx8IG1ldGhvZCA9PT0gJ0hFQUQnKSB7XG4gICAgICAgIHJlcS5xdWVyeShkYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcS5zZW5kKGRhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmbikgcmVxLmVuZChmbik7XG4gICAgcmV0dXJuIHJlcTtcbiAgfTtcbn0pO1xuXG4vKipcbiAqIENoZWNrIGlmIGBtaW1lYCBpcyB0ZXh0IGFuZCBzaG91bGQgYmUgYnVmZmVyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGlzVGV4dChtaW1lKSB7XG4gIGNvbnN0IHBhcnRzID0gbWltZS5zcGxpdCgnLycpO1xuICBsZXQgdHlwZSA9IHBhcnRzWzBdO1xuICBpZiAodHlwZSkgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGxldCBzdWJ0eXBlID0gcGFydHNbMV07XG4gIGlmIChzdWJ0eXBlKSBzdWJ0eXBlID0gc3VidHlwZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcblxuICByZXR1cm4gdHlwZSA9PT0gJ3RleHQnIHx8IHN1YnR5cGUgPT09ICd4LXd3dy1mb3JtLXVybGVuY29kZWQnO1xufVxuXG5mdW5jdGlvbiBpc0ltYWdlT3JWaWRlbyhtaW1lKSB7XG4gIGxldCB0eXBlID0gbWltZS5zcGxpdCgnLycpWzBdO1xuICBpZiAodHlwZSkgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKS50cmltKCk7XG5cbiAgcmV0dXJuIHR5cGUgPT09ICdpbWFnZScgfHwgdHlwZSA9PT0gJ3ZpZGVvJztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBgbWltZWAgaXMganNvbiBvciBoYXMgK2pzb24gc3RydWN0dXJlZCBzeW50YXggc3VmZml4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtaW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNKU09OKG1pbWUpIHtcbiAgLy8gc2hvdWxkIG1hdGNoIC9qc29uIG9yICtqc29uXG4gIC8vIGJ1dCBub3QgL2pzb24tc2VxXG4gIHJldHVybiAvWy8rXWpzb24oJHxbXi1cXHddKS9pLnRlc3QobWltZSk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgd2Ugc2hvdWxkIGZvbGxvdyB0aGUgcmVkaXJlY3QgYGNvZGVgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNSZWRpcmVjdChjb2RlKSB7XG4gIHJldHVybiBbMzAxLCAzMDIsIDMwMywgMzA1LCAzMDcsIDMwOF0uaW5jbHVkZXMoY29kZSk7XG59XG4iXX0=

/***/ }),

/***/ 4433:
/***/ ((module) => {

"use strict";


module.exports = function (res, fn) {
  var data = []; // Binary data needs binary storage

  res.on('data', function (chunk) {
    data.push(chunk);
  });
  res.on('end', function () {
    fn(null, Buffer.concat(data));
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3BhcnNlcnMvaW1hZ2UuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInJlcyIsImZuIiwiZGF0YSIsIm9uIiwiY2h1bmsiLCJwdXNoIiwiQnVmZmVyIiwiY29uY2F0Il0sIm1hcHBpbmdzIjoiOztBQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUIsVUFBQ0MsR0FBRCxFQUFNQyxFQUFOLEVBQWE7QUFDNUIsTUFBTUMsSUFBSSxHQUFHLEVBQWIsQ0FENEIsQ0FDWDs7QUFFakJGLEVBQUFBLEdBQUcsQ0FBQ0csRUFBSixDQUFPLE1BQVAsRUFBZSxVQUFDQyxLQUFELEVBQVc7QUFDeEJGLElBQUFBLElBQUksQ0FBQ0csSUFBTCxDQUFVRCxLQUFWO0FBQ0QsR0FGRDtBQUdBSixFQUFBQSxHQUFHLENBQUNHLEVBQUosQ0FBTyxLQUFQLEVBQWMsWUFBTTtBQUNsQkYsSUFBQUEsRUFBRSxDQUFDLElBQUQsRUFBT0ssTUFBTSxDQUFDQyxNQUFQLENBQWNMLElBQWQsQ0FBUCxDQUFGO0FBQ0QsR0FGRDtBQUdELENBVEQiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IChyZXMsIGZuKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSBbXTsgLy8gQmluYXJ5IGRhdGEgbmVlZHMgYmluYXJ5IHN0b3JhZ2VcblxuICByZXMub24oJ2RhdGEnLCAoY2h1bmspID0+IHtcbiAgICBkYXRhLnB1c2goY2h1bmspO1xuICB9KTtcbiAgcmVzLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgZm4obnVsbCwgQnVmZmVyLmNvbmNhdChkYXRhKSk7XG4gIH0pO1xufTtcbiJdfQ==

/***/ }),

/***/ 913:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


exports["application/x-www-form-urlencoded"] = __nccwpck_require__(9073);
exports["application/json"] = __nccwpck_require__(2075);
exports.text = __nccwpck_require__(1715);

var binary = __nccwpck_require__(4433);

exports["application/octet-stream"] = binary;
exports["application/pdf"] = binary;
exports.image = binary;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3BhcnNlcnMvaW5kZXguanMiXSwibmFtZXMiOlsiZXhwb3J0cyIsInJlcXVpcmUiLCJ0ZXh0IiwiYmluYXJ5IiwiaW1hZ2UiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU8sQ0FBQyxtQ0FBRCxDQUFQLEdBQStDQyxPQUFPLENBQUMsY0FBRCxDQUF0RDtBQUNBRCxPQUFPLENBQUMsa0JBQUQsQ0FBUCxHQUE4QkMsT0FBTyxDQUFDLFFBQUQsQ0FBckM7QUFDQUQsT0FBTyxDQUFDRSxJQUFSLEdBQWVELE9BQU8sQ0FBQyxRQUFELENBQXRCOztBQUVBLElBQU1FLE1BQU0sR0FBR0YsT0FBTyxDQUFDLFNBQUQsQ0FBdEI7O0FBRUFELE9BQU8sQ0FBQywwQkFBRCxDQUFQLEdBQXNDRyxNQUF0QztBQUNBSCxPQUFPLENBQUMsaUJBQUQsQ0FBUCxHQUE2QkcsTUFBN0I7QUFDQUgsT0FBTyxDQUFDSSxLQUFSLEdBQWdCRCxNQUFoQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHNbJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCddID0gcmVxdWlyZSgnLi91cmxlbmNvZGVkJyk7XG5leHBvcnRzWydhcHBsaWNhdGlvbi9qc29uJ10gPSByZXF1aXJlKCcuL2pzb24nKTtcbmV4cG9ydHMudGV4dCA9IHJlcXVpcmUoJy4vdGV4dCcpO1xuXG5jb25zdCBiaW5hcnkgPSByZXF1aXJlKCcuL2ltYWdlJyk7XG5cbmV4cG9ydHNbJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSddID0gYmluYXJ5O1xuZXhwb3J0c1snYXBwbGljYXRpb24vcGRmJ10gPSBiaW5hcnk7XG5leHBvcnRzLmltYWdlID0gYmluYXJ5O1xuIl19

/***/ }),

/***/ 2075:
/***/ ((module) => {

"use strict";


module.exports = function (res, fn) {
  res.text = '';
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    res.text += chunk;
  });
  res.on('end', function () {
    var body;
    var err;

    try {
      body = res.text && JSON.parse(res.text);
    } catch (err_) {
      err = err_; // issue #675: return the raw response if the response parsing fails

      err.rawResponse = res.text || null; // issue #876: return the http status code if the response parsing fails

      err.statusCode = res.statusCode;
    } finally {
      fn(err, body);
    }
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3BhcnNlcnMvanNvbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwicmVzIiwiZm4iLCJ0ZXh0Iiwic2V0RW5jb2RpbmciLCJvbiIsImNodW5rIiwiYm9keSIsImVyciIsIkpTT04iLCJwYXJzZSIsImVycl8iLCJyYXdSZXNwb25zZSIsInN0YXR1c0NvZGUiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixVQUFVQyxHQUFWLEVBQWVDLEVBQWYsRUFBbUI7QUFDbENELEVBQUFBLEdBQUcsQ0FBQ0UsSUFBSixHQUFXLEVBQVg7QUFDQUYsRUFBQUEsR0FBRyxDQUFDRyxXQUFKLENBQWdCLE1BQWhCO0FBQ0FILEVBQUFBLEdBQUcsQ0FBQ0ksRUFBSixDQUFPLE1BQVAsRUFBZSxVQUFDQyxLQUFELEVBQVc7QUFDeEJMLElBQUFBLEdBQUcsQ0FBQ0UsSUFBSixJQUFZRyxLQUFaO0FBQ0QsR0FGRDtBQUdBTCxFQUFBQSxHQUFHLENBQUNJLEVBQUosQ0FBTyxLQUFQLEVBQWMsWUFBTTtBQUNsQixRQUFJRSxJQUFKO0FBQ0EsUUFBSUMsR0FBSjs7QUFDQSxRQUFJO0FBQ0ZELE1BQUFBLElBQUksR0FBR04sR0FBRyxDQUFDRSxJQUFKLElBQVlNLElBQUksQ0FBQ0MsS0FBTCxDQUFXVCxHQUFHLENBQUNFLElBQWYsQ0FBbkI7QUFDRCxLQUZELENBRUUsT0FBT1EsSUFBUCxFQUFhO0FBQ2JILE1BQUFBLEdBQUcsR0FBR0csSUFBTixDQURhLENBRWI7O0FBQ0FILE1BQUFBLEdBQUcsQ0FBQ0ksV0FBSixHQUFrQlgsR0FBRyxDQUFDRSxJQUFKLElBQVksSUFBOUIsQ0FIYSxDQUliOztBQUNBSyxNQUFBQSxHQUFHLENBQUNLLFVBQUosR0FBaUJaLEdBQUcsQ0FBQ1ksVUFBckI7QUFDRCxLQVJELFNBUVU7QUFDUlgsTUFBQUEsRUFBRSxDQUFDTSxHQUFELEVBQU1ELElBQU4sQ0FBRjtBQUNEO0FBQ0YsR0FkRDtBQWVELENBckJEIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocmVzLCBmbikge1xuICByZXMudGV4dCA9ICcnO1xuICByZXMuc2V0RW5jb2RpbmcoJ3V0ZjgnKTtcbiAgcmVzLm9uKCdkYXRhJywgKGNodW5rKSA9PiB7XG4gICAgcmVzLnRleHQgKz0gY2h1bms7XG4gIH0pO1xuICByZXMub24oJ2VuZCcsICgpID0+IHtcbiAgICBsZXQgYm9keTtcbiAgICBsZXQgZXJyO1xuICAgIHRyeSB7XG4gICAgICBib2R5ID0gcmVzLnRleHQgJiYgSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgfSBjYXRjaCAoZXJyXykge1xuICAgICAgZXJyID0gZXJyXztcbiAgICAgIC8vIGlzc3VlICM2NzU6IHJldHVybiB0aGUgcmF3IHJlc3BvbnNlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICBlcnIucmF3UmVzcG9uc2UgPSByZXMudGV4dCB8fCBudWxsO1xuICAgICAgLy8gaXNzdWUgIzg3NjogcmV0dXJuIHRoZSBodHRwIHN0YXR1cyBjb2RlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICBlcnIuc3RhdHVzQ29kZSA9IHJlcy5zdGF0dXNDb2RlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBmbihlcnIsIGJvZHkpO1xuICAgIH1cbiAgfSk7XG59O1xuIl19

/***/ }),

/***/ 1715:
/***/ ((module) => {

"use strict";


module.exports = function (res, fn) {
  res.text = '';
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    res.text += chunk;
  });
  res.on('end', fn);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3BhcnNlcnMvdGV4dC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwicmVzIiwiZm4iLCJ0ZXh0Iiwic2V0RW5jb2RpbmciLCJvbiIsImNodW5rIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUIsVUFBQ0MsR0FBRCxFQUFNQyxFQUFOLEVBQWE7QUFDNUJELEVBQUFBLEdBQUcsQ0FBQ0UsSUFBSixHQUFXLEVBQVg7QUFDQUYsRUFBQUEsR0FBRyxDQUFDRyxXQUFKLENBQWdCLE1BQWhCO0FBQ0FILEVBQUFBLEdBQUcsQ0FBQ0ksRUFBSixDQUFPLE1BQVAsRUFBZSxVQUFDQyxLQUFELEVBQVc7QUFDeEJMLElBQUFBLEdBQUcsQ0FBQ0UsSUFBSixJQUFZRyxLQUFaO0FBQ0QsR0FGRDtBQUdBTCxFQUFBQSxHQUFHLENBQUNJLEVBQUosQ0FBTyxLQUFQLEVBQWNILEVBQWQ7QUFDRCxDQVBEIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAocmVzLCBmbikgPT4ge1xuICByZXMudGV4dCA9ICcnO1xuICByZXMuc2V0RW5jb2RpbmcoJ3V0ZjgnKTtcbiAgcmVzLm9uKCdkYXRhJywgKGNodW5rKSA9PiB7XG4gICAgcmVzLnRleHQgKz0gY2h1bms7XG4gIH0pO1xuICByZXMub24oJ2VuZCcsIGZuKTtcbn07XG4iXX0=

/***/ }),

/***/ 9073:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/**
 * Module dependencies.
 */
var qs = __nccwpck_require__(7119);

module.exports = function (res, fn) {
  res.text = '';
  res.setEncoding('ascii');
  res.on('data', function (chunk) {
    res.text += chunk;
  });
  res.on('end', function () {
    try {
      fn(null, qs.parse(res.text));
    } catch (err) {
      fn(err);
    }
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3BhcnNlcnMvdXJsZW5jb2RlZC5qcyJdLCJuYW1lcyI6WyJxcyIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVzIiwiZm4iLCJ0ZXh0Iiwic2V0RW5jb2RpbmciLCJvbiIsImNodW5rIiwicGFyc2UiLCJlcnIiXSwibWFwcGluZ3MiOiI7O0FBQUE7OztBQUlBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBRUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixVQUFDQyxHQUFELEVBQU1DLEVBQU4sRUFBYTtBQUM1QkQsRUFBQUEsR0FBRyxDQUFDRSxJQUFKLEdBQVcsRUFBWDtBQUNBRixFQUFBQSxHQUFHLENBQUNHLFdBQUosQ0FBZ0IsT0FBaEI7QUFDQUgsRUFBQUEsR0FBRyxDQUFDSSxFQUFKLENBQU8sTUFBUCxFQUFlLFVBQUNDLEtBQUQsRUFBVztBQUN4QkwsSUFBQUEsR0FBRyxDQUFDRSxJQUFKLElBQVlHLEtBQVo7QUFDRCxHQUZEO0FBR0FMLEVBQUFBLEdBQUcsQ0FBQ0ksRUFBSixDQUFPLEtBQVAsRUFBYyxZQUFNO0FBQ2xCLFFBQUk7QUFDRkgsTUFBQUEsRUFBRSxDQUFDLElBQUQsRUFBT0wsRUFBRSxDQUFDVSxLQUFILENBQVNOLEdBQUcsQ0FBQ0UsSUFBYixDQUFQLENBQUY7QUFDRCxLQUZELENBRUUsT0FBT0ssR0FBUCxFQUFZO0FBQ1pOLE1BQUFBLEVBQUUsQ0FBQ00sR0FBRCxDQUFGO0FBQ0Q7QUFDRixHQU5EO0FBT0QsQ0FiRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5jb25zdCBxcyA9IHJlcXVpcmUoJ3FzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcywgZm4pID0+IHtcbiAgcmVzLnRleHQgPSAnJztcbiAgcmVzLnNldEVuY29kaW5nKCdhc2NpaScpO1xuICByZXMub24oJ2RhdGEnLCAoY2h1bmspID0+IHtcbiAgICByZXMudGV4dCArPSBjaHVuaztcbiAgfSk7XG4gIHJlcy5vbignZW5kJywgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBmbihudWxsLCBxcy5wYXJzZShyZXMudGV4dCkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZm4oZXJyKTtcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==

/***/ }),

/***/ 9660:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/**
 * Module dependencies.
 */
var util = __nccwpck_require__(1669);

var Stream = __nccwpck_require__(2413);

var ResponseBase = __nccwpck_require__(8637);
/**
 * Expose `Response`.
 */


module.exports = Response;
/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * @param {Request} req
 * @param {Object} options
 * @constructor
 * @extends {Stream}
 * @implements {ReadableStream}
 * @api private
 */

function Response(req) {
  Stream.call(this);
  this.res = req.res;
  var res = this.res;
  this.request = req;
  this.req = req.req;
  this.text = res.text;
  this.body = res.body === undefined ? {} : res.body;
  this.files = res.files || {};
  this.buffered = req._resBuffered;
  this.headers = res.headers;
  this.header = this.headers;

  this._setStatusProperties(res.statusCode);

  this._setHeaderProperties(this.header);

  this.setEncoding = res.setEncoding.bind(res);
  res.on('data', this.emit.bind(this, 'data'));
  res.on('end', this.emit.bind(this, 'end'));
  res.on('close', this.emit.bind(this, 'close'));
  res.on('error', this.emit.bind(this, 'error'));
}
/**
 * Inherit from `Stream`.
 */


util.inherits(Response, Stream); // eslint-disable-next-line new-cap

ResponseBase(Response.prototype);
/**
 * Implements methods of a `ReadableStream`
 */

Response.prototype.destroy = function (err) {
  this.res.destroy(err);
};
/**
 * Pause.
 */


Response.prototype.pause = function () {
  this.res.pause();
};
/**
 * Resume.
 */


Response.prototype.resume = function () {
  this.res.resume();
};
/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */


Response.prototype.toError = function () {
  var req = this.req;
  var method = req.method;
  var path = req.path;
  var msg = "cannot ".concat(method, " ").concat(path, " (").concat(this.status, ")");
  var err = new Error(msg);
  err.status = this.status;
  err.text = this.text;
  err.method = method;
  err.path = path;
  return err;
};

Response.prototype.setStatusProperties = function (status) {
  console.warn('In superagent 2.x setStatusProperties is a private method');
  return this._setStatusProperties(status);
};
/**
 * To json.
 *
 * @return {Object}
 * @api public
 */


Response.prototype.toJSON = function () {
  return {
    req: this.request.toJSON(),
    header: this.header,
    status: this.status,
    text: this.text
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlL3Jlc3BvbnNlLmpzIl0sIm5hbWVzIjpbInV0aWwiLCJyZXF1aXJlIiwiU3RyZWFtIiwiUmVzcG9uc2VCYXNlIiwibW9kdWxlIiwiZXhwb3J0cyIsIlJlc3BvbnNlIiwicmVxIiwiY2FsbCIsInJlcyIsInJlcXVlc3QiLCJ0ZXh0IiwiYm9keSIsInVuZGVmaW5lZCIsImZpbGVzIiwiYnVmZmVyZWQiLCJfcmVzQnVmZmVyZWQiLCJoZWFkZXJzIiwiaGVhZGVyIiwiX3NldFN0YXR1c1Byb3BlcnRpZXMiLCJzdGF0dXNDb2RlIiwiX3NldEhlYWRlclByb3BlcnRpZXMiLCJzZXRFbmNvZGluZyIsImJpbmQiLCJvbiIsImVtaXQiLCJpbmhlcml0cyIsInByb3RvdHlwZSIsImRlc3Ryb3kiLCJlcnIiLCJwYXVzZSIsInJlc3VtZSIsInRvRXJyb3IiLCJtZXRob2QiLCJwYXRoIiwibXNnIiwic3RhdHVzIiwiRXJyb3IiLCJzZXRTdGF0dXNQcm9wZXJ0aWVzIiwiY29uc29sZSIsIndhcm4iLCJ0b0pTT04iXSwibWFwcGluZ3MiOiI7O0FBQUE7OztBQUlBLElBQU1BLElBQUksR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUF0Qjs7QUFDQSxJQUFNRSxZQUFZLEdBQUdGLE9BQU8sQ0FBQyxrQkFBRCxDQUE1QjtBQUVBOzs7OztBQUlBRyxNQUFNLENBQUNDLE9BQVAsR0FBaUJDLFFBQWpCO0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsU0FBU0EsUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUI7QUFDckJMLEVBQUFBLE1BQU0sQ0FBQ00sSUFBUCxDQUFZLElBQVo7QUFDQSxPQUFLQyxHQUFMLEdBQVdGLEdBQUcsQ0FBQ0UsR0FBZjtBQUZxQixNQUdiQSxHQUhhLEdBR0wsSUFISyxDQUdiQSxHQUhhO0FBSXJCLE9BQUtDLE9BQUwsR0FBZUgsR0FBZjtBQUNBLE9BQUtBLEdBQUwsR0FB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LFVBQVVGLE1BQVYsRUFBa0I7QUFDekRHLEVBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLDJEQUFiO0FBQ0EsU0FBTyxLQUFLckIsb0JBQUwsQ0FBMEJpQixNQUExQixDQUFQO0FBQ0QsQ0FIRDtBQUtBOzs7Ozs7OztBQU9BOUIsUUFBUSxDQUFDcUIsU0FBVCxDQUFtQmMsTUFBbkIsR0FBNEIsWUFBWTtBQUN0QyxTQUFPO0FBQ0xsQyxJQUFBQSxHQUFHLEVBQUUsS0FBS0csT0FBTCxDQUFhK0IsTUFBYixFQURBO0FBRUx2QixJQUFBQSxNQUFNLEVBQUUsS0FBS0EsTUFGUjtBQUdMa0IsSUFBQUEsTUFBTSxFQUFFLEtBQUtBLE1BSFI7QUFJTHpCLElBQUFBLElBQUksRUFBRSxLQUFLQTtBQUpOLEdBQVA7QUFNRCxDQVBEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCBTdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKTtcbmNvbnN0IFJlc3BvbnNlQmFzZSA9IHJlcXVpcmUoJy4uL3Jlc3BvbnNlLWJhc2UnKTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlc3BvbnNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbnNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBgeGhyYC5cbiAqXG4gKiAgLSBzZXQgZmxhZ3MgKC5vaywgLmVycm9yLCBldGMpXG4gKiAgLSBwYXJzZSBoZWFkZXJcbiAqXG4gKiBAcGFyYW0ge1JlcXVlc3R9IHJlcVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMge1N0cmVhbX1cbiAqIEBpbXBsZW1lbnRzIHtSZWFkYWJsZVN0cmVhbX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlKHJlcSkge1xuICBTdHJlYW0uY2FsbCh0aGlzKTtcbiAgdGhpcy5yZXMgPSByZXEucmVzO1xuICBjb25zdCB7IHJlcyB9ID0gdGhpcztcbiAgdGhpcy5yZXF1ZXN0ID0gcmVxO1xuICB0aGlzLnJlcSA9IHJlcS5yZXE7XG4gIHRoaXMudGV4dCA9IHJlcy50ZXh0O1xuICB0aGlzLmJvZHkgPSByZXMuYm9keSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXMuYm9keTtcbiAgdGhpcy5maWxlcyA9IHJlcy5maWxlcyB8fCB7fTtcbiAgdGhpcy5idWZmZXJlZCA9IHJlcS5fcmVzQnVmZmVyZWQ7XG4gIHRoaXMuaGVhZGVycyA9IHJlcy5oZWFkZXJzO1xuICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVycztcbiAgdGhpcy5fc2V0U3RhdHVzUHJvcGVydGllcyhyZXMuc3RhdHVzQ29kZSk7XG4gIHRoaXMuX3NldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuICB0aGlzLnNldEVuY29kaW5nID0gcmVzLnNldEVuY29kaW5nLmJpbmQocmVzKTtcbiAgcmVzLm9uKCdkYXRhJywgdGhpcy5lbWl0LmJpbmQodGhpcywgJ2RhdGEnKSk7XG4gIHJlcy5vbignZW5kJywgdGhpcy5lbWl0LmJpbmQodGhpcywgJ2VuZCcpKTtcbiAgcmVzLm9uKCdjbG9zZScsIHRoaXMuZW1pdC5iaW5kKHRoaXMsICdjbG9zZScpKTtcbiAgcmVzLm9uKCdlcnJvcicsIHRoaXMuZW1pdC5iaW5kKHRoaXMsICdlcnJvcicpKTtcbn1cblxuLyoqXG4gKiBJbmhlcml0IGZyb20gYFN0cmVhbWAuXG4gKi9cblxudXRpbC5pbmhlcml0cyhSZXNwb25zZSwgU3RyZWFtKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXG5SZXNwb25zZUJhc2UoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuLyoqXG4gKiBJbXBsZW1lbnRzIG1ldGhvZHMgb2YgYSBgUmVhZGFibGVTdHJlYW1gXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIHRoaXMucmVzLmRlc3Ryb3koZXJyKTtcbn07XG5cbi8qKlxuICogUGF1c2UuXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlcy5wYXVzZSgpO1xufTtcblxuLyoqXG4gKiBSZXN1bWUuXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZXMucmVzdW1lKCk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhbiBgRXJyb3JgIHJlcHJlc2VudGF0aXZlIG9mIHRoaXMgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybiB7RXJyb3J9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS50b0Vycm9yID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCB7IHJlcSB9ID0gdGhpcztcbiAgY29uc3QgeyBtZXRob2QgfSA9IHJlcTtcbiAgY29uc3QgeyBwYXRoIH0gPSByZXE7XG5cbiAgY29uc3QgbXNnID0gYGNhbm5vdCAke21ldGhvZH0gJHtwYXRofSAoJHt0aGlzLnN0YXR1c30pYDtcbiAgY29uc3QgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLnRleHQgPSB0aGlzLnRleHQ7XG4gIGVyci5tZXRob2QgPSBtZXRob2Q7XG4gIGVyci5wYXRoID0gcGF0aDtcblxuICByZXR1cm4gZXJyO1xufTtcblxuUmVzcG9uc2UucHJvdG90eXBlLnNldFN0YXR1c1Byb3BlcnRpZXMgPSBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gIGNvbnNvbGUud2FybignSW4gc3VwZXJhZ2VudCAyLnggc2V0U3RhdHVzUHJvcGVydGllcyBpcyBhIHByaXZhdGUgbWV0aG9kJyk7XG4gIHJldHVybiB0aGlzLl9zZXRTdGF0dXNQcm9wZXJ0aWVzKHN0YXR1cyk7XG59O1xuXG4vKipcbiAqIFRvIGpzb24uXG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHJlcTogdGhpcy5yZXF1ZXN0LnRvSlNPTigpLFxuICAgIGhlYWRlcjogdGhpcy5oZWFkZXIsXG4gICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICB0ZXh0OiB0aGlzLnRleHRcbiAgfTtcbn07XG4iXX0=

/***/ }),

/***/ 7060:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


/**
 * Module dependencies.
 */
var _require = __nccwpck_require__(4304),
    StringDecoder = _require.StringDecoder;

var Stream = __nccwpck_require__(2413);

var zlib = __nccwpck_require__(8761);
/**
 * Buffers response data events and re-emits when they're unzipped.
 *
 * @param {Request} req
 * @param {Response} res
 * @api private
 */


exports.unzip = function (req, res) {
  var unzip = zlib.createUnzip();
  var stream = new Stream();
  var decoder; // make node responseOnEnd() happy

  stream.req = req;
  unzip.on('error', function (err) {
    if (err && err.code === 'Z_BUF_ERROR') {
      // unexpected end of file is ignored by browsers and curl
      stream.emit('end');
      return;
    }

    stream.emit('error', err);
  }); // pipe to unzip

  res.pipe(unzip); // override `setEncoding` to capture encoding

  res.setEncoding = function (type) {
    decoder = new StringDecoder(type);
  }; // decode upon decompressing with captured encoding


  unzip.on('data', function (buf) {
    if (decoder) {
      var str = decoder.write(buf);
      if (str.length > 0) stream.emit('data', str);
    } else {
      stream.emit('data', buf);
    }
  });
  unzip.on('end', function () {
    stream.emit('end');
  }); // override `on` to capture data listeners

  var _on = res.on;

  res.on = function (type, fn) {
    if (type === 'data' || type === 'end') {
      stream.on(type, fn.bind(res));
    } else if (type === 'error') {
      stream.on(type, fn.bind(res));

      _on.call(res, type, fn);
    } else {
      _on.call(res, type, fn);
    }

    return this;
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlL3VuemlwLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTdHJpbmdEZWNvZGVyIiwiU3RyZWFtIiwiemxpYiIsImV4cG9ydHMiLCJ1bnppcCIsInJlcSIsInJlcyIsImNyZWF0ZVVuemlwIiwic3RyZWFtIiwiZGVjb2RlciIsIm9uIiwiZXJyIiwiY29kZSIsImVtaXQiLCJwaXBlIiwic2V0RW5jb2RpbmciLCJ0eXBlIiwiYnVmIiwic3RyIiwid3JpdGUiLCJsZW5ndGgiLCJfb24iLCJmbiIsImJpbmQiLCJjYWxsIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7ZUFJMEJBLE9BQU8sQ0FBQyxnQkFBRCxDO0lBQXpCQyxhLFlBQUFBLGE7O0FBQ1IsSUFBTUMsTUFBTSxHQUFHRixPQUFPLENBQUMsUUFBRCxDQUF0Qjs7QUFDQSxJQUFNRyxJQUFJLEdBQUdILE9BQU8sQ0FBQyxNQUFELENBQXBCO0FBRUE7Ozs7Ozs7OztBQVFBSSxPQUFPLENBQUNDLEtBQVIsR0FBZ0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDNUIsTUFBTUYsS0FBSyxHQUFHRixJQUFJLENBQUNLLFdBQUwsRUFBZDtBQUNBLE1BQU1DLE1BQU0sR0FBRyxJQUFJUCxNQUFKLEVBQWY7QUFDQSxNQUFJUSxPQUFKLENBSDRCLENBSzVCOztBQUNBRCxFQUFBQSxNQUFNLENBQUNILEdBQVAsR0FBYUEsR0FBYjtBQUVBRCxFQUFBQSxLQUFLLENBQUNNLEVBQU4sQ0FBUyxPQUFULEVBQWtCLFVBQUNDLEdBQUQsRUFBUztBQUN6QixRQUFJQSxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsSUFBSixLQUFhLGFBQXhCLEVBQXVDO0FBQ3JDO0FBQ0FKLE1BQUFBLE1BQU0sQ0FBQ0ssSUFBUCxDQUFZLEtBQVo7QUFDQTtBQUNEOztBQUVETCxJQUFBQSxNQUFNLENBQUNLLElBQVAsQ0FBWSxPQUFaLEVBQXFCRixHQUFyQjtBQUNELEdBUkQsRUFSNEIsQ0FrQjVCOztBQUNBTCxFQUFBQSxHQUFHLENBQUNRLElBQUosQ0FBU1YsS0FBVCxFQW5CNEIsQ0FxQjVCOztBQUNBRSxFQUFBQSxHQUFHLENBQUNTLFdBQUosR0FBa0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzFCUCxJQUFBQSxPQUFPLEdBQUcsSUFBSVQsYUFBSixDQUFrQmdCLElBQWxCLENBQVY7QUFDRCxHQUZELENBdEI0QixDQTBCNUI7OztBQUNBWixFQUFBQSxLQUFLLENBQUNNLEVBQU4sQ0FBUyxNQUFULEVBQWlCLFVBQUNPLEdBQUQsRUFBUztBQUN4QixRQUFJUixPQUFKLEVBQWE7QUFDWCxVQUFNUyxHQUFHLEdBQUdULE9BQU8sQ0FBQ1UsS0FBUixDQUFjRixHQUFkLENBQVo7QUFDQSxVQUFJQyxHQUFHLENBQUNFLE1BQUosR0FBYSxDQUFqQixFQUFvQlosTUFBTSxDQUFDSyxJQUFQLENBQVksTUFBWixFQUFvQkssR0FBcEI7QUFDckIsS0FIRCxNQUdPO0FBQ0xWLE1BQUFBLE1BQU0sQ0FBQ0ssSUFBUCxDQUFZLE1BQVosRUFBb0JJLEdBQXBCO0FBQ0Q7QUFDRixHQVBEO0FBU0FiLEVBQUFBLEtBQUssQ0FBQ00sRUFBTixDQUFTLEtBQVQsRUFBZ0IsWUFBTTtBQUNwQkYsSUFBQUEsTUFBTSxDQUFDSyxJQUFQLENBQVksS0FBWjtBQUNELEdBRkQsRUFwQzRCLENBd0M1Qjs7QUFDQSxNQUFNUSxHQUFHLEdBQUdmLEdBQUcsQ0FBQ0ksRUFBaEI7O0FBQ0FKLEVBQUFBLEdBQUcsQ0FBQ0ksRUFBSixHQUFTLFVBQVVNLElBQVYsRUFBZ0JNLEVBQWhCLEVBQW9CO0FBQzNCLFFBQUlOLElBQUksS0FBSyxNQUFULElBQW1CQSxJQUFJLEtBQUssS0FBaEMsRUFBdUM7QUFDckNSLE1BQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVTSxJQUFWLEVBQWdCTSxFQUFFLENBQUNDLElBQUgsQ0FBUWpCLEdBQVIsQ0FBaEI7QUFDRCxLQUZELE1BRU8sSUFBSVUsSUFBSSxLQUFLLE9BQWIsRUFBc0I7QUFDM0JSLE1BQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVTSxJQUFWLEVBQWdCTSxFQUFFLENBQUNDLElBQUgsQ0FBUWpCLEdBQVIsQ0FBaEI7O0FBQ0FlLE1BQUFBLEdBQUcsQ0FBQ0csSUFBSixDQUFTbEIsR0FBVCxFQUFjVSxJQUFkLEVBQW9CTSxFQUFwQjtBQUNELEtBSE0sTUFHQTtBQUNMRCxNQUFBQSxHQUFHLENBQUNHLElBQUosQ0FBU2xCLEdBQVQsRUFBY1UsSUFBZCxFQUFvQk0sRUFBcEI7QUFDRDs7QUFFRCxXQUFPLElBQVA7QUFDRCxHQVhEO0FBWUQsQ0F0REQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuY29uc3QgeyBTdHJpbmdEZWNvZGVyIH0gPSByZXF1aXJlKCdzdHJpbmdfZGVjb2RlcicpO1xuY29uc3QgU3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5jb25zdCB6bGliID0gcmVxdWlyZSgnemxpYicpO1xuXG4vKipcbiAqIEJ1ZmZlcnMgcmVzcG9uc2UgZGF0YSBldmVudHMgYW5kIHJlLWVtaXRzIHdoZW4gdGhleSdyZSB1bnppcHBlZC5cbiAqXG4gKiBAcGFyYW0ge1JlcXVlc3R9IHJlcVxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnVuemlwID0gKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHVuemlwID0gemxpYi5jcmVhdGVVbnppcCgpO1xuICBjb25zdCBzdHJlYW0gPSBuZXcgU3RyZWFtKCk7XG4gIGxldCBkZWNvZGVyO1xuXG4gIC8vIG1ha2Ugbm9kZSByZXNwb25zZU9uRW5kKCkgaGFwcHlcbiAgc3RyZWFtLnJlcSA9IHJlcTtcblxuICB1bnppcC5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVyciAmJiBlcnIuY29kZSA9PT0gJ1pfQlVGX0VSUk9SJykge1xuICAgICAgLy8gdW5leHBlY3RlZCBlbmQgb2YgZmlsZSBpcyBpZ25vcmVkIGJ5IGJyb3dzZXJzIGFuZCBjdXJsXG4gICAgICBzdHJlYW0uZW1pdCgnZW5kJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfSk7XG5cbiAgLy8gcGlwZSB0byB1bnppcFxuICByZXMucGlwZSh1bnppcCk7XG5cbiAgLy8gb3ZlcnJpZGUgYHNldEVuY29kaW5nYCB0byBjYXB0dXJlIGVuY29kaW5nXG4gIHJlcy5zZXRFbmNvZGluZyA9ICh0eXBlKSA9PiB7XG4gICAgZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKHR5cGUpO1xuICB9O1xuXG4gIC8vIGRlY29kZSB1cG9uIGRlY29tcHJlc3Npbmcgd2l0aCBjYXB0dXJlZCBlbmNvZGluZ1xuICB1bnppcC5vbignZGF0YScsIChidWYpID0+IHtcbiAgICBpZiAoZGVjb2Rlcikge1xuICAgICAgY29uc3Qgc3RyID0gZGVjb2Rlci53cml0ZShidWYpO1xuICAgICAgaWYgKHN0ci5sZW5ndGggPiAwKSBzdHJlYW0uZW1pdCgnZGF0YScsIHN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0cmVhbS5lbWl0KCdkYXRhJywgYnVmKTtcbiAgICB9XG4gIH0pO1xuXG4gIHVuemlwLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgc3RyZWFtLmVtaXQoJ2VuZCcpO1xuICB9KTtcblxuICAvLyBvdmVycmlkZSBgb25gIHRvIGNhcHR1cmUgZGF0YSBsaXN0ZW5lcnNcbiAgY29uc3QgX29uID0gcmVzLm9uO1xuICByZXMub24gPSBmdW5jdGlvbiAodHlwZSwgZm4pIHtcbiAgICBpZiAodHlwZSA9PT0gJ2RhdGEnIHx8IHR5cGUgPT09ICdlbmQnKSB7XG4gICAgICBzdHJlYW0ub24odHlwZSwgZm4uYmluZChyZXMpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgIHN0cmVhbS5vbih0eXBlLCBmbi5iaW5kKHJlcykpO1xuICAgICAgX29uLmNhbGwocmVzLCB0eXBlLCBmbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9vbi5jYWxsKHJlcywgdHlwZSwgZm4pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xufTtcbiJdfQ==

/***/ }),

/***/ 9723:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = __nccwpck_require__(5960);
/**
 * Expose `RequestBase`.
 */


module.exports = RequestBase;
/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(object) {
  if (object) return mixin(object);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(object) {
  for (var key in RequestBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(RequestBase.prototype, key)) object[key] = RequestBase.prototype[key];
  }

  return object;
}
/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.clearTimeout = function () {
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  clearTimeout(this._uploadTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  delete this._uploadTimeoutTimer;
  return this;
};
/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.parse = function (fn) {
  this._parser = fn;
  return this;
};
/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.responseType = function (value) {
  this._responseType = value;
  return this;
};
/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.serialize = function (fn) {
  this._serializer = fn;
  return this;
};
/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 * - upload is the time  since last bit of data was sent or received. This timeout works only if deadline timeout is off
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.timeout = function (options) {
  if (!options || _typeof(options) !== 'object') {
    this._timeout = options;
    this._responseTimeout = 0;
    this._uploadTimeout = 0;
    return this;
  }

  for (var option in options) {
    if (Object.prototype.hasOwnProperty.call(options, option)) {
      switch (option) {
        case 'deadline':
          this._timeout = options.deadline;
          break;

        case 'response':
          this._responseTimeout = options.response;
          break;

        case 'upload':
          this._uploadTimeout = options.upload;
          break;

        default:
          console.warn('Unknown timeout option', option);
      }
    }
  }

  return this;
};
/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.retry = function (count, fn) {
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
}; //
// NOTE: we do not include ESOCKETTIMEDOUT because that is from `request` package
//       <https://github.com/sindresorhus/got/pull/537>
//
// NOTE: we do not include EADDRINFO because it was removed from libuv in 2014
//       <https://github.com/libuv/libuv/commit/02e1ebd40b807be5af46343ea873331b2ee4e9c1>
//       <https://github.com/request/request/search?q=ESOCKETTIMEDOUT&unscoped_q=ESOCKETTIMEDOUT>
//
//
// TODO: expose these as configurable defaults
//


var ERROR_CODES = new Set(['ETIMEDOUT', 'ECONNRESET', 'EADDRINUSE', 'ECONNREFUSED', 'EPIPE', 'ENOTFOUND', 'ENETUNREACH', 'EAI_AGAIN']);
var STATUS_CODES = new Set([408, 413, 429, 500, 502, 503, 504, 521, 522, 524]); // TODO: we would need to make this easily configurable before adding it in (e.g. some might want to add POST)
// const METHODS = new Set(['GET', 'PUT', 'HEAD', 'DELETE', 'OPTIONS', 'TRACE']);

/**
 * Determine if a request should be retried.
 * (Inspired by https://github.com/sindresorhus/got#retry)
 *
 * @param {Error} err an error
 * @param {Response} [res] response
 * @returns {Boolean} if segment should be retried
 */

RequestBase.prototype._shouldRetry = function (err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }

  if (this._retryCallback) {
    try {
      var override = this._retryCallback(err, res);

      if (override === true) return true;
      if (override === false) return false; // undefined falls back to defaults
    } catch (err_) {
      console.error(err_);
    }
  } // TODO: we would need to make this easily configurable before adding it in (e.g. some might want to add POST)

  /*
  if (
    this.req &&
    this.req.method &&
    !METHODS.has(this.req.method.toUpperCase())
  )
    return false;
  */


  if (res && res.status && STATUS_CODES.has(res.status)) return true;

  if (err) {
    if (err.code && ERROR_CODES.has(err.code)) return true; // Superagent timeout

    if (err.timeout && err.code === 'ECONNABORTED') return true;
    if (err.crossDomain) return true;
  }

  return false;
};
/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */


RequestBase.prototype._retry = function () {
  this.clearTimeout(); // node

  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;
  this.timedoutError = null;
  return this._end();
};
/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */


RequestBase.prototype.then = function (resolve, reject) {
  var _this = this;

  if (!this._fullfilledPromise) {
    var self = this;

    if (this._endCalled) {
      console.warn('Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises');
    }

    this._fullfilledPromise = new Promise(function (resolve, reject) {
      self.on('abort', function () {
        if (_this._maxRetries && _this._maxRetries > _this._retries) {
          return;
        }

        if (_this.timedout && _this.timedoutError) {
          reject(_this.timedoutError);
          return;
        }

        var err = new Error('Aborted');
        err.code = 'ABORTED';
        err.status = _this.status;
        err.method = _this.method;
        err.url = _this.url;
        reject(err);
      });
      self.end(function (err, res) {
        if (err) reject(err);else resolve(res);
      });
    });
  }

  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype.catch = function (cb) {
  return this.then(undefined, cb);
};
/**
 * Allow for extension
 */


RequestBase.prototype.use = function (fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function (cb) {
  if (typeof cb !== 'function') throw new Error('Callback required');
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function (res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};
/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


RequestBase.prototype.get = function (field) {
  return this._header[field.toLowerCase()];
};
/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */


RequestBase.prototype.getHeader = RequestBase.prototype.get;
/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function (field, value) {
  if (isObject(field)) {
    for (var key in field) {
      if (Object.prototype.hasOwnProperty.call(field, key)) this.set(key, field[key]);
    }

    return this;
  }

  this._header[field.toLowerCase()] = value;
  this.header[field] = value;
  return this;
};
/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field field name
 */


RequestBase.prototype.unset = function (field) {
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};
/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name name of field
 * @param {String|Blob|File|Buffer|fs.ReadStream} val value of field
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.field = function (name, value) {
  // name should be either a string or an object.
  if (name === null || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      if (Object.prototype.hasOwnProperty.call(name, key)) this.field(key, name[key]);
    }

    return this;
  }

  if (Array.isArray(value)) {
    for (var i in value) {
      if (Object.prototype.hasOwnProperty.call(value, i)) this.field(name, value[i]);
    }

    return this;
  } // val should be defined now


  if (value === null || undefined === value) {
    throw new Error('.field(name, val) val can not be empty');
  }

  if (typeof value === 'boolean') {
    value = String(value);
  }

  this._getFormData().append(name, value);

  return this;
};
/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request} request
 * @api public
 */


RequestBase.prototype.abort = function () {
  if (this._aborted) {
    return this;
  }

  this._aborted = true;
  if (this.xhr) this.xhr.abort(); // browser

  if (this.req) this.req.abort(); // node

  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', "Basic ".concat(base64Encoder("".concat(user, ":").concat(pass))));
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer':
      // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', "Bearer ".concat(user));
      break;

    default:
      break;
  }

  return this;
};
/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */


RequestBase.prototype.withCredentials = function (on) {
  // This is browser-only functionality. Node side is no-op.
  if (on === undefined) on = true;
  this._withCredentials = on;
  return this;
};
/**
 * Set the max redirects to `n`. Does nothing in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.redirects = function (n) {
  this._maxRedirects = n;
  return this;
};
/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n number of bytes
 * @return {Request} for chaining
 */


RequestBase.prototype.maxResponseSize = function (n) {
  if (typeof n !== 'number') {
    throw new TypeError('Invalid argument');
  }

  this._maxResponseSize = n;
  return this;
};
/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */


RequestBase.prototype.toJSON = function () {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};
/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */
// eslint-disable-next-line complexity


RequestBase.prototype.send = function (data) {
  var isObject_ = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject_ && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw new Error("Can't merge these send calls");
  } // merge


  if (isObject_ && isObject(this._data)) {
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) this._data[key] = data[key];
    }
  } else if (typeof data === 'string') {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if (type) type = type.toLowerCase().trim();

    if (type === 'application/x-www-form-urlencoded') {
      this._data = this._data ? "".concat(this._data, "&").concat(data) : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObject_ || this._isHost(data)) {
    return this;
  } // default to json


  if (!type) this.type('json');
  return this;
};
/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.sortQuery = function (sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};
/**
 * Compose querystring to append to req.url
 *
 * @api private
 */


RequestBase.prototype._finalizeQueryString = function () {
  var query = this._query.join('&');

  if (query) {
    this.url += (this.url.includes('?') ? '&' : '?') + query;
  }

  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');

    if (index >= 0) {
      var queryArray = this.url.slice(index + 1).split('&');

      if (typeof this._sort === 'function') {
        queryArray.sort(this._sort);
      } else {
        queryArray.sort();
      }

      this.url = this.url.slice(0, index) + '?' + queryArray.join('&');
    }
  }
}; // For backwards compat only


RequestBase.prototype._appendQueryString = function () {
  console.warn('Unsupported');
};
/**
 * Invoke callback with timeout error.
 *
 * @api private
 */


RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
  if (this._aborted) {
    return;
  }

  var err = new Error("".concat(reason + timeout, "ms exceeded"));
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.timedoutError = err;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function () {
  var self = this; // deadline

  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function () {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  } // response timeout


  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function () {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LWJhc2UuanMiXSwibmFtZXMiOlsiaXNPYmplY3QiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsIlJlcXVlc3RCYXNlIiwib2JqZWN0IiwibWl4aW4iLCJrZXkiLCJwcm90b3R5cGUiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJjbGVhclRpbWVvdXQiLCJfdGltZXIiLCJfcmVzcG9uc2VUaW1lb3V0VGltZXIiLCJfdXBsb2FkVGltZW91dFRpbWVyIiwicGFyc2UiLCJmbiIsIl9wYXJzZXIiLCJyZXNwb25zZVR5cGUiLCJ2YWx1ZSIsIl9yZXNwb25zZVR5cGUiLCJzZXJpYWxpemUiLCJfc2VyaWFsaXplciIsInRpbWVvdXQiLCJvcHRpb25zIiwiX3RpbWVvdXQiLCJfcmVzcG9uc2VUaW1lb3V0IiwiX3VwbG9hZFRpbWVvdXQiLCJvcHRpb24iLCJkZWFkbGluZSIsInJlc3BvbnNlIiwidXBsb2FkIiwiY29uc29sZSIsIndhcm4iLCJyZXRyeSIsImNvdW50IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiX21heFJldHJpZXMiLCJfcmV0cmllcyIsIl9yZXRyeUNhbGxiYWNrIiwiRVJST1JfQ09ERVMiLCJTZXQiLCJTVEFUVVNfQ09ERVMiLCJfc2hvdWxkUmV0cnkiLCJlcnIiLCJyZXMiLCJvdmVycmlkZSIsImVycl8iLCJlcnJvciIsInN0YXR1cyIsImhhcyIsImNvZGUiLCJjcm9zc0RvbWFpbiIsIl9yZXRyeSIsInJlcSIsInJlcXVlc3QiLCJfYWJvcnRlZCIsInRpbWVkb3V0IiwidGltZWRvdXRFcnJvciIsIl9lbmQiLCJ0aGVuIiwicmVzb2x2ZSIsInJlamVjdCIsIl9mdWxsZmlsbGVkUHJvbWlzZSIsInNlbGYiLCJfZW5kQ2FsbGVkIiwiUHJvbWlzZSIsIm9uIiwiRXJyb3IiLCJtZXRob2QiLCJ1cmwiLCJlbmQiLCJjYXRjaCIsImNiIiwidW5kZWZpbmVkIiwidXNlIiwib2siLCJfb2tDYWxsYmFjayIsIl9pc1Jlc3BvbnNlT0siLCJnZXQiLCJmaWVsZCIsIl9oZWFkZXIiLCJ0b0xvd2VyQ2FzZSIsImdldEhlYWRlciIsInNldCIsImhlYWRlciIsInVuc2V0IiwibmFtZSIsIl9kYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsIlN0cmluZyIsIl9nZXRGb3JtRGF0YSIsImFwcGVuZCIsImFib3J0IiwieGhyIiwiZW1pdCIsIl9hdXRoIiwidXNlciIsInBhc3MiLCJiYXNlNjRFbmNvZGVyIiwidHlwZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ3aXRoQ3JlZGVudGlhbHMiLCJfd2l0aENyZWRlbnRpYWxzIiwicmVkaXJlY3RzIiwibiIsIl9tYXhSZWRpcmVjdHMiLCJtYXhSZXNwb25zZVNpemUiLCJUeXBlRXJyb3IiLCJfbWF4UmVzcG9uc2VTaXplIiwidG9KU09OIiwiZGF0YSIsImhlYWRlcnMiLCJzZW5kIiwiaXNPYmplY3RfIiwiX2Zvcm1EYXRhIiwiX2lzSG9zdCIsInRyaW0iLCJzb3J0UXVlcnkiLCJzb3J0IiwiX3NvcnQiLCJfZmluYWxpemVRdWVyeVN0cmluZyIsInF1ZXJ5IiwiX3F1ZXJ5Iiwiam9pbiIsImluY2x1ZGVzIiwiaW5kZXgiLCJpbmRleE9mIiwicXVlcnlBcnJheSIsInNsaWNlIiwic3BsaXQiLCJfYXBwZW5kUXVlcnlTdHJpbmciLCJfdGltZW91dEVycm9yIiwicmVhc29uIiwiZXJybm8iLCJjYWxsYmFjayIsIl9zZXRUaW1lb3V0cyIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7O0FBR0EsSUFBTUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsYUFBRCxDQUF4QjtBQUVBOzs7OztBQUlBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJDLFdBQWpCO0FBRUE7Ozs7OztBQU1BLFNBQVNBLFdBQVQsQ0FBcUJDLE1BQXJCLEVBQTZCO0FBQzNCLE1BQUlBLE1BQUosRUFBWSxPQUFPQyxLQUFLLENBQUNELE1BQUQsQ0FBWjtBQUNiO0FBRUQ7Ozs7Ozs7OztBQVFBLFNBQVNDLEtBQVQs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R0FBRyxDQUFDTyxJQUFKLEdBQVcsY0FBWDtBQUNBUCxFQUFBQSxHQUFHLENBQUM2RixLQUFKLEdBQVlBLEtBQVo7QUFDQSxPQUFLaEYsUUFBTCxHQUFnQixJQUFoQjtBQUNBLE9BQUtDLGFBQUwsR0FBcUJkLEdBQXJCO0FBQ0EsT0FBS21ELEtBQUw7QUFDQSxPQUFLMkMsUUFBTCxDQUFjOUYsR0FBZDtBQUNELENBYkQ7O0FBZUExQyxXQUFXLENBQUNJLFNBQVosQ0FBc0JxSSxZQUF0QixHQUFxQyxZQUFZO0FBQy9DLE1BQU0zRSxJQUFJLEdBQUcsSUFBYixDQUQrQyxDQUcvQzs7QUFDQSxNQUFJLEtBQUt4QyxRQUFMLElBQWlCLENBQUMsS0FBS2IsTUFBM0IsRUFBbUM7QUFDakMsU0FBS0EsTUFBTCxHQUFjaUksVUFBVSxDQUFDLFlBQU07QUFDN0I1RSxNQUFBQSxJQUFJLENBQUN1RSxhQUFMLENBQW1CLGFBQW5CLEVBQWtDdkUsSUFBSSxDQUFDeEMsUUFBdkMsRUFBaUQsT0FBakQ7QUFDRCxLQUZ1QixFQUVyQixLQUFLQSxRQUZnQixDQUF4QjtBQUdELEdBUjhDLENBVS9DOzs7QUFDQSxNQUFJLEtBQUtDLGdCQUFMLElBQXlCLENBQUMsS0FBS2IscUJBQW5DLEVBQTBEO0FBQ3hELFNBQUtBLHFCQUFMLEdBQTZCZ0ksVUFBVSxDQUFDLFlBQU07QUFDNUM1RSxNQUFBQSxJQUFJLENBQUN1RSxhQUFMLENBQ0Usc0JBREYsRUFFRXZFLElBQUksQ0FBQ3ZDLGdCQUZQLEVBR0UsV0FIRjtBQUtELEtBTnNDLEVBTXBDLEtBQUtBLGdCQU4rQixDQUF2QztBQU9EO0FBQ0YsQ0FwQkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1vZHVsZSBvZiBtaXhlZC1pbiBmdW5jdGlvbnMgc2hhcmVkIGJldHdlZW4gbm9kZSBhbmQgY2xpZW50IGNvZGVcbiAqL1xuY29uc3QgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdEJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdEJhc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdEJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdEJhc2Uob2JqZWN0KSB7XG4gIGlmIChvYmplY3QpIHJldHVybiBtaXhpbihvYmplY3QpO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmplY3QpIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gUmVxdWVzdEJhc2UucHJvdG90eXBlKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChSZXF1ZXN0QmFzZS5wcm90b3R5cGUsIGtleSkpXG4gICAgICBvYmplY3Rba2V5XSA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLyoqXG4gKiBDbGVhciBwcmV2aW91cyB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuY2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICBjbGVhclRpbWVvdXQodGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpO1xuICBjbGVhclRpbWVvdXQodGhpcy5fdXBsb2FkVGltZW91dFRpbWVyKTtcbiAgZGVsZXRlIHRoaXMuX3RpbWVyO1xuICBkZWxldGUgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXI7XG4gIGRlbGV0ZSB0aGlzLl91cGxvYWRUaW1lb3V0VGltZXI7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlc3BvbnNlIGJvZHkgcGFyc2VyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGluY29taW5nIGRhdGEgaW50byByZXF1ZXN0LmJvZHlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdGhpcy5fcGFyc2VyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgZm9ybWF0IG9mIGJpbmFyeSByZXNwb25zZSBib2R5LlxuICogSW4gYnJvd3NlciB2YWxpZCBmb3JtYXRzIGFyZSAnYmxvYicgYW5kICdhcnJheWJ1ZmZlcicsXG4gKiB3aGljaCByZXR1cm4gQmxvYiBhbmQgQXJyYXlCdWZmZXIsIHJlc3BlY3RpdmVseS5cbiAqXG4gKiBJbiBOb2RlIGFsbCB2YWx1ZXMgcmVzdWx0IGluIEJ1ZmZlci5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5yZXNwb25zZVR5cGUoJ2Jsb2InKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVzcG9uc2VUeXBlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHRoaXMuX3Jlc3BvbnNlVHlwZSA9IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCByZXF1ZXN0IGJvZHkgc2VyaWFsaXplclxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gY29udmVydCBkYXRhIHNldCB2aWEgLnNlbmQgb3IgLmF0dGFjaCBpbnRvIHBheWxvYWQgdG8gc2VuZFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdGhpcy5fc2VyaWFsaXplciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRpbWVvdXRzLlxuICpcbiAqIC0gcmVzcG9uc2UgdGltZW91dCBpcyB0aW1lIGJldHdlZW4gc2VuZGluZyByZXF1ZXN0IGFuZCByZWNlaXZpbmcgdGhlIGZpcnN0IGJ5dGUgb2YgdGhlIHJlc3BvbnNlLiBJbmNsdWRlcyBETlMgYW5kIGNvbm5lY3Rpb24gdGltZS5cbiAqIC0gZGVhZGxpbmUgaXMgdGhlIHRpbWUgZnJvbSBzdGFydCBvZiB0aGUgcmVxdWVzdCB0byByZWNlaXZpbmcgcmVzcG9uc2UgYm9keSBpbiBmdWxsLiBJZiB0aGUgZGVhZGxpbmUgaXMgdG9vIHNob3J0IGxhcmdlIGZpbGVzIG1heSBub3QgbG9hZCBhdCBhbGwgb24gc2xvdyBjb25uZWN0aW9ucy5cbiAqIC0gdXBsb2FkIGlzIHRoZSB0aW1lICBzaW5jZSBsYXN0IGJpdCBvZiBkYXRhIHdhcyBzZW50IG9yIHJlY2VpdmVkLiBUaGlzIHRpbWVvdXQgd29ya3Mgb25seSBpZiBkZWFkbGluZSB0aW1lb3V0IGlzIG9mZlxuICpcbiAqIFZhbHVlIG9mIDAgb3IgZmFsc2UgbWVhbnMgbm8gdGltZW91dC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IG1zIG9yIHtyZXNwb25zZSwgZGVhZGxpbmV9XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhpcy5fdGltZW91dCA9IG9wdGlvbnM7XG4gICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gMDtcbiAgICB0aGlzLl91cGxvYWRUaW1lb3V0ID0gMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZvciAoY29uc3Qgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsIG9wdGlvbikpIHtcbiAgICAgIHN3aXRjaCAob3B0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2RlYWRsaW5lJzpcbiAgICAgICAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucy5kZWFkbGluZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmVzcG9uc2UnOlxuICAgICAgICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IG9wdGlvbnMucmVzcG9uc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3VwbG9hZCc6XG4gICAgICAgICAgdGhpcy5fdXBsb2FkVGltZW91dCA9IG9wdGlvbnMudXBsb2FkO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignVW5rbm93biB0aW1lb3V0IG9wdGlvbicsIG9wdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBudW1iZXIgb2YgcmV0cnkgYXR0ZW1wdHMgb24gZXJyb3IuXG4gKlxuICogRmFpbGVkIHJlcXVlc3RzIHdpbGwgYmUgcmV0cmllZCAnY291bnQnIHRpbWVzIGlmIHRpbWVvdXQgb3IgZXJyLmNvZGUgPj0gNTAwLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZXRyeSA9IGZ1bmN0aW9uIChjb3VudCwgZm4pIHtcbiAgLy8gRGVmYXVsdCB0byAxIGlmIG5vIGNvdW50IHBhc3NlZCBvciB0cnVlXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IGNvdW50ID09PSB0cnVlKSBjb3VudCA9IDE7XG4gIGlmIChjb3VudCA8PSAwKSBjb3VudCA9IDA7XG4gIHRoaXMuX21heFJldHJpZXMgPSBjb3VudDtcbiAgdGhpcy5fcmV0cmllcyA9IDA7XG4gIHRoaXMuX3JldHJ5Q2FsbGJhY2sgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gTk9URTogd2UgZG8gbm90IGluY2x1ZGUgRVNPQ0tFVFRJTUVET1VUIGJlY2F1c2UgdGhhdCBpcyBmcm9tIGByZXF1ZXN0YCBwYWNrYWdlXG4vLyAgICAgICA8aHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9nb3QvcHVsbC81Mzc+XG4vL1xuLy8gTk9URTogd2UgZG8gbm90IGluY2x1ZGUgRUFERFJJTkZPIGJlY2F1c2UgaXQgd2FzIHJlbW92ZWQgZnJvbSBsaWJ1diBpbiAyMDE0XG4vLyAgICAgICA8aHR0cHM6Ly9naXRodWIuY29tL2xpYnV2L2xpYnV2L2NvbW1pdC8wMmUxZWJkNDBiODA3YmU1YWY0NjM0M2VhODczMzMxYjJlZTRlOWMxPlxuLy8gICAgICAgPGh0dHBzOi8vZ2l0aHViLmNvbS9yZXF1ZXN0L3JlcXVlc3Qvc2VhcmNoP3E9RVNPQ0tFVFRJTUVET1VUJnVuc2NvcGVkX3E9RVNPQ0tFVFRJTUVET1VUPlxuLy9cbi8vXG4vLyBUT0RPOiBleHBvc2UgdGhlc2UgYXMgY29uZmlndXJhYmxlIGRlZmF1bHRzXG4vL1xuY29uc3QgRVJST1JfQ09ERVMgPSBuZXcgU2V0KFtcbiAgJ0VUSU1FRE9VVCcsXG4gICdFQ09OTlJFU0VUJyxcbiAgJ0VBRERSSU5VU0UnLFxuICAnRUNPTk5SRUZVU0VEJyxcbiAgJ0VQSVBFJyxcbiAgJ0VOT1RGT1VORCcsXG4gICdFTkVUVU5SRUFDSCcsXG4gICdFQUlfQUdBSU4nXG5dKTtcblxuY29uc3QgU1RBVFVTX0NPREVTID0gbmV3IFNldChbXG4gIDQwOCxcbiAgNDEzLFxuICA0MjksXG4gIDUwMCxcbiAgNTAyLFxuICA1MDMsXG4gIDUwNCxcbiAgNTIxLFxuICA1MjIsXG4gIDUyNFxuXSk7XG5cbi8vIFRPRE86IHdlIHdvdWxkIG5lZWQgdG8gbWFrZSB0aGlzIGVhc2lseSBjb25maWd1cmFibGUgYmVmb3JlIGFkZGluZyBpdCBpbiAoZS5nLiBzb21lIG1pZ2h0IHdhbnQgdG8gYWRkIFBPU1QpXG4vLyBjb25zdCBNRVRIT0RTID0gbmV3IFNldChbJ0dFVCcsICdQVVQnLCAnSEVBRCcsICdERUxFVEUnLCAnT1BUSU9OUycsICdUUkFDRSddKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSByZXF1ZXN0IHNob3VsZCBiZSByZXRyaWVkLlxuICogKEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvZ290I3JldHJ5KVxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyciBhbiBlcnJvclxuICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc10gcmVzcG9uc2VcbiAqIEByZXR1cm5zIHtCb29sZWFufSBpZiBzZWdtZW50IHNob3VsZCBiZSByZXRyaWVkXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fc2hvdWxkUmV0cnkgPSBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgaWYgKCF0aGlzLl9tYXhSZXRyaWVzIHx8IHRoaXMuX3JldHJpZXMrKyA+PSB0aGlzLl9tYXhSZXRyaWVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMuX3JldHJ5Q2FsbGJhY2spIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgb3ZlcnJpZGUgPSB0aGlzLl9yZXRyeUNhbGxiYWNrKGVyciwgcmVzKTtcbiAgICAgIGlmIChvdmVycmlkZSA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAob3ZlcnJpZGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgICAvLyB1bmRlZmluZWQgZmFsbHMgYmFjayB0byBkZWZhdWx0c1xuICAgIH0gY2F0Y2ggKGVycl8pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyXyk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogd2Ugd291bGQgbmVlZCB0byBtYWtlIHRoaXMgZWFzaWx5IGNvbmZpZ3VyYWJsZSBiZWZvcmUgYWRkaW5nIGl0IGluIChlLmcuIHNvbWUgbWlnaHQgd2FudCB0byBhZGQgUE9TVClcbiAgLypcbiAgaWYgKFxuICAgIHRoaXMucmVxICYmXG4gICAgdGhpcy5yZXEubWV0aG9kICYmXG4gICAgIU1FVEhPRFMuaGFzKHRoaXMucmVxLm1ldGhvZC50b1VwcGVyQ2FzZSgpKVxuICApXG4gICAgcmV0dXJuIGZhbHNlO1xuICAqL1xuICBpZiAocmVzICYmIHJlcy5zdGF0dXMgJiYgU1RBVFVTX0NPREVTLmhhcyhyZXMuc3RhdHVzKSkgcmV0dXJuIHRydWU7XG4gIGlmIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgJiYgRVJST1JfQ09ERVMuaGFzKGVyci5jb2RlKSkgcmV0dXJuIHRydWU7XG4gICAgLy8gU3VwZXJhZ2VudCB0aW1lb3V0XG4gICAgaWYgKGVyci50aW1lb3V0ICYmIGVyci5jb2RlID09PSAnRUNPTk5BQk9SVEVEJykgcmV0dXJuIHRydWU7XG4gICAgaWYgKGVyci5jcm9zc0RvbWFpbikgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJldHJ5IHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fcmV0cnkgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG5cbiAgLy8gbm9kZVxuICBpZiAodGhpcy5yZXEpIHtcbiAgICB0aGlzLnJlcSA9IG51bGw7XG4gICAgdGhpcy5yZXEgPSB0aGlzLnJlcXVlc3QoKTtcbiAgfVxuXG4gIHRoaXMuX2Fib3J0ZWQgPSBmYWxzZTtcbiAgdGhpcy50aW1lZG91dCA9IGZhbHNlO1xuICB0aGlzLnRpbWVkb3V0RXJyb3IgPSBudWxsO1xuXG4gIHJldHVybiB0aGlzLl9lbmQoKTtcbn07XG5cbi8qKlxuICogUHJvbWlzZSBzdXBwb3J0XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3JlamVjdF1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gIGlmICghdGhpcy5fZnVsbGZpbGxlZFByb21pc2UpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdXYXJuaW5nOiBzdXBlcmFnZW50IHJlcXVlc3Qgd2FzIHNlbnQgdHdpY2UsIGJlY2F1c2UgYm90aCAuZW5kKCkgYW5kIC50aGVuKCkgd2VyZSBjYWxsZWQuIE5ldmVyIGNhbGwgLmVuZCgpIGlmIHlvdSB1c2UgcHJvbWlzZXMnXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2VsZi5vbignYWJvcnQnLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9tYXhSZXRyaWVzICYmIHRoaXMuX21heFJldHJpZXMgPiB0aGlzLl9yZXRyaWVzKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGltZWRvdXQgJiYgdGhpcy50aW1lZG91dEVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KHRoaXMudGltZWRvdXRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCdBYm9ydGVkJyk7XG4gICAgICAgIGVyci5jb2RlID0gJ0FCT1JURUQnO1xuICAgICAgICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gICAgICAgIGVyci5tZXRob2QgPSB0aGlzLm1ldGhvZDtcbiAgICAgICAgZXJyLnVybCA9IHRoaXMudXJsO1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgICAgc2VsZi5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xuICAgICAgICBlbHNlIHJlc29sdmUocmVzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5jYXRjaCA9IGZ1bmN0aW9uIChjYikge1xuICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgY2IpO1xufTtcblxuLyoqXG4gKiBBbGxvdyBmb3IgZXh0ZW5zaW9uXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIChmbikge1xuICBmbih0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUub2sgPSBmdW5jdGlvbiAoY2IpIHtcbiAgaWYgKHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IEVycm9yKCdDYWxsYmFjayByZXF1aXJlZCcpO1xuICB0aGlzLl9va0NhbGxiYWNrID0gY2I7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9pc1Jlc3BvbnNlT0sgPSBmdW5jdGlvbiAocmVzKSB7XG4gIGlmICghcmVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMuX29rQ2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fb2tDYWxsYmFjayhyZXMpO1xuICB9XG5cbiAgcmV0dXJuIHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPCAzMDA7XG59O1xuXG4vKipcbiAqIEdldCByZXF1ZXN0IGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xuICByZXR1cm4gdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBoZWFkZXIgYGZpZWxkYCB2YWx1ZS5cbiAqIFRoaXMgaXMgYSBkZXByZWNhdGVkIGludGVybmFsIEFQSS4gVXNlIGAuZ2V0KGZpZWxkKWAgaW5zdGVhZC5cbiAqXG4gKiAoZ2V0SGVhZGVyIGlzIG5vIGxvbmdlciB1c2VkIGludGVybmFsbHkgYnkgdGhlIHN1cGVyYWdlbnQgY29kZSBiYXNlKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKiBAZGVwcmVjYXRlZFxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXRIZWFkZXIgPSBSZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgYGZpZWxkYCB0byBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLnNldCgnWC1BUEktS2V5JywgJ2Zvb2JhcicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAuc2V0KHsgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsICdYLUFQSS1LZXknOiAnZm9vYmFyJyB9KVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZmllbGRcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGZpZWxkLCB2YWx1ZSkge1xuICBpZiAoaXNPYmplY3QoZmllbGQpKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZmllbGQpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZmllbGQsIGtleSkpXG4gICAgICAgIHRoaXMuc2V0KGtleSwgZmllbGRba2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV0gPSB2YWx1ZTtcbiAgdGhpcy5oZWFkZXJbZmllbGRdID0gdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaGVhZGVyIGBmaWVsZGAuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAudW5zZXQoJ1VzZXItQWdlbnQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZCBmaWVsZCBuYW1lXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xuICBkZWxldGUgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xuICBkZWxldGUgdGhpcy5oZWFkZXJbZmllbGRdO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGUgdGhlIGZpZWxkIGBuYW1lYCBhbmQgYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3RcbiAqIGZvciBcIm11bHRpcGFydC9mb3JtLWRhdGFcIiByZXF1ZXN0IGJvZGllcy5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCgnZm9vJywgJ2JhcicpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCh7IGZvbzogJ2JhcicsIGJhejogJ3F1eCcgfSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG5hbWUgbmFtZSBvZiBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd8QmxvYnxGaWxlfEJ1ZmZlcnxmcy5SZWFkU3RyZWFtfSB2YWwgdmFsdWUgb2YgZmllbGRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gIC8vIG5hbWUgc2hvdWxkIGJlIGVpdGhlciBhIHN0cmluZyBvciBhbiBvYmplY3QuXG4gIGlmIChuYW1lID09PSBudWxsIHx8IHVuZGVmaW5lZCA9PT0gbmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgbmFtZSBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICBpZiAodGhpcy5fZGF0YSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiLmZpZWxkKCkgY2FuJ3QgYmUgdXNlZCBpZiAuc2VuZCgpIGlzIHVzZWQuIFBsZWFzZSB1c2Ugb25seSAuc2VuZCgpIG9yIG9ubHkgLmZpZWxkKCkgJiAuYXR0YWNoKClcIlxuICAgICk7XG4gIH1cblxuICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBuYW1lKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5hbWUsIGtleSkpXG4gICAgICAgIHRoaXMuZmllbGQoa2V5LCBuYW1lW2tleV0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgZm9yIChjb25zdCBpIGluIHZhbHVlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBpKSlcbiAgICAgICAgdGhpcy5maWVsZChuYW1lLCB2YWx1ZVtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyB2YWwgc2hvdWxkIGJlIGRlZmluZWQgbm93XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB1bmRlZmluZWQgPT09IHZhbHVlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSB2YWwgY2FuIG5vdCBiZSBlbXB0eScpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICB9XG5cbiAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQobmFtZSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWJvcnQgdGhlIHJlcXVlc3QsIGFuZCBjbGVhciBwb3RlbnRpYWwgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSByZXF1ZXN0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0aGlzLl9hYm9ydGVkID0gdHJ1ZTtcbiAgaWYgKHRoaXMueGhyKSB0aGlzLnhoci5hYm9ydCgpOyAvLyBicm93c2VyXG4gIGlmICh0aGlzLnJlcSkgdGhpcy5yZXEuYWJvcnQoKTsgLy8gbm9kZVxuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9hdXRoID0gZnVuY3Rpb24gKHVzZXIsIHBhc3MsIG9wdGlvbnMsIGJhc2U2NEVuY29kZXIpIHtcbiAgc3dpdGNoIChvcHRpb25zLnR5cGUpIHtcbiAgICBjYXNlICdiYXNpYyc6XG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsIGBCYXNpYyAke2Jhc2U2NEVuY29kZXIoYCR7dXNlcn06JHtwYXNzfWApfWApO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdhdXRvJzpcbiAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VyO1xuICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3M7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2JlYXJlcic6IC8vIHVzYWdlIHdvdWxkIGJlIC5hdXRoKGFjY2Vzc1Rva2VuLCB7IHR5cGU6ICdiZWFyZXInIH0pXG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt1c2VyfWApO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0cmFuc21pc3Npb24gb2YgY29va2llcyB3aXRoIHgtZG9tYWluIHJlcXVlc3RzLlxuICpcbiAqIE5vdGUgdGhhdCBmb3IgdGhpcyB0byB3b3JrIHRoZSBvcmlnaW4gbXVzdCBub3QgYmVcbiAqIHVzaW5nIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIgd2l0aCBhIHdpbGRjYXJkLFxuICogYW5kIGFsc28gbXVzdCBzZXQgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiXG4gKiB0byBcInRydWVcIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS53aXRoQ3JlZGVudGlhbHMgPSBmdW5jdGlvbiAob24pIHtcbiAgLy8gVGhpcyBpcyBicm93c2VyLW9ubHkgZnVuY3Rpb25hbGl0eS4gTm9kZSBzaWRlIGlzIG5vLW9wLlxuICBpZiAob24gPT09IHVuZGVmaW5lZCkgb24gPSB0cnVlO1xuICB0aGlzLl93aXRoQ3JlZGVudGlhbHMgPSBvbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWF4IHJlZGlyZWN0cyB0byBgbmAuIERvZXMgbm90aGluZyBpbiBicm93c2VyIFhIUiBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZWRpcmVjdHMgPSBmdW5jdGlvbiAobikge1xuICB0aGlzLl9tYXhSZWRpcmVjdHMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTWF4aW11bSBzaXplIG9mIGJ1ZmZlcmVkIHJlc3BvbnNlIGJvZHksIGluIGJ5dGVzLiBDb3VudHMgdW5jb21wcmVzc2VkIHNpemUuXG4gKiBEZWZhdWx0IDIwME1CLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuIG51bWJlciBvZiBieXRlc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5tYXhSZXNwb25zZVNpemUgPSBmdW5jdGlvbiAobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICB9XG5cbiAgdGhpcy5fbWF4UmVzcG9uc2VTaXplID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgdG8gYSBwbGFpbiBqYXZhc2NyaXB0IG9iamVjdCAobm90IEpTT04gc3RyaW5nKSBvZiBzY2FsYXIgcHJvcGVydGllcy5cbiAqIE5vdGUgYXMgdGhpcyBtZXRob2QgaXMgZGVzaWduZWQgdG8gcmV0dXJuIGEgdXNlZnVsIG5vbi10aGlzIHZhbHVlLFxuICogaXQgY2Fubm90IGJlIGNoYWluZWQuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBkZXNjcmliaW5nIG1ldGhvZCwgdXJsLCBhbmQgZGF0YSBvZiB0aGlzIHJlcXVlc3RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxuICAgIHVybDogdGhpcy51cmwsXG4gICAgZGF0YTogdGhpcy5fZGF0YSxcbiAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJcbiAgfTtcbn07XG5cbi8qKlxuICogU2VuZCBgZGF0YWAgYXMgdGhlIHJlcXVlc3QgYm9keSwgZGVmYXVsdGluZyB0aGUgYC50eXBlKClgIHRvIFwianNvblwiIHdoZW5cbiAqIGFuIG9iamVjdCBpcyBnaXZlbi5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBtYW51YWwganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdqc29uJylcbiAqICAgICAgICAgLnNlbmQoJ3tcIm5hbWVcIjpcInRqXCJ9JylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwgeC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCgnbmFtZT10aicpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGRlZmF1bHRzIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCgnbmFtZT10b2JpJylcbiAqICAgICAgICAuc2VuZCgnc3BlY2llcz1mZXJyZXQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgY29uc3QgaXNPYmplY3RfID0gaXNPYmplY3QoZGF0YSk7XG4gIGxldCB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcblxuICBpZiAodGhpcy5fZm9ybURhdGEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBcIi5zZW5kKCkgY2FuJ3QgYmUgdXNlZCBpZiAuYXR0YWNoKCkgb3IgLmZpZWxkKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiXG4gICAgKTtcbiAgfVxuXG4gIGlmIChpc09iamVjdF8gJiYgIXRoaXMuX2RhdGEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgdGhpcy5fZGF0YSA9IFtdO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChkYXRhICYmIHRoaXMuX2RhdGEgJiYgdGhpcy5faXNIb3N0KHRoaXMuX2RhdGEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgbWVyZ2UgdGhlc2Ugc2VuZCBjYWxsc1wiKTtcbiAgfVxuXG4gIC8vIG1lcmdlXG4gIGlmIChpc09iamVjdF8gJiYgaXNPYmplY3QodGhpcy5fZGF0YSkpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkpXG4gICAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZGVmYXVsdCB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIGlmICh0eXBlKSB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICBpZiAodHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhID8gYCR7dGhpcy5fZGF0YX0mJHtkYXRhfWAgOiBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhID0gKHRoaXMuX2RhdGEgfHwgJycpICsgZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cblxuICBpZiAoIWlzT2JqZWN0XyB8fCB0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGRlZmF1bHQgdG8ganNvblxuICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnanNvbicpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU29ydCBgcXVlcnlzdHJpbmdgIGJ5IHRoZSBzb3J0IGZ1bmN0aW9uXG4gKlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIGRlZmF1bHQgb3JkZXJcbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KClcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBjdXN0b21pemVkIHNvcnQgZnVuY3Rpb25cbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KGZ1bmN0aW9uKGEsIGIpe1xuICogICAgICAgICAgIHJldHVybiBhLmxlbmd0aCAtIGIubGVuZ3RoO1xuICogICAgICAgICB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNvcnRRdWVyeSA9IGZ1bmN0aW9uIChzb3J0KSB7XG4gIC8vIF9zb3J0IGRlZmF1bHQgdG8gdHJ1ZSBidXQgb3RoZXJ3aXNlIGNhbiBiZSBhIGZ1bmN0aW9uIG9yIGJvb2xlYW5cbiAgdGhpcy5fc29ydCA9IHR5cGVvZiBzb3J0ID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBzb3J0O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29tcG9zZSBxdWVyeXN0cmluZyB0byBhcHBlbmQgdG8gcmVxLnVybFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2ZpbmFsaXplUXVlcnlTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHF1ZXJ5ID0gdGhpcy5fcXVlcnkuam9pbignJicpO1xuICBpZiAocXVlcnkpIHtcbiAgICB0aGlzLnVybCArPSAodGhpcy51cmwuaW5jbHVkZXMoJz8nKSA/ICcmJyA6ICc/JykgKyBxdWVyeTtcbiAgfVxuXG4gIHRoaXMuX3F1ZXJ5Lmxlbmd0aCA9IDA7IC8vIE1ha2VzIHRoZSBjYWxsIGlkZW1wb3RlbnRcblxuICBpZiAodGhpcy5fc29ydCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy51cmwuaW5kZXhPZignPycpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICBjb25zdCBxdWVyeUFycmF5ID0gdGhpcy51cmwuc2xpY2UoaW5kZXggKyAxKS5zcGxpdCgnJicpO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9zb3J0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHF1ZXJ5QXJyYXkuc29ydCh0aGlzLl9zb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5QXJyYXkuc29ydCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnVybCA9IHRoaXMudXJsLnNsaWNlKDAsIGluZGV4KSArICc/JyArIHF1ZXJ5QXJyYXkuam9pbignJicpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gRm9yIGJhY2t3YXJkcyBjb21wYXQgb25seVxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9hcHBlbmRRdWVyeVN0cmluZyA9ICgpID0+IHtcbiAgY29uc29sZS53YXJuKCdVbnN1cHBvcnRlZCcpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB0aW1lb3V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fdGltZW91dEVycm9yID0gZnVuY3Rpb24gKHJlYXNvbiwgdGltZW91dCwgZXJybm8pIHtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYCR7cmVhc29uICsgdGltZW91dH1tcyBleGNlZWRlZGApO1xuICBlcnIudGltZW91dCA9IHRpbWVvdXQ7XG4gIGVyci5jb2RlID0gJ0VDT05OQUJPUlRFRCc7XG4gIGVyci5lcnJubyA9IGVycm5vO1xuICB0aGlzLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgdGhpcy50aW1lZG91dEVycm9yID0gZXJyO1xuICB0aGlzLmFib3J0KCk7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fc2V0VGltZW91dHMgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gIC8vIGRlYWRsaW5lXG4gIGlmICh0aGlzLl90aW1lb3V0ICYmICF0aGlzLl90aW1lcikge1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1RpbWVvdXQgb2YgJywgc2VsZi5fdGltZW91dCwgJ0VUSU1FJyk7XG4gICAgfSwgdGhpcy5fdGltZW91dCk7XG4gIH1cblxuICAvLyByZXNwb25zZSB0aW1lb3V0XG4gIGlmICh0aGlzLl9yZXNwb25zZVRpbWVvdXQgJiYgIXRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKSB7XG4gICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcihcbiAgICAgICAgJ1Jlc3BvbnNlIHRpbWVvdXQgb2YgJyxcbiAgICAgICAgc2VsZi5fcmVzcG9uc2VUaW1lb3V0LFxuICAgICAgICAnRVRJTUVET1VUJ1xuICAgICAgKTtcbiAgICB9LCB0aGlzLl9yZXNwb25zZVRpbWVvdXQpO1xuICB9XG59O1xuIl19

/***/ }),

/***/ 8637:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/**
 * Module dependencies.
 */
var utils = __nccwpck_require__(5523);
/**
 * Expose `ResponseBase`.
 */


module.exports = ResponseBase;
/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(ResponseBase.prototype, key)) obj[key] = ResponseBase.prototype[key];
  }

  return obj;
}
/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


ResponseBase.prototype.get = function (field) {
  return this.header[field.toLowerCase()];
};
/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */


ResponseBase.prototype._setHeaderProperties = function (header) {
  // TODO: moar!
  // TODO: make this a util
  // content-type
  var ct = header['content-type'] || '';
  this.type = utils.type(ct); // params

  var params = utils.params(ct);

  for (var key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) this[key] = params[key];
  }

  this.links = {}; // links

  try {
    if (header.link) {
      this.links = utils.parseLinks(header.link);
    }
  } catch (_unused) {// ignore
  }
};
/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */


ResponseBase.prototype._setStatusProperties = function (status) {
  var type = status / 100 | 0; // status / class

  this.statusCode = status;
  this.status = this.statusCode;
  this.statusType = type; // basics

  this.info = type === 1;
  this.ok = type === 2;
  this.redirect = type === 3;
  this.clientError = type === 4;
  this.serverError = type === 5;
  this.error = type === 4 || type === 5 ? this.toError() : false; // sugar

  this.created = status === 201;
  this.accepted = status === 202;
  this.noContent = status === 204;
  this.badRequest = status === 400;
  this.unauthorized = status === 401;
  this.notAcceptable = status === 406;
  this.forbidden = status === 403;
  this.notFound = status === 404;
  this.unprocessableEntity = status === 422;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNwb25zZS1iYXNlLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJSZXNwb25zZUJhc2UiLCJvYmoiLCJtaXhpbiIsImtleSIsInByb3RvdHlwZSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImdldCIsImZpZWxkIiwiaGVhZGVyIiwidG9Mb3dlckNhc2UiLCJfc2V0SGVhZGVyUHJvcGVydGllcyIsImN0IiwidHlwZSIsInBhcmFtcyIsImxpbmtzIiwibGluayIsInBhcnNlTGlua3MiLCJfc2V0U3RhdHVzUHJvcGVydGllcyIsInN0YXR1cyIsInN0YXR1c0NvZGUiLCJzdGF0dXNUeXBlIiwiaW5mbyIsIm9rIiwicmVkaXJlY3QiLCJjbGllbnRFcnJvciIsInNlcnZlckVycm9yIiwiZXJyb3IiLCJ0b0Vycm9yIiwiY3JlYXRlZCIsImFjY2VwdGVkIiwibm9Db250ZW50IiwiYmFkUmVxdWVzdCIsInVuYXV0aG9yaXplZCIsIm5vdEFjY2VwdGFibGUiLCJmb3JiaWRkZW4iLCJub3RGb3VuZCIsInVucHJvY2Vzc2FibGVFbnRpdHkiXSwibWFwcGluZ3MiOiI7O0FBQUE7OztBQUlBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBckI7QUFFQTs7Ozs7QUFJQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCQyxZQUFqQjtBQUVBOzs7Ozs7QUFNQSxTQUFTQSxZQUFULENBQXNCQyxHQUF0QixFQUEyQjtBQUN6QixNQUFJQSxHQUFKLEVBQVMsT0FBT0MsS0FBSyxDQUFDRCxHQUFELENBQVo7QUFDVjtBQUVEOzs7Ozs7Ozs7QUFRQSxTQUFTQyxLQUFULENBQWVELEdBQWYsRUFBb0I7QUFDbEIsT0FBSyxJQUFNRSxHQUFYLElBQWtCSCxZQUFZLENBQUNJLFNBQS9CLEVBQTBDO0FBQ3hDLFFBQUlDLE1BQU0sQ0FBQ0QsU0FBUCxDQUFpQkUsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFD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LEdBQTJCbEIsTUFBTSxLQUFLLEdBQXRDO0FBQ0QsQ0ExQkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZUJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uc2VCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlQmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZUJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gUmVzcG9uc2VCYXNlLnByb3RvdHlwZSkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoUmVzcG9uc2VCYXNlLnByb3RvdHlwZSwga2V5KSlcbiAgICAgIG9ialtrZXldID0gUmVzcG9uc2VCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChmaWVsZCkge1xuICByZXR1cm4gdGhpcy5oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgcmVsYXRlZCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgLnR5cGVgIHRoZSBjb250ZW50IHR5cGUgd2l0aG91dCBwYXJhbXNcbiAqXG4gKiBBIHJlc3BvbnNlIG9mIFwiQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCJcbiAqIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGAudHlwZWAgb2YgXCJ0ZXh0L3BsYWluXCIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uIChoZWFkZXIpIHtcbiAgLy8gVE9ETzogbW9hciFcbiAgLy8gVE9ETzogbWFrZSB0aGlzIGEgdXRpbFxuXG4gIC8vIGNvbnRlbnQtdHlwZVxuICBjb25zdCBjdCA9IGhlYWRlclsnY29udGVudC10eXBlJ10gfHwgJyc7XG4gIHRoaXMudHlwZSA9IHV0aWxzLnR5cGUoY3QpO1xuXG4gIC8vIHBhcmFtc1xuICBjb25zdCBwYXJhbXMgPSB1dGlscy5wYXJhbXMoY3QpO1xuICBmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHBhcmFtcywga2V5KSlcbiAgICAgIHRoaXNba2V5XSA9IHBhcmFtc1trZXldO1xuICB9XG5cbiAgdGhpcy5saW5rcyA9IHt9O1xuXG4gIC8vIGxpbmtzXG4gIHRyeSB7XG4gICAgaWYgKGhlYWRlci5saW5rKSB7XG4gICAgICB0aGlzLmxpbmtzID0gdXRpbHMucGFyc2VMaW5rcyhoZWFkZXIubGluayk7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcblxuLyoqXG4gKiBTZXQgZmxhZ3Mgc3VjaCBhcyBgLm9rYCBiYXNlZCBvbiBgc3RhdHVzYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cbiAqIHdoZXJlYXMgNXh4IHdpbGwgYmUgX19mYWxzZV9fIGFuZCBgLmVycm9yYCB3aWxsIGJlIF9fdHJ1ZV9fLiBUaGVcbiAqIGAuY2xpZW50RXJyb3JgIGFuZCBgLnNlcnZlckVycm9yYCBhcmUgYWxzbyBhdmFpbGFibGUgdG8gYmUgbW9yZVxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxuICogc29tZXRpbWVzIHVzZWZ1bCBmb3IgbWFwcGluZyByZXNwb25kIGNvbG9ycyBldGMuXG4gKlxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxuICpcbiAqICAgLSAubm9Db250ZW50XG4gKiAgIC0gLmJhZFJlcXVlc3RcbiAqICAgLSAudW5hdXRob3JpemVkXG4gKiAgIC0gLm5vdEFjY2VwdGFibGVcbiAqICAgLSAubm90Rm91bmRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLl9zZXRTdGF0dXNQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKHN0YXR1cykge1xuICBjb25zdCB0eXBlID0gKHN0YXR1cyAvIDEwMCkgfCAwO1xuXG4gIC8vIHN0YXR1cyAvIGNsYXNzXG4gIHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgdGhpcy5zdGF0dXMgPSB0aGlzLnN0YXR1c0NvZGU7XG4gIHRoaXMuc3RhdHVzVHlwZSA9IHR5cGU7XG5cbiAgLy8gYmFzaWNzXG4gIHRoaXMuaW5mbyA9IHR5cGUgPT09IDE7XG4gIHRoaXMub2sgPSB0eXBlID09PSAyO1xuICB0aGlzLnJlZGlyZWN0ID0gdHlwZSA9PT0gMztcbiAgdGhpcy5jbGllbnRFcnJvciA9IHR5cGUgPT09IDQ7XG4gIHRoaXMuc2VydmVyRXJyb3IgPSB0eXBlID09PSA1O1xuICB0aGlzLmVycm9yID0gdHlwZSA9PT0gNCB8fCB0eXBlID09PSA1ID8gdGhpcy50b0Vycm9yKCkgOiBmYWxzZTtcblxuICAvLyBzdWdhclxuICB0aGlzLmNyZWF0ZWQgPSBzdGF0dXMgPT09IDIwMTtcbiAgdGhpcy5hY2NlcHRlZCA9IHN0YXR1cyA9PT0gMjAyO1xuICB0aGlzLm5vQ29udGVudCA9IHN0YXR1cyA9PT0gMjA0O1xuICB0aGlzLmJhZFJlcXVlc3QgPSBzdGF0dXMgPT09IDQwMDtcbiAgdGhpcy51bmF1dGhvcml6ZWQgPSBzdGF0dXMgPT09IDQwMTtcbiAgdGhpcy5ub3RBY2NlcHRhYmxlID0gc3RhdHVzID09PSA0MDY7XG4gIHRoaXMuZm9yYmlkZGVuID0gc3RhdHVzID09PSA0MDM7XG4gIHRoaXMubm90Rm91bmQgPSBzdGF0dXMgPT09IDQwNDtcbiAgdGhpcy51bnByb2Nlc3NhYmxlRW50aXR5ID0gc3RhdHVzID09PSA0MjI7XG59O1xuIl19

/***/ }),

/***/ 5523:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */
exports.type = function (str) {
  return str.split(/ *; */).shift();
};
/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.params = function (val) {
  var obj = {};

  var _iterator = _createForOfIteratorHelper(val.split(/ *; */)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var str = _step.value;
      var parts = str.split(/ *= */);
      var key = parts.shift();

      var _val = parts.shift();

      if (key && _val) obj[key] = _val;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return obj;
};
/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.parseLinks = function (val) {
  var obj = {};

  var _iterator2 = _createForOfIteratorHelper(val.split(/ *, */)),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var str = _step2.value;
      var parts = str.split(/ *; */);
      var url = parts[0].slice(1, -1);
      var rel = parts[1].split(/ *= */)[1].slice(1, -1);
      obj[rel] = url;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return obj;
};
/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */


exports.cleanHeader = function (header, changesOrigin) {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header.host; // secuirty

  if (changesOrigin) {
    delete header.authorization;
    delete header.cookie;
  }

  return header;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJleHBvcnRzIiwidHlwZSIsInN0ciIsInNwbGl0Iiwic2hpZnQiLCJwYXJhbXMiLCJ2YWwiLCJvYmoiLCJwYXJ0cyIsImtleSIsInBhcnNlTGlua3MiLCJ1cmwiLCJzbGljZSIsInJlbCIsImNsZWFuSGVhZGVyIiwiaGVhZGVyIiwiY2hhbmdlc09yaWdpbiIsImhvc3QiLCJhdXRob3JpemF0aW9uIiwiY29va2llIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7O0FBUUFBLE9BQU8sQ0FBQ0MsSUFBUixHQUFlLFVBQUNDLEdBQUQ7QUFBQSxTQUFTQSxHQUFHLENBQUNDLEtBQUosQ0FBVSxPQUFWLEVBQW1CQyxLQUFuQixFQUFUO0FBQUEsQ0FBZjtBQUVBOzs7Ozs7Ozs7QUFRQUosT0FBTyxDQUFDSyxNQUFSLEdBQWlCLFVBQUNDLEdBQUQsRUFBUztBQUN4QixNQUFNQyxHQUFHLEdBQUcsRUFBWjs7QUFEd0IsNkNBRU5ELEdBQUcsQ0FBQ0gsS0FBSixDQUFVLE9BQVYsQ0FGTTtBQUFBOztBQUFBO0FBRXhCLHdEQUFzQztBQUFBLFVBQTNCRCxHQUEyQjtBQUNwQyxVQUFNTSxLQUFLLEdBQUdOLEdBQUcsQ0FBQ0MsS0FBSixDQUFVLE9BQVYsQ0FBZDtBQUNBLFVBQU1NLEdBQUcsR0FBR0QsS0FBSyxDQUFDSixLQUFOLEVBQVo7O0FBQ0EsVUFBTUUsSUFBRyxHQUFHRSxLQUFLLENBQUNKLEtBQU4sRUFBWjs7QUFFQSxVQUFJSyxHQUFHLElBQUlILElBQVgsRUFBZ0JDLEdBQUcsQ0FBQ0UsR0FBRCxDQUFILEdBQVdILElBQVg7QUFDakI7QUFSdUI7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVeEIsU0FBT0MsR0FBUDtBQUNELENBWEQ7QUFhQTs7Ozs7Ozs7O0FBUUFQLE9BQU8sQ0FBQ1UsVUFBUixHQUFxQixVQUFDSixHQUFELEVBQVM7QUFDNUIsTUFBTUMsR0FBRyxHQUFHLEVBQVo7O0FBRDRCLDhDQUVWRCxHQUFHLENBQUNILEtBQUosQ0FBVSxPQUFWLENBRlU7QUFBQTs7QUFBQTtBQUU1QiwyREFBc0M7QUFBQSxVQUEzQkQsR0FBMkI7QUFDcEMsVUFBTU0sS0FBSyxHQUFHTixHQUFHLENBQUNDLEtBQUosQ0FBVSxPQUFWLENBQWQ7QUFDQSxVQUFNUSxHQUFHLEdBQUdILEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0ksS0FBVCxDQUFlLENBQWYsRUFBa0IsQ0FBQyxDQUFuQixDQUFaO0FBQ0EsVUFBTUMsR0FBRyxHQUFHTCxLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNMLEtBQVQsQ0FBZSxPQUFmLEVBQXdCLENBQXhCLEVBQTJCUyxLQUEzQixDQUFpQyxDQUFqQyxFQUFvQyxDQUFDLENBQXJDLENBQVo7QUFDQUwsTUFBQUEsR0FBRyxDQUFDTSxHQUFELENBQUgsR0FBV0YsR0FBWDtBQUNEO0FBUDJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBUzVCLFNBQU9KLEdBQVA7QUFDRCxDQVZEO0FBWUE7Ozs7Ozs7OztBQVFBUCxPQUFPLENBQUNjLFdBQVIsR0FBc0IsVUFBQ0MsTUFBRCxFQUFTQyxhQUFULEVBQTJCO0FBQy9DLFNBQU9ELE1BQU0sQ0FBQyxjQUFELENBQWI7QUFDQSxTQUFPQSxNQUFNLENBQUMsZ0JBQUQsQ0FBYjtBQUNBLFNBQU9BLE1BQU0sQ0FBQyxtQkFBRCxDQUFiO0FBQ0EsU0FBT0EsTUFBTSxDQUFDRSxJQUFkLENBSitDLENBSy9DOztBQUNBLE1BQUlELGFBQUosRUFBbUI7QUFDakIsV0FBT0QsTUFBTSxDQUFDRyxhQUFkO0FBQ0EsV0FBT0gsTUFBTSxDQUFDSSxNQUFkO0FBQ0Q7O0FBRUQsU0FBT0osTUFBUDtBQUNELENBWkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJldHVybiB0aGUgbWltZSB0eXBlIGZvciB0aGUgZ2l2ZW4gYHN0cmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy50eXBlID0gKHN0cikgPT4gc3RyLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG5cbi8qKlxuICogUmV0dXJuIGhlYWRlciBmaWVsZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucGFyYW1zID0gKHZhbCkgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcbiAgZm9yIChjb25zdCBzdHIgb2YgdmFsLnNwbGl0KC8gKjsgKi8pKSB7XG4gICAgY29uc3QgcGFydHMgPSBzdHIuc3BsaXQoLyAqPSAqLyk7XG4gICAgY29uc3Qga2V5ID0gcGFydHMuc2hpZnQoKTtcbiAgICBjb25zdCB2YWwgPSBwYXJ0cy5zaGlmdCgpO1xuXG4gICAgaWYgKGtleSAmJiB2YWwpIG9ialtrZXldID0gdmFsO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbi8qKlxuICogUGFyc2UgTGluayBoZWFkZXIgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucGFyc2VMaW5rcyA9ICh2YWwpID0+IHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGZvciAoY29uc3Qgc3RyIG9mIHZhbC5zcGxpdCgvICosICovKSkge1xuICAgIGNvbnN0IHBhcnRzID0gc3RyLnNwbGl0KC8gKjsgKi8pO1xuICAgIGNvbnN0IHVybCA9IHBhcnRzWzBdLnNsaWNlKDEsIC0xKTtcbiAgICBjb25zdCByZWwgPSBwYXJ0c1sxXS5zcGxpdCgvICo9ICovKVsxXS5zbGljZSgxLCAtMSk7XG4gICAgb2JqW3JlbF0gPSB1cmw7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuLyoqXG4gKiBTdHJpcCBjb250ZW50IHJlbGF0ZWQgZmllbGRzIGZyb20gYGhlYWRlcmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuY2xlYW5IZWFkZXIgPSAoaGVhZGVyLCBjaGFuZ2VzT3JpZ2luKSA9PiB7XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICBkZWxldGUgaGVhZGVyWydjb250ZW50LWxlbmd0aCddO1xuICBkZWxldGUgaGVhZGVyWyd0cmFuc2Zlci1lbmNvZGluZyddO1xuICBkZWxldGUgaGVhZGVyLmhvc3Q7XG4gIC8vIHNlY3VpcnR5XG4gIGlmIChjaGFuZ2VzT3JpZ2luKSB7XG4gICAgZGVsZXRlIGhlYWRlci5hdXRob3JpemF0aW9uO1xuICAgIGRlbGV0ZSBoZWFkZXIuY29va2llO1xuICB9XG5cbiAgcmV0dXJuIGhlYWRlcjtcbn07XG4iXX0=

/***/ }),

/***/ 7966:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var CombinedStream = __nccwpck_require__(5443);
var util = __nccwpck_require__(1669);
var path = __nccwpck_require__(5622);
var http = __nccwpck_require__(8605);
var https = __nccwpck_require__(7211);
var parseUrl = __nccwpck_require__(8835).parse;
var fs = __nccwpck_require__(5747);
var mime = __nccwpck_require__(3583);
var asynckit = __nccwpck_require__(4812);
var populate = __nccwpck_require__(5712);

// Public API
module.exports = FormData;

// make it a Stream
util.inherits(FormData, CombinedStream);

/**
 * Create readable "multipart/form-data" streams.
 * Can be used to submit forms
 * and file uploads to other web applications.
 *
 * @constructor
 * @param {Object} options - Properties to be added/overriden for FormData and CombinedStream
 */
function FormData(options) {
  if (!(this instanceof FormData)) {
    return new FormData(options);
  }

  this._overheadLength = 0;
  this._valueLength = 0;
  this._valuesToMeasure = [];

  CombinedStream.call(this);

  options = options || {};
  for (var option in options) {
    this[option] = options[option];
  }
}

FormData.LINE_BREAK = '\r\n';
FormData.DEFAULT_CONTENT_TYPE = 'application/octet-stream';

FormData.prototype.append = function(field, value, options) {

  options = options || {};

  // allow filename as single option
  if (typeof options == 'string') {
    options = {filename: options};
  }

  var append = CombinedStream.prototype.append.bind(this);

  // all that streamy business can't handle numbers
  if (typeof value == 'number') {
    value = '' + value;
  }

  // https://github.com/felixge/node-form-data/issues/38
  if (util.isArray(value)) {
    // Please convert your array into string
    // the way web server expects it
    this._error(new Error('Arrays are not supported.'));
    return;
  }

  var header = this._multiPartHeader(field, value, options);
  var footer = this._multiPartFooter();

  append(header);
  append(value);
  append(footer);

  // pass along options.knownLength
  this._trackLength(header, value, options);
};

FormData.prototype._trackLength = function(header, value, options) {
  var valueLength = 0;

  // used w/ getLengthSync(), when length is known.
  // e.g. for streaming directly from a remote server,
  // w/ a known file a size, and not wanting to wait for
  // incoming file to finish to get its size.
  if (options.knownLength != null) {
    valueLength += +options.knownLength;
  } else if (Buffer.isBuffer(value)) {
    valueLength = value.length;
  } else if (typeof value === 'string') {
    valueLength = Buffer.byteLength(value);
  }

  this._valueLength += valueLength;

  // @check why add CRLF? does this account for custom/multiple CRLFs?
  this._overheadLength +=
    Buffer.byteLength(header) +
    FormData.LINE_BREAK.length;

  // empty or either doesn't have path or not an http response
  if (!value || ( !value.path && !(value.readable && value.hasOwnProperty('httpVersion')) )) {
    return;
  }

  // no need to bother with the length
  if (!options.knownLength) {
    this._valuesToMeasure.push(value);
  }
};

FormData.prototype._lengthRetriever = function(value, callback) {

  if (value.hasOwnProperty('fd')) {

    // take read range into a account
    // `end` = Infinity –> read file till the end
    //
    // TODO: Looks like there is bug in Node fs.createReadStream
    // it doesn't respect `end` options without `start` options
    // Fix it when node fixes it.
    // https://github.com/joyent/node/issues/7819
    if (value.end != undefined && value.end != Infinity && value.start != undefined) {

      // when end specified
      // no need to calculate range
      // inclusive, starts with 0
      callback(null, value.end + 1 - (value.start ? value.start : 0));

    // not that fast snoopy
    } else {
      // still need to fetch file size from fs
      fs.stat(value.path, function(err, stat) {

        var fileSize;

        if (err) {
          callback(err);
          return;
        }

        // update final size based on the range options
        fileSize = stat.size - (value.start ? value.start : 0);
        callback(null, fileSize);
      });
    }

  // or http response
  } else if (value.hasOwnProperty('httpVersion')) {
    callback(null, +value.headers['content-length']);

  // or request stream http://github.com/mikeal/request
  } else if (value.hasOwnProperty('httpModule')) {
    // wait till response come back
    value.on('response', function(response) {
      value.pause();
      callback(null, +response.headers['content-length']);
    });
    value.resume();

  // something else
  } else {
    callback('Unknown stream');
  }
};

FormData.prototype._multiPartHeader = function(field, value, options) {
  // custom header specified (as string)?
  // it becomes responsible for boundary
  // (e.g. to handle extra CRLFs on .NET servers)
  if (typeof options.header == 'string') {
    return options.header;
  }

  var contentDisposition = this._getContentDisposition(value, options);
  var contentType = this._getContentType(value, options);

  var contents = '';
  var headers  = {
    // add custom disposition as third element or keep it two elements if not
    'Content-Disposition': ['form-data', 'name="' + field + '"'].concat(contentDisposition || []),
    // if no content type. allow it to be empty array
    'Content-Type': [].concat(contentType || [])
  };

  // allow custom headers.
  if (typeof options.header == 'object') {
    populate(headers, options.header);
  }

  var header;
  for (var prop in headers) {
    if (!headers.hasOwnProperty(prop)) continue;
    header = headers[prop];

    // skip nullish headers.
    if (header == null) {
      continue;
    }

    // convert all headers to arrays.
    if (!Array.isArray(header)) {
      header = [header];
    }

    // add non-empty headers.
    if (header.length) {
      contents += prop + ': ' + header.join('; ') + FormData.LINE_BREAK;
    }
  }

  return '--' + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
};

FormData.prototype._getContentDisposition = function(value, options) {

  var filename
    , contentDisposition
    ;

  if (typeof options.filepath === 'string') {
    // custom filepath for relative paths
    filename = path.normalize(options.filepath).replace(/\\/g, '/');
  } else if (options.filename || value.name || value.path) {
    // custom filename take precedence
    // formidable and the browser add a name property
    // fs- and request- streams have path property
    filename = path.basename(options.filename || value.name || value.path);
  } else if (value.readable && value.hasOwnProperty('httpVersion')) {
    // or try http response
    filename = path.basename(value.client._httpMessage.path || '');
  }

  if (filename) {
    contentDisposition = 'filename="' + filename + '"';
  }

  return contentDisposition;
};

FormData.prototype._getContentType = function(value, options) {

  // use custom content-type above all
  var contentType = options.contentType;

  // or try `name` from formidable, browser
  if (!contentType && value.name) {
    contentType = mime.lookup(value.name);
  }

  // or try `path` from fs-, request- streams
  if (!contentType && value.path) {
    contentType = mime.lookup(value.path);
  }

  // or if it's http-reponse
  if (!contentType && value.readable && value.hasOwnProperty('httpVersion')) {
    contentType = value.headers['content-type'];
  }

  // or guess it from the filepath or filename
  if (!contentType && (options.filepath || options.filename)) {
    contentType = mime.lookup(options.filepath || options.filename);
  }

  // fallback to the default content type if `value` is not simple value
  if (!contentType && typeof value == 'object') {
    contentType = FormData.DEFAULT_CONTENT_TYPE;
  }

  return contentType;
};

FormData.prototype._multiPartFooter = function() {
  return function(next) {
    var footer = FormData.LINE_BREAK;

    var lastPart = (this._streams.length === 0);
    if (lastPart) {
      footer += this._lastBoundary();
    }

    next(footer);
  }.bind(this);
};

FormData.prototype._lastBoundary = function() {
  return '--' + this.getBoundary() + '--' + FormData.LINE_BREAK;
};

FormData.prototype.getHeaders = function(userHeaders) {
  var header;
  var formHeaders = {
    'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
  };

  for (header in userHeaders) {
    if (userHeaders.hasOwnProperty(header)) {
      formHeaders[header.toLowerCase()] = userHeaders[header];
    }
  }

  return formHeaders;
};

FormData.prototype.setBoundary = function(boundary) {
  this._boundary = boundary;
};

FormData.prototype.getBoundary = function() {
  if (!this._boundary) {
    this._generateBoundary();
  }

  return this._boundary;
};

FormData.prototype.getBuffer = function() {
  var dataBuffer = new Buffer.alloc( 0 );
  var boundary = this.getBoundary();

  // Create the form content. Add Line breaks to the end of data.
  for (var i = 0, len = this._streams.length; i < len; i++) {
    if (typeof this._streams[i] !== 'function') {

      // Add content to the buffer.
      if(Buffer.isBuffer(this._streams[i])) {
        dataBuffer = Buffer.concat( [dataBuffer, this._streams[i]]);
      }else {
        dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(this._streams[i])]);
      }

      // Add break after content.
      if (typeof this._streams[i] !== 'string' || this._streams[i].substring( 2, boundary.length + 2 ) !== boundary) {
        dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(FormData.LINE_BREAK)] );
      }
    }
  }

  // Add the footer and return the Buffer object.
  return Buffer.concat( [dataBuffer, Buffer.from(this._lastBoundary())] );
};

FormData.prototype._generateBoundary = function() {
  // This generates a 50 character boundary similar to those used by Firefox.
  // They are optimized for boyer-moore parsing.
  var boundary = '--------------------------';
  for (var i = 0; i < 24; i++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }

  this._boundary = boundary;
};

// Note: getLengthSync DOESN'T calculate streams length
// As workaround one can calculate file size manually
// and add it as knownLength option
FormData.prototype.getLengthSync = function() {
  var knownLength = this._overheadLength + this._valueLength;

  // Don't get confused, there are 3 "internal" streams for each keyval pair
  // so it basically checks if there is any value added to the form
  if (this._streams.length) {
    knownLength += this._lastBoundary().length;
  }

  // https://github.com/form-data/form-data/issues/40
  if (!this.hasKnownLength()) {
    // Some async length retrievers are present
    // therefore synchronous length calculation is false.
    // Please use getLength(callback) to get proper length
    this._error(new Error('Cannot calculate proper length in synchronous way.'));
  }

  return knownLength;
};

// Public API to check if length of added values is known
// https://github.com/form-data/form-data/issues/196
// https://github.com/form-data/form-data/issues/262
FormData.prototype.hasKnownLength = function() {
  var hasKnownLength = true;

  if (this._valuesToMeasure.length) {
    hasKnownLength = false;
  }

  return hasKnownLength;
};

FormData.prototype.getLength = function(cb) {
  var knownLength = this._overheadLength + this._valueLength;

  if (this._streams.length) {
    knownLength += this._lastBoundary().length;
  }

  if (!this._valuesToMeasure.length) {
    process.nextTick(cb.bind(this, null, knownLength));
    return;
  }

  asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
    if (err) {
      cb(err);
      return;
    }

    values.forEach(function(length) {
      knownLength += length;
    });

    cb(null, knownLength);
  });
};

FormData.prototype.submit = function(params, cb) {
  var request
    , options
    , defaults = {method: 'post'}
    ;

  // parse provided url if it's string
  // or treat it as options object
  if (typeof params == 'string') {

    params = parseUrl(params);
    options = populate({
      port: params.port,
      path: params.pathname,
      host: params.hostname,
      protocol: params.protocol
    }, defaults);

  // use custom params
  } else {

    options = populate(params, defaults);
    // if no port provided use default one
    if (!options.port) {
      options.port = options.protocol == 'https:' ? 443 : 80;
    }
  }

  // put that good code in getHeaders to some use
  options.headers = this.getHeaders(params.headers);

  // https if specified, fallback to http in any other case
  if (options.protocol == 'https:') {
    request = https.request(options);
  } else {
    request = http.request(options);
  }

  // get content length and fire away
  this.getLength(function(err, length) {
    if (err) {
      this._error(err);
      return;
    }

    // add content length
    request.setHeader('Content-Length', length);

    this.pipe(request);
    if (cb) {
      var onResponse;

      var callback = function (error, responce) {
        request.removeListener('error', callback);
        request.removeListener('response', onResponse);

        return cb.call(this, error, responce);
      };

      onResponse = callback.bind(this, null);

      request.on('error', callback);
      request.on('response', onResponse);
    }
  }.bind(this));

  return request;
};

FormData.prototype._error = function(err) {
  if (!this.error) {
    this.error = err;
    this.pause();
    this.emit('error', err);
  }
};

FormData.prototype.toString = function () {
  return '[object FormData]';
};


/***/ }),

/***/ 5712:
/***/ ((module) => {

// populates missing values
module.exports = function(dst, src) {

  Object.keys(src).forEach(function(prop)
  {
    dst[prop] = dst[prop] || src[prop];
  });

  return dst;
};


/***/ }),

/***/ 4561:
/***/ ((module) => {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};


/***/ }),

/***/ 7119:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var stringify = __nccwpck_require__(8275);
var parse = __nccwpck_require__(6778);
var formats = __nccwpck_require__(4561);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ 6778:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var utils = __nccwpck_require__(4712);

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    allowSparse: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    if (options.allowSparse === true) {
        return obj;
    }

    return utils.compact(obj);
};


/***/ }),

/***/ 8275:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var getSideChannel = __nccwpck_require__(4334);
var utils = __nccwpck_require__(4712);
var formats = __nccwpck_require__(4561);
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset,
    sideChannel
) {
    var obj = object;

    if (sideChannel.has(object)) {
        throw new RangeError('Cyclic object value');
    }

    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utils.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : undefined }];
    } else if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        var value = typeof key === 'object' && key.value !== undefined ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');

        sideChannel.set(object, true);
        var valueSideChannel = getSideChannel();
        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    var sideChannel = getSideChannel();
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ 4712:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var formats = __nccwpck_require__(4561);

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
            || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};


/***/ }),

/***/ 8265:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const ANY = Symbol('SemVer ANY')
// hoisted class for cyclic dependency
class Comparator {
  static get ANY () {
    return ANY
  }
  constructor (comp, options) {
    options = parseOptions(options)

    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp
      } else {
        comp = comp.value
      }
    }

    debug('comparator', comp, options)
    this.options = options
    this.loose = !!options.loose
    this.parse(comp)

    if (this.semver === ANY) {
      this.value = ''
    } else {
      this.value = this.operator + this.semver.version
    }

    debug('comp', this)
  }

  parse (comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
    const m = comp.match(r)

    if (!m) {
      throw new TypeError(`Invalid comparator: ${comp}`)
    }

    this.operator = m[1] !== undefined ? m[1] : ''
    if (this.operator === '=') {
      this.operator = ''
    }

    // if it literally is just '>' or '' then allow anything.
    if (!m[2]) {
      this.semver = ANY
    } else {
      this.semver = new SemVer(m[2], this.options.loose)
    }
  }

  toString () {
    return this.value
  }

  test (version) {
    debug('Comparator.test', version, this.options.loose)

    if (this.semver === ANY || version === ANY) {
      return true
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    return cmp(version, this.operator, this.semver, this.options)
  }

  intersects (comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError('a Comparator is required')
    }

    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false
      }
    }

    if (this.operator === '') {
      if (this.value === '') {
        return true
      }
      return new Range(comp.value, options).test(this.value)
    } else if (comp.operator === '') {
      if (comp.value === '') {
        return true
      }
      return new Range(this.value, options).test(comp.semver)
    }

    const sameDirectionIncreasing =
      (this.operator === '>=' || this.operator === '>') &&
      (comp.operator === '>=' || comp.operator === '>')
    const sameDirectionDecreasing =
      (this.operator === '<=' || this.operator === '<') &&
      (comp.operator === '<=' || comp.operator === '<')
    const sameSemVer = this.semver.version === comp.semver.version
    const differentDirectionsInclusive =
      (this.operator === '>=' || this.operator === '<=') &&
      (comp.operator === '>=' || comp.operator === '<=')
    const oppositeDirectionsLessThan =
      cmp(this.semver, '<', comp.semver, options) &&
      (this.operator === '>=' || this.operator === '>') &&
        (comp.operator === '<=' || comp.operator === '<')
    const oppositeDirectionsGreaterThan =
      cmp(this.semver, '>', comp.semver, options) &&
      (this.operator === '<=' || this.operator === '<') &&
        (comp.operator === '>=' || comp.operator === '>')

    return (
      sameDirectionIncreasing ||
      sameDirectionDecreasing ||
      (sameSemVer && differentDirectionsInclusive) ||
      oppositeDirectionsLessThan ||
      oppositeDirectionsGreaterThan
    )
  }
}

module.exports = Comparator

const parseOptions = __nccwpck_require__(6167)
const {re, t} = __nccwpck_require__(5422)
const cmp = __nccwpck_require__(8812)
const debug = __nccwpck_require__(1202)
const SemVer = __nccwpck_require__(6103)
const Range = __nccwpck_require__(9746)


/***/ }),

/***/ 9746:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// hoisted class for cyclic dependency
class Range {
  constructor (range, options) {
    options = parseOptions(options)

    if (range instanceof Range) {
      if (
        range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease
      ) {
        return range
      } else {
        return new Range(range.raw, options)
      }
    }

    if (range instanceof Comparator) {
      // just put it in the set and return
      this.raw = range.value
      this.set = [[range]]
      this.format()
      return this
    }

    this.options = options
    this.loose = !!options.loose
    this.includePrerelease = !!options.includePrerelease

    // First, split based on boolean or ||
    this.raw = range
    this.set = range
      .split(/\s*\|\|\s*/)
      // map the range to a 2d array of comparators
      .map(range => this.parseRange(range.trim()))
      // throw out any comparator lists that are empty
      // this generally means that it was not a valid range, which is allowed
      // in loose mode, but will still throw if the WHOLE range is invalid.
      .filter(c => c.length)

    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${range}`)
    }

    // if we have any that are not the null set, throw out null sets.
    if (this.set.length > 1) {
      // keep the first one, in case they're all null sets
      const first = this.set[0]
      this.set = this.set.filter(c => !isNullSet(c[0]))
      if (this.set.length === 0)
        this.set = [first]
      else if (this.set.length > 1) {
        // if we have any that are *, then the range is just *
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c]
            break
          }
        }
      }
    }

    this.format()
  }

  format () {
    this.range = this.set
      .map((comps) => {
        return comps.join(' ').trim()
      })
      .join('||')
      .trim()
    return this.range
  }

  toString () {
    return this.range
  }

  parseRange (range) {
    range = range.trim()

    // memoize range parsing for performance.
    // this is a very hot path, and fully deterministic.
    const memoOpts = Object.keys(this.options).join(',')
    const memoKey = `parseRange:${memoOpts}:${range}`
    const cached = cache.get(memoKey)
    if (cached)
      return cached

    const loose = this.options.loose
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
    range = range.replace(hr, hyphenReplace(this.options.includePrerelease))
    debug('hyphen replace', range)
    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
    debug('comparator trim', range, re[t.COMPARATORTRIM])

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace)

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[t.CARETTRIM], caretTrimReplace)

    // normalize spaces
    range = range.split(/\s+/).join(' ')

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    const compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
    const rangeList = range
      .split(' ')
      .map(comp => parseComparator(comp, this.options))
      .join(' ')
      .split(/\s+/)
      // >=0.0.0 is equivalent to *
      .map(comp => replaceGTE0(comp, this.options))
      // in loose mode, throw out any that are not valid comparators
      .filter(this.options.loose ? comp => !!comp.match(compRe) : () => true)
      .map(comp => new Comparator(comp, this.options))

    // if any comparators are the null set, then replace with JUST null set
    // if more than one comparator, remove any * comparators
    // also, don't include the same comparator more than once
    const l = rangeList.length
    const rangeMap = new Map()
    for (const comp of rangeList) {
      if (isNullSet(comp))
        return [comp]
      rangeMap.set(comp.value, comp)
    }
    if (rangeMap.size > 1 && rangeMap.has(''))
      rangeMap.delete('')

    const result = [...rangeMap.values()]
    cache.set(memoKey, result)
    return result
  }

  intersects (range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError('a Range is required')
    }

    return this.set.some((thisComparators) => {
      return (
        isSatisfiable(thisComparators, options) &&
        range.set.some((rangeComparators) => {
          return (
            isSatisfiable(rangeComparators, options) &&
            thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options)
              })
            })
          )
        })
      )
    })
  }

  // if ANY of the sets match ALL of its comparators, then pass
  test (version) {
    if (!version) {
      return false
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    for (let i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true
      }
    }
    return false
  }
}
module.exports = Range

const LRU = __nccwpck_require__(7129)
const cache = new LRU({ max: 1000 })

const parseOptions = __nccwpck_require__(6167)
const Comparator = __nccwpck_require__(8265)
const debug = __nccwpck_require__(1202)
const SemVer = __nccwpck_require__(6103)
const {
  re,
  t,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace
} = __nccwpck_require__(5422)

const isNullSet = c => c.value === '<0.0.0-0'
const isAny = c => c.value === ''

// take a set of comparators and determine whether there
// exists a version which can satisfy it
const isSatisfiable = (comparators, options) => {
  let result = true
  const remainingComparators = comparators.slice()
  let testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const parseComparator = (comp, options) => {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

const isX = id => !id || id.toLowerCase() === 'x' || id === '*'

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
const replaceTildes = (comp, options) =>
  comp.trim().split(/\s+/).map((comp) => {
    return replaceTilde(comp, options)
  }).join(' ')

const replaceTilde = (comp, options) => {
  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('tilde', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0-0
      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = `>=${M}.${m}.${p}-${pr
      } <${M}.${+m + 1}.0-0`
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0-0
      ret = `>=${M}.${m}.${p
      } <${M}.${+m + 1}.0-0`
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
const replaceCarets = (comp, options) =>
  comp.trim().split(/\s+/).map((comp) => {
    return replaceCaret(comp, options)
  }).join(' ')

const replaceCaret = (comp, options) => {
  debug('caret', comp, options)
  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  const z = options.includePrerelease ? '-0' : ''
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('caret', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      if (M === '0') {
        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`
      } else {
        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p}-${pr
        } <${+M + 1}.0.0-0`
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p
        } <${+M + 1}.0.0-0`
      }
    }

    debug('caret return', ret)
    return ret
  })
}

const replaceXRanges = (comp, options) => {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map((comp) => {
    return replaceXRange(comp, options)
  }).join(' ')
}

const replaceXRange = (comp, options) => {
  comp = comp.trim()
  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    const xM = isX(M)
    const xm = xM || isX(m)
    const xp = xm || isX(p)
    const anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      if (gtlt === '<')
        pr = '-0'

      ret = `${gtlt + M}.${m}.${p}${pr}`
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`
    } else if (xp) {
      ret = `>=${M}.${m}.0${pr
      } <${M}.${+m + 1}.0-0`
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const replaceStars = (comp, options) => {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '')
}

const replaceGTE0 = (comp, options) => {
  debug('replaceGTE0', comp, options)
  return comp.trim()
    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
const hyphenReplace = incPr => ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) => {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = `>=${fM}.0.0${incPr ? '-0' : ''}`
  } else if (isX(fp)) {
    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`
  } else if (fpr) {
    from = `>=${from}`
  } else {
    from = `>=${from}${incPr ? '-0' : ''}`
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = `<${+tM + 1}.0.0-0`
  } else if (isX(tp)) {
    to = `<${tM}.${+tm + 1}.0-0`
  } else if (tpr) {
    to = `<=${tM}.${tm}.${tp}-${tpr}`
  } else if (incPr) {
    to = `<${tM}.${tm}.${+tp + 1}-0`
  } else {
    to = `<=${to}`
  }

  return (`${from} ${to}`).trim()
}

const testSet = (set, version, options) => {
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (let i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === Comparator.ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}


/***/ }),

/***/ 6103:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const debug = __nccwpck_require__(1202)
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __nccwpck_require__(390)
const { re, t } = __nccwpck_require__(5422)

const parseOptions = __nccwpck_require__(6167)
const { compareIdentifiers } = __nccwpck_require__(6611)
class SemVer {
  constructor (version, options) {
    options = parseOptions(options)

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
          version.includePrerelease === !!options.includePrerelease) {
        return version
      } else {
        version = version.version
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }

    debug('SemVer', version, options)
    this.options = options
    this.loose = !!options.loose
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease

    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    this.raw = version

    // these are actually numbers
    this.major = +m[1]
    this.minor = +m[2]
    this.patch = +m[3]

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = []
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      })
    }

    this.build = m[5] ? m[5].split('.') : []
    this.format()
  }

  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`
    }
    return this.version
  }

  toString () {
    return this.version
  }

  compare (other) {
    debug('SemVer.compare', this.version, this.options, other)
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0
      }
      other = new SemVer(other, this.options)
    }

    if (other.version === this.version) {
      return 0
    }

    return this.compareMain(other) || this.comparePre(other)
  }

  compareMain (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }

  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    let i = 0
    do {
      const a = this.prerelease[i]
      const b = other.prerelease[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  compareBuild (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    let i = 0
    do {
      const a = this.build[i]
      const b = other.build[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc (release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.inc('pre', identifier)
        break
      case 'preminor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
        this.inc('pre', identifier)
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0
        this.inc('patch', identifier)
        this.inc('pre', identifier)
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier)
        }
        this.inc('pre', identifier)
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++
        }
        this.minor = 0
        this.patch = 0
        this.prerelease = []
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++
        }
        this.patch = 0
        this.prerelease = []
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++
        }
        this.prerelease = []
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        if (this.prerelease.length === 0) {
          this.prerelease = [0]
        } else {
          let i = this.prerelease.length
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++
              i = -2
            }
          }
          if (i === -1) {
            // didn't increment anything
            this.prerelease.push(0)
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0]
            }
          } else {
            this.prerelease = [identifier, 0]
          }
        }
        break

      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.format()
    this.raw = this.version
    return this
  }
}

module.exports = SemVer


/***/ }),

/***/ 8394:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const parse = __nccwpck_require__(9557)
const clean = (version, options) => {
  const s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}
module.exports = clean


/***/ }),

/***/ 8812:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const eq = __nccwpck_require__(9612)
const neq = __nccwpck_require__(4608)
const gt = __nccwpck_require__(2208)
const gte = __nccwpck_require__(7104)
const lt = __nccwpck_require__(7492)
const lte = __nccwpck_require__(5947)

const cmp = (a, op, b, loose) => {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError(`Invalid operator: ${op}`)
  }
}
module.exports = cmp


/***/ }),

/***/ 1590:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SemVer = __nccwpck_require__(6103)
const parse = __nccwpck_require__(9557)
const {re, t} = __nccwpck_require__(5422)

const coerce = (version, options) => {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  let match = null
  if (!options.rtl) {
    match = version.match(re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    let next
    while ((next = re[t.COERCERTL].exec(version)) &&
        (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
            next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    re[t.COERCERTL].lastIndex = -1
  }

  if (match === null)
    return null

  return parse(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options)
}
module.exports = coerce


/***/ }),

/***/ 6510:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SemVer = __nccwpck_require__(6103)
const compareBuild = (a, b, loose) => {
  const versionA = new SemVer(a, loose)
  const versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}
module.exports = compareBuild


/***/ }),

/***/ 7790:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const compare = __nccwpck_require__(7788)
const compareLoose = (a, b) => compare(a, b, true)
module.exports = compareLoose


/***/ }),

/***/ 7788:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SemVer = __nccwpck_require__(6103)
const compare = (a, b, loose) =>
  new SemVer(a, loose).compare(new SemVer(b, loose))

module.exports = compare


/***/ }),

/***/ 2613:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const parse = __nccwpck_require__(9557)
const eq = __nccwpck_require__(9612)

const diff = (version1, version2) => {
  if (eq(version1, version2)) {
    return null
  } else {
    const v1 = parse(version1)
    const v2 = parse(version2)
    const hasPre = v1.prerelease.length || v2.prerelease.length
    const prefix = hasPre ? 'pre' : ''
    const defaultResult = hasPre ? 'prerelease' : ''
    for (const key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}
module.exports = diff


/***/ }),

/***/ 9612:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const compare = __nccwpck_require__(7788)
const eq = (a, b, loose) => compare(a, b, loose) === 0
module.exports = eq


/***/ }),

/***/ 2208:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const compare = __nccwpck_require__(7788)
const gt = (a, b, loose) => compare(a, b, loose) > 0
module.exports = gt


/***/ }),

/***/ 7104:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const compare = __nccwpck_require__(7788)
const gte = (a, b, loose) => compare(a, b, loose) >= 0
module.exports = gte


/***/ }),

/***/ 6498:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SemVer = __nccwpck_require__(6103)

const inc = (version, release, options, identifier) => {
  if (typeof (options) === 'string') {
    identifier = options
    options = undefined
  }

  try {
    return new SemVer(version, options).inc(release, identifier).version
  } catch (er) {
    return null
  }
}
module.exports = inc


/***/ }),

/***/ 7492:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const compare = __nccwpck_require__(7788)
const lt = (a, b, loose) => compare(a, b, loose) < 0
module.exports = lt


/***/ }),

/***/ 5947:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const compare = __nccwpck_require__(7788)
const lte = (a, b, loose) => compare(a, b, loose) <= 0
module.exports = lte


/***/ }),

/***/ 5308:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SemVer = __nccwpck_require__(6103)
const major = (a, loose) => new SemVer(a, loose).major
module.exports = major


/***/ }),

/***/ 8948:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SemVer = __nccwpck_require__(6103)
const minor = (a, loose) => new SemVer(a, loose).minor
module.exports = minor


/***/ }),

/***/ 4608:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const compare = __nccwpck_require__(7788)
const neq = (a, b, loose) => compare(a, b, loose) !== 0
module.exports = neq


/***/ }),

/***/ 9557:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {MAX_LENGTH} = __nccwpck_require__(390)
const { re, t } = __nccwpck_require__(5422)
const SemVer = __nccwpck_require__(6103)

const parseOptions = __nccwpck_require__(6167)
const parse = (version, options) => {
  options = parseOptions(options)

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  const r = options.loose ? re[t.LOOSE] : re[t.FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

module.exports = parse


/***/ }),

/***/ 9819:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SemVer = __nccwpck_require__(6103)
const patch = (a, loose) => new SemVer(a, loose).patch
module.exports = patch


/***/ }),

/***/ 3856:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const parse = __nccwpck_require__(9557)
const prerelease = (version, options) => {
  const parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}
module.exports = prerelease


/***/ }),

/***/ 6997:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const compare = __nccwpck_require__(7788)
const rcompare = (a, b, loose) => compare(b, a, loose)
module.exports = rcompare


/***/ }),

/***/ 3573:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const compareBuild = __nccwpck_require__(6510)
const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose))
module.exports = rsort


/***/ }),

/***/ 3006:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Range = __nccwpck_require__(9746)
const satisfies = (version, range, options) => {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}
module.exports = satisfies


/***/ }),

/***/ 649:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const compareBuild = __nccwpck_require__(6510)
const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose))
module.exports = sort


/***/ }),

/***/ 9561:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const parse = __nccwpck_require__(9557)
const valid = (version, options) => {
  const v = parse(version, options)
  return v ? v.version : null
}
module.exports = valid


/***/ }),

/***/ 1449:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// just pre-load all the stuff that index.js lazily exports
const internalRe = __nccwpck_require__(5422)
module.exports = {
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: __nccwpck_require__(390).SEMVER_SPEC_VERSION,
  SemVer: __nccwpck_require__(6103),
  compareIdentifiers: __nccwpck_require__(6611).compareIdentifiers,
  rcompareIdentifiers: __nccwpck_require__(6611).rcompareIdentifiers,
  parse: __nccwpck_require__(9557),
  valid: __nccwpck_require__(9561),
  clean: __nccwpck_require__(8394),
  inc: __nccwpck_require__(6498),
  diff: __nccwpck_require__(2613),
  major: __nccwpck_require__(5308),
  minor: __nccwpck_require__(8948),
  patch: __nccwpck_require__(9819),
  prerelease: __nccwpck_require__(3856),
  compare: __nccwpck_require__(7788),
  rcompare: __nccwpck_require__(6997),
  compareLoose: __nccwpck_require__(7790),
  compareBuild: __nccwpck_require__(6510),
  sort: __nccwpck_require__(649),
  rsort: __nccwpck_require__(3573),
  gt: __nccwpck_require__(2208),
  lt: __nccwpck_require__(7492),
  eq: __nccwpck_require__(9612),
  neq: __nccwpck_require__(4608),
  gte: __nccwpck_require__(7104),
  lte: __nccwpck_require__(5947),
  cmp: __nccwpck_require__(8812),
  coerce: __nccwpck_require__(1590),
  Comparator: __nccwpck_require__(8265),
  Range: __nccwpck_require__(9746),
  satisfies: __nccwpck_require__(3006),
  toComparators: __nccwpck_require__(184),
  maxSatisfying: __nccwpck_require__(8489),
  minSatisfying: __nccwpck_require__(8128),
  minVersion: __nccwpck_require__(416),
  validRange: __nccwpck_require__(5513),
  outside: __nccwpck_require__(1086),
  gtr: __nccwpck_require__(9977),
  ltr: __nccwpck_require__(2207),
  intersects: __nccwpck_require__(6364),
  simplifyRange: __nccwpck_require__(6938),
  subset: __nccwpck_require__(1989),
}


/***/ }),

/***/ 390:
/***/ ((module) => {

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0'

const MAX_LENGTH = 256
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16

module.exports = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH,
  MAX_SAFE_INTEGER,
  MAX_SAFE_COMPONENT_LENGTH
}


/***/ }),

/***/ 1202:
/***/ ((module) => {

const debug = (
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {}

module.exports = debug


/***/ }),

/***/ 6611:
/***/ ((module) => {

const numeric = /^[0-9]+$/
const compareIdentifiers = (a, b) => {
  const anum = numeric.test(a)
  const bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a)

module.exports = {
  compareIdentifiers,
  rcompareIdentifiers
}


/***/ }),

/***/ 6167:
/***/ ((module) => {

// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
const opts = ['includePrerelease', 'loose', 'rtl']
const parseOptions = options =>
  !options ? {}
  : typeof options !== 'object' ? { loose: true }
  : opts.filter(k => options[k]).reduce((options, k) => {
    options[k] = true
    return options
  }, {})
module.exports = parseOptions


/***/ }),

/***/ 5422:
/***/ ((module, exports, __nccwpck_require__) => {

const { MAX_SAFE_COMPONENT_LENGTH } = __nccwpck_require__(390)
const debug = __nccwpck_require__(1202)
exports = module.exports = {}

// The actual regexps go on exports.re
const re = exports.re = []
const src = exports.src = []
const t = exports.t = {}
let R = 0

const createToken = (name, value, isGlobal) => {
  const index = R++
  debug(index, value)
  t[name] = index
  src[index] = value
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined)
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*')
createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+')

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*')

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`)

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`)

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`)

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`)

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`)

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`)

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+')

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`)

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`)

createToken('FULL', `^${src[t.FULLPLAIN]}$`)

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`)

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`)

createToken('GTLT', '((?:<|>)?=?)')

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`)
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`)

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`)

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`)

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`)
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`)

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCE', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:$|[^\\d])`)
createToken('COERCERTL', src[t.COERCE], true)

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)')

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true)
exports.tildeTrimReplace = '$1~'

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`)
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`)

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)')

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true)
exports.caretTrimReplace = '$1^'

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`)
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`)

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`)
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`)

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true)
exports.comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`)

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`)

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*')
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\.0\.0\\s*$')
createToken('GTE0PRE', '^\\s*>=\\s*0\.0\.0-0\\s*$')


/***/ }),

/***/ 9977:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Determine if version is greater than all the versions possible in the range.
const outside = __nccwpck_require__(1086)
const gtr = (version, range, options) => outside(version, range, '>', options)
module.exports = gtr


/***/ }),

/***/ 6364:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Range = __nccwpck_require__(9746)
const intersects = (r1, r2, options) => {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}
module.exports = intersects


/***/ }),

/***/ 2207:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const outside = __nccwpck_require__(1086)
// Determine if version is less than all the versions possible in the range
const ltr = (version, range, options) => outside(version, range, '<', options)
module.exports = ltr


/***/ }),

/***/ 8489:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SemVer = __nccwpck_require__(6103)
const Range = __nccwpck_require__(9746)

const maxSatisfying = (versions, range, options) => {
  let max = null
  let maxSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}
module.exports = maxSatisfying


/***/ }),

/***/ 8128:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SemVer = __nccwpck_require__(6103)
const Range = __nccwpck_require__(9746)
const minSatisfying = (versions, range, options) => {
  let min = null
  let minSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}
module.exports = minSatisfying


/***/ }),

/***/ 416:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SemVer = __nccwpck_require__(6103)
const Range = __nccwpck_require__(9746)
const gt = __nccwpck_require__(2208)

const minVersion = (range, loose) => {
  range = new Range(range, loose)

  let minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let setMin = null
    comparators.forEach((comparator) => {
      // Clone to avoid manipulating the comparator's semver object.
      const compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!setMin || gt(compver, setMin)) {
            setMin = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error(`Unexpected operation: ${comparator.operator}`)
      }
    })
    if (setMin && (!minver || gt(minver, setMin)))
      minver = setMin
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}
module.exports = minVersion


/***/ }),

/***/ 1086:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const SemVer = __nccwpck_require__(6103)
const Comparator = __nccwpck_require__(8265)
const {ANY} = Comparator
const Range = __nccwpck_require__(9746)
const satisfies = __nccwpck_require__(3006)
const gt = __nccwpck_require__(2208)
const lt = __nccwpck_require__(7492)
const lte = __nccwpck_require__(5947)
const gte = __nccwpck_require__(7104)

const outside = (version, range, hilo, options) => {
  version = new SemVer(version, options)
  range = new Range(range, options)

  let gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisfies the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let high = null
    let low = null

    comparators.forEach((comparator) => {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

module.exports = outside


/***/ }),

/***/ 6938:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.
const satisfies = __nccwpck_require__(3006)
const compare = __nccwpck_require__(7788)
module.exports = (versions, range, options) => {
  const set = []
  let min = null
  let prev = null
  const v = versions.sort((a, b) => compare(a, b, options))
  for (const version of v) {
    const included = satisfies(version, range, options)
    if (included) {
      prev = version
      if (!min)
        min = version
    } else {
      if (prev) {
        set.push([min, prev])
      }
      prev = null
      min = null
    }
  }
  if (min)
    set.push([min, null])

  const ranges = []
  for (const [min, max] of set) {
    if (min === max)
      ranges.push(min)
    else if (!max && min === v[0])
      ranges.push('*')
    else if (!max)
      ranges.push(`>=${min}`)
    else if (min === v[0])
      ranges.push(`<=${max}`)
    else
      ranges.push(`${min} - ${max}`)
  }
  const simplified = ranges.join(' || ')
  const original = typeof range.raw === 'string' ? range.raw : String(range)
  return simplified.length < original.length ? simplified : range
}


/***/ }),

/***/ 1989:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Range = __nccwpck_require__(9746)
const Comparator = __nccwpck_require__(8265)
const { ANY } = Comparator
const satisfies = __nccwpck_require__(3006)
const compare = __nccwpck_require__(7788)

// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
// - Every simple range `r1, r2, ...` is a null set, OR
// - Every simple range `r1, r2, ...` which is not a null set is a subset of
//   some `R1, R2, ...`
//
// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
// - If c is only the ANY comparator
//   - If C is only the ANY comparator, return true
//   - Else if in prerelease mode, return false
//   - else replace c with `[>=0.0.0]`
// - If C is only the ANY comparator
//   - if in prerelease mode, return true
//   - else replace C with `[>=0.0.0]`
// - Let EQ be the set of = comparators in c
// - If EQ is more than one, return true (null set)
// - Let GT be the highest > or >= comparator in c
// - Let LT be the lowest < or <= comparator in c
// - If GT and LT, and GT.semver > LT.semver, return true (null set)
// - If any C is a = range, and GT or LT are set, return false
// - If EQ
//   - If GT, and EQ does not satisfy GT, return true (null set)
//   - If LT, and EQ does not satisfy LT, return true (null set)
//   - If EQ satisfies every C, return true
//   - Else return false
// - If GT
//   - If GT.semver is lower than any > or >= comp in C, return false
//   - If GT is >=, and GT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the GT.semver tuple, return false
// - If LT
//   - If LT.semver is greater than any < or <= comp in C, return false
//   - If LT is <=, and LT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the LT.semver tuple, return false
// - Else return true

const subset = (sub, dom, options = {}) => {
  if (sub === dom)
    return true

  sub = new Range(sub, options)
  dom = new Range(dom, options)
  let sawNonNull = false

  OUTER: for (const simpleSub of sub.set) {
    for (const simpleDom of dom.set) {
      const isSub = simpleSubset(simpleSub, simpleDom, options)
      sawNonNull = sawNonNull || isSub !== null
      if (isSub)
        continue OUTER
    }
    // the null set is a subset of everything, but null simple ranges in
    // a complex range should be ignored.  so if we saw a non-null range,
    // then we know this isn't a subset, but if EVERY simple range was null,
    // then it is a subset.
    if (sawNonNull)
      return false
  }
  return true
}

const simpleSubset = (sub, dom, options) => {
  if (sub === dom)
    return true

  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY)
      return true
    else if (options.includePrerelease)
      sub = [ new Comparator('>=0.0.0-0') ]
    else
      sub = [ new Comparator('>=0.0.0') ]
  }

  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease)
      return true
    else
      dom = [ new Comparator('>=0.0.0') ]
  }

  const eqSet = new Set()
  let gt, lt
  for (const c of sub) {
    if (c.operator === '>' || c.operator === '>=')
      gt = higherGT(gt, c, options)
    else if (c.operator === '<' || c.operator === '<=')
      lt = lowerLT(lt, c, options)
    else
      eqSet.add(c.semver)
  }

  if (eqSet.size > 1)
    return null

  let gtltComp
  if (gt && lt) {
    gtltComp = compare(gt.semver, lt.semver, options)
    if (gtltComp > 0)
      return null
    else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<='))
      return null
  }

  // will iterate one or zero times
  for (const eq of eqSet) {
    if (gt && !satisfies(eq, String(gt), options))
      return null

    if (lt && !satisfies(eq, String(lt), options))
      return null

    for (const c of dom) {
      if (!satisfies(eq, String(c), options))
        return false
    }

    return true
  }

  let higher, lower
  let hasDomLT, hasDomGT
  // if the subset has a prerelease, we need a comparator in the superset
  // with the same tuple and a prerelease, or it's not a subset
  let needDomLTPre = lt &&
    !options.includePrerelease &&
    lt.semver.prerelease.length ? lt.semver : false
  let needDomGTPre = gt &&
    !options.includePrerelease &&
    gt.semver.prerelease.length ? gt.semver : false
  // exception: <1.2.3-0 is the same as <1.2.3
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false
  }

  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>='
    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<='
    if (gt) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomGTPre.major &&
            c.semver.minor === needDomGTPre.minor &&
            c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false
        }
      }
      if (c.operator === '>' || c.operator === '>=') {
        higher = higherGT(gt, c, options)
        if (higher === c && higher !== gt)
          return false
      } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options))
        return false
    }
    if (lt) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomLTPre.major &&
            c.semver.minor === needDomLTPre.minor &&
            c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false
        }
      }
      if (c.operator === '<' || c.operator === '<=') {
        lower = lowerLT(lt, c, options)
        if (lower === c && lower !== lt)
          return false
      } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options))
        return false
    }
    if (!c.operator && (lt || gt) && gtltComp !== 0)
      return false
  }

  // if there was a < or >, and nothing in the dom, then must be false
  // UNLESS it was limited by another range in the other direction.
  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
  if (gt && hasDomLT && !lt && gtltComp !== 0)
    return false

  if (lt && hasDomGT && !gt && gtltComp !== 0)
    return false

  // we needed a prerelease range in a specific tuple, but didn't get one
  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
  // because it includes prereleases in the 1.2.3 tuple
  if (needDomGTPre || needDomLTPre)
    return false

  return true
}

// >=1.2.3 is lower than >1.2.3
const higherGT = (a, b, options) => {
  if (!a)
    return b
  const comp = compare(a.semver, b.semver, options)
  return comp > 0 ? a
    : comp < 0 ? b
    : b.operator === '>' && a.operator === '>=' ? b
    : a
}

// <=1.2.3 is higher than <1.2.3
const lowerLT = (a, b, options) => {
  if (!a)
    return b
  const comp = compare(a.semver, b.semver, options)
  return comp < 0 ? a
    : comp > 0 ? b
    : b.operator === '<' && a.operator === '<=' ? b
    : a
}

module.exports = subset


/***/ }),

/***/ 184:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Range = __nccwpck_require__(9746)

// Mostly just for testing and legacy API reasons
const toComparators = (range, options) =>
  new Range(range, options).set
    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '))

module.exports = toComparators


/***/ }),

/***/ 5513:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Range = __nccwpck_require__(9746)
const validRange = (range, options) => {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}
module.exports = validRange


/***/ }),

/***/ 9318:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const os = __nccwpck_require__(2087);
const tty = __nccwpck_require__(3867);
const hasFlag = __nccwpck_require__(1621);

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if ('GITHUB_ACTIONS' in env) {
		return 1;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty.isatty(1))),
	stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};


/***/ }),

/***/ 4091:
/***/ ((module) => {

"use strict";

module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value
    }
  }
}


/***/ }),

/***/ 665:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  if (walker === null) {
    walker = this.tail
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i])
  }
  return ret;
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

try {
  // add if support for Symbol.iterator is present
  __nccwpck_require__(4091)(Yallist)
} catch (er) {}


/***/ }),

/***/ 4120:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 4120;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 3313:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true},"application/atsc-held+xml":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/cbor":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["ecma","es"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true},"application/fhir+json":{"source":"iana","compressible":true},"application/fhir+xml":{"source":"iana","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true},"application/mmt-usd+xml":{"source":"iana","compressible":true},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","compressible":true},"application/msc-mixer+xml":{"source":"iana","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana"},"application/news-groupinfo":{"source":"iana"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana"},"application/nss":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p2p-overlay+xml":{"source":"iana","compressible":true},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana"},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","compressible":true},"application/pidf-diff+xml":{"source":"iana","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true},"application/route-s-tsid+xml":{"source":"iana","compressible":true},"application/route-usd+xml":{"source":"iana","compressible":true},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana"},"application/ttml+xml":{"source":"iana","compressible":true},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true},"application/urc-targetdesc+xml":{"source":"iana","compressible":true},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["keynote"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana"},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana"},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","compressible":true},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"apache","extensions":["der","crt","pem"]},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true},"application/xcap-caps+xml":{"source":"iana","compressible":true},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana"},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana"},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana"},"image/avcs":{"source":"iana"},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shex":{"extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana"},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana"},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}');

/***/ }),

/***/ 2357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");;

/***/ }),

/***/ 4293:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");;

/***/ }),

/***/ 3129:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");;

/***/ }),

/***/ 6417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ 8614:
/***/ ((module) => {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 7565:
/***/ ((module) => {

"use strict";
module.exports = require("http2");;

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 1631:
/***/ ((module) => {

"use strict";
module.exports = require("net");;

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 1191:
/***/ ((module) => {

"use strict";
module.exports = require("querystring");;

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 4304:
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");;

/***/ }),

/***/ 8213:
/***/ ((module) => {

"use strict";
module.exports = require("timers");;

/***/ }),

/***/ 4016:
/***/ ((module) => {

"use strict";
module.exports = require("tls");;

/***/ }),

/***/ 3867:
/***/ ((module) => {

"use strict";
module.exports = require("tty");;

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var fs = __nccwpck_require__(5747);
var core = __nccwpck_require__(2186);
var exec = __nccwpck_require__(1514);
var superagent = __nccwpck_require__(1524);
// import buildExec from './buildExec';
// const {failCi} = buildExec();
try {
    superagent.get('https://uploader.codecov.io/latest/codecov-linux').end(function (err, res) {
        if (err) {
            core.setFailed('Codecov: Could not properly download uploader binary: ' +
                ("" + err.message));
        }
        console.log(res.body);
        var filename = __dirname + '/uploader';
        fs.writeFile(filename, res.body, function (err) {
            console.log('Did it');
            if (err) {
                core.setFailed('Codecov: Could not properly write uploader binary: ' +
                    ("" + err.message));
            }
            fs.chmodSync(filename, '777');
            console.log('wrote it');
            console.log(__dirname);
            console.log(fs.readdirSync(__dirname));
            console.log(filename);
            if (fs.existsSync(filename)) {
                console.log('file exists');
            }
            else {
                console.log('file does not exist');
            }
            console.log(fs.statSync(filename));
            exec.exec(filename)["catch"](function (err) {
                core.setFailed("Codecov failed with the following error: " + err.message);
            })
                .then(function () {
                console.log('finished!');
            });
        });
    });
}
catch (err) {
    core.setFailed("Codecov: Encountered an unexpected error: " + err.message);
}

})();

module.exports = __webpack_exports__;
/******/ })()
;