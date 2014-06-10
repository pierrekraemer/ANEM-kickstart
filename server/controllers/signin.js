'use strict';

module.exports = function (passport) {

    return {

        signin : function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err); // generate a 500 error
                }
                if (! user) {
                    return res.json({ success : false, message : info.message });
                }
                req.login(user, function (err) {
                    if (err)
                        return next(err);
                    return res.json({ success : true, message : info.message, user : user });
                });
            })(req, res, next);
        },

        signedin : function (req, res) {
            if (req.isAuthenticated()) {
                res.json({ success : true, user : req.user });
            } else {
                res.json({ success : false });
            }
        },

        signout : function (req, res) {
            req.logout();
            res.send(200);
        }

    }

}
