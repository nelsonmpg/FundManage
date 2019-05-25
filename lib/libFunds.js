'use strict'
let iconv = require('iconv-lite'),
  cheerio = require('cheerio'),
  Fund = require('./models/Fund.js'),
  countryLib = require('./libCountry.js'),
  utils = require('./utils.js'),
  pathCfg = utils.getConfigFile(),
  urlInfoList = [{
    lang: "Uk",
    url: pathCfg.urlFundUk
  }, {
    lang: "Pt",
    url: pathCfg.urlFund
  }, {
    lang: "Es",
    url: pathCfg.urlFundEs
  } /* */];

Fund = new Fund();

let self = module.exports = {
  saveFund: function (req, res) {
    Fund.saveFund(req, res, function (fund) {
      self.updateHistory(fund, true, res, function () {
        self.UpdateInfoIndividualFund(fund, res, null);
      });
    });
  },

  updateHistory: function (fund, firstReg, res, callback) {
    let urlCall = pathCfg.urlFundHistory;
    urlCall = urlCall.replace('{{FUND}}', fund.isin);
    urlCall = urlCall.replace('{{STARTDATE}}', utils.dateLastUpdate(fund.lastHistoryDate));
    // console.log(urlCall);
    utils.requestExternalWebPage(urlCall, function (err, res, body) {
      if (err) {
        return console.log("error", err);
      }
      let hist = JSON.parse(body),
        historyRet = [],
        fundId = fund.idFundMorningstar,
        noDataUpdateInfo = false;
      if (hist.TimeSeries) {
        if (hist.TimeSeries.Security) {
          if (hist.TimeSeries.Security[0].HistoryDetail) {
            let histFund = hist.TimeSeries.Security[0].HistoryDetail,
              allRecords = [],
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
              if (firstReg) {
                allRecords.push({
                  EndDate: checkDateArr.setHours(0, 0, 0, 0),
                  Value: lastVall,
                  dayOfWeeek: checkDateArr.getDay()
                });
              }
              firstReg = true;
              checkDateArr = new Date(checkDateArr.setDate(checkDateArr.getDate() + 1));
            }
            // historyRet = utils.removeDuplicates(allRecords, "EndDate");
            historyRet = allRecords;
          }
          if (hist.TimeSeries.Security[0].Id) {
            fundId = (fundId === "" ? hist.TimeSeries.Security[0].Id : fundId);
          }
        } else {
          noDataUpdateInfo = true;
        }
      }
      if (historyRet.length > 0) {
        Fund.updateHistory(fund, fundId, historyRet, res, callback);

      } else if (noDataUpdateInfo) {
        console.log("No History. Call other Html page history.", fund.isin);
        self.getIsinIdFromPage(fund, firstReg, res, callback);

      } else {
        Fund.updateDateLastCall(fund.isin, res, callback);
        console.log("Fund out of date", fund.isin);
      }
    });
  },
  getIsinIdFromPage: function (fund, firstReg, res, callback) {
    let urlCallObj = pathCfg.urlMarkets,
      urlCall = urlCallObj.base + urlCallObj.historical;
    urlCall = urlCall.replace('{{FUND}}', fund.isin);
    if (res) {
      console.log("Update fund History. Get Symbol.", urlCall);
    }
    utils.requestExternalWebPage(urlCall, function (err, resHtml, body) {
      if (err) {
        return console.log("error", err);
      }
      let utf8String = iconv.decode(Buffer.from(body), "ISO-8859-1"),
        $ = cheerio.load(utf8String),
        marketId = $(".mod-tearsheet-historical-prices").data('mod-config'),
        urlFundHistCall = urlCallObj.fundHistory,
        startDate = fund.lastHistoryDate,
        endDate = new Date();
      urlFundHistCall = urlFundHistCall.replace('{{STARTDATE}}', utils.dateLastUpdateV2(startDate));
      urlFundHistCall = urlFundHistCall.replace('{{ENDDATE}}', utils.dateLastUpdateV2(endDate));
      urlFundHistCall = urlFundHistCall + marketId.symbol;
      if (res) {
        console.log("Update fund History. Get History.", urlFundHistCall);
      }
      utils.requestExternalWebPage(urlFundHistCall, function (err, resHtml, body) {
        if (err) {
          return console.log("error", err);
        }
        try {
          let newHtml = JSON.parse(body.replace(/\\u003c/g, "<").replace(/\\u003e/g, ">").replace(/\\"/g, "'")).html,
            $ = cheerio.load("<table>" + newHtml + "</table>"),
            pos = 1,
            allRecords = [],
            error = false;

          while (!error) {
            try {
              let dtA = $("table tr:nth-child(" + pos + ") td:nth-child(1) span:nth-child(1)").html(),
                val = $("table tr:nth-child(" + pos + ") td:nth-child(5)").html(),
                dateVal = new Date(dtA);
              if (val === null || val === "null") {
                error = true;
              } else {
                allRecords.push({
                  EndDate: dateVal,
                  Value: val,
                  dayOfWeeek: dateVal.getDay()
                });
              }
              pos++;
            } catch (e) {
              error = true;
            }
          }
          let limit = allRecords.length,
            lastObj = allRecords.pop(),
            checkDateArr = lastObj.EndDate,
            historyRet = [];

          while (limit > 0) {
            if (firstReg) {
              historyRet.push({
                EndDate: checkDateArr.setHours(0, 0, 0, 0),
                Value: lastObj.Value,
                dayOfWeeek: checkDateArr.getDay()
              });
            }
            // console.log("++++", lastObj.Value, new Date(checkDateArr), checkDateArr.getDay());
            let dtArr = new Date(lastObj.EndDate);
            if (checkDateArr.setHours(0, 0, 0, 0) === dtArr.setHours(0, 0, 0, 0)) {
              lastObj = allRecords.pop();
            }
            firstReg = true;
            checkDateArr = new Date(checkDateArr.setDate(checkDateArr.getDate() + 1));
            limit--;
          }
          if (res) {
            console.log("Update fund History. Then Save", fund.isin);
          }
          if (historyRet.length > 0) {
            Fund.updateHistory(fund, fund.idFundMorningstar, historyRet, res, callback);

          } else {
            Fund.updateDateLastCall(fund.isin, res, callback);
            console.log("Fund out of date", fund.isin);
          }
        } catch (e) {
          Fund.updateDateLastCall(fund.isin, res, callback);
          console.log("Error get history from Html Page.", fund.isin);
        }
      })
    });
  },

  getListIsinCodes: function () {
    let limit = 100, // 1000000,
      urlListIsin = pathCfg.isinList + "?show=" + limit,
      isinList = [];
    utils.requestExternalPageAxios(urlListIsin, function (err, res) {
      if (err) {
        return console.log("Error Call Axios", err);
      }
      let utf8String = iconv.decode(Buffer.from(res.data), "ISO-8859-1");
      const $ = cheerio.load(utf8String);

      for (let d = 0; d < limit; d++) {
        try {
          let olgIsin = ($("table.data_table2 tbody tr:nth-child(" + (d + 1) + ") td:nth-child(2)").html()).trim(),
            objName = ($("table.data_table2 tbody tr:nth-child(" + (d + 1) + ") td:nth-child(1) a").html()).trim();
          if (olgIsin !== "") {
            isinList.push({
              isin: olgIsin,
              name: objName,
              idFundMorningstarM: ""
            });
          }
        } catch (e) {
          console.log("Try Catch error");
        }
      }
      console.log("All List", isinList);
      for (let index = 0; index < isinList.length; index++) {
        let req = {
          body: isinList[index]
        };
        self.saveFund(req);
      }
    });
  },
  // updateFundInfo: function (fund, fundId, urlPos) {
  //   let listInfoFund = [];
  //   if (urlInfoList[urlPos]) {
  //     let urlInfo = urlInfoList[urlPos].url;
  //     urlInfo = urlInfo.replace('{{FUND}}', fundId) + "&tab=1";
  //     console.log("Call External Info Page", urlInfoList[urlPos].lang);
  //     utils.requestExternalWebPage(urlInfo, function (err, res, body) {
  //       if (err) {
  //         return self.updateFundInfo(fund, fundId, ++urlPos);
  //       }
  //       let utf8String = iconv.decode(Buffer.from(body), "ISO-8859-1");
  //       const $ = cheerio.load(utf8String);
  //       try {
  //         for (let x = 1; x < 4; x++) {
  //           listInfoFund.push($("#returnsChartDiv table:nth-child(2) tbody tr td table tbody tr:nth-child(" + x + ") td:nth-child(2) span:nth-child(2)").html().toString('utf-8'));
  //         }
  //         let rating = $("#snapshotTitleDiv table:nth-child(1) tbody tr td div span").attr('class'),
  //           ratingVal = rating.replace("rating_sprite stars", "");
  //         ratingVal = Number.isNaN(ratingVal) ? 0 : ratingVal;
  //         listInfoFund.push(ratingVal);
  //         Fund.updateInfoFund(fund, fundId, listInfoFund);
  //       } catch (e) {
  //         console.log("Error get fund info, Call Other Url." /*, fundId, urlPos /*, e*/);
  //         self.updateFundInfo(fund, fundId, ++urlPos);
  //       }
  //     });
  //   } else {
  //     console.log("End call all Info Urls");
  //     listInfoFund = [];
  //     for (let x = 0; x < 5; x++) {
  //       listInfoFund.push("");
  //     }
  //     listInfoFund.push(0);
  //     Fund.updateInfoFund(fund, fundId, listInfoFund);
  //   }
  // },
  getFunds: function (req, res) {
    Fund.getFunds(req, res);
  },
  getFundByIsin: function (req, res) {
    Fund.getFundByIsin(req, res, function (fund) {
      countryLib.getCodesByCountries(fund, res);
    });
  },
  getFundByIsinBetweenDates: function (req, res) {
    Fund.getFundByIsinBetweenDates(req, res);
  },
  getFundCotacaoByDateAndCalcMoney: function (res, owner, isin, nUps, dateCota, dateEnd, callback) {
    Fund.getFundCotacaoByDateAndCalcMoney(res, owner, isin, nUps, dateCota, dateEnd, callback);
  },
  updatefunds: function (req, res, callback) {
    Fund.getFunds(req, res, function (funds) {
      self.updateIndividualFund(funds, 0, res, callback);
    });
  },
  updateIndividualFund: function (funds, pos, res, callback) {
    if (funds[pos]) {
      self.updateHistory(funds[pos], false, res, function () {
        self.UpdateInfoIndividualFund(funds[pos], res, function () {
          self.updateIndividualFund(funds, ++pos, res, callback);
        })
      });
    } else {
      console.log("Update all Funds in All Wallets.");
      require('./libWallet.js').updateAllWallets(callback);
    }

  },
  UpdateInfoIndividualFund: function (fund, res, callback) {
    let callMarketObj = pathCfg.urlMarkets,
      dataSaveInfo = {
        fundFullName: "",
        marketRate: 0,
        // fundType: "",
        // investmentStyle: "",
        morningstarCategory: "",
        // launchDate: "",
        priceCurrency: "",
        domicile: "",
        // symbol: "",
        availableSale: []
      },
      linkRating = callMarketObj.base + callMarketObj.rating;
    linkRating = linkRating.replace('{{FUND}}', fund.isin);
    utils.requestExternalWebPage(linkRating, function (err, resHtml, body) {
      if (err) {
        return console.log("error", err);
      }
      let utf8String = iconv.decode(Buffer.from(body), "ISO-8859-1"),
        $ = cheerio.load(utf8String),
        fundFullName = $(".mod-tearsheet-overview__header h1.mod-tearsheet-overview__header__name").html(),
        x = 1,
        rate = 0,
        marketRat,
        linkSummary = callMarketObj.base + callMarketObj.summary;

      do {
        marketRat = $(".mod-morningstar-rating-app__stars span[data-mod-stars-highlighted='true'] i:nth-child(" + x + ")").attr('class')
        if (marketRat) {
          rate++;
        }
        x++;
      } while (marketRat)
      dataSaveInfo.fundFullName = fundFullName;
      dataSaveInfo.marketRate = rate;

      linkSummary = linkSummary.replace('{{FUND}}', fund.isin)
      utils.requestExternalWebPage(linkSummary, function (err, resHtml, body) {
        if (err) {
          return console.log("error", err);
        }
        let utf8String = iconv.decode(Buffer.from(body), "ISO-8859-1"),
          $ = cheerio.load(utf8String),
          thData = null,
          tdData = null,
          thData2 = null,
          tdData2 = null,
          x = 1;

        do {
          let trData = $("table.mod-profile-and-investment-app__table--profile tr:nth-child(" + x + ")");
          let trData2 = $("table.mod-profile-and-investment-app__table--invest tr:nth-child(" + x + ")");
          thData = trData.find('th').html();
          tdData = trData.find('td').html();
          thData2 = trData2.find('th').html();
          tdData2 = trData2.find('td').html();
          if (thData && tdData) {
            switch (thData.trim()) {
              /*  case "Fund type":
                 dataSaveInfo.fundType = tdData;
                 break; */
              /* case "Investment style (stocks)":
                dataSaveInfo.investmentStyle = tdData.replace(/<br>/g, " ");
                break; */
              case "Morningstar category":
                dataSaveInfo.morningstarCategory = tdData;
                break;
              /* case "Launch date":
                dataSaveInfo.launchDate = tdData;
                break; */
              case "Price currency":
                dataSaveInfo.priceCurrency = tdData;
                break;
              case "Domicile":
                dataSaveInfo.domicile = tdData;
                break;
              /* case "Symbol":
                dataSaveInfo.symbol = tdData;
                break; */
              default:
                break;
            }
          }
          if (thData2 && tdData2) {
            switch (thData2.trim()) {
              case "Available for sale":
                dataSaveInfo.availableSale = tdData2.split(",").map(function (item) {
                  return item.trim();
                });
                break;
              default:
                break;
            }
          }
          x++;
        } while (thData || thData2)
        // console.log("fund Info", dataSaveInfo);
        Fund.updateInfoFund(fund, dataSaveInfo, res, callback);
      });
    });
  },
  getFundCotacaoByDateAndCalcMoneyUpdateWallets: function (isinCode, nUps, dateCota, dateEnd, callback) {
    Fund.getFundCotacaoByDateAndCalcMoneyUpdateWallets(isinCode, nUps, dateCota, dateEnd, callback);
  }
}