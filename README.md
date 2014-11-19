# FINN JavaScript code style

## Just a start...
The JSHint config is just a beginning and up for discussion. We should start easy and try to agree on a set of options that everyone think is OK. JavaScript haven't promoted any code-style, so there are a lot of personal opinions on this matter. Most of us probably have to change their style a bit. The most important is that we land on a config that everyone uses. So it's better with a lax config that everyone use than a strict config that nobody wants to use. But the main concept of linting code is to avoid potential typos, so it's a fine balance... Please be open minded about changing your code-style :)

Add a pull-request if you want to change something and we can discuss on the pull-request. One pull-request pr option change. Please include the [description of the option](http://www.jshint.com/docs/options/) in the PR description :)

## Install

    npm install --save-dev finn-js-code-style

### Maven projects

For projects building with maven, you need to make sure the frontend-maven-plugin has specified npm.finntech.no as npm repository. See https://git.finn.no/projects/LIBS/repos/analytics-js/browse/pom.xml for an example.

## Running
Because jshint looks in current directory, then one directory higher up until your root-directory, it will not find the .jshint file in the node-modules folder. So you have to specify the config in the JSHint plugin you're using. From command-line:

    jshint --config node_modules/finn-js-code-style/.jshintrc ...

## For Sublime

	- Install plugin...

## For Intellij

	- Clone this project ($ git clone ssh://git@git.finn.no:7999/tool/js-code-style.git).
	- Open prefrences in Intellij.
	- Under Project Settings find: JavaScript -> Code Quality Tools -> JSHint.
	- Check off for "Enable", "Use config files" and "2.4.3".
	- Select the file .jshintrc from js-code-style project.


## Wondering what all these options mean?

[JSHint docs](http://www.jshint.com/docs/options/)

## Customizing the config

It is possible to extend js-code-style with a project-specific config, but we only allow a more strict set of rules or change the environment (node/browser).
To use the `extend` config option, you need at least [jshint v2.5.1](https://github.com/jshint/jshint/releases/tag/2.5.1). Examples on how to use it:

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


## Inline configuration

Once in a while you *have* to override the rules. For instance `eval` is evil, but maybe you actually have to use it for something that is not possible to solve in another way. Like async loading of advertisement, or actually generating dynamic code, which `eval` was meant for (but abused).

In addition to using configuration files you can configure JSHint from within your files using special comments. These comments start either with jshint or global and are followed by a comma-separated list of values. For example, the following snippet will enable warnings about undefined and unused variables and tell JSHint about a global variable named MY_GLOBAL.

    /* jshint evil: true */
    /* global MY_GLOBAL */

You can use both multi- and single-line comments to configure JSHint. These comments are function scoped meaning that if you put them inside a function they will affect only this function's code.

[More jshint docs](http://www.jshint.com/docs/)
