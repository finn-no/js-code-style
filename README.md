# FINN.no JavaScript code style

This project is meant for internal JS-code at FINN.no, but we have many public JS projects which also want to use the same code style. Feel free to use/fork, but it probably will become very FINN specific, so we don't expect it to be very useful for others.

## Just a start...
The JSHint config is just a beginning and up for discussion. The most important is that we land on a config that everyone uses. So it's better with a relaxed config that everyone use than a strict config that nobody wants to use. But the main concept of linting code is to avoid potential typos, so it's a fine balance...

Add a pull-request if you want to change something and we can discuss on the pull-request. One pull-request pr option change. Please include the [description of the option](http://www.jshint.com/docs/options/) in the PR description :)

## Install

```bash
$ npm install --save-dev finn-js-code-style
```

## Use

This command will validate code style on the files you specify. In the future, it will probably do more code style checks on the same set of files.

```bash
$ finn-js-code-style [options] <file | dir>...
```

### Options

* `--help` Usage info
* `--env` Environment specific code style rules
* `--max-warnings <number>` Exit when more warnings than `max-warnings`
* `--max-errors <number>` Exit when more errors than `max-errors`
* `--fail` Exit when warnings/errors are generated

## Config

### Environment

Available environment rule set configured with the `--env` option are listed in the [ESLint config for Schibsted](https://www.npmjs.com/package/eslint-config-spt#rule-packs).

```bash
$ finn-js-code-style --env=node server.js

# ..even multiple environments
$ finn-js-code-style --env=node --env=es6 server.js
```

Not to be confused with ESLint environments, these are described in the section below.

### Explicit code style rules

It is possible to extend js-code-style with one or more project specific config(s), but we only allow a more strict set of rules or change the environment (node/browser). The project globals should also be defined here (if you have any), and will extend the parent´s globals (instead of overwriting).

Explicit rules are configured with `.eslintrc` files. These configs should be in dot-files, instead of hard-coded in build scripts. That makes it possible for editor plugins to auto-detect the config.

List of all roules are available in [ESLint rules docs](http://eslint.org/docs/rules/).

You can also use `extends` to have different config for tests or similar:

**./.eslintrc**
```json
{
    "max-statements": [2, 2]
}
```

**./test/.eslintrc**
```json
{
    "extends": "../.eslintrc",
    "env": {
        "mocha": true
    }
}
```

Predefined ESLint environments specified in `env` are listed on in [ESLint docs](http://eslint.org/docs/user-guide/configuring#specifying-environments).

Use `.eslintignore` to exclude files or folders.

## Grunt config

```bash
$ npm install --save-dev grunt-exec
```

In Gruntfile.js

```js
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
```

## For Sublime

    - Install plugin...

## For Intellij

    - Open prefrences in Intellij.
    - Under Project Settings find: JavaScript -> Code Quality Tools -> JSHint.
    - Check off for "Enable", "Use config files" and "2.8.0".


## Wondering what all these options mean?

See [ESLint configuration docs](http://eslint.org/docs/user-guide/configuring.html) and [ESLint rules docs(http://eslint.org/docs/rules/).

## Release a new version

```bash
# patch version
$ npm run release:patch

# minor version
$ npm run release:minor

# major version
$ npm run release:major

# special versions (alpha/beta/etc) 1.2.3-beta.1
$ npm version <newversion>
$ NPM_CONFIG_TAG=<tag> npm run push-package-publish
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for what has changed since last release