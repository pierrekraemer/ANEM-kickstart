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
  |  |  |-app.js               --> top-level (main) module definition
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
```

### Server side

```
server/
  |-server.js
  |-config/
  |-controllers/
  |  |-index.js
  |  |-signin.js
  |  |-user.js
  |-db/
  |  |-index.js
  |  |-user.js
  |-routes/
  |  |-index.js
  |  |-signin.js
  |  |-user.js
```

The `grunt` task creates a `public` directory that contains all the client files to be served statically by the server (views, js, css, assets).
JavaScript and CSS are concatenated into `app_name.app_version.js` and `app_name.app_version.css` files.


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
