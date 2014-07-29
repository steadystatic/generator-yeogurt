/**
 * Configuration for Jade task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('jade', {<% if (!useServer && jsTemplate !== 'Jade') { %>
        server: {
            options: {
                pretty: true,
                client: false,
                data: {
                    debug: true
                }
            },
            expand: true,
            cwd: '<%%= yeogurt.client %>/templates/',
            dest: '<%%= yeogurt.staticServer %>/',
            src: ['*.jade'],
            ext: '.html'
        },<% } %><% if (jsTemplate !== 'Jade') { %>
        dist: {
            options: {
                pretty: true,
                client: false,
                data: {
                    debug: false<% if (useServer) { %>,
                    env: 'development'<% } %>
                }
            },
            expand: true,
            cwd: '<% if (useServer) { %><%%= yeogurt.server %><% } %><% if (!useServer) { %><%%= yeogurt.client %><% } %>/templates/',<% if (!useServer) { %>
            dest: '<%%= yeogurt.dist %>/',<% } %><% if (useServer) { %>
            dest: '.tmp/',<% } %>
            src: ['*.jade'],
            ext: '.html'
        },<% } %><% if (jsTemplate === 'Jade') { %>
        server: {
            options: {
                pretty: true,
                client: true,
                data: {
                    debug: true
                }
            },
            files: {
                '<%%= yeogurt.staticServer %>/templates/templates.js': ['<%%= yeogurt.client %>/templates/*.jade']
            }
        },
        dist: {
            options: {
                pretty: false,
                client: true,
                data: {
                    debug: false
                }
            },
            files: {
                '.tmp/templates/templates.js': ['<%%= yeogurt.client %>/templates/*.jade']
            }
        }<% } %><% if (jsFramework === 'Backbone') { %>,
        test: {
            options: {
                pretty: true,
                client: true,
                data: {
                    debug: true
                }
            },
            files: {
                '.tmp/templates.js': ['<%%= yeogurt.client %>/templates/*.jade']
            }
        }<% } %>
    });

};

module.exports = taskConfig;
