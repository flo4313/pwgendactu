'use strict'

const Diriger = use('App/Models/Diriger')

class DirigerController {

    async isAdmin({ auth,view, response}){
        const user =await auth.getUser()
        if(user != null){
            const res =  await Diriger.query().where('chef',user.nigend).first()
            var admin = null;
            if(res !=null){
                admin = true;
            }
            return view.render('layouts.accueil',{admin:admin});
        }
        else{
            return response.redirect('/');
        }
    }

}

module.exports = DirigerController
