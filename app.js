/* ============================================================
   May the 4th — Star Wars Trivia
   No backend, no localStorage / sessionStorage / cookies.
   Pure DOM + in-memory state.
   ============================================================ */

(function () {
  "use strict";

  // ---------- UI strings (bilingual) ----------
  // Each question shows its UI labels in the question's own language
  // so a Spanish question gets Spanish badges, feedback, and Next button.
  const STR = {
    en: {
      counter: (i, total) => `Question ${i} of ${total}`,
      langLabel: "English",
      difficulty: { easy: "Easy", moderate: "Moderate", hard: "Challenging" },
      correct: "Correct!",
      incorrect: "Not quite.",
      correctAnswerIs: (letter, text) => `The correct answer is ${letter}: ${text}.`,
      next: "Next Question",
      finish: "See My Score"
    },
    es: {
      counter: (i, total) => `Pregunta ${i} de ${total}`,
      langLabel: "Español",
      difficulty: { easy: "Fácil", moderate: "Intermedia", hard: "Difícil" },
      correct: "¡Correcto!",
      incorrect: "No exactamente.",
      correctAnswerIs: (letter, text) => `La respuesta correcta es ${letter}: ${text}.`,
      next: "Siguiente pregunta",
      finish: "Ver mi puntuación"
    }
  };

  const LETTERS = ["A", "B", "C", "D"];

  // ---------- DOM ----------
  const $ = (id) => document.getElementById(id);
  const introScreen   = $("intro-screen");
  const quizScreen    = $("quiz-screen");
  const resultsScreen = $("results-screen");

  const startBtn        = $("start-btn");
  const nextBtn         = $("next-btn");
  const restartBtn      = $("restart-btn");
  const reviewBtn       = $("review-btn");

  const counterEl       = $("question-counter");
  const diffBadge       = $("difficulty-badge");
  const langBadge       = $("lang-badge");
  const progressBar     = $("progress-bar");
  const questionTextEl  = $("question-text");
  const choicesEl       = $("choices");
  const feedbackEl      = $("feedback");

  const scoreSummaryEl  = $("score-summary");
  const scoreMessageEl  = $("score-message");
  const reviewSection   = $("review-section");
  const reviewListEl    = $("review-list");

  // ---------- State (in-memory only) ----------
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  // Per-question record: { selected: number|null, correct: boolean }
  let answers = [];

  // ---------- Helpers ----------
  function show(el)  { el.classList.remove("hidden"); }
  function hide(el)  { el.classList.add("hidden"); }

  function setScreen(which) {
    [introScreen, quizScreen, resultsScreen].forEach(hide);
    show(which);
  }

  function difficultyBadgeClass(d) {
    return "badge badge-" + d;
  }

  // ---------- Render ----------
  function renderQuestion() {
    const q = QUESTIONS[currentIndex];
    const t = STR[q.lang];

    // Document language hint for this question (helps screen readers)
    questionTextEl.setAttribute("lang", q.lang);

    // Counter, badges, progress
    counterEl.textContent = t.counter(currentIndex + 1, QUESTIONS.length);
    diffBadge.textContent = t.difficulty[q.difficulty];
    diffBadge.className = difficultyBadgeClass(q.difficulty);
    langBadge.textContent = t.langLabel;

    const pct = (currentIndex / QUESTIONS.length) * 100;
    progressBar.style.width = pct + "%";
    progressBar.parentElement.setAttribute("aria-valuenow", String(currentIndex));

    // Question text
    questionTextEl.textContent = q.question;

    // Choices
    choicesEl.innerHTML = "";
    q.choices.forEach((choice, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.dataset.index = String(i);
      btn.setAttribute("lang", q.lang);
      btn.setAttribute("aria-label", `${LETTERS[i]}. ${choice}`);
      btn.innerHTML = `
        <span class="choice-letter" aria-hidden="true">${LETTERS[i]}</span>
        <span class="choice-text">${escapeHtml(choice)}</span>
      `;
      btn.addEventListener("click", () => onSelectChoice(i));
      choicesEl.appendChild(btn);
    });

    // Reset feedback / next button
    feedbackEl.className = "feedback hidden";
    feedbackEl.textContent = "";
    nextBtn.textContent =
      currentIndex === QUESTIONS.length - 1 ? t.finish : t.next;
    nextBtn.setAttribute("lang", q.lang);
    hide(nextBtn);

    answered = false;

    // Move focus to the question text for screen readers / keyboard users
    questionTextEl.setAttribute("tabindex", "-1");
    questionTextEl.focus({ preventScroll: false });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ---------- Answering ----------
  function onSelectChoice(selectedIdx) {
    if (answered) return;
    answered = true;

    const q = QUESTIONS[currentIndex];
    const t = STR[q.lang];
    const correctIdx = q.answer;
    const isCorrect = selectedIdx === correctIdx;

    if (isCorrect) score += 1;

    answers[currentIndex] = {
      selected: selectedIdx,
      correct: isCorrect
    };

    // Mark choice buttons
    const buttons = choicesEl.querySelectorAll(".choice-btn");
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correctIdx) {
        btn.classList.add("correct");
      } else if (i === selectedIdx) {
        btn.classList.add("incorrect");
      } else {
        btn.classList.add("dimmed");
      }
    });

    // Feedback
    const correctLetter = LETTERS[correctIdx];
    const correctText = q.choices[correctIdx];
    let msg = "";
    if (isCorrect) {
      feedbackEl.className = "feedback correct";
      msg = `<strong>${t.correct}</strong> ${q.explanation || ""}`;
    } else {
      feedbackEl.className = "feedback incorrect";
      msg = `<strong>${t.incorrect}</strong> ${t.correctAnswerIs(correctLetter, correctText)} ${q.explanation || ""}`;
    }
    feedbackEl.innerHTML = msg;
    feedbackEl.setAttribute("lang", q.lang);

    show(nextBtn);
    // Don't auto-focus Next — let users read feedback first.
  }

  // ---------- Navigation ----------
  function onNext() {
    if (currentIndex < QUESTIONS.length - 1) {
      currentIndex += 1;
      renderQuestion();
      // Scroll to top of card so older eyes don't have to hunt for it
      quizScreen.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      showResults();
    }
  }

  // ---------- Results ----------
  function showResults() {
    // Fill bar to 100% on completion
    progressBar.style.width = "100%";

    setScreen(resultsScreen);

    const total = QUESTIONS.length;
    scoreSummaryEl.textContent = `${score} / ${total}`;

    let msg;
    const pct = (score / total) * 100;
    if (pct === 100) {
      msg = "A perfect score! You are one with the Force. ¡Puntuación perfecta!";
    } else if (pct >= 80) {
      msg = "Outstanding! A true Jedi Knight. ¡Excelente trabajo!";
    } else if (pct >= 60) {
      msg = "Well done — a solid Padawan performance. ¡Muy bien!";
    } else if (pct >= 40) {
      msg = "Nice effort! The Force grows stronger with practice. ¡Sigue practicando!";
    } else {
      msg = "Every Jedi started somewhere. Try again — may the Force be with you. ¡Inténtalo otra vez!";
    }
    scoreMessageEl.textContent = msg;

    // Reset review
    hide(reviewSection);
    reviewListEl.innerHTML = "";
    reviewBtn.textContent = "Review My Answers";
    reviewBtn.setAttribute("aria-expanded", "false");

    restartBtn.focus();
  }

  function buildReview() {
    reviewListEl.innerHTML = "";
    QUESTIONS.forEach((q, i) => {
      const rec = answers[i] || { selected: null, correct: false };
      const li = document.createElement("li");
      li.className = "review-item " + (rec.correct ? "correct" : "incorrect");
      li.setAttribute("lang", q.lang);

      const correctLetter = LETTERS[q.answer];
      const correctText   = q.choices[q.answer];
      const yourLetter    = rec.selected != null ? LETTERS[rec.selected] : "—";
      const yourText      = rec.selected != null ? q.choices[rec.selected] : "—";

      const labels = q.lang === "es"
        ? { q: `Pregunta ${i + 1}`, your: "Tu respuesta", correct: "Correcta", note: "Nota" }
        : { q: `Question ${i + 1}`, your: "Your answer", correct: "Correct answer", note: "Note" };

      li.innerHTML = `
        <p class="review-q">${escapeHtml(labels.q)} — ${rec.correct ? "✓" : "✗"}</p>
        <p class="review-text">${escapeHtml(q.question)}</p>
        <p class="review-line"><span class="label">${escapeHtml(labels.your)}:</span> ${escapeHtml(yourLetter)}. ${escapeHtml(yourText)}</p>
        <p class="review-line"><span class="label">${escapeHtml(labels.correct)}:</span> ${escapeHtml(correctLetter)}. ${escapeHtml(correctText)}</p>
        ${q.explanation ? `<p class="review-line"><span class="label">${escapeHtml(labels.note)}:</span> ${escapeHtml(q.explanation)}</p>` : ""}
      `;
      reviewListEl.appendChild(li);
    });
  }

  // ---------- Restart ----------
  function restart() {
    currentIndex = 0;
    score = 0;
    answered = false;
    answers = [];
    progressBar.style.width = "0%";
    setScreen(quizScreen);
    renderQuestion();
  }

  // ---------- Init ----------
  function init() {
    if (!Array.isArray(QUESTIONS) || QUESTIONS.length !== 20) {
      console.error("Question bank must contain exactly 20 questions.");
    }

    startBtn.addEventListener("click", () => {
      currentIndex = 0;
      score = 0;
      answers = [];
      setScreen(quizScreen);
      renderQuestion();
    });

    nextBtn.addEventListener("click", onNext);
    restartBtn.addEventListener("click", restart);

    reviewBtn.addEventListener("click", () => {
      const isHidden = reviewSection.classList.contains("hidden");
      if (isHidden) {
        buildReview();
        show(reviewSection);
        reviewBtn.textContent = "Hide Review";
        reviewBtn.setAttribute("aria-expanded", "true");
        reviewSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        hide(reviewSection);
        reviewBtn.textContent = "Review My Answers";
        reviewBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Keyboard shortcuts on quiz screen: A/B/C/D to pick, Enter to advance.
    document.addEventListener("keydown", (e) => {
      if (quizScreen.classList.contains("hidden")) return;

      const key = e.key.toLowerCase();
      if (!answered && ["a", "b", "c", "d"].includes(key)) {
        const idx = ["a", "b", "c", "d"].indexOf(key);
        const btn = choicesEl.querySelector(`.choice-btn[data-index="${idx}"]`);
        if (btn) {
          e.preventDefault();
          btn.click();
        }
      } else if (answered && (e.key === "Enter" || e.key === " ")) {
        // Only trigger if focus isn't on a button that already handles Enter
        const tag = (document.activeElement && document.activeElement.tagName) || "";
        if (tag !== "BUTTON") {
          e.preventDefault();
          nextBtn.click();
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
