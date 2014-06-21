'use strict';

var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, User) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGN IN ===========================================================
    // =========================================================================

    passport.use('local', new LocalStrategy(
        {
            usernameField : 'username',
            passwordField : 'password'
            // passReqToCallback : true // allows to pass back the entire request to the callback
        },
        function (username, password, next) {
            // find a user whose username is the same as the forms username
            User.findOne({ 'username' : username }, function (err, user) {
                // if there are any errors, return the error
                if (err)
                    return next(err);
                // if a user with that username does not exist
                if (!user)
                    return next(null, false, { message : 'User not found.' });
                // if the password is not valid
                if (!user.validPassword(password))
                    return next(null, false, { message : 'Wrong password.' });

                return next(null, user, { message : 'Successfully signed in !' });
            });
        }
    ));

};
