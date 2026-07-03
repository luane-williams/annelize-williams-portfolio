document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Language proficiency bars — fill on reveal
  const langBars = document.querySelectorAll('.lang-bar__fill');
  if ('IntersectionObserver' in window && langBars.length) {
    const langIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.getAttribute('data-fill') || '0';
          entry.target.style.width = fill + '%';
          langIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    langBars.forEach(bar => langIo.observe(bar));
  } else {
    langBars.forEach(bar => { bar.style.width = (bar.getAttribute('data-fill') || '0') + '%'; });
  }

  // Top route progress bar (whole page)
  const progressFill = document.getElementById('routeProgress');
  function updateProgress() {
    if (!progressFill) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = pct + '%';
  }

  // Route marker travels down the experience timeline as it scrolls into view
  const routeEl = document.getElementById('route');
  const routeMarker = document.getElementById('routeMarker');
  function updateRouteMarker() {
    if (!routeEl || !routeMarker) return;
    const rect = routeEl.getBoundingClientRect();
    const viewportCenter = window.innerHeight * 0.5;
    const total = rect.height;
    let progress = (viewportCenter - rect.top) / total;
    progress = Math.max(0, Math.min(1, progress));
    routeMarker.style.top = (progress * (total - 36)) + 'px';
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        updateRouteMarker();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateProgress();
  updateRouteMarker();
});
