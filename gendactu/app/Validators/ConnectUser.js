'use strict'

class ConnectUser {
  get rules () {
    return {
      'userId': 'required',
      'pwd': 'required'
    }
  }

  get messages(){
    return{
      'required': 'Veuillez remplir le champ ci-dessus',
    }
  }

  async fails(error){
    this.ctx.session.withErrors(error)
    .flashAll();
    return this.ctx.response.redirect('back');
  }
}

module.exports = ConnectUser
