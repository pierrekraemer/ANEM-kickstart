'use strict';

angular.module('userAuth', [])

.constant('USER_ROLES', {
    user  : 'user',
    admin : 'admin'
})

.factory('TokenInterceptor', [ '$window',

    function ($window) {
        return {
            request : function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            }
        };
    }

])

.factory('AuthService', [ '$http', '$window',

    function ($http, $window) {

        var _user = null;
        var _userRoles = {};

        return {

            getRoles : function () {
                return $http
                .get('/api/users/roles')
                .then(function (res) {
                    _userRoles = res.data;
                });
            },

            userRoles : function () {
                return _userRoles;
            },

            signin : function (credentials) {
                return $http
                .post('/api/users/signin', credentials)
                .then(
                    function (res) {
                        $window.sessionStorage.token = res.data.token;
                        _user = res.data.user;
                        return { success : true };
                    },
                    function (res) {
                        return { success : false, message : res.data.message };
                    }
                );
            },

            signout : function () {
                delete $window.sessionStorage.token;
                _user = null;
            },

            currentUser : function () {
                return _user;
            },

            hasAuthToken : function () {
                return angular.isDefined($window.sessionStorage.token);
            },

            tryRemoteAuth : function () {
                return $http
                .get('/api/users/whoami')
                .then(
                    function (res) {
                        _user = res.data.user;
                        return true;
                    },
                    function (res) {
                        _user = null;
                        return false;
                    }
                );
            },

            isAuthenticated : function () {
                return _user !== null;
            },

            isAuthorized : function (authorizedRoles) {
                if (this.isAuthenticated()) {
                    for (var i = 0; i < _user.roles.length; i++) {
                        if (authorizedRoles.indexOf(_user.roles[i]) > -1) {
                            return true;
                        }
                    }
                }
                return false;
            }

        };
    }
])

;
