// ===========================================
// PLAYER
// LUCAS, O MESTRE DOS LANCHES DOS GAMES
// ===========================================
class Player {
    constructor() {
        this.width = 100;
        this.height = 120;
        this.x = (CONFIG.largura / 2) - (this.width / 2);
        this.y = 480;
        this.speed = CONFIG.velocidadeLucas;
        this.left = false;
        this.right = false;
    }
    update() {
        if (this.left) {
            this.x -= this.speed;
        }
        if (this.right) {
            this.x += this.speed;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > CONFIG.largura) {
            this.x = CONFIG.largura - this.width;
        }
    }
    draw(ctx) {
        const img = Assets.imagens.lucas;
        if (img.complete && img.naturalWidth > 0) {
            ctx.drawImage(
                img,
                this.x,
                this.y,
                this.width,
                this.height
            );
        } else {
            ctx.fillStyle = "#3498db";
            ctx.fillRect(
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }
}

const player = new Player();

// ===========================================
// CONTROLES
// ===========================================
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

// Mouse
leftButton.addEventListener("mousedown", () => {
    player.left = true;
});

leftButton.addEventListener("mouseup", () => {
    player.left = false;
});

rightButton.addEventListener("mousedown", () => {
    player.right = true;
});

rightButton.addEventListener("mouseup", () => {
    player.right = false;
});

// Touch
leftButton.addEventListener("touchstart", (e) => {
    e.preventDefault();
    player.left = true;
});

leftButton.addEventListener("touchend", () => {
    player.left = false;
});

rightButton.addEventListener("touchstart", (e) => {
    e.preventDefault();
    player.right = true;
});

rightButton.addEventListener("touchend", () => {
    player.right = false;
});

// Teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        player.left = true;
    }
    if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        player.right = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        player.left = false;
    }
    if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        player.right = false;
    }
});