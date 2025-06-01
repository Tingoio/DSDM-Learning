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
    {
      pergunta: "O DSDM é considerado uma metodologia ágil ou tradicional?",
      opcoes: [
        "Tradicional (Cascata)",
        "Híbrida (parte ágil, parte tradicional)",
        "Ágil",
      ],
      correta: 2,
    },
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
      pergunta:
        "Qual técnica é comumente usada no DSDM para priorizar requisitos?",
      opcoes: ["MoSCoW", "Kano", "Scrum Poker"],
      correta: 0,
    },
  ],
  medio: [
    {
      pergunta:
        "Como o DSDM trata o envolvimento dos usuários no processo de desenvolvimento?",
      opcoes: [
        "Os usuários são consultados apenas no início (levantamento de requisitos) e no final (aceitação).",
        "O envolvimento dos usuários é constante e ativo durante todo o ciclo de vida do projeto, garantindo que a solução atenda às suas necessidades.",
        "Apenas um representante dos usuários (Product Owner) interage com a equipe de desenvolvimento.",
        "O feedback dos usuários é coletado formalmente através de relatórios escritos ao final de cada timebox.",
      ],
      correta: 1,
    },
    {
      pergunta:
        "Um dos 8 princípios do DSDM é 'Foco no valor de negócio'. Qual dos seguintes NÃO é um princípio do DSDM?",
      opcoes: [
        "Entregar no Prazo",
        "Colaborar continuamente",
        "Evitar comprometimento da qualidade",
        "Seguir o plano rigidamente, mesmo que as circunstâncias mudem",
      ],
      correta: 3,
    },
    {
      pergunta: "O DSDM pode ser aplicado em que tipos de projetos?",
      opcoes: [
        "Exclusivamente em grandes projetos de desenvolvimento de software.",
        "Apenas em pequenos projetos com equipes de no máximo 5 pessoas.",
        "Somente em projetos onde os requisitos são completamente conhecidos e estáveis desde o início.",
        "Tanto em projetos de desenvolvimento de software quanto em projetos de negócio e transformação digital, sendo flexível para diferentes escopos.",
      ],
      correta: 3,
    },
    {
      pergunta: 'Qual a duração típica de uma iteração (ou "timebox") em DSDM?',
      opcoes: [
        "Um dia, para feedback rápido.",
        "De 2 a 4 semanas.",
        "De 2 a 3 meses, para permitir o desenvolvimento de funcionalidades complexas.",
        "A duração é definida pelo cliente no início do projeto e não pode ser alterada.",
      ],
      correta: 1,
    },
    {
      pergunta:
        "Qual das seguintes fases NÃO pertence ao ciclo de vida padrão do DSDM?",
      opcoes: [
        "Estudo de Viabilidade.",
        "Fundação.",
        "Manutenção Contínua Detalhada.",
        "Evolução Iterativa.",
      ],
      correta: 2,
    },
  ],
  dificil: [
    {
      pergunta:
        "Como a metodologia DSDM gerencia as variáveis de tempo, custo e funcionalidade em um projeto, em contraste com abordagens tradicionais?",
      opcoes: [
        "O DSDM fixa o tempo e o custo do projeto, permitindo que a funcionalidade seja ajustada para atender a esses limites.",
        "O DSDM considera a funcionalidade como fixa, permitindo que tempo e custos variem.",
        "Todas as variáveis (tempo, custo, funcionalidade) são estritamente fixas desde o início no DSDM.",
        "O DSDM permite que todas as variáveis (tempo, custo, funcionalidade) sejam flexíveis e negociadas continuamente.",
      ],
      correta: 0,
    },
    {
      pergunta:
        'Uma das práticas importantes no DSDM é a "Prototipagem Evolutiva". Qual seu principal benefício?',
      opcoes: [
        "Substituir completamente a necessidade de documentação escrita.",
        "Criar rapidamente versões iniciais da solução para validar requisitos e obter feedback dos usuários, refinando-as iterativamente.",
        "Permitir que a equipe de desenvolvimento trabalhe isoladamente até ter um protótipo final.",
        "Garantir que o design visual do sistema seja definido e aprovado antes do início da codificação.",
      ],
      correta: 1,
    },
    {
      pergunta:
        "Como o DSDM lida com mudanças nos requisitos durante o desenvolvimento?",
      opcoes: [
        "As mudanças são estritamente proibidas após a fase de Fundação para não impactar o cronograma.",
        "As mudanças são sempre bem-vindas e incorporadas, mesmo que isso atrase significativamente o projeto.",
        "As mudanças são aceitas, mas devem ser gerenciadas dentro dos limites do timebox atual e das prioridades definidas (MoSCoW), podendo levar à substituição de funcionalidades menos prioritárias.",
        "As mudanças só podem ser implementadas em uma nova versão do projeto, após a conclusão da atual.",
      ],
      correta: 2,
    },
    {
      pergunta:
        'A fase de "Fundação" no DSDM tem como um de seus principais objetivos:',
      opcoes: [
        "Entregar a primeira versão funcional e implantável do sistema.",
        "Realizar um estudo de viabilidade técnica e econômica detalhado para aprovação do projeto.",
        "Estabelecer um entendimento básico do escopo do negócio, da arquitetura da solução e dos padrões de qualidade que serão seguidos.",
        "Treinar os usuários finais e coletar feedback sobre o produto já desenvolvido.",
      ],
      correta: 2,
    },
    {
      pergunta: 'Qual é a importância do "Timeboxing" na metodologia DSDM?',
      opcoes: [
        "É uma técnica para estimar o custo total do projeto com alta precisão.",
        "Define blocos de tempo fixos e curtos (iterações) nos quais um conjunto de funcionalidades deve ser entregue, ajudando a controlar o progresso e o prazo.",
        "Refere-se ao tempo total alocado para a documentação do projeto.",
        "É o período reservado exclusivamente para testes ao final de cada fase.",
      ],
      correta: 1,
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
