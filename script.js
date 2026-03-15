// ===== Sticky Navbar =====
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

function handleNavScroll() {
  if (window.scrollY > 80) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }
}
window.addEventListener('scroll', handleNavScroll, { passive: true });

// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = mobileNav.querySelectorAll('a');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileNav.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// ===== Scroll Reveal with Intersection Observer =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

// Assign staggered delays to elements within the same section
document.querySelectorAll('section').forEach(section => {
  const reveals = section.querySelectorAll('.reveal');
  reveals.forEach((el, i) => {
    el.dataset.delay = i * 120;
  });
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ===== Full Menu Modal =====
const menuModal = document.getElementById('menuModal');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

function openFullMenu() {
  menuModal.classList.add('open');
  menuModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeFullMenu() {
  menuModal.classList.remove('open');
  menuModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const cat = tab.dataset.cat;
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    menuCategories.forEach(c => {
      c.classList.toggle('active', c.dataset.cat === cat);
    });
  });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuModal.classList.contains('open')) {
    closeFullMenu();
  }
});
