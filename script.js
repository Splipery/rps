let options = ['Rock', 'Paper', 'Scissors'];
    
let comparisons = {"Rock": "Scissors", "Scissors": "Paper", "Paper": "Rock"};


const compChoiceBox = document.querySelector('#choices #comp');
const playerChoiceBox = document.querySelector('#choices #player');

let compScore = 0;
let playerScore = 0;


const compScoreBox = document.querySelector('#results #comp');
const playerScoreBox = document.querySelector('#results #player');

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
    compScore = 0;
    playerScore = 0;
    updateScores(); 
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
    compChoiceBox.textContent = compChoice;

    //console.log(`P: ${playerChoice} C: ${compChoice}`)
     
    if(comparisons[playerChoice] === compChoice){
        winner = 'Player';
        playerScore++;
    } else if(comparisons[compChoice] === playerChoice) {
        winner = 'Computer';
        compScore++;
    } else {
        winner = 'Nobody';
    }
    announcementBox.textContent = `Computer chose ${compChoice}, Player chose ${playerChoice}. ${winner} wins!`;
    updateScores();
}


const moves = document.querySelectorAll('.move');
moves.forEach(move => move.addEventListener('click', playRound));