'use strict'
let mongoose = require('mongoose'),
  utils = require('./../utils.js'),
  WalletSchema = new mongoose.Schema({
    // dono da carteira
    owner: { type: String, required: true, unique: true },
    // nome da carteira
    nameWallet: { type: String, required: true },
    // controlo de nome repetidos do user
    nameWalletAux: { type: String, required: true },
    // Data da ultima actualização da carteira
    dateLastUpdateWallet: { type: Date, default: Date.now },
    // Calculo do ultimo valor total da carteira
    lastWalletMoney: { type: Number, default: 0 },
    // Calculo do valor inicial da carteira
    startWalletMoney: { type: Number, default: 0 },
    // Array para o grafico da evolição da carteira       
    moneyWallet: [{
      // Data do registo
      EndDate: { type: Date },
      // Valor calculado total para o dia
      moneyWalletCalc: { type: Number }
    }],
    // Array com a lista dos fundos
    listFunds: [{
      // Código do fundo
      isin: { type: String, required: true, unique: true },
      // Nome do fundo
      name: { type: String, required: true },
      // Array de investimentos no fundo
      investList: [{
        // Data fara o find do investimento no fundo
        dateCheck: { type: Number, unique: true, required: true },
        // Data do investimento
        dateInvest: { type: Date },
        // Data da ultima atualização
        dateLastUpdate: { type: Date, default: Date.now },
        // Numero de 'Ups' compradas
        nUps: { type: Number, default: 0 },
        // Valor do investimento calculado pla BD (nUps * cotação na data da compra)
        valInvest: { type: Number, default: 0 },
        // estado do fundo na carteira
        active: { type: Boolean, default: true },
        // Valor unitario na data da compra
        cotacaoUp: { type: Number, default: 0 },
        // Array para gráfico com a evolução do fundo
        moneyFund: [{
          // Data da cotação Morningstar
          EndDate: { type: Date },
          // Valor Moringstar
          Value: { type: Number },
          // Calculo no dia das (Ups * cotação atual)
          moneyCalc: { type: Number }
        }]
      }]
    }]
  }),
  Wallet = function () {
    // Esquema dos objectos Wallet
    this.walletdb = mongoose.model('Wallet', WalletSchema);
  };

Wallet.prototype.saveWallet = function (req, res, callback) {
  let self = this;
  self.getWalletControl(req.body.owner, req.body.walletName, res, function () {
    self.walletdb.create({
      owner: req.body.owner,
      nameWallet: (req.body.walletName).toString().trim(),
      nameWalletAux: (req.body.walletName).toString().trim().toLowerCase(),
      listFunds: req.body.walletFunds
    },
      function (err, wallet) {
        if (err) {
          if (res) {
            return res.status(500).send({
              status: false,
              data: "There was a problem adding the information to the database."
            });
          } else {
            return console.log("There was a problem adding the information to the database.", err);
          }
        }
        console.log("Save wallet and update cotacao.");
        callback(wallet);
      });
  });
}

Wallet.prototype.getWalletControl = function (owner, walletName, res, callback) {
  let query = {
    owner: owner,
    nameWalletAux: (walletName).toString().trim().toLowerCase()
  }
  this.walletdb.find(query, function (err, wallet) {
    // console.log("Wallet result", wallet.length, err, wallet);
    if (err) {
      if (res) {
        return res.status(500).send({
          status: false,
          data: "There was a problem finding the Wallet."
        });
      } else {
        return console.log("There was a problem finding the Wallet.");
      }
    }
    if (wallet.length === 0) {
      return callback();
    }
    if (res) {
      res.status(200).send({
        status: false,
        data: wallet[0]
      });
    } else {
      console.log("Wallet exists", wallet[0].nameWallet);
    }
  });
}

Wallet.prototype.getOwnerWallets = function (req, res) {
  let self = this;
  this.walletdb.find({
    owner: req.params.owner
  }, {
      _id: 1,
      owner: 1,
      nameWallet: 1,
      lastWalletMoney: 1,
      startWalletMoney: 1,
      dateLastUpdateWallet: 1/*,
      "listFunds.isin": 1,
      "listFunds.name": 1,
      "listFunds.investList.nUps": 1,
      "listFunds.investList.dateLastUpdate": 1,
      "listFunds.investList.valInvest": 1,
      "listFunds.investList.active": 1,
      "listFunds.investList.cotacaoUp": 1,
      "listFunds.investList.dateInvest": 1,
      "listFunds.investList.moneyFund": 1*/
    }, function (err, wallet) {
      if (err) {
        return res.status(500).send({
          status: false,
          data: "There was a problem finding the Wallet."
        });
      }
      res.status(200).send({
        status: true,
        data: wallet
      });
    });
}
Wallet.prototype.updateCotacao = function (res, fund, pos, callback) {
  let options = { upsert: true };
  this.walletdb.updateOne(
    {
      "owner": fund.owner,
      "listFunds.isin": fund.isin,
      "listFunds.investList.dateCheck": new Date(fund.dateInvest).getTime()
    }, {
      "$set": {
        ["listFunds.$.investList." + pos + ".cotacaoUp"]: fund.Value,
        ["listFunds.$.investList." + pos + ".valInvest"]: (fund.nUps * fund.Value)
      },
      "$push": {
        ["listFunds.$.investList." + pos + ".moneyFund"]: {
          $each: fund.HistoryDetail,
          $sort: { EndDate: 1 }
        }
      }
    }, options, function (err, result) {
      if (err) {
        console.log("Error to update value cotacao.", err);
        if (res) {
          return res.status(500).send({
            status: false,
            data: "Error to update value cotacao." + err
          });
        } else {
          return console.log("Error to update value cotacao." + err);
        }
      }
      console.log("Update Cotacao"/*, result*/);
      callback();
    })
}

Wallet.prototype.getOwnerWalletFundList = function (req, res) {
  let query = {
    owner: req.params.owner,
    _id: req.params.wallet
  }
  this.walletdb.find(query, function (err, wallet) {
    if (err) {
      return res.status(500).send({
        status: false,
        data: "There was a problem finding the Wallet."
      });
    }
    res.status(200).send({
      status: true,
      data: wallet[0]
    });
  });
}

Wallet.prototype.updateWalletMoney = function (res, wallet) {
  let self = this,
    options = { upsert: true },
    owner = wallet.owner,
    walletname = wallet.nameWallet,
    arrAll = [],
    arrAux = [],
    arrAuxSorted,
    endArrAllMoney = [],
    startMoney = 0,
    query = {
      owner: owner,
      nameWallet: walletname
    };
  this.walletdb.find(query, function (err, wallet) {
    if (err) {
      console.log("There was a problem finding the Wallet.");
      if (res) {
        return res.status(500).send({
          status: false,
          data: "There was a problem finding the Wallet."
        });
      } else {
        return console.log("There was a problem finding the Wallet.");
      }
    }
    for (let index = 0; index < wallet[0].listFunds.length; index++) {
      for (let index2 = 0; index2 < wallet[0].listFunds[index].investList.length; index2++) {
        for (let index3 = 0; index3 < wallet[0].listFunds[index].investList[index2].moneyFund.length; index3++) {
          let dataMoneyFund = wallet[0].listFunds[index].investList[index2].moneyFund[index3].EndDate,
            moneyFund = wallet[0].listFunds[index].investList[index2].moneyFund[index3].moneyCalc;

          if (!utils.dateIsWeekend(dataMoneyFund)) {
            let dateConvertedTime = new Date(dataMoneyFund).getTime()
            arrAux.push(dateConvertedTime);
            if (typeof arrAll[dateConvertedTime] !== 'object') {
              arrAll[dateConvertedTime] = {
                moneyWalletCalc: (moneyFund * 1),
                EndDate: dataMoneyFund
              }
            } else {
              arrAll[dateConvertedTime] = {
                moneyWalletCalc: arrAll[dateConvertedTime].moneyWalletCalc + (moneyFund * 1),
                EndDate: dataMoneyFund
              }
            }
          }
          if (index3 === wallet[0].listFunds[index].investList[index2].moneyFund.length - 1) {
            // console.log("date", dataMoneyFund);            
          }
        }
        startMoney += wallet[0].listFunds[index].investList[index2].valInvest;
      }
    }
    arrAuxSorted = utils.sortUnique(arrAux);
    for (let index = 0; index < arrAuxSorted.length; index++) {
      endArrAllMoney.push(arrAll[arrAuxSorted[index]]);
    }
    let lastVal = endArrAllMoney[endArrAllMoney.length - 1].moneyWalletCalc * 1;
    self.walletdb.updateOne(
      {
        owner: owner,
        nameWallet: walletname
      }, {
        "$set": {
          dateLastUpdateWallet: new Date(),
          startWalletMoney: startMoney,
          lastWalletMoney: lastVal
        },
        "$push": {
          "moneyWallet": {
            $each: endArrAllMoney,
            $sort: { EndDate: 1 }
          }
        }
      }, options, function (err, result) {
        if (err) {
          console.log("Error to update Wallet Money.", err);
          if (res) {
            return res.status(500).send({
              status: false,
              data: "Error to update Wallet Money." + err
            });
          } else {
            return console.log("Error to update Wallet Money." + err);
          }
        }
        if (res) {
          res.status(200).send({
            status: true,
            data: wallet[0]
          });
        } else {
          console.log("Update All Wallet Money"/*, result*/);
        }
      })
  });
}

module.exports = Wallet;