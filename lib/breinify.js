'use strict';

var util = require('./util');
var overload = require('./overload');

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
        recommendationEndpoint: '/recommendation',
        temporalDataEndpoint: '/temporaldata',
        validate: true,
        debug: false,
        verbose: false
    };

    /* istanbul ignore else  */
    if (!util.isUndefinedorNull(config)) {
        this.setConfig(config);
    }
}

overload.setExcludeNullType(function (type) {
    return type === 'Boolean' || type === 'Function';
});

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

    temporalDataEndpoint: function () {
        return this._api['temporalDataEndpoint'];
    },

    recommendationEndpoint: function () {
        return this._api['recommendationEndpoint'];
    },

    recommendation: function () {
        overload.overload({
            'Object,Function': function (user, callback) {
                this._recommendation(user, {
                    'numRecommendations': 10,
                    'recommendationDisableCache': true
                }, null, callback);
            },
            'Object,Object,Function': function (user, recommendation, callback) {
                this._recommendation(user, recommendation, null, callback);
            }
        }, arguments, this);
    },

    _recommendation: function (user, recommendation, sign, callback) {

        // need a valid user
        if (util.isEmpty(user)) {
            this._handleError(callback, 'Please send in an user');
            return;
        } else if (util.isEmpty(recommendation)) {
            this._handleError(callback, 'Please specify the requested recommendation attributes');
            return;
        }

        var config = this.config();
        var endpoint = this.recommendationEndpoint();
        sign = this._sign(sign);

        var payload = {
            'apiKey': config.apiKey,
            'unixTimestamp': Math.floor(Date.now() / 1000),
            'user': user,
            'recommendation': recommendation
        };
        if (sign) {
            var message = '' + payload.unixTimestamp;
            payload.signature = this._generateSignature(config.secret, message);
        }

        this._sendApiRequest(endpoint, payload, callback);
    },

    temporalData: function () {
        overload.overload({
            'String,Function': function (ipAddress, callback) {
                this._temporalData(ipAddress, null, null, null, null, null, null, callback);
            },
            'String,Boolean,Function': function (ipAddress, sign, callback) {
                this._temporalData(ipAddress, null, null, null, null, null, sign, callback);
            },
            'Date,Function': function (localDateTime, callback) {
                this._temporalData(null, localDateTime.toString(), null, null, null, null, null, callback);
            },
            'Date,Boolean,Function': function (localDateTime, sign, callback) {
                this._temporalData(null, localDateTime.toString(), null, null, null, null, sign, callback);
            },
            'String,String,Function': function (localDateTime, timezone, callback) {
                this._temporalData(null, localDateTime, timezone, null, null, null, null, callback);
            },
            'String,String,Boolean,Function': function (localDateTime, timezone, sign, callback) {
                this._temporalData(null, localDateTime, timezone, null, null, null, sign, callback);
            },
            'Number,Number,Function': function (latitude, longitude, callback) {
                this._temporalData(null, null, null, latitude, longitude, null, null, callback);
            },
            'Number,Number,Boolean,Function': function (latitude, longitude, sign, callback) {
                this._temporalData(ipAddress, null, null, null, latitude, longitude, null, sign, callback);
            },
            'Object,Function': function (user, callback) {
                this.__temporalData(user, null, callback);
            },
            'Object,Boolean,Function': function (user, sign, callback) {
                this.__temporalData(user, sign, callback);
            },
            'String,String,String,Number,Number,String,Boolean,Function': function (ipAddress, localDateTime, timezone, latitude, longitude, userAgent, sign, callback) {
                this._temporalData(ipAddress, localDateTime, timezone, latitude, longitude, userAgent, sign, callback);
            }
        }, arguments, this);
    },

    _temporalData: function (ipAddress, localDateTime, timezone, latitude, longitude, userAgent, sign, callback) {

        // get the location
        var location;
        if (latitude == null || longitude == null) {
            location = null;
        } else {
            location = {
                'latitude': latitude,
                'longitude': longitude
            }
        }

        var user = {
            'additional': {
                'localDateTime': localDateTime,
                'timezone': timezone,
                'userAgent': userAgent,
                'location': location,
                'ipAddress': ipAddress
            }
        };

        this.__temporalData(user, sign, callback);
    },

    __temporalData: function (user, sign, callback) {
        var config = this.config();
        var endpoint = this.temporalDataEndpoint();
        sign = this._sign(sign);

        // let's check if it's a user or an additional object
        if (typeof user.additional === 'undefined') {
            user = {'additional': user};
        }

        var payload = {
            'apiKey': config.apiKey,
            'unixTimestamp': Math.floor(Date.now() / 1000),
            'user': user
        };

        if (sign) {
            var additional = payload.user.additional;

            var message = '';
            message += payload.unixTimestamp;
            message += '-';
            message += util.isEmpty(additional.localDateTime) ? '' : additional.localDateTime;
            message += '-';
            message += util.isEmpty(additional.timezone) ? '' : additional.timezone;

            payload.signature = this._generateSignature(config.secret, message);
        }

        this._sendApiRequest(endpoint, payload, callback);
    },

    /**
     *
     * @param user {object} the user-information
     * @param type {string} the type of activity
     * @param description {string | null} description of activity such as search query
     * @param tags: {string | null} comma-separated tags associated with this specific activity
     * @param category {string |null} category, if null, defaults
     * @param sign {boolean | null} true if a signature should be added (needs the secret to be configured - not recommended in open systems), otherwise false (can be null or undefined)
     * @param callback {function | null} optional callback
     */
    activity: function (user, type, description, tags, category, sign, callback) {

        // need a valid user
        if (util.isEmpty(user)) {
            this._handleError(callback, 'Please send in an user');
            return;
        }
        // need a valid type
        else if (util.isEmpty(type)) {
            this._handleError(callback, 'Please send in an activity type');
            return;
        }

        // get the endpoint and create the default payload
        var endpoint = this.activityEndpoint();
        var payload = this._generateActivityPayload(user, type, description, tags, category);
        var config = this.config();
        sign = this._sign(sign);

        // create the signature if we need one
        if (sign) {

            // message is the "%s%d%d", type, unixTimeStamp in seconds, size of activities
            var message = type + Math.floor(payload.unixTimestamp).toString() + "1";
            var signature = this._generateSignature(this._api.secret, message);

            if (signature instanceof Error) {
                this._handleError(callback, signature);
                return;
            }

            payload.signature = signature;
        }

        this._sendApiRequest(endpoint, payload, callback);
    },

    /**
     * Method used to determine if the send message should be signed. The user can (and as usual with JavaScript,
     * this means it's optional) send a sign information (i.e., true or false). The method determines based on the
     * passed parameter and the configuration, if the message should be signed.
     *
     * @param sign the value passed by the user (may be undefined, null, or any other value)
     * @returns {boolean} true if the message should be signed, otherwise false
     * @private
     */
    _sign: function (sign) {
        var isSigned = util.bool(sign);
        return isSigned === -1 ? !util.isEmpty(this.config().secret) : isSigned === 1;
    },

    _generateActivityPayload: function (user, type, description, tags, category) {

        var payload = {};
        payload.user = user;
        payload.apiKey = this.config().apiKey;
        payload.unixTimestamp = Math.floor(Date.now() / 1000);

        payload.activity = {};
        payload.activity.type = type;
        payload.activity.description = description;
        payload.activity.tags = tags;
        payload.activity.category = category == null ? this._api.category : category;

        return payload;

    },

    /**
     * @param secret the secret
     * @param message the message to be signed
     */
    _generateSignature: function (secret, message) {
        var config = this.config();

        if (typeof secret !== 'string' || util.isEmpty(secret)) {
            if (config.verbose) {
                console.log('Error: Please set your Breinify secret with setConfig()');
            }
            return new Error('Please set your Breinify secret with setConfig()');

        } else if (typeof message !== 'string' || util.isEmpty(message)) {
            if (config.verbose) {
                console.log('Error: Your message needs to be an non-empty string');
            }
            return (new Error('Your message needs to be an non-empty string'));

        } else {
            //noinspection JSUnresolvedFunction
            var hash = CryptoJS.HmacSHA256(message, secret);
            return CryptoJS.enc.Base64.stringify(hash);
        }
    },

    _parseProtocol: function (host) {
        if (host.indexOf('https') === 0 || host === 'api.breinify.com') {
            return 'https';
        } else {
            return 'http';
        }
    },

    _handleError: function (callback, message) {

        if (this.config().verbose) {
            if (error) {
                console.log('Error:', message);
            } else {
                console.log(message);
            }
        }

        if (typeof callback == 'function') {
            if (message instanceof Error) {
                callback(message);
            } else {
                callback(new Error(message));
            }
        }
    },

    _sendApiRequest: function (endpoint, payload, callback) {
        var config = this.config();
        this._sendRequest('POST', endpoint, payload, function (result) {
            if (config.verbose) {
                console.log(result);
            }

            if (typeof callback == 'function') {
                callback(result);
            }
        });
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


