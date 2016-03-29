(function() {
  'use strict';
  var path = require('path');
  var assert = require('yeoman-assert');
  var helpers = require('yeoman-generator').test;

  var generator = path.join(__dirname, '../../generators/app');
  var modules = ['gerrit', 'license', 'editorconfig'];
  var projectBuilder = require('../../generators/app/lib/project_builder');

  describe('generator-openstack:app', function() {

    beforeEach(function() {
      projectBuilder.clear();
    });

    it('should call all module lifecycle prompts',
      function(done) {
        var spies = [];
        modules.forEach(function(name) {
          var module = require('../../generators/app/lib/component/' + name);
          spies.push(spyOn(module, 'init').and.callThrough());
          spies.push(spyOn(module, 'prompt').and.callThrough());
          spies.push(spyOn(module, 'configure').and.callThrough());
        });

        helpers.run(generator)
          .on('end', function() {
            spies.forEach(function(spy) {
              expect(spy.calls.any()).toBeTruthy();
            });

            done();
          });
      });

    it('should call no module prompts with the --non-interactive flag',
      function(done) {
        var promptSpies = [];
        var regularSpies = [];
        modules.forEach(function(name) {
          var module = require('../../generators/app/lib/component/' + name);
          regularSpies.push(spyOn(module, 'init').and.callThrough());
          promptSpies.push(spyOn(module, 'prompt').and.callThrough());
          regularSpies.push(spyOn(module, 'configure').and.callThrough());
        });

        helpers.run(generator)
          .withOptions({'non-interactive': true})
          .on('end', function() {
            promptSpies.forEach(function(spy) {
              expect(spy.calls.any()).toBeFalsy();
            });
            regularSpies.forEach(function(spy) {
              expect(spy.calls.any()).toBeTruthy();
            });

            done();
          });
      });

    describe('writing()', function() {
      it('should create all files created in the project builder',
        function(done) {
          helpers.run(generator)
            .on('end', function() {
              assert.file(['.gitreview']); // We'll just use a file we know about.
              done();
            });
        });

      it('should write any files provided to the content builder',
        function(done) {
          projectBuilder.writeFile('test.json', function() {
            return 'foo';
          });
          projectBuilder.writeFile('test_null.json', function() {
            // do nothing.
          });
          projectBuilder.writeFile('test_empty.json', function() {
            return '';
          });
          projectBuilder.writeFile('test_static.json', 'static_content');
          projectBuilder.writeFile('test_undefined.json');

          helpers.run(generator)
            .on('end', function() {
              assert.file(['test.json', 'test_static.json','test_empty.json', 'test_null.json',
                'test_undefined.json']);
              done();
            });
        });

      it('should delete all files flagged in the project builder',
        function(done) {
          projectBuilder.removeFile('test.json');

          helpers.run(generator)
            .on('end', function() {
              assert.noFile(['test.json']);
              done();
            });
        });
    });
  });
})();