(function () {
  'use strict';

  var Q = require('q');
  var pkgBuilder = require('../pkg_builder');
  var projectBuilder = require('../project_builder');

  var packagePath = 'package.json';

  /**
   * Iterate over needed package components, ensuring that required
   * parameters are set.
   *
   * @param {generator} generator The currently active generator.
   * @returns {generator} The passed generator, for promise chaining.
   */
  function promptPackage (generator) {
    var deferred = Q.defer();

    if (!generator.options['non-interactive']) {
      generator.prompt(
        [{
          type: 'input',
          name: 'name',
          message: 'Project- Name:',
          default: pkgBuilder.getValue('name')
        }, {
          type: 'input',
          name: 'description',
          message: 'Project- Description:',
          default: pkgBuilder.getValue('description')
        }, {
          type: 'input',
          name: 'version',
          message: 'Project- Version:',
          default: pkgBuilder.getValue('version', '0.0.1')
        }, {
          type: 'input',
          name: 'homepage',
          message: 'Project- Homepage:',
          default: pkgBuilder.getValue('homepage', 'http://www.openstack.org/')
        }, {
          type: 'input',
          name: 'author',
          message: 'Project- Author:',
          default: pkgBuilder.getValue('author',
            'OpenStack <openstack-dev@lists.openstack.org> (http://www.openstack.org/)')
        }],
        function (answers) {
          pkgBuilder.setValues(answers);
          deferred.resolve(generator);
        });
    } else {
      deferred.resolve(generator);
    }

    return deferred.promise;
  }

  /**
   * Read any existing package.json file, to set our defaults.
   *
   * @param {generator} generator The currently active generator.
   * @returns {generator} The passed generator, for promise chaining.
   */
  function initializePackage (generator) {
    var fs = generator.fs;

    // Read package.json
    if (fs.exists(packagePath)) {
      pkgBuilder.fromJSON(fs.read(packagePath));
    }

    return generator;
  }

  /**
   * Configure the project by adding required files.
   *
   * @param {generator} generator The currently active generator.
   * @returns {generator} The passed generator, for promise chaining.
   */
  function configurePkg (generator) {
    projectBuilder.writeFile('package.json', pkgBuilder.toJSON);
    return generator;
  }

  module.exports = {
    init: initializePackage,
    prompt: promptPackage,
    configure: configurePkg
  };
})();
