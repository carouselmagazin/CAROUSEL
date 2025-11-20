// Array of video sources in the order they should play (relative to this page)
const videoSources = [
  "IMG/CAROUSEL_THEME_1.mov",
  
];

const video = document.getElementById("bgVideo");
video.autoplay = true;
video.muted = true; // allow autoplay without user interaction
video.playsInline = true;

let currentIndex = 0;

const playVideoAt = (index) => {
  currentIndex = index % videoSources.length;
  video.src = videoSources[currentIndex];
  video.load();
  video.play().catch((err) => console.error("Video play failed:", err));
};

// Log load errors for easier debugging.
video.addEventListener("error", () => {
  console.error("Failed to load video source:", video.src, video.error);
});

// Start the first video.
playVideoAt(0);

// Move to the next in order when one ends.
video.addEventListener("ended", () => {
  playVideoAt(currentIndex + 1);
});

// Countdown for the open call launch.
const countdownEl = document.getElementById("countdown");
const openCallDate = new Date(2025, 11, 12, 0, 0, 0); // December is month 11 in JS.

const padTime = (value) => String(value).padStart(2, "0");

const renderCountdown = () => {
  if (!countdownEl) return;

  const now = new Date();
  const diffMs = openCallDate - now;

  if (diffMs <= 0) {
    countdownEl.textContent = "Open call now open";
    clearInterval(countdownTimer);
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownEl.textContent = `Open call opening in (${padTime(days)}d.${padTime(hours)}h.${padTime(minutes)}m.${padTime(seconds)}s)`;
};

const countdownTimer = setInterval(renderCountdown, 1000);
renderCountdown();
