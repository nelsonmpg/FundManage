'use strict'
require('colors'); //bold, italic, underline, inverse, yellow, cyan, white, magenta, green, red, grey, blue, rainbow
var express = require('express'),
    fs = require('fs'),
    connectDB = require('./db/connectDB.js'),
    Fund = require('./models/Fund.js'),
    Wallet = require('./models/Wallet.js'),
    User = require('./models/User.js');

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
        try {
            console.log("Backup Funds.");
            Fund = new Fund();
            Fund.BackupFunds(function () {
                console.log("Backup Portfolios.");
                let walletLib = require('./Controllers/libWallet.js');
                walletLib.backupPortfolios(function () {
                    User = new User();
                    User.backupUsers(function () {
                        setTimeout(() => {
                            console.log("Backup end.");
                            process.exit(0);
                        }, 2000);
                    });
                });
            });
        } catch (e) {
            console.log("Error", e);
            setTimeout(() => {
                console.log("Backup end.");
                process.exit(0);
            }, 2000);
        }
    });
};

/**
 * TODO: recebe por parametro no proceso as definições configuradas para o funcionamento do servidor
 */
process.on("message", function (data) {
    var srv = new ServerUpdate(data.serverdata);
});

module.exports = ServerUpdate;