'use strict'
let iconv = require('iconv-lite'),
  cheerio = require('cheerio'),
  cp = require('child_process'),
  Fund = require('./models/Fund.js'),
  countryLib = require('./libCountry.js'),
  utils = require('./utils.js'),
  pathCfg = utils.getConfigFile(),
  procUpdateFund = [],
  updateAllFundsAndWallets = null,
  socketIo = null;

Fund = new Fund();
/**
 * TODO: Biblioteca para a manpulação das acções relacionadas com os fundos
 */
let self = module.exports = {
  setSocketIo: function (skt) {
    socketIo = skt;
  },
  saveFund: function (req, res) {
    Fund.saveFund(req, res, function (fund) {
      let args = {
        mongodb: pathCfg.mongodb,
        fund: fund
      };

      procUpdateFund[fund.isin] = cp.fork('./lib/serverFundUpdateHistory.js');
      procUpdateFund[fund.isin].send({ "serverdata": args });

      procUpdateFund[fund.isin].on('message', function (data) {
        if (data.proc === 'savecomplete') {
          if (socketIo) {
            socketIo.sendMsgToPage('updateProgressBar', data);
          }
          procUpdateFund[fund.isin].kill('SIGINT');
        } else if (data.proc === 'updateProgressBar') {
          if (socketIo) {
            socketIo.sendMsgToPage(data.proc, data);
          }
        }
      });
    });
  },
  updateAllElemetsDataBase: function (req, res) {
    var args = {
      port: pathCfg.serverHttp.port,
      mongodb: pathCfg.mongodb,
      env_dev: utils.isDevMode(),
    };
    // inicia p script e envia as configuracores
    updateAllFundsAndWallets = cp.fork('./lib/serverUpdate.js');
    updateAllFundsAndWallets.send({ "serverdata": args });

    updateAllFundsAndWallets.on('message', function (data) {
      if (data.proc === 'endUpdate') {
        if (socketIo) {
          socketIo.sendMsgToPage('updateFundsAndWallets', data);
        }
        updateAllFundsAndWallets.kill('SIGINT');
      } else if (data.proc === 'updateFundsAndWallets') {
        if (socketIo) {
          socketIo.sendMsgToPage(data.proc, data);
        }
      }
    });

    res.status(200).send({
      status: true,
      data: "This update running in backgound."
    });
  },
  updateHistory: function (fund, firstReg, res, callback) {
    self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 1 / 5", 0, false);
    let urlCall = pathCfg.urlFundHistory;
    urlCall = urlCall.replace('{{FUND}}', fund.isin);
    urlCall = urlCall.replace('{{STARTDATE}}', utils.dateLastUpdate(fund.lastHistoryDate));
    console.log(urlCall);
    utils.requestExternalWebPage(urlCall, function (err, reshtml, body) {
      if (err) {
        console.log("Error updateHistory.", fund.isin, err);
        if (callback) {
          callback();
        }
      } else {
        self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 1 / 5", 100, false);
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

              self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 2 / 5", 0, false);
              while (checkDateArr.getTime() <= new Date(histFund[histFund.length - 1].EndDate).getTime()) {
                if (histFund[arrPos]) {
                  let dtArr = new Date(histFund[arrPos].EndDate);
                  if (checkDateArr.setHours(0, 0, 0, 0) === dtArr.setHours(0, 0, 0, 0)) {
                    lastVall = histFund[arrPos].Value;
                    arrPos++;
                    self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 1 / 5", (arrPos * 100 / histFund.length).toFixed(0) * 1, false);
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
          self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 2 / 5", 100, false);
          console.log("------------------------------- Update By JSON -------------------------------");
          Fund.updateHistory(fund, fundId, historyRet, res, callback);

        } else if (noDataUpdateInfo) {
          self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 2 / 5", 0, false);
          console.log("No History. Call other Html page history.", fund.isin);
          self.getIsinIdAndHistoryFromPage(fund, firstReg, res, callback);

        } else {
          self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 2 / 5", 100, false);
          Fund.updateDateLastCall(fund.isin, false, res, callback);
          console.log("Fund out of date", fund.isin);
        }
      }
    });
  },
  getIsinIdAndHistoryFromPage: function (fund, firstReg, res, callback) {
    let urlCallObj = pathCfg.urlMarkets,
      urlCall = urlCallObj.base + urlCallObj.historical;
    urlCall = urlCall.replace('{{FUND}}', fund.isin);
    console.log("Update fund History. Get Symbol.", urlCall);
    utils.requestExternalWebPage(urlCall, function (err, resHtml, body) {
      if (err) {
        console.log("Error getIsinIdAndHistoryFromPage part 1.", fund.isin, err);
        if (callback) {
          callback();
        }
      } else {
        self.getIsinIdAndHistoryFromPagePart2(body, fund, firstReg, res, callback);
      }
    });
  },
  getIsinIdAndHistoryFromPagePart2: function (body, fund, firstReg, res, callback) {
    let urlCallObj = pathCfg.urlMarkets,
      utf8String = iconv.decode(Buffer.from(body), "ISO-8859-1"),
      $ = cheerio.load(utf8String),
      marketId = $(".mod-tearsheet-add-to-watchlist").data('mod-config'),
      urlFundHistCall = urlCallObj.fundHistory,
      startDate = fund.lastHistoryDate,
      endDate = new Date();
    self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 2 / 5", 50, false);
    urlFundHistCall = urlFundHistCall.replace('{{STARTDATE}}', utils.dateLastUpdateV2(startDate));
    urlFundHistCall = urlFundHistCall.replace('{{ENDDATE}}', utils.dateLastUpdateV2(endDate));
    if (marketId) {
      urlFundHistCall = urlFundHistCall + marketId.symbol;
    } else {
      try {
        marketId = $(".mod-tearsheet-historical-prices").data('mod-config');
        urlFundHistCall = urlFundHistCall + marketId.symbol;
      } catch (e) {
        console.log("Catch error-> . call next step");
        if (callback) {
          return callback();
        }
      }
    }
    console.log("Call history", urlFundHistCall);

    utils.requestExternalWebPage(urlFundHistCall, function (err, resHtml, body) {
      if (err) {
        console.log("Error getIsinIdAndHistoryFromPage part 2.", err);
        if (callback) {
          callback();
        }
      } else {
        // console.log(JSON.parse(body));
        try {
          let newHtml = JSON.parse(body).html,
            $ = cheerio.load("<table>" + newHtml + "</table>"),
            pos = 1,
            trSize = $('table').find('tr').length + 1,
            allRecords = [],
            error = false,
            lastval = -1,
            actval = 0;
          console.log("Num elements ->", $('table').find('tr').length);
          self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 2 / 5", 100, false);

          while (!error) {
            let dtA = $("table tr:nth-child(" + (trSize - pos) + ") td:nth-child(1) span:nth-child(1)").html(),
              val = $("table tr:nth-child(" + (trSize - pos) + ") td:nth-child(5)").html(),
              dateVal = new Date(dtA);
            actval = (pos * 100 / trSize).toFixed(0) * 1;
            if (lastval !== actval) {
              lastval = actval;
              self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 3 / 5", actval, false);
            }
            // console.log("Html val- ", (trSize - pos), val, dtA);

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
          }
          self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 4 / 5", 0, false);
          lastval = 0;
          let limit = 0,
            lastObj = allRecords[0],
            checkDateArr = lastObj.EndDate,
            historyRet = [];
          while (limit < allRecords.length && allRecords[limit]) {
            if (firstReg) {
              historyRet.push({
                EndDate: checkDateArr.setHours(0, 0, 0, 0),
                Value: lastObj.Value,
                dayOfWeeek: checkDateArr.getDay()
              });
            }
            // console.log("++++", limit, lastObj.Value, new Date(checkDateArr), lastObj.EndDate);
            let dtArr = new Date(lastObj.EndDate);
            if (checkDateArr.setHours(0, 0, 0, 0) === dtArr.setHours(0, 0, 0, 0)) {
              lastObj = allRecords[++limit];
              actval = (limit * 100 / allRecords.length).toFixed(0) * 1;
              if (lastval !== actval) {
                lastval = actval;
                self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 4 / 5", actval, false);
              }
            }

            firstReg = true;
            checkDateArr = new Date(checkDateArr.setDate(checkDateArr.getDate() + 1));
          }
          console.log("Update fund History. Then Save", fund.isin);
          if (historyRet.length > 0) {
            Fund.updateHistory(fund, fund.idFundMorningstar, historyRet, res, callback);

          } else {
            self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 4 / 5", 100, false);
            Fund.updateDateLastCall(fund.isin, false, res, callback);
            console.log("Fund out of date", fund.isin);
          }
        } catch (e) {
          self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 4 / 5", 100, false);
          console.log("Error get history from Html Page.", fund.isin, e);
          Fund.updateDateLastCall(fund.isin, true, res, callback);
        }
      }
    })
  },
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
      self.sendMsgToParentProc("updateFundsAndWallets", true, "", "Step 1 / 2", (pos * 100 / funds.length).toFixed(0) * 1, false);
      self.updateHistory(funds[pos], false, res, function (updateStartDate) {
        self.UpdateInfoIndividualFund(funds[pos], updateStartDate, res, function () {
          self.updateIndividualFund(funds, ++pos, res, callback);
        })
      });
    } else {
      self.sendMsgToParentProc("updateFundsAndWallets", true, "", "Step 1 / 2", 100, false);
      console.log("Update all Funds in All Wallets.");
      require('./libWallet.js').updateAllWallets(callback);
    }

  },
  UpdateInfoIndividualFund: function (fund, updateStartDate, res, callback) {
    self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 5 / 5", 0, false);
    let callMarketObj = pathCfg.urlMarkets,
      dataSaveInfo = {
        nameFull: "",
        rating: 0,
        // fundType: "",
        // investmentStyle: "",
        category: "",
        // launchDate: "",
        currency: "",
        domicile: "",
        // symbol: "",
        availableSale: []
      },
      linkRating = callMarketObj.base + callMarketObj.rating;
    linkRating = linkRating.replace('{{FUND}}', fund.isin);
    utils.requestExternalWebPage(linkRating, function (err, resHtml, body) {
      if (err) {
        console.log("Error UpdateInfoIndividualFund part 1.", fund.isin, err);
        if (callback) {
          callback();
        }
      } else {
        self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 5 / 5", 30, false);
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

        self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 5 / 5", 50, false);
        dataSaveInfo.nameFull = fundFullName;
        dataSaveInfo.rating = rate;

        linkSummary = linkSummary.replace('{{FUND}}', fund.isin)
        utils.requestExternalWebPage(linkSummary, function (err, resHtml, body) {
          if (err) {
            console.log("Error UpdateInfoIndividualFund part 2.", fund.isin, err);
            if (callback) {
              callback();
            }
          } else {
            let utf8String = iconv.decode(Buffer.from(body), "ISO-8859-1"),
              $ = cheerio.load(utf8String),
              thData = null,
              tdData = null,
              thData2 = null,
              tdData2 = null,
              x = 1;

            self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 5 / 5", 70, false);
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
                    dataSaveInfo.category = tdData;
                    break;
                  /*  case "Launch date":
                     if (updateStartDate) {
                       dataSaveInfo.fundStart = tdData;
                       dataSaveInfo.lastHistoryDate = tdData;
                     }
                     break; */
                  case "Price currency":
                    dataSaveInfo.currency = tdData;
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

            self.sendMsgToParentProc("updateProgressBar", true, fund, "Step 5 / 5", 70, false);
            // console.log("fund Info", dataSaveInfo);
            Fund.updateInfoFund(fund, dataSaveInfo, res, callback);
          }
        });
      }
    });
  },
  getFundCotacaoByDateAndCalcMoneyUpdateWallets: function (isinCode, nUps, dateCota, dateEnd, callback) {
    Fund.getFundCotacaoByDateAndCalcMoneyUpdateWallets(isinCode, nUps, dateCota, dateEnd, callback);
  },
  sendMsgToParentProc: function (proc, status, fund, msg, val, close) {
    process.send({
      proc: proc,
      status: status,
      fund: fund,
      msg: msg,
      val: val
    });
    if (close) {
      process.exit(0);
    }
  },
  deleteFund: function (req, res) {
    let isin = req.params.isin;
    require('./libWallet.js').findExistsFundInWallet(isin, res, function () {
      Fund.deleteFund(isin, res);
    });
  },
  backupFunds: function (callback) {
    Fund.BackupFunds(function () {
      callback();
    });
  }
}