'use strict';

var mongoose = require('mongoose');

module.exports = function () {

    var _urlDB = 'mongodb://localhost/ANEM-kickstart';

    return {

        name : 'db',

        attach : function (options) {
            this.db = mongoose.createConnection(_urlDB);
        },

        detach : function() {

        },

        init : function (done) {
            return done();
        }

    };

};
