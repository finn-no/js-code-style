var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var jshintStylish = require('jshint-stylish');
var resultSummary = require('./resultSummary.js');

var JSHINTRC = '.jshintrc';
var NODE_MODULES = path.join(__dirname, '..', 'node_modules');
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
    var cmd = path.join(NODE_MODULES, '.bin', 'jshint') + ' ' + args;
    exec(cmd, {timeout: 1000 * 60 * 5, maxBuffer: 1024*1024}, jshintCallback.bind(null, cmd, options));
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
        if (err) {
            console.log('JSHint err (' + err.code + '): ' + err.message);
        }
        if (stderr) {
            console.error('JSHint stderr: ' + stderr.toString());
        }
        var output = stdout.toString();
        console.error('JSHint output type: ' + typeof output);
        console.error('JSHint output length: ' + output.length);
        if (output.length && output.length < 50) {
            console.error('JSHint output: ' + output);
        } else if (output.length) {
            var outputHead = output.substr(0, 15);
            var outputTail = output.substr(output.length - 15, 15);
            console.error('JSHint output start/end: ' + outputHead + '...' + outputTail);
        }
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
        printErrorAndExit('\ud83d\ude40  Meee-ow! I think your paw was a bit clumsy there! ' +
                          '(Max errors ' + options.maxErrors + ', but was ' + summary.errors + ')', err.code);
    }

    if (options.maxWarnings != null && summary.warnings > options.maxWarnings) {
        printErrorAndExit('\ud83d\ude48  Whoopsy! I promise not to watch while you fix a few code style issues. ' +
                          '(Max warnings ' + options.maxWarnings + ', but was ' + summary.warnings + ')', err.code);
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
