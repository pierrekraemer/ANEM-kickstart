'use strict';

module.exports = function (userModel) {

    var User = userModel.model;
    var USER_ROLES = userModel.data.roles;

    return {

        accessControl : function (req, res, next) {
            if (req.isAuthenticated()) {
                if (req.user.roles.indexOf(USER_ROLES.admin) > -1) {
                    return next();
                } else {
                    res.send(403, 'unauthorized resource');
                }
            } else {
                res.send(401, 'authentication required');
            }
        },

        getAll : function (req, res) {
            User.find({}, function (err, users) {
                res.json(users);
            });
        },

        getById : function (req, res) {
            User.findById(req.params.id, function (err, user) {
                res.json(user);
            });
        },

        create : function (req, res) {
            User.findOne({ 'username' : req.body.username }, function (err, user) {
                if (err) {
                    res.json({ success : false });
                }
                if (user) {
                    res.json({ success : false, message : 'Username already taken.' });
                } else {
                    var newUser = new User();

                    newUser.username  = req.body.username;
                    newUser.password  = User.generateHash(req.body.password);
                    newUser.firstname = req.body.firstname;
                    newUser.lastname  = req.body.lastname;
                    newUser.roles     = [ USER_ROLES.user ];

                    newUser.save(function (err) {
                        if (err) {
                            res.json({ success : false });
                        } else {
                            res.json({ success : true, user : newUser });
                        }
                    });
                }
            });
        },

        update : function (req, res, next) {
            if (req.body.hasOwnProperty('password')) {
                req.body.password = User.generateHash(req.body.password);
            }
            User.findByIdAndUpdate(req.params.id, req.body, function (err) {
                if (err) {
                    res.json({ success : false });
                } else {
                    res.json({ success : true });
                }
            });
        },

        delete : function (req, res, next) {
            User.findByIdAndRemove(req.params.id, function (err) {
                if (err) {
                    res.json({ success : false });
                } else {
                    res.json({ success : true });
                }
            });
        }

    }

};
