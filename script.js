(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Tier-specific checkout links
  var links = (window.__CHECKOUT_LINKS__ || {});
  var map = {
    "enroll-top": links.pro,
    "enroll-starter": links.starter,
    "enroll-pro": links.pro,
    "enroll-elite": links.elite,
    "enroll-cta-starter": links.starter,
    "enroll-cta-pro": links.pro,
    "enroll-cta-elite": links.elite
  };
  Object.keys(map).forEach(function(id){
    var btn = document.getElementById(id);
    if (!btn) return;
    var url = map[id];
    if (typeof url === 'string' && url.trim()) {
      btn.setAttribute('href', url);
    } else {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        alert('Add your Stripe Checkout links in index.html to enable purchases.');
      });
    }
  });

  // Reveal on scroll
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.card, .video-card, .price-card, .cta-card, .faq-list details').forEach(function(el){
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Smooth scroll for [data-scroll] with header offset fallback
  document.querySelectorAll('[data-scroll][href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      var el = id ? document.querySelector(id) : null;
      if (!el) return;
      e.preventDefault();
      try {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (_) {
        var header = document.querySelector('.site-header');
        var offset = header ? (header.getBoundingClientRect().height + 8) : 72;
        var y = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Consent banner logic
  var CONSENT_KEY = "ai-course-consent";
  var consent = localStorage.getItem(CONSENT_KEY);
  var consentEl = document.getElementById("consent");
  if (consentEl && !consent) {
    consentEl.hidden = false;
    consentEl.querySelectorAll("[data-consent]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var val = btn.getAttribute("data-consent");
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
    var s = document.createElement("script");
    s.defer = true;
    s.setAttribute("data-domain", "example.com");
    s.src = "https://plausible.io/js/script.js";
    s.id = "plausible";
    document.head.appendChild(s);
  }
})();


