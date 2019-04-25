'use strict'
let mode = process.env.NODE_ENV || "DEV",
  configFile = require('./../config/config-' + mode.toLowerCase() + '.js');

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