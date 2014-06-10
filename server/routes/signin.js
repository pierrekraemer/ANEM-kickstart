'use strict';

module.exports = function (app, express, signinCtrl) {

    var router_signin = express.Router();

    router_signin.post('/signin', signinCtrl.signin);

    router_signin.get('/signedin', signinCtrl.signedin);
    router_signin.get('/signout', signinCtrl.signout);

    app.use('/api/', router_signin);

}
