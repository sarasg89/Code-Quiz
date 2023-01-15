// ************
// START SCREEN 
// ************

// Select HTML elements needed from the start screen
var timerEl = document.querySelector("#time");
var startQuizEl = document.querySelector("#start-quiz");
var startScreenEl = document.querySelector("#start-screen");
var questionsEl = document.querySelector("#questions-screen");

// Function to create a countdown for 100-0 seconds
function countdown() {
    var timeLeft = 100;
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
            timerEl.textContent = timeLeft;
            clearInterval(timeInterval);
        }
    }, 1000);
}

// Function to hide the start screen and move on to the questions. This function also starts the countdown timer
function startQuiz() {
    startScreenEl.setAttribute("hidden", "hidden");
    questionsEl.removeAttribute("hidden");

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

    // The current question number prints at the top
    questionNumEl.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;

    // The question and choices will auto populate based on the currentQuestion index
    questionEl.textContent = currentQuizData.title;
    choice1El.textContent = "1. " + currentQuizData.choices[0];
    choice2El.textContent = "2. " + currentQuizData.choices[1];
    choice3El.textContent = "3. " + currentQuizData.choices[2];
    choice4El.textContent = "4. " + currentQuizData.choices[3];

    // When the user clicks any of the available choices a function will save the answer in the userChoice variable and the result will be displayed
    listEl.addEventListener("click", function clickedAnswer(event) {
        userChoice = event.target.textContent.substring(3);
        resultScreenEl.removeAttribute("hidden");
        resultScreenEl.setAttribute("style", "display: flex;")
        if (userChoice === correctChoice) {
            resultEl.textContent = "Correct ✅";
        } else {
            resultEl.textContent = "Wrong ❌";
        }
    });

    function nextQuestion() {
        currentQuestion++
        console.log(currentQuestion);
        resultScreenEl.setAttribute("hidden", "hidden");
        resultScreenEl.removeAttribute("style");
        loadQuiz();
        nextEl.removeEventListener("click", nextQuestion)
    }

    if (currentQuestion === questions.length) {
        nextEl.textContent = "View your score";
    } else {
        nextEl.textContent = "Next question";
        nextEl.addEventListener("click", nextQuestion);
    }

}