var timerButton = document.querySelector('.start-timer');
var headlinerEl = document.querySelector('#headliner');
var subcontentEl = document.querySelector('#sub-list');
var highscoreList = localStorage.getItem('hsList');
headlinerEl.textContent = "Highscores";
var questionIndex = 0;

var timeLeft = 60;

//nested array to hold all the answers
var answers = [
    first['a'],
    second['b'],
    third['e'],
    fourth['d']
];

renderStartButton();

//create a new button to start the quiz
function renderStartButton() {
    let startBtn = document.createElement('button');
    startBtn.setAttribute('class', 'start-button');
    startBtn.textContent = "Start Quiz";
    timerButton.appendChild(startBtn);
}

function setHighscore(){
    //grab the information from the form element after the quiz over
    //store the information into the local storage
}

function renderHighscore() {
    headlinerEl.textContent = "Highscores";

    if (highscoreList !== null) {
        for (let i = 0; i < highscoreList.length; i++) {
            //create list item
            //set the content of highscoreList[i] to the new list item
            //append the list item to the mainListEl
        }
    }
}

//listener event for the start button timer
timerButton.addEventListener('click', function(event) {
    if (event.target.className === 'start-button') {
        var removeBtn = document.getElementsByClassName('start-button');
        event.target.remove();
        //call function to start timer and display in the .start-timer
        setTime();

        //call the function to set the 1st question
    }
})

//function for the timer
function setTime() {
    let timer = document.createElement('h2');
    timer.setAttribute('class', 'timing');
    timer.textContent = timeLeft;
    timerButton.appendChild(timer);

    var timeInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = timeLeft;
        
        //I want the timer to keep the 0 up for a little bit of more time
        if (timeLeft === -1) {
            timer.textContent = "Times Up"
            clearInterval(timeInterval);
            //call the function to set the initials and record highscore

        }
    }, 1000);
}

function setQuestion() {
    //grab index for number
    //set the question in the headliner
    //set the answers to button
}

function postQuizEntry() {
    //set the headliner to something that tells the user to record their initials
    //create a form for the user to enter their info
    //give the form an ID so that we can use an event listener for that form specifically
}