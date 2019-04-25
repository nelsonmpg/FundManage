'use strict'
let User = require('./models/User.js');

User = new User();

module.exports = {  
  registerUser: function (req, res) {
    User.registerUser(req, res);
  },
  loginUserPassport: function (user, pass, next) {
    return User.logInPassport(user, pass, next);
  },
}