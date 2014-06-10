'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function (mongoose) {

    var userSchema = new mongoose.Schema({

        username  : String,
        password  : String,
        firstname : String,
        lastname  : String,
        roles     : [String]

    });

    // generating a hash
    userSchema.statics.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    userSchema.methods.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    return {

        model : mongoose.model('User', userSchema),

        data : {
            roles : {
                user  : 'user',
                admin : 'admin'
            }
        }

    }

};
