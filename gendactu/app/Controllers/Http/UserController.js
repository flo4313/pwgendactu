'use strict'
const User = use('App/Models/User')
const customException = use('App/Exceptions/CustomException')

class UserController {
    async login({request, auth,response, session}){
        let userID = request.input('userId');
        const password = request.input('pwd');
        if(! await User.findBy('email',userID)){
            let usertmp = await User.query().select('email').where('nigend',userID).first();
            if (usertmp != null){
                userID = usertmp.email;
            }
        }
        try {
            if(await auth.attempt(userID,password)){
                let user = await User.findBy('email',userID);
                if (user == null){
                    user = await User.findBy('nigend',userId);
                }
                let token = await auth.generate(user);
                var date = new Date();
                date.setMinutes( date.getMinutes() + 30 );
                response.cookie('Authorization',token,{ httpOnly: true, expires: date, path: '/' });
                let cp = user.postalCode;
                let dep = parseInt(cp.toString().substr(0,2),10);
                return response.redirect('/actu');
            }
            else{
                session.flash({loginError:"Erreur lors de la connexion"});
            }    
        } catch (error) {
            session.flash({loginError: "Identifiant ou mot de passe incorrect"});
            return response.redirect('/');
        }
    }

    async getDepartment({auth,request,response}){
        var user = await auth.getUser();
        if(request.ajax()){
            if(user!=null){
                var pc = user.postalCode.toString();
                var dep = parseInt(pc.slice(0,2));
                console.log(dep);
                return response.json({
                    dep:dep
                })
            }
            throw new customException('Accès interdit',401,'Unauthorized')            
        }
        throw new customException('Accès interdit',401,'Unauthorized')
    }

    async logout({response}) {
        response.clearCookie('Authorization')
        response.redirect('/')
    }
}


module.exports = UserController

