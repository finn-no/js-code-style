var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var resolveBin = require('resolve-bin');
var jshintStylish = require(require('jshint-stylish'));
var JSHINTRC = '.jshintrc';
var NODE_MODULES = __dirname + '/../node_modules';
var USAGE = [
    'Usage: finn-js-code-style <file | dir>...',
    'Use the .jshintrc file for jshint config (should \"extend\": \"./node_modules/finn-js-code-style/.jshintrc\")',
    'Use the .jshintignore to exclude files or folders'
].join('\n');

function isProjectRoot () {
    return fs.existsSync( path.join(process.cwd(), 'package.json') );
}

module.exports = function (args) {
    var currentDir = process.cwd();
    var jshintRc = path.join(currentDir, JSHINTRC);
    var jsonReporter = '--reporter ' + path.join(NODE_MODULES, 'jshint-json', 'json.js');

    if (!fs.existsSync(jshintRc) && isProjectRoot()) {
        console.log('No .jshintrc found. Creating...');
        fs.writeFileSync(jshintRc, '{\n    \"extends\": \"./node_modules/finn-js-code-style/.jshintrc\"\n}\n');
    }

    if (args.length === 0 || args[0] === '--help') {
        console.log(USAGE);
        process.exit(1);
    }

    jshint(jsonReporter + ' ' + args.join(' '));
};

function jshint (args) {
    resolveBin('jshint', function (err, bin) {
        if (err) {
            console.log(err.message);
            process.exit(1);
        }

        exec(bin + ' ' + args, {timeout: 10000}, jshintCallback);
    });
}

function jshintCallback (err, stdout, stderr) {
    var report;
    if (err && err.code === 1) {
        console.log(stderr || err.message);
        process.exit(err.code);
    }

    try {
        report = JSON.parse(stdout.toString());
    } catch (e) {}

    if (!report) {
        console.log('ERROR: Couldn\'t parse JSHint report object');
        process.exit(1);
    }

    jshintStylish.reporter(report.result, report.data);

    /*if (err && err.code === 2) {
        process.exit(err.code);
    }*/
}
