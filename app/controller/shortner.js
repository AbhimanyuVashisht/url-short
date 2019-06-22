'use strict';

const status = require('../config/status');

let services = require('../services/shortner');

let getOriginalUrl = async function (req, res, next) {
    if (!req.params.shorten) {
        return next(status.getStatus('input_missing'));
    }
    let params = {};
    params.shorten = req.params.shorten;
    try {
        let result = await services.getOriginalUrl(params);
        if (!result.error) {
            return res.redirect(result.data);
        } else {
            return res.sendStatus(401);
        }
    } catch (e) {
        return next(e);
    }
};

let createShortenedUrl = async function (req, res, next) {
    if (!req.body.original_url) {
        return next(status.getStatus('input_missing'));
    }
    let params = {};
    params.originalUrl = req.body.original_url;
    params.fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    try {
        return res.json(await services.createShortenedUrl(params));
    } catch (e) {
        return next(e);
    }
};

let getShortenURLStatus = async function (req, res, next) {
    if (!req.query.url) {
        return next(status.getStatus('input_missing'));
    }
    let params = {};
    params.shortenUrl = req.query.url;
    try {
        return res.json(await services.getShortenURLStatus(params));
    } catch (e) {
        return next(e);
    }
};

module.exports = {
    getOriginalUrl: getOriginalUrl,
    createShortenedUrl: createShortenedUrl,
    getShortenURLStatus: getShortenURLStatus
};
