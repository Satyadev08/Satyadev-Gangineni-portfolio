// Theme handling: respect saved preference or system preference on first load
(function () {
  const root = document.documentElement;
  const stored = window.localStorage.getItem('sg-theme');

  if (stored === 'light' || stored === 'dark') {
    root.setAttribute('data-theme', stored);
  } else {
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
})();

// Attach interactions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const yearEl = document.getElementById('year');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      
      // Add a class for animation
      root.classList.add('theme-transitioning');
      root.setAttribute('data-theme', next);
      window.localStorage.setItem('sg-theme', next);
      
      // Remove transition class after animation completes
      setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 400);
    });
  }

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // Optional: smooth-scroll for in-page links in older browsers
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});



