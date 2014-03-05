# FINN JavaScript code style

## Install (not ready yet)

    npm install --save-dev finn-js-code-style

## Running
Because jshint looks in current directory, then one directory higher up until your root-directory, it will not find the .jshint file in the node-modules folder. So you have to specify the config in the JSHint plugin you're using. From command-line:

    jshint --config node_modules/finn-js-code-style/.jshintrc ...

## For Sublime

	- Install plugin...

## For Intellij

	- Open prefrences
	- Under Project Settings find: JavaScript -> Code Quality Tools -> JSHint
	- Check off for "Enable", "Use config files" and "2.4.3"
	- Select .jshintrc file from this project

### Wondering what all these options mean?
[JSHint docs](http://www.jshint.com/docs/options/)
