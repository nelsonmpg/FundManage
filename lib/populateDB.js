'use strict';
let utils = require('./utils.js'),
  fundsLib = require('./libFunds.js'),
  countryLib = require('./libCountry.js'),
  walletLib = require('./libWallet.js');

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
      for (let d = 0; d < arrWallets[p].listFunds.length; d++) {
        for (let l = 0; l < arrWallets[p].listFunds[d].investList.length; l++) {
          let varcodeFund = "",
            vardateInvest = "";
          if (!arrWallets[p].listFunds[d].investList[l].dateInvest) {
            let dateStr = (arrWallets[p].listFunds[d].investList[l].dateCheck).split("/").reverse().join("/");
            varcodeFund = arrWallets[p].listFunds[d].isin + "-" + (new Date(dateStr).getTime()).toString();
            vardateInvest = dateStr.replace(/\//g, "-");
          } else {
            varcodeFund = arrWallets[p].listFunds[d].isin + "-" + arrWallets[p].listFunds[d].investList[l].dateCheck;
            vardateInvest = arrWallets[p].listFunds[d].investList[l].dateInvest;
          }
          arrListFunds.push({
            codefund: varcodeFund,
            isin: arrWallets[p].listFunds[d].isin,
            name: arrWallets[p].listFunds[d].name,
            dateInvest: vardateInvest,
            nUps: arrWallets[p].listFunds[d].investList[l].nUps,
            active: arrWallets[p].listFunds[d].investList[l].active,
            dateInative: arrWallets[p].listFunds[d].investList[l].dateInative
          });
        }
        delete arrWallets[p].listFunds[d].investList;
      } /* */
      let req = {
        body: {
          owner: arrWallets[p].owner,
          walletName: arrWallets[p].nameWallet,
          walletFunds: arrListFunds
        }
      }
      walletLib.saveWallet(req);
      arrListFunds = [];
    }
  }
}