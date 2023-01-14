// Select HTML elements needed to make the JS code work
var timerEl = document.querySelector(".timer");
var startQuizEl = document.querySelector("#start-quiz");


// Function to create a countdown for 100-0 seconds
function countdown() {
    var timeLeft = 100;
    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
        if (timeLeft === 0 ) {
            timerEl.textContent = "Time " + timeLeft;
            clearInterval(timeInterval);
        }
    }, 1000);
}

// When the "start quiz" button is pressed, the timer will start counting down from 100
startQuizEl.addEventListener("click", countdown);