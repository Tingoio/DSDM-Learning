function startQuiz() {
  window.location.href = "quizzes.html";
}

function startSobre() {
  window.location.href = "sobre.html";
}

function startEstudo() {
  window.location.href = "estudoDeCaso.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  elements.forEach((el) => observer.observe(el));

  const menuBtn = document.querySelector(".menu-btn");
  const navMenu = document.querySelector("nav");

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("menu-active");
    menuBtn.classList.toggle("active");
  });
});

document.getElementById("logo-title").addEventListener("click", function () {
  window.location.href = "index.html";
});
