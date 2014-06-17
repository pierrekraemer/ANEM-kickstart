'use strict';

module.exports = function (app, express, userCtrl) {

    var router_user = express.Router();

    router_user.use(userCtrl.accessControl);

    router_user.get('/', userCtrl.getAll);
    router_user.get('/count', userCtrl.count);
    router_user.get('/:nbPerPage/:currentPage', userCtrl.getPage);
    router_user.get('/:id', userCtrl.getById);

    router_user.post('/', userCtrl.create);

    router_user.put('/:id', userCtrl.update);

    router_user.delete('/:id', userCtrl.delete);

    app.use('/api/admin/user', router_user);

};
