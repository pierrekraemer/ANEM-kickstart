'use strict';

var passport = require('passport');

module.exports = function (user) {

	var User = user.model;
	var USER_ROLES = user.data.roles;

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
        },

		getAll : function (req, res) {
			User
			.find()
			.select('-password')
			.sort('username')
			.exec(function (err, users) {
				res.json(users);
			});
		},

		getPage : function (req, res) {
			User
			.find()
			.select('-password')
			.sort('username')
			.skip((req.params.currentPage - 1) * req.params.nbPerPage)
			.limit(req.params.nbPerPage)
			.exec(function (err, users) {
				res.json(users);
			});
		},

		count : function (req, res) {
			User.count(function (err, count) {
				res.json(count);
			});
		},

		getById : function (req, res) {
			User
			.findById(req.params.id)
			.select('-password')
			.exec(function (err, user) {
				res.json(user);
			});
		},

		create : function (req, res) {
			User
			.findOne({ 'username' : req.body.username }, function (err, user) {
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
			User
			.findByIdAndUpdate(req.params.id, req.body, function (err) {
				if (err) {
					res.json({ success : false });
				} else {
					res.json({ success : true });
				}
			});
		},

		delete : function (req, res, next) {
			User
			.findByIdAndRemove(req.params.id, function (err) {
				if (err) {
					res.json({ success : false });
				} else {
					res.json({ success : true });
				}
			});
		}

	};

};
