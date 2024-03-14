// const jsmediatags = require("jsmediatags");
const MAIN = document.getElementById("Main");
const CONTAINER = document.getElementById("container");
const SONGPLAYAREA = document.getElementById("SongPlayArea");
const SONGLIST = document.getElementById("songlist");
const SONGNAME = document.getElementById("songName");
const PREV = document.getElementById("prev");
const NEXT = document.getElementById("next");
const PLAYPAUSE = document.getElementById("playpause");
const CURRENTTIME = document.getElementById("time");
const RANGE = document.getElementById("range").firstElementChild;

let index = 0;
let interval;

const ARRAYOFSONGS = [
    {
        "Name": "Asal Mein - Darshan Raval",
        "Img": "Images/Asal Mein.jpg",
        "Audio": new Audio("Songs/Asal Mein - Darshan Raval.mp3")
    },
    {
        "Name": "Baarish - Half Girlfriend (Atif Aslam)",
        "Img": "Images/baarish.jpg",
        "Audio": new Audio("Songs/Baarish - Half Girlfriend (Atif Aslam) 320Kbps.mp3")
    },
    {
        "Name": "Bekhayali - Kabir Singh",
        "Img": "Images/bekhayali.jpg",
        "Audio": new Audio("Songs/Bekhayali - Kabir Singh.mp3")
    },
    {
        "Name": "Baarish Lete Aana - Darshan Raval",
        "Img": "Images/baarish lete aana.jpg",
        "Audio": new Audio("Songs/Baarish Lete Aana - Darshan Raval.mp3")
    },
    {
        "Name": "Bekhudi - Teraa Surroor (Darshan Raval)",
        "Img": "Images/bekhudi.jpg",
        "Audio": new Audio("Songs/Bekhudi - Teraa Surroor (Darshan Raval) 190Kbps.mp3")
    },
    {
        "Name": "Bhula Dunga - Darshan Raval",
        "Img": "Images/bhula dunga.jpg",
        "Audio": new Audio("Songs/Bhula Dunga - Darshan Raval.mp3")
    },
    {
        "Name": "Dekha Hazaro Dafaa - Rustom (Arijit Singh)",
        "Img": "Images/dekha hazaro dafaa.jpg",
        "Audio": new Audio("Songs/Dekha Hazaro Dafaa - Rustom (Arijit Singh) 190Kbps.mp3")
    },
    {
        "Name": "Dhadak - Title Song",
        "Img": "Images/dhadak.jpg",
        "Audio": new Audio("Songs/Dhadak - Title Song.mp3")
    },
    {
        "Name": "Dilbara - Pati Patni Aur Woh",
        "Img": "Images/dilbara.jpg",
        "Audio": new Audio("Songs/Dilbara - Pati Patni Aur Woh.mp3")
    },
    {
        "Name": "Heeriye",
        "Img": "Images/Heeriye.jpg",
        "Audio": new Audio("Songs/Heeriye.mp3")
    }
];

const convertTime = (time) => {
    let mins = Math.floor(time / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }
    let secs = Math.floor(time % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    return mins + ':' + secs;
};

function LOADSONGS() {
    SONGLIST.innerHTML = "";
    ARRAYOFSONGS.forEach((Elm) => {
        SONGLIST.innerHTML += `
        <div class="songitem">
            <div>
                <img src="${Elm.Img}" alt="Unknown">
                <!-- <div id="Equilizer">
                    <div id="bar1"></div>
                    <div id="bar2"></div>
                    <div id="bar3"></div>
                </div>  -->
            </div>
            <div>
                <h3>${Elm.Name}</h3>
            </div>
            <div>${Elm.Audio.duration ? convertTime(Elm.Audio.duration) : "00:00"} 
                <span><i class="fa-solid fa-play"></i></span>
            </div>
        </div>
    `

    });
};


function AudioDuration() {
    let Duration = ARRAYOFSONGS[index].Audio.duration;
    CURRENTTIME.lastElementChild.innerHTML = convertTime(Duration);
    let CurrentTime = ARRAYOFSONGS[index].Audio.currentTime;
    CURRENTTIME.firstElementChild.innerHTML = convertTime(CurrentTime);
    RANGE.value = CurrentTime / Duration * 100;
    clearInterval(interval);

    if (PLAYPAUSE.querySelector(".fa-pause")) {

        interval = setInterval(() => {
            let CURRENTtime = ARRAYOFSONGS[index].Audio.currentTime;
            CURRENTTIME.firstElementChild.innerHTML = convertTime(CURRENTtime);
            RANGE.value = CURRENTtime / Duration * 100;
            if (CURRENTtime == Duration) {
                NEXT.click();
            }
        }, 1000);

    }
    else {
        clearInterval(interval);
    }

    SONGNAME.innerHTML = `
             <div>
                 <h4>${ARRAYOFSONGS[index].Name}</h4>
             </div>
             <div><img src="${ARRAYOFSONGS[index].Img}" alt=""></div> 
        `
};

function StylingAnimation() {
    if (document.getElementById("Equilizer")) {
        let Equilizer = document.getElementById("Equilizer");
        Equilizer.remove();
    }
    let songitem = document.getElementsByClassName("songitem");
    let html = `<div id="Equilizer">
                    <div id="bar1"></div>
                    <div id="bar2"></div>
                    <div id="bar3"></div>
                </div>`;

    Array.from(songitem).forEach((element) => {
        element.lastElementChild.firstElementChild.innerHTML = `<i class="fa-solid fa-play"></i>`;
        element.style.background = "beige";
    });

    songitem[index].style.background = "rgb(200, 238, 250)";

    if (PLAYPAUSE.querySelector(".fa-pause")) {
        songitem[index].firstElementChild.insertAdjacentHTML("beforeend", html);

        songitem[index].lastElementChild.firstElementChild.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    }
};

function PlayOnClick() {
    const SONGITEM = document.querySelectorAll(".songitem");

    SONGITEM.forEach((elm) => {
        elm.addEventListener("click", (e) => {
            let clickedelement = e.target.closest(".songitem").children[1].firstElementChild.innerHTML;
            ARRAYOFSONGS.map((e, i, a) => {
                if (e.Name === clickedelement) {
                    if (index == i) {
                        PLAYPAUSE.click();
                    } else {
                        ARRAYOFSONGS[index].Audio.currentTime = 0;
                        ARRAYOFSONGS[index].Audio.pause();
                        index = i;
                        PLAYPAUSE.innerHTML = `<i class="fa-solid fa-play"></i>`;
                        PLAYPAUSE.click();
                    }
                }
            })
        })
    })
};

function PrevNext(minmax) {
    if (minmax == 0 ? index > minmax : index < minmax) {
        ARRAYOFSONGS[index].Audio.currentTime = 0;
        ARRAYOFSONGS[index].Audio.pause();
        if (minmax == 0) {
            index--;
        }
        else {
            index++;
        }
        if (PLAYPAUSE.querySelector(".fa-pause")) {
            ARRAYOFSONGS[index].Audio.play();
        }
        AudioDuration();
        StylingAnimation();
    }
}

PLAYPAUSE.addEventListener("click", () => {
    if (PLAYPAUSE.querySelector(".fa-play")) {
        PLAYPAUSE.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        PLAYPAUSE.style.paddingLeft = "0px";
        ARRAYOFSONGS[index].Audio.play();
    } else {
        PLAYPAUSE.innerHTML = `<i class="fa-solid fa-play"></i>`;
        PLAYPAUSE.style.paddingLeft = "5px";
        ARRAYOFSONGS[index].Audio.pause();
    }
    AudioDuration();
    StylingAnimation();
});

PREV.addEventListener("click", () => { PrevNext(0); });

NEXT.addEventListener("click", () => { PrevNext(ARRAYOFSONGS.length - 1); });

RANGE.addEventListener("change", () => {
    let Duration = ARRAYOFSONGS[index].Audio.duration;
    ARRAYOFSONGS[index].Audio.currentTime = (RANGE.value * Duration) / 100;
    let CurrentTime = ARRAYOFSONGS[index].Audio.currentTime;
    CURRENTTIME.firstElementChild.innerHTML = convertTime(CurrentTime);
});

window.addEventListener("load", () => { LOADSONGS(); AudioDuration(); PlayOnClick(); });


const audioInput = document.getElementById('audioInput');

audioInput.addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) {
        const audio = new Audio(URL.createObjectURL(e.target.files[0]));

        jsmediatags.read(e.target.files[0], {
            onSuccess: function (tag) {
                const image = tag.tags.picture;

                if (image) {
                    let base64String;
                    try {
                        base64String = "data:image/jpeg;base64," + btoa(String.fromCharCode(...image.data));
                    } catch (error) {
                        base64String = false
                    }
                    let newlength = ARRAYOFSONGS.push({
                        "Name": tag.tags.title,
                        "Img": base64String ? base64String : "Images/Not Found.webp",
                        "Audio": audio
                    });
                    index = newlength - 1;
                    setTimeout(() => {
                        LOADSONGS();
                        SONGLIST.scrollTop = SONGLIST.scrollHeight - SONGLIST.clientHeight;
                    }, 10)
                    setTimeout(() => {
                        AudioDuration();
                        PlayOnClick();
                    }, 100)
                } else {
                    console.log('No image found in the metadata.');
                }
            },
            onError: function (error) {
                console.log('Error reading tags:', error.type, error.info);
            }
        });
    }
});
