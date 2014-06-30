'use strict';

var jwt    = require('express-jwt');
var secret = require('./secret');

module.exports = function () {

    var _http;

    return {

        name : 'loadRoutes',

        attach : function (options) {

            _http = this.http;

            this.generateAccessFilter = function (authorizedRoles) {
                return function (req, res, next) {
                    if (req.user) {
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
            };

            this.loadRoutes = function (routes, routesRoot) {
                for (var i = 0; i < routes.length; i++) {
                    var router = _http.router();
                    var routesGroup = routes[i];
                    if (routesGroup.checkAuthorizationToken) {
                        router.use(jwt({ secret : secret }));
                    }
                    if (routesGroup.accessControl !== 'public') {
                        router.use(routesGroup.accessControl);
                    }
                    for (var j = 0; j < routesGroup.routes.length; j++) {
                        var route = routesGroup.routes[j];
                        router[route.verb](route.url, route.func);
                    }
                    _http.app.use(routesRoot, router);
                }
            };

        },

        detach : function() {

        },

        init : function (done) {
            // _http.app.error(function (err, req, res) {
            //     if (err instanceof UnauthorizedError) {
            //         if (err.code == 'credentials_required') {
            //             res.json({ success : false });
            //         }
            //     }
            // });
            return done();
        }

    }

};
