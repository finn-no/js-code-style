'use strict';

const extend = require('util')._extend;
const CLIEngine = require('eslint').CLIEngine;
const stylish = require('eslint/lib/formatters/stylish');

const NOT_FOUND = -1;
const ERR_EXIT_CODE = 1;
function excludeOpts (args) {
    return args.filter(function (arg) {
        return arg.indexOf('--') === NOT_FOUND;
    });
}

function commaStrToArr (str) {
    if (!str) {
        return null;
    }
    return str.split(',');
}

function lint (args, options) {
    const cli = new CLIEngine({
        configFile: options.config || null,
        baseConfig: {
            extends: ['finn'],
            envs: commaStrToArr(options.env)
        },
        useEslintrc: true
    });
    const linted = cli.executeOnFiles(args);
    return extend({
        output: stylish(linted.results)
    }, linted);
}

function printErrorAndExit (msg) {
    console.error(msg);
    process.exit(ERR_EXIT_CODE);
}

function handleStyleError (report, options) {
    if (options.maxErrors !== null && report.errorCount > options.maxErrors) {
        printErrorAndExit(`\ud83d\ude40  Meee-ow! I think your paw was a bit clumsy there!
                          (Max errors ${options.maxErrors}, but was ${report.errorCount})`.replace(/^\s*/gm, ''));
    }

    if (options.maxWarnings !== null && report.warningCount > options.maxWarnings) {
        printErrorAndExit(`\ud83d\ude48  Whoopsy! I promise not to watch while you fix a few code style issues.
                          (Max warnings ${options.maxWarnings}, but was ${report.warningCount})`.replace(/^\s*/gm, ''));
    }
}

module.exports = function cli (options) {
    const pathsToLint = excludeOpts(options.files);
    const report = lint(pathsToLint, options);

    console.log(report.output);

    handleStyleError(report, options);
};
