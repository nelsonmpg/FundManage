'use strict';
let utils = require('./utils.js'),
  fundsLib = require('./Controllers/libFunds.js'),
  countryLib = require('./Controllers/libCountry.js'),
  walletLib = require('./Controllers/libWallet.js');

let self = module.exports = {
  insertSeeds: function () {
    self.insertCountryList();
    self.insertFunds();
    self.insertPortfolios();
  },
  insertCountryList: function () {
    let configFile = utils.getConfigFile(),
      urlApi = configFile.countryListApi;
    countryLib.findExistsCountries(function () {
      utils.requestExternalWebPage(urlApi, function (err, res, body) {
        if (err) {
          return console.log("Error get Countries list.");
        }
        let countriesList = JSON.parse(body);
        countryLib.insertListCodeCountry(countriesList);
        // console.log(countriesList);
      });
    });
  },
  insertFunds: function () {
    let backupFiles = utils.getFileBackup(),
      fileF = backupFiles.fundsSeed,
      fileFunds = utils.checkFile(fileF),
      arrFunds = [];

    if (fileFunds) {
      arrFunds = JSON.parse(fileFunds);
    } else {
      fileFunds = utils.createFileSaveContent(fileF, backupFiles.textContent);
    }

    for (let index = 0; index < arrFunds.length; index++) {
      let objFund = {
        isin: arrFunds[index].isin,
        name: arrFunds[index].name,
        idFundMorningstar: arrFunds[index].idFundMorningstar
      }
      let req = {
        body: objFund
      }
      fundsLib.saveFund(req);
    }
  },
  insertPortfolios: function () {
    let backupFiles = utils.getFileBackup(),
      fileP = backupFiles.portfoliosSeed,
      filePortfolios = utils.checkFile(fileP),
      arrWallets = [],
      arrListFunds = [];

    if (filePortfolios) {
      arrWallets = JSON.parse(filePortfolios);
    } else {
      filePortfolios = utils.createFileSaveContent(fileP, backupFiles.textContent);
    }
    for (let p = 0; p < arrWallets.length; p++) {
      let req = {
        body: {
          owner: arrWallets[p].owner,
          walletName: arrWallets[p].nameWallet,
          walletFunds: arrWallets[p].listFunds
        }
      }
      walletLib.saveWallet(req);
      arrListFunds = [];
    }
  }
}