var mocha = require('mocha'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;
var Breinify = require('../lib/breinify');
var GlobalVar = require('../test/global-variables');
var nock = require("nock");

describe('Breinify Activity Request', function () {
    it('should fail send activity with key no signature needed, empty user string', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeyNoSig
        };

        var breinify = new Breinify(config);

        breinify.activity("", GlobalVar.activityPayload.activity.type, GlobalVar.activityPayload.activity.description, GlobalVar.activityPayload.activity.tags, null, false, function (response) {

            expect(response).to.be.an('error');
            expect(response).to.deep.equal(new Error('Please send in an user'));
            done();

        });
    });

    it('should succeed send activity with type and description', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeyNoSig
        };

        var breinify = new Breinify(config);

        var followersResponse = {};

        // Mock the TMDB configuration request response
        nock('https://api.breinify.com')
            .post('/activity', GlobalVar.activityPayload)
            .reply(200, followersResponse);

        breinify.activity(GlobalVar.activityPayload.user, GlobalVar.activityPayload.activity.type, GlobalVar.activityPayload.activity.description, GlobalVar.activityPayload.activity.tags, null, null, function (response) {

            expect(response).to.be.an('object');
            expect(response).to.deep.equal({});
            done();

        });
    });

    it('should fail send activity with key no signature needed, empty user object', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeyNoSig
        };

        var breinify = new Breinify(config);

        breinify.activity({}, GlobalVar.activityPayload.activity.type, GlobalVar.activityPayload.activity.description, GlobalVar.activityPayload.activity.tags, null, false, function (response) {

            expect(response).to.be.an('error');
            expect(response).to.deep.equal(new Error('Please send in an user'));
            done();

        });

    });

    it('should fail send activity with key no signature needed, empty type string', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeyNoSig
        };

        var breinify = new Breinify(config);

        breinify.activity(GlobalVar.activityPayload.user, "", GlobalVar.activityPayload.activity.description, GlobalVar.activityPayload.activity.tags, null, false, function (response) {

            expect(response).to.be.an('error');
            expect(response).to.deep.equal(new Error('Please send in an activity'));
            done();

        });

    });

    it('should fail send activity with key no signature needed, empty type object', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeyNoSig
        };

        var breinify = new Breinify(config);

        breinify.activity(GlobalVar.activityPayload.user, {}, GlobalVar.activityPayload.activity.description, GlobalVar.activityPayload.activity.tags, null, false, function (response) {

            expect(response).to.be.an('error');
            expect(response).to.deep.equal(new Error('Please send in an activity'));
            done();

        });

    });

    it('should fail send activity with key signature needed, false signature boolean', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeySig
        };

        var breinify = new Breinify(config);

        var followersResponse = "SIGNATURE"; //doesnt matter response since we use statusCode

        // Mock the TMDB configuration request response
        nock('https://api.breinify.com')
            .post('/activity', GlobalVar.activityPayload)
            .reply(403, followersResponse);


        breinify.activity(GlobalVar.activityPayload.user, GlobalVar.activityPayload.activity.type, GlobalVar.activityPayload.activity.description, GlobalVar.activityPayload.activity.tags, 'other', false, function (response) {
            expect(response).to.be.an('error');
            // expect(response).to.deep.equal(new Error("Breinify 403: SIGNATURE"));
            expect(response).to.deep.equal(new Error("Breinify 403: Please check if you are using a key that requires a signature. If so, please enable TRUE on the SIGNATURE [boolean] and set your secret"));
            done();

        });
    });

    it('should fail send activity with key signature needed, true signature boolean and no secret set', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeySig
        };

        var breinify = new Breinify(config);

        breinify.activity(GlobalVar.activityPayload.user, GlobalVar.activityPayload.activity.type, GlobalVar.activityPayload.activity.description, GlobalVar.activityPayload.activity.tags, 'other', true, function (response) {

            expect(response).to.be.an('error');
            expect(response).to.deep.equal(new Error('Please set your Breinify secret with setConfig()'));
            done();

        });
    });

    it('should successfully send activity with key no signature needed, false signature boolean, and no secret set', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeyNoSig
        };

        var followersResponse = {}; //doesnt matter response since we use statusCode

        // Mock the TMDB configuration request response
        nock('https://api.breinify.com')
            .post('/activity', GlobalVar.activityPayload)
            .reply(200, followersResponse);


        var breinify = new Breinify(config);

        breinify.activity(GlobalVar.activityPayload.user, GlobalVar.activityPayload.activity.type, GlobalVar.activityPayload.activity.description, GlobalVar.activityPayload.activity.tags, 'other', false, function (response) {

            expect(response).to.be.a('object');
            expect(response).to.deep.equal({});
            done();

        });

    });

    it('should fail send activity with key no signature needed, true signature boolean, and no secret set', function (done) {
        var config = {
            'apiKey': GlobalVar.keys.apiKeyNoSig
        };

        var breinify = new Breinify(config);

        breinify.activity(GlobalVar.activityPayload.user, GlobalVar.activityPayload.activity.type, GlobalVar.activityPayload.activity.description, GlobalVar.activityPayload.activity.tags, 'other', true, function (response) {

            expect(response).to.be.an('error');
            expect(response).to.deep.equal(new Error('Please set your Breinify secret with setConfig()'));
            done();

        });

    });
});