'use strict';

let expect = require('chai').expect;
require('../app/config/config');
let shortenerService = require('../app/services/shortner');

describe('Create short URL', function() {
    describe ('Positive Test Case', function() {
        it('create new URL', function(){
            return shortenerService.createShortenedUrl({originalUrl: 'https://www.geeksforgeeks.org/combinational-sum/',
                fullUrl: 'http://localhost:3000/api/'}).then((response) => {
                expect(response).to.not.be.empty;
                expect(response.error).to.equal(false);
                expect(response.code).to.equal('success');
            })
        }).timeout(10000);
        it('shorten URL already present', function(){
            return shortenerService.createShortenedUrl({originalUrl: 'https://www.geeksforgeeks.org/combinational-sum/',
                fullUrl: 'http://localhost:3000/api/'})
                .then((response) => {
                    expect(response).to.not.be.empty;
                    expect(response.error).to.equal(false);
                    expect(response.code).to.equal('shorten_url_already_present');
                })
        }).timeout(10000);
    });
});


describe('get original URL', function() {
    describe ('Positive Test Case', function() {
        it('create new URL', function(){
            return shortenerService.getOriginalUrl({shorten: 'sFRrmz4LH'})
                .then((response) => {
                expect(response).to.not.be.empty;
                expect(response.error).to.equal(false);
                expect(response.code).to.equal('success');
            })
        }).timeout(10000);
    });
    describe ('Negative Test Case', function() {
        it('shorten URL already present', function(){
            return shortenerService.getOriginalUrl({shorten: '457'})
                .then((response) => {
                    expect(response).to.not.be.empty;
                    expect(response.error).to.equal(true);
                    expect(response.code).to.equal('url_missing');
                })
        }).timeout(10000);
    });
});


describe('get status URL', function() {
    describe ('Positive Test Case', function() {
        it('get URL status', function(){
            return shortenerService.getShortenURLStatus({shortenUrl: 'sFRrmz4LH'})
                .then((response) => {
                    expect(response).to.not.be.empty;
                    expect(response.error).to.equal(false);
                    expect(response.code).to.equal('success');
                })
        }).timeout(10000);
    });
    describe ('Negative Test Case', function() {
        it('Url missing', function(){
            return shortenerService.getShortenURLStatus({shortenUrl: '457'})
                .then((response) => {
                    expect(response).to.not.be.empty;
                    expect(response.error).to.equal(true);
                    expect(response.code).to.equal('url_missing');
                })
        }).timeout(10000);
    });
});
