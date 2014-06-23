'use strict';

var passport = require('passport');

module.exports = function () {

	var _user,
		_ctrl,
		_routes;

	var _filterAccess = function (authorizedRoles) {
		return function (req, res, next) {
			if (req.isAuthenticated()) {
				for (var i = 0; i < req.user.roles.length; i++) {
					if (authorizedRoles.indexOf(req.user.roles[i]) > -1) {
						return next();
					}
				}
				res.send(403, 'unauthorized resource');
			} else {
				res.send(401, 'authentication required');
			}
		}
	}

	return {

		name : 'users',

		attach : function (options) {
			_user = require('./model')(this.db);
			_ctrl = require('./controller')(_user);

			this.users = {
				model : _user.model,
				roles : _user.data.roles,
				filterAccess : _filterAccess
			};

			_routes = require('./routes')(_ctrl, this.users);

		    require('./passport')(passport, _user.model);

			this.http.app.use(passport.initialize());
			this.http.app.use(passport.session());
		},

		detach : function() {

		},

		init : function (done) {
			this.loadRoutes(_routes, '/api/users');
			return done();
		}

	};

};
