'use strict'
require('colors'); //bold, italic, underline, inverse, yellow, cyan, white, magenta, green, red, grey, blue, rainbow
var express = require('express'),
    fs = require('fs'),
    utils = require('./utils.js'),
    connectDB = require('./db/connectDB.js'),
    fundsLib = require('./libFunds.js');

/**
 * TODO: Criação do servidor
 * @param {object} config - Variavel que contem as configurações básicas para o inicio do servidor.
 */
var ServerUpdateFund = function (data) {
    let self = this;
    this.mongodb = data.mongodb;
    this.fund = data.fund;
    // console.log("receive", data);
    console.log("Call update Fund.");
    connectDB.connectDB(this.mongodb, function () {
        fundsLib.updateHistory(self.fund, true, null, function () {
            console.log("update Fund Info.");
            fundsLib.UpdateInfoIndividualFund(self.fund, null, function () {
                console.log("End fund history and info.");
                process.send({
                    proc: "savecomplete",
                    status: false,
                    fund: self.fund,
                    msg: "Step 5 / 5",
                    val: 100
                });

            });
        });
    });
};

/**
 * TODO: recebe por parametro no proceso as definições configuradas para o funcionamento do servidor
 */
process.on("message", function (data) {
    var srv = new ServerUpdateFund(data.serverdata);
});

module.exports = ServerUpdateFund;