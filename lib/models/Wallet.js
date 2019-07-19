'use strict'
let mongoose = require('mongoose'),
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
      lastWalletMoney: 1
    },
    function (err, wallets) {
      if (err) {
        return console.log("erro to find all wallets.");
      }
      callback(wallets);
    });
}

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

module.exports = Wallet;