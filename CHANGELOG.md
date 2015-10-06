# Change log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

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
