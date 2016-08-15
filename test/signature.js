var mocha = require('mocha'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;
var Breinify = require('../lib/breinify');

var global_variables = {
    'apiKeyNoSig': '41B2-F48C-156A-409A-B465-317F-A0B4-E0E8',
    'apiKeySig': 'E7CA-2C1A-BE39-4AD1-BE48-7539-5958-3674',
    'apiKeySecret': 'eeldulkbhmekyqletwbspg==',
    'host': 'dev.breinify.com',
    'activityEndpoint': '/api/activity',
    'port': '80'
};

describe('Breinify Signature', function () {
    it('should have error that secret is an object', function (done) {

        var breinify = new Breinify();

        breinify._generateSignature({'secret': global_variables.apiKeySecret}, 'login', Date.now(), function (signature) {
            expect(signature).to.deep.equal(new Error('Your secret needs to be an non-empty string'));
        });

        done();
    });

    it('should have error that secret is an empty object', function (done) {

        var breinify = new Breinify();

        var signature = breinify._generateSignature({}, 'login', Date.now())
        expect(signature).to.deep.equal(new Error('Your secret needs to be an non-empty string'));


        done();
    });

    it('should have error that secret is an empty string', function (done) {

        var breinify = new Breinify();

        var signature = breinify._generateSignature('', 'login', Date.now());
        expect(signature).to.deep.equal(new Error('Your secret needs to be an non-empty string'));

        done();
    });

    it('should have error that secret is null', function (done) {

        var breinify = new Breinify();

        var signature = breinify._generateSignature(null, 'login', Date.now());
        expect(signature).to.deep.equal(new Error('Your secret needs to be an non-empty string'));

        done();
    });

    it('should have error that type is an object', function (done) {

        var breinify = new Breinify();

        var signature = breinify._generateSignature(global_variables.apiKeySecret, {'type': 'login'}, Date.now());
        expect(signature).to.deep.equal(new Error('Your payload needs to be an non-empty string'));

        done();
    });

    it('should have error that type is an empty object', function (done) {

        var breinify = new Breinify();

        var signature = breinify._generateSignature(global_variables.apiKeySecret, {}, Date.now())
        expect(signature).to.deep.equal(new Error('Your payload needs to be an non-empty string'));

        done();
    });

    it('should have error that type is an empty string', function (done) {

        var breinify = new Breinify();

        var signature = breinify._generateSignature(global_variables.apiKeySecret, '', Date.now());
        expect(signature).to.deep.equal(new Error('Your payload needs to be an non-empty string'));

        done();
    });

    it('should have error that type is null', function (done) {

        var breinify = new Breinify();

        var signature = breinify._generateSignature(global_variables.apiKeySecret, null, Date.now())
        expect(signature).to.deep.equal(new Error('Your payload needs to be an non-empty string'));

        done();
    });

    it('should successfully generate signature', function (done) {

        var breinify = new Breinify();

        //timestamp is Date.now()/1000
        var signature = breinify._generateSignature('5e9xqoesiygkuzddxjlkaq==', 'search', 1451962516);
        expect(signature).to.be.a('string');
        expect(signature).to.equal('rsXU0ozhfzieNLA2jQs2h2e4sz2+qHGxbgSYyfWr5EM=');

        done();
    });
});