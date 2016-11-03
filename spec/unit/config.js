var mocha = require('mocha'),
    chai = require('chai'),
    expect = chai.expect;
var Breinify = require('../../lib/breinify');

var global_variables = {
    'apiKey': 'DACB-99A8-3147-4BEA-8454-B5B4-8022-0BDE',
    'secret': 'u9xqzl1jdu5/n3oihoc8zg=='
};

describe('Breinify Set Up', function () {
    describe('set config', function () {
        it('should get current version of library', function (done) {
            var breinify = new Breinify();
            expect(breinify instanceof Breinify).to.equal(true);

            var version = breinify.version();
            expect(version).to.equal('1.0');

            done();

        });

        it('should retrieve the current configuration of the library.', function (done) {

            var breinify = new Breinify();

            expect(breinify).to.have.property('_api')
                .that.is.an('object')
                .that.deep.equals({
                url: 'api.breinify.com',
                host: 'api.breinify.com',
                port: '443',
                version: '1.0',
                timeout: 120000,
                apiKey: null,
                secret: null,
                category: null,
                lookupEndpoint: '/lookup',
                activityEndpoint: '/activity',
                temporalDataEndpoint: '/temporaldata',
                validate: true,
                debug: false,
                verbose: false
            });

            done();

        });

        it('should set all available parameters', function (done) {
            var config = {
                'url': 'api.breinify.com',
                'host': 'localhost',
                'port': '2000',
                'version': '9.0',
                'timeout': 1500,
                'apiKey': global_variables.apiKey,
                'secret': global_variables.secret,
                'category': 'other',
                'debug': true,
                'verbose': true
            };

            var breinify = new Breinify(config);

            expect(breinify).to.have.property('_api')
                .that.is.an('object')
                .that.deep.equals({
                url: 'api.breinify.com',
                host: 'localhost',
                port: '2000',
                version: '9.0',
                timeout: 1500,
                apiKey: global_variables.apiKey,
                secret: global_variables.secret,
                category: 'other',
                temporalDataEndpoint: '/temporaldata',
                lookupEndpoint: '/lookup',
                activityEndpoint: '/activity',
                validate: true,
                debug: true,
                verbose: true
            });

            done();

        });

        it('should get current version, url, port, and path of library', function (done) {
            var breinify = new Breinify();
            var version = breinify.version();
            expect(version).to.equal('1.0');
            var url = breinify.getUrl();
            expect(url).to.equal('api.breinify.com');

            var port = breinify.getPort();
            expect(port).to.equal('443');

            var activityEndpoint = breinify.activityEndpoint();
            expect(activityEndpoint).to.equal('/activity');

            done();
        });

        it('should have an error with empty config object', function (done) {
            var config = {};

            expect(function () {
                new Breinify(config);
            }).to.throw("Please configure Breinify...");

            done();

        });

        it('should have an error with undefined config object', function (done) {
            var config = {};

            expect(function () {
                new Breinify(config);
            }).to.throw("Please configure Breinify...");

            done();

        });

        it('should have an error with empty key', function (done) {
            var config = {
                'apiKey': ''
            };

            expect(function () {
                new Breinify(config);
            }).to.throw("Breinify is missing an api key. If you do not have one yet, please visit https://www.breinify.com to make an account");

            done();

        });

        it('should have an error with undefined key', function (done) {
            var config = {
                'host': 'localhost',
                'port': '8080'
            };

            expect(function () {
                new Breinify(config);
            }).to.throw("Breinify is missing an api key. If you do not have one yet, please visit https://www.breinify.com to make an account");

            done();

        });
    });
});