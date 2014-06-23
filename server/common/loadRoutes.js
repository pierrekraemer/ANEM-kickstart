'use strict';

module.exports = {

    name : 'loadRoutes',

    attach : function (options) {
        var http = this.http;
        this.loadRoutes = function (routes, routesRoot) {
            for (var i = 0; i < routes.length; i++) {
                var router = http.router();
                var routesGroup = routes[i];
                if (routesGroup.accessControl !== 'public') {
                    router.use(routesGroup.accessControl);
                }
                for (var j = 0; j < routesGroup.routes.length; j++) {
                    var route = routesGroup.routes[j];
                    switch (route.verb) {
                        case 'get'    : router.get(route.url, route.fun); break;
                        case 'post'   : router.post(route.url, route.fun); break;
                        case 'put'    : router.put(route.url, route.fun); break;
                        case 'delete' : router.delete(route.url, route.fun); break;
                    }
                }
                http.app.use(routesRoot, router);
            }
        }
    },

    detach : function() {

    },

    init : function (done) {
        return done();
    }

};
