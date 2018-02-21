var util = {

    isEmpty: function (obj) {

        if (typeof obj === 'string') {
            return obj.length === 0;
        } else if (obj !== null && typeof obj === 'object') {
            return Object.keys(obj).length === 0;
        } else {
            return this.isUndefinedorNull(obj);
        }
    },

    /**
     * The method checks if obj is a 'true' boolean, i.e., is a boolean value (typeof boolean), is a string containing
     * the word true or false (case-insensitive), or is a number equal to 0 or 1. In all other cases, the method
     * returns -1.
     *
     * @param obj
     * @returns {number}
     */
    bool: function (obj) {

        if (typeof obj === 'boolean') {
            return obj === true ? 1 : 0;
        } else if (typeof obj === 'string') {
            return 'true' === obj.toLowerCase() ? 1 : ('false' === obj.toLowerCase() ? 0 : -1);
        } else if (typeof obj === 'number') {
            return obj === 1 ? 1 : (obj === 0 ? 0 : -1);
        } else {
            return -1;
        }
    },

    isUndefinedorNull: function (obj) {
        return obj == null || typeof obj === 'undefined';
    }

};

module.exports = util;