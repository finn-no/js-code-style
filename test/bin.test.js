var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('expect');

var path = require('path');
var exec = require('child_process').exec;

var binPath = path.resolve(process.cwd(), 'bin', 'finn-js-code-style');
var failingJsPath = path.join(__dirname, 'fixtures', 'warnings.js');
var errorJsPath = path.join(__dirname, 'fixtures', 'error.js');

function assertBinError (cmd, errMessagePart, done) {
    exec(cmd, function onExecResult(err, stdout, stderr) {
        expect(err).toExist();
        expect(err.code).toEqual(1);
        expect(stderr).toContain(errMessagePart);
        done();
    });
}

lab.test('CLI exits successfully when generating errors and runned without options', function (done) {
    var cmd = [binPath, failingJsPath].join(' ');
    exec(cmd, function onExecResult(err) {
        expect(err).toNotExist();
        done();
    });
});

lab.test('CLI exits with code 1 when generating errors and runned with --max-warnings 1', function (done) {
    var cmd = [binPath, '--max-warnings 1', failingJsPath].join(' ');
    assertBinError(cmd, '(Max warnings 1, but was 2)', done);
});

lab.test('CLI exits with code 1 when generating errors and runned with --max-errors 1', function (done) {
    var cmd = [binPath, '--max-errors 0', errorJsPath].join(' ');
    assertBinError(cmd, '(Max errors 0, but was 1)', done);
});


lab.test('CLI exits with code 1 when generating warnings and runned with --fail', function (done) {
    var cmd = [binPath, '--fail', failingJsPath].join(' ');
    assertBinError(cmd, '(Max errors 0, but was 7)', done);
});

lab.test('CLI exits with code 1 when generating errors and runned with --fail', function (done) {
    var cmd = [binPath, '--fail', errorJsPath].join(' ');
    assertBinError(cmd, '(Max errors 0, but was 1)', done);
});
