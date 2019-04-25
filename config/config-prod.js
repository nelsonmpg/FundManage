

'use strict'

module.exports = {
  urlFundHistory: 'https://lt.morningstar.com/api/rest.svc/timeseries_price/okhysb8aoh?id={{FUND}}&currencyId=BAS&idtype=isin&frequency=daily&startDate={{STARTDATE}}&outputType=json',
  urlFund: 'http://www.morningstar.pt/pt/funds/snapshot/snapshot.aspx?id={{FUND}}',
  urlFundUk: 'http://www.morningstar.co.uk/uk/funds/snapshot/snapshot.aspx?id={{FUND}}',
  serverHttp: {
    port: 9090
  },
  mongodb: 'mongodb://localhost:27017/FundsProd'
}
