var mocha = require('mocha'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;
var util = require('../../lib/util');

describe('Breinify TemporalData Request', function () {

    it('isEmpty should return correct true or false', function () {
        expect(util.isEmpty(null)).to.be.true;

        var a;
        //noinspection JSUnusedAssignment
        expect(util.isEmpty(a)).to.be.true;
        a = null;
        expect(util.isEmpty(a)).to.be.true;
        a = 5;
        expect(util.isEmpty(a)).to.be.false;

        expect(util.isEmpty({})).to.be.true;
        expect(util.isEmpty({
            'value': 1
        })).to.be.false;
        expect(util.isEmpty({
            'value': null
        })).to.be.false;

        expect(util.isEmpty('')).to.be.true;
        expect(util.isEmpty('t')).to.be.false;
        expect(util.isEmpty(' ')).to.be.false;

        expect(util.isEmpty(1)).to.be.false;
        expect(util.isEmpty(0)).to.be.false;
    });

    it('isUndefinedorNull should return correct true or false', function () {

        expect(util.isUndefinedorNull(1)).to.be.false;
        expect(util.isUndefinedorNull('')).to.be.false;

        var a;
        //noinspection JSUnusedAssignment
        expect(util.isUndefinedorNull(a)).to.be.true;
        a = null;
        expect(util.isUndefinedorNull(a)).to.be.true;
        a = 5;
        expect(util.isUndefinedorNull(a)).to.be.false;
    });

    it('bool should return correct 0, 1 or -1', function () {

        expect(util.bool(true)).to.be.equal(1);
        expect(util.bool(false)).to.be.equal(0);

        expect(util.bool('true')).to.be.equal(1);
        expect(util.bool('TRUE')).to.be.equal(1);
        expect(util.bool('tRuE')).to.be.equal(1);
        expect(util.bool('false')).to.be.equal(0);
        expect(util.bool('FALSE')).to.be.equal(0);
        expect(util.bool('FaLsE')).to.be.equal(0);
        expect(util.bool('')).to.be.equal(-1);

        expect(util.bool(1)).to.be.equal(1);
        expect(util.bool(0)).to.be.equal(0);
        expect(util.bool(-2)).to.be.equal(-1);
        expect(util.bool(1.0000)).to.be.equal(1);
        expect(util.bool(0.0000)).to.be.equal(0);
        expect(util.bool(0.0001)).to.be.equal(-1);

        expect(util.bool({})).to.be.equal(-1);
        expect(util.bool(null)).to.be.equal(-1);

        var a;
        //noinspection JSUnusedAssignment
        expect(util.bool(a)).to.be.equal(-1);
        a = null;
        expect(util.bool(a)).to.be.equal(-1);
        a = 5;
        expect(util.bool(a)).to.be.equal(-1);
    });
});