let btn = document.querySelector(".btn_");
let img = document.querySelector(".imgg");

let titre_nom = document.querySelector(".titre_nom");

let pausMuse = document.querySelector(".pause_mus");
let playMuse = document.querySelector(".play_mus");

let source_audio = document.querySelector("audio");
let preced_mus = document.querySelector(".precedente_mus");
let retourMus = document.querySelector(".retour_zero");
let suivanteMus = document.querySelector(".suivante_mus");

let tempsCouru = document.querySelector(".tempsCouru");
let tempsTotal = document.querySelector(".tempsTotal");
let barreAudio = document.querySelector(".barreAudio");

const liste = [
  {
    src: "../audio/Soolking - Balader ft. Niska (Audio Officiel).mp4",
    nom: "Soolking feat Niska - Balader",
    img: "./image/balader.jpg",
  },
  {
    src: "../audio/Soolking - Suavemente [Clip Officiel].mp4",
    nom: "Soolking - Suavemente",
    img: "./image/suavemente.webp",
  },
  {
    src: "../audio/fendi.mp4",
    nom: "Ninho - Fendi",
    img: "./image/ni.jpg",
  },
];

/**
 *
 * @param {aller chercher la bonne musique dans tableau}
 */
function loadmusiq(liste) {
  source_audio.src = liste.src;
  img.style.backgroundImage = `url(../${liste.img})`;
  titre_nom.textContent = liste.nom;
}

//mettre la musique précédentes
let i = 0;

/**
 * lancer la musique précedentes
 */
function retourmusiq() {
  playMuse.style.display = "block";
  pausMuse.style.display = "none";
  i--;
  if (i < 0) {
    i = liste.length - 1;
  }

  loadmusiq(liste[i]);
  source_audio.play();
}

let parent_li = document.querySelector(".parent-li");
preced_mus.addEventListener("click", (e) => {
  // let liste_ms = document.querySelector("a.active");

  // if (liste_ms.previousElementSibling.classList.contains("playlist")) {
  //   parent_li.lastElementChild.classList.add("active");
  //   liste_ms.classList.remove("active");
  //   console.log("ligne 74");
  // }

  // else if (liste_ms.classList.contains("dern_mus")) {
  //   liste_ms.classList.remove("active");
  //   if (liste_ms.previousElementSibling.classList.contains("deux_mus")) {
  //     liste_ms.previousElementSibling.classList.add("active");
  //   }
  //   console.log("ligne 79");
  // } else {
  //   parent_li.firstElementChild.nextElementSibling.classList.add("active");
  //   liste_ms.classList.remove("active");
  //   console.log("ligne 85");
  // }
  retourmusiq();

});

/**
 * lancer la musique suivante
 */
function suivantemus() {
  source_audio.play();
  playMuse.style.display = "block";
  pausMuse.style.display = "none";
  i++;
  if (i > liste.length - 1) {
    i = 0;
  }
  loadmusiq(liste[i]);
  source_audio.play();
}

suivanteMus.addEventListener("click", (e) => {
  // let liste_ms = document.querySelector("a.active");

  // if (liste_ms.previousElementSibling.classList.contains("playlist")) {
  //   parent_li.lastElementChild.classList.add("active");
  //   liste_ms.classList.remove("active");
  //   console.log("ligne 74");
  // } else if (liste_ms.classList.contains("dern_mus")) {
  //   liste_ms.classList.remove("active");
  //   if (liste_ms.previousElementSibling.classList.contains("deux_mus")) {
  //     liste_ms.previousElementSibling.classList.add("active");
  //   }
  //   console.log("ligne 79");
  // } else {
  //   parent_li.firstElementChild.nextElementSibling.classList.add("active");
  //   liste_ms.classList.remove("active");
  //   console.log("ligne 85");
  // }
  suivantemus();
});

/**
 * lancer la musique
 */
pausMuse.addEventListener("click", (e) => {
  source_audio.play();
  playMuse.style.display = "block";
  pausMuse.style.display = "none";
  event.stopPropagation();
});

//stopper l'audio
playMuse.addEventListener("click", (e) => {
  playMuse.style.display = "none";
  pausMuse.style.display = "block";
  source_audio.pause();
});

//chaque clique sur la paylist
document.querySelectorAll(".music_li").forEach((element) => {
  element.addEventListener("click", (e) => {
    let music = liste[element.dataset.id];
    playMuse.style.display = "none";
    pausMuse.style.display = "block";
    loadmusiq(music);
  });
});

//bouton pour afficher le lecteur
btn.addEventListener("click", (e) => {
  img.style.display = "block";
  btn.style.display = "none";
  img.style.backgroundImage = "url(../image/sound-gf4dfccd31_1920.jpg)";
});

// temps de la musique et temps total
let interval = setInterval(timer, 1); //ou currentime//

/**
 * timer du temps acteuel et temps complet
 */
function timer() {
  barreAudio.value = source_audio.currentTime;
  barreAudio.max = source_audio.duration;

  let totalMinutes = Math.floor(source_audio.duration / 60);
  let totalSeconds = Math.floor(source_audio.duration % 60);
  let curenMinutes = Math.floor(source_audio.currentTime / 60);
  let curenSeconds = Math.floor(source_audio.currentTime % 60);

  totalMinutes = totalMinutes < 10 ? "0" + totalMinutes : totalMinutes;
  totalSeconds = totalSeconds < 10 ? "0" + totalSeconds : totalSeconds;

  tempsTotal.textContent = totalMinutes + ":" + totalSeconds;
  let tc = (tempsCouru.textContent = "0" + curenMinutes + ":" + curenSeconds);

  if (curenSeconds < 10) {
    tc = tempsCouru.textContent = "0" + curenMinutes + ":" + "0" + curenSeconds;
  }
}

barreAudio.addEventListener("input", function () {
  source_audio.currentTime = this.value;
});

let zero = document.querySelector(".retour_zero");
/**
 * mettre la musique a zéro.
 */
function retourZero() {
  if (source_audio.currentTime > 1) {
    source_audio.currentTime = 0;
  }
}
zero.addEventListener("click", (e) => {
  retourZero();
});

//reglage du son
let volum = document.querySelector(".vol");
volum.addEventListener("input", (e) => {
  source_audio.volume = volum.value / 100;

  if (source_audio.volume > 0 ) {
      croix.style.display = "none";

  }
  console.log(volum.value);
});

let svg_vol = document.querySelector(".volu");
let croix = document.querySelector(".croix");

svg_vol.addEventListener("click", (e) => {
  source_audio.volume = 0;
  croix.style.display = "block";
});

croix.addEventListener("click", (e) => {
  source_audio.volume = volum.value / 100;
  croix.style.display = "none";
});

//reste a chicker la bonne musique sur playlist quand on change barre pas du bon temps.
