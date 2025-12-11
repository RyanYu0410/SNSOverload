/**
 * 再刷一条就睡 | ONE MORE SCROLL THEN SLEEP
 * NEEDY GIRL OVERDOSE style phone experience
 */

// ─────────────────────────────────────────────────────────────────────────────────
// FAKE POSTS
// ─────────────────────────────────────────────────────────────────────────────────
const fakePosts = [
  // Other images first
  { image: 'images/cat.png', caption: "meow~ stay up with me 🐱" },
  { image: 'images/cat2.png', caption: "even the cat is scrolling" },
  { image: 'images/coff.png', caption: "coffee keeps me alive ☕" },
  { image: 'images/Desk1.png', caption: "late night desk aesthetic 📚" },
  { image: 'images/dess.png', caption: "dessert heals everything 🍰" },
  { image: 'images/lib.png', caption: "the library lights still on" },
  { image: 'images/mat.png', caption: "a quiet little corner ✨" },
  { image: 'images/mirr.png', caption: "mirror me at midnight" },
  { image: 'images/nigh.png', caption: "the night is just right 🌙" },
  { image: 'images/sit.png', caption: "sitting and zoning out" },
  { image: 'images/street.png', caption: "midnight streets 💫" },
  { image: 'images/streets.png', caption: "the other side of the city" },
  { image: 'images/subway.png', caption: "last train home 🚇" },
  { image: 'images/table.png', caption: "tiny world on my table" },
  // feed images at the end
  { image: 'images/feed1.svg', caption: "today's vibe ✨" },
  { image: 'images/feed2.svg', caption: "the night matches my mood" },
  { image: 'images/feed3.svg', caption: "pretending to be productive" },
  { image: 'images/feed4.svg', caption: "3am thoughts 🌙" },
  { image: 'images/feed5.svg', caption: "one more... right?" },
  { image: 'images/feed6.svg', caption: "me @ my screen rn" },
  { image: 'images/feed7.svg', caption: "the algorithm knows me too well" },
  { image: 'images/feed8.svg', caption: "soft hours ☁️" },
  { image: 'images/feed9.svg', caption: "my bed is right there tho..." },
  { image: 'images/feed10.svg', caption: "this is definitely the last one" },
  { image: 'images/feed11.svg', caption: "sleep is just a concept 💫" },
  { image: 'images/feed12.svg', caption: "tomorrow me will deal with this" },
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
let isInApp = false;
let count = 0;
let currentPostIndex = 0;
let isAnimating = false;
const shownMessages = new Set();
let startTime = null;
let timerInterval = null;

// ─────────────────────────────────────────────────────────────────────────────────
// DOM ELEMENTS
// ─────────────────────────────────────────────────────────────────────────────────
const homeScreen = document.getElementById('homeScreen');
const appScreen = document.getElementById('appScreen');
const mainAppIcon = document.getElementById('mainAppIcon');
const backHomeBtn = document.getElementById('backHomeBtn');

const currentCard = document.getElementById('currentCard');
const postImage = document.getElementById('postImage');
const postCaption = document.getElementById('postCaption');
const floatingPrompt = document.getElementById('floatingPrompt');
const promptText = document.getElementById('promptText');
const tipText = document.getElementById('tipText');
const timeSpentEl = document.getElementById('timeSpent');
const appTimeEl = document.getElementById('appTime');
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

// All app icons (for the "fake app" clicks)
const allAppIcons = document.querySelectorAll('.app-icon, .dock-icon');

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
  const timeStr = formatTime(elapsed);
  timeSpentEl.textContent = timeStr;
  appTimeEl.textContent = timeStr;
}

// Start the timer
function startTimer() {
  if (!startTime) {
    startTime = Date.now();
  }
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000);
  }
  updateTimer();
}

// Pause the timer (but don't reset)
function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────────
// SCREEN TRANSITIONS
// ─────────────────────────────────────────────────────────────────────────────────
function launchApp() {
  if (isInApp || isAnimating) return;
  isAnimating = true;
  isInApp = true;
  
  // Fade out home screen
  homeScreen.classList.add('fade-out');
  
  setTimeout(() => {
    homeScreen.classList.add('hidden');
    homeScreen.classList.remove('fade-out');
    
    // Show app screen with launch animation
    appScreen.classList.remove('hidden');
    appScreen.classList.add('app-launching');
    
    // Start timer when entering app
    startTimer();
    
    setTimeout(() => {
      appScreen.classList.remove('app-launching');
      isAnimating = false;
    }, 500);
  }, 350);
}

function goBackHome() {
  if (!isInApp || isAnimating) return;
  isAnimating = true;
  isInApp = false;
  
  // Pause timer when leaving app
  pauseTimer();
  
  // Fade out app screen
  appScreen.classList.add('fade-out');
  
  setTimeout(() => {
    appScreen.classList.add('hidden');
    appScreen.classList.remove('fade-out');
    
    // Show home screen
    homeScreen.classList.remove('hidden');
    homeScreen.classList.add('fade-in');
    
    setTimeout(() => {
      homeScreen.classList.remove('fade-in');
      isAnimating = false;
    }, 400);
  }, 350);
}

// ─────────────────────────────────────────────────────────────────────────────────
// VISUAL EFFECTS
// ─────────────────────────────────────────────────────────────────────────────────
function updateBackground(count) {
  // Gradually darken and shift colors
  const pinkOpacity = Math.max(0.03, 0.1 - count * 0.002);
  const cyanOpacity = Math.max(0.02, 0.08 - count * 0.002);
  
  appScreen.style.background = `
    radial-gradient(ellipse at 30% 30%, rgba(255, 110, 180, ${pinkOpacity}) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 70%, rgba(0, 229, 255, ${cyanOpacity}) 0%, transparent 50%),
    linear-gradient(180deg, 
      rgb(${Math.max(15, 26 - count * 0.3)}, ${Math.max(8, 10 - count * 0.15)}, ${Math.max(35, 46 - count * 0.25)}) 0%, 
      rgb(${Math.max(8, 13 - count * 0.15)}, ${Math.max(5, 8 - count * 0.12)}, ${Math.max(18, 24 - count * 0.1)}) 100%)
  `;
}

function updateGlitchLevel(count) {
  appScreen.classList.remove('glitch-level-1', 'glitch-level-2', 'glitch-level-3');
  
  if (count >= 30) {
    appScreen.classList.add('glitch-level-3');
    glitchOverlay.style.opacity = '0.35';
    scanLines.style.opacity = '0.4';
    noiseOverlay.style.opacity = '0.12';
  } else if (count >= 20) {
    appScreen.classList.add('glitch-level-2');
    glitchOverlay.style.opacity = '0.2';
    scanLines.style.opacity = '0.25';
    noiseOverlay.style.opacity = '0.06';
  } else if (count >= 10) {
    appScreen.classList.add('glitch-level-1');
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
  if (count < 3) {
    vignetteOverlay.style.opacity = '0';
  } else {
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
  
  const [horizontal, vertical] = position.split(' ');
  msg.classList.add(`msg-${horizontal}`);
  msg.classList.add(`msg-${vertical}`);
  
  msg.textContent = text;
  floatingMessagesContainer.appendChild(msg);
  
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
  
  appScreen.classList.add('hidden');
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
  if (isAnimating || !isInApp) return;
  
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
// FAKE APP CLICK FEEDBACK
// ─────────────────────────────────────────────────────────────────────────────────
function handleFakeAppClick(e) {
  const appName = e.currentTarget.dataset.app;
  
  // If it's the main app, launch it
  if (appName === 'scroll') {
    launchApp();
    return;
  }
  
  // For other apps, just show a brief feedback
  const icon = e.currentTarget;
  icon.style.transform = 'scale(0.9)';
  setTimeout(() => {
    icon.style.transform = '';
  }, 150);
}

// ─────────────────────────────────────────────────────────────────────────────────
// EVENT LISTENERS
// ─────────────────────────────────────────────────────────────────────────────────

// App icon clicks
allAppIcons.forEach(icon => {
  icon.addEventListener('click', handleFakeAppClick);
});

// Back to home
backHomeBtn.addEventListener('click', goBackHome);

// Prompt click (scroll)
floatingPrompt.addEventListener('click', handleScroll);

// Touch swipe
let touchStartY = 0;
appScreen.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

appScreen.addEventListener('touchend', (e) => {
  const swipeDistance = touchStartY - e.changedTouches[0].screenY;
  if (swipeDistance > 40) {
    handleScroll();
  }
}, { passive: true });

// Mouse wheel
let wheelCooldown = false;
appScreen.addEventListener('wheel', (e) => {
  if (wheelCooldown) return;
  wheelCooldown = true;
  setTimeout(() => wheelCooldown = false, 400);
  
  if (e.deltaY > 0) {
    handleScroll();
  }
}, { passive: true });

// Keyboard
document.addEventListener('keydown', (e) => {
  if (!isInApp) return;
  
  if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    handleScroll();
  }
  
  // Escape to go back home
  if (e.key === 'Escape') {
    goBackHome();
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// CLOCK UPDATE (for home screen status bar)
// ─────────────────────────────────────────────────────────────────────────────────
function updateStatusBarTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeEl = document.querySelector('.status-time');
  if (timeEl) {
    timeEl.textContent = `${hours}:${minutes}`;
  }
}

// Update time every minute
setInterval(updateStatusBarTime, 60000);

// ─────────────────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────────────────
function init() {
  const firstPost = fakePosts[0];
  postImage.src = firstPost.image;
  postCaption.textContent = firstPost.caption;
  promptText.textContent = getPromptText(0);
  tipText.textContent = getTipText(0);
  
  // Set initial clock
  updateStatusBarTime();
}

document.addEventListener('DOMContentLoaded', init);
