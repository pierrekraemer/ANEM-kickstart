'use strict';

angular.module('main.about', [
    'ui.router'
])

.config(['$stateProvider',

    function ($stateProvider) {

        $stateProvider

        .state('about', {
            url         : '/about',
            views       : {
                'main' : {
                    controller  : 'AboutCtrl',
                    templateUrl : 'views/about/about.view.html'
                }
            },
            data  : {
                pageTitle : 'About'
            }
        });

    }

])

.controller('AboutCtrl', ['$scope',

    function ($scope) {

    }

]);
