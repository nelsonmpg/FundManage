'use strict'
let Country = require('./../models/Country.js');

Country = new Country();

let self = module.exports = {
    insertListCodeCountry: function (listCountrys) {
        Country.insertAllCountries(listCountrys);
    },
    findExistsCountries: function (callback) {
        Country.containsCountryList(function () {
            callback();
        });
    },
    getCodesByCountries: function (fund, res) {
        Country.getCodesByCountries(fund, res);
    }
}