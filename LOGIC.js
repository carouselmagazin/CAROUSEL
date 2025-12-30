// Countdown for the open call launch.
const countdownTargets = [
  document.getElementById("countdown"),
  document.getElementById("call-overlay-countdown"),
].filter(Boolean);
const openCallDate = new Date(2025, 11, 12, 0, 0, 0); // December is month 11 in JS.
let countdownTimer;

const padTime = (value) => String(value).padStart(2, "0");

const setCountdownContent = (content) => {
  countdownTargets.forEach((target) => {
    target.innerHTML = content;
  });
};

const renderCountdown = () => {
  if (!countdownTargets.length) return;
  const now = new Date();
  const diffMs = openCallDate - now;

  if (diffMs <= 0) {
    setCountdownContent("Call for entries now open");
    if (countdownTimer) clearInterval(countdownTimer);
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  setCountdownContent(
    `CALL FOR ENTRIES OPENING<br>(${padTime(days)}d.${padTime(hours)}h.${padTime(minutes)}m.${padTime(seconds)}s)`
  );
};

if (countdownTargets.length) {
  countdownTimer = setInterval(renderCountdown, 1000);
  renderCountdown();
}

// Overlay handling for nav buttons.
const overlays = Array.from(document.querySelectorAll(".overlay"));
const navButtons = document.querySelectorAll(".nav-button[data-overlay]");

const closeAllOverlays = () => {
  overlays.forEach((overlay) => {
    overlay.classList.remove("is-visible");
    overlay.setAttribute("aria-hidden", "true");
  });
  navButtons.forEach((btn) => btn.classList.remove("is-active"));
  document.body.classList.remove("overlay-open");
};

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-overlay");
    const targetOverlay = document.getElementById(targetId);
    if (!targetOverlay) return;
    closeAllOverlays();
    targetOverlay.classList.add("is-visible");
    targetOverlay.setAttribute("aria-hidden", "false");
    navButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");
    document.body.classList.add("overlay-open");
  });
});

overlays.forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    const isBackdrop = event.target.classList.contains("overlay__backdrop");
    const isClose = event.target.hasAttribute("data-overlay-close");
    if (isBackdrop || isClose) {
      closeAllOverlays();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllOverlays();
  }
});

const isOverlayOpen = () =>
  overlays.some((overlay) => overlay.classList.contains("is-visible"));

// Close overlays when clicking anywhere outside nav buttons and the overlay panels.
document.addEventListener("click", (event) => {
  if (!isOverlayOpen()) return;

  const clickedNavButton = event.target.closest(".nav-button");

  // Keep nav buttons opening/closing behavior intact; everything else closes overlays.
  if (clickedNavButton) return;

  closeAllOverlays();
});
