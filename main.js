// Theme toggle (default: light)
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function getStoredTheme() {
  return localStorage.getItem('theme') || 'light';
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

applyTheme(getStoredTheme());

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Language toggle (default: kr)
const langToggle = document.getElementById('langToggle');

function getStoredLang() {
  return localStorage.getItem('lang') || 'kr';
}

function applyLang(lang) {
  root.setAttribute('data-lang', lang);
  root.setAttribute('lang', lang === 'kr' ? 'ko' : 'en');
  localStorage.setItem('lang', lang);
}

applyLang(getStoredLang());

langToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-lang');
  applyLang(current === 'kr' ? 'en' : 'kr');
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

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

// Scroll-based fade-in animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section-header, .section-header-split, .focus-card, .pub-card-featured, .pub-item, .timeline-item, .project-card, .skill-group, .award-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.style.color = 'var(--primary)';
        } else {
          link.style.color = '';
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
