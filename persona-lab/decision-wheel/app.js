const state = {
  options: ["Café", "Chá", "Água com gás", "Sumo"],
  rotation: 0,
  spinning: false,
  winnerIndex: null
};

const palette = [
  "#d9e7f6",
  "#c8dbf0",
  "#b6cfeb",
  "#e7f0f9",
  "#d3e2f2",
  "#c0d5ec",
  "#eaf2fa",
  "#bdd1e9",
  "#d6e4f3",
  "#c7dbef",
  "#e3edf8",
  "#b3cbe8"
];

const els = {
  optionsInput: document.getElementById("optionsInput"),
  loadButton: document.getElementById("loadButton"),
  spinButton: document.getElementById("spinButton"),
  resetButton: document.getElementById("resetButton"),
  wheel: document.getElementById("wheel"),
  resultTitle: document.getElementById("resultTitle"),
  resultText: document.getElementById("resultText"),
  spinNote: document.getElementById("spinNote"),
  optionsList: document.getElementById("optionsList")
};

function parseOptions(raw) {
  const seen = new Set();

  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => {
      const normalized = line.toLowerCase();
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .slice(0, 12);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildGradient(options) {
  const count = options.length;
  const angle = 360 / count;
  const stops = options.map((_, index) => {
    const start = index * angle;
    const end = start + angle;
    const color = palette[index % palette.length];
    return `${color} ${start}deg ${end}deg`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function renderOptionsList() {
  els.optionsList.innerHTML = state.options
    .map((option, index) => {
      const winnerClass = index === state.winnerIndex ? "option-chip is-winner" : "option-chip";
      return `<span class="${winnerClass}">${escapeHtml(option)}</span>`;
    })
    .join("");
}

function renderWheel() {
  els.wheel.style.background = buildGradient(state.options);
  els.wheel.style.transform = `rotate(${state.rotation}deg)`;
  renderOptionsList();
}

function setMessage(title, text, note) {
  els.resultTitle.textContent = title;
  els.resultText.textContent = text;
  els.spinNote.textContent = note;
}

function loadOptions() {
  const parsed = parseOptions(els.optionsInput.value);

  if (parsed.length < 2) {
    setMessage(
      "Poucas opções",
      "São necessárias pelo menos duas opções para a roda fazer sentido.",
      "Estado atual: incompleto."
    );
    return;
  }

  state.options = parsed;
  state.winnerIndex = null;
  state.rotation = 0;
  state.spinning = false;

  els.wheel.style.transition = "none";
  els.wheel.style.transform = "rotate(0deg)";
  void els.wheel.offsetWidth;
  els.wheel.style.transition = "transform 4.8s cubic-bezier(0.16, 1, 0.3, 1)";

  renderWheel();

  setMessage(
    "Opções carregadas",
    `${state.options.length} opções prontas para rotação.`,
    "Estado atual: pronto para spin."
  );
}

function chooseWinnerIndex() {
  return Math.floor(Math.random() * state.options.length);
}

function spinWheel() {
  if (state.spinning) {
    return;
  }

  if (state.options.length < 2) {
    setMessage(
      "Poucas opções",
      "Carrega pelo menos duas opções antes de rodar.",
      "Estado atual: incompleto."
    );
    return;
  }

  state.spinning = true;
  state.winnerIndex = null;
  renderOptionsList();

  const count = state.options.length;
  const sliceAngle = 360 / count;
  const winnerIndex = chooseWinnerIndex();
  const centerAngle = (winnerIndex * sliceAngle) + (sliceAngle / 2);

  const currentNormalized = ((state.rotation % 360) + 360) % 360;
  const targetAngle = (360 - centerAngle) % 360;
  const delta = (targetAngle - currentNormalized + 360) % 360;
  const extraTurns = 360 * (5 + Math.floor(Math.random() * 3));

  state.rotation += extraTurns + delta;
  state.winnerIndex = winnerIndex;

  setMessage(
    "A rodar...",
    "A wheel está a decidir.",
    "Estado atual: spinning."
  );

  els.wheel.style.transform = `rotate(${state.rotation}deg)`;

  window.setTimeout(() => {
    state.spinning = false;
    renderOptionsList();

    const winner = state.options[winnerIndex];

    setMessage(
      winner,
      `Resultado selecionado: ${winner}.`,
      "Estado atual: rotação concluída."
    );
  }, 4900);
}

function resetWheel() {
  state.options = ["Café", "Chá", "Água com gás", "Sumo"];
  state.rotation = 0;
  state.spinning = false;
  state.winnerIndex = null;

  els.optionsInput.value = `Café
Chá
Água com gás
Sumo`;

  els.wheel.style.transition = "none";
  els.wheel.style.transform = "rotate(0deg)";
  void els.wheel.offsetWidth;
  els.wheel.style.transition = "transform 4.8s cubic-bezier(0.16, 1, 0.3, 1)";

  renderWheel();

  setMessage(
    "Sem resultado ainda",
    "Carrega opções e roda a wheel para obter uma escolha.",
    "Estado atual: pronto."
  );
}

els.loadButton.addEventListener("click", loadOptions);
els.spinButton.addEventListener("click", spinWheel);
els.resetButton.addEventListener("click", resetWheel);

renderWheel();