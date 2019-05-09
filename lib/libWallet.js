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
          datacotacao = fundList[posA].investList[posB].dateInvest,
          dateEnd = new Date();
        if (!fundList[posA].investList[posB].active) {
          dateEnd = new Date(fundList[posA].investList[posB].dateInative);
        }
        fundsLib.getFundCotacaoByDateAndCalcMoney(res, wallet.owner, isin, nUps, datacotacao, dateEnd, function (fund) {
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
  },
  deleteOwnerWallet: function (req, res) {
    Wallet.deleteOwnerWallet(req, res);
  },
  updateAllWallets: function () {
    Wallet.getAllWallets(function (wallets) {
      // console.log(JSON.stringify(wallets, null, 2));
      for (let x = 0; x < wallets.length; x++) {
        for (let y = 0; y < wallets[x].listFunds.length; y++) {
          for (let z = 0; z < wallets[x].listFunds[y].investList.length; z++) {
            let active = wallets[x].listFunds[y].investList[z].active,
              dateCheck = wallets[x].listFunds[y].investList[z].dateCheck,
              isinCode = wallets[x].listFunds[y].isin,
              nUps = wallets[x].listFunds[y].investList[z].nUps,
              dateCota = new Date(wallets[x].listFunds[y].investList[z].dateLastUpdateInvest),
              dateLastSystemUpdate = new Date(wallets[x].listFunds[y].investList[z].dateLastUpdate),
              dateSystemNow = new Date();
            if (active) {
              if (dateLastSystemUpdate.setHours(0, 0, 0, 0) !== dateSystemNow.setHours(0, 0, 0, 0)) {
                dateCota = new Date(dateCota.setDate(dateCota.getDate() + 1));
                fundsLib.getFundCotacaoByDateAndCalcMoneyUpdateWallets(isinCode, nUps, dateCota, dateSystemNow, function (fundHistToWallet) {
                  if (fundHistToWallet) {
                    Wallet.updateMoneyFundWallet(wallets[x]._id, dateCheck, fundHistToWallet, z);
                  } else {
                    // console.log("No exists more data to Update Fund in Wallet.", isinCode);
                    Wallet.lastUpdateOnlyDateFundInWallet(wallets[x]._id, dateCheck, isinCode, z);
                  }
                });
              } else {
                console.log("Wallet Fund Out Of Date.", isinCode);
              }
            } else {
              console.log("Fund Inative.", isinCode);
            }
          }
        }
      }
    });
  },
  updateWalletOwner: function (req, res) {
    Wallet.updateWalletOwner(req, res, function (wallet) {
      let fundList = wallet.listFunds;
      self.updateFundCotacao(res, fundList, 0, 0, wallet);
    });
  }
}