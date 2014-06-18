'use strict';

module.exports = function (dbModels, passport) {

    return {

        signin : require('./signin')(passport),
        users  : require('./users')(dbModels.user)

    }

};
