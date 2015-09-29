var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var resolveBin = require('resolve-bin');
var jshintStylish = require(require('jshint-stylish'));

var JSHINTRC = '.jshintrc';
var NODE_MODULES = __dirname + '/../node_modules';
var USAGE = [
    'Usage:',
    '\tfinn-js-code-style [options] <file | dir>...',
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

function isRuntimeError(err) {
    return err && err.code === 1 && err.message;
}

function isStyleError(err) {
    return err && err.code === 2  && err.message;
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

module.exports = function cli(args) {
    var jsonReporter = '--reporter ' + path.join(NODE_MODULES, 'jshint-json', 'json.js');

    var shouldFail = args[0] === '--fail';
    var filesToHint = excludeOpts(args).join(' ');

    validateLocalJsHintRc();

    if (args.length === 0 || args[0] === '--help') {
        console.log(USAGE);
        process.exit(1);
    }

    jshint(jsonReporter + ' ' + filesToHint, shouldFail);
};

function jshint (args, shouldFail) {
    resolveBin('jshint', function (err, bin) {
        if (err) {
            console.log(err.message);
            process.exit(1);
        }
        var cmd = bin + ' ' + args;
        exec(cmd, {timeout: 10000}, jshintCallback.bind(null, cmd, shouldFail));
    });
}

function jshintCallback (cmd, shouldFail, err, stdout, stderr) {
    var report;

    if (isRuntimeError(err)) {
        console.error('jshint command failed, runned with: ' + cmd);
        console.error(stderr || err.message);
        process.exit(err.code);
    }

    try {
        report = JSON.parse(stdout.toString());
    } catch (e) {}

    if (!report) {
        console.error('Couldn\'t parse JSHint report object');
        process.exit(1);
    }

    if (isStyleError(err)) {
        jshintStylish.reporter(report.result, report.data);

        if (shouldFail) {
            process.exit(err.code);
        }
    }
}
