'use strict';

var broadway = require('broadway');
var path     = require('path');


var app = new broadway.App();


app.use(require('./plugins/db')());
app.use(require('./plugins/http')(), { publicPath : path.resolve('../public/') });
app.use(require('./plugins/users')());


app.init(function (err) {

    app.emit('load');

});
