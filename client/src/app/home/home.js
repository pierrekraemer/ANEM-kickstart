'use strict';

angular.module('main.home', [
    'ui.router'
])

.config(['$stateProvider',

    function ($stateProvider) {

        $stateProvider

        .state('home', {
            url   : '/',
            views : {
                'main' : {
                    controller  : 'HomeCtrl',
                    templateUrl : 'views/home/home.view.html'
                }
            },
            data  : {
                pageTitle : 'Home'
            }
        });

    }

])

.controller('HomeCtrl', ['$scope',

    function ($scope) {

    }

]);
