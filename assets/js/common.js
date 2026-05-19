// ── COMMON SCRIPTS ──
// Shared behavior across pages

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
let cursorActive = false;

const updateCursor = (x, y) => {
  mouseX = x;
  mouseY = y;
  dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  if (!cursorActive) {
    cursorActive = true;
    dot.classList.add('active');
    ring.classList.add('active');
  }
};

document.addEventListener('mousemove', e => {
  updateCursor(e.clientX, e.clientY);
});

document.addEventListener('mouseenter', e => {
  updateCursor(e.clientX, e.clientY);
});

function animRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
  requestAnimationFrame(animRing);
}
requestAnimationFrame(animRing);

const interactiveElements = document.querySelectorAll(
  'a, button, input, textarea, select, .nav-cta, .menu-mobile-btn, .mobile-close, .service-card, .project-row, .contact-item'
);

const activateCursorHover = () => {
  ring.classList.add('hovered');
  dot.classList.add('hovered');
};

const deactivateCursorHover = () => {
  ring.classList.remove('hovered');
  dot.classList.remove('hovered');
};

interactiveElements.forEach(el => {
  el.addEventListener('pointerenter', activateCursorHover);
  el.addEventListener('pointerleave', deactivateCursorHover);
});

document.addEventListener('mouseleave', deactivateCursorHover);
window.addEventListener('blur', deactivateCursorHover);

const header = document.getElementById('header');
function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', onScroll, { passive: true });

// ── MOBILE MENU ──
document.getElementById('menuBtn').onclick = () =>
  document.getElementById('mobileOverlay').classList.add('open');
document.getElementById('mobileClose').onclick = closeMobile;

function closeMobile() {
  document.getElementById('mobileOverlay').classList.remove('open');
}

// ── REVEAL ON SCROLL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── FORM HANDLING ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const notify = document.getElementById('notify');
    notify.classList.add('show');
    e.target.reset();
    setTimeout(() => notify.classList.remove('show'), 4000);
  });
}

// ── NAV ACTIVE STATE ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a:not(.nav-cta)');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id
          ? 'var(--stone)' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => navObserver.observe(s));
