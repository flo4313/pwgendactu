var gendarmerieJSON;
        var topicsJSON;
            

            function  displayGendarmerie(gendarmerie){
                document.getElementById('gendarmerie').innerHTML="";
                document.getElementById('gendarmerie').innerHTML+='<h3 id="nomG">'+gendarmerie.gendarmerieName+'</h3>';
            }

            function  displayTopics(topics){
                document.getElementById('topicsliste').innerHTML="";
                for(let topic of topics){
                    document.getElementById('topicsliste').innerHTML+='<div class="topic" id="'+topic.topicId+'"><div class="infoT"><p>Topic: '+topic.title+'</p></div><div class="linkT"><a class="edit" href="/gestion/topic/'+topic.topicId+'/edit">Editer <i class="fa fa-edit"></i></a><button  onclick="deleteTopic('+topic.topicId+')" class="remove">Supprimer <i class="fa fa-remove"></i></button></div></div>'
                }
            }

            function getTopics(){
                var resultat = "";
                var xhr = new XMLHttpRequest();
                xhr.open('GET','/gestion'); 
                xhr.setRequestHeader("x-csrf-token", '{{ csrfToken }}');
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        let value = JSON.parse(xhr.responseText);
                        gendarmerieJSON = value.gendarmerie;
                        displayGendarmerie(gendarmerieJSON);
                        topicsJSON = value.topics;
                        displayTopics(topicsJSON);
                    }
                    else {
                        alert('Echec lors du chargement des données ' + xhr.status);
                    }
                };
                xhr.send(); 
            }

            getTopics();