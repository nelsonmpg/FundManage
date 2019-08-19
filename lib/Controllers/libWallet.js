'use strict'
let Wallet = require('./../models/Wallet.js'),
  fundsLib = require('./libFunds.js'),
  fundsWalletLib = require('./libFundsWallet.js');

Wallet = new Wallet();

let self = module.exports = {
  saveWallet: function (req, res) {
    Wallet.saveWallet(req, res, function (wallet) {
      fundsWalletLib.saveAllFundsWallet(wallet, req.body.walletFunds, res, function (fundslist) {
        console.log("End Teste insert Funds List, then update Funds.");
        self.updateFundCotacao(res, fundslist, 0, wallet);
      })

    });
  },
  updateFundCotacao: function (res, fundList, posA, wallet) {
    if (fundList[posA]) {
      let isin = fundList[posA].isin,
        nUps = fundList[posA].nUps,
        datacotacao = fundList[posA].dateInvest,
        dateEnd = new Date();
      if (!fundList[posA].active) {
        dateEnd = new Date(fundList[posA].dateInative);
      }
      fundsLib.getFundCotacaoByDateAndCalcMoney(res, isin, nUps, datacotacao, dateEnd, function (fund) {
        fundsWalletLib.updateWalletFund(fundList[posA], fund, res, function () {
          self.updateFundCotacao(res, fundList, ++posA, wallet);
        });
      });
    } else {
      console.log("End all funds update, now update all money of wallet");
      fundsWalletLib.getFundsWalletMoney(wallet, res, function (valsup) {
        Wallet.updateWalletMoney(res, wallet, valsup, null);
      })
    }
  },
  getOwnerWallets: function (req, res) {
    Wallet.getOwnerWallets(req, res);
  },
  getOwnerWalletFundList: function (req, res) {
    Wallet.getOwnerWalletFundList(req, res, function (wallet) {
      fundsWalletLib.findFundsInWallet(res, wallet);
    });
  },
  getOwnerWalletFundListEdit: function (req, res) {
    Wallet.getOwnerWalletFundListEdit(req, res, function (wallet) {
      fundsWalletLib.findFundsInWalletEdit(res, wallet);
    });
  },
  deleteOwnerWallet: function (req, res) {
    let objData = {
      owner: req.params.owner,
      walletId: req.params.wallet
    }
    fundsWalletLib.deleteAllFunds(objData, res, function () {
      Wallet.deleteOwnerWallet(objData, res);
    })
  },
  updateAllWallets: function (callback) {
    fundsWalletLib.getAllFundsWallets(callback, function (fundsWalletList) {
      self.updaateAllFundsWallets(fundsWalletList, 0, callback);
    })
  },
  updaateAllFundsWallets: function (listFunds, pos, callback) {
    fundsLib.sendMsgToParentProc("updateFundsAndWallets", true, "", "Step 2 / 3", (pos * 100 / listFunds.length).toFixed(0) * 1, false);
    if (listFunds[pos]) {
      let active = listFunds[pos].active,
        isinCode = listFunds[pos].isin,
        nUps = listFunds[pos].nUps,
        dateCota = new Date(listFunds[pos].dateLastUpdateInvest),
        dateSystemNow = new Date();
      if (active) {
        dateCota = new Date(dateCota.setDate(dateCota.getDate() + 1));
        fundsLib.getFundCotacaoByDateAndCalcMoneyUpdateWallets(isinCode, nUps, dateCota, dateSystemNow, function (fundHistToWallet) {
          if (fundHistToWallet) {
            fundsWalletLib.updateMoneyFundWallet(listFunds[pos], fundHistToWallet, function () {
              self.updaateAllFundsWallets(listFunds, ++pos, callback);
            });
          } else {
            fundsWalletLib.lastUpdateOnlyDateFundInWallet(listFunds[pos], function () {
              self.updaateAllFundsWallets(listFunds, ++pos, callback);
            });
          }
        });
      } else {
        console.log("Fund Inative.", isinCode);
        fundsWalletLib.lastUpdateOnlyDateFundInWallet(listFunds[pos], function () {
          self.updaateAllFundsWallets(listFunds, ++pos, callback);
        });
      }
    } else {
      console.log("End (y)");
      console.log("End all funds update, now update all money of wallet");
      Wallet.getAllWallets(function (wallets) {
        self.updateWalletByWalletMonet(wallets, 0, callback);
      });
    }
  },
  updateWalletByWalletMonet: function (Wallets, pos, callback) {
    if (Wallets[pos]) {
      fundsWalletLib.getFundsWalletMoney(Wallets[pos], null, function (valsup) {
        Wallet.updateWalletMoney(null, Wallets[pos], valsup, function () {
          self.updateWalletByWalletMonet(Wallets, ++pos, callback);
        });
      })
    } else {
      fundsLib.sendMsgToParentProc("endUpdate", false, "", "Step 3 / 3", 100, false);
      callback();
    }
  },

  updateWalletOwner: function (req, res) {
    let objData = {
      owner: req.body.owner,
      walletId: req.body._idWallet,
      walletName: req.body.walletName,
      walletFunds: req.body.walletFunds
    };
    fundsWalletLib.deleteAllFunds(objData, res, function () {
      Wallet.updateWalletOwner(objData, res, function (wallet) {
        let fundList = objData.walletFunds;
        fundsWalletLib.saveAllFundsWallet(wallet, fundList, res, function (fundslist) {
          console.log("End Insert Funds List, then update Funds.");
          self.updateFundCotacao(res, fundslist, 0, wallet);
        })
      });
    })
  },
  findExistsFundInWallet: function (isin, res, callback) {
    fundsWalletLib.findFundUsageByIsin(isin, res, callback);
  },
  backupPortfolios: function (callback) {
    console.log("teste backup");
    Wallet.getAllWallets(function (wallets) {
      let walletBackup = [];
      self.backupWalletByWalley(wallets, 0, walletBackup, callback);
    });
  },
  backupWalletByWalley: function (wallets, pos, walletBackup, callback) {
    if (wallets[pos]) {
      fundsWalletLib.findFundsInWalletToBackup(wallets[pos], callback, function (fundlist) {
        walletBackup.push({
          owner: wallets[pos].owner,
          nameWallet: wallets[pos].nameWallet,
          listFunds: []
        });
        for (let b = 0; b < fundlist.length; b++) {
          walletBackup[walletBackup.length - 1].listFunds.push({
            codefund: fundlist[b].codefund,
            isin: fundlist[b].isin,
            name: fundlist[b].name,
            dateInvest: fundlist[b].dateInvest,
            dateCheck: fundlist[b].dateCheck,
            nUps: fundlist[b].nUps,
            active: fundlist[b].active,
            dateInative: fundlist[b].dateInative,
            dateInvest: fundlist[b].dateInvest
          });
        }
        self.backupWalletByWalley(wallets, ++pos, walletBackup, callback);
      });
    } else {
      let utils = require('../utils.js'),
        backupFile = utils.getFileBackup(),
        fileSave = backupFile.portfolios;
      fileSave = fileSave.replace("##date##", "_" + utils.dateLastUpdateV3(new Date()));
      utils.createFileSaveContent(fileSave, JSON.stringify(walletBackup));
      callback();
    }
  }
}