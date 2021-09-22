var timerButton = document.querySelector('.start-timer');
var headlinerEl = document.querySelector('#headliner');
var subcontentEl = document.querySelector('#sub-content');
var currentQuestion = JSON.parse(headlinerEl.dataset.question);
headlinerEl.textContent = "Highscores";
var questionIndex = 0;
var timeInterval;
var timeLeft = 60;
var timer = document.createElement('h2');
var scores = [];
var users = [];

// localStorage.setItem("scores", JSON.stringify(scores));
// localStorage.setItem("users",  JSON.stringify(users));

//nested array to hold all the answers
var answers = [
    A =  ['.createElement', '.append/.appendChild', '.querytSelector', '.addElement'],
    B =  ['12', '57', '210', '39'],
    C =  ['Numbers', 'Objects', 'String', 'Null until assigned'],
    D = ['Java', 'Netscape', 'Visual Studio', 'Microsoft']
];

renderStartButton();
renderHighscore();

//done
function renderStartButton() {
    //create a new button to start the quiz
    let startBtn = document.createElement('button');
    startBtn.setAttribute('class', 'button is-primary is-justify-content-center');
    startBtn.setAttribute('id', 'start-Button')
    startBtn.textContent = "Start Quiz";
    timerButton.appendChild(startBtn);
}

//done
function renderHighscore() {
    headlinerEl.textContent = "Highscores";
    getHighscores();
    //logic behind this function will be if it isnt empty, then for loop the local storage
        //if it is empty then display text stating that there are no high scores to display yet
 
    if (users !== null) {
        //create the ul for the subcontent and give it a class so that it can be deleted later
        var highscoreList = document.createElement('ol');
        highscoreList.setAttribute('class', 'temp-class');
        subcontentEl.appendChild(highscoreList);

        for (let i = 0; i < users.length; i++) {
            //create list item
            //set the content of highscoreList[i] to the new list item
            //append the list item to the mainListEl
            var highscoreListItem = document.createElement('li');
            highscoreListItem.textContent = users[i] + ": " + scores[i];
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

function setHighscore() {
    localStorage.setItem("users",  JSON.stringify(users));
    localStorage.setItem("scores",  JSON.stringify(scores));

    document.querySelector('.initials-input').remove();
    document.querySelector('.timing').remove();

    renderStartButton();
    renderHighscore();
}

function getHighscores() {
    scores = JSON.parse(localStorage.getItem("scores"));
    users = JSON.parse(localStorage.getItem("users"));
}

//listener event for the buttons
document.addEventListener('click', function(event) {
    event.preventDefault();

    if (event.target.id === 'start-Button') {
        timeLeft = 60;
        questionIndex = 0;
        event.target.remove();
        //call function to start timer and display in the .start-timer
        setTime();

        //call the function to set the 1st question
        setQuestion();
    } else if (event.target.id === 'answer-Button' || event.target.id === 'key-answer') {
        //checks that the button pressed is the one of the answer buttons
        //checks to see if the answer is wrong or corrects then responds accordingly
        //adds a 1s pause before loading the next question so that the user can register if they got the answer right or wrong
        //if wrong then the timer goes down by 10s
        let pauseLeft = 1;
        questionIndex++;
        if (event.target.id === 'key-answer') {
            console.log(event.target);
            event.target.classList.remove('is-primary');
            event.target.classList.add('is-success');
        } else {
            event.target.classList.remove('is-primary');
            event.target.classList.add('is-danger')

            timeLeft -= 10;
            if (timeLeft < 0) {
                timeLeft = 0;
            }
        }

        pauseInterval = setInterval(function() {
            pauseLeft--;

            if (pauseLeft === 0) {
                clearInterval(pauseInterval);
                setQuestion();   
            }
        }, 500);

        
    //I hate this function but it works now. sorts the scores and corresponding users
    } else if (event.target.id === 'submit-Button') {
        getHighscores();
        let inputtedUser = document.querySelector('#initials-value').value;

        if (scores == undefined) {
            users = [inputtedUser];
            scores = [timeLeft];
            setHighscore();
            return;
        } else {
            if (timeLeft < scores[scores.length - 1]){
                users.push(inputtedUser);
                scores.push(timeLeft);
            } else {
                for (var i = 0; i < scores.length; i++) {
                    if (timeLeft > scores[i]) {
                        users.splice(i, 0, inputtedUser);
                        scores.splice(i, 0, timeLeft);
                        break;
                    }
                }
            }
        }
        
        

        setHighscore();
    }
})

function setTime() {
    //function for the timer and rending the end of the quiz
    timer.setAttribute('class', 'timing');
    timer.textContent = timeLeft;
    timerButton.appendChild(timer);

    timeInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = timeLeft;
        
        //I want the timer to keep the 0 up for a little bit of more time
        if (timeLeft === -1) {
            timeLeft = 0;
            timer.textContent = "Times Up";
            clearInterval(timeInterval);
            clearSubContent();
            postQuizEntry();
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
    clearSubContent();

    if (questionIndex === 4) {
        //return out of this and end the function
        timer.textContent = timeLeft;
        postQuizEntry();
        return;
    }

    var answerList = document.createElement('ul');
    answerList.setAttribute('class', 'temp-class');
    subcontentEl.appendChild(answerList);

    for (var i = 0; i < 4; i++) {
        var answerButton = document.createElement('button');
        var answerListItem = document.createElement('li');
        answerButton.setAttribute('id', 'answer-Button')
        answerButton.setAttribute('class', 'button is-info m-1');
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

function clearSubContent() {
    var itemDelete = document.querySelector('.temp-class');
    itemDelete.remove();
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
    initialsInput.setAttribute('class', 'm-3')
    initialsInput.setAttribute('type', 'text');
    initialsInput.setAttribute('name', 'initials');
    initialsInput.setAttribute('placeholder', "Please Enter Initials Here");

    var submitButton = document.createElement('button');
    submitButton.setAttribute('id', "submit-Button");
    submitButton.setAttribute('class', 'button is-primary mx-3');
    submitButton.textContent = "Submit";

    initialsForms.appendChild(initialsInput);
    initialsForms.appendChild(submitButton);
    subcontentEl.appendChild(initialsForms);
}