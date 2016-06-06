const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = require('expect');

const path = require('path');
const exec = require('child_process').exec;

const binPath = path.resolve(process.cwd(), 'bin', 'finn-js-code-style');
const failingJsPath = path.join(__dirname, 'fixtures', 'warnings.js');
const errorJsPath = path.join(__dirname, 'fixtures', 'error.js');

function assertBinError (cmd, errMessagePart, done) {
    exec(cmd, function onExecResult (err, stdout, stderr) {
        const EXPECTED_ERR_CODE = 1;
        expect(err).toExist();
        expect(err.code).toEqual(EXPECTED_ERR_CODE);
        expect(stderr).toContain(errMessagePart);
        done();
    });
}

lab.test('CLI exits successfully when generating errors without options', function (done) {
    const cmd = [binPath, failingJsPath].join(' ');
    exec(cmd, function onExecResult (err) {
        expect(err).toNotExist();
        done();
    });
});

/*lab.test('CLI exits with code 1 when generating errors with --max-warnings 1', function (done) {
    const cmd = [binPath, '--max-warnings 1', failingJsPath].join(' ');
    assertBinError(cmd, '(Max warnings 1, but was 2)', done);
});*/

lab.test('CLI exits with code 1 when generating errors with --max-errors 1', function (done) {
    const cmd = [binPath, '--max-errors 0', errorJsPath].join(' ');
    assertBinError(cmd, '(Max errors 0, but was 1)', done);
});


lab.test('CLI exits with code 1 when generating warnings with --fail', function (done) {
    const cmd = [binPath, '--fail', failingJsPath].join(' ');
    console.log(cmd);
    assertBinError(cmd, '(Max errors 0, but was 4)', done);
});

lab.test('CLI exits with code 1 when generating errors with --fail', function (done) {
    const cmd = [binPath, '--fail', errorJsPath].join(' ');
    assertBinError(cmd, '(Max errors 0, but was 1)', done);
});
