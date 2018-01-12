/*!
 * simpleOverload v1.0
 * https://github.com/myfingersarebroken/simpleOverload
 *
 * Released under the MIT license
 *
 * Date: 2013-11-07
 */

function toString(pointer) {
    var output = '';

    var keys = Object.keys(pointer);
    keys.forEach(function (key) {
        output += '[' + key + '] ';
    });

    return output;
}

/**
 * As JS don't supports data types, implements an overload method.
 *
 * @function _$overload
 * @author Fernando Faria - It's a snippet from https://github.com/myfingersarebroken/aer
 */
function _$overload(pointer, args, context, wrapper) {
    var regex = /function\s+(\w+)s*/;
    var types = [];

    // create a string to identify the structure of the signature
    var containsRegEx = false;
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];

        var type;
        if (typeof arg === 'undefined' || arg === null) {
            type = '([A-Za-z0-9_\\-]+)';
            containsRegEx = true;
        } else {
            type = regex.exec(arg.constructor.toString())[1];
        }

        types.push(type);
    }

    // check which one of the functions can be used
    var func = null;
    if (containsRegEx) {
        var typeRegEx = new RegExp(types.toString(), 'i');

        Object.keys(pointer).forEach(function (key) {
            var matches = typeRegEx.exec(key);

            if (matches != null) {
                var exclude = false;
                for (var i = 1; i < matches.length; i++) {
                    if (wrapper.excludeNullType(matches[i])) {
                        exclude = true;
                        break;
                    }
                }

                if (exclude) {
                    // nothing to do
                } else if (func === null) {
                    func = pointer[key];
                } else {
                    throw new SyntaxError('Multiple signatures for  (' + types.toString() + ') found in: ' + toString(pointer));
                }
            }
        });
    } else {
        func = pointer[types.toString()];
    }
    if (typeof func !== 'function') {
        throw new SyntaxError('Invalid signature (' + types.toString() + ') found, use one of: ' + toString(pointer));
    }

    return func.apply(context, args);
}

function Wrapper() {
    this.excludeNullType = function(type) {
        return false;
    };
}

Wrapper.prototype = {
    setExcludeNullType: function (func) {
        if (typeof func == 'function') {
            this.excludeNullType = func;
        }
    },

    overload: function(o, arguments, context) {
        return _$overload(o, arguments, context, this);
    }
};

module.exports = new Wrapper();