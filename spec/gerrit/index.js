(function () {
  'use strict';
  var path = require('path');
  var assert = require('yeoman-assert');
  var helpers = require('yeoman-generator').test;

  var generator = path.join(__dirname, '../../generators/gerrit');


  describe('generator-openstack:gerrit', function () {

    describe('enableGerrit:false', function () {
      beforeEach(function (done) {
        helpers.run(generator)
          .withPrompts({enableGerrit: false})
          .on('end', done);
      });

      it('should not create a .gitreview file', function () {
        assert.noFile('.gitreview');
      });
    });

    describe('enableGerrit:true with defaults', function () {
      beforeEach(function (done) {
        helpers.run(generator)
          .withPrompts({
            enableGerrit: true
          })
          .on('end', done);
      });

      it('should create a .gitreview file', function () {
        assert.fileContent('.gitreview', 'host=review.openstack.org');
        assert.fileContent('.gitreview', 'port=29418');
        assert.fileContent('.gitreview', 'project=openstack/your_project.git');
      });
    });

    describe('enableGerrit:true with settings', function () {
      beforeEach(function (done) {
        helpers.run(generator)
          .withPrompts({
            enableGerrit: true,
            gerritHost: 'host.example.com',
            gerritPort: 1000,
            gerritProject: 'openstack/test_project.git'
          })
          .on('end', done);
      });

      it('should create a .gitreview file', function () {
        assert.fileContent('.gitreview', 'host=host.example.com');
        assert.fileContent('.gitreview', 'port=1000');
        assert.fileContent('.gitreview', 'project=openstack/test_project.git');
      });
    });
  });
})();
