'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let UrlShorten = mongoose.model('UrlShorten', new Schema({
    original_url: {
        type: String,
        required: true,
        unique: true
    },
    shorten_url: {
        type: String,
        required: true,
        unique: true
    },
    counter: Number
}));

module.exports = {
    UrlShorten: UrlShorten
};
