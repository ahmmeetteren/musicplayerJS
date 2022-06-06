const container = document.querySelector(".container");
const image = document.querySelector("#music-img");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const progressBar = document.querySelector("#progress-bar");
const currentTime = document.querySelector("#current-time")

const player = new MusicPlayer(musicList);

window.addEventListener("load",() =>{
    let music = player.getMusic();
    displayMusic(music);
});

function displayMusic(music){
    title.innerText = music.title;
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () =>{
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => {
    prevMusic();
});

next.addEventListener("click", () => {
    nextMusic();
});
function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function prevMusic(){
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function pauseMusic(){
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play";
    audio.pause();
}
function playMusic(){
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";
    audio.play();
}

function calculateTime(totalTime){
    const dakika = Math.floor(totalTime / 60);
    const saniye = Math.floor(totalTime % 60);
    const guncellenenSaniye = totalTime < 10 ? `0${saniye}`: `${saniye}`;
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;
}

audio.addEventListener("loadedmetadata", () =>{
    duration.innerText = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () =>{
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.innerText = calculateTime(progressBar.value);
})
