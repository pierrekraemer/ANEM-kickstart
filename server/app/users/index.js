'use strict';

module.exports = function () {

	var _ctrl;

	return {

		name : 'users',

		attach : function (options) {
			var user = require('./model')(this.db);
			_ctrl = require('./controller')(user);

			this.users = {
				model : user.model,
				roles : user.data.roles
			};
		},

		detach : function() {

		},

		init : function (done) {
			var routes = require('./routes')(_ctrl, this.users.roles, this.generateAccessFilter);
			this.loadRoutes(routes, '/api/users');
			return done();
		}

	};

};
