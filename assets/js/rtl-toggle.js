// Add favicon dynamically using the brand soundwave vinyl SVG icon
(function() {
  const faviconSvg = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='3' stroke-linecap='round'%3E%3Cline x1='4' y1='10' x2='4' y2='14'/%3E%3Cline x1='10' y1='5' x2='10' y2='19'/%3E%3Cline x1='16' y1='2' x2='16' y2='22'/%3E%3Cline x1='22' y1='8' x2='22' y2='16'/%3E%3C/svg%3E";
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    document.head.appendChild(link);
  }
  link.href = faviconSvg;
})();

// Run immediately to prevent layout flash
(function() {
  const isRtl = localStorage.getItem('rtl') === 'true';
  if (isRtl) {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
})();

// Set active button states on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const isRtl = localStorage.getItem('rtl') === 'true';
  const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
  if (isRtl) {
    rtlButtons.forEach(btn => btn.classList.add('active'));
  }
  
  rtlButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      if (currentDir === 'rtl') {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('rtl', 'false');
        rtlButtons.forEach(b => b.classList.remove('active'));
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('rtl', 'true');
        rtlButtons.forEach(b => b.classList.add('active'));
      }
    });
  });
});
