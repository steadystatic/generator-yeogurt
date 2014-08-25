/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('yeogurt generator Less', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('yeogurt:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files and folders you expect to exist here.
            'client/',
            'client/styles',
            'client/styles/main.less',
            'grunt/',
            'grunt/config',
            'grunt/config/compile/less.js'
        ];

        helpers.mockPrompt(this.app, {
            projectName: 'testing',
            versionControl: 'git',
            cssOption: 'less',
            useLesshat: true,
            useBootstrap: true,
            ieSupport: true,
            responsive: true,
            useGA: true,
            useFTP: true,
            jshint: true,
            useDashboard: true,
            extras: ['useFontAwesome']
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });
});
