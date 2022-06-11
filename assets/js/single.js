//declare DOM variables
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function(){
    //select the repo name from the element repoEl from homepage.js 
    var queryString = document.location.search;
    //select the just the repo name from the objact using split + index
    var repoName = queryString.split("=")[1];
    // validate if the repo exists
    if(repoName){
        // display repo name on the page
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    }else { //return to landing page
        document.location.replace("./index.html");
    }   
};

var getRepoIssues = function(repo){
    console.log(repo);
     //repo includes owner/repo-name
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        //request was successfull
        if(response.ok){
            response.json().then(function(data){
                // console.log(data);
                displayIssues(data)
                
                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo)
                }
            });
        } else { //if request was not successfull dend to homepage
            document.location.replace("./index.html");
        }
    }).catch("error");
};

var displayIssues = function(issues){
    //display meassage if there are no issues on the repo
    if(issues.length === 0){
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for(var i =0; i < issues.length; i++){
        // create a link element to take users to the issue on  github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank"); //"target", "_blank" open the link in a new window
        
        //create span to hold the issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append title into the issue Elementcontainer
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");
        // check if issue is an actual issue or a pull request
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        //append typeEl to the issue Element container
        issueEl.appendChild(typeEl);

        //append to the main Issue Container
        issueContainerEl. appendChild(issueEl);
    };

};

var displayWarning = function(repo){
    //add tect to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit "
    var linkEl = document.createElement ("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target","_blank");

    //append to warning container
    limitWarningEl.append(linkEl);
};

getRepoName();