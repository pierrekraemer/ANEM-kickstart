'use strict';

var jsonwebtoken = require('jsonwebtoken');
var secret       = require('../../common/secret');

module.exports = function (user) {

	var User = user.model;
	var UserRoles = user.data.roles;

	return {

		getRoles : function (req, res) {
			return res.json(UserRoles);
		},

        signin : function (req, res) {
        	var username = req.body.username || '';
        	var password = req.body.password || '';

			User
			.findOne({ 'username' : username }, function (err, user) {
				if (err) {
					return res.send(401, { message : 'authentication required' });
				}
				if (!user) {
					return res.send(401, { message : 'User not found !' });
				}
				if (!user.validPassword(password)) {
					return res.send(401, { message : 'Wrong password !' });
				}

				var userWOpw = {
					id : user._id,
					username : user.username,
					firstname : user.firstname,
					lastname : user.lastname,
					roles : user.roles,
				};

				var token = jsonwebtoken.sign(userWOpw, secret, { expiresInMinutes: 60 });
				return res.json({ user : userWOpw, token : token});
			});
        },

        whoami : function (req, res) {
        	return res.json({ user : req.user });
        },

        // signout : function (req, res) {
        //     delete req.user;
        //     return res.send(200);
        // },

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
			User
			.count(function (err, count) {
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
					newUser.roles     = [ UserRoles.user ];

					newUser.save(function (err) {
						if (err) {
							res.json({ success : false });
						} else {
							res.json({ success : true, user : newUser }); // TODO : remove password in response
						}
					});
				}
			});
		},

		update : function (req, res) {
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

		delete : function (req, res) {
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
