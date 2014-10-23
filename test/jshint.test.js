var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');
// var jshint = require('jshint').JSHINT;
var jshintcli = require('jshint/src/cli');

lab.test('Valid content should not generate errors', function (done) {
    var config = jshintcli.loadConfig(__dirname + '/../.jshintrc');

    config.args = [__dirname + '/fixtures/invalid_jshint.js'];
    config.verbose = true;

    var errors = [];
    config.reporter = function(result/*, data, options*/){
        errors.push(result);
    };

    jshintcli.run(config);

    assert.equal(errors.length, 1);
    done();
});
