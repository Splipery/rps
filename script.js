let options = ['Rock', 'Paper', 'Scissors'];
    
let comparisons = {"Rock": "Scissors", "Scissors": "Paper", "Paper": "Rock"};


const compChoiceBox = document.querySelector('#choices #compC');
const playerChoiceBox = document.querySelector('#choices #playerC');

let compScore = 0;
let playerScore = 0;


const compScoreBox = document.querySelector('#results #compR');
const playerScoreBox = document.querySelector('#results #playerR');

const announcementBox = document.querySelector('#announcements');

updateScores();

function updateScores(){
    compScoreBox.textContent = compScore;
    playerScoreBox.textContent = playerScore;
    if(compScore === 5){
        declareWinner("Computer", "Player", compScore, playerScore);
    } else if (playerScore === 5) {
        declareWinner("Player", "Computer", playerScore, compScore);
    }
}

function declareWinner(winner, loser, winScore, loseScore) {
    announcementBox.textContent = `${winner} is victorious! Beating ${loser} by ${winScore} : ${loseScore}`;
    resetting(3000);
}

function computerPlay() {
    let choice = Math.floor(Math.random()*3);
    return options[choice];
}


function playRound(e){
    const playerChoice = e.target.dataset.move;

    const compChoice = computerPlay();

    let winner = 'Nobody';

    playerChoiceBox.textContent = playerChoice;
    playerChoiceBox.classList.add('selection');


    compChoiceBox.textContent = compChoice;
    setTimeout(function(){compChoiceBox.classList.add('selection');},500);

    //console.log(`P: ${playerChoice} C: ${compChoice}`)
     
    if(comparisons[playerChoice] === compChoice){
        winner = 'Player';
        playerScore++;
        setTimeout(function(){playerScoreBox.classList.add('selection');},1000);
    } else if(comparisons[compChoice] === playerChoice) {
        winner = 'Computer';
        compScore++;
        setTimeout(function(){compScoreBox.classList.add('selection');},1000);
    } else {
        winner = 'Nobody';
    }
    announcementBox.textContent = `${winner} wins!`;
    announcementBox.classList.add('selection');
    updateScores();
}

function removeTransition(e){
    if(e.propertyName !== 'transform') return;
    this.classList.remove('selection');
}

function resetting(timeValue){
    setTimeout(
        function(){
            compChoiceBox.textContent = '';
            playerChoiceBox.textContent = '';
            compScore = 0;
            playerScore = 0;
            updateScores();
            announcementBox.textContent = 'Waiting for player.'; 
            announcementBox.classList.add('selection');
        }, timeValue);
}

resetting(0);

const moves = document.querySelectorAll('.move');
moves.forEach(move => move.addEventListener('click', playRound));

const divs = document.querySelectorAll('div');
divs.forEach(div => div.addEventListener('transitionend', removeTransition));

announcementBox.addEventListener('transitionend', removeTransition);