const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

function updateHeader() {
  if (window.scrollY > 50 || mobileMenu.classList.contains("open")) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", updateHeader);

// ===== Menu mobile =====
menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  updateHeader();
});

document.querySelectorAll(".mobile-link, .mobile-contact").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    updateHeader();
  });
});

// Logo rola para o topo
document.querySelector("[data-scroll-top]").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Animação 3D do hero com scroll =====
const heroContent = document.getElementById("heroContent");
const scrollHint = document.getElementById("scrollHint");
let accumulated = 0;
let animationComplete = false;
const MAX = 700;

function applyHeroTransform(progress) {
  const translateY = progress * 200;
  const rotationX = progress * 45;
  const scale = 1 - progress * 0.3;
  heroContent.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`;
}

function handleWheel(e) {
  const atTop = window.scrollY === 0;
  if (atTop && !animationComplete) {
    e.preventDefault();
    accumulated = Math.max(0, Math.min(MAX, accumulated + e.deltaY));
    const progress = accumulated / MAX;
    applyHeroTransform(progress);
    if (progress >= 1) {
      animationComplete = true;
      scrollHint.classList.add("visible");
    }
  } else if (atTop && animationComplete && e.deltaY < 0) {
    e.preventDefault();
    accumulated = Math.max(0, Math.min(MAX, accumulated + e.deltaY));
    const progress = accumulated / MAX;
    applyHeroTransform(progress);
    if (progress < 1) {
      animationComplete = false;
      scrollHint.classList.remove("visible");
    }
  }
}

// Suporte a toque
let lastTouchY = 0;
function handleTouchStart(e) {
  lastTouchY = e.touches[0].clientY;
}
function handleTouchMove(e) {
  const atTop = window.scrollY === 0;
  const currentY = e.touches[0].clientY;
  const deltaY = lastTouchY - currentY;

  if (atTop && !animationComplete) {
    e.preventDefault();
    accumulated = Math.max(0, Math.min(MAX, accumulated + deltaY * 3));
    const progress = accumulated / MAX;
    applyHeroTransform(progress);
    if (progress >= 1) {
      animationComplete = true;
      scrollHint.classList.add("visible");
    }
  } else if (atTop && animationComplete && deltaY < 0) {
    e.preventDefault();
    accumulated = Math.max(0, Math.min(MAX, accumulated + deltaY * 3));
    const progress = accumulated / MAX;
    applyHeroTransform(progress);
    if (progress < 1) {
      animationComplete = false;
      scrollHint.classList.remove("visible");
    }
  }
  lastTouchY = currentY;
}

window.addEventListener("wheel", handleWheel, { passive: false });
window.addEventListener("touchstart", handleTouchStart, { passive: false });
window.addEventListener("touchmove", handleTouchMove, { passive: false });

// ===== Reveal ao entrar na viewport =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 100}ms`;
  revealObserver.observe(el);
});

// ===== Revelar imagens dos projetos =====
const imageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        imageObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll(".reveal-image").forEach((el) => imageObserver.observe(el));

// ===== Desenhar sublinhado laranja =====
const highlightObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("drawn");
        highlightObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".highlight").forEach((el) => highlightObserver.observe(el));

// ===== FAQ acordeão =====
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});
