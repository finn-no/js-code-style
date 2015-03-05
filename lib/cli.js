var path = require('path');
var fs = require('fs');
var exec = require('shelljs').exec;
var jshintStylish = require(require('jshint-stylish'));

var JSHINTRC = '.jshintrc';
var NODE_MODULES = __dirname + '/../node_modules';
var USAGE = [
    'Usage: finn-js-code-style <file | dir>...',
    '',
    'Use the .jshintrc file for jshint config (should "extends": "./node_modules/finn-js-code-style/.jshintrc")',
    'Use the .jshintignore to exclude files or folders',
    '',
    'Options:',
    '\t--fail : exits with code 1 when errors are generated',
    '\t--help : usage info'
].join('\n');

var jshintRcPath = path.join(process.cwd(), JSHINTRC);

function isProjectRoot () {
    return fs.existsSync( path.join(process.cwd(), 'package.json') );
}

function isRuntimeError(execResult) {
    return execResult.code === 1 && execResult.output;
}

function isStyleError(execResult) {
    return execResult.code === 2  && execResult.output;
}

function isError(execResult) {
    return execResult.code !== 0;
}

function excludeOpts(args) {
    return args.filter(function(arg) {
        return arg.indexOf('--') === -1;
    });
}

function validateLocalJsHintRc() {
    if (!fs.existsSync(jshintRcPath) && isProjectRoot()) {
        console.log('No .jshintrc found. Creating...');
        fs.writeFileSync(jshintRcPath, '{\n    \"extends\": \"./node_modules/finn-js-code-style/.jshintrc\"\n}\n');
    }
}

function displayResult(result, cmd) {
    var report;

    if (isRuntimeError(result)) {
        console.error('jshint command failed, runned with: ' + cmd);
        console.error(result.output);
    } else if (isStyleError(result)) {
        report = JSON.parse(result.output);
        jshintStylish.reporter(report.result, report.data);
    }
}

module.exports = function cli(args) {
    var cmd, result;
    var jsonReporter = '--reporter ' + path.join(NODE_MODULES, 'jshint-json', 'json.js');
    var shouldFail = args.indexOf('--fail') > -1;
    var filesToHint = excludeOpts(args).join(' ');

    validateLocalJsHintRc();

    if (args.length === 0 || args[0] === '--help') {
        console.log(USAGE);
        process.exit(1);
    }

    cmd = path.join(NODE_MODULES, '.bin', 'jshint') +  ' ' + jsonReporter + ' ' + filesToHint;
    result = exec(cmd, {silent: true});

    displayResult(result, cmd);

    if (isError(result) && shouldFail) {
        process.exit(1);
    }
};
