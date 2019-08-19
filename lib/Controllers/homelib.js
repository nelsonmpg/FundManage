'use strict'
let iconv = require('iconv-lite'),
    cheerio = require('cheerio'),
    utils = require('./../utils.js'),
    fundsLib = require('./libFunds.js'),
    pathCfg = utils.getConfigFile(),
    self = module.exports = {
        updateAllElemets: function (req, res) {
            fundsLib.updateAllElemetsDataBase(req, res)
        },
        getWeatherList: function (req, res) {
            let urlWeather = pathCfg.weatherurl;
            utils.requestExternalWebPage(urlWeather, function (err, reshtml, body) {
                if (err) {
                    return console.log("Error get Weather.", err);
                }
                let utf8String = iconv.decode(Buffer.from(body), "UTF-8"),
                    $ = cheerio.load(utf8String),
                    articles = $("section article"),
                    articlesList = [];
                for (let i = 0; i < articles.length; i++) {
                    let elem = $($.html(articles[i]));
                    articlesList.push({
                        classIcon: elem.find("i:nth-child(1)").attr('class'),
                        local: elem.find("h3 b").html(),
                        state: elem.find("p small").html(),
                        maxval: elem.find("p.dincond-medium span.text-danger").html(),
                        minval: elem.find("p.dincond-medium span.text-info").html()
                    });
                }
                res.status(200).send({
                    status: true,
                    data: articlesList
                });
            });
        }
    }