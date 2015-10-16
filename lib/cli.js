'use strict';


var extend = require('util')._extend;
var CLIEngine = require('eslint').CLIEngine;
var stylish = require('eslint/lib/formatters/stylish');

function excludeOpts(args) {
    return args.filter(function(arg) {
        return arg.indexOf('--') === -1;
    });
}

function prependSpt (envName) {
    return 'spt/env-' + envName;
}

function extendsConfig (env) {
    var sptEnvs;
    var excplicitEnvs = env;

    if (!Array.isArray(excplicitEnvs)) {
        excplicitEnvs = (typeof env === 'string') ? env.split(',') : [];
    }

    sptEnvs = excplicitEnvs.map(prependSpt);

    return [
        'spt',
        'spt/env-es6-false'
    ].concat(sptEnvs);
}

function lint (args, options) {
    var cli = new CLIEngine({
        baseConfig: {
            extends: extendsConfig(options.env)
        },
        useEslintrc: true
    });
    var linted = cli.executeOnFiles(args);
    return extend({
        output: stylish(linted.results)
    }, linted);
}

function printErrorAndExit (msg) {
    console.error(msg);
    process.exit(1);
}

function handleStyleError (report, options) {
    if (options.maxErrors !== null && report.errorCount > options.maxErrors) {
        printErrorAndExit('\ud83d\ude40  Meee-ow! I think your paw was a bit clumsy there! ' +
                          '(Max errors ' + options.maxErrors + ', but was ' + report.errorCount + ')');
    }

    if (options.maxWarnings !== null && report.warningCount > options.maxWarnings) {
        printErrorAndExit('\ud83d\ude48  Whoopsy! I promise not to watch while you fix a few code style issues. ' +
                          '(Max warnings ' + options.maxWarnings + ', but was ' + report.warningCount + ')');
    }
}

module.exports = function cli(options) {
    var pathsToLint = excludeOpts(options.files);
    var report = lint(pathsToLint, options);

    console.log(report.output);

    handleStyleError(report, options);
};
