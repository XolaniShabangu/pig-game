'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
//this is for id not classes. but querrySelectoer works for both
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, ActivePlayer, scores, playing;

//Starting conditions
const init = function () {
  currentScore = 0;
  ActivePlayer = 0;
  scores = [0, 0];
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${ActivePlayer}`).textContent = 0;
  currentScore = 0;
  ActivePlayer = ActivePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Roll dice funct
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice matching that number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player.
    if (dice != 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${ActivePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player score.
    scores[ActivePlayer] += currentScore; //activePlayer being saved as 0 and 1, also works well for the array that points to indexes by numbers.
    document.getElementById(`score--${ActivePlayer}`).textContent =
      scores[ActivePlayer];
    // 2. Check if score is >= 30.
    if (scores[ActivePlayer] >= 30) {
      //Finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch players of not >= 30.
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
