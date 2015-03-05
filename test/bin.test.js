var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');

var path = require('path');
var exec = require('child_process').exec;

var binPath = path.resolve(process.cwd(), 'bin', 'finn-js-code-style');

lab.test('CLI exits with code 1 when generating errors and runned with --fail', function (done) {
    var args = [binPath, __dirname + '/fixtures/invalid_jshint.js', '--fail'];

    exec(args.join(' '), function onExecResult(err) {
        assert.equal(err.code, 1);
        done();
    });
});

lab.test('CLI exits successfullt when generating errors and runned without --fail', function (done) {
    var args = [binPath, __dirname + '/fixtures/invalid_jshint.js'];

    exec(args.join(' '), function onExecResult(err) {
        assert.equal(err, null);
        done();
    });
});
