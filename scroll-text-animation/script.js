document.addEventListener('DOMContentLoaded', () => {
    const animatedText = document.querySelector('[data-splitting]');

    if (animatedText) {
        const chars = animatedText.textContent.split('');
        animatedText.innerHTML = '';
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'char';
            span.style.setProperty('--char-index', index);
            span.style.setProperty('--char-total', chars.length);
            animatedText.appendChild(span);
        });
    }
});