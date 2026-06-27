/**
 * Theme Toggle Script for Independent Music Label
 * Automatically sets theme to Dark Mode by default (Primary Experience)
 */

(function () {
  const THEME_KEY = 'indie-label-theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem(THEME_KEY) || DARK_THEME;

  // Apply theme immediately to prevent flashing
  document.documentElement.setAttribute('data-theme', savedTheme);

  document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
  });

  function setupThemeToggle() {
    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    
    // Set initial icon state based on active theme
    updateToggleIcons(savedTheme);

    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || DARK_THEME;
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        updateToggleIcons(newTheme);
      });
    });
  }

  function updateToggleIcons(theme) {
    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach(btn => {
      if (theme === DARK_THEME) {
        // Show light icon (sun) to toggle to light mode
        btn.innerHTML = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/></svg>';
      } else {
        // Show dark icon (moon) to toggle to dark mode
        btn.innerHTML = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\"/></svg>';
      }
    });
  }
})();
