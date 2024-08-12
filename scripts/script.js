document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    hamburgerMenu.addEventListener('click', function() {
        mainNav.classList.toggle('show');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    audio.volume = 0.1; // Set volume (0.0 to 1.0) (Set lower for reviewer safety)
});