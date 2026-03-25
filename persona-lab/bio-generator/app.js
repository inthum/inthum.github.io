const els = {
  name: document.getElementById("nameInput"),
  role: document.getElementById("roleInput"),
  platform: document.getElementById("platformInput"),
  tone: document.getElementById("toneInput"),
  keywords: document.getElementById("keywordsInput"),
  extra: document.getElementById("extraInput"),
  generate: document.getElementById("generateButton"),
  reset: document.getElementById("resetButton"),
  resultStack: document.getElementById("resultStack")
};

function splitKeywords(raw) {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function joinKeywords(list) {
  if (list.length === 0) return "";
  if (list.length === 1) return list[0];
  if (list.length === 2) return `${list[0]} and ${list[1]}`;
  return `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
}

function compact(text) {
  return text.replace(/\s+/g, " ").trim();
}

function getPlatformHint(platform) {
  const hints = {
    generic: "public-facing profile",
    github: "GitHub profile",
    linkedin: "LinkedIn headline",
    instagram: "profile line",
    x: "short profile line"
  };

  return hints[platform] || "public-facing profile";
}

function buildCore() {
  const name = els.name.value.trim() || "Unnamed";
  const role = els.role.value.trim() || "independent builder";
  const tone = els.tone.value;
  const platform = els.platform.value;
  const keywords = splitKeywords(els.keywords.value);
  const extra = els.extra.value.trim();

  return {
    name,
    role,
    tone,
    platform,
    keywords,
    extra,
    platformHint: getPlatformHint(platform)
  };
}

function toneFragments(tone) {
  const map = {
    professional: {
      opener: "Focused on",
      closer: "Structured work, clear direction."
    },
    minimal: {
      opener: "Working with",
      closer: "Quiet work. Clear intent."
    },
    warm: {
      opener: "Building around",
      closer: "Human tone, practical value."
    },
    sharp: {
      opener: "Operating across",
      closer: "Direct thinking. Selective execution."
    },
    creative: {
      opener: "Exploring",
      closer: "Ideas, language and crafted identity."
    }
  };

  return map[tone] || map.professional;
}

function buildOptions(core) {
  const keywordText = joinKeywords(core.keywords);
  const fragments = toneFragments(core.tone);
  const extraLine = core.extra ? ` ${core.extra}` : "";

  const optionA = compact(
    `${core.name} — ${core.role}. ${fragments.opener} ${keywordText || "clarity, craft and direction"}.`
  );

  const optionB = compact(
    `${core.role} working across ${keywordText || "systems, language and identity"}. ${fragments.closer}`
  );

  const optionC = compact(
    `${core.name}. ${core.role}. ${core.platformHint} shaped around ${keywordText || "precision and useful work"}.${extraLine}`
  );

  const optionD = compact(
    `${core.name} builds with ${keywordText || "clarity and intent"} — ${fragments.closer}`
  );

  return [optionA, optionB, optionC, optionD];
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

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function generate() {
  const core = buildCore();
  const options = buildOptions(core);
  renderOptions(options);
}

function reset() {
  els.name.value = "";
  els.role.value = "";
  els.platform.value = "generic";
  els.tone.value = "professional";
  els.keywords.value = "";
  els.extra.value = "";

  els.resultStack.innerHTML = `
    <div class="result-card">
      <strong>Option A</strong>
      <p class="hint">Preenche os campos e gera o primeiro conjunto.</p>
    </div>
    <div class="result-card">
      <strong>Option B</strong>
      <p class="hint">O resultado aqui será curto, legível e adaptável.</p>
    </div>
    <div class="result-card">
      <strong>Option C</strong>
      <p class="hint">Cada opção muda ligeiramente o ritmo e o enquadramento.</p>
    </div>
    <div class="result-card">
      <strong>Option D</strong>
      <p class="hint">O objetivo é utilidade rápida, não prosa excessiva.</p>
    </div>
  `;
}

els.generate.addEventListener("click", generate);
els.reset.addEventListener("click", reset);