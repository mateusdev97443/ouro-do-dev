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
  if (window.scrollY > 700) {
    backToTopButton.classList.add("is-visible");
  } else {
    backToTopButton.classList.remove("is-visible");
  }
}

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

checklistInputs.forEach((input, index) => {
  const savedValue = localStorage.getItem(`ouro-dev-check-${index}`);

  if (savedValue === "true") {
    input.checked = true;
  }

  input.addEventListener("change", () => {
    localStorage.setItem(`ouro-dev-check-${index}`, input.checked);
  });
});

window.addEventListener("scroll", () => {
  updateActiveLink();
  updateBackToTopButton();
});

updateActiveLink();
updateBackToTopButton();
