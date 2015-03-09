var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');

var path = require('path');
var exec = require('child_process').exec;

var binPath = path.resolve(process.cwd(), 'bin', 'finn-js-code-style');
var failingJsPath = path.join(__dirname, 'fixtures', 'invalid_jshint.js');

lab.test('CLI exits with code 1 when generating errors and runned with --fail', function (done) {
    var args = [binPath, '--fail', failingJsPath];

    exec(args.join(' '), function onExecResult(err) {
        assert.equal(err.code, 1);
        done();
    });
});

lab.test('CLI exits successfullt when generating errors and runned without --fail', function (done) {
    var args = [binPath, failingJsPath];

    exec(args.join(' '), function onExecResult(err) {
        assert.equal(err, null);
        done();
    });
});

lab.test('CLI ignores --fail if it´s after files/folders', function (done) {
    var args = [binPath, failingJsPath, '--fail'];

    exec(args.join(' '), function onExecResult(err) {
        assert.equal(err, null);
        done();
    });
});
