# Change log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [5.0.0] - 2016-03-04

We're working on switching to ESLint, but this beta has been waiting way too long. So releasing the beta 9 with minor changes.

ESLint will be a new major release because it will have breaking changes (new set of rules).

* Updated to jshint 2.9.1
* Removed jscs-files
* Small code refactor

## [5.0.0-beta.9] - 2015-11-05

### Bug fixes

* Use require.resolve to locate jshint binary, so it works with deduped dependencies in npm >= 3.x

## [5.0.0-beta.9] - 2015-10-26

### Bug fixes

* Increase jshint timeout so it doesn't fail on slow build servers

## [5.0.0-beta.3] - 2015-10-03

* Fix: jshint 2.9.0 has a regression bug. Stay on jshint 2.8.0.

## [5.0.0-beta.2] - 2015-10-03

### Bug fixes

* Fix resolve-bin doesn't work on Windows

## [5.0.0-beta.1] - 2015-10-03

### New features

* Add support for --max-errors and --max-warnings
* Allow ES6 (esnext)

### Breaking changes

* Fix: runtime errors should always exit instead of failing silently
* The JS-api now expects an object instead of the `process.argv` array
* Removed jscs files

### Other changes

* Removed shelljs (Windows issues)
