'use strict';
//var User = require('./../model/users');
let passport = require('passport'),
  usersLib = require('./../Controllers/libUers.js'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function (username, password, done) {
      usersLib.loginUserPassport(username, password, function (err, user) {
        if (err) {
          return done(err, false, {
            status: false,
            data: "There was a problem finding the user."
          });
        }
        if (!user || user.length === 0) {
          return done(null, false, {
            status: false,
            data: "Login error. The email or pass error."
          });
        }
        console.log("Log In");
        return done(null, user, {
          status: true,
          data: user
        });
      });
    }))
};
