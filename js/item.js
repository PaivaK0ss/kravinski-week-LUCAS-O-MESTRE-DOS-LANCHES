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
        this.width = tipo.itemWidth;
        this.height = tipo.itemHeight;
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
        return this.y > (CONFIG.altura - this.height);
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
        lendario: false,
        itemWidth: 80,
        itemHeight: 80
    },
    {
        idItem: 2,
        nome: "Milk Shake",
        imagem: Assets.imagens.milkshake,
        pontos: 2,
        tempo: 1,
        lendario: false,
        itemWidth: 60,
        itemHeight: 90
    },
    {
        idItem: 3,
        nome: "Cachorro Quente",
        imagem: Assets.imagens.cachorro,
        pontos: 3,
        tempo: 2,
        lendario: false,
        itemWidth: 100,
        itemHeight: 50
    },
    {
        idItem: 4,
        nome: "Nina",
        imagem: Assets.imagens.nina,
        pontos: -4,
        tempo: -4,
        lendario: false,
        itemWidth: 100,
        itemHeight: 100
    },
    {
        idItem: 5,
        nome: "Rocket",
        imagem: Assets.imagens.rocket,
        pontos: 10,
        tempo: 10,
        lendario: true,
        itemWidth: 80,
        itemHeight: 80
    },
    {
        idItem: 6,
        nome: "Ayla",
        imagem: Assets.imagens.ayla,
        pontos: 10,
        tempo: 10,
        lendario: true,
        itemWidth: 80,
        itemHeight: 80
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
         if (tipo.lendario && lendarios[tipo.nome]) {
            continue;
        }
        if (tipo.lendario && Math.random() > 0.01) {
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

            switch (item.idItem) {
                case 1:
                    Game.hamburguerScore += 1;
                    break;
                case 2:
                    Game.milkshakeScore += 1;
                    break;
                case 3:
                    Game.hotdogScore += 1;
                    break;
                case 4:
                    Game.ninaScore += 1;
                    break;
                case 6:
                    Game.cherrycam.x = player.x;
                    Game.cherrycam.y = player.y;
                    cutsceneCherrycam()
                default:
                    break;
            }

            // Evita tempo negativo
            if (Game.timer < 0) {
                Game.timer = 0;
            }
            scoreText.textContent = Game.score;
            timerText.textContent = Math.floor(Game.timer);

            // Notificação
            UI.itemColetado(item);

            Game.items.splice(i, 1);
            continue;
        }
        if (item.saiuDaTela()) {
            Explosoes.criar(
                item.x + item.width / 2,
                CONFIG.altura - item.height / 2
            );
            if (item.lendario) {
                lendarios[item.nome] = false;
            }
            Game.items.splice(i, 1);
            continue;
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