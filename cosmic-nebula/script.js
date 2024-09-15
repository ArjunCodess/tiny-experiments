document.addEventListener('DOMContentLoaded', function () {
    const starsContainer = document.getElementById('stars-container');

    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            animation-delay: ${Math.random() * 5}s;
        `;
        starsContainer.appendChild(star);
    }
});