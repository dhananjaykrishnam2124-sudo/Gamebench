document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const beginBtn = document.getElementById("begin-btn");
  const bgMusic = document.getElementById("bg-music");

  const sceneRibbon = document.getElementById("scene-ribbon");
  const ribbon = document.getElementById("ribbon");
  const sceneCake = document.getElementById("scene-cake");
  const flames = [document.getElementById("flame-1"), document.getElementById("flame-2")];
  const smokes = [document.getElementById("smoke-1"), document.getElementById("smoke-2")];
  const sceneLetter = document.getElementById("scene-letter");
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const envelopeFlap = document.querySelector(".envelope-flap");
  const heartSeal = document.getElementById("heart-seal");
  const letterPaper = document.getElementById("letter-paper");
  const continueBtn = document.getElementById("continue-btn");
  const sceneSurprise = document.getElementById("scene-surprise");

  createPetals();
  createDust();

  // After the short loader, ask for one tap so the music can start (browser autoplay rules)
  setTimeout(() => {
    beginBtn.disabled = false;
    beginBtn.textContent = "Tap to begin";
  }, 2300);

  beginBtn.addEventListener("click", () => {
    if (bgMusic) bgMusic.play().catch(err => console.log("Audio blocked:", err));
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      runTitle();
    }, 1000);
  });

  // Scene 1: title
  function runTitle() {
    sceneRibbon.classList.remove("hidden");
    setTimeout(() => {
      ribbon.classList.add("ribbon-out");
      setTimeout(() => {
        sceneRibbon.classList.add("hidden");
        sceneCake.classList.remove("hidden");
      }, 1200);
    }, 3800);
  }

  // Scene 2: candles
  let candlesBlown = false;
  sceneCake.addEventListener("click", () => {
    if (candlesBlown) return;
    candlesBlown = true;

    flames.forEach(f => (f.style.display = "none"));
    smokes.forEach(s => s.classList.add("smoke-active"));
    triggerCelebration();

    setTimeout(() => {
      sceneCake.classList.add("zoom-out-transition");
      setTimeout(() => {
        sceneCake.classList.add("hidden");
        sceneLetter.classList.remove("hidden");
      }, 1000);
    }, 2800);
  });

  function triggerCelebration() {
    const colors = ["#e6d2a6", "#c9a45c", "#c98a9a", "#f6efe4"];
    confetti({ particleCount: 70, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors });
    confetti({ particleCount: 70, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors });
    setTimeout(() => confetti({ particleCount: 90, spread: 100, origin: { y: 0.6 }, colors }), 300);
  }

  // Scene 3: envelope
  let opened = false;
  function openEnvelope() {
    if (opened) return;
    opened = true;
    envelopeFlap.classList.add("open-flap");
    heartSeal.style.opacity = "0";
    setTimeout(() => {
      envelopeWrapper.style.display = "none";
      letterPaper.classList.remove("hidden");
    }, 800);
  }
  envelopeWrapper.addEventListener("click", openEnvelope);
  envelopeWrapper.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(); }
  });

  // Scene 4: surprise
  continueBtn.addEventListener("click", () => {
    sceneLetter.classList.add("slide-out-left");
    setTimeout(() => {
      sceneLetter.classList.add("hidden");
      sceneSurprise.classList.remove("hidden");
      sceneSurprise.classList.add("slide-in-right");
    }, 750);
  });

  function createPetals() {
    const container = document.getElementById("hearts-container");
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("div");
      p.className = "floating-heart";
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 12}s`;
      p.style.animationDuration = `${12 + Math.random() * 8}s`;
      container.appendChild(p);
    }
  }

  function createDust() {
    const container = document.getElementById("particles-container");
    for (let i = 0; i < 24; i++) {
      const d = document.createElement("div");
      d.className = "particle";
      d.style.left = `${Math.random() * 100}%`;
      d.style.animationDelay = `${Math.random() * 14}s`;
      d.style.animationDuration = `${10 + Math.random() * 8}s`;
      container.appendChild(d);
    }
  }
});
