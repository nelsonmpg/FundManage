'use strict'
let Country = require('./models/Country.js');

Country = new Country();

let self = module.exports = {
    insertListCodeCountry: function (listCountrys) {
        Country.insertAllCountries(listCountrys);
    },
    getCodesByCountries: function (fund, res) {
        Country.getCodesByCountries(fund, res);
    }
}