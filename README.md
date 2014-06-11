ANEM-kickstart
==============

AngularJS NodeJS ExpressJS MongoDB web application kickstart

***

Quick start
-----------

First install [NodeJS](http://nodejs.org/) and [MongoDB](http://www.mongodb.org/), then:

```sh
$ git clone git://github.com/pierrekraemer/ANEM-kickstart
$ cd ANEM-kickstart
$ sudo npm -g install grunt-cli bower
$ npm install
$ bower install
$ grunt
```

Start a MongoDB server, then:

```sh
$ cd server
$ node server.js
```

The site should be available at : localhost:3000


Presentation
------------

`ANEM-kickstart` provides a starting point for a web application using
[NodeJS](http://nodejs.org/), [ExpressJS](http://expressjs.com/) and [MongoDB](http://www.mongodb.org/) on server side
and [AngularJS](https://angularjs.org/) on client side.

It provides user management with local authentification.
A user with 'admin' role gets access to a user administration section where he can create / update / delete users.

To create a first user manually in the database, do the following:

```sh
$ mongo
$ use ANEM-kickstart
$ db.users.insert({ firstname:'Bla', lastname:'Bla', username:'bla', password:'', roles:['user','admin'] })
```

The password should be generated using bcrypt (you can use an online like [this one](http://bcrypthashgenerator.apphb.com/)).


Structure
---------

### Client side

```
client/
  |-vendor/                    --> third-party libraries (installed by bower)
  |-src/                       --> application src
  |  |-index.html              --> main template
  |  |-app/
  |  |  |-app.js               --> top-level module definition
  |  |  |-about/
  |  |  |-home/                --> each section gets its own directory
  |  |  |  |-home.css          --> with its associated css,
  |  |  |  |-home.js           --> module definition (routes, controller, service, directive, filter, ...),
  |  |  |  |-home.view.html    --> and views
  |  |  |-admin/
  |  |  |  |-admin.js
  |  |  |  |-user/             --> sections can have sub-sections with the same structure
  |  |  |  |  |-user.css
  |  |  |  |  |-user.js
  |  |  |  |  |-user.view.html
  |  |  |-user/
  |  |-assets/                 --> application assets (images, ...)
  |  |-common/                 --> application wide stuff (services, directives, views, ...)
  |  |  |-userAuth/
  |  |  |  |-userAuth.js       --> user authentification service
```

The `grunt` task creates a `public` directory that contains all the client files to be served statically by the server (views, js, css, assets).
JavaScript and CSS are concatenated into `app_name.app_version.js` and `app_name.app_version.css` files.

You can launch `grunt watch` to automatically re-copy or re-generate modified client side code.

### Server side

```
server/
  |-server.js      --> main server file (require dependencies, our application & launch server)
  |-config/        --> configure middleware (static file server, logger, session, ...)
  |-controllers/   --> controllers contain application logic
  |  |-index.js
  |  |-signin.js   --> each group of functionalities defines its functions
  |  |-user.js         that are to be used by routes
  |-db/
  |  |-index.js    --> connects to mongoDB server
  |  |-user.js     --> models (mongoDB schemas) are defined here
  |-routes/
  |  |-index.js
  |  |-signin.js   --> each group of functionalities defines its routes
  |  |-user.js         and can do authorization filtering
```

The server must be relaunched to take code updates into account.
This destroys current session, as sessions are not persisted for the moment.


Customize
---------

To change the name of the application, you should change:
- the "name" field in package.json and bower.json
- the "APP_NAME" constant in client/src/app/app.js
- the css and js file names in client/src/index.html
- the name of the database in server/db/index.js


Roadmap
-------

- Use angular $ressource
- Use [intravenous](http://www.royjacobs.org/intravenous/) for NodeJS dependency injection 
