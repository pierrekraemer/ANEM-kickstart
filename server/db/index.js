'use strict';

module.exports = function (mongoose) {

    return {

        connect : function () {
            var urlDB = 'mongodb://localhost/test';
            mongoose.connect(urlDB);
        },

        models : {
            user : require('./user')(mongoose)
        }

    }

};
