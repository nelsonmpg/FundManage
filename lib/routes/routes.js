'use strict'
let express = require('express'),
  passport = require('passport'),
  middleware = require('./../middleware/middleware.js'),
  fundsLib = require('./../libFunds.js'),
  usersLib = require('./../libUers.js'),
  walletLib = require('./../libWallet.js'),
  router = express.Router();

// Routes Users
router.post("/api/login", (req, res, next) => {

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(200).send(info);
    }
    req.login(user, (err) => {
      // req.session.user = user;
      res.send(info)
    })
  })(req, res, next)
});

router.post("/api/register", usersLib.registerUser);
router.post("/api/logout", function (req, res) {
  req.session.user = '';
  req.logout();
  console.log("Logged Out")
  return res.send({
    status: true,
    data: "Logout User."
  });
});

// All elements
router.get('/api/updateallelements', middleware.isLoginCheck, (req, res) => { fundsLib.updateAllElemetsDataBase(req, res); });

// Funds
router.post('/api/funds/fund', middleware.isLoginCheck, (req, res) => { fundsLib.saveFund(req, res); });
router.get('/api/funds', middleware.isLoginCheck, (req, res) => { fundsLib.getFunds(req, res); });
// router.get('/api/updatefunds', middleware.isLoginCheck, (req, res) => { fundsLib.updatefunds(req, res); });
router.get('/api/fund/:isin/:limit', middleware.isLoginCheck, (req, res) => { fundsLib.getFundByIsin(req, res); });
router.get('/api/fund/:isin/:numups/:startdate/:enddate', middleware.isLoginCheck, (req, res) => { fundsLib.getFundByIsinBetweenDates(req, res); });
router.delete("/api/funds/:isin", middleware.isLoginCheck, (req, res) => { fundsLib.deleteFund(req, res); });

//Wallet of Funds
router.post("/api/portfoliofunds", middleware.isLoginCheck, (req, res) => { walletLib.saveWallet(req, res); });
router.get("/api/portfoliofunds/:owner", middleware.isLoginCheck, (req, res) => { walletLib.getOwnerWallets(req, res); });
router.get("/api/portfoliofunds/:owner/:wallet", middleware.isLoginCheck, (req, res) => { walletLib.getOwnerWalletFundList(req, res); });
router.delete("/api/portfoliofunds/:owner/:wallet", middleware.isLoginCheck, (req, res) => { walletLib.deleteOwnerWallet(req, res); });
router.put("/api/portfoliofunds", middleware.isLoginCheck, (req, res) => { walletLib.updateWalletOwner(req, res); });

module.exports = router;