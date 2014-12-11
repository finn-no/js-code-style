var path = require('path');
var fs = require('fs');
var exec = require('shelljs').exec;
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
    var cmd, result, report;
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

    cmd = path.join(NODE_MODULES, '.bin', 'jshint') +  ' ' + jsonReporter + ' ' + args.join(' ');
    result = exec(cmd, {silent: true});

    if (result.code === 1 && result.output) {
        console.log('jshint command used: ' + cmd);
        console.log(result.output);
    } else if (result.code === 2 && result.output) {
        report = JSON.parse(result.output);
        jshintStylish.reporter(report.result, report.data);
    }
};
