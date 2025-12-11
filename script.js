/**
 * ONE MORE SCROLL THEN SLEEP
 * A cute but exhausted late-night scrolling experience
 */

// ─────────────────────────────────────────────────────────────────────────────────
// FAKE POSTS
// ─────────────────────────────────────────────────────────────────────────────────
const fakePosts = [
  { image: 'images/feed1.svg', caption: "today's vibe ✨" },
  { image: 'images/feed2.svg', caption: "the night feels like my mood" },
  { image: 'images/feed3.svg', caption: "pretending to be productive" },
  { image: 'images/feed4.svg', caption: "3am thoughts 🌙" },
  { image: 'images/feed5.svg', caption: "just one more... right?" },
  { image: 'images/feed6.svg', caption: "me @ my screen rn" },
  { image: 'images/feed7.svg', caption: "the algorithm knows" },
  { image: 'images/feed8.svg', caption: "soft hours ☁️" },
  { image: 'images/feed9.svg', caption: "my bed is right there tho" },
  { image: 'images/feed10.svg', caption: "this is definitely the last one" },
  { image: 'images/feed11.svg', caption: "sleep is a concept 💫" },
  { image: 'images/feed12.svg', caption: "tomorrow me will deal w this" },
  { image: 'images/feed13.svg', caption: "✨ romanticizing bad habits ✨" },
  { image: 'images/feed14.svg', caption: "blue light bestie" },
  { image: 'images/feed15.svg', caption: "chronically online ♡" },
];

// Floating messages (cute, non-blocking)
const floatingMessages = {
  8: { text: "if anyone asks, you're looking at art ♡", pos: "left top" },
  12: { text: "i'll remember you stopped here...", pos: "right mid", type: "default" },
  15: { text: "👁️ blink blink~ your eyes are tired", pos: "left mid", type: "eye" },
  18: { text: "🐱 meow... come sleep with me?", pos: "right top", type: "cat" },
  22: { text: "still here huh... same tbh", pos: "left bottom" },
  25: { text: "🧠 i'll be slow tomorrow but ok", pos: "right mid", type: "brain" },
  28: { text: "🐱 ...still scrolling?", pos: "left top", type: "cat" },
  32: { text: "we're both kinda stubborn hehe", pos: "right bottom" },
  38: { text: "at this point i respect the grind", pos: "left mid" },
  45: { text: "okay legend, you win ♡", pos: "right top" },
};

// ─────────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────────
let count = 0;
let currentPostIndex = 0;
let isAnimating = false;
const shownMessages = new Set();
let startTime = null;
let timerInterval = null;

// ─────────────────────────────────────────────────────────────────────────────────
// DOM ELEMENTS
// ─────────────────────────────────────────────────────────────────────────────────
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const startBtn = document.getElementById('startBtn');

const currentCard = document.getElementById('currentCard');
const postImage = document.getElementById('postImage');
const postCaption = document.getElementById('postCaption');
const floatingPrompt = document.getElementById('floatingPrompt');
const promptText = document.getElementById('promptText');
const tipText = document.getElementById('tipText');
const timeSpentEl = document.getElementById('timeSpent');
const sleepIndicator = document.getElementById('sleepIndicator');
const fakeHearts = document.getElementById('fakeHearts');
const fakeComments = document.getElementById('fakeComments');
const floatingMessagesContainer = document.getElementById('floatingMessages');

const vignetteOverlay = document.getElementById('vignetteOverlay');
const glitchOverlay = document.getElementById('glitchOverlay');
const scanLines = document.getElementById('scanLines');
const noiseOverlay = document.getElementById('noiseOverlay');

const restScreen = document.getElementById('restScreen');
const restCountdown = document.getElementById('restCountdown');
const sleepScreen = document.getElementById('sleepScreen');
const sleepMessage = document.getElementById('sleepMessage');

// ─────────────────────────────────────────────────────────────────────────────────
// PROMPT TEXT
// ─────────────────────────────────────────────────────────────────────────────────
function getPromptText(count) {
  if (count <= 2) return "One More Scroll Then Sleep";
  if (count <= 5) return "okay one more then sleep fr";
  if (count <= 9) return "last one i swear 🤥";
  if (count <= 14) return "just... one more...";
  if (count <= 20) return "sleep? don't know her";
  if (count <= 30) return "we're in too deep now";
  return "♡ scroll scroll scroll ♡";
}

function getTipText(count) {
  if (count === 0) return "";
  if (count <= 5) return `${count} posts ♡`;
  if (count <= 10) return `${count} posts... still going`;
  if (count <= 20) return `${count} posts deep~`;
  if (count <= 35) return `${count}... impressive honestly`;
  return `${count} ♡`;
}

// Format elapsed time as M:SS
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Update the timer display
function updateTimer() {
  if (!startTime) return;
  const elapsed = Date.now() - startTime;
  timeSpentEl.textContent = formatTime(elapsed);
}

// Start the timer
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

// ─────────────────────────────────────────────────────────────────────────────────
// VISUAL EFFECTS
// ─────────────────────────────────────────────────────────────────────────────────
function updateBackground(count) {
  // Gradually darken and shift colors
  const darkness = Math.min(0.85, count * 0.015);
  const r = Math.max(8, 13 - count * 0.15);
  const g = Math.max(5, 8 - count * 0.12);
  const b = Math.max(18, 24 - count * 0.1);
  
  const pinkOpacity = Math.max(0.03, 0.12 - count * 0.003);
  const cyanOpacity = Math.max(0.02, 0.08 - count * 0.002);
  
  scene2.style.background = `
    radial-gradient(ellipse at 30% 30%, rgba(255, 110, 180, ${pinkOpacity}) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 70%, rgba(0, 229, 255, ${cyanOpacity}) 0%, transparent 50%),
    linear-gradient(180deg, 
      rgb(${Math.max(15, 26 - count * 0.3)}, ${Math.max(8, 10 - count * 0.15)}, ${Math.max(35, 46 - count * 0.25)}) 0%, 
      rgb(${r}, ${g}, ${b}) 100%)
  `;
}

function updateGlitchLevel(count) {
  scene2.classList.remove('glitch-level-1', 'glitch-level-2', 'glitch-level-3');
  
  if (count >= 30) {
    scene2.classList.add('glitch-level-3');
    glitchOverlay.style.opacity = '0.35';
    scanLines.style.opacity = '0.4';
    noiseOverlay.style.opacity = '0.12';
  } else if (count >= 20) {
    scene2.classList.add('glitch-level-2');
    glitchOverlay.style.opacity = '0.2';
    scanLines.style.opacity = '0.25';
    noiseOverlay.style.opacity = '0.06';
  } else if (count >= 10) {
    scene2.classList.add('glitch-level-1');
    glitchOverlay.style.opacity = '0.08';
    scanLines.style.opacity = '0.12';
    noiseOverlay.style.opacity = '0.02';
  } else {
    glitchOverlay.style.opacity = '0';
    scanLines.style.opacity = '0';
    noiseOverlay.style.opacity = '0';
  }
}

// Sleepy vignette - gets darker as you scroll more
function updateVignette(count) {
  // Start showing vignette at count 3, max at count 40
  if (count < 3) {
    vignetteOverlay.style.opacity = '0';
  } else {
    // Gradually increase from 0 to 1 between count 3 and 40
    const intensity = Math.min(1, (count - 3) / 37);
    vignetteOverlay.style.opacity = intensity.toFixed(2);
  }
}

function updateSleepIndicator(count) {
  if (count >= 25) {
    sleepIndicator.textContent = 'Zzz...';
    sleepIndicator.classList.add('visible');
  } else if (count >= 18) {
    sleepIndicator.textContent = 'Zz..';
    sleepIndicator.classList.add('visible');
  } else if (count >= 12) {
    sleepIndicator.textContent = 'Z.';
    sleepIndicator.classList.add('visible');
  } else {
    sleepIndicator.classList.remove('visible');
  }
}

// ─────────────────────────────────────────────────────────────────────────────────
// FLOATING MESSAGES (non-blocking)
// ─────────────────────────────────────────────────────────────────────────────────
function showFloatingMessage(text, position, type = 'default') {
  const msg = document.createElement('div');
  msg.className = `float-msg msg-${type}`;
  
  // Parse position
  const [horizontal, vertical] = position.split(' ');
  msg.classList.add(`msg-${horizontal}`);
  msg.classList.add(`msg-${vertical}`);
  
  msg.textContent = text;
  floatingMessagesContainer.appendChild(msg);
  
  // Remove after animation
  setTimeout(() => {
    msg.remove();
  }, 4000);
}

function checkFloatingMessages() {
  if (floatingMessages[count] && !shownMessages.has(count)) {
    shownMessages.add(count);
    const msg = floatingMessages[count];
    showFloatingMessage(msg.text, msg.pos, msg.type || 'default');
  }
}

// ─────────────────────────────────────────────────────────────────────────────────
// REST SCREEN
// ─────────────────────────────────────────────────────────────────────────────────
function showRestScreen(callback) {
  restScreen.classList.remove('hidden');
  let seconds = 5;
  restCountdown.textContent = seconds;
  
  const interval = setInterval(() => {
    seconds--;
    restCountdown.textContent = seconds;
    
    if (seconds <= 0) {
      clearInterval(interval);
      restScreen.classList.add('hidden');
      if (callback) callback();
    }
  }, 1000);
}

// ─────────────────────────────────────────────────────────────────────────────────
// SLEEP SCREEN
// ─────────────────────────────────────────────────────────────────────────────────
function goToSleep() {
  sleepMessage.innerHTML = `
    you made it to ${count} posts ♡<br><br>
    see you next time~
  `;
  
  scene2.classList.add('hidden');
  sleepScreen.classList.remove('hidden');
}

// ─────────────────────────────────────────────────────────────────────────────────
// CARD SLIDE
// ─────────────────────────────────────────────────────────────────────────────────
function slideToNextPost() {
  if (isAnimating) return;
  isAnimating = true;
  
  currentCard.classList.add('sliding-out');
  
  currentPostIndex = (currentPostIndex + 1) % fakePosts.length;
  const nextPost = fakePosts[currentPostIndex];
  
  setTimeout(() => {
    postImage.src = nextPost.image;
    postCaption.textContent = nextPost.caption;
    fakeHearts.textContent = Math.floor(Math.random() * 500 + 50);
    fakeComments.textContent = Math.floor(Math.random() * 80 + 10);
    
    currentCard.classList.remove('sliding-out');
    currentCard.classList.add('sliding-in');
    
    promptText.textContent = getPromptText(count);
    tipText.textContent = getTipText(count);
    
    updateBackground(count);
    updateGlitchLevel(count);
    updateVignette(count);
    updateSleepIndicator(count);
    
    setTimeout(() => {
      currentCard.classList.remove('sliding-in');
      isAnimating = false;
    }, 350);
    
  }, 350);
}

// ─────────────────────────────────────────────────────────────────────────────────
// MAIN SCROLL HANDLER
// ─────────────────────────────────────────────────────────────────────────────────
function handleScroll() {
  if (isAnimating) return;
  
  count++;
  
  // Check for floating messages
  checkFloatingMessages();
  
  // Rest break every 15 scrolls
  if (count > 0 && count % 15 === 0) {
    showRestScreen(() => slideToNextPost());
    return;
  }
  
  slideToNextPost();
}

// ─────────────────────────────────────────────────────────────────────────────────
// EVENT LISTENERS
// ─────────────────────────────────────────────────────────────────────────────────

// Start button
startBtn.addEventListener('click', () => {
  scene1.classList.add('hidden');
  setTimeout(() => {
    scene2.classList.remove('hidden');
    startTimer(); // Start counting time
  }, 300);
});

// Prompt click
floatingPrompt.addEventListener('click', handleScroll);

// Touch swipe
let touchStartY = 0;
scene2.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

scene2.addEventListener('touchend', (e) => {
  const swipeDistance = touchStartY - e.changedTouches[0].screenY;
  if (swipeDistance > 40) {
    handleScroll();
  }
}, { passive: true });

// Mouse wheel
let wheelCooldown = false;
scene2.addEventListener('wheel', (e) => {
  if (wheelCooldown) return;
  wheelCooldown = true;
  setTimeout(() => wheelCooldown = false, 400);
  
  if (e.deltaY > 0) {
    handleScroll();
  }
}, { passive: true });

// Keyboard
document.addEventListener('keydown', (e) => {
  if (scene2.classList.contains('hidden')) return;
  
  if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    handleScroll();
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────────────────
function init() {
  const firstPost = fakePosts[0];
  postImage.src = firstPost.image;
  postCaption.textContent = firstPost.caption;
  promptText.textContent = getPromptText(0);
  tipText.textContent = getTipText(0);
}

document.addEventListener('DOMContentLoaded', init);


