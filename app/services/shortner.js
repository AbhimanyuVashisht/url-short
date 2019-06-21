'use strict';

const shortId = require('shortid');

const status = require('../config/status');
let models = require('../models/shortner');

let getOriginalUrl = function (params) {
    return new Promise(async (resolve, reject) => {
        try {
            let it = await models.UrlShorten.findOneAndUpdate({ shorten_url: params.shorten}, {
                $inc: { counter: 1 }
            });
            let response;
            if (it) {
                response = status.getStatus('success');
                response.data = it.original_url;
            } else {
                response = status.getStatus('url_missing');
            }
            return resolve(response)
        } catch (e) {
            return reject(e);
        }

    });
};

let createShortenedUrl = function (params) {
    return new Promise(async (resolve, reject) => {
        try {
            let it = await models.UrlShorten.findOne({ original_url: params.originalUrl});
            let response;
            if (!it) {
                let newUrl = new models.UrlShorten({
                    original_url: params.originalUrl,
                    shorten_url: shortId.generate(),
                    counter: 0
                });
                let result = (await newUrl.save()).shorten_url;
                response = status.getStatus('success');
                response.data = params.fullUrl + result;
            } else {
                response = status.getStatus('shorten_url_already_present');
                response.data = params.fullUrl + it.shorten_url;
            }
            return resolve(response);
        } catch (e) {
            return reject(e);
        }
    });
};

let getShortenURLStatus = function (params) {
    return new Promise(async (resolve, reject) => {
        try {
            let it = await models.UrlShorten.findOne({ shorten_url: params.shortenUrl});
            let response;
            if (it) {
                response = status.getStatus('success');
                response.data = it;
            } else {
                response = status.getStatus('url_missing');
            }
            return resolve(response);
        } catch (e) {
            return reject(e);
        }
    });
};

module.exports = {
    getOriginalUrl: getOriginalUrl,
    createShortenedUrl: createShortenedUrl,
    getShortenURLStatus: getShortenURLStatus
};
