'use strict';
let utils = require('./utils.js'),
  fundsLib = require('./libFunds.js'),
  walletLib = require('./libWallet.js');

let self = module.exports = {
  insertSeeds: function () {
    // self.insertFunds();
    if (utils.isDevMode()) {
      // setTimeout(() => {
        // console.log("Start insert Wallet.");
        self.insertWallets();
      // }, 10000);
    }
  },
  insertFunds: function () {
    let arrFunds = [
      { isin: "LU0189847253", name: "AXA WF Gb High Y B" },
      { isin: "LU0342677829", name: "Allz Global Eq Unc" },
      { isin: "LU0114721508", name: "FF Consumer Indust" },
      { isin: "LU0322549691", name: "GS Glb Fix Inc Pls" },
      { isin: "LU0115139569", name: "I Consumer Trends" },
      { isin: "LU0853555380", name: "Jup Dync Bond L E" },
      { isin: "IE00B19Z9612", name: "LM CB US Large Grw" },
      { isin: "LU1670724373", name: "MG Opt Inc Eur Acc" },
      { isin: "LU0125951151", name: "MFS Europ Value" },
      { isin: "LU0227385266", name: "Nord Stable Return" },
      { isin: "IE00B11XZ103", name: "P Global Bond" },
      { isin: "LU0474966248", name: "P USA Index EUR" }/**/
    ]
    for (let index = 0; index < arrFunds.length; index++) {
      let objFund = {
        isin: arrFunds[index].isin,
        name: arrFunds[index].name
      }
      let req = {
        body: objFund
      }
      fundsLib.saveFund(req);
    }
  },
  insertWallets: function () {
    let wallets = [{
      owner: '5cabb54a6ae5604c38025156',
      nameWallet: 'My Wallet',
      listFunds: [{
        isin: "LU0189847253",
        name: "AXA WF Gb High Y B",
        investList: [{
          dateInvest: "2017-03-21",
          dateCheck: new Date("2017-03-21").getTime(),
          nUps: 6.272
        }]
      }, {
        isin: "LU0342677829",
        name: "Allz Global Eq Unc",
        investList: [{
          dateInvest: "2018-08-02",
          dateCheck: new Date("2018-08-02").getTime(),
          nUps: 3.026
        }]
      }, {
        isin: "LU0114721508",
        name: "FF Consumer Indust",
        investList: [{
          dateInvest: "2018-08-03",
          dateCheck: new Date("2018-08-03").getTime(),
          nUps: 40.050
        }, {
          dateInvest: "2018-12-07",
          dateCheck: new Date("2018-12-07").getTime(),
          nUps: 18.780
        }]
      }, {
        isin: "LU0322549691",
        name: "GS Glb Fix Inc Pls",
        investList: [{
          dateInvest: "2017-03-21",
          dateCheck: new Date("2017-03-21").getTime(),
          nUps: 107.450
        }]
      }, {
        isin: "LU0115139569",
        name: "I Consumer Trends",
        investList: [{
          dateInvest: "2018-08-02",
          dateCheck: new Date("2018-08-02").getTime(),
          nUps: 15.990
        }, {
          dateInvest: "2018-12-07",
          dateCheck: new Date("2018-12-07").getTime(),
          nUps: 25.110
        }]
      }, {
        isin: "LU0853555380",
        name: "Jup Dync Bond L E",
        investList: [{
          dateInvest: "2017-03-21",
          dateCheck: new Date("2017-03-21").getTime(),
          nUps: 85.690
        }]
      }, {
        isin: "IE00B19Z9612",
        name: "LM CB US Large Grw",
        investList: [{
          dateInvest: "2018-08-02",
          dateCheck: new Date("2018-08-02").getTime(),
          nUps: 2.606
        }]
      }, {
        isin: "LU1670724373",
        name: "MG Opt Inc Eur Acc",
        investList: [{
          dateInvest: "2017-03-22",
          dateCheck: new Date("2017-03-22").getTime(),
          nUps: 100.909
        }, {
          dateInvest: "2018-02-16",
          dateCheck: new Date("2018-02-16").getTime(),
          nUps: 48.807
        }]
      }, {
        isin: "LU0125951151",
        name: "MFS Europ Value",
        investList: [{
          dateInvest: "2018-08-02",
          dateCheck: new Date("2018-08-02").getTime(),
          nUps: 22.784
        }]
      }, {
        isin: "LU0227385266",
        name: "Nord Stable Return",
        investList: [{
          dateInvest: "2017-03-21",
          dateCheck: new Date("2017-03-21").getTime(),
          nUps: 19.355
        }]
      }, {
        isin: "IE00B11XZ103",
        name: "P Global Bond",
        investList: [{
          dateInvest: "2017-03-21",
          dateCheck: new Date("2017-03-21").getTime(),
          nUps: 41.719
        }]
      }, {
        isin: "LU0474966248",
        name: "P USA Index EUR",
        investList: [{
          dateInvest: "2018-08-02",
          dateCheck: new Date("2018-08-02").getTime(),
          nUps: 4.776
        }, {
          dateInvest: "2018-12-07",
          dateCheck: new Date("2018-12-07").getTime(),
          nUps: 5.015
        }]
      }]
    }, {
        owner: '5cabb54a6ae5604c38025156',
        nameWallet: 'Teste Wallet',
        listFunds: [{
          isin: "LU0189847253",
          name: "AXA WF Gb High Y B",
          investList: [{
            dateInvest: "2019-03-21",
            dateCheck: new Date("2019-03-21").getTime(),
            nUps: 10
          }]
        }, {
          isin: "LU0342677829",
          name: "Allz Global Eq Unc",
          investList: [{
            dateInvest: "2019-04-02",
            dateCheck: new Date("2019-04-02").getTime(),
            nUps: 10
          }]
        }, {
          isin: "LU0114721508",
          name: "FF Consumer Indust",
          investList: [{
            dateInvest: "2019-04-03",
            dateCheck: new Date("2019-04-03").getTime(),
            nUps: 10
          }, {
            dateInvest: "2019-02-07",
            dateCheck: new Date("2019-02-07").getTime(),
            nUps: 10
          }]
        }, {
          isin: "LU0322549691",
          name: "GS Glb Fix Inc Pls",
          investList: [{
            dateInvest: "2019-03-21",
            dateCheck: new Date("2019-03-21").getTime(),
            nUps: 10
          }]
        }, {
          isin: "LU0115139569",
          name: "I Consumer Trends",
          investList: [{
            dateInvest: "2019-04-02",
            dateCheck: new Date("2019-04-02").getTime(),
            nUps: 10
          }, {
            dateInvest: "2019-02-07",
            dateCheck: new Date("2019-02-07").getTime(),
            nUps: 10
          }]
        }]
      }];
    for (let index = 0; index < wallets.length; index++) {
      let req = {
        body: {
          owner: wallets[index].owner,
          walletName: wallets[index].nameWallet,
          walletFunds: wallets[index].listFunds
        }
      }
      walletLib.saveWallet(req);
    }


  }
}