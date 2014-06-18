'use strict';

module.exports = function (mongoose) {

    var _urlDB = 'mongodb://localhost/ANEM-kickstart';

    return {

        connect : function () {
            mongoose.connect(_urlDB);
        },

        models : {
            user : require('./user')(mongoose)
        }

    }

};
