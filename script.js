// script.js

const affirmations = [
  "You are enough. 🌟",
  "Be kind to yourself. 💖",
  "Take it one step at a time. 🐢",
  "You are growing every day. 🌱",
  "Breathe deeply, you are safe. 🌿",
  "You radiate positive energy. ✨"
];

function newAffirmation() {
  const random = Math.floor(Math.random() * affirmations.length);
  document.getElementById('affirmation').innerText = affirmations[random];
}

// Mood functions
function saveMood(mood) {
  localStorage.setItem('lastMood', mood);
  document.getElementById('lastMood').innerText = mood;
}

// Load last mood on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedMood = localStorage.getItem('lastMood');
  if (savedMood) {
    document.getElementById('lastMood').innerText = savedMood;
  }
  const savedJournal = localStorage.getItem('journal');
  if (savedJournal) {
    document.getElementById('journal').value = savedJournal;
  }
});

// Save journal entry
function saveJournal() {
  const journalText = document.getElementById('journal').value;
  localStorage.setItem('journal', journalText);
}

// Play / Pause forest sound
function toggleSound() {
  const sound = document.getElementById('forestSound');
  if (sound.paused) {
    sound.play();
  } else {
    sound.pause();
  }
}
