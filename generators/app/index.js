(function () {

  'use strict';
  var yeoman = require('yeoman-generator');
  var chalk = require('chalk');
  var yosay = require('yosay');

  module.exports = yeoman.generators.Base.extend({
    'initializing': function () {
      this.composeWith('openstack:gerrit');
    },

    prompting: function () {
      var done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the fabulous ' + chalk.red('generator-openstack') +
        ' generator!'
      ));

      var prompts = [{
        type: 'confirm',
        name: 'someOption',
        message: 'Would you like to enable this option?',
        default: true
      }];

      this.prompt(prompts, function (props) {
        this.props = props;
        // To access props later use this.props.someOption;

        done();
      }.bind(this));
    },

    writing: function () {
      this.fs.copy(
        this.templatePath('dummyfile.txt'),
        this.destinationPath('dummyfile.txt')
      );
    },

    install: function () {
      this.installDependencies();
    }
  });
})();