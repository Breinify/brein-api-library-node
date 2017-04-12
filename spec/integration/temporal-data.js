var mocha = require('mocha'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;
var Breinify = require('../../lib/breinify');
var GlobalVar = require('./global-variables');

function getNoSig() {
    var config = {
        'apiKey': GlobalVar.keys.apiKeyNoSig,
        'verbose': false
    };

    return new Breinify(config);
}

function getSig() {
    var config = {
        'apiKey': GlobalVar.keys.apiKeySig,
        'secret': GlobalVar.keys.apiKeySecret,
        'verbose': false
    };

    return new Breinify(config);
}

describe('Breinify TemporalData Request', function () {

    it('no signature, just time', function (done) {
        getNoSig().temporalData(new Date().toString(), null, function (response) {
            expect(response.time.epochSecond).to.be.an('number');
            done();
        });
    });

    it('no signature, just date', function (done) {
        getNoSig().temporalData(new Date(), function (response) {
            expect(response.time.epochSecond).to.be.an('number');
            expect(response.time.timezone).not.equal(null);
            done();
        });
    });

    it('no signature, just location', function (done) {
        getNoSig().temporalData(39.9526, -75.1652, function (response) {
            expect(response.location.country).to.be.equal('US');
            expect(response.location.city).to.be.equal('Philadelphia');
            expect(response.location.state).to.be.equal('PA');
            done();
        });
    });

    it('no signature, user', function (done) {
        this.timeout(10000);

        getNoSig().temporalData({
            additional: {
                location: {
                    latitude: 37.7609295,
                    longitude: -122.4194155,
                    shapeTypes: ['CITY', 'NEIGHBORHOOD']
                }
            }
        }, function (response) {
            expect(response.location.country).to.be.equal('US');
            expect(response.location.state).to.be.equal('CA');
            expect(response.location.geojson).to.have.property('CITY');
            expect(response.location.geojson).to.have.property('NEIGHBORHOOD');
            done();
        });
    });

    it('signature, just time', function (done) {
        getSig().temporalData(new Date().toString(), null, function (response) {
            expect(response.time.epochSecond).to.be.an('number');
            done();
        });
    });

    it('signature, just date', function (done) {
        getSig().temporalData(new Date(), function (response) {
            expect(response.time.epochSecond).to.be.an('number');
            expect(response.time.timezone).not.equal(null);
            done();
        });
    });

    it('signature, just location', function (done) {
        getSig().temporalData(39.9526, -75.1652, function (response) {
            expect(response.location.country).to.be.equal('US');
            expect(response.location.city).to.be.equal('Philadelphia');
            expect(response.location.state).to.be.equal('PA');
            done();
        });
    });
});