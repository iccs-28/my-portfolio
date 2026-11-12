
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

    // Back-to-hero button (footer-aware)
    const backToHero = document.getElementById('back-to-hero');
    const heroSection = document.getElementById('hero');
    const footer = document.querySelector('footer');

    const BASE_BOTTOM = 24;  // matches bottom-6 (1.5rem)
    const FOOTER_GAP = 16;  // breathing room above footer

    if (backToHero && heroSection) {

        const updateButton = () => {
            // 1. Visibility — show once the hero is fully scrolled past
            const heroBottom =
                heroSection.getBoundingClientRect().bottom + window.scrollY;

            if (window.scrollY > heroBottom) {
                backToHero.classList.add('is-visible');
            } else {
                backToHero.classList.remove('is-visible');
            }

            // 2. Offset — lift above footer when footer is in view
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const overlap = Math.max(0, window.innerHeight - footerRect.top);
                backToHero.style.bottom = `${BASE_BOTTOM + overlap + FOOTER_GAP}px`;
            }
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateButton();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateButton, { passive: true });

        // initial state
        updateButton();

        // scroll back to top on click
        backToHero.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth scroll for in-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            // Account for sticky/fixed header height if you have one
            const headerOffset = 80; // adjust to your header height, or 0
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update URL without jumping
            history.pushState(null, '', targetId);
        });
    });
});