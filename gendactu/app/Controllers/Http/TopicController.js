'use strict'

const Topic = use('App/Models/Topic')
const Department = use('App/Models/Department')
const Gendarmerie = use('App/Models/Gendarmerie')

class TopicController {
    async home({view}){
        const topics =  await Topic.all();
        const departments = await Department.all();
        return view.render('layouts.accueil',{topics : topics.toJSON(),departments : departments.toJSON()})

    }

    async show({response,session,params,view}){
        const id = params.id;
        const topic = await Topic.find(1);
        
        return view.render('layouts.topic',{topic : topic.toJSON()})
    }

}

module.exports = TopicController
