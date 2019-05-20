'use strict'

const Theme = use('App/Models/Theme')
const Diriger = use('App/Models/Diriger')
const customException = use('App/Exceptions/CustomException')

class ThemeController {
    async all({view,auth}){
        const user = await auth.getUser();
        if (user != null){
            const chefId = user.nigend;
            const dirigers = await Diriger.query().where('chef',chefId).first();
            if(dirigers!= null){
                var admin = true;
                const themes = await Theme.all();
                return view.render('layouts.creation',{themes : themes.toJSON(),admin:admin});
            }
            throw new customException('Accès interdit',401,'Unauthorized')
        }
        throw new customException('Accès interdit',401,'Unauthorized')
    }

    async alltheme({response,request}){
        const themes = await Theme.all();
        if(request.ajax()){ 
            return response.json({
                themes : themes
            })
        }
        throw new customException('Accès interdit',401,'Unauthorized')
    }
}

module.exports = ThemeController
