const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((element) => {
  observer.observe(element);
});

const navLinks = document.querySelectorAll(".nav-link");
let currentPage = window.location.pathname.split("/").pop();

// Handle homepage cases
if (currentPage === "" || currentPage === "index.html") {
  currentPage = "home.html";
}

navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
 function animateCounter(el, target, prefix = '', suffix = '', duration = 1800) {
    const startTime = performance.now();

    // Easing: ease-out cubic
    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const current = Math.round(easedProgress * target);

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  function initStats() {
    const items = document.querySelectorAll('.stat-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const counter = item.querySelector('.counter');
          const target = parseFloat(item.dataset.target);
          const prefix = item.dataset.prefix || '';
          const suffix = item.dataset.suffix || '';
          const delay = parseFloat(item.style.transitionDelay || '0') * 1000;

          // Trigger the fade-in slide-up
          item.classList.add('visible');

          // Start counting after the fade-in delay
          setTimeout(() => {
            animateCounter(counter, target, prefix, suffix);
          }, delay);

          observer.unobserve(item);
        }
      });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
  }

  document.addEventListener('DOMContentLoaded', initStats);