var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var resolveBin = require('resolve-bin');
var jshintStylish = require('jshint-stylish');
var resultSummary = require('./resultSummary.js');

var JSHINTRC = '.jshintrc';
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

function jshint (args, options) {
    resolveBin('jshint', function (err, bin) {
        if (err) {
            console.log(err.message);
            process.exit(1);
        }
        var cmd = bin + ' ' + args;
        exec(cmd, {timeout: 10000, maxBuffer: 1024*1024}, jshintCallback.bind(null, cmd, options));
    });
}

function jshintCallback (cmd, options, err, stdout, stderr) {
    var report;

    if (isRuntimeError(err)) {
        console.error('jshint command failed, runned with: ' + cmd);
        console.error(stderr || err.message);
        process.exit(err.code);
    }

    try {
        report = JSON.parse(stdout.toString());
    } catch (e) {
        console.error('Couldn\'t parse JSHint report object', e);
        process.exit(1);
    }

    if (isStyleError(err)) {
        jshintStylish.reporter(report.result, report.data);
        handleStyleError(err, report, options);
    }
}

function handleStyleError (err, report, options) {
    var summary = resultSummary(report.result);

    if (options.maxErrors != null && summary.errors > options.maxErrors) {
        printErrorAndExit('Max errors exceeded! (Max ' + options.maxErrors + ', but was ' + summary.errors + ')', err.code);
    }

    if (options.maxWarnings != null && summary.warnings > options.maxWarnings) {
        printErrorAndExit('Max warnings exceeded! (Max ' + options.maxWarnings + ', but was ' + summary.warnings + ')', err.code);
    }
}

function printErrorAndExit (msg, errCode) {
    console.error(msg);
    process.exit(errCode);
}

module.exports = function cli(options) {
    var jsonReporter = '--reporter ' + require.resolve('jshint-json/json.js');
    var filesToHint = excludeOpts(options.files).join(' ');

    validateLocalJsHintRc();

    jshint(jsonReporter + ' ' + filesToHint, options);
};
