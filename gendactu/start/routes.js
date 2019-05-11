'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index');
Route.get('actu','TopicController.home');
Route.on('actu').render('layouts.accueil');
Route.on('/index').render('auth.login');
Route.post('/index','UserController.login').validator('ConnectUser');

Route.get('/topic/:id','TopicController.show')