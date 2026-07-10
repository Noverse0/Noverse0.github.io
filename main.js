// Theme toggle (default: respect prefers-color-scheme, stored preference wins)
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function getStoredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

applyTheme(getStoredTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// Language toggle (default: en)
const langToggle = document.getElementById('langToggle');

function getStoredLang() {
  return localStorage.getItem('lang') || 'en';
}

function applyLang(lang) {
  root.setAttribute('data-lang', lang);
  root.setAttribute('lang', lang === 'kr' ? 'ko' : 'en');
  localStorage.setItem('lang', lang);
}

applyLang(getStoredLang());

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-lang');
    applyLang(current === 'kr' ? 'en' : 'kr');
  });
}

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Scroll-based fade-in animation
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.section-header, .section-header-split, .focus-card, .pub-card-featured, .pub-item, .timeline-item, .project-card, .skill-group, .award-item, .news-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// Active nav link based on scroll position (rAF-throttled, .active class)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  let activeId = null;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      activeId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(() => {
    updateActiveNav();
    scrollTicking = false;
  });
});
