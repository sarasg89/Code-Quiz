// ************
// START SCREEN 
// ************

// Select HTML elements needed from the start screen
var timerEl = document.querySelector("#time");
var startQuizEl = document.querySelector("#start-quiz");
var startScreenEl = document.querySelector("#start-screen");
var questionsEl = document.querySelector("#questions-screen");
var scoreIsEl = document.querySelector("#score-is");
var submitEl = document.querySelector("#submitbtn");
var nameEl = document.querySelector("#name");
var displayMessageEL = document.querySelector("#display-message");
var timeInterval;
var timeLeft;

// Function to create a countdown for 100-0 seconds
function countdown() {
    timeLeft = 100;
    timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            timerEl.textContent = 0;
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}


// Function to hide the start screen and move on to the questions. This function also starts the countdown timer
function startQuiz() {
    startScreenEl.setAttribute("hidden", "hidden");

    countdown();
    loadQuiz();
}

// When the "start quiz" button is pressed, the timer will start counting down from 100 and the screen will move on to the questions
startQuizEl.addEventListener("click", startQuiz);


// ****************
// QUESTIONS SCREEN 
// ****************

// Select HTML elements needed from the questions screen
var questionNumEl = document.querySelector("#question-number");
var questionEl = document.querySelector("#question");
var listEl = document.querySelector("#list");
var choice1El = document.querySelector("#choice1");
var choice2El = document.querySelector("#choice2");
var choice3El = document.querySelector("#choice3");
var choice4El = document.querySelector("#choice4");
var resultScreenEl = document.querySelector("#result-screen");
var resultEl = document.querySelector("#result");
var nextEl = document.querySelector("#next");
var scoreScreen = document.querySelector("#your-score-screen");


// Variable that stores all questions, choices and answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        title: "The condition in an if / else statement is enclosed within _______. ",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        title: "Arrays in JavaScript can be used to store ______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },
    {
        title: "String values must be enclosed with ______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log",
    },
];

var currentQuestion = 0;

function loadQuiz() {
    var currentQuizData = questions[currentQuestion];
    var correctChoice = currentQuizData.answer;
    var userChoice = "";

    // The questions screen is now visible
    questionsEl.removeAttribute("hidden");

    // The current question number prints at the top
    questionNumEl.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;

    // The question and choices will auto populate based on the currentQuestion index
    questionEl.textContent = currentQuizData.title;
    choice1El.textContent = "1. " + currentQuizData.choices[0];
    choice2El.textContent = "2. " + currentQuizData.choices[1];
    choice3El.textContent = "3. " + currentQuizData.choices[2];
    choice4El.textContent = "4. " + currentQuizData.choices[3];

    // When the user clicks any of the available choices a function will save the answer in the userChoice. The questions screen will hide again and the result screen will display
    listEl.addEventListener("click", function clickedAnswer(event) {
        userChoice = event.target.textContent.substring(3);
        resultScreenEl.removeAttribute("hidden");
        resultScreenEl.setAttribute("style", "display: flex;")
        questionsEl.setAttribute("hidden", "hidden");
        if (userChoice === correctChoice) {
            resultEl.textContent = "Correct ✅";
        } else {
            resultEl.textContent = "Wrong ❌ The correct answer was " + correctChoice;
            if (timeLeft > 15) {
                timeLeft -= 15;
            } else {
                timeLeft = 0;
            }
        }
        listEl.removeEventListener("click", clickedAnswer);
    });

    // When the next question button is clicked, the currentQuestion counter increases by 1, the result screen hides, and the loadQuiz function starts up again
    function nextQuestion() {
        currentQuestion++
        resultScreenEl.setAttribute("hidden", "hidden");
        resultScreenEl.removeAttribute("style");
        loadQuiz();
        nextEl.removeEventListener("click", nextQuestion)
    }


    // After the user answers each question, the result is displayed and they can click on the button to move on to the next question. After the last question, the user can view their score.
    if (currentQuestion === (questions.length - 1)) {
        nextEl.textContent = "View your score";
        nextEl.addEventListener("click", function () {
            endQuiz();
        })
    } else {
        nextEl.addEventListener("click", nextQuestion);
    }

}


// This function will end the quiz either when the user answers the last question or when the timer reaches 0
function endQuiz() {
    // Stop timer
    clearInterval(timeInterval);
    // Hide questions screen
    resultScreenEl.setAttribute("hidden", "hidden");
    resultScreenEl.removeAttribute("style");
    questionsEl.setAttribute("hidden", "hidden");
    // Show your score screen
    scoreScreen.removeAttribute("hidden");
    // Show your score in the screen
    scoreIsEl.textContent = timeLeft;

}



var scoresSaved = []

submitEl.addEventListener("click", function (event) {
    if (nameEl.value === "") {
        event.preventDefault();
        displayMessageEL.textContent = "Error, name cannot be blank";
    } else {
        var user = nameEl.value;
        var score = timeLeft;
        scoresSaved = JSON.parse(localStorage.getItem("user"));
        
        scoresSaved.push([user, score]);

        localStorage.setItem("user", JSON.stringify(scoresSaved));

    };
});

