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
    let self = this;
    connectDB.connectDB(this.mongodb, function () {
        console.log("Start backup.");
        self.backUpFunds();
    });
};

ServerUpdate.prototype.backUpFunds = function () {
    console.log("Backup Funds.");
    let self = this;
    fundsLib.backupFunds(function () {
        self.backUpWallets()
    });
}

ServerUpdate.prototype.backUpWallets = function () {
    console.log("Backup Portfolios.");
    require('./libwallet.js').backupPortfolios(function () {
        setTimeout(() => {
            console.log("Backup end.");
            process.exit(0);
        }, 2000);
    });
}

/**
 * TODO: recebe por parametro no proceso as definições configuradas para o funcionamento do servidor
 */
process.on("message", function (data) {
    var srv = new ServerUpdate(data.serverdata);
});

module.exports = ServerUpdate;