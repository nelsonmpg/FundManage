'use strict'
require('colors');
var cp = require('child_process'),
    fs = require('fs'),
    config = null,
    utils = require('./lib/utils.js');

var Main = function () {
    config = utils.getConfigFile();

    var args = {
        mongodb: config.mongodb,
        env_dev: utils.isDevMode()
    };
    // inicia p script e envia as configuracores
    console.log("Script 1");
    var child2 = cp.fork('./lib/serverBackup.js');
    child2.send({ "serverdata": args });
};

new Main();

module.exports = Main;