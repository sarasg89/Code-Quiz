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
    } else {
        return;
    }
    createList();
}

init(); 

// Function to clear any stored scores
clearBtnEl.addEventListener("click", function() {
    localStorage.clear();
    highScoresEl.innerHTML = "";
})