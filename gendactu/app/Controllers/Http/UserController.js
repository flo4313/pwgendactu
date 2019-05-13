'use strict'
const Hash = use('Hash')
const User = use('App/Models/User')

class UserController {
    async login({request, auth,response, session}){
        const Hash = use('Hash');
        let userID = request.input('userId');
        const password = request.input('pwd');
        
        if(!await User.findBy('email',userID)){
            let usertmp = await User.query().select('email').where('nigend',userID).first();
            userID = usertmp.email;
        }
        try {
            if(await auth.attempt(userID,password)){
                let user = await User.findBy('email',userID);
                if (user == null){
                    user = await User.findBy('nigend',userId);
                }
                //let token = await auth.generate(user);
                //response.cookie('Authorization',token,{ httpOnly: true, path: '/' });
                let cp = user.postalCode;
                let dep = parseInt(cp.toString().substr(0,2),10);
                response.cookie('Department',dep);
                return response.redirect('actu');
            }
            else{
                console.log("erreur");
            }
        } catch (error) {
            session.flash({loginError: "Identifiant ou mot de passe incorrect"});
            return response.redirect('/');
        }
    }

}

module.exports = UserController

