'use strict'
let mongoose = require('mongoose'),
  crypto = require('crypto'),
  UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });


var User = function () {
  this.userdb = mongoose.model('User', UserSchema);
};

User.prototype.getUser = function (userMail, res, callback) {
  let query = {
    email: userMail
  };
  this.userdb.find(query, function (err, user) {
    if (err) {
      return res.status(500).send({
        status: false,
        data: "There was a problem finding the user."
      });
    }
    if (user.length === 0) {
      return callback();
    }
    res.status(200).send({
      status: false,
      data: "The '" + userMail + "' exists in use."
    });
  });
}

User.prototype.registerUser = function (req, res) {
  let self = this;
  self.getUser(req.body.email, res, function () {
    self.userdb.create({
      name: req.body.name,
      email: req.body.email,
      password: crypto.createHash('md5').update(req.body.password).digest("hex")
    },
      function (err, user) {
        if (err) {
          return res.status(500).send({
            status: false,
            data: "There was a problem adding the information to the database."
          });
        }
        res.status(200).send({
          status: true,
          data: user
        });
      });
  })
}

User.prototype.logInPassport = function (usr, pass, next) {
  let query = {
    email: usr,
    password: crypto.createHash('md5').update(pass).digest("hex")
  };
  this.userdb.find(query, function (err, user) {
    next(err, user[0]);
  });
}

User.prototype.backupUsers = function (callback) {
  this.userdb.find({}, { __v: 0 }, function (err, users) {
    if (err) {
      callback()
      return console.log("There was a problem finding users.", err);
    }
    let utils = require('./../utils.js'),
      backupFile = utils.getFileBackup(),
      fileSave = backupFile.users;
    fileSave = fileSave.replace("##date##", "_" + utils.dateLastUpdateV3(new Date()));
    utils.createFileSaveContent(fileSave, JSON.stringify(users));
    callback();
  });
}

module.exports = User;