'use strict';

module.exports = function (app,
                           express,
                           bodyParser,
                           cookieParser,
                           session,
                           methodOverride,
                           favicon,
                           dbModels,
                           passport,
                           logger,
                           publicPath) {

    app.use(favicon(publicPath + '/assets/favicon.ico'));
    app.use(express.static(publicPath));

    app.use(logger('dev'));

    app.use(cookieParser());
    app.use(bodyParser());

    app.use(methodOverride());

    app.use(session({
        secret: 'thisismysecret',
        cookie: { maxAge: (86400 * 1000) } // 24h
    }));

    require('./passport')(passport, dbModels.user);

    app.use(passport.initialize());
    app.use(passport.session());

};
