'use strict'
let mode = process.env.NODE_ENV || "DEV",
  fs = require('fs'),
  request = require("request"),
  axios = require('axios'),
  configFile = require('./../config/config-' + mode.toLowerCase() + '.js'),
  fileBackup = {
    funds: "./ScriptsRun/funds.json",
    portfolios: "./ScriptsRun/portfolios.json",
    textContent: "[]"
  };

var self = module.exports = {
  isDevMode: function () {
    return (self.getMode() === 'dev' ? true : false)
  },

  getMode: function () {
    return mode.toLowerCase();
  },

  getConfigFile: function () {
    return configFile;
  },
  getFileBackup: function () {
    return fileBackup;
  },
  checkFile: function (filename) {
    try {
      if (fs.existsSync(filename)) {
        let filecontent = fs.readFileSync(filename);
        return filecontent.toString()
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  },
  createFileSaveContent: function (filename, textContent) {
    fs.writeFile(filename, textContent, function (err) {
      if (err) {
        console.log("File created error", err);
        return null;
      }
      console.log('File "' + filename + '" is created successfully.');
      return self.checkFile(filename);
    });
  },
  /** Remove duplicaods e ordena o array de Numeros */
  sortUnique: function (arr) {
    if (arr.length === 0) return arr;
    arr = arr.sort(function (a, b) { return a * 1 - b * 1; });
    var ret = [arr[0]];
    for (var i = 1; i < arr.length; i++) { //Start loop at 1: arr[0] can never be a duplicate
      if (arr[i - 1] !== arr[i]) {
        ret.push(arr[i]);
      }
    }
    return ret;
  },
  requestExternalWebPage: function (urlCall, callback) {
    request(urlCall, function (err, res, body) {
      callback(err, res, body);
    });
  },
  requestExternalPageAxios: function (urlCall, callback) {
    axios.get(urlCall)
      .then(res => {
        callback(null, res);
      })
      .catch(error => {
        callback(error, null);
      });
  },
  dateTransform: function (dt) {
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
    return {
      day: day,
      month: month,
      year: year
    }
  },
  dateLastUpdate: function (dt) {
    let dtRet = self.dateTransform(dt);
    return (dtRet.month + '/' + dtRet.day + '/' + dtRet.year)
  },
  dateLastUpdateV2: function (dt) {
    let dtRet = self.dateTransform(dt);
    return (dtRet.year + '/' + dtRet.month + '/' + dtRet.day)
  },
  /**Remove duplicados do array */
  removeDuplicates: function (originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  },
  /** Chech Date is WeekEnd */
  dateIsWeekend: function (dateTime) {
    let dateT = new Date(dateTime),
      day = dateT.getDay(),
      isWeekend = (day === 6) || (day === 0);    // 6 = Saturday, 0 = Sunday

    return isWeekend;
  },

  /** Return next work Day (Number) of NormalWeek */
  nextWorkDay: function (date) {
    let day = new Date(date).getDay();
    day++;
    if (self.dateIsWeekend(date)) {
      day = 1
    }
    return day;
  }
}