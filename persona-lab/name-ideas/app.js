const els = {
  seed: document.getElementById("seedInput"),
  category: document.getElementById("categoryInput"),
  tone: document.getElementById("toneInput"),
  style: document.getElementById("styleInput"),
  generate: document.getElementById("generateButton"),
  reset: document.getElementById("resetButton"),
  resultStack: document.getElementById("resultStack")
};

const categoryTerms = {
  project: ["Project", "Studio", "Lab", "System"],
  tool: ["Tool", "Engine", "Kit", "Module"],
  brand: ["Works", "House", "Collective", "Atelier"],
  channel: ["Signal", "Field", "Channel", "Stream"],
  collection: ["Archive", "Series", "Collection", "Index"]
};

const toneTerms = {
  clinical: ["Core", "Method", "Axis", "Frame", "Protocol"],
  minimal: ["One", "Plain", "Line", "Form", "Quiet"],
  creative: ["Bloom", "Echo", "Nova", "Drift", "Orbit"],
  sharp: ["Edge", "Vector", "Strike", "Grid", "Cut"],
  elegant: ["Atelier", "Maison", "Clarity", "Verve", "Poise"]
};

const styleTerms = {
  english: ["Works", "Studio", "Field", "Signal", "Scope"],
  hybrid: ["Lab", "Forma", "Grid", "Atlas", "Frame"],
  latin: ["Forma", "Linea", "Clarus", "Nexus", "Vita"],
  technical: ["System", "Node", "Protocol", "Matrix", "Module"]
};

function sanitizeSeed(value) {
  return value.trim().replace(/\s+/g, " ");
}

function titleCase(value) {
  return value
    .split(" ")
    .map((word) => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : "")
    .join(" ");
}

function compact(value) {
  return value.replace(/\s+/g, " ").trim();
}

function unique(items) {
  return [...new Set(items)];
}

function pickSet(arr, count = 4) {
  const copy = [...arr];
  const out = [];

  while (copy.length > 0 && out.length < count) {
    const index = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(index, 1)[0]);
  }

  return out;
}

function buildOptions(seed, category, tone, style) {
  const seedBase = seed || "Aster";
  const cleanSeed = titleCase(seedBase);

  const cTerms = pickSet(categoryTerms[category] || categoryTerms.project, 4);
  const tTerms = pickSet(toneTerms[tone] || toneTerms.clinical, 4);
  const sTerms = pickSet(styleTerms[style] || styleTerms.english, 4);

  const options = [
    `${cleanSeed} ${cTerms[0]}`,
    `${cleanSeed} ${tTerms[0]}`,
    `${sTerms[0]} ${cleanSeed}`,
    `${cleanSeed} ${sTerms[1]}`,
    `${cleanSeed}${tTerms[1]}`,
    `${tTerms[2]} ${cleanSeed}`,
    `${cleanSeed} ${cTerms[1]}`,
    `${sTerms[2]} ${tTerms[3]}`
  ];

  return unique(options).slice(0, 4).map((item) => compact(item));
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderOptions(options) {
  const labels = ["Option A", "Option B", "Option C", "Option D"];

  els.resultStack.innerHTML = options
    .map((text, index) => {
      return `
        <div class="result-card">
          <strong>${labels[index]}</strong>
          <p>${escapeHtml(text)}</p>
        </div>
      `;
    })
    .join("");
}

function generate() {
  const seed = sanitizeSeed(els.seed.value);
  const category = els.category.value;
  const tone = els.tone.value;
  const style = els.style.value;

  const options = buildOptions(seed, category, tone, style);
  renderOptions(options);
}

function reset() {
  els.seed.value = "";
  els.category.value = "project";
  els.tone.value = "clinical";
  els.style.value = "english";

  els.resultStack.innerHTML = `
    <div class="result-card">
      <strong>Option A</strong>
      <p class="hint">Preenche os campos e gera o primeiro conjunto.</p>
    </div>
    <div class="result-card">
      <strong>Option B</strong>
      <p class="hint">Receberás opções curtas e com diferentes ritmos.</p>
    </div>
    <div class="result-card">
      <strong>Option C</strong>
      <p class="hint">O objetivo é abrir direções, não forçar um nome final.</p>
    </div>
    <div class="result-card">
      <strong>Option D</strong>
      <p class="hint">Podes depois adaptar ou combinar partes das opções.</p>
    </div>
  `;
}

els.generate.addEventListener("click", generate);
els.reset.addEventListener("click", reset);