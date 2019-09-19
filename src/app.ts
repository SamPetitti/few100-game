import { getRandomInt } from './utils';
import { realpathSync } from 'fs';
import { TIMEOUT } from 'dns';

let squares: NodeListOf<HTMLDivElement>;
const gameHeader = document.getElementById('gameHeader');

export function runApp() {
    // we are going to need a secret number 1 - 6
    const secretNumber = getRandomInt(1, 6);
    // mark one of the squares as the secret square.
    squares = document.querySelectorAll('.square');
    const playButton = document.getElementById('playAgain');
    playButton.addEventListener('click', playAgain);
    let currentSquare = 1;
    squares.forEach((sq: HTMLDivElement) => {
        if (currentSquare === secretNumber) {
            sq.dataset.winner = 'true';
        }
        currentSquare++;
        sq.addEventListener('click', handleClick);
    });
}


function handleClick() {
    const isWinner = this.dataset.winner === 'true';
    const clickedSquare = this as HTMLDivElement;
    if (isWinner) {
        clickedSquare.classList.add('winner');
        gameHeader.innerText = 'YOU WIN!';

        squares.forEach(s => {
            if (s !== clickedSquare) {
                s.classList.add('loser');
            }
            s.removeEventListener('click', handleClick);
        });
    } else {
        clickedSquare.classList.add('loser');
        gameHeader.innerText = 'LOSER!!';
    }
}


function playAgain(): void {
    squares.forEach(s => {
        s.classList.remove('winner');
        s.classList.remove('loser');
        s.dataset.winner = 'false';
        gameHeader.innerText = 'Do you know the Guessing Game?';
    });
    runApp();
}
