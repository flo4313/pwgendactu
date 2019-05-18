'use strict'

const Database = use('Database')
const Topic = use('App/Models/Topic')
const Theme = use('App/Models/Theme')
const Gendarmerie = use('App/Models/Gendarmerie')
const Diriger = use('App/Models/Diriger')
const Helpers = use('Helpers')


class TopicController {

    //Create

    // Creation d'un topic
    async create({request,response, params, session}){
        const topics = await Topic.last();
        console.log(topics);
        const size = topics.id+1;
        const topic = new Topic;
        topic.topicId = size;
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
        topic.author = 143000;
        topic.theme = request.input('theme');
        if(topic.theme ==null){
            session.flash({errorM:"Veuillez choisir un theme"});
            response.redirect('back');
        }
        else{
            try {
                await topic.save();
                session.flash({message:"Actualité créée"});
                response.redirect('back');
            } catch (error) {
                session.flash({message:"Actualité déjà existante"});
                response.redirect('back');
            }
        }
        
    }

    //Read

    //Fonction pour charger un topic et l'afficher
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

    //Fonction pour afficher un topic a modifier
    async edit({response,session,params,view}){
        const id = params.id;
        const topics = await Topic.query().where('topicId',id).first();
        const topic = topics.toJSON();        
        const themes = await Theme.all();        
        return view.render('layouts.edit',{topic : topic, themes : themes.toJSON()})
    }

    // Affiche les topics à gérer pour l'utilisateur
    async gestion({request,response}){
        const chefId = "00416873";
        const dirigers = await Diriger.query().where('chef',chefId).first();
        const diriger = dirigers.toJSON();
        const gendarmeries = await Gendarmerie.query().where('gendarmerieId',diriger.gendarmerie).first()
        const gendarmerie = gendarmeries.toJSON();
        const topics =  await Topic.query().where('author',gendarmerie.gendarmerieId).fetch();
        return response.json({
            topics : topics,
            gendarmerie : gendarmeries
        })
    }

    // Affiche le nombre de page d'un topic en fonction du departement
    async getNbPagesDepartment({params,request,response}){
        var dept = params.id;
        const topics =  await Database.raw('Select count(*) as nbTopics From topics t, gendarmeries g Where t.author = g.gendarmerieId and g.department = '+dept);
        var topic = topics[0];
        return response.json({
            nbP : topic
        })
    }

    // Affiche le nombre de page d'un topic en fonction du departement et du theme
    async getNbPagesTheme({params,request,response}){
        var dept = params.department;
        var theme = params.theme;
        const topics =  await Database.raw('Select count(*) as nbTopics From topics t, gendarmeries g Where t.author = g.gendarmerieId and g.department = '+dept +' and t.theme ='+theme);
        var topic = topics[0];
        return response.json({
            nbP : topic
        })
    }

    // Recuperer les topics d'un departement
    async byDep({params,request,response}){
        var res = 1;
        var dept = params.department;
        var page = params.page - 1;
        const nbP =  await Database.raw('Select count(*) as nbTopics From topics t, gendarmeries g Where t.author = g.gendarmerieId and g.department = '+dept);
        var nbT = nbP[0][0].nbTopics;
        page = page * 5;
        var nbTA = nbT - page;
        if(nbTA > 5){
            nbTA = 5 ;
        }
        const topics = await Database.raw("Select t.id, t.topicId, t.title, t.image, t.description, t.author, t.theme, t.created_at From topics t , gendarmeries g Where t.author = g.gendarmerieId and g.department = "+ dept+" Order by t.created_at Desc limit "+page+","+nbTA);
        if(topics[0][0]== null){
            res = null;
        }
        return response.json({    
            topics : topics[0],
            res : res
        })
    }

    //Recuperer les topics d'un departement et d'un theme
    async byDepTheme({params,auth,response}){
        const user = await auth.getUser();
        if (user != null){
            var res = 1;
            var dept = params.department;
            var theme = params.theme;
            var page = params.page - 1;
            const nbP =  await Database.raw('Select count(*) as nbTopics From topics t, gendarmeries g Where t.author = g.gendarmerieId and g.department = '+dept +' and t.theme ='+theme);
            var nbT = nbP[0][0].nbTopics ;
            page = page * 5;
            var nbTA = nbT - page;
            if(nbTA > 5){
                nbTA = 5 ;
            }
            const topics = await Database.raw("Select t.id, t.topicId, t.title, t.image, t.description, t.author, t.theme, t.created_at From topics t , gendarmeries g Where t.author = g.gendarmerieId and g.department = "+ dept+" and t.theme ="+ theme+" Order by t.created_at Desc limit "+page+","+nbTA);
            if(topics[0][0]== null){
                res = null;
            }
            return response.json({    
                topics : topics[0],
                res : res
            }
            )
        }
        else{
        }
    }

    //Update
    
    // Modification d'un topic
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

    
    
    //Delete

    // Supprimer une image
    async deleteImage({response,session,params}){
        let resultat = "no remove";
        const id = params.id;
        const topic = await Topic.query().where('topicId',id).first();
        if (topic){
            resultat = "remove";
        }
        topic.image = null;
        topic.save();
        session.flash({message: "L'image a été supprimée"});
        return response.json({
            valeur : resultat
        })
    }
    
    // Supprimer un topic
    async delete({response,params}){
        let resultat = "no remove";
        const topic = await Topic.query().where('topicId',params.id).first();
        if (topic){
            resultat = "remove";
            await  topic.delete();
        }
        return response.json({
            valeur : resultat
        })
    }

}

module.exports = TopicController
