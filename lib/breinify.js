'use strict';

require("util-is");
var util = require("util");

var http = require('http');
var https = require('https');

var CryptoJS = require("crypto-js");

Breinify.DEFAULT_URL = 'api.breinify.com';
Breinify.DEFAULT_PORT = '443';
Breinify.DEFAULT_API_VERSION = '1.0';

// Use node's default timeout:
Breinify.DEFAULT_TIMEOUT = http.createServer().timeout;
Breinify.PACKAGE_VERSION = require('../package.json').version;

function Breinify(config) {

    this._api = {
        url: Breinify.DEFAULT_URL,
        host: Breinify.DEFAULT_URL,
        port: Breinify.DEFAULT_PORT,
        version: Breinify.DEFAULT_API_VERSION,
        timeout: Breinify.DEFAULT_TIMEOUT,
        apiKey: null,
        secret: null,
        category: null,
        lookupEndpoint: '/lookup',
        activityEndpoint: '/activity',
        validate: true,
        debug: false,
        verbose: false
    };

    /* istanbul ignore else  */
    if (!util.isUndefined(config) && !util.isNull(config)) {
        this.setConfig(config);
    }
}

Breinify.prototype = {

    config: function () {
        return this._api;
    },

    version: function () {
        return this._api['version'];
    },

    setConfig: function (config) {

        //noinspection JSUnresolvedFunction
        if (util.isEmpty(config)) {
            throw new Error("Please configure Breinify...");
        } else { //noinspection JSUnresolvedFunction
            if (util.isEmpty(config.apiKey)) {
                throw new Error('Breinify is missing an api key. If you do not have one yet, please visit https://www.breinify.com to make an account');
            } else {
                for (var key in config) {
                    /* istanbul ignore else  */
                    if (config.hasOwnProperty(key) && this._api.hasOwnProperty(key)) {
                        this._api[key] = config[key];
                    }
                }
            }
        }
    },

    getUrl: function () {
        return this._api['url'];
    },

    getPort: function () {
        return this._api['port'];
    },

    activityEndpoint: function () {
        return this._api['activityEndpoint'];
    },

    /**
     *
     * @param user {object} the user-information
     * @param type {string} the type of activity
     * @param description {string | null} description of activity such as search query
     * @param tags: {string | null} comma-separated tags associated with this specific activity
     * @param category {string |null} category, if null, defaults
     * @param sign {boolean | null} true if a signature should be added (needs the secret to be configured - not recommended in open systems), otherwise false (can be null or undefined)
     * @param callback
     * @returns {Error}
     */
    activity: function (user, type, description, tags, category, sign, callback) {

        // var config = this.config();

        var activityPayload = {};

        /** check for if an user is sent in **/
        /* istanbul ignore else  */
        if (util.isEmpty(user)) {
            if (this._api.verbose) {
                console.log('Error: Please send in an user');
            }
            callback(new Error('Please send in an user'));
        } else { //noinspection JSUnresolvedFunction
            if (util.isEmpty(type)) {
                //should check if string
                /** check for if an activity is sent in **/
                if (this._api.verbose) {
                    console.log('Error: Please send in an activity');
                }

                callback(new Error('Please send in an activity'));
            } else {

                var activityObj = this._generateGeneralPayload(user, type, description, tags, category);
                var endpoint = this._api.activityEndpoint;

                if (sign) {
                    var signature = this._generateSignature(this._api.secret, type, activityObj.unixTimestamp);

                    if (signature instanceof Error) {
                        if (this._api.verbose) {
                            console.log(signature);
                        }
                        callback(signature);
                    } else {
                        activityObj.signature = signature;
                        this._sendRequest('POST', endpoint, activityObj, function (activityResult) {
                            callback(activityResult);
                        });
                    }
                } else {
                    this._sendRequest('POST', endpoint, activityObj, function (activityResult) {
                        callback(activityResult);
                    });
                }
            }
        }
    },

    _generateGeneralPayload: function (user, type, description, tags, category) {

        var payload = {};
        payload.user = user;
        payload.apiKey = this._api.apiKey;
        payload.unixTimestamp = Math.floor(Date.now() / 1000);

        payload.activity = {};
        payload.activity.type = type;
        payload.activity.description = description;
        payload.activity.tags = tags;
        payload.activity.category = category == null ? this._api.category : category;

        return payload;

    },

    /**
     * activity: [string] type
     * lookup: [comma separate string] dimensions
     * @param secret
     * @param payload
     * @param timestamp: Date.now() in seconds
     */
    _generateSignature: function (secret, payload, timestamp) {
        var config = this.config();

        if (typeof secret !== 'string' || util.isEmpty(secret)) {
            if (config.verbose) {
                console.log('Error: Please set your Breinify secret with setConfig()');
            }
            return new Error('Please set your Breinify secret with setConfig()');

        } else if (typeof payload !== 'string' || util.isEmpty(payload)) {
            if (config.verbose) {
                console.log('Error: Your payload needs to be an non-empty string');
            }
            return (new Error('Your payload needs to be an non-empty string'));

        } else {
            //message is the "%s%d%d", payload, unixTimeStamp in seconds, size of payload
            var payloadStr = util._extend(payload);

            var payloadSize = payloadStr.split(',');

            var message = payload + Math.floor(timestamp).toString() + payloadSize.length.toString();

            var hash = CryptoJS.HmacSHA256(message, secret);
            var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

            return hashInBase64;
        }
    },

    _parseProtocol: function (host) {
        if (host.startsWith("https") || host === 'api.breinify.com') {
            return 'https';
        } else {
            return 'http';
        }
    },

    _sendRequest: function (method, path, payload, cb) {
        var data = JSON.stringify(payload);
        var config = this.config();

        var options = {
            host: config.host,
            port: config.port,
            path: path,
            data: data,
            method: 'POST',
            headers: {}
        };

        var protocol = (this._parseProtocol(config.host) == 'https' ? https : http);

        var req = protocol.request(options, function (response) {

            //noinspection JSUnresolvedFunction
            response.setEncoding('utf8');

            var bc = '';
            response.on('data', function (chunk) {
                bc += chunk;
            });

            response.on('end', function () {
                if (response.statusCode == 200) {
                    cb(JSON.parse(bc));
                } else if (response.statusCode == 403) {
                    cb(new Error('Breinify ' + response.statusCode + ': Please check if you are using a key that requires a signature. If so, please enable TRUE on the SIGNATURE [boolean] and set your secret'));
                } else if (response.statusCode >= 400 && response.statusCode < 500) {
                    cb(new Error('Breinify ' + response.statusCode + ': Seems you are trying to do something not so good'));
                } else {
                    cb(new Error('Breinify - Service Down'));
                }
            })
        }).on('error', function (e) {
            if (config.debug) {
                console.log("Error: " + e.message);
            }

            cb(e);
        });

        req.end(data);
    }
};

module.exports = Breinify;


