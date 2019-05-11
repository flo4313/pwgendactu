'use strict'

const User = use('App/Models/User')

class UserController {
    async login({request, auth,response, session}){
        const userID = request.input('userId');
        const password = request.input('pwd');
        try {
            await auth.attemp(userID,password);
            return response.redirect('actu');
        } catch (error) {
            session.flash({loginError: error});
            return response.redirect('/');
        }
    }

}

module.exports = UserController
