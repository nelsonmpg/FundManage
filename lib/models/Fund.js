'use strict'
let mongoose = require('mongoose'),
  isinValidator = require("cinovo-isin-validator"),
  FundSchema = new mongoose.Schema({
    // Codigo do fundo
    isin: { type: String, required: true, unique: true },
    // Id do fundo Morningstar
    idFundMorningstar: { type: String, unique: true, default: "" },
    // Id do fundo markets
    idFundMarkets: { type: String, unique: true, default: "" },
    // Nome do fundo
    name: { type: String, required: true },
    // full name fund
    nameFull: { type: String, default: "" },
    // Caegoria do fundo
    category: { type: String, default: "" },
    // availableSale do fundo
    availableSale: [{ type: String }],
    // Fund Currency
    currency: { type: String },
    // Fund domicile
    domicile: { type: String },
    // Rating morningstart
    rating: { type: Number, default: 0 },
    // data da criação do fundo
    fundStart: { type: Date },
    // Data do utlimo valor recebido da morningstar
    lastUpdate: { type: Date, default: defaultStartUpdateDate },
    // Ultimo valor recebido da morningstar
    lastValue: { type: Number, default: 0 },
    // Data da ultima atualização do sistema
    lastHistoryDate: { type: Date, default: defaultStartUpdateDate },
    // Arra com o historico total do fundo
    HistoryDetail: [{
      // Data da morningstar de registo da cotação
      EndDate: { type: Date },
      // Cotação à data na morningstar
      Value: { type: Number },
      // dia da semana do registo
      dayOfWeeek: { type: Number }
    }]
  }),
  Fund = function () {
    // Estrutura dos objectos do fundo
    this.funddb = mongoose.model('Fund', FundSchema);
  };

Fund.prototype.saveFund = function (req, res, callback) {
  let self = this,
    isinF = (req.body.isin).trim();
  self.getFundControl(isinF, res, function () {
    isinValidator(isinF, function (err) {
      if (err) {
        if (res) {
          res.status(500).send({
            status: false,
            data: "ISIN is invalid!", err
          });
        }
        return console.log("ISIN is invalid!", err);
      }
      // console.log("ISIN is fine!", isinF, req.body.name, (req.body.idFundMorningstar !== "" ? req.body.idFundMorningstar : ""));
      self.funddb.create({
        isin: isinF,
        name: req.body.name,
        idFundMorningstar: (req.body.idFundMorningstar !== "" ? req.body.idFundMorningstar : "")
      },
        function (err, fund) {
          if (err) {
            if (res) {
              res.status(500).send({
                status: false,
                data: "There was a problem adding the information to the database."
              });
            }
            return console.log("There was a problem adding the information to the database.", err);
          }
          if (res) {
            res.status(200).send({
              status: true,
              data: "This fund '" + fund.name + "' has been saved. In background updating the historical and all info."
            });
          }
          callback(fund);
          console.log("Save Fund", fund.isin);
        });
    });

  })
}

Fund.prototype.getFundControl = function (fund, res, callback) {
  let self = this;
  let query = {
    isin: fund
  }
  this.funddb.find(query, function (err, fund) {
    if (err) {
      if (res) {
        res.status(500).send({
          status: false,
          data: "There was a problem finding the Fund."
        });
      }
      return console.log("There was a problem finding the Fund.", err);
    }
    if (fund.length === 0) {
      return callback();
    }
    if (res) {
      res.status(200).send({
        status: false,
        data: fund[0]
      });
    } else {
      console.log("Fund exist find not save.", fund[0].isin);
    }
  });
}

Fund.prototype.updateHistory = function (fund, idFundMorningstar, subObj, res, callback) {
  let objLast = subObj[subObj.length - 1],
    options = { upsert: true },
    fundStart = new Date();
  if (fund.fundStart) {
    fundStart = fund.fundStart;
  }
  if (new Date(subObj[0].EndDate) < new Date(fundStart)) {
    fundStart = subObj[0].EndDate
  }
  this.funddb.updateOne(
    {
      isin: fund.isin
    }, {
      "$push": {
        "HistoryDetail": {
          $each: subObj,
          $sort: { EndDate: 1 }
        }
      },
      "$set": {
        lastUpdate: new Date(),
        idFundMorningstar: idFundMorningstar,
        lastHistoryDate: new Date(objLast.EndDate),
        lastValue: objLast.Value,
        fundStart: fundStart
      }
    }, options, function (err, result) {
      if (err) {
        if (res) {
          res.status(500).send({
            status: false,
            data: "Error Update Fund History."
          });
        }
        console.log("Error Update Fund History.", err);
      } else {
        console.log("Update Fund History.", fund.isin, result);
      }
      if (callback) {
        callback();
      }
    })
}

Fund.prototype.updateDateLastCall = function (isin, updateStartDate, res, callback) {
  let options = { upsert: true };
  this.funddb.updateOne(
    {
      isin: isin
    }, {
      "$set": {
        lastUpdate: new Date()
      }
    }, options, function (err, result) {
      if (err) {
        if (res) {
          res.status(500).send({
            status: false,
            data: "Error Date Last Call Update "
          });
        }
        console.log("Error Date Last Call Update ", err);
      } else {
        console.log("Date Last Call Update ", result);
      }
      if (callback) {
        callback(updateStartDate);
      }
    })
}

Fund.prototype.updateInfoFund = function (fund, dataFund, res, callback) {
  let query = { isin: fund.isin },
    updateVals = {
      "$set": dataFund
    },
    options = { upsert: true };
  this.funddb.updateOne(query, updateVals, options, function (err, result) {
    if (err) {
      if (res) {
        res.status(500).send({
          status: false,
          data: "Error Update Fund Info."
        });
      }
      console.log("Error Update Fund Info.", err);
    } else {
      console.log("Update Fund Info.", result, fund.isin/* , fundId */);
    }
    if (res) {
      try {
        return res.status(200).send({
          status: true,
          data: fund
        });
      } catch (e) {
        console.log("Error", e);
      }
    }
    if (callback) {
      callback();
    }
  })
}

Fund.prototype.getFunds = function (req, res, callback) {
  this.funddb.find({ /* isin: "LU0689624806"  */ }, {
    _id: 0,
    isin: 1,
    idFundMorningstar: 1,
    name: 1,
    nameFull: 1,
    lastValue: 1,
    fundStart: 1,
    lastUpdate: 1,
    lastHistoryDate: 1
  }).exec((err, funds) => {
    if (err) {
      console.log("There was a problem finding Funds.", err);
      if (res) {
        return res.status(500).send({
          status: false,
          data: "There was a problem finding Funds."
        });
      }
    }
    if (res) {
      return res.status(200).send({
        status: true,
        data: funds
      });
    }
    if (callback) {
      callback(funds);
    }
  });
}

Fund.prototype.getFundByIsin = function (req, res, callback) {
  this.funddb.find({
    isin: req.params.isin
  }, /* {
      HistoryDetail: {
        $slice: -(req.params.limit * 1)
      }
    }, */ {
      _id: 0,
      isin: 1,
      name: 1,
      lastValue: 1,
      fundStart: 1,
      lastUpdate: 1,
      HistoryDetail: 1,
      nameFull: 1,
      category: 1,
      rating: 1,
      currency: 1,
      domicile: 1,
      availableSale: 1
    }, function (err, fund) {
      if (err) {
        return res.status(500).send({
          status: false,
          data: "There was a problem finding Fund."
        });
      }
      callback(fund[0]);
    });
}

Fund.prototype.getFundCotacaoByDateAndCalcMoney = function (res, owner, isinCode, nUps, dateCota, dateEnd, callback) {
  let self = this,
    query = [
      {
        $match: { isin: isinCode }
      }, {
        $unwind: "$HistoryDetail"
      }, {
        $match: {
          "HistoryDetail.EndDate": {
            "$gte": new Date(dateCota),
            "$lte": new Date(dateEnd)
          }
        }
      }, {
        "$sort": { "HistoryDetail.EndDate": 1 }
      }, {
        $project: {
          _id: 0,
          isin: 1,
          name: 1,
          "HistoryDetail.EndDate": 1,
          "HistoryDetail.Value": 1
        }
      }, {
        $group: {
          _id: null,
          isin: { $last: '$isin' },
          name: { $last: '$name' },
          Value: { $first: "$HistoryDetail.Value" },
          dateInvest: { $first: "$HistoryDetail.EndDate" },
          HistoryDetail: {
            $push: {
              EndDate: "$HistoryDetail.EndDate",
              Value: "$HistoryDetail.Value",
              moneyCalc: { "$multiply": ["$HistoryDetail.Value", nUps] }
            }
          }
        }
      }];
  this.funddb.aggregate(query, function (err, fund) {
    if (err) {
      if (res) {
        res.status(500).send({
          status: false,
          data: "There was a problem finding Funds."
        });
      }
      return console.log("There was a problem finding Funds.", err);
    }
    if (fund[0].Value === 0) {
      let dat = new Date(dateCota);
      dat.setDate(dat.getDate() - 1);
      console.log("Call getFundCotacaoByDateAndCalcMoney - novamente", dat);
      return self.getFundCotacaoByDateAndCalcMoney(res, owner, isinCode, nUps, dat, dateEnd, callback);
    }
    fund[0].owner = owner;
    fund[0].nUps = nUps;
    callback(fund[0]);
  });
}

Fund.prototype.getFundCotacaoByDateAndCalcMoneyUpdateWallets = function (isinCode, nUps, dateCota, dateEnd, callback) {
  let self = this,
    query = [
      {
        $match: { isin: isinCode }
      }, {
        $unwind: "$HistoryDetail"
      }, {
        $match: {
          "HistoryDetail.EndDate": {
            "$gte": new Date(dateCota),
            "$lte": new Date(dateEnd)
          }
        }
      }, {
        "$sort": { "HistoryDetail.EndDate": 1 }
      }, {
        $project: {
          _id: 0,
          isin: 1,
          "HistoryDetail.EndDate": 1,
          "HistoryDetail.Value": 1
        }
      }, {
        $group: {
          _id: null,
          isin: { $last: '$isin' },
          HistoryDetail: {
            $push: {
              EndDate: "$HistoryDetail.EndDate",
              Value: "$HistoryDetail.Value",
              moneyCalc: { "$multiply": ["$HistoryDetail.Value", nUps] }
            }
          }
        }
      }];
  this.funddb.aggregate(query, function (err, fund) {
    if (err) {
      return console.log("There was a problem finding Funds.", err);
    }
    callback(fund[0]);
  });
}

Fund.prototype.getFundByIsinBetweenDates = function (req, res) {
  let query = [
    { $match: { isin: req.params.isin } },
    { $unwind: "$HistoryDetail" },
    {
      $match: {
        "HistoryDetail.EndDate": {
          "$gte": new ISODate(req.params.startdate),
          "$lte": new ISODate(req.params.enddate)
        }
      }
    }, {
      "$sort": { "HistoryDetail.EndDate": 1 }
    }, {
      $project: {
        "isin": 1,
        "name": 1,
        "lastValue": 1,
        "lastUpdate": 1,
        "HistoryDetail.EndDate": 1,
        "HistoryDetail.Value": 1
      }
    }, {
      $group: {
        _id: null,
        isin: { $last: '$isin' },
        name: { $last: '$name' },
        lastValue: { $last: '$lastValue' },
        lastUpdate: { $last: '$lastUpdate' },
        "HistoryDetail": {
          $push: {
            EndDate: "$HistoryDetail.EndDate",
            Value: "$HistoryDetail.Value",
            UpsResult: { "$multiply": ["$HistoryDetail.Value", req.params.numups] }
          }
        }
      }
    }];
  this.funddb.aggregate(query, function (err, fund) {
    if (err) {
      return res.status(500).send({
        status: false,
        data: "There was a problem finding Fund."
      });
    }
    res.status(200).send({
      status: true,
      data: fund[0]
    });
  });
}

Fund.prototype.deleteFund = function (isin, res) {
  let query = {
    isin: isin
  }

  this.funddb.deleteOne(query, function (err, result) {
    if (err) {
      return res.status(500).send({
        status: false,
        data: "There was a problem remove the Fund."
      });
    }
    return res.status(200).send({
      status: true,
      data: "Fund Deleted."
    });
  });
}

Fund.prototype.BackupFunds = function (callback) {
  this.funddb.find({ /* isin: "LU0689624806"  */ }, {
    _id: 0,
    isin: 1,
    idFundMorningstar: 1,
    name: 1
  }).exec((err, funds) => {
    if (err) {
      callback();
      return console.log("There was a problem finding Funds.", err);
    }
    let utils = require('./../utils.js'),
      backupFile = utils.getFileBackup();
    utils.createFileSaveContent(backupFile.funds, JSON.stringify(funds));
    callback();
  });
}

module.exports = Fund;

function defaultStartUpdateDate() {
  return new Date('1900-01-01');
}