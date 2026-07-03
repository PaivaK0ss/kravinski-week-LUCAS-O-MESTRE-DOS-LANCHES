// ===========================================
// GAME
// LUCAS, O MESTRE DOS LANCHES DOS GAMES
// ===========================================

// CANVAS
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Tamanho lógico do jogo
canvas.width = CONFIG.largura;
canvas.height = CONFIG.altura;

// ELEMENTOS HTML
const menu = document.getElementById("menu");
const hud = document.getElementById("hud");
const controls = document.getElementById("controls");
const gameOver = document.getElementById("gameOver");
const tutorial = document.getElementById("tutorial");
const play = document.getElementById("play");

const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");
const recordText = document.getElementById("record");
const finalScore = document.getElementById("finalScore");

const playButton = document.getElementById("playButton");
const restartButton = document.getElementById("restartButton");
const pausar = document.getElementById("pausar");
const pauseImg = document.getElementById("pauseImg");

const hamburguerScore = document.getElementById("hamburguerScore");
const milkshakeScore = document.getElementById("milkshakeScore");
const hotdogScore = document.getElementById("hotdogScore");
const aylaScore = document.getElementById("aylaScore");
const rocketScore = document.getElementById("rocketScore");
const ninaScore = document.getElementById("ninaScore");

// ===========================================
// GAME
// ===========================================
const Game = {
    running: false,
    score: 0,
    hamburguerScore: 0,
    milkshakeScore: 0,
    hotdogScore: 0,
    ninaScore: 0,
    timer: CONFIG.tempoInicial,
    record: Number(localStorage.getItem("record")) || 0,
    items: [],
    explosions: [],
    lastSpawn: 0,
    gameOver: false
};

recordText.textContent = Game.record;
scoreText.textContent = Game.score;
timerText.textContent = Game.timer;

// ===========================================
// TUTORIAL
// ===========================================
function startTtutorial(){
    tutorial.style.display = "flex";
}

// ===========================================
// INICIAR
// ===========================================
function startGame(){
    tutorial.style.display = "none";
    menu.style.display = "none";
    gameOver.style.display = "none";
    hud.style.display = "flex";
    controls.style.display = "flex";
    Game.running = true;
    Game.score = 0;
    Game.hamburguerScore = 0;
    Game.milkshakeScore = 0;
    Game.hotdogScore = 0;
    Game.ninaScore = 0;
    Game.timer = CONFIG.tempoInicial;
    Game.items = [];
    Game.lastSpawn = 0;
    lendarios.Rocket = false;
    lendarios.Ayla = false;
    scoreText.textContent = Game.score;
    timerText.textContent = Game.timer;
    Game.gameOver = false;
}

// ===========================================
// PAUSAR
// ===========================================
function pauseGame(){
    if(Game.gameOver == false){
        if(Game.running){
            Game.running = false;
            pauseImg.src = "assets/imagens/play.png"
        } else {
            Game.running = true;
            pauseImg.src = "assets/imagens/pause.png"
        }
    }
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
    hamburguerScore.textContent = Game.hamburguerScore;
    milkshakeScore.textContent = Game.milkshakeScore;
    hotdogScore.textContent = Game.hotdogScore;
    ninaScore.textContent = Game.ninaScore;
    if(lendarios.Ayla == true){
        aylaScore.textContent = "Pegou a Ayla!!!!!!"
    }
    if(lendarios.Rocket == true){
        rocketScore.textContent = "Pegou o Rocket!!!!!!"
    }
    gameOver.style.display = "flex";
    Game.gameOver = true;
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
play.addEventListener("click", startTtutorial);
playButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
pausar.addEventListener("click", pauseGame);
document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        pauseGame();
    }
});