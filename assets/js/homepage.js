var getUsersRepo = function(user){
    //format the github api URL
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //Make a request to the URL 
    fetch(apiUrl).then(function(response){
        //Format url info into array (json)
        response.json().then (function(data){
            console.log(data)
        })
    });
}; 

getUsersRepo("microsoft");
getUsersRepo("Leman102");
getUsersRepo("facebook");