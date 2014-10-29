'use strict';

var _ = require('lodash');
var secrets = require('../config/secrets');<% if (useJwt) { %>
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');<% if (dbOption === 'mongodb') { %>
var User = require('mongoose').model('user');<% } else if (dbOption === 'mysql') { %>
var db = require('../config/database');
var User = db.user;<% } %><% } %>
var validateJwt = expressJwt({ secret: secrets.sessionSecret });<% if (authTypes.indexOf('local') > -1) { %>
var localStrategy = require('./strategies/local');<% } %><% if (authTypes.indexOf('facebook') > -1) { %>
var facebookStrategy = require('./strategies/facebook');<% } %><% if (authTypes.indexOf('twitter') > -1) { %>
var twitterStrategy = require('./strategies/twitter');<% } %>

var auth = function(User, passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {<% if (dbOption === 'mongodb') { %>
        User.findById(id, function(err, user) {
            done(err, user);
        });<% } else if (dbOption === 'mysql') { %>
        User.find({
            where: {
                id: id
            }
        }).success(function(user) {
            done(null, user);
        });<% } %>
    });<% if (authTypes.indexOf('local') > -1) { %>

    localStrategy(passport, User);<% } %><% if (authTypes.indexOf('facebook') > -1) { %>
    facebookStrategy(passport, User);<% } %><% if (authTypes.indexOf('twitter') > -1) { %>
    twitterStrategy(passport, User);<% } %>
};

// Login Required middleware.

var isAuthenticated = function(req, res, next) {
    if (!req.xhr) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }
    else {
        // allow access_token to be passed through query parameter as well
        if (req.body && req.body.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.body.access_token;
        }
        // Validate jwt token
        return validateJwt(req, res, next);
    };

};

// Check to see if user is authorized for specific provider.

var isAuthorized = function(req, res, next) {
    var provider = req.path.split('/').slice(-1)[0];

    if (req.user[provider + 'Token']) {
        next();
    }
    else {
        res.redirect('/auth/' + provider);
    }
};

/**
 * Checks if the user role meets the minimum requirements of the route
 */
var hasRole = function(roleRequired) {
    if (!roleRequired) {
        throw new Error('Required role needs to be set');
    }

    function meetsRequirements(req, res, next) {
        if (secrets.userRoles.indexOf(req.user.role) >= secrets.userRoles.indexOf(roleRequired)) {
            next();
        } else {
            if (!req.xhr) {
                res.redirect('/login');
            }
            else {
                res.send(403);
            }
        }
    };
    return meetsRequirements;
}<% if (useJwt) { %>

/**
 * Returns a jwt token signed by the app secret
 */
var signToken = function(id) {
    return jwt.sign({
        id: id
    }, secrets.sessionSecret, {
        expiresInMinutes: 60 * 5
    });
}

/**
 * Set token cookie directly for oAuth strategies
 */
var setTokenCookie = function(req, res) {
    if (!req.user) {
        return res.json(404, {
            message: 'Something went wrong, please try again.'
        });
    }
    var token = signToken(req.user.id, req.user.role);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
}<% } %>

module.exports = {
    auth: auth,
    isAuthenticated: isAuthenticated,
    isAuthorized: isAuthorized,
    hasRole: hasRole,<% if (useJwt) { %>
    signToken: signToken,
    setTokenCookie: setTokenCookie<% } %>
};
