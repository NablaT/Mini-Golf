# front-end

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.14.0.

## Needed tools

We use NodeJS (which comes bundle with the node package manager NPM).
We use NPM to manage dependencies.
We use Grunt for running javascript tasks.
We use Bower to manage web dependencies.
We use Yeoman to generate the structure project. 
We use Sass (Compass) so we need to install it.
To be able to do this we need Ruby.`
We use bundle to manage the ruby dependencies.

### Linux

- Open the Terminal.
- Install Ruby : `sudo apt-get install ruby-full`
- Install Bundler : `sudo gem install bundler`
- Install NodeJS : Use the [NodeJS Installer](https://nodejs.org/en/download/)
- Install Grunt : `sudo npm install grunt-cli -g`
- Install Bower : `sudo npm install bower -g`
- Install Yeoman : `sudo npm install yo -g`

### Windows

- Open the Command Prompt.
- Install Ruby : Use the [Ruby Installer](http://rubyinstaller.org/)
- Install Bundler : `gem install bundler`
- Install NodeJS : Use the [NodeJS Installer](https://nodejs.org/en/download/)
- Install Grunt : `npm install grunt-cli -g`
- Install Bower : `npm install bower -g`
- Install Yeoman : `npm install yo -g`

### Mac OS

- Open the Terminal.
- Install Ruby : already installed
- Install Bundler : `sudo gem install bundler`
- Install NodeJS : Use the [NodeJS Installer](https://nodejs.org/en/download/)
- Install Grunt : `sudo npm install grunt-cli -g`
- Install Bower : `sudo npm install bower -g`
- Install Yeoman : `sudo npm install yo -g`

## Install

- Open the terminal and go to the location of this project
- Run `npm install`
- Run `bower install`
- Run `bundle install`

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Test

Running `grunt test` will run the unit tests with karma.

## Deploy

Running `grunt deploy` will deploy the folder dist into the web.


{
  "bitwise": true,
  "browser": true,
  "curly": true,
  "eqeqeq": true,
  "esnext": true,
  "latedef": true,
  "noarg": true,
  "node": true,
  "strict": true,
  "undef": true,
  "unused": true,
  "globals": {
    "angular": false
  }
}


{
  "requireCamelCaseOrUpperCaseIdentifiers": true,
  "requireCapitalizedConstructors": true,
  "requireParenthesesAroundIIFE": true,
  "validateQuoteMarks": "'"
}
