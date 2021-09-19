var timerButton = document.querySelector('.start-timer');
var headlinerEl = document.querySelector('#headliner');
var subcontentEl = document.querySelector('#sub-content');
var currentQuestion = JSON.parse(headlinerEl.dataset.question);
headlinerEl.textContent = "Highscores";
var questionIndex = 0;
var timeInterval;
var timeLeft = 60;

// test code to make sure that the highscore list was properly working for both logic and css
scores = [];
users = []
// localStorage.setItem("scores", JSON.stringify(scores));
// localStorage.setItem("users",  JSON.stringify(users));

//nested array to hold all the answers
var answers = [
    A =  ['1.a', '1.b', '1.c', '1.d'],
    B =  ['2.a', '2.b', '2.c', '2.d'],
    C =  ['3.a', '3.b', '3.c', '3.d'],
    D = ['4.a', '4.b', '4.c', '4.d']
];

renderStartButton();
renderHighscore();

//done
function renderStartButton() {
    //create a new button to start the quiz
    let startBtn = document.createElement('button');
    startBtn.setAttribute('class', 'start-Button');
    startBtn.textContent = "Start Quiz";
    timerButton.appendChild(startBtn);
}

//done
function renderHighscore() {
    headlinerEl.textContent = "Highscores";
    storageScores = JSON.parse(localStorage.getItem("scores"));
    storageUsers = JSON.parse(localStorage.getItem("users"));
    //logic behind this function will be if it isnt empty, then for loop the local storage
        //if it is empty then display text stating that there are no high scores to display yet
 
    if (storageUsers !== null) {
        //create the ul for the subcontent and give it a class so that it can be deleted later
        var highscoreList = document.createElement('ol');
        highscoreList.setAttribute('class', 'temp-class');
        subcontentEl.appendChild(highscoreList);

        for (let i = 0; i < storageUsers.length; i++) {
            //create list item
            //set the content of highscoreList[i] to the new list item
            //append the list item to the mainListEl
            var highscoreListItem = document.createElement('li');
            highscoreListItem.textContent = storageUsers[i] + ": " + storageScores[i];
            highscoreList.appendChild(highscoreListItem);
        }
    } else {
        // display text that states that there are no high scores to pull from local storage
        var noContent = document.createElement('h3');
        noContent.setAttribute('class', 'temp-class');
        noContent.textContent = "There are currently no highscores recorded";
        subcontentEl.appendChild(noContent);
    }
}

//listener event for the buttons
document.addEventListener('click', function(event) {
    event.preventDefault();

    if (event.target.className === 'start-Button') {
        timeLeft = 60;
        questionIndex = 0;
        event.target.remove();
        //call function to start timer and display in the .start-timer
        setTime();

        //call the function to set the 1st question
        setQuestion();
    } else if (event.target.className === 'answer-Button') {
        questionIndex++;
        setQuestion();
    } else if (event.target.className === 'submit-Button') {

        console.log(document.querySelector('#initials-value').value)
        users.push(document.querySelector('#initials-value').value);
        localStorage.setItem("users",  JSON.stringify(users));

        scores.push(timeLeft);
        localStorage.setItem("scores",  JSON.stringify(scores));

        document.querySelector('.initials-input').remove();
        document.querySelector('.timing').remove();

        renderStartButton();
        renderHighscore();
    }
})

function setTime() {
    //function for the timer and rending the end of the quiz
    let timer = document.createElement('h2');
    timer.setAttribute('class', 'timing');
    timer.textContent = timeLeft;
    timerButton.appendChild(timer);

    timeInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = timeLeft;
        
        //I want the timer to keep the 0 up for a little bit of more time
        if (timeLeft === -1) {
            timer.textContent = "Times Up";
            clearInterval(timeInterval);
            //call the function to set the initials and record highscore

        }
    }, 1000);
}

//still needs to cycle through the questions
function setQuestion() {
    //grab index for number
    //set the question in the headliner
    //set the answers to button

    state = headlinerEl.getAttribute("data-state");
    headlinerEl.textContent = currentQuestion[questionIndex];
    headlinerEl.setAttribute('data-state', 'question');

    renderAnswerButtons();
}

//not yet done, still need checks to exit the function to check the end of the quiz
function renderAnswerButtons() {
    //clear contents of the subcontent
    var itemDelete = document.querySelector('.temp-class');
    itemDelete.remove();

    if (questionIndex === 4) {
        //return out of this and end the function
        postQuizEntry();
        return;
    }

    var answerList = document.createElement('ul');
    answerList.setAttribute('class', 'temp-class');
    subcontentEl.appendChild(answerList);

    console.log(answers[questionIndex])
    for (var i = 0; i < 4; i++) {
        var answerButton = document.createElement('button');
        var answerListItem = document.createElement('li');
        answerButton.setAttribute('class', 'answer-Button')
        answerButton.textContent = answers[questionIndex][i];

        //set the button with class with the correct answer
        if ((questionIndex === 0 && i === 1) || (questionIndex === 1 && i === 1) ||
         (questionIndex === 2 && i === 1) ||(questionIndex === 3 && i === 1)) {
            answerButton.setAttribute('id', 'key-answer');
        }

        answerListItem.appendChild(answerButton);
        answerList.appendChild(answerListItem);
    }
}

function postQuizEntry() {
    //set the headliner to something that tells the user to record their initials
    //create a form for the user to enter their info
    //give the form an ID so that we can use an event listener for that form specifically
    clearInterval(timeInterval);
    headlinerEl.textContent = "Let's Record Your Score!";

    var initialsForms= document.createElement('form');
    initialsForms.setAttribute('class', 'initials-input');

    var initialsInput = document.createElement('input');
    initialsInput.setAttribute('id', 'initials-value')
    initialsInput.setAttribute('type', 'text');
    initialsInput.setAttribute('name', 'initials');
    initialsInput.setAttribute('placeholder', "Please Enter Initials Here");

    var submitButton = document.createElement('button');
    submitButton.setAttribute('class', "submit-Button");
    submitButton.textContent = "Submit";

    initialsForms.appendChild(initialsInput);
    initialsForms.appendChild(submitButton);
    subcontentEl.appendChild(initialsForms);
}