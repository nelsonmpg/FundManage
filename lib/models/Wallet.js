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
      // Código do fundo = ISIN + "-" + new Date(dateInvest).getTime()
      codefund: { type: String, required: true, unique: true },
      // Isin do fundo
      isin: { type: String, required: true },
      // Nome do fundo
      name: { type: String, required: true },
      // Data do investimento
      dateInvest: { type: Date },
      // Data da ultima atualização
      dateLastUpdate: { type: Date, default: Date.now },
      // Data da ultima atualização do historico do fundo
      dateLastUpdateInvest: { type: Date },
      // Numero de 'Ups' compradas
      nUps: { type: Number, default: 0 },
      // Valor do investimento calculado pla BD (nUps * cotação na data da compra)
      valInvest: { type: Number, default: 0 },
      // Valor do investimento calculado pla BD (nUps * cotação do ultimo registo)
      valLastMoney: { type: Number, default: 0 },
      // estado do fundo na carteira
      active: { type: Boolean, default: true },
      // Data da inativação do investimento
      dateInative: { type: Date },
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
      dateLastUpdateWallet: 1
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
Wallet.prototype.updateCotacao = function (res, fund, callback) {
  console.log("Save fund Wallet - code", fund.isin + "-" + new Date(fund.dateInvest).getTime(), fund, fund.HistoryDetail.length, fund.HistoryDetail[0], fund.HistoryDetail[fund.HistoryDetail.length - 1]);

  let options = {
    upsert: true
  };
  this.walletdb.updateOne({
    "owner": fund.owner,
    "listFunds.codefund": fund.isin + (new Date(fund.dateInvest).getTime()).toString()
  }, {
      "$set": {
        "listFunds.$.cotacaoUp": fund.Value,
        "listFunds.$.dateLastUpdate": new Date(),
        "listFunds.$.valInvest": (fund.nUps * fund.Value),
        "listFunds.$.valLastMoney": fund.HistoryDetail[fund.HistoryDetail.length - 1].moneyCalc,
        "listFunds.$.dateLastUpdateInvest": fund.HistoryDetail[fund.HistoryDetail.length - 1].EndDate
      },
      "$push": {
        "listFunds.$.moneyFund": {
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
      console.log("Update Cotacao", result/**/);
      callback();
    })
}

Wallet.prototype.getOwnerWalletFundList = function (req, res) {
  let query = {
    owner: req.params.owner,
    _id: req.params.wallet
  }
  this.walletdb.find(query).sort({ 'listFunds.name': 1 }).exec((err, wallet) => {
    if (err) {
      return res.status(500).send({
        status: false,
        data: "There was a problem finding the Wallet."
      });
    }
    let arrAux = [],
      arrAll = [],
      endArrAllMoney = [],
      dateEnd = new Date().setHours(0, 0, 0, 0),
      lastDate,
      lastDateTime,
      countpost = 0,
      lastObj,
      lastObjDate,
      portfolio = wallet[0]/* ,
      invertListArr = [] */;
    dateEnd = new Date(dateEnd).getTime();

    try {
      for (let x = 0; x < portfolio.listFunds.length; x++) {
        if (portfolio.listFunds[x]) {
          // invertListArr.push(portfolio.listFunds[x])
          countpost = 0;
          lastDate = new Date(portfolio.listFunds[x].moneyFund[countpost].EndDate);
          lastObjDate = lastDate;
          lastObj = portfolio.listFunds[x].moneyFund[countpost];

          while (lastDate.getTime() < dateEnd) {
            lastDateTime = lastDate.getTime();
            arrAux.push(lastDateTime);
            if (typeof arrAll[lastDateTime] !== 'object') {
              arrAll[lastDateTime] = {
                moneyWalletCalc: (lastObj.moneyCalc * 1),
                EndDate: lastDate
              }
            } else {
              arrAll[lastDateTime] = {
                moneyWalletCalc: arrAll[lastDateTime].moneyWalletCalc + (lastObj.moneyCalc * 1),
                EndDate: lastDate
              }
            }
            if (lastDate.setHours(0, 0, 0, 0) === lastObjDate.setHours(0, 0, 0, 0)) {
              countpost++;
              if (portfolio.listFunds[x].moneyFund[countpost]) {
                lastObj = portfolio.listFunds[x].moneyFund[countpost];
                lastObjDate = new Date(lastObj.EndDate);
              }
            }
            if (!portfolio.listFunds[x].active) {
              let datInative = new Date(portfolio.listFunds[x].dateInative)
              if (lastDate.setHours(0, 0, 0, 0) > datInative.setHours(0, 0, 0, 0)) {
                lastObj.moneyCalc = 0;
              }
            }
            lastDate = new Date(lastDate.setDate(lastDate.getDate() + 1));
          }
        }
        // portfolio.listFunds[x] = invertListArr;
        // invertListArr = [];
      }
    } catch (e) {
      console.log("Error getOwnerWalletFundList.", e);
    }

    let arrAuxSorted = utils.sortUnique(arrAux);
    for (let index = 0; index < arrAuxSorted.length; index++) {
      endArrAllMoney.push(arrAll[arrAuxSorted[index]]);
    }
    portfolio.moneyWallet = endArrAllMoney;
    res.status(200).send({
      status: true,
      data: portfolio
    });
  });
}

Wallet.prototype.getOwnerWalletFundListEdit = function (req, res) {
  let query = {
    owner: req.params.owner,
    _id: req.params.wallet
  };
  this.walletdb.find(query,
    {
      _id: 0,
      owner: 1,
      nameWallet: 1,
      "listFunds.isin": 1,
      "listFunds.name": 1,
      "listFunds.dateInvest": 1,
      "listFunds.nUps": 1,
      "listFunds.active": 1,
      "listFunds.dateInative": 1
    }, function (err, wallet) {
      if (err) {
        return res.status(500).send({
          status: false,
          data: "There was a problem finding the Wallet funds."
        });
      }
      let objReturn = {
        owner: wallet[0].owner,
        nameWallet: wallet[0].nameWallet,
        listFunds: []
      },
        mergeFundInvest = [];

      for (let index = 0; index < wallet[0].listFunds.length; index++) {
        if (!mergeFundInvest[wallet[0].listFunds[index].isin]) {
          mergeFundInvest[wallet[0].listFunds[index].isin] = {
            isin: wallet[0].listFunds[index].isin,
            name: wallet[0].listFunds[index].name,
            investList: []
          }
        }
        mergeFundInvest[wallet[0].listFunds[index].isin].investList.push({
          nUps: wallet[0].listFunds[index].nUps,
          active: wallet[0].listFunds[index].active,
          dateInvest: wallet[0].listFunds[index].dateInvest,
          dateInative: wallet[0].listFunds[index].dateInative
        });
      }

      for (let index in mergeFundInvest) {
        objReturn.listFunds.push(mergeFundInvest[index]);
      }

      res.status(200).send({
        status: true,
        data: objReturn
      });
    });
}

Wallet.prototype.updateWalletMoney = function (res, wallet, callback) {
  let self = this,
    options = {
      upsert: true
    },
    owner = wallet.owner,
    walletname = wallet.nameWallet,
    startMoney = 0,
    lastVal = 0,
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
        if (callback) {
          callback();
        }
        return console.log("There was a problem finding the Wallet.");
      }
    }

    for (let index = 0; index < wallet[0].listFunds.length; index++) {
      // console.log("num funds", wallet[0].listFunds.length);
      // console.log("Fund - ", wallet[0].listFunds[index].isin, wallet[0].listFunds[index]);

      if (wallet[0].listFunds[index]) {
        // console.log("fund pos", index);

        let val = wallet[0].listFunds[index],
          arrPos = val.moneyFund.length - 1;
        if (arrPos < 0) {
          arrPos = 0;
        }
        // console.log("Dentro If", val.moneyFund[arrPos], val.moneyFund.length, wallet[0].listFunds[index].isin);

        lastVal += val.moneyFund[arrPos].moneyCalc
        startMoney += val.valInvest;
      }
    }
    self.walletdb.updateOne({
      owner: owner,
      nameWallet: walletname
    }, {
        "$set": {
          dateLastUpdateWallet: new Date(),
          startWalletMoney: startMoney,
          lastWalletMoney: lastVal
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
            if (callback) {
              callback();
            }
            return console.log("Error to update Wallet Money." + err);
          }
        }
        if (res) {
          res.status(200).send({
            status: true,
            data: wallet[0]
          });
        } else {
          console.log("Update All Wallet Money", result /**/);
          if (callback) {
            callback();
          }
        }
      })
  });
}

Wallet.prototype.deleteOwnerWallet = function (req, res) {
  let query = {
    owner: req.params.owner,
    _id: req.params.wallet
  }

  this.walletdb.deleteOne(query, function (err, result) {
    if (err) {
      return res.status(500).send({
        status: false,
        data: "There was a problem remove the Wallet."
      });
    }
    res.status(200).send({
      status: true,
      data: "The Wallet deleted."
    });
  });
}

Wallet.prototype.getAllWallets = function (callback) {
  this.walletdb.find({},
    {
      _id: 1,
      owner: 1,
      nameWallet: 1,
      dateLastUpdateWallet: 1,
      lastWalletMoney: 1,
      'listFunds.isin': 1,
      'listFunds.name': 1,
      'listFunds.nUps': 1,
      'listFunds.active': 1,
      'listFunds.dateInative': 1,
      'listFunds.dateCheck': 1,
      "listFunds.dateInvest": 1,
      'listFunds.dateLastUpdate': 1,
      'listFunds.dateLastUpdateInvest': 1
    },
    function (err, wallets) {
      if (err) {
        return console.log("erro to find all wallets.");
      }
      callback(wallets);
    });
}

Wallet.prototype.updateMoneyFundWallet = function (walletId, dateCheck, fundUpdate, callback) {
  let options = {
    upsert: true
  };
  this.walletdb.updateOne({
    "_id": walletId,
    "listFunds.codefund": fundUpdate.isin + "-" + dateCheck
  }, {
      "$set": {
        dateLastUpdateWallet: new Date(),
        "listFunds.$.dateLastUpdate": new Date(),
        "listFunds.$.valLastMoney": fundUpdate.HistoryDetail[fundUpdate.HistoryDetail.length - 1].moneyCalc,
        "listFunds.$.dateLastUpdateInvest": fundUpdate.HistoryDetail[fundUpdate.HistoryDetail.length - 1].EndDate
      },
      "$push": {
        ["listFunds.$.moneyFund"]: {
          $each: fundUpdate.HistoryDetail,
          $sort: { EndDate: 1 }
        }
      }
    }, options, function (err, result) {
      if (err) {
        console.log("Error to update value cotacao in Wallet." + err);
      } else {
        console.log("Update Fund Money in Wallet", walletId, fundUpdate.isin, result /**/);
      }
      callback();
    })

}

Wallet.prototype.lastUpdateOnlyDateFundInWallet = function (walletId, dateCheck, isin, callback) {
  let options = {
    upsert: true
  };
  this.walletdb.updateOne({
    "_id": walletId,
    "listFunds.codefund": isin + "-" + dateCheck
  }, {
      "$set": {
        dateLastUpdateWallet: new Date(),
        ["listFunds.$.dateLastUpdate"]: new Date()
      }
    }, options, function (err, result) {
      if (err) {
        console.log("Error to update value cotacao." + err);
      } else {
        console.log("Update Date Fund in Wallet", walletId, isin, result /**/);
      }
      callback();
    });
}

Wallet.prototype.updateWalletOwner = function (req, res, callback) {
  let self = this,
    requestData = req.body,
    owner = requestData.owner,
    idwalet = requestData._idWallet,
    options = {
      upsert: true,
      multi: true
    };
  this.walletdb.updateOne({
    "_id": idwalet,
    "owner": owner
  }, {
      "$set": {
        nameWallet: (requestData.walletName).toString().trim(),
        nameWalletAux: (requestData.walletName).toString().trim().toLowerCase(),
        listFunds: requestData.walletFunds
      }
    }, options, function (err, result) {
      if (err) {
        console.log("Error to update Wallet.", err);
        return res.status(500).send({
          status: false,
          data: "Error to update Wallet." + err
        });
      }
      // console.log("Wallet Update and delete null funds.", result/**/);
      self.deleteNullFunds(requestData, res, callback);
    });
}

Wallet.prototype.deleteNullFunds = function (objReq, res, callback) {
  let self = this,
    owner = objReq.owner,
    idwalet = objReq._idWallet,
    options = {
      upsert: true,
      multi: true,
      strict: false
    };
  this.walletdb.updateOne({
    "_id": idwalet,
    "owner": owner
  }, {
      "$pull": {
        listFunds: null
      }
    }, options, function (err, result) {
      if (err) {
        console.log("Error to update Wallet.", err);
        return res.status(500).send({
          status: false,
          data: "Error to update Wallet." + err
        });
      }
      // console.log("Wallet Update and delete null investiments.", result/**/);
      // self.deleteNullInvestiments(objReq, res, callback)
      self.getWalletToUpdateFundsList(owner, idwalet, res, callback)
    });
}

Wallet.prototype.getWalletToUpdateFundsList = function (owner, walletId, res, callback) {
  let query = {
    owner: owner,
    _id: walletId
  }
  this.walletdb.find(query, function (err, wallet) {
    if (err) {
      return res.status(500).send({
        status: false,
        data: "There was a problem finding the Wallet."
      });
    }
    callback(wallet[0]);
  });
}

Wallet.prototype.findExistsFundInWallet = function (isin, res, callback) {
  this.walletdb.find({ "listFunds.isin": isin }, function (err, walletList) {
    if (err) {
      return res.status(500).send({
        status: false,
        data: "There was a problem finding funds in all Wallets."
      });
    }
    if (walletList.length > 0) {
      return res.status(200).send({
        status: false,
        data: "This fund exists on Portfolios, remove first on portfolios and then remove fund."
      });
    }
    callback();
  });
}

Wallet.prototype.backupPortfolios = function (callback) {
  this.getAllWallets(function (wallets) {
    let utils = require('./../utils.js'),
      backupFile = utils.getFileBackup(),
      fileSave = backupFile.portfolios,
      walletBackup = [];
    for (let a = 0; a < wallets.length; a++) {
      walletBackup.push({
        owner: wallets[a].owner,
        nameWallet: wallets[a].nameWallet,
        listFunds: []
      });
      for (let b = 0; b < wallets[a].listFunds.length; b++) {
        walletBackup[walletBackup.length - 1].listFunds.push({
          codefund: wallets[a].listFunds[b].codefund,
          isin: wallets[a].listFunds[b].isin,
          name: wallets[a].listFunds[b].name,
          dateInvest: wallets[a].listFunds[b].dateInvest,
          dateCheck: wallets[a].listFunds[b].dateCheck,
          nUps: wallets[a].listFunds[b].nUps,
          active: wallets[a].listFunds[b].active,
          dateInative: wallets[a].listFunds[b].dateInative,
          dateInvest: wallets[a].listFunds[b].dateInvest
        });
      }
    }
    fileSave = fileSave.replace("##date##", "_" + utils.dateLastUpdateV3(new Date()));
    utils.createFileSaveContent(fileSave, JSON.stringify(walletBackup));
    callback();
  })
}

module.exports = Wallet;