/**
 * GSAP Animation Controller for Independent Music Label
 * Creates modern, editorial transitions, fade-ups, and smooth elements reveal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP is loaded before configuring animations
  if (typeof gsap === 'undefined') {
    console.warn('GSAP is not loaded. Falling back to CSS animations.');
    // Enable simple CSS fallback for scroll animations
    document.querySelectorAll('.animate-fade-up').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Register ScrollTrigger plugin if it exists
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Initial Page/Hero Reveal
  initHeroTransitions();

  // 2. Scroll Triggered Fade Up Animations
  initScrollAnimations();

  // 3. Album Cover Hover Rotations (Vinyl slide)
  initInteractiveAnimations();
});

function initHeroTransitions() {
  // Editorial grid layout fade-in
  gsap.from('.custom-navbar', {
    y: -30,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  });

  if (document.querySelector('.hero-title')) {
    gsap.from('.hero-title', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: 'power3.out'
    });
  }

  if (document.querySelector('.hero-sub')) {
    gsap.from('.hero-sub', {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: 'power2.out'
    });
  }

  if (document.querySelector('.hero-action')) {
    gsap.from('.hero-action', {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      delay: 0.9,
      ease: 'power1.out'
    });
  }
}

function initScrollAnimations() {
  if (typeof ScrollTrigger === 'undefined') {
    // Basic fade-in for scroll items without ScrollTrigger
    gsap.to('.scroll-reveal', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    });
    return;
  }

  // Stagger grid item entries
  const revealSections = document.querySelectorAll('.scroll-reveal-section');
  revealSections.forEach(section => {
    const cards = section.querySelectorAll('.scroll-reveal-card');
    
    gsap.from(cards, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // Parallax background scroll effect on heavy hero visual sections
  const parallaxContainers = document.querySelectorAll('.hero-parallax-wrap');
  parallaxContainers.forEach(container => {
    const img = container.querySelector('.hero-parallax-img');
    if (!img) return;

    gsap.to(img, {
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      yPercent: 20,
      ease: 'none'
    });
  });
}

function initInteractiveAnimations() {
  // Hover effects on cards
  const releaseCards = document.querySelectorAll('.vinyl-hover-interaction');
  releaseCards.forEach(card => {
    const vinyl = card.querySelector('.vinyl-record');
    const cover = card.querySelector('.release-img-wrap');

    if (!vinyl || !cover) return;

    card.addEventListener('mouseenter', () => {
      gsap.to(vinyl, {
        xPercent: 45,
        rotation: 360,
        duration: 1,
        ease: 'power2.out'
      });
      gsap.to(cover, {
        xPercent: -5,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(vinyl, {
        xPercent: 0,
        rotation: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
      gsap.to(cover, {
        xPercent: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  });
}
