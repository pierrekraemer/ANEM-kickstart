'use strict';

module.exports = function (userModel, passport) {

    return {

        signin : require('./signin')(passport),
        user   : require('./user')(userModel)

    }

};
