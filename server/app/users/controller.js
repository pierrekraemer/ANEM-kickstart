'use strict';

var jsonwebtoken = require('jsonwebtoken');
var secret       = require('../../common/secret');

module.exports = function (user) {

	var User = user.model;
	var UserRoles = user.roles;

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
					return res.status(401).send({ message : 'authentication required' });
				}
				if (!user) {
					return res.status(401).send({ message : 'User not found !' });
				}
				if (!user.validPassword(password)) {
					return res.status(401).send({ message : 'Wrong password !' });
				}

				var userWOpw = {
					id : user._id,
					username : user.username,
					firstname : user.firstname,
					lastname : user.lastname,
					roles : user.roles,
				};

				var token = jsonwebtoken.sign(
					{
						id : user._id
						// roles : user.roles
					},
					secret,
					{
						expiresInMinutes: 60
					}
				);

				return res.json({ user : userWOpw, token : token});
			});
        },

        whoami : function (req, res) {
			User
			.findById(req.user.id)
			.select('-password')
			.exec(function (err, user) {
				if (err) {
					res.status(500).end();
				} else {
					res.json(user);
				}
			});
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
				if (err) {
					res.status(500).end();
				} else {
					res.json(users);
				}
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
				if (err) {
					res.status(500).end();
				} else {
					res.json(users);
				}
			});
		},

		count : function (req, res) {
			User
			.count(function (err, count) {
				if (err) {
					res.status(500).end();
				} else {
					res.json(count);
				}
			});
		},

		getById : function (req, res) {
			User
			.findById(req.params.id)
			.select('-password')
			.exec(function (err, user) {
				if (err) {
					res.status(500).end();
				} else {
					res.json(user);
				}
			});
		},

		create : function (req, res) {
			User
			.findOne({ 'username' : req.body.username }, function (err, user) {
				if (err) {
					res.status(500).end();
				}
				if (user) {
					res.status(400).send({ message : 'Username ' + req.body.username + ' already taken.' });
				} else {
					var newUser = new User();

					newUser.username  = req.body.username;
					newUser.password  = User.generateHash(req.body.password);
					newUser.firstname = req.body.firstname;
					newUser.lastname  = req.body.lastname;
					newUser.roles     = [ UserRoles.user ];

					newUser.save(function (err) {
						if (err) {
							res.status(500).end();
						} else {
							res.status(200).end();
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
					res.status(500).end();
				} else {
					res.status(200).end();
				}
			});
		},

		delete : function (req, res) {
			User
			.findByIdAndRemove(req.params.id, function (err) {
				if (err) {
					res.status(500).end();
				} else {
					res.status(200).end();
				}
			});
		}

	};

};
