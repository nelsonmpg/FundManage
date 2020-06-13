'use strict'
let mongoose = require('mongoose'),
    utils = require('./../utils.js'),
    FundsWalletSchema = new mongoose.Schema({
        // Wallet owner
        owner: { type: String, required: true },
        // Wallet Id
        walletId: { type: String, required: true },
        // Código do fundo = ISIN + "-" + new Date(dateInvest).getTime()
        codefund: { type: String, required: true },
        // campo para pesquisa
        dateCheck: { type: Number, required: true },
        // Isin do fundo
        isin: { type: String, required: true },
        // Nome do fundo
        name: { type: String, required: true },
        // Data do investimento
        dateInvest: { type: Date },
        // Data da ultima atualização
        dateLastUpdate: { type: Date, default: Date.now },
        // Data da ultima atualização do historico do fundo
        dateLastUpdateInvest: { type: Date },
        // Numero de 'Ups' compradas
        nUps: { type: Number, default: 0 },
        // Valor do investimento calculado pla BD (nUps * cotação na data da compra)
        valInvest: { type: Number, default: 0 },
        // Valor do investimento calculado pla BD (nUps * cotação do ultimo registo)
        valLastMoney: { type: Number, default: 0 },
        // estado do fundo na carteira
        active: { type: Boolean, default: true },
        // Data da inativação do investimento
        dateInative: { type: Date },
        // Valor unitario na data da compra
        cotacaoUp: { type: Number, default: 0 },
        // Array para gráfico com a evolução do fundo
        moneyFund: [{
            // Data da cotação Morningstar
            EndDate: { type: Date },
            // Valor Moringstar
            Value: { type: Number },
            // Calculo no dia das (Ups * cotação atual)
            moneyCalc: { type: Number }
        }]
    }),
    FundsWallet = function () {
        // Esquema dos objectos Funds Wallet
        this.fundswalletdb = mongoose.model('FundsWallet', FundsWalletSchema);
    };

FundsWallet.prototype.insertAllFunds = function (listFundsArr, res, callback) {
    this.fundswalletdb.insertMany(listFundsArr, function (err, resultFundsSave) {
        if (err) {
            console.log("There was a problem finding the Wallet.", err);
            if (res) {
                return res.status(500).send({
                    status: false,
                    data: "There was a problem finding the Wallet."
                });
            } else {
                return console.log("There was a problem finding the Wallet.");
            }
        }
        console.log("Insert Bulk funds wallet."/* , resultFundsSave */);
        callback(resultFundsSave);
    });
}

FundsWallet.prototype.updateWalletFund = function (fundWallet, fundup, res, callback) {
    // console.log("Teste", fundWallet, fundup)
    let options = {
        upsert: true
    };
    this.fundswalletdb.updateOne({
        owner: fundWallet.owner,
        walletId: fundWallet.walletId,
        codefund: fundWallet.codefund
    }, {
        "$set": {
            "cotacaoUp": fundup.Value,
            "dateLastUpdate": new Date(),
            "valInvest": (fundWallet.nUps * fundup.Value),
            "valLastMoney": fundup.HistoryDetail[fundup.HistoryDetail.length - 1].moneyCalc,
            "dateLastUpdateInvest": fundup.HistoryDetail[fundup.HistoryDetail.length - 1].EndDate
        },
        "$push": {
            "moneyFund": {
                $each: fundup.HistoryDetail,
                $sort: { EndDate: 1 }
            }
        }
    }, options, function (err, result) {
        if (err) {
            console.log("Error to update value cotacao.", err);
            if (res) {
                return res.status(500).send({
                    status: false,
                    data: "Error to update value cotacao." + err
                });
            } else {
                return console.log("Error to update value cotacao." + err);
            }
        }
        console.log("Update Cotacao", result/**/);
        callback();
    })
}

FundsWallet.prototype.getFundsWalletMoney = function (wallet, res, callback) {
    let query = [{
        "$match": {
            owner: wallet.owner,
            walletId: wallet._id.toString()
        }
    }, {
        "$unwind": "$moneyFund"
    }, {
        "$group": {
            _id: "$_id",
            isin: { "$first": "$isin" },
            moneyFundFirst: {
                "$first": "$moneyFund"
            },
            moneyFundLast: {
                "$last": "$moneyFund"
            }
        }
    }, {
        "$project": {
            _id: 0,
            isin: 1,
            moneyFundLast: "$moneyFundFirst",
            moneyFundFirst: "$moneyFundLast"
        }
    }];
    this.fundswalletdb.aggregate(query, function (err, fundWallets) {
        if (err) {
            if (res) {
                res.status(500).send({
                    status: false,
                    data: "There was a problem finding FundsWallet."
                });
            }
            return console.log("There was a problem finding FundsWallet.", err);
        }
        let objVals = {
            valueStart: 0,
            valueEnd: 0
        }
        for (let l = 0; l < fundWallets.length; l++) {
            objVals.valueStart += fundWallets[l].moneyFundLast.moneyCalc;
            objVals.valueEnd += fundWallets[l].moneyFundFirst.moneyCalc;
        }
        callback(objVals);
    });
}

FundsWallet.prototype.findFundsInWallet = function (res, wallet) {
    let query = {
        owner: wallet.owner,
        walletId: wallet._id.toString()
    }
    this.fundswalletdb.find(query, function (err, fundsWallList) {
        if (err) {
            if (res) {
                res.status(500).send({
                    status: false,
                    data: "There was a problem finding FundsWallet, findFundsInWallet."
                });
            }
            return console.log("There was a problem finding FundsWallet, findFundsInWallet.", err);
        }
        let arrAux = [],
            arrAll = [],
            endArrAllMoney = [],
            dateEnd = new Date().setHours(0, 0, 0, 0),
            lastDate,
            lastDateTime,
            countpost = 0,
            lastObj,
            lastObjDate,
            portfolio = wallet;
        dateEnd = new Date(dateEnd).getTime();
        portfolio.listFunds = fundsWallList;
        try {
            for (let x = 0; x < portfolio.listFunds.length; x++) {
                if (portfolio.listFunds[x]) {
                    countpost = 0;
                    lastDate = new Date(portfolio.listFunds[x].moneyFund[countpost].EndDate);
                    lastObjDate = lastDate;
                    lastObj = portfolio.listFunds[x].moneyFund[countpost];

                    while (lastDate.getTime() < dateEnd) {
                        lastDateTime = lastDate.getTime();
                        arrAux.push(lastDateTime);
                        if (typeof arrAll[lastDateTime] !== 'object') {
                            arrAll[lastDateTime] = {
                                moneyWalletCalc: (lastObj.moneyCalc * 1),
                                EndDate: lastDate
                            }
                        } else {
                            arrAll[lastDateTime] = {
                                moneyWalletCalc: arrAll[lastDateTime].moneyWalletCalc + (lastObj.moneyCalc * 1),
                                EndDate: lastDate
                            }
                        }
                        if (lastDate.setHours(0, 0, 0, 0) === lastObjDate.setHours(0, 0, 0, 0)) {
                            countpost++;
                            if (portfolio.listFunds[x].moneyFund[countpost]) {
                                lastObj = portfolio.listFunds[x].moneyFund[countpost];
                                lastObjDate = new Date(lastObj.EndDate);
                            }
                        }
                        if (!portfolio.listFunds[x].active) {
                            let datInative = new Date(portfolio.listFunds[x].dateInative)
                            if (lastDate.setHours(0, 0, 0, 0) > datInative.setHours(0, 0, 0, 0)) {
                                lastObj.moneyCalc = 0;
                            }
                        }
                        lastDate = new Date(lastDate.setDate(lastDate.getDate() + 1));
                    }
                }
            }
        } catch (e) {
            console.log("Error getOwnerWalletFundList.", e);
        }

        let arrAuxSorted = utils.sortUnique(arrAux);
        for (let index = 0; index < arrAuxSorted.length; index++) {
            endArrAllMoney.push(arrAll[arrAuxSorted[index]]);
        }
        portfolio.moneyWallet = endArrAllMoney;
        res.status(200).send({
            status: true,
            data: portfolio
        });
    })
}

FundsWallet.prototype.deleteAllFunds = function (objData, res, callback) {
    let query = {
        owner: objData.owner,
        walletId: objData.walletId
    };
    this.fundswalletdb.deleteMany(query, function (err, result) {
        if (err) {
            if (res) {
                return res.status(500).send({
                    status: false,
                    data: "There was a problem finding the Wallet, deleteMany."
                });
            } else {
                return console.log("There was a problem finding the Wallet, deleteMany.");
            }
        }
        console.log("Delete all fund wallet.", result);
        callback();
    })
}

FundsWallet.prototype.findFundsInWalletEdit = function (res, wallet) {
    this.fundswalletdb.find(
        {
            owner: wallet.owner,
            walletId: wallet._id.toString()
        }, {
        _id: 0,
        isin: 1,
        name: 1,
        dateInvest: 1,
        nUps: 1,
        active: 1,
        dateInative: 1
    }, function (err, fundsList) {
        if (err) {
            console.log("There was a problem finding the Wallet, findFundsInWalletEdit.", err);
            if (res) {
                return res.status(500).send({
                    status: false,
                    data: "There was a problem finding the Wallet, findFundsInWalletEdit."
                });
            } else {
                return console.log("There was a problem finding the Wallet, findFundsInWalletEdit.");
            }
        }
        let objReturn = {
            owner: wallet.owner,
            nameWallet: wallet.nameWallet,
            listFunds: []
        },
            mergeFundInvest = [];
        for (let index = 0; index < fundsList.length; index++) {
            if (!mergeFundInvest[fundsList[index].isin]) {
                mergeFundInvest[fundsList[index].isin] = {
                    isin: fundsList[index].isin,
                    name: fundsList[index].name,
                    investList: []
                }
            }
            mergeFundInvest[fundsList[index].isin].investList.push({
                nUps: fundsList[index].nUps,
                active: fundsList[index].active,
                dateInvest: fundsList[index].dateInvest,
                dateInative: fundsList[index].dateInative
            });
        }

        for (let index in mergeFundInvest) {
            objReturn.listFunds.push(mergeFundInvest[index]);
        }

        res.status(200).send({
            status: true,
            data: objReturn
        });
    });
}

FundsWallet.prototype.getAllFundsWallets = function (callbackNext, callbackList) {
    this.fundswalletdb.find({}, function (err, fundsList) {
        if (err) {
            console.log("There was a problem finding the Wallet, findFundsInWalletEdit.", err);
            callbackNext()
        }
        callbackList(fundsList);
    });
}

FundsWallet.prototype.updateMoneyFundWallet = function (fundUpdate, fundHistToUp, callback) {
    let options = {
        upsert: true
    };
    this.fundswalletdb.updateOne({
        "_id": fundUpdate._id
    }, {
        "$set": {
            dateLastUpdate: new Date(),
            valLastMoney: fundHistToUp.HistoryDetail[fundHistToUp.HistoryDetail.length - 1].moneyCalc,
            dateLastUpdateInvest: fundHistToUp.HistoryDetail[fundHistToUp.HistoryDetail.length - 1].EndDate
        },
        "$push": {
            moneyFund: {
                $each: fundHistToUp.HistoryDetail,
                $sort: { EndDate: 1 }
            }
        }
    }, options, function (err, result) {
        if (err) {
            console.log("Error to update value cotacao in Wallet." + err);
        } else {
            console.log("Update Fund Money in Wallet", fundHistToUp.isin, result);
        }
        callback();
    })
}

FundsWallet.prototype.lastUpdateOnlyDateFundInWallet = function (fundUpdate, callback) {
    let options = {
        upsert: true
    };
    this.fundswalletdb.updateOne({
        "_id": fundUpdate._id
    }, {
        "$set": {
            dateLastUpdate: new Date()
        }
    }, options, function (err, result) {
        if (err) {
            console.log("Error to update value cotacao." + err);
        } else {
            console.log("Update Date Fund in Wallet", fundUpdate.isin, result);
        }
        callback();
    });
}

FundsWallet.prototype.findFundsInWalletToBackup = function (wallet, callbacknext, callbackList) {
    this.fundswalletdb.find(
        {
            owner: wallet.owner,
            walletId: wallet._id.toString()
        }, {
        _id: 0,
        codefund: 1,
        isin: 1,
        name: 1,
        dateInvest: 1,
        dateCheck: 1,
        nUps: 1,
        active: 1,
        dateInative: 1
    }, function (err, fundsList) {
        if (err) {
            console.log("There was a problem finding the Wallet, findFundsInWalletEdit.");
            return callbacknext();
        }
        callbackList(fundsList);
    });
}

FundsWallet.prototype.findFundUsageByIsin = function (isin, res, callback) {
    this.fundswalletdb.find(
        {
            isin: isin
        }, {
        _id: 0,
        codefund: 1,
        isin: 1
    }, function (err, fundsList) {
        if (err) {
            return res.status(500).send({
                status: false,
                data: "There was a problem finding funds in all Wallets."
            });
        }
        if (fundsList.length > 0) {
            return res.status(200).send({
                status: false,
                data: "This fund exists on Portfolios, remove first on portfolios and then remove fund."
            });
        }
        callback();
    });
}

module.exports = FundsWallet;
