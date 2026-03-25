const els = {
  checkButton: document.getElementById("checkButton"),
  resetButton: document.getElementById("resetButton"),
  contextInput: document.getElementById("contextInput"),
  stateTitle: document.getElementById("stateTitle"),
  stateText: document.getElementById("stateText"),
  guidanceText: document.getElementById("guidanceText"),
  contextText: document.getElementById("contextText")
};

function getRadioValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? Number(selected.value) : null;
}

function allSelected() {
  return ["energy", "clarity", "tension", "openness"].every((name) => getRadioValue(name) !== null);
}

function classifyMood({ energy, clarity, tension, openness }) {
  if (energy >= 4 && clarity >= 4 && tension <= 2) {
    return {
      title: "Calm focus",
      text: "Há energia utilizável, clareza boa e baixo ruído interno. É um estado favorável para trabalho intencional.",
      guidance: "Aproveita para fazer uma tarefa relevante sem dispersão."
    };
  }

  if (energy <= 2 && clarity <= 2 && tension >= 3) {
    return {
      title: "Overloaded and foggy",
      text: "O estado atual sugere fadiga mental com tensão acumulada. Forçar profundidade agora pode degradar o teu rendimento.",
      guidance: "Reduz fricção, simplifica a próxima ação e baixa exigência por alguns minutos."
    };
  }

  if (energy >= 4 && tension >= 4) {
    return {
      title: "Charged and restless",
      text: "Existe força disponível, mas também agitação. Este é o tipo de estado que pode gerar impulso sem direção suficiente.",
      guidance: "Antes de agir, define uma prioridade única e fecha o resto."
    };
  }

  if (clarity >= 4 && openness <= 2) {
    return {
      title: "Clear but inward",
      text: "A mente parece relativamente nítida, mas a abertura ao contacto está baixa. Podes estar num modo mais reservado e seletivo.",
      guidance: "Usa este estado para trabalho individual, escrita ou reorganização."
    };
  }

  if (openness >= 4 && tension <= 2) {
    return {
      title: "Socially available",
      text: "O estado atual sugere disponibilidade para contacto, com baixa rigidez interna e boa flexibilidade relacional.",
      guidance: "Bom momento para conversa, alinhamento ou aproximação leve."
    };
  }

  if (energy <= 2 && tension <= 2) {
    return {
      title: "Quiet low state",
      text: "A energia está baixa, mas sem grande fricção interna. O corpo e a mente podem estar a pedir pausa mais do que luta.",
      guidance: "Não confundas serenidade baixa com falha. Faz pouco, mas faz bem."
    };
  }

  return {
    title: "Mixed state",
    text: "O estado atual não aponta para um único padrão dominante. Há sinais mistos entre energia, clareza, tensão e abertura.",
    guidance: "Escolhe uma leitura pragmática: o que precisas agora, não o que gostavas de sentir."
  };
}

function runCheck() {
  if (!allSelected()) {
    els.stateTitle.textContent = "Leitura incompleta";
    els.stateText.textContent = "Seleciona os quatro eixos antes de executar o check.";
    els.guidanceText.textContent = "Preenche energia, clareza, tensão e abertura.";
    els.contextText.textContent = els.contextInput.value.trim() || "Sem nota adicional.";
    return;
  }

  const values = {
    energy: getRadioValue("energy"),
    clarity: getRadioValue("clarity"),
    tension: getRadioValue("tension"),
    openness: getRadioValue("openness")
  };

  const result = classifyMood(values);

  els.stateTitle.textContent = result.title;
  els.stateText.textContent = result.text;
  els.guidanceText.textContent = result.guidance;

  const context = els.contextInput.value.trim();
  els.contextText.textContent = context || "Sem nota adicional.";
}

function resetCheck() {
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.checked = false;
  });

  els.contextInput.value = "";
  els.stateTitle.textContent = "Sem leitura ainda";
  els.stateText.textContent = "Seleciona os níveis e executa o check.";
  els.guidanceText.textContent = "A orientação curta aparece aqui depois da leitura.";
  els.contextText.textContent = "Sem nota adicional.";
}

els.checkButton.addEventListener("click", runCheck);
els.resetButton.addEventListener("click", resetCheck);