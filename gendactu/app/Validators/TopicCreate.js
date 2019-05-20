'use strict'

class TopicCreate {
  get rules () {
    return {
      'title': 'required|min:5|max:255|regex:^[^<>]+$',
      'description': 'required|min:20|max:1024|regex:^[^<>]+$',
    }
  }

  get messages(){
    return{
      'required': 'Veuillez remplir le champ ci-dessus',
      'min' : 'Nombre de caractères insuffisant',
      'max' : 'Trop de caractères saisi',
      'regex' : 'Tentative d\'injection html'
    }
  }

  async fails(error){
    this.ctx.session.withErrors(error)
    .flashAll();
    return this.ctx.response.redirect('back');
  }
}

module.exports = TopicCreate
