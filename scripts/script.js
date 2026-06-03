const navLinks = document.querySelectorAll(".sidebar__nav a");
const sections = document.querySelectorAll(".section-card[id]");
const backToTopButton = document.querySelector(".back-to-top");
const checklistInputs = document.querySelectorAll(".checklist input");

function updateActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 160) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("is-active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("is-active");
    }
  });
}

function updateBackToTopButton() {
  if (!backToTopButton) {
    return;
  }

  if (window.scrollY > 700) {
    backToTopButton.classList.add("is-visible");
  } else {
    backToTopButton.classList.remove("is-visible");
  }
}

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

checklistInputs.forEach((input, index) => {
  const storageKey = `ouro-dev-check-${index}`;
  const savedValue = localStorage.getItem(storageKey);

  if (savedValue === "true") {
    input.checked = true;
  }

  input.addEventListener("change", () => {
    localStorage.setItem(storageKey, input.checked);
  });
});

window.addEventListener("scroll", () => {
  updateActiveLink();
  updateBackToTopButton();
});

updateActiveLink();
updateBackToTopButton();

/* =========================================================
   CHECKPOINT 44 — MENU RECOLHÍVEL POR GRUPOS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const groupNames = [
    "INÍCIO / ORIENTAÇÃO",
    "HTML",
    "CSS",
    "JAVASCRIPT",
    "FERRAMENTAS",
    "CARREIRA",
  ];

  const normalizeText = (text) =>
    text
      .trim()
      .replace(/\s+/g, " ")
      .toUpperCase();

  const possibleRoots = Array.from(
    document.querySelectorAll("nav, aside, header, .sidebar, .site-menu, .manual-menu")
  );

  const menuRoot =
    possibleRoots.find((element) => {
      const text = normalizeText(element.textContent || "");
      const links = element.querySelectorAll("a").length;

      return links >= 10 && groupNames.some((name) => text.includes(name));
    }) || document.querySelector("nav");

  if (!menuRoot) return;

  const headings = Array.from(menuRoot.querySelectorAll("*")).filter((element) => {
    const text = normalizeText(element.textContent || "");
    const hasOnlyText = element.children.length === 0;

    return hasOnlyText && groupNames.includes(text);
  });

  if (!headings.length) return;

  menuRoot.classList.add("manual-menu-enhanced");

  headings.forEach((heading, index) => {
    const title = normalizeText(heading.textContent || "");

    if (heading.dataset.collapsibleReady === "true") return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "manual-menu-toggle";
    button.textContent = heading.textContent.trim();
    button.setAttribute("aria-expanded", index === 0 ? "true" : "false");

    heading.dataset.collapsibleReady = "true";
    heading.replaceWith(button);

    const getGroupItems = () => {
      const items = [];
      let current = button.nextElementSibling;

      while (current) {
        const currentText = normalizeText(current.textContent || "");

        if (groupNames.includes(currentText)) break;

        if (current.classList.contains("manual-menu-toggle")) break;

        items.push(current);
        current = current.nextElementSibling;
      }

      return items;
    };

    const setOpen = (isOpen) => {
      button.classList.toggle("is-open", isOpen);
      button.setAttribute("aria-expanded", String(isOpen));

      getGroupItems().forEach((item) => {
        item.classList.toggle("manual-menu-item-hidden", !isOpen);
      });

      localStorage.setItem(`ouro-menu-${title}`, String(isOpen));
    };

    const saved = localStorage.getItem(`ouro-menu-${title}`);
    const shouldOpen = saved === null ? index === 0 : saved === "true";

    setOpen(shouldOpen);

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });
  });
});
