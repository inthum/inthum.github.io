function normalizePath(pathname) {
  return pathname.replace(/index\.html$/, "");
}

function markActiveNav() {
  const current = normalizePath(window.location.pathname);

  document.querySelectorAll(".topnav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const url = new URL(href, window.location.href);
    const target = normalizePath(url.pathname);

    if (current === target) {
      link.setAttribute("aria-current", "page");
      link.style.color = "var(--accent)";
      link.style.fontWeight = "600";
    }
  });
}

function annotateToolCards() {
  document.querySelectorAll(".tool-card").forEach((card) => {
    const link = card.querySelector(".card-link");
    const tag = card.querySelector(".tool-tag");
    if (!link || !tag) return;

    const href = link.getAttribute("href") || "";
    const isLive = !href.startsWith("#") && href !== "";

    tag.textContent = isLive ? "Live" : "Planned";
    tag.classList.toggle("tool-tag-soft", !isLive);
  });
}

function addSubtleReveal() {
  const cards = document.querySelectorAll(".tool-card, .metric, .panel-card");

  cards.forEach((card, index) => {
    card.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 420,
        delay: index * 45,
        easing: "ease-out",
        fill: "both"
      }
    );
  });
}

window.addEventListener("DOMContentLoaded", () => {
  markActiveNav();
  annotateToolCards();
  addSubtleReveal();
});