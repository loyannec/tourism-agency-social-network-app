const User = require('../db/models/user');
const JWT = require('jsonwebtoken');
const TOKEN = {
    duration: 1000 * 60,       // 1 hour
    secret: '123456',
    key: 'access_token'
};

module.exports = {
    setToken: (req, res, next) => {
        const userIdentifier = req.user._id;
        const token = JWT.sign({ userIdentifier }, TOKEN.secret);
        res.cookie(TOKEN.key, token);
        res.redirect('/');
    },

    unsetToken: (req, res, next) => {
        res.clearCookie(TOKEN.key);
        next();
    },

    loadUser: (req, res, next) => {
        const token = req.cookies[TOKEN.key];
        if (token) {
            const userIdentifier = JWT.verify(token, TOKEN.secret).userIdentifier;
            User.findById(userIdentifier, (err, user) => {
                if (user) {
                    req.user = user;
                }
                next();
            })
            .lean();
        } else {
            next();
        }
    },

    verifyToken: (req, res, next) => {
        const token = req.cookies[TOKEN.key];
        if (token) {
            const userIdentifier = JWT.verify(token, TOKEN.secret).userIdentifier;
            User.findById(userIdentifier, (err, user) => {
                if (user) {
                    req.user = user;
                    next();
                } else {
                    res.sendStatus(404);
                }
            })
            .lean();
        } else {
            res.sendStatus(404);
        }
    },

    isAdministrator: (req, res, next) => {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.sendStatus(404);
        }
    }
};
