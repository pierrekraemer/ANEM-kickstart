'use strict';

module.exports = function (ctrl, userRoles) {

	return [

		{
			accessControl : 'public',
			routes : [
				{ verb : 'post', url : '/signin', fun : ctrl.signin },
				{ verb : 'get', url : '/signout', fun : ctrl.signout },
				{ verb : 'get', url : '/signedin', fun : ctrl.signedin }
			]
		},

		{
			accessControl : function (req, res, next) {
				if (req.isAuthenticated()) {
					if (req.user.roles.indexOf(userRoles.admin) > -1) {
						return next();
					} else {
						res.send(403, 'unauthorized resource');
					}
				} else {
					res.send(401, 'authentication required');
				}
			},
			routes : [
				{ verb : 'get', url : '/', fun : ctrl.getAll },
				{ verb : 'get', url : '/count', fun : ctrl.count },
				{ verb : 'get', url : '/:nbPerPage/:currentPage', fun : ctrl.getPage },
				{ verb : 'get', url : '/:id', fun : ctrl.getById },

				{ verb : 'post', url : '/', fun : ctrl.create },

				{ verb : 'put', url : '/:id', fun : ctrl.update },

				{ verb : 'delete', url : '/:id', fun : ctrl.delete }
			]
		}

	];

};
