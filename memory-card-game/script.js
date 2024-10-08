// DOM element references
const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const scoreDisplay = document.getElementById('score');
const resultPopup = document.getElementById('result-popup');
const resultMessage = document.getElementById('result-message');
const closePopupButton = document.getElementById('close-popup');

// Array of emojis used for card faces
const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

// Game state variables
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer;
let seconds = 0;
let gameStarted = false;
let score = 0;

// Shuffle array elements randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create a card element with front and back faces
function createCard(emoji) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
                <div class="card-face card-front">${emoji}</div>
                <div class="card-face card-back">?</div>
            `;
    card.addEventListener('click', flipCard);
    return card;
}

// Initialize or reset the game state
function startGame() {
    // Reset game board and state variables
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    score = 0;
    gameStarted = true;

    // Update display elements
    movesDisplay.textContent = 'Moves: 0';
    timerDisplay.textContent = 'Time: 0s';
    scoreDisplay.textContent = 'Score: 0';

    // Create and add shuffled cards to the game board
    const shuffledEmojis = shuffleArray([...emojis, ...emojis]);
    shuffledEmojis.forEach(emoji => {
        const card = createCard(emoji);
        cards.push(card);
        gameBoard.appendChild(card);
    });

    startButton.textContent = 'Restart Game';
    startTimer();
}

// Handle card flip action
function flipCard() {
    // Prevent flipping if game hasn't started, two cards are already flipped, or this card is already flipped
    if (!gameStarted) return;
    if (flippedCards.length === 2) return;
    if (this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    // Check for a match if two cards are flipped
    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = `Moves: ${moves}`;
        checkForMatch();
    }
}

// Check if the two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector('.card-front').textContent;
    const emoji2 = card2.querySelector('.card-front').textContent;

    if (emoji1 === emoji2) {
        // Cards match
        matchedPairs++;
        flippedCards = [];
        score += 200;
        updateScore();
        if (matchedPairs === emojis.length) {
            endGame();
        }
    } else {
        // Cards don't match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
        score = score - 50;
        updateScore();
    }
}

// Update the score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Start the game timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Time: ${seconds}s`;
    }, 1000);
}

// End the game and display results
function endGame() {
    clearInterval(timer);
    gameStarted = false;
    setTimeout(() => {
        resultMessage.textContent = `You won in ${seconds} seconds with ${moves} moves. Your score is ${score} points.`;
        resultPopup.style.display = 'flex';
    }, 500);
}

// Add this new function to close the popup
function closePopup() {
    resultPopup.style.display = 'none';
}

// Add this event listener at the bottom of your file
closePopupButton.addEventListener('click', closePopup);

// Optionally, close the popup when clicking outside of it
resultPopup.addEventListener('click', (e) => {
    if (e.target === resultPopup) {
        closePopup();
    }
});

// Wrap characters in spans for animation
function wrapCharacters() {
    const h1 = document.querySelector('h1');
    const words = h1.textContent.split(' ');
    h1.innerHTML = '';

    words.forEach((word, wordIndex) => {
        for (let char of word) {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'animate-char';
            h1.appendChild(span);
        }

        // Add space after each word except the last one
        if (wordIndex < words.length - 1) {
            const space = document.createElement('span');
            space.textContent = ' ';
            space.className = 'animate-char space';
            h1.appendChild(space);
        }
    });
}

// Function to add hover effect to characters
function addHoverEffect() {
    const chars = document.querySelectorAll('.animate-char');
    chars.forEach(char => {
        char.addEventListener('mouseover', () => {
            char.style.animation = 'none';
            char.offsetHeight; // Trigger reflow
            char.style.animation = 'bounce 0.3s ease';
        });
    });
}

// Event listener for starting/restarting the game
startButton.addEventListener('click', startGame);

// Initialize character animation after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    wrapCharacters();
    addHoverEffect();
});