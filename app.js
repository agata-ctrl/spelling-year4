const wheelSegments = [
  { label: "100", type: "points", value: 100, color: "#2878b9", weight: 1 },
  { label: "200", type: "points", value: 200, color: "#ffd44f", weight: 1 },
  { label: "BANKRUPT", type: "bankrupt", value: 0, color: "#172026", weight: 1.5 },
  { label: "SHIELD", type: "shield", value: 0, color: "#3c6fca", weight: 0.9 },
  { label: "150", type: "points", value: 150, color: "#55b867", weight: 1 },
  { label: "FREE LETTER", type: "free", value: 0, color: "#8d63c7", weight: 1 },
  { label: "STEAL", type: "steal", value: 100, color: "#d6426b", weight: 0.9 },
  { label: "300", type: "points", value: 300, color: "#ff6b5f", weight: 1 },
  { label: "LOSE TURN", type: "miss", value: 0, color: "#60717d", weight: 0.9 },
  { label: "MYSTERY", type: "mystery", value: 0, color: "#6b5dd3", weight: 0.9 },
  { label: "250", type: "points", value: 250, color: "#00a798", weight: 1 },
  { label: "SWAP POINTS", type: "swap", value: 0, color: "#f0802f", weight: 0.9 },
  { label: "JACKPOT", type: "jackpot", value: 0, color: "#f39c2f", weight: 0.9 },
  { label: "50", type: "points", value: 50, color: "#b7d96c", weight: 1 }
];

const jackpotSegments = [
  { label: "1000", type: "points", value: 1000, color: "#f7c948" },
  { label: "SKIN", type: "skin", value: 0, color: "#7c5ce5" },
  { label: "1000", type: "points", value: 1000, color: "#22a699" },
  { label: "SUPER JACKPOT", type: "super", value: 2000, color: "#ff6b5f" },
  { label: "1000", type: "points", value: 1000, color: "#2f80ed" },
  { label: "SKIN", type: "skin", value: 0, color: "#0f766e" },
  { label: "1000", type: "points", value: 1000, color: "#f0802f" },
  { label: "SKIN", type: "skin", value: 0, color: "#d6426b" }
];

const wheelSkins = [
  {
    name: "Neon Skin",
    id: "neon",
    colors: {
      points: ["#00b4d8", "#ffd166", "#06d6a0", "#118ab2", "#f77f00"],
      jackpot: "#ff4d6d",
      mystery: "#8338ec",
      shield: "#3a86ff",
      free: "#7209b7",
      steal: "#ef476f",
      swap: "#fb8500",
      miss: "#536878",
      bankrupt: "#121820"
    }
  },
  {
    name: "Galaxy Skin",
    id: "galaxy",
    colors: {
      points: ["#4cc9f0", "#f72585", "#7209b7", "#4895ef", "#b5179e"],
      jackpot: "#ffd166",
      mystery: "#560bad",
      shield: "#4361ee",
      free: "#9d4edd",
      steal: "#ef233c",
      swap: "#f77f00",
      miss: "#3d405b",
      bankrupt: "#101018"
    }
  },
  {
    name: "Arcade Skin",
    id: "arcade",
    colors: {
      points: ["#ffbe0b", "#3a86ff", "#06d6a0", "#fb5607", "#90be6d"],
      jackpot: "#ff006e",
      mystery: "#8338ec",
      shield: "#277da1",
      free: "#9b5de5",
      steal: "#e63946",
      swap: "#f8961e",
      miss: "#577590",
      bankrupt: "#1b1b1f"
    }
  }
];

const customSetValue = "custom";
const wordSets = {
  stage4Lesson2: {
    name: "Stage 4 - Lesson 2",
    description: "Words with the prefix 'in-' meaning 'not'",
    words: ["inability", "inactive", "inadequate", "incorrect", "incurable", "indefinite", "inelegant", "inflexible", "insecure", "invisible"]
  },
  stage4Lesson3: {
    name: "Stage 4 - Lesson 3",
    description: "Words with the prefixes 'il-', 'im-' and 'ir-'",
    words: ["illegal", "immature", "impossible", "imperfect", "irrelevant", "illegible", "immortal", "impatient", "irregular", "irresponsible"]
  },
  stage4Lesson4: {
    name: "Stage 4 - Lesson 4",
    description: "Words with the prefix 'sub-'",
    words: ["subdivide", "subject", "submarine", "subtitle", "substandard", "subheading", "submit", "submerge", "subway", "subtropical"]
  },
  stage4Lesson5: {
    name: "Stage 4 - Lesson 5",
    description: "Words with the prefix 'inter-'",
    words: ["interact", "interchange", "intercity", "interface", "internet", "intercept", "international", "intercom", "interfere", "interview"]
  },
  stage4Lesson6: {
    name: "Stage 4 - Lesson 6",
    description: "Challenge words",
    words: ["strength", "calendar", "appear", "interest", "increase", "grammar", "women", "straight", "opposite", "believe"]
  }
};

const state = {
  players: [],
  words: [],
  usedWords: [],
  currentWord: "",
  revealed: new Set(),
  usedLetters: new Set(),
  playerIndex: 0,
  round: 1,
  maxRounds: 3,
  wordsPerRound: 3,
  wordsCompletedInRound: 0,
  currentWordInRound: 0,
  wordSolved: false,
  roundTransitioning: false,
  roundTimerId: null,
  nextWordTimerId: null,
  gameOver: false,
  showOverallScore: true,
  choosingPlayer: false,
  mysteryActive: false,
  mysteryLocked: false,
  mysteryOutcomes: [],
  jackpotActive: false,
  jackpotLocked: false,
  jackpotAngle: 0,
  jackpotResultTimerId: null,
  activeSkin: null,
  spinValue: null,
  canGuess: false,
  wheelAngle: 0,
  spinning: false,
  pressStartedAt: 0,
  consecutiveSpinPlayer: null,
  consecutiveSpinCount: 0,
  botTimerId: null
};

const els = {
  setupScreen: document.querySelector("#setupScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  setupForm: document.querySelector("#setupForm"),
  gameModeInputs: [...document.querySelectorAll("input[name='gameMode']")],
  playerCountInputs: [...document.querySelectorAll("input[name='playerCount']")],
  playerCountWrap: document.querySelector(".player-count"),
  player3Wrap: document.querySelector("#player3Wrap"),
  wordSetSelect: document.querySelector("#wordSetSelect"),
  wordPreview: document.querySelector("#wordPreview"),
  customWordWrap: document.querySelector("#customWordWrap"),
  customWordInputs: [...document.querySelectorAll(".custom-word-input")],
  roundNumber: document.querySelector("#roundNumber"),
  turnTitle: document.querySelector("#turnTitle"),
  scoreboard: document.querySelector("#scoreboard"),
  choicePanel: document.querySelector("#choicePanel"),
  choiceTitle: document.querySelector("#choiceTitle"),
  choiceText: document.querySelector("#choiceText"),
  choiceOptions: document.querySelector("#choiceOptions"),
  mysteryPanel: document.querySelector("#mysteryPanel"),
  mysteryText: document.querySelector("#mysteryText"),
  mysteryCards: document.querySelector("#mysteryCards"),
  jackpotPanel: document.querySelector("#jackpotPanel"),
  jackpotCanvas: document.querySelector("#jackpotCanvas"),
  jackpotText: document.querySelector("#jackpotText"),
  jackpotSpinButton: document.querySelector("#jackpotSpinButton"),
  wheelCanvas: document.querySelector("#wheelCanvas"),
  spinButton: document.querySelector("#spinButton"),
  wheelResult: document.querySelector("#wheelResult"),
  wheelPop: document.querySelector("#wheelPop"),
  bankruptBlast: document.querySelector("#bankruptBlast"),
  jackpotCelebration: document.querySelector("#jackpotCelebration"),
  puzzleWord: document.querySelector("#puzzleWord"),
  letterInput: document.querySelector("#letterInput"),
  guessLetterButton: document.querySelector("#guessLetterButton"),
  solveInput: document.querySelector("#solveInput"),
  solveButton: document.querySelector("#solveButton"),
  usedLetters: document.querySelector("#usedLetters"),
  messageLog: document.querySelector("#messageLog"),
  newRoundButton: document.querySelector("#newRoundButton"),
  scoreToggleButton: document.querySelector("#scoreToggleButton"),
  finalPanel: document.querySelector("#finalPanel"),
  winnerTitle: document.querySelector("#winnerTitle"),
  finalScores: document.querySelector("#finalScores"),
  resetButton: document.querySelector("#resetButton")
};

const ctx = els.wheelCanvas.getContext("2d");
const jackpotCtx = els.jackpotCanvas.getContext("2d");
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const pointerAngle = -Math.PI / 2;
const maxConsecutiveSpins = 3;
const maxShieldsPerPlayerPerWord = 2;

function normalizeWord(word) {
  return word.trim().toLowerCase().replace(/[^a-z]/g, "");
}

function getPlayerCount() {
  if (getGameMode() === "bot") return 2;
  return Number(document.querySelector("input[name='playerCount']:checked").value);
}

function getGameMode() {
  return document.querySelector("input[name='gameMode']:checked")?.value || "friend";
}

function currentPlayer() {
  return state.players[state.playerIndex];
}

function isBotTurn() {
  return Boolean(currentPlayer()?.isBot);
}

function addRoundPoints(points) {
  currentPlayer().roundScore += points;
}

function drawWheel() {
  const canvas = els.wheelCanvas;
  const center = canvas.width / 2;
  const radius = center - 20;
  const layout = wheelLayout();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const plateGradient = ctx.createRadialGradient(center, center, radius * 0.25, center, center, radius + 20);
  plateGradient.addColorStop(0, "#ffffff");
  plateGradient.addColorStop(0.72, "#f2f8f9");
  plateGradient.addColorStop(1, "#bfd1d5");
  ctx.beginPath();
  ctx.arc(center, center, radius + 18, 0, Math.PI * 2);
  ctx.fillStyle = plateGradient;
  ctx.fill();

  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(state.wheelAngle);

  layout.forEach(({ segment, start, end }) => {
    const arc = end - start;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = segmentColor(segment);
    ctx.fill();

    const shine = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    shine.addColorStop(0, "rgba(255,255,255,0.42)");
    shine.addColorStop(0.55, "rgba(255,255,255,0.05)");
    shine.addColorStop(1, "rgba(0,0,0,0.16)");
    ctx.fillStyle = shine;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.82)";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.save();
    const mid = start + arc / 2;
    ctx.rotate(mid);
    ctx.translate(radius * wheelLabelRadiusFactor(segment), 0);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = wheelTextColor(segment);
    ctx.shadowColor = wheelTextColor(segment) === "#fff" ? "rgba(0,0,0,0.24)" : "rgba(255,255,255,0.52)";
    ctx.shadowBlur = 2;
    const lines = segmentLabelLines(segment.label);
    ctx.font = wheelLabelFont(segment.label, lines.length);
    lines.forEach((line, lineIndex) => {
      const offset = (lineIndex - (lines.length - 1) / 2) * 18;
      ctx.fillText(line, 0, offset, labelMaxWidth(segment.label, radius));
    });
    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(0, 0, radius + 2, 0, Math.PI * 2);
  ctx.lineWidth = 12;
  ctx.strokeStyle = "#fffdf7";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius + 10, 0, Math.PI * 2);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#172026";
  ctx.stroke();

  const tickLayout = wheelLayout();
  tickLayout.forEach(({ start }) => {
    ctx.save();
    ctx.rotate(start);
    ctx.beginPath();
    ctx.moveTo(radius - 4, 0);
    ctx.lineTo(radius + 12, 0);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#fffdf7";
    ctx.stroke();
    ctx.restore();
  });

  ctx.restore();
}

function normalizeAngle(angle) {
  const full = Math.PI * 2;
  return ((angle % full) + full) % full;
}

function segmentLabelLines(label) {
  if (label === "LOSE TURN") return ["LOSE", "TURN"];
  if (label.includes(" ")) return label.split(" ");
  return [label];
}

function wheelLabelRadiusFactor() {
  return 0.73;
}

function wheelLabelFont(label, lineCount) {
  if (/^\d+$/.test(label)) return "900 35px Trebuchet MS";
  if (label === "BANKRUPT") return "900 17px Trebuchet MS";
  if (label === "JACKPOT") return "900 18px Trebuchet MS";
  if (label.length > 6) return "900 20px Trebuchet MS";
  return lineCount > 1 ? "900 20px Trebuchet MS" : "900 24px Trebuchet MS";
}

function labelMaxWidth(label, radius) {
  if (label === "BANKRUPT" || label === "JACKPOT") return radius * 0.7;
  if (label === "FREE LETTER" || label === "SWAP POINTS") return radius * 0.55;
  return radius * 0.5;
}

function wheelTextColor(segment) {
  if (["bankrupt", "miss", "free", "mystery", "steal", "shield", "jackpot"].includes(segment.type)) return "#fff";
  return "#172026";
}

function segmentColor(segment) {
  const skin = wheelSkins.find((item) => item.id === state.activeSkin);
  if (!skin) return segment.color;
  if (segment.type === "points") {
    const pointSegments = wheelSegments.filter((item) => item.type === "points");
    const pointIndex = pointSegments.indexOf(segment);
    return skin.colors.points[pointIndex % skin.colors.points.length];
  }
  return skin.colors[segment.type] || segment.color;
}

function wheelLayout() {
  const full = Math.PI * 2;
  const weights = wheelWeights();
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let cursor = -Math.PI / 2;

  return wheelSegments.map((segment, index) => {
    const start = cursor;
    const end = start + full * (weights[index] / total);
    cursor = end;
    return { segment, start, end, weight: weights[index] };
  });
}

function wheelWeights() {
  return wheelSegments.map((segment) => balancedWheelWeight(segment));
}

function balancedWheelWeight(segment) {
  let weight = segment.weight;

  if (state.players.length > 0 && state.playerIndex === 0) {
    if (segment.type === "bankrupt") weight *= 0.58;
    if (segment.type === "shield") weight *= canCurrentPlayerReceiveShield() ? 1.25 : 0;
    if (segment.type === "points" && segment.value >= 150) weight *= 1.08;
  }

  return weight;
}

function chooseWheelSegment() {
  if (state.consecutiveSpinPlayer === state.playerIndex && state.consecutiveSpinCount >= maxConsecutiveSpins) {
    return wheelLayout().find(({ segment }) => segment.type === "miss");
  }

  return chooseWeightedLayoutItem(availableWheelLayout());
}

function availableWheelLayout() {
  return wheelLayout().filter(({ segment }) => {
    if (segment.type === "steal") return canStealPoints();
    if (segment.type === "shield") return canCurrentPlayerReceiveShield();
    return true;
  });
}

function canStealPoints() {
  return state.players.some((player, index) => index !== state.playerIndex && player.roundScore >= 100);
}

function canCurrentPlayerReceiveShield() {
  const player = currentPlayer();
  if (!player) return false;
  return (player.shields || 0) < maxShieldsPerPlayerPerWord && (player.shieldsThisWord || 0) < maxShieldsPerPlayerPerWord;
}

function chooseWeightedLayoutItem(layout) {
  const totalWeight = layout.reduce((sum, item) => sum + item.weight, 0);
  let pick = Math.random() * totalWeight;

  for (const item of layout) {
    pick -= item.weight;
    if (pick <= 0) return item;
  }

  return layout[layout.length - 1];
}

function targetAngleForSegment(item, power) {
  const full = Math.PI * 2;
  const arc = item.end - item.start;
  const landing = item.start + arc * (0.28 + Math.random() * 0.44);
  const target = ((pointerAngle - landing) % full + full) % full;
  const current = ((state.wheelAngle % full) + full) % full;
  const baseTurns = 3 + Math.floor(power * 6);
  const extraTurns = baseTurns + Math.floor(Math.random() * 2);
  return state.wheelAngle + ((target - current + full) % full) + full * extraTurns;
}

function canSpin() {
  return !state.spinning && !state.canGuess && !state.wordSolved && !state.roundTransitioning && !state.choosingPlayer && !state.mysteryActive && !state.jackpotActive && !state.gameOver && state.players.length > 0;
}

function beginSpinPress(event) {
  if (!canSpin()) return;
  event.preventDefault();
  state.pressStartedAt = performance.now();
  els.spinButton.classList.add("is-charging");
  els.spinButton.textContent = "Release";
  message("Hold a little longer for a stronger spin, then release.");
  if (event.pointerId !== undefined) els.spinButton.setPointerCapture(event.pointerId);
}

function finishSpinPress(event) {
  if (!state.pressStartedAt) return;
  if (event) event.preventDefault();
  const heldFor = performance.now() - state.pressStartedAt;
  const power = Math.max(0.15, Math.min(1, heldFor / 1600));
  state.pressStartedAt = 0;
  els.spinButton.classList.remove("is-charging");
  els.spinButton.textContent = "Hold to Spin";
  spinWheel(power);
}

function cancelSpinPress() {
  state.pressStartedAt = 0;
  els.spinButton.classList.remove("is-charging");
  els.spinButton.textContent = "Hold to Spin";
}

function spinWheel(power = 0.35) {
  if (!canSpin()) return;
  const target = chooseWheelSegment();
  recordSpinForCurrentPlayer();
  const start = state.wheelAngle;
  const end = targetAngleForSegment(target, power);
  const duration = 2100 + power * 2300;
  const started = performance.now();
  state.spinning = true;
  els.spinButton.disabled = true;
  state.spinValue = null;
  setInputs(false);
  hideWheelPop();
  message(`${currentPlayer().name} spins...`);

  function animate(now) {
    const progress = Math.min(1, (now - started) / duration);
    const eased = 1 - Math.pow(1 - progress, 5);
    state.wheelAngle = start + (end - start) * eased;
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
      return;
    }

    state.wheelAngle = end;
    state.spinning = false;
    drawWheel();
    applySegment(target.segment);
  }

  requestAnimationFrame(animate);
}

function applySegment(segment) {
  els.spinButton.disabled = false;
  const resultLabel = segment.label;
  els.wheelResult.textContent = `Wheel: ${resultLabel}`;
  flashWheelResult(resultLabel, wheelResultDescription(segment));

  if (segment.type === "bankrupt") {
    if ((currentPlayer().shields || 0) > 0) {
      currentPlayer().shields -= 1;
      message(`${currentPlayer().name}'s shield blocked Bankrupt. No points lost.`);
      renderAll();
      return;
    }
    currentPlayer().roundScore = 0;
    triggerBankruptBlast();
    message(`${currentPlayer().name} landed on Bankrupt. Only this round's points go to zero.`);
    nextPlayer();
    renderAll();
    return;
  }

  if (segment.type === "miss") {
    message(`${currentPlayer().name} loses this turn. Next player.`);
    nextPlayer();
    renderAll();
    return;
  }

  if (segment.type === "free") {
    revealFreeLetter();
    message(`${currentPlayer().name} gets a free letter.`);
    renderAll();
    return;
  }

  if (segment.type === "shield") {
    awardShield("Wheel");
    renderAll();
    return;
  }

  if (segment.type === "steal") {
    if (!canStealPoints()) {
      message("No player has 100 round points to steal. Next player.");
      nextPlayer();
      renderAll();
      return;
    }
    chooseOpponent(
      "Steal 100",
      `${currentPlayer().name}, choose who to steal 100 points from.`,
      stealPointsFrom,
      ({ player }) => player.roundScore >= 100
    );
    return;
  }

  if (segment.type === "swap") {
    chooseOpponent("Swap Points", `${currentPlayer().name}, choose who to swap round points with.`, swapScoresWith);
    return;
  }

  if (segment.type === "mystery") {
    showMysteryBox();
    return;
  }

  if (segment.type === "jackpot") {
    setInputs(false);
    triggerJackpotCelebration("jackpot");
    message(`${currentPlayer().name} landed on Jackpot. Spin the jackpot wheel.`);
    window.setTimeout(showJackpotWheel, 450);
    return;
  }

  const pointValue = segment.value;
  state.spinValue = pointValue;
  state.canGuess = true;
  setInputs(true);
  message(`${currentPlayer().name}, guess a letter for ${pointValue} points each.`);
  if (!isBotTurn()) els.letterInput.focus();
  renderAll();
}

function recordSpinForCurrentPlayer() {
  if (state.consecutiveSpinPlayer === state.playerIndex) {
    state.consecutiveSpinCount += 1;
    return;
  }

  state.consecutiveSpinPlayer = state.playerIndex;
  state.consecutiveSpinCount = 1;
}

function resetConsecutiveSpins() {
  state.consecutiveSpinPlayer = null;
  state.consecutiveSpinCount = 0;
}

function clearBotTimer() {
  if (!state.botTimerId) return;
  window.clearTimeout(state.botTimerId);
  state.botTimerId = null;
}

function scheduleBotTurn() {
  if (!isBotTurn() || state.botTimerId || state.gameOver || state.wordSolved) return;
  if (state.spinning || state.roundTransitioning || state.choosingPlayer || state.mysteryActive || state.jackpotActive) return;

  if (state.canGuess) {
    state.botTimerId = window.setTimeout(() => {
      state.botTimerId = null;
      takeBotLetterGuess();
    }, 850);
    return;
  }

  if (canSpin()) {
    state.botTimerId = window.setTimeout(() => {
      state.botTimerId = null;
      if (tryBotSolve()) return;
      spinWheel(0.3 + Math.random() * 0.45);
    }, 950);
  }
}

function chooseBotOpponent(opponents) {
  return [...opponents].sort((a, b) => b.player.roundScore - a.player.roundScore)[0];
}

function takeBotLetterGuess() {
  if (!isBotTurn() || !state.canGuess || state.wordSolved) return;
  const letter = chooseBotLetter();
  els.letterInput.value = letter;
  message(`${currentPlayer().name} guesses ${letter.toUpperCase()}...`);
  window.setTimeout(guessLetter, 450);
}

function chooseBotLetter() {
  const unused = alphabet.split("").filter((letter) => !state.usedLetters.has(letter));
  const hiddenInWord = state.currentWord
    .split("")
    .filter((letter, index, letters) => !state.revealed.has(letter) && letters.indexOf(letter) === index);
  const likelyLetters = "etaoinshrdlucmfwypvbgkjqxz".split("");
  const usefulLetter = likelyLetters.find((letter) => hiddenInWord.includes(letter));

  if (usefulLetter && Math.random() < 0.72) return usefulLetter;
  return unused[Math.floor(Math.random() * unused.length)] || "e";
}

function tryBotSolve() {
  const uniqueLetters = [...new Set(state.currentWord.split(""))];
  const revealedCount = uniqueLetters.filter((letter) => state.revealed.has(letter)).length;
  const hiddenCount = uniqueLetters.length - revealedCount;
  const shouldSolve = hiddenCount <= 2 && revealedCount >= 3 && Math.random() < 0.38;

  if (!shouldSolve) return false;
  els.solveInput.value = state.currentWord;
  message(`${currentPlayer().name} tries to solve the word...`);
  window.setTimeout(solveWord, 500);
  return true;
}

function wheelResultDescription(segment) {
  if (segment.type === "shield") return "Blocks one Bankrupt or Steal.";
  if (segment.type === "steal") return "Choose a player and take 100 points.";
  if (segment.type === "swap") return "Swap round points with another player.";
  if (segment.type === "free") return "One hidden letter is revealed.";
  if (segment.type === "jackpot") return "Open the Jackpot Wheel.";
  return "";
}

function awardShield(source) {
  const player = currentPlayer();
  player.shields = player.shields || 0;
  player.shieldsThisWord = player.shieldsThisWord || 0;

  if (player.shields >= maxShieldsPerPlayerPerWord || player.shieldsThisWord >= maxShieldsPerPlayerPerWord) {
    message(`${source}: ${player.name} already has the shield limit for this word.`);
    return false;
  }

  player.shields += 1;
  player.shieldsThisWord += 1;
  message(`${source}: ${player.name} gets a shield. It can block one Bankrupt or Steal.`);
  return true;
}

function chooseOpponent(title, text, onChoose, canChoose = () => true) {
  const opponents = state.players
    .map((player, index) => ({ player, index }))
    .filter((opponent) => opponent.index !== state.playerIndex && canChoose(opponent));

  if (opponents.length === 0) {
    message("No available player to choose. Next player.");
    nextPlayer();
    renderAll();
    return;
  }

  if (opponents.length === 1) {
    onChoose(opponents[0].index);
    return;
  }

  if (isBotTurn()) {
    const chosen = chooseBotOpponent(opponents);
    message(`${currentPlayer().name} chooses ${chosen.player.name}.`);
    window.setTimeout(() => onChoose(chosen.index), 700);
    return;
  }

  state.choosingPlayer = true;
  setInputs(false);
  els.choiceTitle.textContent = title;
  els.choiceText.textContent = text;
  els.choiceOptions.innerHTML = "";

  opponents.forEach(({ player, index }) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = player.name;
    button.addEventListener("click", () => {
      state.choosingPlayer = false;
      hideChoicePanel();
      onChoose(index);
    });
    els.choiceOptions.appendChild(button);
  });

  els.choicePanel.classList.remove("is-hidden");
  renderAll();
}

function hideChoicePanel() {
  els.choicePanel.classList.add("is-hidden");
  els.choiceOptions.innerHTML = "";
}

function stealPointsFrom(targetIndex) {
  const thief = currentPlayer();
  const target = state.players[targetIndex];

  if (!target || target.roundScore < 100) {
    message("No player has 100 round points to steal. Next player.");
    nextPlayer();
    renderAll();
    return;
  }

  if ((target.shields || 0) > 0) {
    target.shields -= 1;
    message(`${target.name}'s shield blocked the steal.`);
    renderAll();
    return;
  }

  const stolen = Math.min(100, target.roundScore);
  target.roundScore -= stolen;
  thief.roundScore += stolen;
  message(stolen > 0
    ? `${thief.name} stole ${stolen} points from ${target.name}.`
    : `${target.name} had no points to steal.`);
  renderAll();
}

function swapScoresWith(targetIndex) {
  const player = currentPlayer();
  const target = state.players[targetIndex];
  const playerScore = player.roundScore;
  player.roundScore = target.roundScore;
  target.roundScore = playerScore;
  message(`${player.name} swapped round points with ${target.name}.`);
  renderAll();
}

function showMysteryBox() {
  state.mysteryActive = true;
  state.mysteryLocked = false;
  state.mysteryOutcomes = buildMysteryOutcomes();
  setInputs(false);
  els.mysteryText.textContent = `${currentPlayer().name}, choose one card to reveal what happens.`;
  els.mysteryCards.innerHTML = "";

  state.mysteryOutcomes.forEach((outcome, index) => {
    const button = document.createElement("button");
    button.className = "mystery-card-button";
    button.type = "button";
    button.dataset.outcome = outcome;
    button.innerHTML = `
      <span class="card-back" aria-hidden="true"></span>
      <span class="card-label">Card ${index + 1}</span>
      <strong>${mysteryOutcomeLabel(outcome)}</strong>
    `;
    button.addEventListener("click", () => chooseMysteryCard(index));
    els.mysteryCards.appendChild(button);
  });

  els.mysteryPanel.classList.remove("is-hidden");
  renderAll();
  if (isBotTurn()) {
    window.setTimeout(() => chooseMysteryCard(Math.floor(Math.random() * state.mysteryOutcomes.length)), 900);
  }
}

function buildMysteryOutcomes() {
  const baseOutcomes = canCurrentPlayerReceiveShield()
    ? ["bonus", "free", "shield", "miss"]
    : ["bonus", "free", "bonus", "miss"];
  const outcomes = shuffle(baseOutcomes).slice(0, 3);
  const reservedIndexes = [];
  if (Math.random() < 0.3) {
    const penalty = Math.random() < 0.5 ? "minus50" : "minus100";
    reservedIndexes.push(replaceMysteryOutcome(outcomes, penalty));
  }
  if (Math.random() < 0.25) {
    replaceMysteryOutcome(outcomes, "bankrupt", reservedIndexes);
  }
  return shuffle(outcomes);
}

function replaceMysteryOutcome(outcomes, outcome, reservedIndexes = []) {
  const availableIndexes = outcomes
    .map((_, index) => index)
    .filter((index) => !reservedIndexes.includes(index));
  const pool = availableIndexes.length > 0 ? availableIndexes : outcomes.map((_, index) => index);
  const selectedIndex = pool[Math.floor(Math.random() * pool.length)];
  outcomes[selectedIndex] = outcome;
  return selectedIndex;
}

function chooseMysteryCard(index) {
  if (state.mysteryLocked) return;
  state.mysteryLocked = true;
  const outcome = state.mysteryOutcomes[index];
  [...els.mysteryCards.children].forEach((button, buttonIndex) => {
    button.classList.add("is-revealed");
    if (buttonIndex === index) button.classList.add("is-picked");
  });
  els.mysteryText.textContent = `You picked ${mysteryOutcomeLabel(outcome)}.`;
  window.setTimeout(() => {
    hideMysteryBox();
    applyMysteryOutcome(outcome);
  }, 1400);
}

function hideMysteryBox() {
  state.mysteryActive = false;
  state.mysteryLocked = false;
  state.mysteryOutcomes = [];
  els.mysteryPanel.classList.add("is-hidden");
  els.mysteryCards.innerHTML = "";
}

function mysteryOutcomeLabel(outcome) {
  if (outcome === "bonus") return "+200";
  if (outcome === "minus50") return "-50";
  if (outcome === "minus100") return "-100";
  if (outcome === "free") return "Free letter";
  if (outcome === "shield") return "Shield";
  if (outcome === "bankrupt") return "Bankrupt";
  return "Lose turn";
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function applyMysteryOutcome(outcome) {
  if (outcome === "bonus") {
    addRoundPoints(200);
    message(`Mystery Box: ${currentPlayer().name} gets 200 round points.`);
    renderAll();
    return;
  }

  if (outcome === "free") {
    revealFreeLetter();
    if (!state.wordSolved) message(`Mystery Box: ${currentPlayer().name} gets a free letter.`);
    renderAll();
    return;
  }

  if (outcome === "shield") {
    awardShield("Mystery Box");
    renderAll();
    return;
  }

  if (outcome === "minus50" || outcome === "minus100") {
    const penalty = outcome === "minus100" ? 100 : 50;
    const lostPoints = Math.min(penalty, currentPlayer().roundScore);
    currentPlayer().roundScore -= lostPoints;
    message(
      lostPoints > 0
        ? `Mystery Box: ${currentPlayer().name} loses ${lostPoints} round points.`
        : `Mystery Box: ${currentPlayer().name} had no round points to lose.`
    );
    renderAll();
    return;
  }

  if (outcome === "bankrupt") {
    if ((currentPlayer().shields || 0) > 0) {
      currentPlayer().shields -= 1;
      message(`Mystery Box: ${currentPlayer().name}'s shield blocked Bankrupt.`);
      renderAll();
      return;
    }
    currentPlayer().roundScore = 0;
    triggerBankruptBlast();
    message(`Mystery Box: Bankrupt. ${currentPlayer().name} loses this round's points.`);
    nextPlayer();
    renderAll();
    return;
  }

  message(`Mystery Box: ${currentPlayer().name} loses this turn.`);
  nextPlayer();
  renderAll();
}

function jackpotLayout() {
  const full = Math.PI * 2;
  const arc = full / jackpotSegments.length;
  let cursor = -Math.PI / 2;
  return jackpotSegments.map((segment) => {
    const start = cursor;
    const end = start + arc;
    cursor = end;
    return { segment, start, end, weight: 1 };
  });
}

function drawJackpotWheel() {
  const canvas = els.jackpotCanvas;
  const center = canvas.width / 2;
  const radius = center - 18;
  const layout = jackpotLayout();

  jackpotCtx.clearRect(0, 0, canvas.width, canvas.height);

  const plateGradient = jackpotCtx.createRadialGradient(center, center, radius * 0.2, center, center, radius + 12);
  plateGradient.addColorStop(0, "#fffbe8");
  plateGradient.addColorStop(0.72, "#ffffff");
  plateGradient.addColorStop(1, "#d8c56c");
  jackpotCtx.beginPath();
  jackpotCtx.arc(center, center, radius + 14, 0, Math.PI * 2);
  jackpotCtx.fillStyle = plateGradient;
  jackpotCtx.fill();

  jackpotCtx.save();
  jackpotCtx.translate(center, center);
  jackpotCtx.rotate(state.jackpotAngle);

  layout.forEach(({ segment, start, end }) => {
    const arc = end - start;
    jackpotCtx.beginPath();
    jackpotCtx.moveTo(0, 0);
    jackpotCtx.arc(0, 0, radius, start, end);
    jackpotCtx.closePath();
    jackpotCtx.fillStyle = segment.color;
    jackpotCtx.fill();

    const shine = jackpotCtx.createRadialGradient(0, 0, 0, 0, 0, radius);
    shine.addColorStop(0, "rgba(255,255,255,0.42)");
    shine.addColorStop(0.6, "rgba(255,255,255,0.08)");
    shine.addColorStop(1, "rgba(0,0,0,0.18)");
    jackpotCtx.fillStyle = shine;
    jackpotCtx.fill();

    jackpotCtx.strokeStyle = "rgba(255,255,255,0.85)";
    jackpotCtx.lineWidth = 4;
    jackpotCtx.stroke();

    jackpotCtx.save();
    const mid = start + arc / 2;
    jackpotCtx.rotate(mid);
    jackpotCtx.translate(radius * 0.67, 0);
    jackpotCtx.textAlign = "center";
    jackpotCtx.textBaseline = "middle";
    jackpotCtx.fillStyle = "#fff";
    jackpotCtx.shadowColor = "rgba(0,0,0,0.28)";
    jackpotCtx.shadowBlur = 3;
    const lines = jackpotLabelLines(segment.label);
    jackpotCtx.font = jackpotLabelFont(segment.label, lines.length);
    lines.forEach((line, lineIndex) => {
      const offset = (lineIndex - (lines.length - 1) / 2) * 16;
      jackpotCtx.fillText(line, 0, offset, radius * 0.5);
    });
    jackpotCtx.restore();
  });

  jackpotCtx.beginPath();
  jackpotCtx.arc(0, 0, radius + 2, 0, Math.PI * 2);
  jackpotCtx.lineWidth = 10;
  jackpotCtx.strokeStyle = "#fffdf7";
  jackpotCtx.stroke();

  jackpotCtx.beginPath();
  jackpotCtx.arc(0, 0, radius + 9, 0, Math.PI * 2);
  jackpotCtx.lineWidth = 7;
  jackpotCtx.strokeStyle = "#172026";
  jackpotCtx.stroke();
  jackpotCtx.restore();
}

function jackpotLabelLines(label) {
  if (label === "SUPER JACKPOT") return ["SUPER", "JACKPOT"];
  return [label];
}

function jackpotLabelFont(label, lineCount) {
  if (/^\d+$/.test(label)) return "900 31px Trebuchet MS";
  if (label === "SKIN") return "900 25px Trebuchet MS";
  return lineCount > 1 ? "900 18px Trebuchet MS" : "900 20px Trebuchet MS";
}

function showJackpotWheel() {
  state.jackpotActive = true;
  state.jackpotLocked = false;
  setInputs(false);
  hideWheelPop();
  els.jackpotText.textContent = `${currentPlayer().name}, spin for 1000 points, Super Jackpot, or a new Skin.`;
  els.jackpotSpinButton.disabled = false;
  els.jackpotSpinButton.textContent = "Spin Jackpot";
  els.jackpotPanel.classList.remove("is-hidden");
  drawJackpotWheel();
  renderAll();
  if (isBotTurn()) {
    window.setTimeout(spinJackpotWheel, 900);
  }
}

function hideJackpotWheel() {
  state.jackpotActive = false;
  state.jackpotLocked = false;
  els.jackpotPanel.classList.add("is-hidden");
  els.jackpotPanel.classList.remove("is-super");
  els.jackpotSpinButton.disabled = false;
}

function spinJackpotWheel() {
  if (!state.jackpotActive || state.jackpotLocked) return;
  const layout = jackpotLayout();
  const target = layout[Math.floor(Math.random() * layout.length)];
  const start = state.jackpotAngle;
  const end = targetJackpotAngle(target);
  const duration = 2600;
  const started = performance.now();
  state.jackpotLocked = true;
  els.jackpotSpinButton.disabled = true;
  els.jackpotSpinButton.textContent = "Spinning...";

  function animate(now) {
    const progress = Math.min(1, (now - started) / duration);
    const eased = 1 - Math.pow(1 - progress, 5);
    state.jackpotAngle = start + (end - start) * eased;
    drawJackpotWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
      return;
    }

    state.jackpotAngle = end;
    drawJackpotWheel();
    applyJackpotOutcome(target.segment);
  }

  requestAnimationFrame(animate);
}

function targetJackpotAngle(item) {
  const full = Math.PI * 2;
  const arc = item.end - item.start;
  const landing = item.start + arc * (0.28 + Math.random() * 0.44);
  const target = ((pointerAngle - landing) % full + full) % full;
  const current = normalizeAngle(state.jackpotAngle);
  return state.jackpotAngle + ((target - current + full) % full) + full * (4 + Math.floor(Math.random() * 2));
}

function applyJackpotOutcome(segment) {
  if (segment.type === "points") {
    addRoundPoints(segment.value);
    els.jackpotText.textContent = `${currentPlayer().name} wins ${segment.value} jackpot points.`;
    message(`Jackpot: ${currentPlayer().name} wins ${segment.value} round points.`);
    finishJackpotTurn(1300);
    return;
  }

  if (segment.type === "super") {
    addRoundPoints(segment.value);
    els.jackpotPanel.classList.add("is-super");
    triggerJackpotCelebration("super");
    els.jackpotText.textContent = `Super Jackpot. ${currentPlayer().name} wins ${segment.value} points.`;
    message(`Super Jackpot: ${currentPlayer().name} wins ${segment.value} round points.`);
    finishJackpotTurn(1600);
    return;
  }

  applyRandomSkin();
  els.jackpotText.textContent = `${currentPlayer().name} unlocked a new Skin for this round.`;
  message(`Jackpot Skin: ${currentPlayer().name} changed the wheel skin for this round.`);
  finishJackpotTurn(1500);
}

function finishJackpotTurn(delay) {
  if (state.jackpotResultTimerId) window.clearTimeout(state.jackpotResultTimerId);
  renderScores();
  state.jackpotResultTimerId = window.setTimeout(() => {
    state.jackpotResultTimerId = null;
    els.jackpotPanel.classList.remove("is-super");
    hideJackpotWheel();
    nextPlayer();
    renderAll();
  }, delay);
}

function applyRandomSkin() {
  const available = wheelSkins.filter((skin) => skin.id !== state.activeSkin);
  const skin = available[Math.floor(Math.random() * available.length)] || wheelSkins[0];
  state.activeSkin = skin.id;
  document.body.dataset.skin = skin.id;
  drawWheel();
  return skin;
}

function clearSkin() {
  state.activeSkin = null;
  delete document.body.dataset.skin;
}

function flashWheelResult(label, description = "") {
  els.wheelPop.innerHTML = `<span>${label}</span>${description ? `<small>${description}</small>` : ""}`;
  els.wheelPop.classList.remove("is-hidden");
  els.wheelPop.classList.add("is-visible");
  window.setTimeout(hideWheelPop, description ? 2600 : 1400);
}

function hideWheelPop() {
  els.wheelPop.classList.add("is-hidden");
  els.wheelPop.classList.remove("is-visible");
}

function triggerBankruptBlast() {
  els.bankruptBlast.classList.remove("is-hidden", "is-active");
  void els.bankruptBlast.offsetWidth;
  els.bankruptBlast.classList.add("is-active");
  window.setTimeout(() => {
    els.bankruptBlast.classList.add("is-hidden");
    els.bankruptBlast.classList.remove("is-active");
  }, 1850);
}

function triggerJackpotCelebration(mode = "jackpot") {
  const colors = ["#ffd44f", "#ff6b5f", "#14b8a6", "#2377d8", "#ffffff", "#f39c2f"];
  const particleCount = mode === "super" ? 96 : 64;
  const sparkleCount = mode === "super" ? 22 : 12;

  els.jackpotCelebration.innerHTML = "";
  els.jackpotCelebration.classList.remove("is-hidden", "is-active");

  for (let index = 0; index < particleCount; index += 1) {
    const piece = document.createElement("span");
    const isStar = index % 5 === 0;
    piece.className = `jackpot-piece${isStar ? " is-star" : ""}`;
    piece.style.setProperty("--x", `${4 + Math.random() * 92}%`);
    piece.style.setProperty("--size", `${isStar ? 9 + Math.random() * 9 : 8 + Math.random() * 16}px`);
    piece.style.setProperty("--color", colors[index % colors.length]);
    piece.style.setProperty("--rotate", `${Math.random() * 360}deg`);
    piece.style.setProperty("--drift", `${-36 + Math.random() * 72}vw`);
    piece.style.setProperty("--duration", `${1350 + Math.random() * 950}ms`);
    piece.style.setProperty("--delay", `${Math.random() * 260}ms`);
    els.jackpotCelebration.appendChild(piece);
  }

  for (let index = 0; index < sparkleCount; index += 1) {
    const spark = document.createElement("span");
    spark.className = "jackpot-piece is-spark";
    spark.style.setProperty("--x", `${38 + Math.random() * 24}%`);
    spark.style.setProperty("--y", `${32 + Math.random() * 20}%`);
    spark.style.setProperty("--size", `${5 + Math.random() * 8}px`);
    spark.style.setProperty("--color", index % 3 === 0 ? "#ffffff" : "#ffd44f");
    spark.style.setProperty("--rotate", `${Math.random() * 360}deg`);
    spark.style.setProperty("--drift", `${-18 + Math.random() * 36}vw`);
    spark.style.setProperty("--fall", `${-12 + Math.random() * 34}vh`);
    spark.style.setProperty("--duration", `${720 + Math.random() * 520}ms`);
    spark.style.setProperty("--delay", `${Math.random() * 180}ms`);
    els.jackpotCelebration.appendChild(spark);
  }

  void els.jackpotCelebration.offsetWidth;
  els.jackpotCelebration.classList.add("is-active");
  window.setTimeout(() => {
    els.jackpotCelebration.classList.add("is-hidden");
    els.jackpotCelebration.classList.remove("is-active");
    els.jackpotCelebration.innerHTML = "";
  }, mode === "super" ? 2450 : 2100);
}

function revealFreeLetter() {
  const hiddenLetters = [...new Set(state.currentWord.split(""))].filter((letter) => !state.revealed.has(letter));
  if (hiddenLetters.length === 0) {
    finishRegularWord(currentPlayer(), true);
    return;
  }
  const letter = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
  state.revealed.add(letter);
  state.usedLetters.add(letter);
  addRoundPoints(75);
  if (isSolved()) finishRegularWord(currentPlayer(), true);
}

function guessLetter() {
  if (!state.canGuess || state.wordSolved) return;
  const letter = normalizeWord(els.letterInput.value);
  els.letterInput.value = "";

  if (!letter || letter.length !== 1 || !alphabet.includes(letter)) {
    message("Type one letter first.");
    return;
  }

  if (state.usedLetters.has(letter)) {
    message(`The letter ${letter.toUpperCase()} has already been used.`);
    return;
  }

  state.usedLetters.add(letter);
  const count = state.currentWord.split("").filter((char) => char === letter).length;

  if (count === 0) {
    state.canGuess = false;
    setInputs(false);
    message(`No ${letter.toUpperCase()} in this word. Next player.`);
    nextPlayer();
    renderAll();
    return;
  }

  state.revealed.add(letter);
  const points = count * (state.spinValue || 100);
  addRoundPoints(points);
  state.canGuess = false;
  setInputs(false);

  if (isSolved()) {
    finishRegularWord(currentPlayer(), true);
    return;
  }

  message(`${letter.toUpperCase()} appears ${count} time${count === 1 ? "" : "s"}. +${points} round points.`);
  renderAll();
}

function solveWord() {
  if (state.wordSolved) {
    message("This word is already solved. Tap Next Word.");
    return;
  }

  const attempt = normalizeWord(els.solveInput.value);
  els.solveInput.value = "";

  if (!attempt) {
    message("Type the whole word to solve it.");
    return;
  }

  if (attempt === state.currentWord) {
    state.currentWord.split("").forEach((letter) => state.revealed.add(letter));
    addRoundPoints(500);
    finishRegularWord(currentPlayer(), true);
    return;
  }

  message(`${currentPlayer().name} tried "${attempt}" but it was not right. Next player.`);
  state.canGuess = false;
  setInputs(false);
  nextPlayer();
  renderAll();
}

function finishRegularWord(player, solved) {
  if (state.wordSolved || state.roundTransitioning || state.gameOver) return;
  state.currentWord.split("").forEach((letter) => state.revealed.add(letter));
  state.canGuess = false;
  state.wordSolved = true;
  state.wordsCompletedInRound += 1;
  setInputs(false);
  renderAll();

  if (state.wordsCompletedInRound >= state.wordsPerRound) {
    state.roundTransitioning = true;
    message(`${player.name} solved ${state.currentWord.toUpperCase()}. Round ${state.round} is complete. Scores move to Overall.`);
    renderAll();
    scheduleRoundCommit(1400);
    return;
  }

  if (solved) {
    message(`${player.name} solved ${state.currentWord.toUpperCase()} and gets a 500 point solve reward. Next word coming up...`);
    scheduleNextWord(1500);
  }
}

function isSolved() {
  return state.currentWord.split("").every((letter) => state.revealed.has(letter));
}

function nextPlayer() {
  state.playerIndex = (state.playerIndex + 1) % state.players.length;
  state.spinValue = null;
  resetConsecutiveSpins();
  drawWheel();
}

function nextWord() {
  if (state.words.length === 0 || state.spinning || state.roundTransitioning || state.gameOver) return;
  if (state.nextWordTimerId) {
    window.clearTimeout(state.nextWordTimerId);
    state.nextWordTimerId = null;
  }

  if (state.currentWord && !state.wordSolved) {
    state.wordsCompletedInRound += 1;
  }

  if (state.wordsCompletedInRound >= state.wordsPerRound) {
    state.roundTransitioning = true;
    message(`Round ${state.round} is complete. Scores move to Overall.`);
    renderAll();
    scheduleRoundCommit(900);
    return;
  }

  state.currentWordInRound = state.wordsCompletedInRound + 1;
  state.currentWord = chooseNewWord();
  state.revealed = new Set();
  state.usedLetters = new Set();
  state.canGuess = false;
  state.wordSolved = false;
  state.spinValue = null;
  resetConsecutiveSpins();
  state.players.forEach((player) => {
    player.shieldsThisWord = 0;
  });
  setInputs(false);
  els.solveInput.value = "";
  els.wheelResult.textContent = "Hold and release the wheel button to spin.";
  hideWheelPop();
  message(`Round ${state.round} of ${state.maxRounds}. Word ${state.currentWordInRound} of ${state.wordsPerRound}. ${currentPlayer().name} starts.`);
  renderAll();
}

function chooseNewWord() {
  if (state.usedWords.length >= state.words.length) state.usedWords = [];
  const available = state.words.filter((word) => !state.usedWords.includes(word) && word !== state.currentWord);
  const candidates = available.length > 0 ? available : state.words;
  const word = candidates[Math.floor(Math.random() * candidates.length)];
  state.usedWords.push(word);
  return word;
}

function commitRoundAndContinue() {
  state.roundTimerId = null;
  state.players.forEach((player) => {
    player.totalScore += player.roundScore;
    player.roundScore = 0;
  });

  state.roundTransitioning = false;

  if (state.round >= state.maxRounds) {
    finishGame();
    return;
  }

  state.round += 1;
  state.wordsCompletedInRound = 0;
  state.currentWordInRound = 0;
  state.currentWord = "";
  state.wordSolved = false;
  clearSkin();
  nextWord();
}

function finishGame() {
  state.gameOver = true;
  state.showOverallScore = true;
  state.canGuess = false;
  state.wordSolved = true;
  state.currentWord = "";
  state.currentWordInRound = state.wordsPerRound;
  state.revealed = new Set();
  state.usedLetters = new Set();
  state.spinValue = null;
  setInputs(false);
  hideWheelPop();
  hideJackpotWheel();
  clearSkin();
  const winners = getWinners();
  message(`${winnerText(winners)} Overall scores are now revealed.`);
  renderAll();
}

function keepFocusedControlVisible(event) {
  window.setTimeout(() => {
    event.target.scrollIntoView({ block: "center", behavior: "smooth" });
  }, 260);
}

function scheduleRoundCommit(delay) {
  if (state.roundTimerId) window.clearTimeout(state.roundTimerId);
  state.roundTimerId = window.setTimeout(commitRoundAndContinue, delay);
}

function scheduleNextWord(delay) {
  if (state.nextWordTimerId) window.clearTimeout(state.nextWordTimerId);
  state.nextWordTimerId = window.setTimeout(() => {
    state.nextWordTimerId = null;
    nextWord();
  }, delay);
}

function toggleOverallScore() {
  if (state.gameOver) return;
  state.showOverallScore = !state.showOverallScore;
  renderAll();
}

function renderAll() {
  drawWheel();
  renderScores();
  renderPuzzle();
  renderUsedLetters();
  renderFinalPanel();
  const wordNumber = Math.min(Math.max(state.currentWordInRound || 1, 1), state.wordsPerRound);
  els.roundNumber.textContent = `${state.round} of ${state.maxRounds} - Word ${wordNumber} of ${state.wordsPerRound}`;
  els.turnTitle.textContent = state.gameOver ? "Game complete" : `${currentPlayer().name}'s turn`;
  els.spinButton.disabled = isBotTurn() || state.spinning || state.canGuess || state.wordSolved || state.roundTransitioning || state.choosingPlayer || state.mysteryActive || state.jackpotActive || state.gameOver;
  els.newRoundButton.disabled = isBotTurn() || state.spinning || state.roundTransitioning || state.choosingPlayer || state.mysteryActive || state.jackpotActive || state.gameOver;
  els.solveInput.disabled = isBotTurn() || state.spinning || state.roundTransitioning || state.choosingPlayer || state.mysteryActive || state.jackpotActive || state.gameOver || state.wordSolved;
  els.solveButton.disabled = els.solveInput.disabled;
  els.scoreToggleButton.disabled = state.gameOver;
  els.scoreToggleButton.textContent = state.gameOver
    ? "Overall Revealed"
    : state.showOverallScore
      ? "Hide Overall Score"
      : "Show Overall Score";
  scheduleBotTurn();
}

function renderScores() {
  els.scoreboard.innerHTML = "";
  state.players.forEach((player, index) => {
    const card = document.createElement("article");
    card.className = `score-card${!state.gameOver && index === state.playerIndex ? " is-active" : ""}`;
    const overallVisible = state.showOverallScore || state.gameOver;
    card.innerHTML = `
      <div class="score-name">
        <span>${escapeHtml(player.name)}</span>
        <span>${!state.gameOver && index === state.playerIndex ? "Turn" : ""}</span>
      </div>
      <div class="score-value">${player.roundScore}</div>
      <div class="score-lines${overallVisible ? "" : " is-hidden-score"}">
        <span>Round</span>
        <strong>${overallVisible ? `Overall ${player.totalScore}` : "Overall hidden"}</strong>
      </div>
      <div class="score-badges">
        ${(player.shields || 0) > 0 ? `<span class="shield-badge">Shield ${player.shields}</span>` : ""}
      </div>
    `;
    els.scoreboard.appendChild(card);
  });
}

function renderFinalPanel() {
  if (!state.gameOver) {
    els.finalPanel.classList.add("is-hidden");
    els.finalScores.innerHTML = "";
    return;
  }

  const winners = getWinners();
  els.winnerTitle.textContent = winnerText(winners);
  els.finalScores.innerHTML = "";
  [...state.players]
    .sort((a, b) => b.totalScore - a.totalScore)
    .forEach((player) => {
      const row = document.createElement("div");
      row.className = `final-score-row${winners.includes(player) ? " is-winner" : ""}`;
      row.innerHTML = `
        <span>${escapeHtml(player.name)}</span>
        <strong>${player.totalScore}</strong>
      `;
      els.finalScores.appendChild(row);
    });
  els.finalPanel.classList.remove("is-hidden");
}

function getWinners() {
  const highest = Math.max(...state.players.map((player) => player.totalScore));
  return state.players.filter((player) => player.totalScore === highest);
}

function winnerText(winners) {
  if (winners.length === 1) return `${winners[0].name} wins!`;
  return `It's a tie: ${winners.map((player) => player.name).join(" and ")}!`;
}

function renderPuzzle() {
  els.puzzleWord.innerHTML = "";
  els.puzzleWord.style.setProperty("--letter-count", state.currentWord.length || 1);
  state.currentWord.split("").forEach((letter) => {
    const tile = document.createElement("span");
    tile.className = `tile${state.revealed.has(letter) ? "" : " is-hidden-letter"}`;
    tile.textContent = state.revealed.has(letter) ? letter : "?";
    els.puzzleWord.appendChild(tile);
  });
}

function renderUsedLetters() {
  els.usedLetters.innerHTML = "";
  [...state.usedLetters].sort().forEach((letter) => {
    const chip = document.createElement("span");
    chip.className = "used-chip";
    chip.textContent = letter;
    els.usedLetters.appendChild(chip);
  });
}

function message(text) {
  els.messageLog.textContent = text;
}

function setInputs(enabled) {
  const canUseLetterControls = enabled && !isBotTurn();
  els.letterInput.disabled = !canUseLetterControls;
  els.guessLetterButton.disabled = !canUseLetterControls;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function populateWordSetSelect() {
  Object.entries(wordSets).forEach(([key, set]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = set.name;
    els.wordSetSelect.appendChild(option);
  });

  const customOption = document.createElement("option");
  customOption.value = customSetValue;
  customOption.textContent = "Custom list";
  els.wordSetSelect.appendChild(customOption);
  els.wordSetSelect.value = Object.keys(wordSets)[0];
}

function updateGameModeUI() {
  const botMode = getGameMode() === "bot";
  els.playerCountWrap.classList.toggle("is-hidden", botMode);
  document.querySelector("#player2").closest("label").classList.toggle("is-hidden", botMode);
  els.player3Wrap.classList.toggle("is-hidden", botMode || getPlayerCount() !== 3);
}

function updateWordSetUI() {
  const selectedSet = els.wordSetSelect.value;
  const isCustom = selectedSet === customSetValue;
  els.customWordWrap.classList.toggle("is-hidden", !isCustom);

  if (!selectedSet) {
    els.wordPreview.innerHTML = `<span class="word-preview-empty">Choose one of the word sets to start.</span>`;
    return;
  }

  if (isCustom) {
    els.wordPreview.innerHTML = `<span class="word-preview-empty">Custom list selected. Fill the word boxes below.</span>`;
    els.customWordInputs[0]?.focus();
    return;
  }

  const set = wordSets[selectedSet];
  els.wordPreview.innerHTML = `
    <div class="word-preview-title">
      <strong>${escapeHtml(set.name)}</strong>
      <span>${escapeHtml(set.description)}</span>
    </div>
    <div class="word-chip-grid">
      ${set.words.map((word) => `<span>${escapeHtml(word)}</span>`).join("")}
    </div>
  `;
}

function selectedWords() {
  const selectedSet = els.wordSetSelect.value;
  if (!selectedSet) return [];
  if (selectedSet === customSetValue) {
    return els.customWordInputs.map((input) => input.value);
  }
  return wordSets[selectedSet].words;
}

function startGame(event) {
  event.preventDefault();

  if (!els.wordSetSelect.value) {
    alert("Choose a word set first.");
    els.wordSetSelect.focus();
    return;
  }

  const count = getPlayerCount();
  const botMode = getGameMode() === "bot";
  const names = botMode
    ? [document.querySelector("#player1").value.trim() || "Player 1", "Spelling Bot"]
    : [
      document.querySelector("#player1").value.trim() || "Player 1",
      document.querySelector("#player2").value.trim() || "Player 2",
      document.querySelector("#player3").value.trim() || "Player 3"
    ].slice(0, count);
  const words = selectedWords()
    .map(normalizeWord)
    .filter((word, index, list) => word.length > 1 && list.indexOf(word) === index);

  if (words.length === 0) {
    alert("Add at least one spelling word.");
    return;
  }

  clearBotTimer();
  state.players = names.map((name, index) => ({ name, roundScore: 0, totalScore: 0, shields: 0, shieldsThisWord: 0, isBot: botMode && index === 1 }));
  state.words = words;
  state.usedWords = [];
  state.playerIndex = 0;
  state.round = 1;
  state.wordsCompletedInRound = 0;
  state.currentWordInRound = 0;
  state.currentWord = "";
  state.wordSolved = false;
  state.roundTransitioning = false;
  if (state.roundTimerId) window.clearTimeout(state.roundTimerId);
  state.roundTimerId = null;
  if (state.nextWordTimerId) window.clearTimeout(state.nextWordTimerId);
  state.nextWordTimerId = null;
  state.gameOver = false;
  state.showOverallScore = true;
  state.choosingPlayer = false;
  state.mysteryActive = false;
  state.mysteryLocked = false;
  state.mysteryOutcomes = [];
  state.jackpotActive = false;
  state.jackpotLocked = false;
  state.canGuess = false;
  state.spinning = false;
  state.spinValue = null;
  if (state.jackpotResultTimerId) window.clearTimeout(state.jackpotResultTimerId);
  state.jackpotResultTimerId = null;
  clearSkin();
  resetConsecutiveSpins();
  state.revealed = new Set();
  state.usedLetters = new Set();
  hideChoicePanel();
  hideMysteryBox();
  hideJackpotWheel();
  els.setupScreen.classList.add("is-hidden");
  els.gameScreen.classList.remove("is-hidden");
  nextWord();
}

function resetGame() {
  clearBotTimer();
  state.spinning = false;
  state.pressStartedAt = 0;
  if (state.roundTimerId) window.clearTimeout(state.roundTimerId);
  state.roundTimerId = null;
  if (state.nextWordTimerId) window.clearTimeout(state.nextWordTimerId);
  state.nextWordTimerId = null;
  state.roundTransitioning = false;
  state.choosingPlayer = false;
  state.mysteryActive = false;
  state.mysteryLocked = false;
  state.mysteryOutcomes = [];
  state.jackpotActive = false;
  state.jackpotLocked = false;
  state.spinValue = null;
  if (state.jackpotResultTimerId) window.clearTimeout(state.jackpotResultTimerId);
  state.jackpotResultTimerId = null;
  clearSkin();
  resetConsecutiveSpins();
  hideChoicePanel();
  hideMysteryBox();
  hideJackpotWheel();
  cancelSpinPress();
  els.gameScreen.classList.add("is-hidden");
  els.setupScreen.classList.remove("is-hidden");
}

els.playerCountInputs.forEach((input) => {
  input.addEventListener("change", updateGameModeUI);
});

populateWordSetSelect();
updateGameModeUI();
updateWordSetUI();

els.setupForm.addEventListener("submit", startGame);
els.wordSetSelect.addEventListener("change", updateWordSetUI);
els.gameModeInputs.forEach((input) => input.addEventListener("change", updateGameModeUI));
els.spinButton.addEventListener("pointerdown", beginSpinPress);
els.spinButton.addEventListener("pointerup", finishSpinPress);
els.spinButton.addEventListener("pointerleave", (event) => {
  if (state.pressStartedAt && event.buttons === 0) finishSpinPress(event);
});
els.spinButton.addEventListener("pointercancel", cancelSpinPress);
els.spinButton.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && canSpin()) {
    event.preventDefault();
    spinWheel(0.45);
  }
});
els.guessLetterButton.addEventListener("click", guessLetter);
els.solveButton.addEventListener("click", solveWord);
els.newRoundButton.addEventListener("click", nextWord);
els.scoreToggleButton.addEventListener("click", toggleOverallScore);
els.resetButton.addEventListener("click", resetGame);
els.jackpotSpinButton.addEventListener("click", spinJackpotWheel);
els.letterInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") guessLetter();
});
els.solveInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") solveWord();
});

[els.letterInput, els.solveInput].forEach((input) => {
  input.setAttribute("autocomplete", "new-password");
  input.setAttribute("autocorrect", "off");
  input.setAttribute("autocapitalize", "none");
  input.setAttribute("spellcheck", "false");
  input.addEventListener("focus", keepFocusedControlVisible);
});

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    const active = document.activeElement;
    if (active === els.letterInput || active === els.solveInput) {
      keepFocusedControlVisible({ target: active });
    }
  });
}

setInputs(false);
drawWheel();
drawJackpotWheel();

const previewParams = new URLSearchParams(window.location.search);
const previewMode = previewParams.get("preview");

function setupPreviewGame() {
  state.players = [
    { name: "Jacob", roundScore: 0, totalScore: 0, shields: 0, shieldsThisWord: 0 },
    { name: "Mum", roundScore: 0, totalScore: 0, shields: 0, shieldsThisWord: 0 }
  ];
  state.words = ["preview"];
  state.currentWord = "preview";
  state.currentWordInRound = 1;
  state.round = 1;
  state.wordsCompletedInRound = 0;
  state.playerIndex = 0;
  state.revealed = new Set(["p", "r"]);
  state.usedLetters = new Set(["p", "r"]);
  state.gameOver = false;
  state.wordSolved = false;
  state.roundTransitioning = false;
  state.canGuess = false;
  els.setupScreen.classList.add("is-hidden");
  els.gameScreen.classList.remove("is-hidden");
}

if (previewMode === "bankrupt") {
  els.setupScreen.classList.add("is-hidden");
  els.gameScreen.classList.remove("is-hidden");
  window.setTimeout(triggerBankruptBlast, 500);
}

if (previewMode === "jackpot") {
  setupPreviewGame();
  renderAll();
  window.setTimeout(showJackpotWheel, 300);
}

if (previewMode === "jackpot-effect") {
  setupPreviewGame();
  renderAll();
  let previewEffectRuns = 0;
  const runPreviewJackpotEffect = () => {
    previewEffectRuns += 1;
    triggerJackpotCelebration("super");
    if (previewEffectRuns >= 4) window.clearInterval(previewEffectTimer);
  };
  const previewEffectTimer = window.setInterval(runPreviewJackpotEffect, 3200);
  window.setTimeout(runPreviewJackpotEffect, 350);
  window.setTimeout(showJackpotWheel, 650);
}

if (previewMode === "skin") {
  const requestedSkin = previewParams.get("skin");
  const skin = wheelSkins.find((item) => item.id === requestedSkin) || wheelSkins[0];
  setupPreviewGame();
  state.activeSkin = skin.id;
  document.body.dataset.skin = skin.id;
  els.wheelResult.textContent = `${skin.name} preview`;
  message(`${skin.name} preview.`);
  renderAll();
}


