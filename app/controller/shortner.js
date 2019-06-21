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
    params.baseUrl = req.get('host');
    try {
        return res.json(await services.createShortenedUrl(params));
    } catch (e) {
        return next(e);
    }
};

module.exports = {
    getOriginalUrl: getOriginalUrl,
    createShortenedUrl: createShortenedUrl
};