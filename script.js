/* ============================================================
   script.js
   Rendering engine and interaction logic for
   "The Development of the Atomic Model".

   Structure of this file:
     1. Small DOM helper
     2. SVG generators for each atomic model visual
     3. Screen list builder (flattens STORY into a linear sequence)
     4. Section renderers (one function per content type)
     5. Quiz / prediction interaction state + handlers
     6. Navigation, progress bar, and boot-up code
   ============================================================ */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. Small DOM helper
     --------------------------------------------------------- */
  function h(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") el.className = attrs[k];
        else if (k === "html") el.innerHTML = attrs[k];
        else el.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return el;
  }

  function para(text) {
    return h("p", null, [text]);
  }

  /* ---------------------------------------------------------
     2. SVG generators for atomic model visuals
     Each returns an <svg> element, viewBox 0 0 240 240.
     --------------------------------------------------------- */
  const SVG_NS = "http://www.w3.org/2000/svg";

  function svgEl(tag, attrs) {
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        el.setAttribute(k, attrs[k]);
      });
    }
    return el;
  }

  function baseSvg(extraClass) {
    return svgEl("svg", {
      viewBox: "0 0 240 240",
      width: "220",
      height: "220",
      role: "img",
      class: "atom-visual " + (extraClass || "")
    });
  }

  function visualDalton() {
    const svg = baseSvg("visual-dalton");
    svg.appendChild(svgEl("title", {})).textContent = "A single solid sphere representing Dalton's atom.";
    const circle = svgEl("circle", {
      cx: 120, cy: 120, r: 78,
      fill: "#3f6fa8",
      stroke: "#1f4a78",
      "stroke-width": 3
    });
    svg.appendChild(circle);
    // simple highlight to suggest a solid ball
    const highlight = svgEl("ellipse", {
      cx: 96, cy: 92, rx: 26, ry: 16,
      fill: "#ffffff", opacity: "0.25"
    });
    svg.appendChild(highlight);
    return svg;
  }

  function visualDaltonParticles() {
    const svg = baseSvg("visual-dalton-particles");
    const t = svgEl("title", {});
    t.textContent = "A sphere representing the atom, now known to contain smaller particles inside it, though their charge is not yet known.";
    svg.appendChild(t);
    const circle = svgEl("circle", {
      cx: 120, cy: 120, r: 78,
      fill: "#3f6fa8",
      stroke: "#1f4a78",
      "stroke-width": 3
    });
    svg.appendChild(circle);
    const highlight = svgEl("ellipse", {
      cx: 96, cy: 92, rx: 26, ry: 16,
      fill: "#ffffff", opacity: "0.25"
    });
    svg.appendChild(highlight);
    // small neutral-colored particles (no charge coloring yet — charge isn't
    // determined until the Thomson chapter) scattered inside the sphere.
    const positions = [[100, 105], [140, 100], [115, 140], [145, 152], [90, 150]];
    positions.forEach(function (p) {
      svg.appendChild(svgEl("circle", {
        cx: p[0], cy: p[1], r: 6,
        fill: "#e8ebf0", stroke: "#8b93a1", "stroke-width": 1.5
      }));
    });
    return svg;
  }

  function visualThomson() {
    const svg = baseSvg("visual-thomson");
    const t = svgEl("title", {});
    t.textContent = "A sphere of positive charge with electrons embedded inside, like plums in a pudding.";
    svg.appendChild(t);
    const circle = svgEl("circle", {
      cx: 120, cy: 120, r: 78,
      fill: "#e2a26b",
      stroke: "#b5561f",
      "stroke-width": 3
    });
    svg.appendChild(circle);
    const positions = [
      [95, 95], [140, 88], [120, 120], [90, 145],
      [150, 140], [125, 160], [155, 105], [100, 165]
    ];
    positions.forEach(function (p) {
      svg.appendChild(svgEl("circle", {
        cx: p[0], cy: p[1], r: 7,
        fill: "#0d7a6c", stroke: "#053f38", "stroke-width": 1.5
      }));
    });
    return svg;
  }

  function visualRutherford(animated) {
    const svg = baseSvg("visual-rutherford");
    const t = svgEl("title", {});
    t.textContent = "A tiny dense nucleus surrounded by mostly empty space, with electrons somewhere in that space.";
    svg.appendChild(t);

    // mostly-empty-space boundary (dashed)
    svg.appendChild(svgEl("circle", {
      cx: 120, cy: 120, r: 92,
      fill: "none", stroke: "#c3cbd6", "stroke-width": 2, "stroke-dasharray": "5 6"
    }));

    // orbit paths
    const orbitR = 70;
    svg.appendChild(svgEl("ellipse", {
      cx: 120, cy: 120, rx: orbitR, ry: 30,
      fill: "none", stroke: "#a9c3e0", "stroke-width": 1.5
    }));
    svg.appendChild(svgEl("ellipse", {
      cx: 120, cy: 120, rx: 30, ry: orbitR,
      fill: "none", stroke: "#a9c3e0", "stroke-width": 1.5
    }));

    // nucleus (tiny + dense)
    svg.appendChild(svgEl("circle", {
      cx: 120, cy: 120, r: 11,
      fill: "#b5561f", stroke: "#7a3812", "stroke-width": 2
    }));

    // electrons, animated along their orbit paths if motion is allowed
    const e1 = svgEl("circle", { r: 6, fill: "#0d7a6c", stroke: "#053f38", "stroke-width": 1 });
    const e2 = svgEl("circle", { r: 6, fill: "#0d7a6c", stroke: "#053f38", "stroke-width": 1 });
    svg.appendChild(e1);
    svg.appendChild(e2);

    if (animated) {
      const path1 = "M " + (120 - orbitR) + " 120 A " + orbitR + " 30 0 1 1 " + (120 + orbitR) + " 120 A " + orbitR + " 30 0 1 1 " + (120 - orbitR) + " 120";
      const path2 = "M 120 " + (120 - orbitR) + " A 30 " + orbitR + " 0 1 1 120 " + (120 + orbitR) + " A 30 " + orbitR + " 0 1 1 120 " + (120 - orbitR);
      const anim1 = svgEl("animateMotion", { dur: "4.5s", repeatCount: "indefinite", path: path1 });
      const anim2 = svgEl("animateMotion", { dur: "3.2s", repeatCount: "indefinite", path: path2 });
      e1.appendChild(anim1);
      e2.appendChild(anim2);
    } else {
      e1.setAttribute("cx", 120 - orbitR); e1.setAttribute("cy", 120);
      e2.setAttribute("cx", 120); e2.setAttribute("cy", 120 - orbitR);
    }

    return svg;
  }

  function visualBohr(animated) {
    const svg = baseSvg("visual-bohr");
    const t = svgEl("title", {});
    t.textContent = "A nucleus surrounded by electrons occupying fixed, specific energy-level shells.";
    svg.appendChild(t);

    const shellRadii = [36, 58, 80];
    const shellSpeeds = ["3s", "5s", "7.5s"];
    const shellCounts = [1, 2, 3];

    shellRadii.forEach(function (r) {
      svg.appendChild(svgEl("circle", {
        cx: 120, cy: 120, r: r,
        fill: "none", stroke: "#a9c3e0", "stroke-width": 1.5
      }));
    });

    // nucleus
    svg.appendChild(svgEl("circle", {
      cx: 120, cy: 120, r: 14,
      fill: "#b5561f", stroke: "#7a3812", "stroke-width": 2
    }));
    svg.appendChild((function () {
      const txt = svgEl("text", { x: 120, y: 124, "text-anchor": "middle", "font-size": "9", fill: "#fff", "font-weight": "700" });
      txt.textContent = "+";
      return txt;
    })());

    shellRadii.forEach(function (r, idx) {
      const count = shellCounts[idx];
      for (let i = 0; i < count; i++) {
        const angleOffset = (360 / count) * i;
        const group = svgEl("g", {});
        const e = svgEl("circle", {
          cx: 120 + r, cy: 120, r: 6.5,
          fill: "#0d7a6c", stroke: "#053f38", "stroke-width": 1
        });
        group.appendChild(e);
        svg.appendChild(group);

        if (animated) {
          const anim = svgEl("animateTransform", {
            attributeName: "transform",
            type: "rotate",
            from: angleOffset + " 120 120",
            to: (angleOffset + 360) + " 120 120",
            dur: shellSpeeds[idx],
            repeatCount: "indefinite"
          });
          group.appendChild(anim);
        } else {
          group.setAttribute("transform", "rotate(" + angleOffset + " 120 120)");
        }
      }
    });

    return svg;
  }

  function visualCloud() {
    const svg = baseSvg("visual-cloud");
    const t = svgEl("title", {});
    t.textContent = "A nucleus surrounded by a fuzzy cloud representing where electrons are likely to be found.";
    svg.appendChild(t);

    const defs = svgEl("defs", {});
    const grad = svgEl("radialGradient", { id: "cloudGrad", cx: "50%", cy: "50%", r: "50%" });
    grad.appendChild(svgEl("stop", { offset: "0%", "stop-color": "#5fb3a3", "stop-opacity": "0.55" }));
    grad.appendChild(svgEl("stop", { offset: "55%", "stop-color": "#5fb3a3", "stop-opacity": "0.28" }));
    grad.appendChild(svgEl("stop", { offset: "100%", "stop-color": "#5fb3a3", "stop-opacity": "0" }));
    defs.appendChild(grad);
    svg.appendChild(defs);

    svg.appendChild(svgEl("circle", { cx: 120, cy: 120, r: 95, fill: "url(#cloudGrad)" }));

    // scattered probability speckles, denser near the center
    const speckles = [
      [120,120,2.2],[128,112,1.6],[108,128,1.8],[135,130,1.4],[105,105,1.5],
      [120,95,1.6],[120,145,1.6],[95,120,1.6],[145,120,1.6],[140,100,1.2],
      [100,140,1.2],[150,140,1.0],[90,100,1.0],[110,150,1.0],[150,105,0.9],
      [95,150,0.9],[160,120,0.8],[80,120,0.8],[120,170,0.7],[120,70,0.7]
    ];
    speckles.forEach(function (s) {
      svg.appendChild(svgEl("circle", {
        cx: s[0], cy: s[1], r: s[2],
        fill: "#053f38", opacity: "0.55"
      }));
    });

    // nucleus
    svg.appendChild(svgEl("circle", {
      cx: 120, cy: 120, r: 12,
      fill: "#b5561f", stroke: "#7a3812", "stroke-width": 2
    }));

    return svg;
  }

  function generateVisual(key, opts) {
    opts = opts || {};
    const animated = opts.animated !== false && !prefersReducedMotion();
    switch (key) {
      case "dalton": return visualDalton();
      case "daltonParticles": return visualDaltonParticles();
      case "thomson": return visualThomson();
      case "rutherford": return visualRutherford(animated);
      case "bohr": return visualBohr(animated);
      case "cloud": return visualCloud();
      default: return visualDalton();
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function visualStage(key, caption) {
    const wrap = h("div", { class: "visual-stage" }, [generateVisual(key)]);
    const container = h("div", null, [wrap]);
    if (caption) container.appendChild(h("p", { class: "visual-caption" }, [caption]));
    return container;
  }

  /* ---------------------------------------------------------
     3. Screen list builder
     --------------------------------------------------------- */
  const SECTION_ORDER = [
    "arrival", "currentModel", "newClue", "investigation",
    "prediction", "explanation", "revision", "summary"
  ];

  const SECTION_LABEL = {
    arrival: "Arrival",
    currentModel: "The Current Model",
    newClue: "A New Clue",
    investigation: "The Investigation",
    prediction: "Prediction",
    explanation: "Scientific Explanation",
    revision: "Model Revision",
    summary: "Progress Summary"
  };

  let SCREENS = [];

  function buildScreens() {
    const screens = [{ type: "intro" }];
    STORY.chapters.forEach(function (chapter, ci) {
      SECTION_ORDER.forEach(function (section) {
        screens.push({ type: "section", section: section, ci: ci });
      });
    });
    screens.push({ type: "outro" });
    return screens;
  }

  /* ---------------------------------------------------------
     4. Section renderers
     --------------------------------------------------------- */

  function renderIntro() {
    const c = h("div", { class: "intro-screen" });
    c.appendChild(h("h2", { class: "intro-title" }, [STORY.intro.title]));
    c.appendChild(h("p", { class: "intro-subtitle" }, [STORY.intro.subtitle]));
    STORY.intro.body.forEach(function (t) { c.appendChild(para(t)); });
    return c;
  }

  function renderOutro() {
    const c = h("div", { class: "outro-screen" });
    c.appendChild(h("h2", null, [STORY.outro.title]));
    STORY.outro.body.forEach(function (t) { c.appendChild(para(t)); });

    const table = h("table", { class: "data-table" });
    const thead = h("thead", null, [
      h("tr", null, STORY.outro.table.headers.map(function (hd) { return h("th", null, [hd]); }))
    ]);
    const tbody = h("tbody", null, STORY.outro.table.rows.map(function (row) {
      return h("tr", null, row.map(function (cell) { return h("td", null, [cell]); }));
    }));
    table.appendChild(thead);
    table.appendChild(tbody);
    c.appendChild(table);

    const restartBtn = h("button", { class: "btn btn--outline", type: "button", id: "btn-restart" }, [STORY.outro.restartLabel]);
    c.appendChild(h("div", { class: "cta-row" }, [restartBtn]));
    return c;
  }

  function chapterHeader(chapter) {
    const wrap = h("div", null, []);
    wrap.appendChild(h("p", { class: "eyebrow" }, [chapter.modelName]));
    wrap.appendChild(h("p", { class: "scientist-byline" }, [
      chapter.scientist + " • " + chapter.year + " • " + chapter.place
    ]));
    return wrap;
  }

  function renderArrival(chapter) {
    const c = h("div", null, []);
    c.appendChild(chapterHeader(chapter));
    c.appendChild(h("h2", null, [SECTION_LABEL.arrival]));
    c.appendChild(para(chapter.arrival.narrative));

    const factBox = h("div", { class: "callout callout--fact" }, []);
    factBox.appendChild(h("span", { class: "callout-label" }, ["Meanwhile, in the world outside the lab..."]));
    factBox.appendChild(para(chapter.arrival.fact));
    c.appendChild(factBox);

    const beliefBox = h("div", { class: "callout callout--belief" }, []);
    beliefBox.appendChild(h("span", { class: "callout-label" }, ["What scientists currently believe"]));
    beliefBox.appendChild(para(chapter.arrival.belief));
    c.appendChild(beliefBox);

    return c;
  }

  function renderCurrentModel(chapter) {
    const c = h("div", null, []);
    c.appendChild(chapterHeader(chapter));
    c.appendChild(h("h2", null, [SECTION_LABEL.currentModel]));
    c.appendChild(para(chapter.currentModel.intro));
    c.appendChild(visualStage(currentModelVisualFor(chapter), null));
    c.appendChild(h("h3", null, ["Why this model works"]));
    const ul = h("ul", { class: "styled-list" }, chapter.currentModel.strengths.map(function (s) { return h("li", null, [s]); }));
    c.appendChild(ul);
    return c;
  }

  // "Current Model" always shows the model inherited from the PREVIOUS chapter
  // (i.e. the revision's "before" visual), since that's the model being
  // challenged in this chapter. Dalton's chapter has no predecessor, so it
  // shows his own starting model.
  function currentModelVisualFor(chapter) {
    return chapter.revision.beforeVisualKey;
  }

  function renderNewClue(chapter) {
    const c = h("div", null, []);
    c.appendChild(chapterHeader(chapter));
    c.appendChild(h("h2", null, [SECTION_LABEL.newClue]));
    const box = h("div", { class: "callout callout--clue" }, []);
    box.appendChild(h("span", { class: "callout-label" }, ["Observation"]));
    box.appendChild(para(chapter.newClue.text));
    c.appendChild(box);
    return c;
  }

  /* ---- Investigation (quiz) ---- */
  const quizState = {}; // key: "ci-qi" -> { resolved: bool, attempts: number }

  function quizKey(ci, qi) { return ci + "-" + qi; }

  function renderInvestigation(chapter, ci) {
    const c = h("div", null, []);
    c.appendChild(chapterHeader(chapter));
    c.appendChild(h("h2", null, [SECTION_LABEL.investigation]));
    c.appendChild(para(chapter.investigation.intro));

    chapter.investigation.questions.forEach(function (q, qi) {
      c.appendChild(renderQuizCard(q, ci, qi));
    });

    return c;
  }

  function renderQuizCard(q, ci, qi) {
    const key = quizKey(ci, qi);
    if (!quizState[key]) quizState[key] = { resolved: false, attempts: 0, selected: -1 };
    const state = quizState[key];

    const card = h("div", { class: "quiz-card", "data-quiz-key": key }, []);
    card.appendChild(h("p", { class: "quiz-prompt" }, [q.prompt]));

    const optionsWrap = h("div", { class: "quiz-options" }, []);
    q.options.forEach(function (optText, oi) {
      const btn = h("button", {
        type: "button",
        class: "quiz-option",
        "data-oi": String(oi)
      }, [optText]);
      optionsWrap.appendChild(btn);
    });
    card.appendChild(optionsWrap);

    const feedback = h("div", { class: "quiz-feedback-slot" }, []);
    card.appendChild(feedback);

    applyQuizVisualState(card, q, state);

    card.addEventListener("click", function (evt) {
      const btn = evt.target.closest(".quiz-option");
      if (!btn || state.resolved) return;
      const oi = parseInt(btn.getAttribute("data-oi"), 10);
      handleQuizAnswer(card, q, state, oi);
    });

    return card;
  }

  function handleQuizAnswer(card, q, state, oi) {
    state.attempts += 1;
    state.selected = oi;

    if (oi === q.correct) {
      state.resolved = true;
    } else if (state.attempts >= 2) {
      state.resolved = true; // reveal after second miss
    }
    applyQuizVisualState(card, q, state);
    updateNav();
  }

  function applyQuizVisualState(card, q, state) {
    const buttons = card.querySelectorAll(".quiz-option");
    const feedbackSlot = card.querySelector(".quiz-feedback-slot");
    feedbackSlot.innerHTML = "";

    buttons.forEach(function (btn, oi) {
      btn.classList.remove("is-correct", "is-incorrect", "is-faded");
      btn.disabled = false;

      if (state.resolved) {
        btn.disabled = true;
        if (oi === q.correct) {
          btn.classList.add("is-correct");
        } else if (oi === state.selected) {
          btn.classList.add("is-incorrect");
        } else {
          btn.classList.add("is-faded");
        }
      } else if (state.attempts > 0 && oi === state.selected) {
        btn.classList.add("is-incorrect");
      }
    });

    if (state.resolved) {
      const wasCorrectFirstTry = state.selected === q.correct;
      const box = h("div", { class: "quiz-feedback quiz-feedback--correct" }, []);
      const icon = h("span", { class: "quiz-status-icon" }, [wasCorrectFirstTry ? "✓" : "✓"]);
      box.appendChild(icon);
      box.appendChild(document.createTextNode(q.explanation));
      feedbackSlot.appendChild(box);
    } else if (state.attempts === 1) {
      const box = h("div", { class: "quiz-feedback quiz-feedback--hint" }, []);
      const icon = h("span", { class: "quiz-status-icon" }, ["•"]);
      box.appendChild(icon);
      box.appendChild(document.createTextNode("Not quite. Hint: " + q.hint));
      feedbackSlot.appendChild(box);
    }
  }

  function investigationResolved(ci, chapter) {
    return chapter.investigation.questions.every(function (q, qi) {
      const s = quizState[quizKey(ci, qi)];
      return s && s.resolved;
    });
  }

  /* ---- Prediction ---- */
  const predictionState = {}; // ci -> { revealed: bool, text: string }

  function renderPrediction(chapter, ci) {
    if (!predictionState[ci]) predictionState[ci] = { revealed: false, text: "" };
    const state = predictionState[ci];

    const c = h("div", { class: "prediction-box" }, []);
    c.appendChild(chapterHeader(chapter));
    c.appendChild(h("h2", null, [SECTION_LABEL.prediction]));
    c.appendChild(para(chapter.prediction.prompt));

    const textarea = h("textarea", {
      "aria-label": "Your prediction",
      placeholder: "Type your prediction here..."
    }, []);
    textarea.value = state.text;
    textarea.addEventListener("input", function () {
      state.text = textarea.value;
    });
    c.appendChild(textarea);

    const revealBtn = h("button", { type: "button", class: "btn btn--outline" }, ["Reveal what comes next"]);
    const teaser = h("div", { class: "reveal-teaser" }, [chapter.prediction.teaser]);
    if (state.revealed) teaser.classList.add("is-visible");

    revealBtn.addEventListener("click", function () {
      state.revealed = true;
      teaser.classList.add("is-visible");
      updateNav();
    });

    c.appendChild(revealBtn);
    c.appendChild(teaser);

    return c;
  }

  function renderExplanation(chapter) {
    const c = h("div", null, []);
    c.appendChild(chapterHeader(chapter));
    c.appendChild(h("h2", null, [SECTION_LABEL.explanation]));
    c.appendChild(para(chapter.explanation.text));
    c.appendChild(h("h3", null, ["Key takeaways"]));
    c.appendChild(h("ul", { class: "styled-list" }, chapter.explanation.keyPoints.map(function (k) { return h("li", null, [k]); })));
    return c;
  }

  function renderRevision(chapter) {
    const c = h("div", null, []);
    c.appendChild(chapterHeader(chapter));
    c.appendChild(h("h2", null, [SECTION_LABEL.revision]));

    const grid = h("div", { class: "revision-grid" }, []);
    const beforeCol = h("div", { class: "revision-col" }, [
      h("div", { class: "visual-stage" }, [generateVisual(chapter.revision.beforeVisualKey)]),
      h("h4", null, [chapter.revision.beforeLabel])
    ]);
    const arrow = h("div", { class: "revision-arrow", "aria-hidden": "true" }, ["→"]);
    const afterCol = h("div", { class: "revision-col" }, [
      h("div", { class: "visual-stage" }, [generateVisual(chapter.revision.afterVisualKey)]),
      h("h4", null, [chapter.revision.afterLabel])
    ]);
    grid.appendChild(beforeCol);
    grid.appendChild(arrow);
    grid.appendChild(afterCol);
    c.appendChild(grid);

    c.appendChild(h("h3", null, ["What changed"]));
    c.appendChild(h("ul", { class: "styled-list change-list" }, chapter.revision.changes.map(function (s) { return h("li", null, [s]); })));

    return c;
  }

  function renderSummary(chapter, ci) {
    const c = h("div", null, []);
    c.appendChild(chapterHeader(chapter));
    c.appendChild(h("h2", null, [SECTION_LABEL.summary]));
    c.appendChild(para(chapter.summary.text));

    const card = h("div", { class: "concept-card" }, []);
    card.appendChild(h("h4", null, ["New concept: " + chapter.summary.newConcept]));
    card.appendChild(h("p", { class: "concept-detail" }, [chapter.summary.conceptDetail]));
    c.appendChild(card);

    c.appendChild(h("p", { class: "transition-line" }, [chapter.summary.transition]));
    return c;
  }

  const SECTION_RENDERERS = {
    arrival: renderArrival,
    currentModel: renderCurrentModel,
    newClue: renderNewClue,
    investigation: renderInvestigation,
    prediction: renderPrediction,
    explanation: renderExplanation,
    revision: renderRevision,
    summary: renderSummary
  };

  /* ---------------------------------------------------------
     5. Navigation / progress / boot
     --------------------------------------------------------- */
  let currentIndex = 0;

  const screenEl = document.getElementById("screen");
  const btnBack = document.getElementById("btn-back");
  const btnNext = document.getElementById("btn-next");
  const stepIndicator = document.getElementById("step-indicator");
  const progressFill = document.getElementById("progress-fill");
  const progressChapterLabel = document.getElementById("progress-chapter-label");
  const progressPercentLabel = document.getElementById("progress-percent-label");
  const chapterDotsEl = document.getElementById("chapter-dots");

  function buildChapterDots() {
    chapterDotsEl.innerHTML = "";
    STORY.chapters.forEach(function (chapter, ci) {
      const li = h("li", { id: "dot-" + ci }, [chapter.scientist.split(" ").pop()]);
      chapterDotsEl.appendChild(li);
    });
  }

  function renderScreen(index) {
    const screen = SCREENS[index];
    screenEl.innerHTML = "";

    if (screen.type === "intro") {
      screenEl.appendChild(renderIntro());
    } else if (screen.type === "outro") {
      screenEl.appendChild(renderOutro());
      const restartBtn = document.getElementById("btn-restart");
      if (restartBtn) {
        restartBtn.addEventListener("click", function () {
          goTo(0);
        });
      }
    } else {
      const chapter = STORY.chapters[screen.ci];
      const renderer = SECTION_RENDERERS[screen.section];
      screenEl.appendChild(renderer(chapter, screen.ci));
    }

    screenEl.focus();
    screenEl.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });

    updateProgress();
    updateNav();
  }

  function updateProgress() {
    const screen = SCREENS[currentIndex];
    const pct = Math.round((currentIndex / (SCREENS.length - 1)) * 100);
    progressFill.style.width = pct + "%";
    progressPercentLabel.textContent = pct + "%";

    let label = "Welcome";
    if (screen.type === "outro") {
      label = "Complete";
    } else if (screen.type === "section") {
      const chapter = STORY.chapters[screen.ci];
      label = chapter.scientist + " — " + SECTION_LABEL[screen.section];
    }
    progressChapterLabel.textContent = label;

    Array.prototype.forEach.call(chapterDotsEl.children, function (li, ci) {
      li.classList.remove("is-active", "is-complete");
      if (screen.type === "section" && screen.ci === ci) {
        li.classList.add("is-active");
      } else {
        const chapterStartIndex = 1 + ci * SECTION_ORDER.length;
        if (currentIndex > chapterStartIndex + SECTION_ORDER.length - 1) {
          li.classList.add("is-complete");
        }
      }
    });

    if (screen.type === "section") {
      const stepNum = SECTION_ORDER.indexOf(screen.section) + 1;
      stepIndicator.textContent = "Chapter " + (screen.ci + 1) + " of " + STORY.chapters.length +
        " • Step " + stepNum + " of " + SECTION_ORDER.length;
    } else if (screen.type === "intro") {
      stepIndicator.textContent = "Start";
    } else {
      stepIndicator.textContent = "Finish";
    }
  }

  function nextEnabled() {
    const screen = SCREENS[currentIndex];
    if (screen.type !== "section") return true;
    if (screen.section === "investigation") {
      return investigationResolved(screen.ci, STORY.chapters[screen.ci]);
    }
    if (screen.section === "prediction") {
      return !!(predictionState[screen.ci] && predictionState[screen.ci].revealed);
    }
    return true;
  }

  function updateNav() {
    btnBack.disabled = currentIndex === 0;

    const isOutro = SCREENS[currentIndex].type === "outro";
    btnNext.disabled = isOutro || !nextEnabled();
    btnNext.style.visibility = isOutro ? "hidden" : "visible";

    if (!nextEnabled() && !isOutro) {
      btnNext.title = "Finish this step to continue";
    } else {
      btnNext.title = "";
    }
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(SCREENS.length - 1, index));
    renderScreen(currentIndex);
  }

  function goNext() {
    if (!nextEnabled()) return;
    if (currentIndex < SCREENS.length - 1) goTo(currentIndex + 1);
  }

  function goBack() {
    if (currentIndex > 0) goTo(currentIndex - 1);
  }

  btnNext.addEventListener("click", goNext);
  btnBack.addEventListener("click", goBack);

  document.addEventListener("keydown", function (evt) {
    const tag = (evt.target && evt.target.tagName) || "";
    if (tag === "TEXTAREA" || tag === "INPUT") return;
    if (evt.key === "ArrowRight") goNext();
    if (evt.key === "ArrowLeft") goBack();
  });

  /* ---- Boot ---- */
  function init() {
    SCREENS = buildScreens();
    buildChapterDots();
    goTo(0);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
