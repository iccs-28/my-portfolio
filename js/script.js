
// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';

if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
}

document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');

            const currentTheme =
                document.documentElement.classList.contains('dark')
                    ? 'dark'
                    : 'light';

            localStorage.setItem('theme', currentTheme);
        });
    }

    // Mobile Navigation
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            const isExpanded = !mobileMenu.classList.contains('hidden');

            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.textContent = isExpanded ? '✕' : '☰';
        });

        // Close menu after clicking a navigation link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

    }

});