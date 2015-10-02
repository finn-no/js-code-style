# FINN.no JavaScript code style

This project is meant for internal JS-code at FINN.no, but we have many public JS projects which also want to use the same code style. Feel free to use/fork, but it probably will become very FINN specific, so we don't expect it to be very useful for others.

## Just a start...
The JSHint config is just a beginning and up for discussion. The most important is that we land on a config that everyone uses. So it's better with a relaxed config that everyone use than a strict config that nobody wants to use. But the main concept of linting code is to avoid potential typos, so it's a fine balance...

Add a pull-request if you want to change something and we can discuss on the pull-request. One pull-request pr option change. Please include the [description of the option](http://www.jshint.com/docs/options/) in the PR description :)

## Install

    npm install --save-dev finn-js-code-style

## Use

This command will run jshint on the files you specify. In the future, it will probably do more code style checks on the same set of files.

    finn-js-code-style [options] <file | dir>...

### Options

* `--help` Usage info
* `--max-warnings <number>` Exit when more warnings than `max-warnings`
* `--max-errors <number>` Exit when more errors than `max-errors`
* `--fail` Exit when warnings/errors are generated

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for what has changed since last release

## Config

The config should be in the dot-files instead of hard-coded in build scripts. That makes it possible for editor plugins to auto-detect the config.

If you already have a `.jshintrc` file; add the line below and remove all old rules. If you don't have it, finn-js-code-style will generate it the first time you run the command.

    "extends": "./node_modules/finn-js-code-style/.jshintrc"

The `extends` option became usable in [jshint v2.5.1](https://github.com/jshint/jshint/releases/tag/2.5.1), so make sure the version you use (also editor plugins) at least have this version.

It is possible to extend js-code-style with a project-specific config, but we only allow a more strict set of rules or change the environment (node/browser). The project globals should also be defined here (if you have any), and will extend the parent´s globals (instead of overwriting).

You can also use `extends` to have different config for tests or similar:

./.jshintrc

    {
        "extends": "./node_modules/finn-js-code-style/.jshintrc",
        "browser": true,
        "node": false,
        "maxstatements": 10
    }

./test/.jshintrc

    {
        "extends": "../.jshintrc",
        "globals": {
            "suite": true,
            "test": true,
            "setup": true,
            "teardown": true,
            "assert": true
        }
    }

Use the `.jshintignore` to exclude files or folders.

## Grunt config

    npm install --save-dev grunt-exec

In Gruntfile.js

    grunt.loadNpmTasks('grunt-exec');

    grunt.initConfig({
        //...,
        exec: {
            finn_js_code_style: {
                cmd: 'finn-js-code-style src'
            }
        },
        //...
    });

## For Sublime

    - Install plugin...

## For Intellij

    - Open prefrences in Intellij.
    - Under Project Settings find: JavaScript -> Code Quality Tools -> JSHint.
    - Check off for "Enable", "Use config files" and "2.8.0".


## Wondering what all these options mean?

See [JSHint docs](http://www.jshint.com/docs/options/)


[More jshint docs](http://www.jshint.com/docs/)

## Release a new version

    git pull --rebase
    npm version [<newversion> | major | minor | patch] # follow semver!
    git push --follow-tags origin master
    npm login # login with finn-no credentials
    npm publish
