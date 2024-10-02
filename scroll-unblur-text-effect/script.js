document.addEventListener('DOMContentLoaded', () => {
    if (!CSS.supports('animation-timeline: scroll(root)')) {
        console.log('Scroll-driven animations not supported');
        const words = document.querySelectorAll('.word');
        words.forEach(word => {
            word.style.opacity = 1;
            word.style.filter = 'blur(0)';
        });
    }
});