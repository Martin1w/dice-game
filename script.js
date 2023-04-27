'use strict'

const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')
const newBtn = document.querySelector('.btn--new')
const rollBtn = document.querySelector('.btn--roll')
const holdBtn = document.querySelector('.btn--hold')

const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')

//starting conditions
let scores, currentScore, activePlayer, playing

const resetGame = () => {
	scores = [0, 0]
	currentScore = 0
	activePlayer = 0
	playing = true

	score0El.textContent = 0
	score1El.textContent = 0
	current0El.textContent = 0
	current1El.textContent = 0

	diceEl.classList.add('hidden')
	player0.classList.add('player--active')
	player1.classList.remove('player--active')
	player0.classList.remove('player--winner')
	player1.classList.remove('player--winner')
}

resetGame()

const switchPlayer = () => {
	document.getElementById(`current--${activePlayer}`).textContent = 0
	currentScore = 0
	activePlayer = activePlayer === 0 ? 1 : 0
	player0.classList.toggle('player--active')
	player1.classList.toggle('player--active')
}

const roll = () => {
	if (playing) {
		const dice = Math.trunc(Math.random() * 6) + 1
		diceEl.classList.remove('hidden')
		diceEl.src = `./images/dice-${dice}.png`

		//check for rolled 1
		if (dice !== 1) {
			currentScore += dice
			document.getElementById(`current--${activePlayer}`).textContent = currentScore
		} else {
			//switch to the next player

			switchPlayer()

			// console.log(activePlayer);
		}
	}
}

holdBtn.addEventListener('click', function () {
	if (playing) {
		scores[activePlayer] += currentScore
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
		if (scores[activePlayer] >= 70) {
			playing = false
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
			diceEl.classList.add('hidden')
		} else {
			switchPlayer()
		}
	}
})

rollBtn.addEventListener('click', roll)

newBtn.addEventListener('click', resetGame)
