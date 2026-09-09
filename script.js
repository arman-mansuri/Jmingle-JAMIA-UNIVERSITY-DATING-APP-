const video = document.getElementById("video");
const bgImage = document.querySelector(".bg-image");
const logo = document.querySelector(".logo");
const campusSection = document.querySelector(".campus-section");

video.pause();

// ===== Smooth scroll-driven scrubbing =====
// Instead of setting video.currentTime directly inside the "scroll" event
// (which fires in bursts and causes jerky seeking), we store the raw
// scroll progress as a target, and smoothly ease toward it every animation
// frame. This decouples rendering from scroll-event frequency and removes
// the jitter/stutter.
let targetProgress = 0;
let currentProgress = 0;
let totalFrames = 0;
let rafId = null;

// Detect low-power devices so we can reduce how often we ask the decoder
// to seek. Mobile SoCs choke on frequent full-frame decodes far more than
// desktop GPUs do, so we throttle seek frequency (not scroll responsiveness)
// on mobile.
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// How quickly the video "catches up" to your scroll position.
// Lower = smoother/more glide, higher = snappier/more 1:1 with scroll.
const SMOOTHING = 0.12;

// Minimum time (ms) between actual video.currentTime writes. 0 on desktop
// (every rAF frame is fine, ~60/sec). On mobile we cap this to roughly
// 24-30 seeks/sec so the decoder isn't asked to produce more frames per
// second than the device can realistically decode.
const SEEK_THROTTLE_MS = isMobile ? 35 : 0;
let lastSeekTime = 0;

video.addEventListener("loadedmetadata", () => {
    const fps = 50;
    totalFrames = Math.floor(video.duration * fps);
    document.body.style.height = `${totalFrames * 40}px`;

    window.addEventListener(
        "scroll",
        () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);

            if (rafId === null) {
                rafId = requestAnimationFrame(renderLoop);
            }
        },
        { passive: true }
    );

    // Kick off an initial render in case the page loads mid-scroll (refresh)
    rafId = requestAnimationFrame(renderLoop);
});

function renderLoop(now) {
    // Ease current progress toward target progress (lerp)
    currentProgress += (targetProgress - currentProgress) * SMOOTHING;

    const progress = currentProgress;

    // Video scrub — throttled on mobile so we don't overwhelm the decoder.
    // The visual easing above still runs every frame (60fps feel), only
    // the actual expensive video.currentTime write is rate-limited.
    const shouldSeek = !SEEK_THROTTLE_MS || !now || now - lastSeekTime >= SEEK_THROTTLE_MS;
    if (shouldSeek) {
        const frame = Math.floor(progress * totalFrames);
        const targetTime = frame / 50;
        if (Math.abs(video.currentTime - targetTime) > 1 / 100) {
            video.currentTime = targetTime;
            lastSeekTime = now || performance.now();
        }
    }

    // Image fade
    if (progress <= 0.20) {
        bgImage.style.opacity = 0.9 - (progress / 0.30);
        logo.style.opacity = 1;
    } else if (progress <= 0.85) {
        bgImage.style.opacity = 0;
        logo.style.opacity = 1 - ((progress - 0.65) / 0.35);
    } else {
        bgImage.style.opacity = 0;
        logo.style.opacity = 0;
    }

    // Show content
    if (progress >= 0.85) {
        const reveal = Math.min((progress - 0.85) / 0.15, 1);

        campusSection.style.opacity = reveal;
        campusSection.style.visibility = "visible";
        campusSection.style.pointerEvents = "auto";

        // About button: only once campus section has fully revealed
        // (i.e. right at the bottom of the scroll)
        if (reveal >= 1) {
            aboutBtn.classList.add('visible');
        } else {
            aboutBtn.classList.remove('visible');
        }

    } else {

        campusSection.style.opacity = 0;
        campusSection.style.visibility = "hidden";
        campusSection.style.pointerEvents = "none";

        aboutBtn.classList.remove('visible');

    }

    // Keep animating while there's a meaningful gap between target and
    // current progress. Once close enough, SNAP fully to the target
    // (important: without this, currentProgress asymptotically approaches
    // 1 but never quite reaches it, so "reveal >= 1" / the About button
    // would never trigger at the bottom of the scroll) and render one
    // final frame with the exact value before stopping the loop.
    if (Math.abs(targetProgress - currentProgress) > 0.0008) {
        rafId = requestAnimationFrame(renderLoop);
    } else {
        if (currentProgress !== targetProgress) {
            currentProgress = targetProgress;
            rafId = requestAnimationFrame(renderLoop);
        } else {
            rafId = null;
        }
    }
}

// Create profile button
const createProfileBtn = document.getElementById("createProfileBtn");
if (createProfileBtn) {
    createProfileBtn.addEventListener("click", () => {
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = "PROFILE.html";
        }, 500);
    });
}

// Optional street-view trigger (marryBtn is not always present in the DOM,
// so this is guarded to avoid breaking the rest of the script)
const marryBtn = document.getElementById("marryBtn");
if (marryBtn) {
    marryBtn.onclick = function () {
        document.getElementById("streetViewContainer").style.display = "block";
    };
}

// ===== About button + modal =====
const aboutBtn = document.getElementById('aboutBtn');
const aboutModal = document.getElementById('aboutModal');
const modalClose = document.getElementById('modalClose');

aboutBtn.addEventListener('click', () => {
    aboutModal.classList.add('active');
});

modalClose.addEventListener('click', () => {
    aboutModal.classList.remove('active');
});

aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) aboutModal.classList.remove('active');
});
