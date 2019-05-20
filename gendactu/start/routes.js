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

Route.get('/actu','DirigerController.isAdmin').middleware['auth'];
Route.on('actu').render('layouts.accueil').middleware['auth'];
Route.get('/user/department','UserController.getDepartment').middleware['auth'];
Route.get('/topic/:id','TopicController.show').middleware['auth'];
Route.get('/themes','ThemeController.alltheme');
Route.get('/departments','DepartmentController.allDepartment');

Route.group(() =>{
    Route.get('/nbPages/department/:id','TopicController.getNbPagesDepartment').middleware['auth'];
    Route.get('/nbPages/theme/:theme/department/:department','TopicController.getNbPagesTheme').middleware['auth'];
    Route.get('/department/:department/page/:page','TopicController.byDep').middleware['auth'];
    Route.get('/department/:department/theme/:theme/page/:page','TopicController.byDepTheme').middleware['auth'];
}).prefix('topics');

Route.group(()=>{
    Route.get('/topic/create','ThemeController.all').middleware['auth'];
    Route.get('/topic/:id/edit','TopicController.edit').middleware['auth'];
    Route.get('/','TopicController.gestion').middleware['auth'];
    Route.on('topics').render('layouts.gestion');

    Route.post('/topic/creation','TopicController.create').validator('TopicCreate').middleware['auth'];
    Route.put('/topic/:id/edit','TopicController.update').validator('TopicCreate').middleware['auth'];
    Route.delete('/topic/:id/image/delete','TopicController.deleteImage').middleware['auth'];
    Route.delete('topic/:id/delete','TopicController.delete').middleware['auth'];

}).prefix('gestion');
