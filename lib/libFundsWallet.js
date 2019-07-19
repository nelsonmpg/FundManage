'use strict'
let FundsWallet = require('./models/FundsWallet.js');

FundsWallet = new FundsWallet();

let self = module.exports = {
    saveAllFundsWallet: function (wallet, fundsList, res, callback) {
        for (let f = 0; f < fundsList.length; f++) {
            fundsList[f].owner = wallet.owner;
            fundsList[f].walletId = wallet._id.toString();
        }

        FundsWallet.insertAllFunds(fundsList, res, callback);
    },
    updateWalletFund: function (fundWallet, fund, res, callback) {
        FundsWallet.updateWalletFund(fundWallet, fund, res, callback);
    },
    getFundsWalletMoney: function (wallet, res, callback) {
        FundsWallet.getFundsWalletMoney(wallet, res, callback);
    },
    findFundsInWallet: function (res, wallet) {
        FundsWallet.findFundsInWallet(res, wallet);
    },
    deleteAllFunds: function (objData, res, callback) {
        FundsWallet.deleteAllFunds(objData, res, callback);
    },
    findFundsInWalletEdit: function (res, wallet) {
        FundsWallet.findFundsInWalletEdit(res, wallet);
    },
    getAllFundsWallets: function (callbackNext, callbackList) {
        FundsWallet.getAllFundsWallets(callbackNext, callbackList);
    },
    updateMoneyFundWallet: function (fundUpdate, fundHistToWallet, callback) {
        FundsWallet.updateMoneyFundWallet(fundUpdate, fundHistToWallet, callback);
    },
    lastUpdateOnlyDateFundInWallet: function (fundUpdate, callback) {
        FundsWallet.lastUpdateOnlyDateFundInWallet(fundUpdate, callback);
    },
    findFundsInWalletToBackup: function (wallet, callbacknext, callbackList) {
        FundsWallet.findFundsInWalletToBackup(wallet, callbacknext, callbackList);
    }

}