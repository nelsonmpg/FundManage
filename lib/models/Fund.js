'use strict'
let mongoose = require('mongoose'),
  FundSchema = new mongoose.Schema({
    // Codigo do fundo
    isin: { type: String, required: true, unique: true },
    // Id do fundo
    idFund: { type: String, unique: true, default: "" },
    // Nome do fundo
    name: { type: String, required: true },
    // full name fund
    nameFull: { type: String, default: "" },
    // Caegoria do fundo
    category: { type: String, default: "" },
    // indice do findo
    indice: { type: String, default: "" },
    // Rating morningstart Uk
    rating: { type: Number, default: 0 },
    // data da criação do fundo
    fundStart: { type: Date },
    // Data da ultima atualização do sistema
    lastValue: { type: Number, default: 0 },
    // Ultimo valor recebido da morningstar
    lastHistoryDate: { type: Date, default: defaultStartUpdateDate },
    // Data do utlimo valor recebido da morningstar
    lastUpdate: { type: Date, default: defaultStartUpdateDate },
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
  let self = this;
  self.getFundControl(req.body.isin, res, function () {
    self.funddb.create({
      isin: req.body.isin,
      name: req.body.name
    },
      function (err, fund) {
        if (err) {
          if (res) {
            return res.status(500).send({
              status: false,
              data: "There was a problem adding the information to the database."
            });
          } else {
            return console.log("There was a problem adding the information to the database.");
          }
        }
        callback(fund);
        if (res) {
          return res.status(200).send({
            status: true,
            data: fund
          });
        } else {
          return console.log("Save Fund", fund.isin);
        }
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
        return res.status(500).send({
          status: false,
          data: "There was a problem finding the Fund."
        });
      } else {
        return console.log("There was a problem finding the Fund.");
      }
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

Fund.prototype.updateHistory = function (isin, idfund, subObj, callback) {
  let objLast = subObj[subObj.length - 1];
  let options = { upsert: true };
  this.funddb.updateOne(
    {
      isin: isin
    }, {
      "$set": {
        lastUpdate: new Date(),
        idFund: idfund,
        lastHistoryDate: new Date(objLast.EndDate),
        lastValue: objLast.Value,
        fundStart: subObj[0].EndDate
      },
      "$push": {
        "HistoryDetail": {
          $each: subObj,
          $sort: { EndDate: 1 }
        }
      }
    }, options, function (err, result) {
      if (err) {
        console.log("Error Update Fund History.", err);

      } else {
        console.log("Update Fund History."/*, result*/);
      }
      if (callback) {
        callback();
      }
    })
}

Fund.prototype.updateDateLastCall = function (isin, callback) {
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
        console.log("Error Date Last Call Update ", err)
      } else {
        console.log("Date Last Call Update ", result);
      }
      if (callback) {
        callback();
      }
    })
}

Fund.prototype.updateInfoFund = function (fund, infolist) {
  let options = { upsert: true };
  this.funddb.updateOne(
    {
      isin: fund.isin
    }, {
      "$set": {
        nameFull: infolist[0],
        category: infolist[1],
        indice: infolist[2],
        rating: infolist[3]
      }
    }, options, function (err, result) {
      console.log("Update Fund Info.", err, result);
    })
}

Fund.prototype.getFunds = function (req, res, callback) {
  this.funddb.find({}, {
    _id: 0,
    isin: 1,
    name: 1,
    lastValue: 1,
    fundStart: 1,
    lastUpdate: 1,
    lastHistoryDate: 1
  }).sort({ name: 1 }).exec((err, funds) => {
    if (err) {
      if (res) {
        return res.status(500).send({
          status: false,
          data: "There was a problem finding Funds."
        });
      } else {
        return console.log("There was a problem finding Funds.");
      }
    }
    if (res) {
      return res.status(200).send({
        status: true,
        data: funds
      });
    }
    callback(funds);
  });
}

Fund.prototype.getFundByIsin = function (req, res) {
  this.funddb.find({
    isin: req.params.isin
  }, {
      HistoryDetail: {
        $slice: -(req.params.limit * 1)
      }
    }, {
      _id: 0,
      isin: 1,
      name: 1,
      lastValue: 1,
      fundStart: 1,
      lastUpdate: 1,
      HistoryDetail: 1,
      nameFull: 1,
      category: 1,
      indice: 1,
      rating: 1
    }, function (err, fund) {
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
      console.log("There was a problem finding Fund.");
      if (res) {
        return res.status(500).send({
          status: false,
          data: "There was a problem finding Funds."
        });
      } else {
        return console.log("There was a problem finding Funds.");
      }
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
      return console.log("There was a problem finding Funds.");
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

module.exports = Fund;

function defaultStartUpdateDate() {
  return new Date('1900-01-01');
}