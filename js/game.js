// ===========================================
// GAME
// LUCAS, O MESTRE DOS LANCHES DOS GAMES
// ===========================================

// CONFIGURAÇÕES
const CONFIG = {
    largura: 900,
    altura: 600,
    tempoInicial: 60,
    velocidadeLucas: 7,
    tamanhoItem: 60,
    velocidadeItem: 4,
    intervaloSpawn: 1000
};

// CANVAS
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ELEMENTOS HTML
const menu = document.getElementById("menu");
const hud = document.getElementById("hud");
const controls = document.getElementById("controls");
const gameOver = document.getElementById("gameOver");

const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");
const recordText = document.getElementById("record");
const finalScore = document.getElementById("finalScore");

const playButton = document.getElementById("playButton");
const restartButton = document.getElementById("restartButton");

// ===========================================
// GAME
// ===========================================
const Game = {
    running: false,
    score: 0,
    timer: CONFIG.tempoInicial,
    record: Number(localStorage.getItem("record")) || 0,
    items: [],
    lastSpawn: 0
};

recordText.textContent = Game.record;
scoreText.textContent = Game.score;
timerText.textContent = Game.timer;

// ===========================================
// INICIAR
// ===========================================
function startGame(){
    menu.style.display = "none";
    gameOver.style.display = "none";
    hud.style.display = "flex";
    controls.style.display = "flex";
    Game.running = true;
    Game.score = 0;
    Game.timer = CONFIG.tempoInicial;
    Game.items = [];
    Game.lastSpawn = 0;
    lendarios.Rocket = false;
    lendarios.Ayla = false;
    scoreText.textContent = Game.score;
    timerText.textContent = Game.timer;
}

// ===========================================
// GAME OVER
// ===========================================
function endGame(){
    Game.running = false;
    finalScore.textContent = Game.score;
    if(Game.score > Game.record){
        Game.record = Game.score;
        localStorage.setItem("record", Game.record);
        recordText.textContent = Game.record;
    }
    gameOver.style.display = "flex";
}

// ===========================================
// TIMER
// ===========================================
setInterval(()=>{
    if(!Game.running) return;
    Game.timer--;
    timerText.textContent = Game.timer;
    if(Game.timer <= 0){
        endGame();
    }
},1000);

// ===========================================
// BOTÕES
// ===========================================
playButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);