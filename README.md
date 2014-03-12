# FINN JavaScript code style

## Just a start...
The JSHint config is just a beginning and up for discussion. We should start easy and try to agree on a set of options that everyone think is OK. JavaScript haven't promoted any code-style, so there are a lot of personal opinions on this matter. Most of us probably have to change their style a bit. The most important is that we land on a config that everyone uses. So it's better with a lax config that everyone use than a strict config that nobody wants to use. But the main concept of linting code is to avoid potential typos, so it's a fine balance... Please be open minded about changing your code-style :)

Add a pull-request if you want to change something and we can discuss on the pull-request. One pull-request pr option change. Please include the [description of the option](http://www.jshint.com/docs/options/) in the PR description :)

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
[Lint Error Explanations](http://jslinterrors.com/)
[JSHint docs](http://www.jshint.com/docs/options/)
