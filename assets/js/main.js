/**
 * Main JavaScript File for Independent Music Label Template
 * Handles Audio Player interaction, category filtering, form submissions, and UI scroll effects.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      document.body.classList.add('navbar-scrolled');
    } else {
      document.body.classList.remove('navbar-scrolled');
    }
  });

  // Active state highlighting for navbar dropdown links
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  let homeDropdownActive = false;
  document.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
      homeDropdownActive = true;
    }
  });
  if (homeDropdownActive) {
    const parentLink = document.querySelector('.nav-link-dropdown > .nav-link');
    if (parentLink) {
      parentLink.classList.add('active');
    }
  }

  // Category Filtering (Artists & Releases)
  setupGridFilters();

  // Custom Audio Player Demo Integration (UI states only)
  setupDemoAudioPlayers();

  // Submissions, Newsletter and Contact Form Validation
  setupForms();

  // Lazy loading setup
  setupLazyLoading();

  // Back to top button setup
  setupBackToTop();
});

/**
 * Handle category filtering for releases.html and artists.html
 */
function setupGridFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('[data-category]');

  if (filterBtns.length === 0 || items.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      filterBtns.forEach(b => b.classList.remove('active', 'btn-accent'));
      filterBtns.forEach(b => b.classList.add('btn-editorial'));
      
      btn.classList.add('active', 'btn-accent');
      btn.classList.remove('btn-editorial');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategories = item.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || itemCategories.includes(filterValue)) {
          item.style.display = 'block';
          // trigger GSAP reveal if loaded
          if (window.gsap) {
            window.gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
          } else {
            item.style.opacity = '1';
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Initialize Audio Player Mockups (UI only demo)
 */
function setupDemoAudioPlayers() {
  const players = document.querySelectorAll('.audio-player-container');
  if (players.length === 0) return;

  players.forEach(player => {
    const playBtn = player.querySelector('.play-pause-btn');
    const progressBarWrap = player.querySelector('.progress-bar-wrap');
    const progressBarFill = player.querySelector('.progress-bar-fill');
    const trackTime = player.querySelector('.track-time');
    
    let isPlaying = false;
    let progressPercent = 30; // Initial mock progress
    let playbackInterval = null;

    if (!playBtn || !progressBarWrap || !progressBarFill) return;

    // Toggle Play/Pause UI
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      
      if (isPlaying) {
        player.classList.add('playing');
        playBtn.innerHTML = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\"/><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\"/></svg>';
        
        // Start moving progress bar mock
        playbackInterval = setInterval(() => {
          progressPercent += 0.5;
          if (progressPercent >= 100) {
            progressPercent = 0;
            isPlaying = false;
            player.classList.remove('playing');
            clearInterval(playbackInterval);
            playBtn.innerHTML = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"6 3 20 12 6 21 6 3\"/></svg>';
          }
          progressBarFill.style.width = `${progressPercent}%`;
          if (trackTime) {
            const totalSec = 180;
            const currentSec = Math.floor((progressPercent / 100) * totalSec);
            trackTime.textContent = `${formatTime(currentSec)} / ${formatTime(totalSec)}`;
          }
        }, 300);
      } else {
        player.classList.remove('playing');
        playBtn.innerHTML = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"6 3 20 12 6 21 6 3\"/></svg>';
        clearInterval(playbackInterval);
      }
    });

    // Custom scrubber clicking
    progressBarWrap.addEventListener('click', (e) => {
      const rect = progressBarWrap.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      progressPercent = (clickX / width) * 100;
      progressBarFill.style.width = `${progressPercent}%`;
      
      if (trackTime) {
        const totalSec = 180;
        const currentSec = Math.floor((progressPercent / 100) * totalSec);
        trackTime.textContent = `${formatTime(currentSec)} / ${formatTime(totalSec)}`;
      }
    });
  });
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Handle submission feedback for forms without reloading page
 */
function setupForms() {
  const forms = document.querySelectorAll('.editorial-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Select submit button
      const submitBtn = form.querySelector('[type=\"submit\"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
      }
      
      // Simulate API submit delay
      setTimeout(() => {
        // Show success alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success mt-4 rounded-0 font-headings border-0';
        alertDiv.style.backgroundColor = 'var(--color-accent)';
        alertDiv.style.color = '#FFFFFF';
        alertDiv.textContent = 'Submission received successfully. We will get in touch shortly.';
        
        form.appendChild(alertDiv);
        form.reset();
        
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }

        // Fade alert after 4 seconds
        setTimeout(() => {
          alertDiv.style.transition = 'opacity 0.5s ease';
          alertDiv.style.opacity = '0';
          setTimeout(() => alertDiv.remove(), 500);
        }, 4000);
      }, 1500);
    });
  });
}

/**
 * Basic lazy loading fallback for browsers without native support
 */
function setupLazyLoading() {
  const images = document.querySelectorAll('img[loading=\"lazy\"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          if (image.dataset.src) {
            image.src = image.dataset.src;
          }
          image.classList.add('fade-in-img');
          imageObserver.unobserve(image);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  }
}

/**
 * Dynamically create and setup the Back to Top button
 */
function setupBackToTop() {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'back-to-top';
  backToTopBtn.className = 'back-to-top-btn';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  
  // Upward chevron SVG
  backToTopBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="m18 15-6-6-6 6"/>
    </svg>
  `;
  
  document.body.appendChild(backToTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
