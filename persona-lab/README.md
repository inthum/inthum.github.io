const questions = [
  "Sinto-me mal quando tenho de recusar alguma coisa ou dizer que não.",
  "Estou seguro dos meus direitos e sei defendê-los sem interferir nos dos outros.",
  "Sou uma pessoa prudente, não me entrego facilmente se não conheço bem uma pessoa.",
  "Sou uma pessoa autoritária e decidida.",
  "De uma maneira geral, penso que é melhor agir por interposta pessoa do que diretamente.",
  "Sou direto! Digo aos outros aquilo que penso e não tenho receio de os criticar, doa a quem doer.",
  "Não ouso dar a minha opinião diante de um grupo ou numa reunião de trabalho.",
  "Dou a minha opinião desapaixonadamente, mesmo que contrarie a opinião geral.",
  "Num debate, observo e estou atento ao que está à minha volta para poder definir a minha estratégia.",
  "Censuram-me muitas vezes por ter espírito de contradição.",
  "Tenho dificuldade em escutar os outros.",
  "Tento estar por dentro de todos os meandros porque isso, mais tarde, pode vir a ser-me útil.",
  "Em geral, consideram-me bastante hábil nas relações com os outros.",
  "Tenho confiança nas pessoas que me rodeiam.",
  "Não ouso pedir ajuda, tenho medo que me julguem incapaz ou incompetente.",
  "Tenho dificuldade em decidir quando tenho de fazer qualquer coisa pouco habitual.",
  "Sou um falso calmo: quando me enervo faço, muitas vezes, rir os outros.",
  "Sinto-me à vontade com as pessoas que me rodeiam, tanto em grupo como nas relações face a face.",
  "Utilizo muitas vezes à comédia para fazer rir os outros.",
  "Corto, muitas vezes, a palavra aos outros sem me dar conta disso.",
  "Gosto de dar a última palavra e de impor o meu ponto de vista.",
  "Sei o que é preciso ver e quando é preciso fazer, isso é importante para se ser bem sucedido.",
  "Regulo os desacordos procurando um compromisso realista que satisfaça as duas partes.",
  "Prefiro agir francamente sem esconder as minhas intenções.",
  "Deixo muitas vezes para mais tarde aquilo que tenho para fazer.",
  "Digo muitas vezes: \"É-me indiferente! Como queiras!\".",
  "Apresento-me tal como sou, sem complexos.",
  "É preciso fazerem muito para me intimidarem.",
  "Meto medo aos outros para me impor.",
  "Quando \"me levam à certa\" uma vez, espero a próxima ocasião para me vingar.",
  "De uma maneira geral, exagero os factos, caricaturo as situações para obter o que quero.",
  "Sou um \"fura-vidas\"; sei tirar partido do sistema.",
  "Sinto-me bem comigo mesmo e com os outros.",
  "Sei exprimir os meus pontos de vista sem excessos, de forma a fazer-me entender.",
  "Tenho a preocupação de não incomodar os outros.",
  "Tenho dificuldade em tomar partido e fazer opções.",
  "No seio de um grupo, não gosto de ser o único a exprimir uma opinião.",
  "Não tenho medo de falar em público.",
  "A vida é uma \"selva\" e cada um de nós tem de aprender a defender-se e a lutar. Só assim é possível sobreviver.",
  "Gosto de desafios, de riscos, mesmo que sejam excessivos.",
  "Sou bastante hábil a evitar conflitos.",
  "Gosto de \"pôr as cartas na mesa\" para obter a confiança das pessoas.",
  "Tenho boas capacidades de escuta e de atenção.",
  "Quando decido uma coisa levo-a até ao fim, apesar dos imprevistos.",
  "Exprimo sem reticências aquilo que sinto.",
  "Tenho jeito \"para levar as pessoas\" a aderir às minhas ideias, sou um persuasivo.",
  "Cumprimentos, sorrisos, lisonjas são um bom meio de se obter o que se pretende.",
  "Tenho dificuldade em controlar o tempo em que estou a usar da palavra.",
  "Sei lidar bem a ironia mordaz.",
  "Sou prestável e tenho uma vida simples; por vezes até me deixo explorar.",
  "Gosto mais de observar do que de participar.",
  "Não gosto de estar na primeira linha, prefiro papéis secundários.",
  "Tenho por hábito não me comparar aos outros.",
  "Penso que é mau revelar muito rapidamente as minhas intenções.",
  "Choco muitas vezes os outros com as minhas atitudes.",
  "Se não tivesse aprendido a defender-me já teria sido devorado.",
  "É mais fácil obter aquilo que se quer escondendo os objetivos do que revelando as intenções.",
  "Sou capaz de analisar uma situação sem me deixar influenciar por ressentimentos ou ideias preconcebidas.",
  "Não consigo resolver um problema sem procurar as suas causas profundas.",
  "Não gosto de ficar mal visto"
];

const attitudeScores = {
  passividade: [1, 7, 15, 16, 17, 25, 26, 35, 36, 37, 50, 51, 52, 59, 60],
  agressividade: [4, 6, 10, 11, 20, 21, 28, 29, 30, 39, 40, 48, 49, 55, 56],
  manipulacao: [3, 5, 9, 12, 13, 19, 22, 31, 32, 41, 42, 46, 47, 54, 57],
  assertividade: [2, 8, 14, 18, 23, 24, 27, 33, 34, 38, 43, 44, 45, 53, 58]
};

const state = {
  currentQuestionIndex: 0,
  answers: Array(questions.length).fill(null),
  scores: {
    passividade: 0,
    agressividade: 0,
    manipulacao: 0,
    assertividade: 0
  }
};

const maxScorePerDimension = 15;

const els = {
  questionIndex: document.getElementById("questionIndex"),
  questionText: document.getElementById("questionText"),
  trueButton: document.getElementById("trueButton"),
  falseButton: document.getElementById("falseButton"),
  answerActions: document.getElementById("answerActions"),

  progressCount: document.getElementById("progressCount"),
  progressPercent: document.getElementById("progressPercent"),
  progressFill: document.getElementById("progressFill"),

  scorePassividade: document.getElementById("score-passividade"),
  scoreAgressividade: document.getElementById("score-agressividade"),
  scoreManipulacao: document.getElementById("score-manipulacao"),
  scoreAssertividade: document.getElementById("score-assertividade"),

  barPassividade: document.getElementById("bar-passividade"),
  barAgressividade: document.getElementById("bar-agressividade"),
  barManipulacao: document.getElementById("bar-manipulacao"),
  barAssertividade: document.getElementById("bar-assertividade"),

  dominantTitle: document.getElementById("dominantTitle"),
  dominantText: document.getElementById("dominantText"),

  doneCard: document.getElementById("doneCard"),
  doneSummary: document.getElementById("doneSummary"),
  restartButton: document.getElementById("restartButton")
};

function recomputeScores() {
  state.scores.passividade = 0;
  state.scores.agressividade = 0;
  state.scores.manipulacao = 0;
  state.scores.assertividade = 0;

  state.answers.forEach((answer, index) => {
    if (answer !== true) {
      return;
    }

    const questionNumber = index + 1;

    for (const attitude in attitudeScores) {
      if (attitudeScores[attitude].includes(questionNumber)) {
        state.scores[attitude] += 1;
      }
    }
  });
}

function getAnsweredCount() {
  return state.answers.filter((answer) => answer !== null).length;
}

function getProgressPercent() {
  return Math.round((getAnsweredCount() / questions.length) * 100);
}

function getSortedScores() {
  return Object.entries(state.scores).sort((a, b) => b[1] - a[1]);
}

function formatLabel(key) {
  const labels = {
    passividade: "Passividade",
    agressividade: "Agressividade",
    manipulacao: "Manipulação",
    assertividade: "Assertividade"
  };

  return labels[key] || key;
}

function getDominantKeys() {
  const max = Math.max(...Object.values(state.scores));
  if (max <= 0) {
    return [];
  }

  return Object.keys(state.scores).filter((key) => state.scores[key] === max);
}

function getInterpretation(keys) {
  if (keys.length === 0) {
    return {
      title: "Sem tendência dominante ainda",
      text: "Responde a algumas perguntas para surgir uma leitura inicial."
    };
  }

  if (keys.length > 1) {
    return {
      title: "Resultado misto",
      text: `Há empate entre ${keys.map(formatLabel).join(" e ")}. Isso sugere um perfil menos linear e mais dependente do contexto.`
    };
  }

  const key = keys[0];

  const interpretations = {
    passividade: {
      title: "Tendência predominante: Passividade",
      text: "As respostas atuais apontam para maior contenção, hesitação ou retraimento em contextos sociais e relacionais."
    },
    agressividade: {
      title: "Tendência predominante: Agressividade",
      text: "As respostas atuais sugerem maior impulso de confronto, imposição ou dureza na forma de interagir."
    },
    manipulacao: {
      title: "Tendência predominante: Manipulação",
      text: "As respostas atuais sugerem maior tendência para estratégia indireta, gestão tática da informação ou persuasão instrumental."
    },
    assertividade: {
      title: "Tendência predominante: Assertividade",
      text: "As respostas atuais apontam para expressão mais clara, direta e equilibrada, com maior respeito simultâneo por si e pelos outros."
    }
  };

  return interpretations[key];
}

function renderProgress() {
  const answered = getAnsweredCount();
  const percent = getProgressPercent();

  els.progressCount.textContent = `${answered} / ${questions.length}`;
  els.progressPercent.textContent = `${percent}%`;
  els.progressFill.style.width = `${percent}%`;
}

function renderScores() {
  els.scorePassividade.textContent = state.scores.passividade;
  els.scoreAgressividade.textContent = state.scores.agressividade;
  els.scoreManipulacao.textContent = state.scores.manipulacao;
  els.scoreAssertividade.textContent = state.scores.assertividade;

  els.barPassividade.style.width = `${(state.scores.passividade / maxScorePerDimension) * 100}%`;
  els.barAgressividade.style.width = `${(state.scores.agressividade / maxScorePerDimension) * 100}%`;
  els.barManipulacao.style.width = `${(state.scores.manipulacao / maxScorePerDimension) * 100}%`;
  els.barAssertividade.style.width = `${(state.scores.assertividade / maxScorePerDimension) * 100}%`;

  const interpretation = getInterpretation(getDominantKeys());
  els.dominantTitle.textContent = interpretation.title;
  els.dominantText.textContent = interpretation.text;
}

function renderQuestion() {
  if (state.currentQuestionIndex >= questions.length) {
    els.questionIndex.textContent = `Pergunta ${questions.length} de ${questions.length}`;
    els.questionText.textContent = "Sessão concluída.";
    els.answerActions.style.display = "none";
    return;
  }

  els.questionIndex.textContent = `Pergunta ${state.currentQuestionIndex + 1} de ${questions.length}`;
  els.questionText.textContent = questions[state.currentQuestionIndex];
  els.answerActions.style.display = "flex";
}

function renderDoneState() {
  const finished = getAnsweredCount() === questions.length;

  if (!finished) {
    els.doneCard.classList.remove("is-visible");
    return;
  }

  const sorted = getSortedScores();
  const topLine = sorted
    .map(([key, value]) => `${formatLabel(key)} ${value}/${maxScorePerDimension}`)
    .join(" · ");

  els.doneSummary.textContent = `Sessão terminada. Leitura final: ${topLine}. Usa isto como observação ligeira, não como definição total da pessoa.`;
  els.doneCard.classList.add("is-visible");
}

function render() {
  recomputeScores();
  renderProgress();
  renderScores();
  renderQuestion();
  renderDoneState();
}

function answerCurrentQuestion(value) {
  if (state.currentQuestionIndex >= questions.length) {
    return;
  }

  state.answers[state.currentQuestionIndex] = value;
  state.currentQuestionIndex += 1;
  render();
}

function restart() {
  state.currentQuestionIndex = 0;
  state.answers = Array(questions.length).fill(null);
  state.scores = {
    passividade: 0,
    agressividade: 0,
    manipulacao: 0,
    assertividade: 0
  };

  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

els.trueButton.addEventListener("click", () => answerCurrentQuestion(true));
els.falseButton.addEventListener("click", () => answerCurrentQuestion(false));
els.restartButton.addEventListener("click", restart);

render();