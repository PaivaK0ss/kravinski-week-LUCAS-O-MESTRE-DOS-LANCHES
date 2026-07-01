// ===========================================
// ITEM
// LUCAS, O MESTRE DOS LANCHES DOS GAMES
// ===========================================
class Item {
    constructor(tipo) {
        this.idItem = tipo.idItem
        this.nome = tipo.nome;
        this.imagem = tipo.imagem;
        this.pontos = tipo.pontos;
        this.tempo = tipo.tempo;
        this.width = CONFIG.tamanhoItem;
        this.height = CONFIG.tamanhoItem;
        this.x = Math.random() * (CONFIG.largura - this.width);
        this.y = -this.height;
        this.speed = CONFIG.velocidadeItem;
    }
    update() {
        this.y += this.speed;
    }
    draw(ctx) {
        if (this.imagem.complete && this.imagem.naturalWidth > 0) {
            ctx.drawImage(
                this.imagem,
                this.x,
                this.y,
                this.width,
                this.height
            );
        } else {
            ctx.fillStyle = "orange";
            ctx.fillRect(
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }
    saiuDaTela() {
        return this.y > CONFIG.altura;
    }
    colidiu(player) {
        return (
            this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y &&
            this.idItem
        );
    }
}

// ===========================================
// TIPOS DE ITENS
// ===========================================
const TIPOS_ITENS = [
    {
        idItem: 1,
        nome: "Hambúrguer",
        imagem: Assets.imagens.hamburguer,
        pontos: 1,
        tempo: 0,
        lendario: false
    },
    {
        idItem: 2,
        nome: "Milk Shake",
        imagem: Assets.imagens.milkshake,
        pontos: 2,
        tempo: 1,
        lendario: false
    },
    { 
        idItem: 3,
        nome: "Cachorro Quente",
        imagem: Assets.imagens.cachorro,
        pontos: 3,
        tempo: 2,
        lendario: false
    },
    {
        idItem: 4,
        nome: "Nina",
        imagem: Assets.imagens.nina,
        pontos: -4,
        tempo: -4,
        lendario: false
    },
    {
        idItem: 5,
        nome: "Rocket",
        imagem: Assets.imagens.rocket,
        pontos: 10,
        tempo: 10,
        lendario: true
    },
    {
        idItem: 6,
        nome: "Ayla",
        imagem: Assets.imagens.ayla,
        pontos: 10,
        tempo: 10,
        lendario: true
    }
];

const lendarios = {
    Rocket: false,
    Ayla: false
};

// ===========================================
// SPAWN
// ===========================================
function spawnItem() {
    let tipo;
    while (true) {
        tipo = TIPOS_ITENS[
            Math.floor(Math.random() * TIPOS_ITENS.length)
        ];
        // Se for lendário e já apareceu, sorteia outro
        if (tipo.lendario && lendarios[tipo.nome]) {
            continue;
        }
        // Se for lendário, apenas 1% de chance de realmente aparecer
        if (tipo.lendario && Math.random() > 0.02) {
            continue;
        }
        break;
    }
    if (tipo.lendario) {
        lendarios[tipo.nome] = true;
    }
    Game.items.push(
        new Item(tipo)
    );
}

// ===========================================
// UPDATE
// ===========================================
function updateItems() {
    for (let i = Game.items.length - 1; i >= 0; i--) {
        const item = Game.items[i];
        item.update();
        if (item.colidiu(player)) {
            Game.score += item.pontos;
            Game.timer += item.tempo;

            if (item.idItem == 1) {
                Game.hamburguerScore += 1;
            }
            if (item.idItem == 2) {
                Game.milkshakeScor += 1;
            }
            if (item.idItem == 3) {
                Game.hotdogScore += 1;
            }
            if (item.idItem == 4) {
                Game.ninaScore += 1;
            }

            // Evita tempo negativo
            if (Game.timer < 0) {
                Game.timer = 0;
            }
            scoreText.textContent = Game.score;
            timerText.textContent = Math.floor(Game.timer);

            // Notificação
            if (item.pontos > 0) {
                UI.showNotification(
                    "+" + item.pontos + " pontos",
                    "#00cc66"
                );
            } else {
                UI.showNotification(
                    item.pontos + " pontos",
                    "#b000ff"
                );
            }
            Game.items.splice(i, 1);
            continue;
        }
        if (item.saiuDaTela()) {
            if(item.lendario){
                lendarios[tipo.nome] = false;
            }
            Game.items.splice(i, 1);
        }
    }
}

// ===========================================
// DRAW
// ===========================================
function drawItems() {
    for (const item of Game.items) {
        item.draw(ctx);
    }
}