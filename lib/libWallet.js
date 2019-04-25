'use strict'
let Wallet = require('./models/Wallet.js'),
  fundsLib = require('./libFunds.js');

Wallet = new Wallet();

let self = module.exports = {
  saveWallet: function (req, res) {
    Wallet.saveWallet(req, res, function (wallet) {
      let fundList = wallet.listFunds;
      self.updateFundCotacao(res, fundList, 0, 0, wallet);
    });
  },
  updateFundCotacao: function (res, fundList, posA, posB, wallet) {
    if (fundList[posA]) {
      let isin = fundList[posA].isin;
      if (fundList[posA].investList[posB]) {
        let nUps = fundList[posA].investList[posB].nUps,
          datacotacao = fundList[posA].investList[posB].dateInvest;
        fundsLib.getFundCotacaoByDateAndCalcMoney(res, wallet.owner, isin, nUps, datacotacao, function (fund) {
          Wallet.updateCotacao(res, fund, posB, function () {
            self.updateFundCotacao(res, fundList, posA, ++posB, wallet);
          });
        });
      } else {
        self.updateFundCotacao(res, fundList, ++posA, 0, wallet);
      }
    } else {
      console.log("End all funds update, now update all money of wallet");
      Wallet.updateWalletMoney(res, wallet);
    }
  },
  getOwnerWallets: function (req, res) {
    Wallet.getOwnerWallets(req, res);
  },
  getOwnerWalletFundList: function (req, res) {
    Wallet.getOwnerWalletFundList(req, res);
  }
}