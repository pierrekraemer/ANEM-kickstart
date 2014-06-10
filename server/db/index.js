'use strict';

module.exports = function (mongoose) {

    return {

        connect : function () {
            var urlDB = 'mongodb://localhost/ANEM-kickstart';
            mongoose.connect(urlDB);
        },

        models : {
            user : require('./user')(mongoose)
        }

    }

};
