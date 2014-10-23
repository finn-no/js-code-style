var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');
var Checker = require('jscs');
var fs = require('fs');

function getJSON(n) {
    return JSON.parse(fs.readFileSync(n, 'utf8'));
}

function getFixture(n) {
    return fs.readFileSync(__dirname + '/fixtures/'+n, 'utf8');
}

lab.test('Valid content should not generate errors', function (done) {
    var checker = new Checker();
    checker.registerDefaultRules();
    checker.configure(getJSON(__dirname + '/../.jscsrc'));

    var errors = checker.checkString(getFixture('valid.js'));

    assert.equal(errors._errorList.length, 0);

    done();
});


lab.test('Invalid content should not generate errors', function (done) {
    var checker = new Checker();
    checker.registerDefaultRules();
    checker.configure(getJSON(__dirname + '/../.jscsrc'));

    var errors = checker.checkString(getFixture('invalid_jscs.js'));
    assert.equal(errors._errorList.length, 1);

    done();
});
