# FINN JavaScript code style

## Just a start...
The JSHint config is just a beginning and up for discussion. We should start easy and try to agree on a set of options that everyone think is OK. JavaScript haven't promoted any code-style, so there are a lot of personal opinions on this matter. Most of us probably have to change their style a bit. The most important is that we land on a config that everyone uses. So it's better with a lax config that everyone use than a strict config that nobody wants to use. But the main concept of linting code is to avoid potential typos, so it's a fine balance... Please be open minded about changing your code-style :)

Add a pull-request if you want to change something and we can discuss on the pull-request. One pull-request pr option change. Please include the [description of the option](http://www.jshint.com/docs/options/) in the PR description :)

## Install

    npm install --save-dev finn-js-code-style

## Use

This command will run jshint on the files you specify. In the future, it will probably do more code style checks on the same set of files.

    finn-js-code-style <file | dir>...

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
    - Check off for "Enable", "Use config files" and "2.5.6".


## Wondering what all these options mean?

See [JSHint docs](http://www.jshint.com/docs/options/)


## Inline configuration

Once in a while you *have* to override a rule in just one file. For instance `eval` is evil, but maybe you actually have to use it for something that is not possible to solve in another way. Like async loading of advertisement, or actually generating dynamic code, which `eval` was meant for (but abused).

In addition to using configuration files you can configure JSHint from within your files using special comments. These comments start either with jshint or global and are followed by a comma-separated list of values. For example, the following snippet will enable warnings about undefined and unused variables and tell JSHint about a global variable named MY_GLOBAL.

    /* jshint evil: true */
    /* global MY_GLOBAL */

You can use both multi- and single-line comments to configure JSHint. These comments are function scoped meaning that if you put them inside a function they will affect only this function's code.

[More jshint docs](http://www.jshint.com/docs/)
