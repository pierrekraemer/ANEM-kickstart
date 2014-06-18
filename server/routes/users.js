'use strict';

module.exports = function (app, express, userCtrl) {

    var router_users = express.Router();

    router_users.use(userCtrl.accessControl);

    router_users.get('/', userCtrl.getAll);
    router_users.get('/count', userCtrl.count);
    router_users.get('/:nbPerPage/:currentPage', userCtrl.getPage);
    router_users.get('/:id', userCtrl.getById);

    router_users.post('/', userCtrl.create);

    router_users.put('/:id', userCtrl.update);

    router_users.delete('/:id', userCtrl.delete);

    app.use('/api/admin/users', router_users);

};
