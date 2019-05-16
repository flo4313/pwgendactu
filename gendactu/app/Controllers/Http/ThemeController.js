'use strict'

const Theme = use('App/Models/Theme')

class ThemeController {
    async all({view}){
        const themes = await Theme.all();
        return view.render('layouts.creation',{themes : themes.toJSON()});
    }

    async alltheme({response,session,params,view}){
        const themes = await Theme.all();
        return response.json({
            themes : themes
        })
    }
}

module.exports = ThemeController
