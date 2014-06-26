'use strict';

module.exports = function () {

	var _user,
		_ctrl,
		_routes;

	return {

		name : 'users',

		attach : function (options) {
			_user = require('./model')(this.db);
			_ctrl = require('./controller')(_user);

			this.users = {
				model : _user.model,
				roles : _user.data.roles
			};

			_routes = require('./routes')(_ctrl, this.users.roles, this.generateAccessFilter);
		},

		detach : function() {

		},

		init : function (done) {
			this.loadRoutes(_routes, '/api/users');
			return done();
		}

	};

};
