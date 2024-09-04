document.addEventListener("DOMContentLoaded", function() {
    const unlockBtn = document.getElementById("unlock-btn");
    const pinInput = document.getElementById("pin-input");
    const content = document.getElementById("content");
    const lockScreen = document.getElementById("lock-screen");
    const kinnaSonaAudio = new Audio('kinna_sona.mp3');
    kinnaSonaAudio.loop = true;

    unlockBtn.addEventListener("click", function() {
        const pin = pinInput.value;
        if (pin === "2882024") {  // Replace with the desired PIN
            lockScreen.style.display = "none";
            content.style.display = "block";
            kinnaSonaAudio.play(); // Play the kinna sona song only if PIN is correct
        } else {
            alert("Incorrect Pin");
        }
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoad = (target) => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        }, options);

        observer.observe(target);
    };

    lazyImages.forEach(lazyLoad);

    const lazyVideos = document.querySelectorAll('video[data-src]');
    lazyVideos.forEach((video) => {
        video.src = video.dataset.src;
    });

    const letter = document.getElementById("letter");
    const letterContent = document.getElementById("letter-content");
    const letterAudio = document.getElementById("letter-audio");

    letter.addEventListener("click", function() {
        letter.classList.toggle("opened");
        if (letter.classList.contains("opened")) {
            letterAudio.play();
            kinnaSonaAudio.pause(); // Pause kinna sona when another audio is played
        } else {
            letterAudio.pause();
            letterAudio.currentTime = 0; // Reset audio
            if (!kinnaSonaAudio.paused) {
                kinnaSonaAudio.play(); // Resume kinna sona when no other audio is playing
            }
        }
    });

    document.addEventListener("click", function(e) {
        if (!letter.contains(e.target)) {
            letter.classList.remove("opened");
            letterAudio.pause();
            letterAudio.currentTime = 0; // Reset audio
            if (!kinnaSonaAudio.paused) {
                kinnaSonaAudio.play(); // Resume kinna sona when no other audio is playing
            }
        }
    });

    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
        video.addEventListener('play', () => {
            kinnaSonaAudio.pause(); // Pause kinna sona when a video is playing
        });
        video.addEventListener('pause', () => {
            if ([...videos].every(v => v.paused)) {
                kinnaSonaAudio.play(); // Resume kinna sona when no video is playing
            }
        });
    });

    // Handle audio play/pause
    const audios = document.querySelectorAll('audio');
    audios.forEach((audio) => {
        audio.addEventListener('play', () => {
            kinnaSonaAudio.pause(); // Pause kinna sona when another audio is playing
        });
        audio.addEventListener('pause', () => {
            if ([...audios].every(a => a.paused)) {
                kinnaSonaAudio.play(); // Resume kinna sona when no audio is playing
            }
        });
    });
});
