// ***********
// HIGH SCORES
// ***********


// Select HTML elements needed from the high scores page
var highScoresEl = document.querySelector("#highscores");
var clearBtnEl = document.querySelector("#clear");

var scoresSaved = [JSON.parse(localStorage.getItem("user"))];

// The following function renders items in a list as <li> elements
function createList() {
    highScoresEl.innerHTML = "";
    // Render a new li for each score
    sortDataBy (scoresSaved, "score");
    for (var i = 0; i < scoresSaved.length; i++) {
        
        var li = document.createElement("li");
        li.textContent = scoresSaved[i].user + " - " + scoresSaved[i].score;
        li.setAttribute("data-score", scoresSaved[i].score)
        highScoresEl.appendChild(li);
    }

}

// This function is being called below and will run when the page loads
function init() {
    // Retrieve the stored scores from localStorage
    var storedScores = JSON.parse(localStorage.getItem("user"));

    // If scores were retrieved from localStorage, update the highScores array to it
    if (storedScores !== null) {
        scoresSaved = storedScores;
    } else {
        return;
    }
    createList();
}

init();

// Function to clear any stored scores
clearBtnEl.addEventListener("click", function () {
    localStorage.clear();
    highScoresEl.innerHTML = "";
})



function sortDataBy (data, byKey){
    let sortedData;
    if(byKey == 'user'){
      sortedData = data.sort(function(a,b){
        let x = a.user.toLowerCase();
        let y = b.user.toLowerCase();
        if(x>y){return 1;}
        if(x<y){return -1;}
        return 0;
      });
    }else{
      sortedData = data.sort(function(a,b){
        return b.score - a.score;
      })
    }
    return sortedData;
  }
