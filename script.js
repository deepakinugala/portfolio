(() => {
  // ── Theme (persist across sessions) ──────────────────────────────────────
  const root = document.documentElement;
  const THEME_KEY = "portfolio-theme";
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // ── Year stamp ───────────────────────────────────────────────────────────
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ── Mobile hamburger menu ────────────────────────────────────────────────
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(open));
      hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Close on nav link click (single-page scroll)
    navLinks.addEventListener("click", e => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Open menu");
      }
    });
    // Close on outside click
    document.addEventListener("click", e => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ── Scroll-spy (highlight active nav section) ────────────────────────────
  const sections = document.querySelectorAll("main section[id]");
  const links    = document.querySelectorAll(".nav-links a[href^='#']");
  if (sections.length && links.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(a => {
          const active = a.getAttribute("href") === "#" + entry.target.id;
          a.setAttribute("aria-current", active ? "page" : "false");
        });
      });
    }, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });
    sections.forEach(s => spy.observe(s));
  }
})();
