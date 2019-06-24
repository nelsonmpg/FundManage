'use strict';
let utils = require('./utils.js'),
  fundsLib = require('./libFunds.js'),
  countryLib = require('./libCountry.js'),
  seeds;
try {
  seeds = require('./seeds.js');
} catch (e) {
  seeds = null;
}

let self = module.exports = {
  insertSeeds: function () {
    self.insertCountryList();
    // self.insertFunds();
    // if (utils.isDevMode()) {
    //   if (seeds) {
    //     // console.log("Start insert Seeds.");
    //     // seeds.insertSeeds();
    //   } else {
    //     console.log("No Seeds!");
    //   }
    // }
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
      fileFunds = utils.checkFile(backupFiles.funds),
      arrFunds = [];

    if (fileFunds) {
      arrFunds = JSON.parse(fileFunds);
    } else {
      fileFunds = utils.createFileSaveContent(backupFiles.funds, backupFiles.textContent);
      fileFunds = [];
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
  }
}