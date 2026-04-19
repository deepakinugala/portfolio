(() => {
  const root = document.documentElement;
  const key = "portfolio-theme";
  const saved = localStorage.getItem(key);
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem(key, next);
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
