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
