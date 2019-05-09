'use strict'
let request = require("request"),
  iconv = require('iconv-lite'),
  cheerio = require('cheerio'),
  Fund = require('./models/Fund.js'),
  utils = require('./utils.js'),
  pathCfg = utils.getConfigFile();

Fund = new Fund();

let self = module.exports = {
  saveFund: function (req, res) {
    Fund.saveFund(req, res, function (fund) {
      self.updateHistory(fund, null);
    });
  },

  updateHistory: function (fund, callback) {
    let urlCall = pathCfg.urlFundHistory
    urlCall = urlCall.replace('{{FUND}}', fund.isin);
    urlCall = urlCall.replace('{{STARTDATE}}', dateLastUpdate(fund.lastHistoryDate));
    // console.log(urlCall);
    self.requestExternalWebPage(urlCall, function (res, body) {
      let hist = JSON.parse(body);
      let historyRet = [];
      let fundId = fund.idFund;
      if (hist.TimeSeries) {
        if (hist.TimeSeries.Security) {
          if (hist.TimeSeries.Security[0].HistoryDetail) {
            let histFund = hist.TimeSeries.Security[0].HistoryDetail,
              allRecirds = [],
              arrPos = 0,
              lastVall = 0,
              checkDateArr = new Date(histFund[arrPos].EndDate);

            while (checkDateArr.getTime() <= new Date(histFund[histFund.length - 1].EndDate).getTime()) {
              if (histFund[arrPos]) {
                let dtArr = new Date(histFund[arrPos].EndDate);
                if (checkDateArr.setHours(0, 0, 0, 0) === dtArr.setHours(0, 0, 0, 0)) {
                  lastVall = histFund[arrPos].Value;
                  arrPos++;
                }
              }
              allRecirds.push({
                EndDate: checkDateArr.setHours(0, 0, 0, 0),
                Value: lastVall,
                dayOfWeeek: checkDateArr.getDay()
              });
              checkDateArr = new Date(checkDateArr.setDate(checkDateArr.getDate() + 1));
            }
            // historyRet = utils.removeDuplicates(allRecirds, "EndDate");
            historyRet = allRecirds;
          }
          if (hist.TimeSeries.Security[0].Id) {
            fundId = (fundId === "" ? hist.TimeSeries.Security[0].Id : fundId);
          }
        }
      }
      if (historyRet.length > 0) {
        Fund.updateHistory(fund.isin, fundId, historyRet, callback);
      } else {
        Fund.updateDateLastCall(fund.isin, callback);
        console.log("Fund out of date", fund.isin);
      }
      if (fund.idFund === "" && fundId !== "") {
        console.log("Call update info Fund.", fund.isin);
        self.updateFundInfoUk(fund, fundId);
      }
    });
  },
  requestExternalWebPage: function (urlCall, callback) {
    request(urlCall, function (err, res, body) {
      if (err) {
        return console.log("Error", err);
      }
      callback(res, body);
    });
  },
  updateFundInfoUk: function (fund, fundId) {
    let urlInfo = pathCfg.urlFundUk;
    urlInfo = urlInfo.replace('{{FUND}}', fundId) + "&tab=1";
    // console.log(urlInfo);

    let requestOptions = {
      encoding: null,
      method: "GET",
      uri: urlInfo
    };
    self.requestExternalWebPage(requestOptions, function (res, body) {
      let utf8String = iconv.decode(Buffer.from(body), "ISO-8859-1");
      const $ = cheerio.load(utf8String);
      let listInfoFund = [];
      try {
        for (let x = 1; x < 4; x++) {
          listInfoFund.push($("#returnsChartDiv table:nth-child(2) tbody tr td table tbody tr:nth-child(" + x + ") td:nth-child(2) span:nth-child(2)").html().toString('utf-8'));
        }
        let rating = $("#snapshotTitleDiv table:nth-child(1) tbody tr td div span").attr('class'),
          ratingVal = rating.replace("rating_sprite stars", "");
        ratingVal = Number.isNaN(ratingVal) ? 0 : ratingVal;
        listInfoFund.push(ratingVal);
        Fund.updateInfoFund(fund, listInfoFund);
      } catch (e) {
        console.log("Error get fund info, Call Pt" /*, e*/);
        self.updateFundInfoPt(fund, fundId);
      }
    });
  },
  updateFundInfoPt: function (fund, fundId) {
    let urlInfo = pathCfg.urlFund;
    urlInfo = urlInfo.replace('{{FUND}}', fundId) + "&tab=1";
    // console.log(urlInfo);

    let requestOptions = {
      encoding: null,
      method: "GET",
      uri: urlInfo
    };
    self.requestExternalWebPage(requestOptions, function (res, body) {
      let utf8String = iconv.decode(Buffer.from(body), "ISO-8859-1");
      const $ = cheerio.load(utf8String);
      let listInfoFund = [];
      try {
        for (let x = 1; x < 4; x++) {
          listInfoFund.push($("#returnsChartDiv table:nth-child(2) tbody tr td table tbody tr:nth-child(" + x + ") td:nth-child(2) span:nth-child(2)").html().toString('utf-8'));
        }
      } catch (e) {
        console.log("Error get fund info", e);

        listInfoFund = [];
        for (let x = 0; x < 4; x++) {
          listInfoFund.push("");
        }
        listInfoFund.push(0);
      }
      Fund.updateInfoFund(fund, listInfoFund);
    });
  },
  getFunds: function (req, res) {
    Fund.getFunds(req, res);
  },
  getFundByIsin: function (req, res) {
    Fund.getFundByIsin(req, res);
  },
  getFundByIsinBetweenDates: function (req, res) {
    Fund.getFundByIsinBetweenDates(req, res);
  },
  getFundCotacaoByDateAndCalcMoney: function (res, owner, isin, nUps, dateCota, dateEnd, callback) {
    Fund.getFundCotacaoByDateAndCalcMoney(res, owner, isin, nUps, dateCota, dateEnd, callback);
  },
  updatefunds: function (req, res) {
    Fund.getFunds(req, res, function (funds) {
      // console.log("Update - ", funds);
      self.updateIndividualFund(funds, 0);
    });
  },
  updateIndividualFund: function (funds, pos) {
    if (funds[pos]) {
      let dat1 = new Date();
      let dat2 = new Date(funds[pos].lastUpdate);
      if (dat1.setHours(0, 0, 0, 0) !== dat2.setHours(0, 0, 0, 0)) {
        let dat3 = new Date(funds[pos].lastHistoryDate);
        dat3.setDate(dat3.getDate() + 1);
        funds[pos].lastHistoryDate = dat3
        self.updateHistory(funds[pos], function () {
          self.updateIndividualFund(funds, ++pos);
        });
      } else {
        console.log("Not update, fund out of date.");
        self.updateIndividualFund(funds, ++pos);
      }
    } else {
      console.log("Update all Funds in All Wallets.");
      require('./libWallet.js').updateAllWallets();
    }

  },
  getFundCotacaoByDateAndCalcMoneyUpdateWallets: function (isinCode, nUps, dateCota, dateEnd, callback) {
    Fund.getFundCotacaoByDateAndCalcMoneyUpdateWallets(isinCode, nUps, dateCota, dateEnd, callback);
  }
}

function dateLastUpdate(dt) {
  let date = new Date(dt);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return (month + '/' + day + '/' + year)
}