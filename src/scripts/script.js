function startHome() {
  window.location.href = "index.html";
}

function startQuizzes() {
  window.location.href = "quizzes.html";
}

function startSobre() {
  window.location.href = "sobre.html";
}

function startEstudo() {
  window.location.href = "estudoDeCaso.html";
}

function startMateriaisEducativos() {
  window.location.href = "materiaisEducativos.html";
}

function startAprendizagem() {
  window.location.href = "aprendizagem.html";
}

function startFaq() {
  window.location.href = "faq.html";
}

function startCertificado() {
  window.location.href = "certificado.html";
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

//Quiz
const questions = {
  facil: [
    {
      pergunta: "O que significa DSDM?",
      opcoes: [
        "Dynamic Systems Development Method",
        "Development Standard Digital Model",
        "Dynamic Software Development Method",
      ],
      correta: 0,
    },
    {
      pergunta: "Qual é um dos princípios do DSDM?",
      opcoes: [
        "Entrega tardia",
        "Colaboração contínua",
        "Documentação extensiva",
      ],
      correta: 1,
    },
  ],
  medio: [
    {
      pergunta: "O DSDM enfatiza a entrega de que tipo de produto?",
      opcoes: [
        "Produto completo",
        "Produto incremental",
        "Produto final apenas",
      ],
      correta: 1,
    },
    {
      pergunta: "Qual é o papel principal responsável pelo escopo em DSDM?",
      opcoes: ["Desenvolvedor", "Usuário final", "Product Owner"],
      correta: 2,
    },
  ],
  dificil: [
    {
      pergunta:
        "Qual técnica é comumente usada no DSDM para priorizar requisitos?",
      opcoes: ["MoSCoW", "Kano", "Scrum Poker"],
      correta: 0,
    },
    {
      pergunta: "Em DSDM, o que significa 'MoSCoW'?",
      opcoes: [
        "Must Should Could Won't",
        "More Scope Co-Work",
        "Manage Software Code Workflow",
      ],
      correta: 0,
    },
  ],
};

let selectedQuestions = [];
let currentQuestion = 0;
let score = 0;

function startQuiz(difficulty) {
  selectedQuestions = questions[difficulty];
  currentQuestion = 0;
  score = 0;

  document.getElementById("difficulty-selection").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";

  showQuestion();
}

function showQuestion() {
  const q = selectedQuestions[currentQuestion];
  const questionText = document.getElementById("question-text");
  const answersDiv = document.getElementById("answers");
  const nextButton = document.getElementById("next-button");

  questionText.style.opacity = 0;
  answersDiv.style.opacity = 0;
  nextButton.style.display = "none";
  nextButton.classList.remove("pulse");

  setTimeout(() => {
    questionText.innerText = `Pergunta ${currentQuestion + 1} de ${
      selectedQuestions.length
    }:
  ${q.pergunta}`;
    answersDiv.innerHTML = "";

    q.opcoes.forEach((opcao, index) => {
      const btn = document.createElement("button");
      btn.innerText = opcao;
      btn.onclick = () => checkAnswer(index);
      answersDiv.appendChild(btn);
    });

    questionText.style.opacity = 1;
    answersDiv.style.opacity = 1;
  }, 200);
}

function checkAnswer(selected) {
  const correct = selectedQuestions[currentQuestion].correta;
  if (selected === correct) {
    score++;
  }

  Array.from(document.getElementById("answers").children).forEach(
    (btn) => (btn.disabled = true)
  );

  setTimeout(() => {
    const nextButton = document.getElementById("next-button");
    nextButton.style.display = "inline-block";
    nextButton.classList.add("pulse");
  }, 400);
}

function nextQuestion() {
  currentQuestion++;
  const nextButton = document.getElementById("next-button");
  nextButton.style.display = "none";
  nextButton.classList.remove("pulse");

  if (currentQuestion < selectedQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById(
    "score"
  ).innerText = `Você acertou ${score} de ${selectedQuestions.length} perguntas!`;
}

function restartQuiz() {
  location.reload();
}

//Responsividade
