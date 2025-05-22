console.log("Welcome to Spotify Clone!");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('Song/Ik Kudi.mp3');
let masterPlay = document.getElementById('MasterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Ik kudi", filePath: "Song/Ik Kudi.mp3", coverPath: "Images/ik kudi.jpg" },
    { songName: "Hua Main", filePath: "Song/ANIMAL HUA MAIN.mp3", coverPath: "Images/hua main.jpg" },
    { songName: "Admiring you", filePath: "Song/Admirin’ You.mp3", coverPath: "Images/Admiring you.jpg" },
    { songName: "Shillong", filePath: "Song/Shillong.mp3", coverPath: "Images/shillong.jpg" },
    { songName: "Ishq wala love", filePath: "Song/Ishq Wala Love.mp3", coverPath: "Images/ishq wala love.jpg" },
    { songName: "Mrignaini", filePath: "Song/Mrignaini.mp3", coverPath: "Images/mrignaini.jpg" },
    { songName: "Samjho Na", filePath: "Song/SAMJHO NA ( NASAMAJH ).mp3", coverPath: "Images/samjho na.jpg" },
];

// Set song cover and title for each song item
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("SongTitle")[0].innerText = songs[i].songName;
});

// Master Play/Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
});

// Progress Bar Update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek to position
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play buttons to play icon
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Individual song play buttons
Array.from(document.getElementsByClassName('songitemplay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays(); // reset others
        songIndex = i;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});
// Next and Previous Buttons
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // loop back to first song
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    updatePlayUI();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // loop to last song if at beginning
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    updatePlayUI();
});

// Update UI play/pause icons
function updatePlayUI() {
    makeAllPlays();
    let currentIcon = document.getElementsByClassName('songitemplay')[songIndex];
    if (currentIcon) {
        currentIcon.classList.remove('fa-play-circle');
        currentIcon.classList.add('fa-pause-circle');
    }
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}
