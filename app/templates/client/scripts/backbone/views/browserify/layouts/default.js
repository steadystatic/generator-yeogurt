/**
*   Default View
*/

'use strict';

var NavbarView = require('../modules/navbar');
var MessagesView = require('../modules/messages');

var Default = Backbone.View.extend({

    // Compiled template
    template: JST['client/templates/layouts/default<% if (jsTemplate === 'handlebars') { %>.hbs<% } else if (jsTemplate === 'underscore') { %>.jst<% } else if (jsTemplate === 'jade') { %><% } %>'],

    // Delegated events
    events: {},

    // Code that runs when View is initialized
    initialize: function (options) {
        // Check to see if any options were passed in
        if (options) {
            this.options = options;
        }
    },

    render: function() {
        this.$el.html(this.template);

        // Assign/Render subviews
        this.assign(this.subviews);

        // If subviews are passed in, then assign/render them
        if (this.options && this.options.subviews) {
            this.assign(this.options.subviews);
        }
        return this;
    },

    subviews: {
        '.main-nav': new NavbarView(),
        '.messages': new MessagesView()
    }

});

module.exports = Default;
