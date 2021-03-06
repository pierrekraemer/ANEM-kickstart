'use strict';

angular.module('main.admin', [
    'ui.router',
    'userAuth',
    'menu',
    'main.admin.users'
])

.config(['$stateProvider', 'USER_ROLES',

    function ($stateProvider, USER_ROLES) {

        $stateProvider

        .state('admin', {
            abstract : true,
            url      : '/admin',
            views    : {
                'main' : {
                    template : '<div ui-view="admin"></div>',
                }
            },
            data     : {
                authorizedRoles : [ USER_ROLES.admin ],
                pageTitle       : 'Admin'
            }
        });

    }

]);
