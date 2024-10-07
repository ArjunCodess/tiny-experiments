// Constants and DOM element selections
const GRID_SIZE = 32; // Size of the pixel art grid
const SAVE_SCALE = 8; // Scale factor for the saved image
const grid = document.getElementById('grid');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const eraserBtn = document.getElementById('eraserBtn');
const decreaseEraserSizeBtn = document.getElementById('decreaseEraserSize');
const increaseEraserSizeBtn = document.getElementById('increaseEraserSize');
const eraserSizeDisplay = document.getElementById('eraserSize');
const cursorPreview = document.getElementById('cursorPreview');

// State variables
let isDrawing = false;
let isErasing = false;
let eraserSize = 1;

// Function to create the pixel grid
function createGrid() {
    grid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mousedown', startDrawing);
        pixel.addEventListener('mouseover', draw);
        pixel.addEventListener('mouseup', stopDrawing);
        grid.appendChild(pixel);
    }
}

// Function to start drawing
function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

// Function to handle drawing and erasing
function draw(e) {
    if (isDrawing && e.target.classList.contains('pixel')) {
        if (isErasing) {
            erasePixels(e.target);
        } else {
            e.target.style.backgroundColor = colorPicker.value;
        }
    }
}

// Function to erase pixels
function erasePixels(centerPixel) {
    const pixels = document.querySelectorAll('.pixel');
    const centerIndex = Array.from(pixels).indexOf(centerPixel);
    const startRow = Math.floor(centerIndex / GRID_SIZE);
    const startCol = centerIndex % GRID_SIZE;

    for (let row = startRow - Math.floor(eraserSize / 2); row < startRow + Math.ceil(eraserSize / 2); row++) {
        for (let col = startCol - Math.floor(eraserSize / 2); col < startCol + Math.ceil(eraserSize / 2); col++) {
            if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
                const index = row * GRID_SIZE + col;
                pixels[index].style.backgroundColor = '';
            }
        }
    }
}

// Function to stop drawing
function stopDrawing() {
    isDrawing = false;
}

// Function to clear the entire grid
function clearGrid() {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.style.backgroundColor = '';
    });
}

// Function to save the pixel art as an image
function saveArt() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = GRID_SIZE * SAVE_SCALE;
    canvas.height = GRID_SIZE * SAVE_SCALE;

    document.querySelectorAll('.pixel').forEach((pixel, index) => {
        const x = (index % GRID_SIZE) * SAVE_SCALE;
        const y = Math.floor(index / GRID_SIZE) * SAVE_SCALE;
        ctx.fillStyle = pixel.style.backgroundColor || 'transparent';
        ctx.fillRect(x, y, SAVE_SCALE, SAVE_SCALE);
    });

    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Function to toggle between draw and erase modes
function toggleEraser() {
    isErasing = !isErasing;
    eraserBtn.textContent = isErasing ? 'Draw' : 'Eraser';
    eraserBtn.classList.toggle('active');
    updateCursorPreview();
}

// Function to update eraser size
function updateEraserSize(change) {
    eraserSize = Math.max(1, Math.min(5, eraserSize + change));
    eraserSizeDisplay.textContent = eraserSize;
    updateCursorPreview();
}

// Function to update the cursor preview for eraser
function updateCursorPreview() {
    if (isErasing) {
        const gridRect = grid.getBoundingClientRect();
        const pixelSize = gridRect.width / GRID_SIZE;
        const size = eraserSize * pixelSize;
        cursorPreview.style.width = `${size}px`;
        cursorPreview.style.height = `${size}px`;
        cursorPreview.style.display = 'block';
    } else {
        cursorPreview.style.display = 'none';
    }
}

// Function to move the cursor preview
function moveCursorPreview(e) {
    if (isErasing) {
        const rect = grid.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cursorPreview.style.left = `${x}px`;
        cursorPreview.style.top = `${y}px`;
    }
}

// Initialize the grid
createGrid();

// Event listeners for buttons and grid interactions
clearBtn.addEventListener('click', clearGrid);
saveBtn.addEventListener('click', saveArt);
eraserBtn.addEventListener('click', toggleEraser);
decreaseEraserSizeBtn.addEventListener('click', () => updateEraserSize(-1));
increaseEraserSizeBtn.addEventListener('click', () => updateEraserSize(1));
grid.addEventListener('mouseup', stopDrawing);
grid.addEventListener('mouseleave', stopDrawing);
grid.addEventListener('mousemove', moveCursorPreview);

// Initialize cursor preview
updateCursorPreview();

// Function to trigger fade-in effect
function triggerFadeIn() {
    const app = document.getElementById('app');
    setTimeout(() => {
        app.classList.add('show');
    }, 100); // Small delay to ensure the initial state is applied
}

// Trigger fade-in effect
triggerFadeIn();

// Update cursor preview on window resize
window.addEventListener('resize', updateCursorPreview);

// Function to wrap characters in spans for animation
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

// Initialize character animation after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    wrapCharacters();
    addHoverEffect();
});