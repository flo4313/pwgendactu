'use strict'

const Topic = use('App/Models/Topic')
const Department = use('App/Models/Department')
const Theme = use('App/Models/Theme')
const Gendarmerie = use('App/Models/Gendarmerie')
const Helpers = use('Helpers')


class TopicController {
    async home({view}){
        const topics =  await Topic.all();
        const departments = await Department.all();
        const themes = await Theme.all();
        return view.render('layouts.accueil',{topics : topics.toJSON(),departments : departments.toJSON(),themes : themes.toJSON()})
    }

    async show({response,session,params,view}){
        const id = params.id;
        const topics = await Topic.query().where('topicId',id).first();
        const topic = topics.toJSON();        
        const gendarmeries = await Gendarmerie.query().where('gendarmerieId',topic.author).first();
        const gendarmerie = gendarmeries.toJSON();        
        const themes = await Theme.query().where('themeId',topic.theme).first();
        const theme = themes.toJSON();        
        return view.render('layouts.topic',{topic : topic, theme : theme, gendarmerie: gendarmerie})
    }

    async edit({response,session,params,view}){
        const id = params.id;
        const topics = await Topic.query().where('topicId',id).first();
        const topic = topics.toJSON();        
        const themes = await Theme.all();        
        return view.render('layouts.edit',{topic : topic, themes : themes.toJSON()})
    }

    async update({response,request,session,params}){
        const id = params.id;
        const topic = await Topic.query().where('topicId',id).first();
        topic.title = request.input('title');
        topic.description = request.input('description');
        const file = request.file('image',{
            types: ['image'],
            size: '2mb'
          })
        
        if (file !=null){
            const fileName = topic.topicId +"."+file.subtype;
            topic.image = "/images/topics/" + fileName;
            await file.move(Helpers.publicPath('images/topics'), {
                name: fileName,
                overwrite: true
            })
            
            if (!file.moved()) {
                return file.error()
            }
        }
        topic.theme = request.input('theme');
        if(topic.theme ==null){
            session.flash({errorM:"Veuillez choisir un theme"});
            response.redirect('back');
        }
        else{
            try {
                topic.save();
                session.flash({message:"Actualité modifiée"});
                response.redirect('back');
                topic.save();
            } catch (error) {
                session.flash({message:"Echec de la modification"});
                response.redirect('back');
            }
        }
    }

    async deleteImage({response,session,params}){
        const id = params.id;
        const topic = await Topic.query().where('topicId',id).first();
        topic.image = null;
        topic.save();
        session.flash({message: "L'image a été supprimée"});
        return response.redirect('back');
    }

    async gestion({view}){
        const chefId = "00416873";
        const gendarmeries = await Gendarmerie.query().where('chef',chefId).first();
        const gendarmerie = gendarmeries.toJSON();
        const topics =  await Topic.query().where('author',gendarmerie.gendarmerieId).fetch();
        return view.render('layouts.gestion',{topics : topics.toJSON(), gendarmerie:gendarmerie})
    }

    async delete({response,session,params}){
        const topic = await Topic.query().where('topicId',params.id).first();
        console.log(topic);
        await  topic.delete();
        session.flash({message: 'Le topic a été supprimé'});
        return response.redirect('back');
    }

    async create({request, auth,response, session}){
        const topics = await Topic.all();
        const size = topics.size()+1;
        const topic = new Topic;
        topic.topicId = size + "43";
        topic.title = request.input('title');
        topic.description = request.input('description');
        const file = request.file('image',{
            types: ['image'],
            size: '2mb'
          })
        
        if (file !=null){
            const fileName = topic.topicId +"."+file.subtype;
            topic.image = "/images/topics/" + fileName;
            await file.move(Helpers.publicPath('images/topics'), {
                name: fileName,
                overwrite: true
            })
            
            if (!file.moved()) {
                return file.error()
            }
        }
        topic.author =143000;
        topic.theme = request.input('theme');
        if(topic.theme ==null){
            session.flash({errorM:"Veuillez choisir un theme"});
            response.redirect('back');
        }
        else{
            try {
                topic.save();
                session.flash({message:"Actualité créée"});
                response.redirect('back');
            } catch (error) {
                session.flash({message:"Actualité déjà existante"});
                response.redirect('back');
            }
        }
        
    }
}

module.exports = TopicController
