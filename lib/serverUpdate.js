'use strict'
require('colors'); //bold, italic, underline, inverse, yellow, cyan, white, magenta, green, red, grey, blue, rainbow
var express = require('express'),
    fs = require('fs'),
    connectDB = require('./db/connectDB.js'),
    fundsLib = require('./libFunds.js');

/**
 * TODO: Criação do servidor
 * @param {object} config - Variavel que contem as configurações básicas para o inicio do servidor.
 */
var ServerUpdate = function (config) {
    this.env_dev = config.env_dev;
    this.mongodb = config.mongodb;
    this.app = express();
    connectDB.connectDB(this.mongodb, function () {
        console.log("Call update Funds.");
        fundsLib.updatefunds(null, null, function () {
            console.log("Update End.");
            process.send({
                proc: "savecomplete",
                status: true,
                fund: self.fund,
                msg: "Step 5 / 5",
                val: 100
            });
            setTimeout(() => {
                process.exit(0);
            }, 100);

        });
    });
};

/**
 * TODO: recebe por parametro no proceso as definições configuradas para o funcionamento do servidor
 */
process.on("message", function (data) {
    var srv = new ServerUpdate(data.serverdata);
});

module.exports = ServerUpdate;