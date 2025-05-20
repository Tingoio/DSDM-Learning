let currentSelectedAnswer = null;

function showQuestion() {
  const q = selectedQuestions[currentQuestion];
  const questionText = document.getElementById("question-text");
  const answersDiv = document.getElementById("answers");
  const confirmButton = document.getElementById("confirm-button");
  const nextButton = document.getElementById("next-button");

  currentSelectedAnswer = null;

  questionText.style.opacity = 0;
  answersDiv.style.opacity = 0;
  confirmButton.style.display = "none";
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
      btn.onclick = () => selectAnswer(index);
      answersDiv.appendChild(btn);
    });

    questionText.style.opacity = 1;
    answersDiv.style.opacity = 1;
    confirmButton.style.display = "inline-block";
  }, 200);
}

function selectAnswer(index) {
  const buttons = Array.from(document.getElementById("answers").children);
  buttons.forEach((btn) => btn.classList.remove("selected"));
  buttons[index].classList.add("selected");
  currentSelectedAnswer = index;
  document.getElementById("confirm-button").style.display = "inline-block";
}

function confirmAnswer() {
  if (currentSelectedAnswer === null) return;
  const correct = selectedQuestions[currentQuestion].correta;
  if (currentSelectedAnswer === correct) {
    score++;
  }
  const buttons = Array.from(document.getElementById("answers").children);
  buttons.forEach((btn) => (btn.disabled = true));
  document.getElementById("confirm-button").style.display = "none";
  const nextButton = document.getElementById("next-button");
  nextButton.style.display = "inline-block";
  nextButton.classList.add("pulse");
}

function startQuiz(difficulty) {
  selectedQuestions = questions[difficulty];
  currentQuestion = 0;
  score = 0;
  currentSelectedAnswer = null;
  document.getElementById("difficulty-selection").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";
  showQuestion();
}
