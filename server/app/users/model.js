'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function (db) {

    var _userSchema = new mongoose.Schema({

        username  : String,
        password  : String,
        firstname : String,
        lastname  : String,
        roles     : [String]

    });

    var _roles = {
        user  : 'user',
        admin : 'admin'
    };

    // generating a hash
    _userSchema.statics.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    _userSchema.methods.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    return {

        model : db.model('User', _userSchema),

        data : {
            roles : _roles
        }

    }

};
