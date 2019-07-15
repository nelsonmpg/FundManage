'use strict'
let Wallet = require('./models/Wallet.js'),
  fundsLib = require('./libFunds.js');

Wallet = new Wallet();

let self = module.exports = {
  saveWallet: function (req, res) {
    Wallet.saveWallet(req, res, function (wallet) {
      let fundList = wallet.listFunds;
      self.updateFundCotacao(res, fundList, 0, wallet);
    });
  },
  updateFundCotacao: function (res, fundList, posA, wallet) {
    if (fundList[posA]) {
      let isin = fundList[posA].isin;
      let nUps = fundList[posA].nUps,
        datacotacao = fundList[posA].dateInvest,
        dateEnd = new Date();
      if (!fundList[posA].active) {
        dateEnd = new Date(fundList[posA].dateInative);
      }
      // console.log("Data to fund", isin, nUps, datacotacao, dateEnd);

      fundsLib.getFundCotacaoByDateAndCalcMoney(res, wallet.owner, isin, nUps, datacotacao, dateEnd, function (fund) {
        Wallet.updateCotacao(res, fund, function () {
          self.updateFundCotacao(res, fundList, ++posA, wallet);
        });
      });
    } else {
      console.log("End all funds update, now update all money of wallet");
      Wallet.updateWalletMoney(res, wallet, null);
    }
  },
  getOwnerWallets: function (req, res) {
    Wallet.getOwnerWallets(req, res);
  },
  getOwnerWalletFundList: function (req, res) {
    Wallet.getOwnerWalletFundList(req, res);
  },
  getOwnerWalletFundListEdit: function (req, res) {
    Wallet.getOwnerWalletFundListEdit(req, res);
  },
  deleteOwnerWallet: function (req, res) {
    Wallet.deleteOwnerWallet(req, res);
  },
  updateAllWallets: function (callback) {
    Wallet.getAllWallets(function (wallets) {
      // console.log(JSON.stringify(wallets, null, 2));
      self.updateWalletByWallet(wallets, 0, 0, 0, callback);
    });
  },
  updateWalletByWallet: function (wallets, x, y, callback) {
    if (wallets[x]) {
      fundsLib.sendMsgToParentProc("updateFundsAndWallets", true, "", "Step 2 / 2", (x * 100 / wallets.length).toFixed(0) * 1, false);
      if (wallets[x].listFunds[y]) {
        let active = wallets[x].listFunds[y].active,
          dateCheck = wallets[x].listFunds[y].dateCheck,
          isinCode = wallets[x].listFunds[y].isin,
          nUps = wallets[x].listFunds[y].nUps,
          dateCota = new Date(wallets[x].listFunds[y].dateLastUpdateInvest),
          dateLastSystemUpdate = new Date(wallets[x].listFunds[y].dateLastUpdate),
          dateSystemNow = new Date();
        if (active) {
          dateCota = new Date(dateCota.setDate(dateCota.getDate() + 1));
          fundsLib.getFundCotacaoByDateAndCalcMoneyUpdateWallets(isinCode, nUps, dateCota, dateSystemNow, function (fundHistToWallet) {
            if (fundHistToWallet) {
              Wallet.updateMoneyFundWallet(wallets[x]._id, dateCheck, fundHistToWallet, function () {
                self.updateWalletByWallet(wallets, x, ++y, callback);
              });
            } else {
              Wallet.lastUpdateOnlyDateFundInWallet(wallets[x]._id, dateCheck, isinCode, function () {
                self.updateWalletByWallet(wallets, x, ++y, callback);
              });
            }
          });
        } else {
          console.log("Fund Inative.", wallets[x]._id, isinCode);
          self.updateWalletByWallet(wallets, x, ++y, callback);
        }
      } else {
        console.log("End (y)");
        console.log("End all funds update, now update all money of wallet");
        Wallet.updateWalletMoney(null, wallets[x], function () {
          self.updateWalletByWallet(wallets, ++x, 0, callback);
        });

      }
    } else {
      console.log("End (x)");
      fundsLib.sendMsgToParentProc("endUpdate", false, "", "Step 2 / 2", 0, false);
      callback();
    }
  },
  updateWalletOwner: function (req, res) {
    Wallet.updateWalletOwner(req, res, function (wallet) {
      let fundList = wallet.listFunds;
      self.updateFundCotacao(res, fundList, 0, wallet);
    });
  },
  findExistsFundInWallet: function (isin, res, callback) {
    Wallet.findExistsFundInWallet(isin, res, callback);
  },
  backupPortfolios: function (callback) {
    Wallet.backupPortfolios(callback);
  }
}