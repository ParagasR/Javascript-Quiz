var timerButton = document.querySelector('.start-timer');
var headlinerEl = document.querySelector('#headliner');
var subcontentEl = document.querySelector('#sub-content');
headlinerEl.textContent = "Highscores";
var questionIndex = 0;

var timeLeft = 60;

// test code to make sure that the highscore list was properly working for both logic and css
// scores = [1, 2, 3, 4, 5, 6, 7];
// users = ['rp', 'kp', 'cp', 'fp', 'ep', 'ap', 'KP',]

localStorage.setItem("scores", JSON.stringify(scores));
localStorage.setItem("users",  JSON.stringify(users));

//nested array to hold all the answers
var answers = {
    A: [],
    B: [],
    C: [],
    D: []
}

renderStartButton();
renderHighscore();

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
    storageScores = JSON.parse(localStorage.getItem("scores"));
    storageUsers = JSON.parse(localStorage.getItem("users"));
    //logic behind this function will be if it isnt empty, then for loop the local storage
        //if it is empty then display text stating that there are no high scores to display yet
    console.log(storageUsers);

    
    if (storageUsers !== null) {
        //create the ul for the subcontent and give it a class so that it can be deleted later
        var highscoreList = document.createElement('ol');
        highscoreList.setAttribute('class', 'sub-list');
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