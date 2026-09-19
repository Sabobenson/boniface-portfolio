/* ==========================================================================
   Eng. Boniface Sankwa — Portfolio
   main.js — navigation, scroll effects, animated network background,
   project filtering + modal, reveal-on-scroll, contact form handling.
   No external JS libraries required (vanilla JS only).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initNavbar();
  initMobileNav();
  initSmoothScrollActive();
  initRevealOnScroll();
  initBackToTop();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initSignalBackground();
});

/* --- Footer year --- */
function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* --- Sticky navbar background on scroll --- */
function initNavbar() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  const toggleState = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  toggleState();
  window.addEventListener("scroll", toggleState, { passive: true });
}

/* --- Mobile hamburger menu --- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* --- Active nav link on scroll (IntersectionObserver) --- */
function initSmoothScrollActive() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  if (!sections.length || !navLinks.length) return;

  const map = new Map();
  navLinks.forEach((link) => map.set(link.getAttribute("href").slice(1), link));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* --- Reveal-on-scroll animation --- */
function initRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

/* --- Back to top button --- */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("is-visible", window.scrollY > 480),
    { passive: true }
  );
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --- Project category filtering --- */
function initProjectFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });
}

/* --- Project modal (quick-view) --- */
const PROJECT_DATA = {
  "network-design": {
    title: "Office Network Design with VLAN, DHCP & Internet Access",
    category: "Computer Networking",
    image: "assets/images/network-project.jpg",
    description:
      "Design and simulation of an office network implementing VLANs, DHCP, routing and Internet connectivity. The design segments departments into separate VLANs for traffic isolation and security, automates address assignment through DHCP, and configures routing to provide reliable internal and Internet connectivity.",
    tech: ["Cisco Packet Tracer", "VLAN", "DHCP", "Routing", "IP Addressing", "Network Design"],
    link: "projects/network-design.html",
  },
  pulmoxai: {
    title: "Explainable AI Model for Pulmonary Edema Detection",
    category: "Artificial Intelligence",
    image: "assets/images/pulmoxai.png",
    description:
      "An AI-based project for detecting pulmonary edema from chest X-ray images and providing explainable predictions using Explainable AI techniques, so that model outputs remain interpretable to a clinical audience rather than acting as a black box.",
    tech: ["Python", "TensorFlow/Keras", "ResNet", "Machine Learning", "Deep Learning", "Explainable AI", "Grad-CAM"],
    link: "projects/pulmoxai.html",
  },
  "wireless-network": {
    title: "Wireless Office Network + Security",
    category: "Wireless Networking",
    image: "assets/images/wireless-network.jpg",
    description:
      "Design and simulation of a wireless office network with secure wireless connectivity and supporting network infrastructure, covering address allocation, coverage planning and baseline security configuration.",
    tech: ["Wireless Networking", "IP Addressing", "DHCP", "Network Security", "Cisco Packet Tracer"],
    link: "projects/wireless-network.html",
  },
  "fiber-optics": {
    title: "Fiber Optic Communication & Splicing",
    category: "Telecommunications",
    image: "assets/images/fiber-optics.jpg",
    description:
      "A practical telecommunications project focused on fiber optic communication, installation concepts and fiber splicing, covering the fundamentals of optical signal transmission and hands-on splicing technique.",
    tech: ["Fiber Optics", "Fiber Splicing", "Optical Communication", "Network Infrastructure"],
    link: "projects/fiber-optics.html",
  },
};

function initProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const img = modal.querySelector(".modal-thumb img");
  const cat = modal.querySelector(".modal-cat");
  const title = modal.querySelector(".modal-title");
  const desc = modal.querySelector(".modal-desc");
  const techWrap = modal.querySelector(".modal-tech");
  const viewLink = modal.querySelector(".modal-view-link");
  const closeBtn = modal.querySelector(".modal-close");
  let lastFocused = null;

  function openModal(id) {
    const data = PROJECT_DATA[id];
    if (!data) return;
    img.src = data.image;
    img.alt = data.title;
    cat.textContent = data.category;
    title.textContent = data.title;
    desc.textContent = data.description;
    techWrap.innerHTML = "";
    data.tech.forEach((t) => {
      const span = document.createElement("span");
      span.textContent = t;
      techWrap.appendChild(span);
    });
    viewLink.href = data.link;

    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll("[data-project-id]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      const projectId = trigger.dataset.projectId;
      if (!PROJECT_DATA[projectId]) return;
      e.preventDefault();
      openModal(projectId);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
}

/* --- Contact form (static site — ready for Formspree integration) --- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (e) => {
    // NOTE: This form currently only validates and gives feedback locally.
    // To receive real messages, set the form's `action` attribute to your
    // Formspree endpoint (e.g. https://formspree.io/f/xxxxxxx) and remove
    // this preventDefault() call — see README.md for setup steps.
    status.textContent = "Sending your message…";
    status.className = "form-status is-visible";
  });
}

/* ==========================================================================
   Animated network / telecommunication background
   A single canvas of slowly drifting nodes connected by signal lines,
   evoking a network topology / fiber backbone. Respects reduced-motion.
   ========================================================================== */
function initSignalBackground() {
  const canvas = document.getElementById("signal-canvas");
  if (!canvas) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  let width, height, nodes;
  const NODE_COUNT_BASE = 60;
  const LINK_DIST = 150;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = Math.max(24, Math.min(NODE_COUNT_BASE, Math.floor((width * height) / 26000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.4 + 0.6,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.16;
          ctx.strokeStyle = `rgba(0, 217, 192, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 217, 192, 0.55)";
      ctx.fill();
    }

    if (!prefersReduced) requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize);
  step();

  // If reduced motion is preferred, draw a single static frame only.
  if (prefersReduced) step();
}
