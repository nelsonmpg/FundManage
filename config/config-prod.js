'use strict'

module.exports = {
  urlFundHistory: 'https://lt.morningstar.com/api/rest.svc/timeseries_price/okhysb8aoh?id={{FUND}}&currencyId=BAS&idtype=isin&frequency=daily&startDate={{STARTDATE}}&outputType=json',
  urlFund: 'http://www.morningstar.pt/pt/funds/snapshot/snapshot.aspx?id={{FUND}}',
  urlFundUk: 'http://www.morningstar.co.uk/uk/funds/snapshot/snapshot.aspx?id={{FUND}}',
  urlFundEs: 'http://www.morningstar.es/es/funds/snapshot/snapshot.aspx?id={{FUND}}',
  isinList: "https://www.isin.net/isin-directory/",
  urlMarkets: {
    base: "https://markets.ft.com/data/funds/tearsheet/",
    historical: "historical?s={{FUND}}",
    summary: "summary?s={{FUND}}",
    rating: "ratings?s={{FUND}}",
    fundHistory: "https://markets.ft.com/data/equities/ajax/get-historical-prices?startDate={{STARTDATE}}&endDate={{ENDDATE}}&symbol="
  },
  countryListApi: 'https://restcountries.eu/rest/v2/all',
  serverHttp: {
    port: 9090
  },
  mongodb: 'mongodb://localhost:27017/FundsProd'
}
