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
const Route = use('Route');

Route.on('/').render('index');
Route.on('/index').render('index');
Route.post('/login','UserController.login').validator('ConnectUser');
Route.get('/logout','UserController.logout');

Route.get('/actu','DirigerController.isAdmin');
Route.on('actu').render('layouts.accueil').middleware['auth'];

Route.get('/topic/:id','TopicController.show');
Route.get('/themes','ThemeController.alltheme');
Route.get('/departments','DepartmentController.allDepartment');

Route.group(() =>{
    Route.get('nbPages/department/:id','TopicController.getNbPagesDepartment');
    Route.get('nbPages/theme/:theme/department/:department','TopicController.getNbPagesTheme');
    Route.get('/department/:department/page/:page','TopicController.byDep');
    Route.get('department/:department/theme/:theme/page/:page','TopicController.byDepTheme');
}).prefix('topics');

Route.group(()=>{
    Route.get('/topic/create','ThemeController.all');
    Route.get('/topic/:id/edit','TopicController.edit');
    Route.get('/','TopicController.gestion');
    Route.on('topics').render('layouts.gestion');

    Route.post('/topic/create','TopicController.create').validator('TopicCreate');
    Route.put('/topic/:id/edit','TopicController.update').validator('TopicCreate');
    Route.delete('/topic/:id/image/delete','TopicController.deleteImage');
    Route.delete('topic/:id/delete','TopicController.delete');

}).prefix('gestion');
