/** @jsx React.DOM */

/**
*   <%= _.classify(name) %> Spec Description
*/

/* jshint -W024 */<% if (testFramework === 'mocha') { %>
/* jshint expr:true */<% } %>

'use strict';

var <%= _.classify(name) %> = require('<%= folder ? folderCount : ''%>../../../client/scripts/components/<%= folder ? cleanFolderPath(folder) + '/' : ''%><%= _.slugify(name) %>.jsx');

var ReactTestUtils;
var reactRender;

beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
    reactRender = ReactTestUtils.renderIntoDocument;
});

describe('Testing React Component: <%= _.classify(name) %>', function() {
    it('Should run a few assertions', function() {

    });
});