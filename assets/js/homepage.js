//define Variables
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var repoContainerEl =document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUsersRepo = function(user){
    //format the github api URL
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //Make a request to the URL 
    fetch(apiUrl).then(function(response){
        //if correct response
        if(response.ok){
            //Format url info into array (json)
            response.json().then (function(data){
                //send to the displayRepos function
                displayRepos(data, user)
                console.log(data)
            });
        } else { // if there is not a valid fetch response
            alert("Error: Github User Not Found");
        }
    }).catch(function(error) { //catch network-connectivity error
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
    });
};

var displayRepos = function(repos, searchTerm){
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm; 

    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    //loop over repos
    for(var i = 0; i < repos.length; i++){
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create container for each repo
       /* var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";*/

        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        //construct a query string to append to the end of the URL single-repo.html?repo = repoName
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container (apan to the new div)
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center"

        //check if current repo has issues or not
        if(repos[i].open_issues_count > 0){
            //create new element in the ripoEl variable
            statusEl.innerHTML = 
                "<i class= 'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }else{
            statusEl.innerHTML = "<i class= 'fas fa-check-square status-icon icon-success'></i>";
        }
        //append check to container
        repoEl.appendChild(statusEl);

        //apend container to the DOM
        repoContainerEl.appendChild(repoEl);

    };

}

// getUsersRepo("microsoft");
// getUsersRepo("Leman102");
// getUsersRepo("facebook");

var formSubmitHandler = function(event){
    /*event.preventDefault() It stops the browser from performing the default action the event wants it to do. 
    In the case of submitting a form, it prevents the browser from sending the form's input data to a URL, 
    as we'll handle what happens with the form input data ourselves in JavaScript..*/
    event.preventDefault();

    //get value from input and use trim to delete extra spaces at thend or start of the text
    var username = nameInputEl.value.trim()
    console.log(username)
    if(username){
        //pass the username input as an argument to getUsersRepo function
        getUsersRepo(username);
        //clean out the form
        nameInputEl.value = "";
    } else {
        alert("Please enter a Github username");
    }

}

userFormEl.addEventListener("submit", formSubmitHandler)