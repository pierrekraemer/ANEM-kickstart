'use strict';

module.exports = function (dbModels, passport) {

    return {

        signin : require('./signin')(passport),
        user   : require('./user')(dbModels.user)

    }

};
