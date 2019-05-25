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
    // self.insertFunds();
    self.insertCountryList();
    // fundsLib.getListIsinCodes();
    if (utils.isDevMode()) {
      if (seeds) {
        // console.log("Start insert Seeds.");
        seeds.insertSeeds();
      } else {
        console.log("No Seeds!");
      }
    }
  },
  insertCountryList: function () {
    let configFile = utils.getConfigFile(),
      urlApi = configFile.countryListApi;
    utils.requestExternalWebPage(urlApi, function (err, res, body) {
      if (err) {
        return console.log("Error get Countries list.");
      }
      let countriesList = JSON.parse(body);
      countryLib.insertListCodeCountry(countriesList);
      // console.log(countriesList);
    });
  },
  insertFunds: function () {
    let arrFunds = [
      { isin: "LU0189847253", name: "AXA WF Gb High Y B", idFundMorningstar: "" },
      { isin: "LU0342677829", name: "Allz Global Eq Unc", idFundMorningstar: "" },
      { isin: "LU0114721508", name: "FF Consumer Indust", idFundMorningstar: "" },
      { isin: "LU0322549691", name: "GS Glb Fix Inc Pls", idFundMorningstar: "" },
      { isin: "LU0115139569", name: "I Consumer Trends", idFundMorningstar: "" },
      { isin: "LU0853555380", name: "Jup Dync Bond L E", idFundMorningstar: "" },
      { isin: "IE00B19Z9612", name: "LM CB US Large Grw", idFundMorningstar: "" },
      { isin: "LU1670724373", name: "MG Opt Inc Eur Acc", idFundMorningstar: "" },
      { isin: "LU0125951151", name: "MFS Europ Value", idFundMorningstar: "" },
      { isin: "LU0227385266", name: "Nord Stable Return", idFundMorningstar: "" },
      { isin: "IE00B11XZ103", name: "P Global Bond", idFundMorningstar: "" },
      { isin: "LU0474966248", name: "P USA Index EUR", idFundMorningstar: "" },
      { isin: "PTYSADLM0008", name: "Santander Acções Europa", idFundMorningstar: "" },
      { isin: "PTYMCBLM0004", name: "Santander Acções América", idFundMorningstar: "" },
      { isin: "PTYSAIHE0017", name: "Santander Select Defensivo", idFundMorningstar: "F00000ZK94" }, /* */
      { isin: "PTYSBZHM0007", name: "Santander Rendimento", idFundMorningstar: "F000011T4B" }
    ]
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