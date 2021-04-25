'use strict';

const startMessage = document.querySelector('.message').textContent;
const startBackgroundColor = document.querySelector('body').style
  .backgroundColor;

let score = 0;
let highScore = 0;
let rand = 0;
const scoreGainedOnWin = 5;
const maxNumber = 20;
const minNumber = 1;

const body = document.querySelector('body');
const messageText = document.querySelector('.message');
const numberText = document.querySelector('.number');
const guessInputField = document.querySelector('.guess');
const againButton = document.querySelector('.again');

const winAudio = document.getElementById('winAudio');
const loseAudio = document.getElementById('loseAudio');
const startAudio = document.getElementById('startAudio');

function changeScore(amount) {
  score += amount;
  if (score <= 0) {
    score = 0;
    messageText.textContent = '💥 You lost the game!';
  }
  document.querySelector('.score').textContent = score;

  // set the high score
  if (score > highScore) {
    highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
}

function onGameStart(resetScore) {
  numberText.textContent = '?';
  body.style.backgroundColor = startBackgroundColor;
  guessInputField.value = '';
  messageText.textContent = startMessage;
  againButton.disabled = false;
  if (resetScore) {
    score = 20;
    changeScore(0);
  }
  rand = Math.trunc(Math.random() * 20) + 1;
  console.log(rand);
  startAudio.play();
}

onGameStart(true);

const onIncorrectGuess = function () {
  changeScore(-1);
  body.style.backgroundColor = '#C70039';
  setTimeout(function () {
    body.style.backgroundColor = startBackgroundColor;
  }, 500);
  loseAudio.play();
};

function onGuessValueChange() {
  const inputValue = guessInputField.value;
  if (inputValue > 20) guessInputField.value = 20;
  else if (inputValue < 1) guessInputField.value = 1;
}

// Add listener to Check button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(guessInputField.value);
  let outputMessage = '';
  if (!guess) {
    outputMessage = '💤 Forgot to pick a number?';
  } else {
    if (rand < guess) {
      outputMessage = '📈 Too high!';
      onIncorrectGuess();
    } else if (rand > guess) {
      outputMessage = '📉 Too low!';
      onIncorrectGuess();
    } else {
      outputMessage = '🎉 Correct number!';
      numberText.textContent = rand;
      //set background color to green
      body.style.backgroundColor = '#60b347';
      changeScore(scoreGainedOnWin);
      //disable again button
      againButton.disabled = true;
      setTimeout(function () {
        onGameStart(false);
      }, 3000);
      winAudio.play();
    }
  }
  if (score > 0) messageText.textContent = outputMessage;
});

// Add listener to Again button
againButton.addEventListener('click', function () {
  onGameStart(true);
});

// Add listener to input field on value change
guessInputField.addEventListener('change', onGuessValueChange);
