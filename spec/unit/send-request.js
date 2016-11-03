var mocha = require('mocha'),
    chai = require('chai'),
    expect = chai.expect;
var Breinify = require('../../lib/breinify');
var GlobalVar = require('./global-variables');
var http = require("http");
var nock = require("nock");

describe('Breinify Send Request', function () {
    it('should successful send request with a non signature needed key', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeyNoSig
        };

        var breinify = new Breinify(config);
        var configResult = breinify.config();

        var followersResponse = {};

        // Mock the TMDB configuration request response
        nock('https://api.breinify.com')
            .post('/activity', GlobalVar.activityPayload)
            .reply(200, followersResponse);

        breinify._sendRequest('POST', configResult.activityEndpoint, GlobalVar.activityPayload, function (result) {

            expect(result).to.be.a('object');
            expect(result).to.deep.equal({});
            done();
        });
    });

    it('should get error in send request with a signature needed key and no signature', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeySig
        };

        var breinify = new Breinify(config);
        var configResult = breinify.config();

        var followersResponse = ""; //doesnt matter response since we use statusCode

        // Mock the TMDB configuration request response
        nock('https://api.breinify.com')
            .post('/activity', GlobalVar.activityPayload)
            .reply(403, followersResponse);

        breinify._sendRequest('POST', configResult.activityEndpoint, GlobalVar.activityPayload, function (result) {
            expect(result).to.deep.equal(new Error("Breinify 403: Please check if you are using a key that requires a signature. If so, please enable TRUE on the SIGNATURE [boolean] and set your secret"));

            done();
        });
    });

    it('should successful send request with a signature needed key with signature', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeySig,
            'secret': GlobalVar.keys.apiKeySecret
        };


        var breinify = new Breinify(config);

        var signature = breinify._generateSignature(GlobalVar.keys.apiKeySecret, 'search', 1451962516);
        GlobalVar.activityPayload.signature = signature;

        var configResult = breinify.config();

        var followersResponse = {}; //doesnt matter response since we use statusCode

        // Mock the TMDB configuration request response
        nock('https://api.breinify.com')
            .post('/activity', GlobalVar.activityPayload)
            .reply(200, followersResponse);

        breinify._sendRequest('POST', configResult.activityEndpoint, GlobalVar.activityPayload, function (result) {
            expect(result).to.deep.equal({});
            expect(result).to.be.an('object');
            done();
        });
    });

    after(function () {
        nock.cleanAll();
    });

});