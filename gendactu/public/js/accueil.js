    var topicsJSON;
    var departmentJSON;
    var page = 1;
    var nbpages = 1;
    var theme = "all";
    var department = 43;
    var nbTopics = 0;
    var themes;

    function  displayTopics(topics){
        document.getElementById('topicsliste').innerHTML="";
        if (topics == null){
            document.getElementById('topicsliste').innerHTML='<h3 id="topicnull">Il n\'y a aucune actualité</h3>';
        }
        else{
            for(let topic of topics){
                if (topic.image != null){
                    document.getElementById('topicsliste').innerHTML+='<div class="topic"><a href="/topic/'+topic.topicId+'"><h3>'+topic.title+'</h3><img class="topicImg" src="'+topic.image+'" alt="Image en lien avec le post"></a><p>'+topic.description+'</p></div>'
                }
                else{
                    document.getElementById('topicsliste').innerHTML+='<div class="topic"><a href="/topic/'+topic.topicId+'"><h3>'+topic.title+'</h3></a><p>'+topic.description+'</p></div>'
                }
            }
        }
        getNbPages();
    }

    function  displayDepartment(listedepartments){
        for(let d of listedepartments){
            if (d.departmentId == department){
                document.getElementById('departmentS').innerHTML+='<option value="'+d.departmentId+'" selected>'+d.departmentName+'</option>';
            }
            else{
                document.getElementById('departmentS').innerHTML+='<option value="'+d.departmentId+'">'+d.departmentName+'</option>';
            }
        }
        getNbPages();
    }

    
    
    function  displayThemes(themes){
        document.getElementById('themes').innerHTML='<option value="all">--Themes--</option>';
        for(let t of themes){
            document.getElementById('themes').innerHTML+='<option value="'+t.themeId+'">'+t.description+'</option>';
        }
        getNbPages();
    }


    

    function suiv(){
        limit = page + 1;
        if ( limit> nbpages || page < 1) {
            page = 1; 
        }
        else{
            page += 1;
        }
        getTopics();
    }

    function suiv2(){
        limit = page + 2;
        if ( limit> nbpages || page < 1) {
            page = 1; 
        }
        else{
            page += 2;
        }
        getTopics();
    }

    function prev(){
        if (page <= 1 || page > nbpages) {
            page = 1; 
        }
        else{
            page -= 1;
        }
        getTopics();
    }

    function prev2(){
        if (page <= 2 || page > nbpages) {
            page = 1; 
        }
        else{
            page -= 2;
        }
        getTopics();
    }

    

    function displayPagination(){
        document.getElementById('pagination').innerHTML="";
        if(nbpages <= 1){
            document.getElementById('pagination').innerHTML='<nav aria-label="Pagination"><ul class="pagination justify-content-center"><li class="page-item active"><a class="page-link" >1</a></li></ul></nav>';
        }
        else if(nbpages == 2){
            if(page == 1){
                document.getElementById('pagination').innerHTML='<nav aria-label="Pagination"><ul class="pagination justify-content-center"><li class="page-item disabled"><a class="page-link"  tabindex="-1">Previous</a></li><li class="page-item active"><a class="page-link" >1</a></li><li class="page-item"><a class="page-link" onclick="suiv()" >2</a></li><li class="page-item"><a class="page-link"  onclick="suiv()">Next</a></li></ul></nav>';
            }
            else{
                document.getElementById('pagination').innerHTML='<nav aria-label="Pagination"><ul class="pagination justify-content-center"><li class="page-item "><a class="page-link" onclick="prev()" tabindex="-1">Previous</a></li><li class="page-item "><a class="page-link" onclick="prev()">1</a></li><li class="page-item active"><a class="page-link" >2</a></li><li class="page-item disabled"><a class="page-link">Next</a></li></ul></nav>';
            }
        }
        else{
            if(page == 1){
                document.getElementById('pagination').innerHTML='<nav aria-label="Pagination"><ul class="pagination justify-content-center"><li class="page-item disabled"><a class="page-link"  tabindex="-1">Previous</a></li><li class="page-item active"><a class="page-link" >1</a></li><li class="page-item"><a class="page-link" onclick="suiv()">2</a></li><li class="page-item"><a class="page-link" onclick="suiv2()">3</a></li><li class="page-item"><a class="page-link" onclick="suiv()">Next</a></li></ul></nav>';
            }
            else if(page == 2){
                document.getElementById('pagination').innerHTML='<nav aria-label="Pagination"><ul class="pagination justify-content-center"><li class="page-item "><a class="page-link" onclick="prev()" tabindex="-1">Previous</a></li><li class="page-item "><a class="page-link" onclick="prev()">1</a></li><li class="page-item active"><a class="page-link " >2</a></li><li class="page-item"><a class="page-link" onclick="suiv()">3</a></li><li class="page-item"><a class="page-link" onclick="suiv()">Next</a></li></ul></nav>';
            }
            else{
                var limit = page + 1;
                if ( limit < nbpages){
                    pm1 = page - 1 ;
                    pp1 = page + 1  ;
                    document.getElementById('pagination').innerHTML='<nav aria-label="Pagination"><ul class="pagination justify-content-center"><li class="page-item "><a class="page-link" onclick="prev()" tabindex="-1">Previous</a></li><li class="page-item "><a class="page-link" onclick="prev()">'+pm1+'</a></li><li class="page-item active"><a class="page-link ">'+page+'</a></li><li class="page-item"><a class="page-link" onclick="suiv()">'+pp1+'/a></li><li class="page-item"><a class="page-link" onclick="suiv()">Next</a></li></ul></nav>';
                }
                else if ( limit === nbpages){
                    pm1 = page - 1 ;
                    pm2 = page - 2  ;
                    document.getElementById('pagination').innerHTML='<nav aria-label="Pagination"><ul class="pagination justify-content-center"><li class="page-item "><a class="page-link" onclick="prev()" tabindex="-1">Previous</a></li><li class="page-item "><a class="page-link" onclick="suiv()">'+pm2+'</a></li><li class="page-item "><a class="page-link " onclick="prev()">'+pm1+'</a></li><li class="page-item active"><a class="page-link" >'+page+'/a></li><li class="page-item"><a class="page-link disabled" >Next</a></li></ul></nav>';
                }
                else{
                    page = 1;
                    displayPagination();
                }
            }
        }
    }

    function getThemes(){
        var resultat = "";
        var xhr = new XMLHttpRequest();
        xhr.open('GET','/themes'); 
        xhr.setRequestHeader("x-csrf-token", '{{ csrfToken }}');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.onload = function() {
            if (xhr.status === 200) {
                let value = JSON.parse(xhr.responseText);
                themes = value.themes;
                displayThemes(themes);
            }
            else {
                alert('Echec lors du chargement des données ' + xhr.status);
            }
        };
        xhr.send();
    }

    function getDepartment(){
        var resultat = "";
        var xhr = new XMLHttpRequest();
        xhr.open('GET','/departments'); 
        xhr.setRequestHeader("x-csrf-token", '{{ csrfToken }}');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.onload = function() {
            if (xhr.status === 200) {
                let value = JSON.parse(xhr.responseText);
                var listedepartments = value.departments;
                departmentJSON = listedepartments;
                displayDepartment(listedepartments);
            }
            else {
                alert('Echec lors du chargement des données ' + xhr.status);
            }
        };
        xhr.send();
    }

    function getNbPages(){
        var resultat = "";
        var xhr = new XMLHttpRequest();
        var dep = department;
        if(theme === "all"){
            xhr.open('GET','/topics/nbPages/department/'+dep); 
        }
        else{
            xhr.open('GET','/topics/nbPages/theme/'+theme+'/department/'+dep); 
        }
        xhr.setRequestHeader("x-csrf-token", '{{ csrfToken }}');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.onload = function() {
            if (xhr.status === 200) {
                let value = JSON.parse(xhr.responseText);
                nbp = value.nbP;
                nbTopics = nbp[0].nbTopics;
                nbpages = Math.ceil(nbTopics/5);
                displayPagination();
            }
            else {
                alert('Echec lors du chargement des données ' + xhr.status);
            }
        };
        xhr.send();
    }

    function getTopics(dep = null, themeT = null){
        var resultat = "";
        if(dep === null){
            if(department === null){
                department = 43;
            }
        }
        else{
            department = dep;
        }
        var xhr = new XMLHttpRequest();
        if(themeT === null && theme === "all" || themeT === "all"){
            xhr.open('GET','/topics/department/'+department+'/page/'+page); 
        }
        else{
            theme = themeT;
            xhr.open('GET','/topics/department/'+department+'/theme/'+theme+'/page/'+page); 
        }
        xhr.setRequestHeader("x-csrf-token", '{{ csrfToken }}');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.onload = function() {
            if (xhr.status === 200) {
                let value = JSON.parse(xhr.responseText);
                resultat = value.res;
                if(resultat != null){
                    topicsJSON = value.topics;
                    displayTopics(topicsJSON);
                }
                else{
                    displayTopics(null);
                }
            }
            else {
                alert('Echec lors du chargement des données ' + xhr.status);
            }
        };
        xhr.send(); 
    }   

    function recherche(){
        var th = document.getElementById('themes').value;
        var dpt = document.getElementById('departmentS').value;
        getTopics(dpt,th);
    }

    $(document).ready(function() {
		$('#francemap').vectorMap({
		    map: 'france_fr',
        hoverOpacity: 0.5,
        hoverColor: false,
        backgroundColor: "#ffffff",
        colors: couleurs,
        borderColor: "#000000",
        selectedColor: "#EC0000",
          onRegionClick: function(element, code, region)
          {
            var dept = parseInt(code);
              getTopics(dept);
              $("#departmentS").val(dept);
          }
      });
    });