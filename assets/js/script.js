var startBtn = document.getElementById("startBtn");
var highScoreBtn = document.getElementById("highScores");
var timerDiv = document.getElementById("timer");
var quizChoices = document.getElementById("quizChoices");
var quizQuestion = document.getElementById("quizQuestion");
var submitInitials = document.getElementById("submitArea");
var highScoreScreen = document.getElementById("scores");
var timeLeft = 10;
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
}];


startBtn.addEventListener("click", function () {
    console.log("Timer starts")
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    let timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            console.log("display update");
            // Set the `textContent` of `timerDiv` to show the remaining seconds
            timerDiv.textContent = timeLeft + ' seconds remaining';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerDiv.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else if (timeLeft === 0) {
            console.log("time is 0");
            // Once `timeLeft` gets to 0, set `timerDiv` to an empty string
            timerDiv.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            showResults();
            return;
        }
    }, 1000);

    generateQuestion();

});

highScoreBtn.addEventListener("click", displayScores);

function generateQuestion() {
    console.log("Question generates")
    // while(timeLeft > 0) {
    console.log("loop starts");
    resetArea();

    let currentQuestion = questions[questionIndex];

    //quizQuestion.textContent = currentQuestion.title;
    quizQuestion.textContent = questions[questionIndex].title;


    for (let j = 0; j <= 3; j++) {
        let tempButton = document.createElement("button");

        let dataValue = currentQuestion.choices[j];

        tempButton.setAttribute("value", dataValue);
        let dataTest = tempButton.getAttribute("value");

        tempButton.textContent = currentQuestion.choices[j];

        quizChoices.appendChild(tempButton);

        tempButton.addEventListener("click", validateQuestion);
    }

}



function validateQuestion() {
    //console.log("Validiation happens");
    if (this.value == questions[questionIndex].answer) {
        amountRight++;
        console.log(amountRight);
        questionIndex++;
        if (questionIndex === questions.length) {
            console.log("show results 2 happening");
            showResults();
            //return;
        } else {
            generateQuestion();
        }

    } else {
        questionIndex++;
        timeLeft -= 5;
        if (timeLeft > 0) {
            let timeInterval = setInterval(function () {
                // As long as the `timeLeft` is greater than 1
                if (timeLeft > 1) {
                    // Set the `textContent` of `timerDiv` to show the remaining seconds
                    timerDiv.textContent = timeLeft + ' seconds remaining';
                } else if (timeLeft === 1) {
                    // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
                    timerDiv.textContent = timeLeft + ' second remaining';
                }
            }, 1000);
            if (questionIndex === questions.length) {
                console.log("show results 2 happening");
                timeLeft = null;
                showResults();
                //return;

            } else {;
                generateQuestion();
            }

        } else {
            timeLeft = null;
            showResults();
        }
    }

}

function showResults() {
    resetArea();
    timerDiv.textContent = "";
    timeLeft = null;
    quizQuestion.textContent = "You got " + amountRight + " questions right!";
    storeResults();

}

function resetArea() {
    //console.log("Clearing quiz area for next question")
    while (quizChoices.firstChild) {
        quizChoices.removeChild(quizChoices.firstChild);
    }
}

function storeResults() {
    console.log("preparing to store locally");
    let submitButton = document.createElement("button");
    let submitText = document.createElement("input");

    submitButton.textContent = "submit";

    submitInitials.appendChild(submitText);
    submitInitials.appendChild(submitButton);

    refreshPage();

    submitButton.addEventListener("click", function () {
        console.log("storing locally now");
        let submitName = submitText.value.trim();
        let highRight = 0;
        if(amountRight > highRight) {
            let highName = submitName;
            let highRight = amountRight;
        }       
        const userScores = {
            initials: submitName,
            rightQuestion: amountRight
        };
        console.log(submitName);
        console.log(amountRight);
        localStorage.setItem("1", JSON.stringify(userScores));

        
    });
}

function displayScores() {
    document.getElementById("highScoresButton").style.display = "none";
    let headerScore = document.createElement("h2");
    highScoreScreen.appendChild(headerScore);
    headerScore.textContent = "High Scores";
    let scoresBox = document.createElement("ul");
    highScoreScreen.appendChild(scoresBox);
    let scores = document.createElement("li");
    scoresBox.appendChild(scores);
    let scoreObject = JSON.parse(localStorage.getItem("1"));
    //console.log(scoreObject);
    scores.textContent = scoreObject.initials + ": " + scoreObject.rightQuestion;
}

function refreshPage() {
    refreshButton = document.createElement("button");
    refreshButton.textContent = "start again";
    timerDiv.appendChild(refreshButton)
    refreshButton.addEventListener("click", function() {
        window.location.reload();
    })
}