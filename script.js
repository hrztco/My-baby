/* =========================================================
   EDIT THIS SECTION ONLY
   ========================================================= */

const CONFIG = {
  // Your letter. Use \n for a new line.
  letter:
`I know I don't always say it perfectly,
Happy 3rd motmot baby :> We've gone so far na yk? I just wanna tell you how I appreciate you and your ain in this world. I may sound corny.. but I really, really, really love you for all the things you’ve done for me

You are one of the hardest prayers I asked from God, and he really blessed me with such a beautiful girl like you:> I don’t just wish for us to last, but I pray for it. The warmth you provide, the happiness, everything. You're very worth every risk 

The love we hold today only grows stronger through the years. And every sunset reminds me of you, why we began, bubby, if forever truly exists. I love you, baby. Happy 3rd motmot.

I just love you so darn much, yk? Oh, if you could understand the times where i was so so so in love with you and how everything reminds me of you. 

You’re always gonna be loved by me, even on the days where you feel hard to love. Because for me, noh? You've always been so worth it, Chiyemi. In every version of who you are

I love you baby, for trying new things with me, for accepting me and for understanding me. Oh, the days i used to pray for a woman like you. To my first and hopefully my last, don't forget that I'm always praying for us until both of us succeed. 

I can't help but reflect on all the wonderful moments we had together. Our first kiss, our first date, our first everything will always have a special place in my heart. I love you so much, babi my biggest gift, my best friend, my girlfriend, and my future loving wife. 

Happy 3rd monthsary, my love. I love you so frickin much!!! I made this to dedicate my love for you, baby. It took a lotta time and effort and nearly zero coding experience… but for you I'd do anything. I love you, Chiyemi :) 


 ♡`,

  finalCaption: "Happy monthsary, my love.",

  // Replace these filenames with your own photos.
  // Put the actual files in: assets/photos/
  photos: [
    { file: "p1.PNG", caption: "our little moments", x: 7,  y: 8,  r: -7 },
    { file: "p2.PNG", caption: "you & me",          x: 31, y: 2,  r: 5 },
    { file: "p3.PNG", caption: "my favorite person", x: 57, y: 10, r: -4 },
    { file: "p4.PNG", caption: "always ♡",           x: 78, y: 5,  r: 8 },
    { file: "p5.PNG", caption: "memory",             x: 12, y: 42, r: 5 },
    { file: "p6.PNG", caption: "with you",           x: 39, y: 36, r: -6 },
    { file: "p7.PNG", caption: "love you",           x: 67, y: 43, r: 6 },
    { file: "p8.PNG", caption: "forever",            x: 82, y: 34, r: -5 }
  ],

  // Final image. It can be one of the same photos.
  finalPhoto: "Final.gif",

  // Animation controls.
  // Increase/decrease these to change the pacing.
  photoStagger: 170,
  typewriterSpeed: 24,
  transitionSpeed: 900
};

/* =========================================================
   APP CODE
   ========================================================= */

const $ = (selector) => document.querySelector(selector);

const scenes = {
  intro: $("#intro"),
  flower: $("#flowerScene"),
  letter: $("#letterScene"),
  wall: $("#wallScene"),
  final: $("#finalScene")
};

let currentScene = "intro";
let typeTimer = null;
let musicStarted = false;

document.documentElement.style.setProperty(
  "--scene-speed",
  `${CONFIG.transitionSpeed}ms`
);

function showScene(name) {
  Object.entries(scenes).forEach(([key, scene]) => {
    scene.classList.toggle("active", key === name);
  });

  currentScene = name;

  // Reset scroll when returning to the photo wall.
  if (name === "wall") {
    $("#wallScene").scrollTop = 0;
    revealPhotos();
  }

  if (name === "letter") {
    startTypewriter();
  }
}

function startTypewriter() {
  clearInterval(typeTimer);

  const target = $("#letterText");
  target.textContent = "";

  let i = 0;

  typeTimer = setInterval(() => {
    target.textContent += CONFIG.letter[i] ?? "";
    i++;

    if (i >= CONFIG.letter.length) {
      clearInterval(typeTimer);
    }
  }, CONFIG.typewriterSpeed);
}

function createPhotoWall() {
  const wall = $("#photoWall");
  wall.innerHTML = "";

  CONFIG.photos.forEach((photo, index) => {
    const figure = document.createElement("figure");
    figure.className = "polaroid";
    figure.style.left = `${photo.x}%`;
    figure.style.top = `${photo.y}%`;
    figure.style.setProperty("--rotation", `${photo.r}deg`);
    figure.style.transitionDelay = `${index * CONFIG.photoStagger}ms`;

    const img = document.createElement("img");
    img.src = `assets/photos/${photo.file}`;
    img.alt = photo.caption || `Memory ${index + 1}`;
    img.loading = index < 3 ? "eager" : "lazy";

    // If a user hasn't added a photo yet, show a clean placeholder
    // instead of breaking the layout.
    img.addEventListener("error", () => {
      img.src = makePlaceholder(photo.caption || "Add your photo");
    }, { once: true });

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption || "";

    figure.append(img, caption);
    wall.appendChild(figure);

    // Small click interaction: bring the photo forward.
    figure.addEventListener("click", () => {
      document.querySelectorAll(".polaroid").forEach(p => p.style.zIndex = "");
      figure.style.zIndex = "40";
    });
  });
}

function revealPhotos() {
  const photos = [...document.querySelectorAll(".polaroid")];

  // Remove show first so replaying the scene always animates.
  photos.forEach(photo => photo.classList.remove("show"));

  requestAnimationFrame(() => {
    photos.forEach((photo, index) => {
      setTimeout(() => photo.classList.add("show"), index * CONFIG.photoStagger);
    });
  });
}

function makePlaceholder(text) {
  // SVG data URL means missing files don't cause broken-image icons.
  const safe = String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="900">
      <rect width="100%" height="100%" fill="#cfc7b8"/>
      <text x="50%" y="48%" text-anchor="middle"
            font-family="Georgia,serif" font-size="38" fill="#51493d">
        ${safe}
      </text>
      <text x="50%" y="54%" text-anchor="middle"
            font-family="Arial,sans-serif" font-size="22" fill="#70685b">
        add your photo here
      </text>
    </svg>
  `);
}

function setupMusic() {
  const audio = $("#bgMusic");
  const button = $("#musicButton");
  const status = $("#musicStatus");

  async function toggleMusic() {
    try {
      if (audio.paused) {
        await audio.play();
        musicStarted = true;
        button.classList.add("playing");
        status.textContent = "music on";
      } else {
        audio.pause();
        button.classList.remove("playing");
        status.textContent = "music off";
      }
    } catch (error) {
      // Browsers block autoplay until the user interacts.
      // The button itself is a user interaction, so this is mostly
      // a safety fallback for missing/unsupported audio files.
      status.textContent = "add music";
      console.warn("Music could not start:", error);
    }
  }

  button.addEventListener("click", toggleMusic);

  // Try starting after the first intentional click.
  $("#startButton").addEventListener("click", async () => {
    if (!musicStarted) {
      try {
        await audio.play();
        musicStarted = true;
        button.classList.add("playing");
        status.textContent = "music on";
      } catch (_) {
        status.textContent = "music off";
      }
    }
  });
}

function resetExperience() {
  clearInterval(typeTimer);

  // Remove photo animation state so it can play again.
  document.querySelectorAll(".polaroid").forEach(photo => {
    photo.classList.remove("show");
  });

  $("#finalPhoto").src = `assets/photos/${CONFIG.finalPhoto}`;
  showScene("intro");
}

$("#startButton").addEventListener("click", () => {
  showScene("flower");
});

$("#bouquetButton").addEventListener("click", () => {
  showScene("letter");
});

$("#letterNext").addEventListener("click", () => {
  showScene("wall");
});

$("#wallNext").addEventListener("click", () => {
  showScene("final");
});

$("#replayButton").addEventListener("click", resetExperience);

// Configure final image.
$("#finalPhoto").src = `assets/photos/${CONFIG.finalPhoto}`;
$("#finalCaption").textContent = CONFIG.finalCaption;

createPhotoWall();
setupMusic();

/*
  OPTIONAL: keyboard navigation.
  This prevents the experience from getting "stuck" if a user
  cannot click the tiny buttons.
*/
document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== "ArrowRight" && event.key !== " ") return;

  if (currentScene === "intro") showScene("flower");
  else if (currentScene === "flower") showScene("letter");
  else if (currentScene === "letter") showScene("wall");
  else if (currentScene === "wall") showScene("final");
});
