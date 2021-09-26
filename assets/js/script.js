var startBtn = document.getElementById("startBtn");
var highScoreBtn = document.getElementById("highScores");
var timerDiv = document.getElementById("timer");
var quizChoices = document.getElementById("quizChoices");
var quizQuestion = document.getElementById("quizQuestion");
var timeLeft = 5;
var questionIndex = 0;
var amountRight = 0;
const questions = [{
    title: "What is 1+1?",
    choices: ["1", "2", "3", "4"],
    answer: 2
}, {
    title: "What is 2+2",
    choices: ["2", "3", "4", "5"],
    answer: 4
}]

startBtn.addEventListener("click", function () {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    let timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerDiv` to show the remaining seconds
            timerDiv.textContent = timeLeft + ' seconds remaining';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerDiv.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerDiv` to an empty string
            timerDiv.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            return;
        }
    }, 1000);
    console.log(questionIndex);
    generateQuestion();
    // if (timeLeft > 0) {
    //     generateQuestion();
    // } else {
    //     return;
    // }

});

function generateQuestion() {
    console.log(questionIndex);
    resetArea();
    if(questionIndex === questions.length) {
        showResults();
        return;
    }

    let currentQuestion = questions[questionIndex];

    //quizQuestion.textContent = currentQuestion.title;
    quizQuestion.textContent = questions[questionIndex].title;
    
    
    for (let j = 0; j <=3; j++) {
        let tempButton = document.createElement("button");

        let dataValue = currentQuestion.choices[j];

        tempButton.setAttribute("data-value", dataValue);
        let dataTest = tempButton.getAttribute("data-value");

        console.log(dataTest);
        tempButton.textContent = currentQuestion.choices[j];

        quizChoices.appendChild(tempButton);

        tempButton.addEventListener("click", validateQuestion);
    }
}


function validateQuestion() {

    let dataTest = tempButton.getAttribute("value");
    if(dataTest == questions.answer) {
        amountRight++;
        console.log(amountRight);
        questionIndex++;
        generateQuestion();
    } else {
        questionIndex++;
        generateQuestion();
    }
}

function showResults() {
    quizQuestion.textContent = "You got " + amountRight + " questions right!";
}

function resetArea() {
    while(quizChoices.firstChild) {
        quizChoices.removeChild(quizChoices.firstChild);
    }
}