'use strict'
let mongoose = require('mongoose'),
    CountrySchema = new mongoose.Schema({
        name: { type: String, unique: true },
        topLevelDomain: [{ type: String }],
        alpha2Code: { type: String, unique: true },
        alpha3Code: { type: String, unique: true },
        callingCodes: [{ type: String }],
        capital: { type: String },
        altSpellings: [{ type: String }],
        region: { type: String },
        subregion: { type: String },
        population: { type: Number },
        latlng: [{ type: Number }],
        demonym: { type: String },
        area: { type: String },
        gini: { type: String },
        timezones: [{ type: String }],
        borders: [{ type: String }],
        nativeName: { type: String },
        numericCode: { type: String },
        currencies: [],
        languages: [],
        translations: {},
        flag: { type: String },
        regionalBlocs: [],
        cioc: { type: String }
    });


var Country = function () {
    this.countrydb = mongoose.model('Country', CountrySchema);
};

Country.prototype.insertAllCountries = function (countryList) {
    let self = this;

    this.containsCountryList(function () {
        self.countrydb.insertMany(countryList, function (err, user) {
            if (err) {
                return console.log("There was a problem save country list.", err);
            }
            console.log("Country list saved.");
        })
    })
}

Country.prototype.containsCountryList = function (callback) {
    this.countrydb.find({}, function (err, lstCountry) {
        if (err) {
            return console.log("There was a problem finding the Country list.");
        }
        if (lstCountry.length === 0) {
            return callback();
        }
        console.log("Db contains list code countries.");
    });
}

Country.prototype.getCodesByCountries = function (fund, res) {
    let self = this;
    this.countrydb.find({ name: { $in: fund.availableSale } }, { _id: 0, alpha2Code: 1, name: 1 }, function (err, lstCountry) {
        if (err) {
            return res.status(500).send({
                status: false,
                data: "There was a problem finding the Country list."
            });
        }
        self.findInfoDomicile(fund, lstCountry, res);
    });
}

Country.prototype.findInfoDomicile = function (fund, lstCountry, res) {
    this.countrydb.find({ name: fund.domicile }, { _id: 0, alpha2Code: 1, name: 1, flag: 1, currencies: 1 }, function (err, countryinfo) {
        if (err) {
            return res.status(500).send({
                status: false,
                data: "There was a problem finding the Country list."
            });
        }
        res.status(200).send({
            status: true,
            data: fund,
            list: lstCountry,
            country: countryinfo[0]
        });
    });
}

module.exports = Country;