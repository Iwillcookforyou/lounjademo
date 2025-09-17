// Set current year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Tier-specific checkout links
const links = (window.__CHECKOUT_LINKS__ || {});
const map = {
  "enroll-top": links.pro,
  "enroll-starter": links.starter,
  "enroll-pro": links.pro,
  "enroll-elite": links.elite,
  "enroll-cta-starter": links.starter,
  "enroll-cta-pro": links.pro,
  "enroll-cta-elite": links.elite
};

Object.keys(map).forEach((id) => {
  const btn = document.getElementById(id);
  if (!btn) return;
  const url = map[id];
  if (typeof url === 'string' && url.trim()) {
    btn.setAttribute('href', url);
  } else {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Add your Stripe Checkout links in index.html to enable purchases.');
    });
  }
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .video-card, .price-card, .cta-card, .faq-list details').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Smooth scroll for [data-scroll] with header offset fallback
document.querySelectorAll('[data-scroll][href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const el = id ? document.querySelector(id) : null;
    if (!el) return;
    e.preventDefault();
    try {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (_) {
      const header = document.querySelector('.site-header');
      const offset = header ? (header.getBoundingClientRect().height + 8) : 72;
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// Consent banner logic
const CONSENT_KEY = "ai-course-consent";
const consent = localStorage.getItem(CONSENT_KEY);
const consentEl = document.getElementById("consent");

if (consentEl && !consent) {
  consentEl.hidden = false;
  consentEl.querySelectorAll("[data-consent]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-consent");
      localStorage.setItem(CONSENT_KEY, val || "decline");
      consentEl.hidden = true;
      if (val === "accept") {
        enableAnalytics();
      }
    });
  });
} else if (consent === "accept") {
  enableAnalytics();
}

function enableAnalytics() {
  // Placeholder: Plausible. Replace with your provider of choice.
  if (document.getElementById("plausible")) return;
  const s = document.createElement("script");
  s.defer = true;
  s.setAttribute("data-domain", "example.com");
  s.src = "https://plausible.io/js/script.js";
  s.id = "plausible";
  document.head.appendChild(s);
}


