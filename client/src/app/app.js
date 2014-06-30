'use strict';

angular.module('main', [
    'ui.router',
    'userAuth',
    'menu',
    'main.home',
    'main.about',
    'main.user',
    'main.admin',
    'xeditable'
])

.constant('APP_NAME', 'ANEM-kickstart')

.config(['$urlRouterProvider', '$locationProvider', '$httpProvider',

    function ($urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('JWTInterceptor');
    }
])

.run(['$rootScope', '$state', 'AuthService',

    function ($rootScope, $state, AuthService) {
        $rootScope._toState = 'home';
        $rootScope._toParams = {};
        var _toData;

        $rootScope
        .$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.name !== 'signin') {
                $rootScope._toState = toState.name;
                $rootScope._toParams = toParams;
                _toData = toState.data;
            }
        });

        AuthService.tryRemoteAuth().then(function (signedin) {
            if (angular.isDefined(_toData) &&
                angular.isDefined(_toData.authorizedRoles)) {

                if (!signedin) {
                    $state.go('signin');
                }
                else if (!AuthService.isAuthorized(_toData.authorizedRoles)) {
                    $state.go('home');
                }
            }

            $rootScope
            .$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data) &&
                    angular.isDefined(toState.data.authorizedRoles)) {

                    if (!AuthService.isAuthenticated()) {
                        event.preventDefault();
                        $state.go('signin');
                    }
                    else if (!AuthService.isAuthorized(toState.data.authorizedRoles)) {
                        event.preventDefault();
                        $state.go('home');
                    }
                }
            });

        });
    }
])

.run(['editableOptions', 'editableThemes',

    function(editableOptions, editableThemes) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';
    }
])

.controller('MainCtrl', ['$scope', '$state', 'MenuService', 'AuthService', 'USER_ROLES', 'APP_NAME',

    function ($scope, $state, MenuService, AuthService, USER_ROLES, APP_NAME) {
        $scope.currentUser = AuthService.currentUser;
        $scope.isAuthenticated = AuthService.isAuthenticated;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.USER_ROLES = USER_ROLES;

        $scope.APP_NAME = APP_NAME;

        $scope.menuItems = MenuService.getMenu();
        $scope.menuCollapsed = true;

        $scope.signout = function () {
            AuthService.signout();
            $state.go('home');
        };

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams){
            if (angular.isDefined(toState.data) &&
                angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | ' + APP_NAME ;
            }
            $scope.menuCollapsed = true;
        });
    }
]);
