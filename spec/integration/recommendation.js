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

describe('Breinify Recommendation Request', function () {

    it('no signature', function (done) {
        getNoSig().recommendation({'email': 'test@email.com'}, 3, function (response) {
            expect(response.result).to.be.instanceof(Array);
            expect(response.result).to.have.lengthOf(3);
            done();
        });
    });

    it('signature', function (done) {
        getSig().recommendation({'email': 'test@email.com'}, 3, function (response) {
            expect(response.result).to.be.instanceof(Array);
            expect(response.result).to.have.lengthOf(3);
            done();
        });
    });
});