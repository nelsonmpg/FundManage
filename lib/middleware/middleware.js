'use strict';
let utils = require('./../utils.js');

module.exports = {
    isLoginCheck: function (req, res, next) {
        console.log("Check Auth", req.isAuthenticated(), req.method, req.path);
        if (!req.session.user && !req.isAuthenticated() && !utils.isDevMode()) {
            return res.status(401).send({
                status: false,
                data: "You are not authenticated. This session is not valid."
            });
        }
        next();
    },
};