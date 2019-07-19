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
    listFunds: []
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
      nameWalletAux: (req.body.walletName).toString().trim().toLowerCase()
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
    owner: fund.owner,
    listFunds: {
      "$elemMatch": {
        isin: fund.isin,
        dateCheck: new Date(fund.dateInvest).getTime()
      }
    }
    // "listFunds.codefund": fund.isin + "-" + (new Date(fund.dateInvest).getTime()).toString()
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

Wallet.prototype.getOwnerWalletFundList = function (req, res, callback) {
  let query = {
    owner: req.params.owner,
    _id: req.params.wallet
  }
  this.walletdb.find(query, (err, wallet) => {
    if (err) {
      return res.status(500).send({
        status: false,
        data: "There was a problem finding the Wallet."
      });
    }
    callback(wallet[0]);
  });
}

Wallet.prototype.getOwnerWalletFundListEdit = function (req, res, callback) {
  let query = {
    owner: req.params.owner,
    _id: req.params.wallet
  };
  this.walletdb.find(query,
    {
      _id: 1,
      owner: 1,
      nameWallet: 1
    }, function (err, wallet) {
      if (err) {
        return res.status(500).send({
          status: false,
          data: "There was a problem finding the Wallet funds."
        });
      }
      callback(wallet[0]);
    });
}

Wallet.prototype.updateWalletMoney = function (res, wallet, valsup, callback) {
  let self = this,
    options = {
      upsert: true
    },
    query = {
      owner: wallet.owner,
      nameWallet: wallet.nameWallet
    };
  this.walletdb.updateOne(query, {
    "$set": {
      dateLastUpdateWallet: new Date(),
      startWalletMoney: valsup.valueStart,
      lastWalletMoney: valsup.valueEnd
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
        data: wallet
      });
    } else {
      console.log("Update All Wallet Money", result /**/);
      if (callback) {
        callback();
      }
    }
  })
}

Wallet.prototype.deleteOwnerWallet = function (walletId, res) {
  let query = {
    owner: walletId.owner,
    _id: walletId.walletId
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
/* 
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
        console.log("Update Fund Money in Wallet", walletId, fundUpdate.isin, result);
      }
      callback();
    })

} */

/* Wallet.prototype.lastUpdateOnlyDateFundInWallet = function (walletId, dateCheck, isin, callback) {
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
        console.log("Update Date Fund in Wallet", walletId, isin, result);
      }
      callback();
    });
} */

Wallet.prototype.updateWalletOwner = function (objData, res, callback) {
  let self = this,
    options = {
      upsert: true,
      multi: true
    };
  this.walletdb.updateOne({
    "_id": objData.walletId,
    "owner": objData.owner
  }, {
      "$set": {
        nameWallet: (objData.walletName).toString().trim(),
        nameWalletAux: (objData.walletName).toString().trim().toLowerCase()
      }
    }, options, function (err, result) {
      if (err) {
        console.log("Error to update Wallet.", err);
        return res.status(500).send({
          status: false,
          data: "Error to update Wallet." + err
        });
      }
      console.log("Wallet Update and delete null funds.", result);
      self.getWalletToUpdateFundsList(objData, res, callback);
    });
}

Wallet.prototype.getWalletToUpdateFundsList = function (objData, res, callback) {
  let query = {
    owner: objData.owner,
    _id: objData.walletId
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

/* Wallet.prototype.findExistsFundInWallet = function (isin, res, callback) {
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
} */

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