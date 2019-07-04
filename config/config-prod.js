'use strict'

module.exports = {
  urlFundHistory: 'https://lt.morningstar.com/api/rest.svc/timeseries_price/okhysb8aoh?id={{FUND}}&currencyId=BAS&idtype=isin&frequency=daily&startDate={{STARTDATE}}&outputType=json',
  isinList: "https://www.isin.net/isin-directory/",
  urlMarkets: {
    base: "https://markets.ft.com/data/funds/tearsheet/",
    historical: "historical?s={{FUND}}",
    summary: "summary?s={{FUND}}",
    rating: "ratings?s={{FUND}}",
    fundHistory: "https://markets.ft.com/data/equities/ajax/get-historical-prices?startDate={{STARTDATE}}&endDate={{ENDDATE}}&symbol="
  },
  countryListApi: 'https://restcountries.eu/rest/v2/all',
  weatherurl: "http://www.rtp.pt/noticias/o-tempo",
  serverHttp: {
    port: 9090
  },
  fileBackup: {
    funds: "./backup/funds##date##.json",
    fundsSeed: "./ScriptsRun/funds.json",
    portfolios: "./backup/portfolios##date##.json",
    portfoliosSeed: "./ScriptsRun/portfolios.json",
    users: "./backup/users##date##.json",
    usersSeed: "./ScriptsRun/users.json",
    textContent: "[]"
  },
  mongodb: 'mongodb://localhost:27017/FundsProd'
}
