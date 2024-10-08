const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = themeToggle.querySelector('.lucide-moon');
const sunIcon = themeToggle.querySelector('.lucide-sun');

// Function to update the icon visibility
function updateThemeToggleIcon(isDark) {
    moonIcon.classList.toggle('hidden', isDark);
    sunIcon.classList.toggle('hidden', !isDark);
}

// Check for saved theme preference or use the system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

// Apply the initial theme
if (initialTheme === 'dark') {
    html.classList.add('dark');
}

// Update the initial icon state
updateThemeToggleIcon(initialTheme === 'dark');

// Toggle theme
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeToggleIcon(isDark);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        html.classList.toggle('dark', e.matches);
        updateThemeToggleIcon(e.matches);
    }
});