/* =========================================
   APP INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initRevealOnScroll();
  initScrollTopButton();
  initHeroParallax();
});


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

function initRevealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const revealPoint = 150;

  function handleReveal() {
    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", handleReveal);
  handleReveal(); // run once on load
}


/* =========================================
   SCROLL TOP BUTTON + PROGRESS RING
========================================= */

function initScrollTopButton() {
  const btn = document.getElementById("scrollTopBtn");
  const progressBar = document.querySelector(".progress-bar");

  if (!btn || !progressBar) return;

  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  progressBar.style.strokeDasharray = circumference;
  progressBar.style.strokeDashoffset = circumference;

  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    const offset = circumference - progress * circumference;

    progressBar.style.strokeDashoffset = offset;

    // 🔥 FIX: safer visibility logic
    if (scrollTop > 150) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", updateScrollProgress);

  // 🔥 IMPORTANT: run once on load
  updateScrollProgress();

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}


/* =========================================
   HERO PARALLAX GLOW EFFECT
========================================= */

function initHeroParallax() {
  const glow = document.getElementById("heroParallax");

  if (!glow) return;

  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    glow.style.transform = `translate(${x}px, ${y}px)`;
  });
}