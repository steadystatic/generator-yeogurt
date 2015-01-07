/**
 * Index Controller
 */

'use strict';

var App = App || {};
App.Controllers = App.Controllers || {};

App.Controllers.Account = (function() {

    var login = function() {
        // If user is logged in, redirect to settings page
        if (App.user.get('loggedIn')) {
            return App.router.navigate('/settings', {trigger: true});
        }
        var loginPage = new App.Views.Default({
            subviews: {
                '.content': new App.Views.Login()
            }
        });
        App.showView(loginPage);
    };

    var signup = function() {
        // If user is logged in, redirect to settings page
        if (App.user.get('loggedIn')) {
            return App.router.navigate('/settings', {trigger: true});
        }
        var signupPage = new App.Views.Default({
            subviews: {
                '.content': new App.Views.Signup()
            }
        });
        App.showView(signupPage);
    };

    var reset = function() {
        // If user is logged in, redirect to settings page
        if (App.user.get('loggedIn')) {
            return App.router.navigate('/settings', {trigger: true});
        }
        var resetPage = new App.Views.Default({
            subviews: {
                '.content': new App.Views.Reset()
            }
        });
        App.showView(resetPage);
    };

    var forgot = function() {
        // If user is logged in, redirect to settings page
        if (App.user.get('loggedIn')) {
            return App.router.navigate('/settings', {trigger: true});
        }
        var forgotPage = new App.Views.Default({
            subviews: {
                '.content': new App.Views.Forgot()
            }
        });
        App.showView(forgotPage);
    };

    var settings = function() {
        // If user is not logged in, redirect to login page
        if (!App.user.get('loggedIn')) {
            return App.router.navigate('/login', {trigger: true});
        }
        var settings = new App.Views.Default({
            subviews: {
                '.content': new App.Views.Settings()
            }
        });
        App.showView(settings);
    };

    return {
        login: login,
        signup: signup,
        reset: reset,
        forgot: forgot,
        settings: settings
    };

})();
