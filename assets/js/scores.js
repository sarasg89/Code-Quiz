// View stored scores in highscores.html
var highScoresEl = document.querySelector("#highscores");

var scoresSaved = [JSON.parse(localStorage.getItem("user"))];

// The following function renders items in a list as <li> elements
function createList() {
    highScoresEl.innerHTML = "";

    // Render a new li for each score
    for (var i = 0; i < scoresSaved.length; i++) {

        var li = document.createElement("li");
        li.textContent = scoresSaved[i];
        li.setAttribute("data-index", i);

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
    }

    createList();
    console.log("the init() function is being called correctly when the page loads")
    console.log(scoresSaved[0])
    console.log(scoresSaved[1])
}

init(); 