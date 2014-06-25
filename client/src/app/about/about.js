'use strict';

angular.module('main.about', [
    'ui.router',
    'menu'
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

.run(['MenuService',

    function (MenuService) {
        MenuService.addMenuItem('About', 'about');
    }

])

.controller('AboutCtrl', ['$scope',

    function ($scope) {

    }

]);
