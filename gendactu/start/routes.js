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
Route.on('actu').render('layouts.accueil');
Route.on('/index').render('auth.login');
Route.post('/index','UserController.login').validator('ConnectUser');


Route.get('/topic/:id','TopicController.show');
Route.get('/themes','ThemeController.alltheme');
Route.get('/departments','DepartmentController.allDepartment');

Route.group(() =>{
    // add param gendarmerie
    Route.get('nbPages/:id','TopicController.getNbPages');
    Route.get(':department/:page','TopicController.byDep');
}).prefix('topics');


Route.group(()=>{
    Route.get('/topic/create','ThemeController.all');
    Route.get('/topic/edit/:id','TopicController.edit');
    Route.get('/','TopicController.gestion');
    Route.on('topics').render('layouts.gestion');

    Route.post('/topic/create','TopicController.create').validator('TopicCreate');
    Route.put('/topic/edit/:id','TopicController.update').validator('TopicCreate');
    Route.post('/topic/delete/image/:id','TopicController.deleteImage');
    Route.delete('topic/delete/:id','TopicController.delete');

}).prefix('gestion');
