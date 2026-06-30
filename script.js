const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const hud = document.getElementById("hud");
const gameOver = document.getElementById("gameOver");
const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");
const finalScore = document.getElementById("finalScore");
let record = localStorage.getItem("record") || 0;
document.getElementById("record").innerText = record;

let score = 0;
let timer = 60;
let running = false;

const player = {
    x: 400,
    y: 520,
    w: 70,
    h: 70,
    speed: 7
};

let left = false;
let right = false;

function start() {
    menu.style.display = "none";
    hud.style.display = "flex";
    controls.style.display = "flex";
    running = true;
    loop();
}

playButton.onclick = start;

function restart() {
    location.reload();
}

left.onmousedown = () => left = true;
left.onmouseup = () => left = false;
right.onmousedown = () => right = true;
right.onmouseup = () => right = false;
left.ontouchstart = () => left = true;
left.ontouchend = () => left = false;
right.ontouchstart = () => right = true;
right.ontouchend = () => right = false;

document.addEventListener("keydown", e => {
    if (e.key == "ArrowLeft" || e.key == "a") left = true;
    if (e.key == "ArrowRight" || e.key == "d") right = true;
});

document.addEventListener("keyup", e => {
    if (e.key == "ArrowLeft" || e.key == "a") left = false;
    if (e.key == "ArrowRight" || e.key == "d") right = false;
});

setInterval(() => {
    if (!running) return;
    timer--;
    timerText.innerText = timer;
    if (timer <= 0) {
        running = false;
        gameOver.style.display = "flex";
        finalScore.innerText = score;
        if (score > record) {
            localStorage.setItem("record", score);
        }
    }
}, 1000);

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function update() {
    if (left) player.x -= player.speed;
    if (right) player.x += player.speed;
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.w)
        player.x = canvas.width - player.w;
}

function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, 900, 600);
    update();
    drawPlayer();
    requestAnimationFrame(loop);
}