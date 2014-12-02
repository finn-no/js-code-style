var path = require('path');
var fs = require('fs');
var exec = require('sync-exec');
var jshintStylish = require(require('jshint-stylish'));
var JSHINTRC = '.jshintrc';
var NODE_MODULES = __dirname + '/../node_modules';
var USAGE = [
    'Usage: finn-js-code-style <file | dir>...',
    'Use the .jshintrc file for jshint config (should \"extend\": \"./node_modules/finn-js-code-style/.jshintrc\")',
    'Use the .jshintignore to exclude files or folders'
].join('\n');

function osSep (pathStr) {
    return pathStr.replace(/\//g, path.sep);
}

function isProjectRoot () {
    return fs.existsSync(osSep(process.cwd() + '/package.json'));
}

module.exports = function (args) {
    var cmd, result, failed;
    var currentDir = process.cwd();
    var jshintRc = osSep(currentDir + '/' + JSHINTRC);
    var jsonReporter = '--reporter ' + osSep(NODE_MODULES + '/jshint-json/json.js');

    if (!fs.existsSync(jshintRc) && isProjectRoot()) {
        console.log('No .jshintrc found. Creating...');
        fs.writeFileSync(jshintRc, '{\n    \"extends\": \"./node_modules/finn-js-code-style/.jshintrc\"\n}\n');
    }

    if (args.length === 0 || args[0] === '--help') {
        console.log(USAGE);
        process.exit(1);
    }

    cmd = osSep(NODE_MODULES + '/.bin/jshint ') + jsonReporter + ' ' + args.join(' ');
    result = exec(cmd);
    failed = !!result.status;
    if (failed && result.stderr) {
        console.log('jshint error!');
        console.log('jshint command used: ' + cmd);
        if (result.stderr) { console.log(result.stderr); }
    } else if (failed !== 0 && result.stdout) {
        var report = JSON.parse(result.stdout);
        jshintStylish.reporter(report.result, report.data);
    }
};
