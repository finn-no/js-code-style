# FINN.no JavaScript code style

This project is meant for internal JS-code at FINN.no, but we have many public JS projects which also want to use the same code style. Feel free to use/fork, but it probably will become very FINN specific, so we don't expect it to be very useful for others.

## Based on ESLint

From version 5.0.0 finn-js-code-style use ESLint under the hood instead of JSLint, so the .jshintrc file is not in use anymore. ESLint was chosen because of better ES2015-support and is more extensible, while it seems like JSHint is less maintained at the moment.

### Migrate config from JSHint

```sh
git mv .jshintignore .eslintignore
git rm .jshintrc
```

Create a file named .eslintrc

```json
{
    "extends": "finn"
}
```

If the project use ES-modules, you have to add the `sourceType` parser option:

```
{
    "extends": "finn",
    "parserOptions": {
        "sourceType": "module"
    }
}
```

## Contribute

Add a pull-request if you want to change something and we can discuss on the pull-request. One pull-request pr option change. Please include the [description of the rule](http://eslint.org/docs/rules/) in the PR description :)

We will experiment with the rules and migth do "breaking" changes like increasing strictness, but after we have released 5.0.0 we should not make the rules more strict without bumping the major version.

ESLint also supports having multiple configurations in a config package, so if someone wants a set of React-specific rules or anything else, we can add that as a separate file in [eslint-config-finn](https://github.com/finn-no/eslint-config-finn).

## Install

```bash
$ npm install --save-dev finn-js-code-style
```

## Use

This command will validate code style on the files you specify. In the future, it might do more code style checks on the same set of files.

```sh
$ finn-js-code-style [options] <file | dir>...
```

### Options

* `--help` Usage info
* `--config` Specify config instead of using the `.eslintrc` default
* `--max-warnings <number>` Exit when more warnings than `max-warnings`
* `--max-errors <number>` Exit when more errors than `max-errors`
* `--fail` Exit when warnings/errors are generated

## Config

### Environment

Specify environment in `.eslintrc`:

```json
{
    "extends": "finn",
    "env": {
        "node": true
    }
}
```

If you have scritps for multiple environments and don't want to enable both at once, you can create a new config extending `.eslintrc` or the "finn" config:

```json
{
    "extends": "./.eslintrc",
    "env": {
        "node": true
    }
}
```

Then specify the other config with the `--config` command-line argument:

```sh
finn-js-code-style --config .eslintrc-node lib/
```

See the [Specifying Environments](http://eslint.org/docs/user-guide/configuring#specifying-environments) in the ESLint-docs for available environments.


### Explicit code style rules

It is possible to extend js-code-style with one or more project specific config(s), but we only allow a more strict set of rules or change the environment (node/browser). The project globals should also be defined here (if you have any), and will extend the parent´s globals (instead of overwriting).

Explicit rules are configured with `.eslintrc` files. These configs should be in dot-files, instead of hard-coded in build scripts. That makes it possible for editor plugins to auto-detect the config.

List of all rules are available in [ESLint rules docs](http://eslint.org/docs/rules/).

You can have different configurations for tests or similar. An `.eslintrc`-file in any project folder will automatically extend the project-root config:

**./.eslintrc**
```json
{
    "no-var": 2,
    "object-shorthand": 2
}
```

**./test/.eslintrc**
```json
{
    "env": {
        "mocha": true
    },
    "globals": {
        "sinon": true
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
