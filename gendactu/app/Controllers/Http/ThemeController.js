'use strict'

const Theme = use('App/Models/Theme')

class ThemeController {
    async all({view}){
        const themes = await Theme.all();
        return view.render('layouts.creation',{themes : themes.toJSON()});
    }
}

module.exports = ThemeController
