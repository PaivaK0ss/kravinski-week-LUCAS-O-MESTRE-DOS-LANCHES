// ===========================================
// MAIN
// LUCAS, O MESTRE DOS LANCHES DOS GAMES
// ===========================================

// Carrega todas as imagens
Assets.carregar();

let ultimoTempo = 0;

function loop(timestamp) {
    // Continua chamando o loop mesmo com o jogo parado
    requestAnimationFrame(loop);
    if (!Game.running) {
        return;
    }

    // Tempo desde o último frame
    const delta = timestamp - ultimoTempo;
    ultimoTempo = timestamp;

    // Spawn dos itens
    Game.lastSpawn += delta;
    if (Game.lastSpawn >= CONFIG.intervaloSpawn) {
        spawnItem();
        Game.lastSpawn = 0;
    }

    Game.explosions = Game.explosions.filter(e => {
        e.update();
        return e.life > 0;
    });

    // Atualizações
    player.update();
    updateItems();

    // Limpa a tela
    ctx.clearRect(
        0,
        0,
        CONFIG.largura,
        CONFIG.altura
    );
    
    // Desenha tudo
    drawItems();
    drawExplosion();
    player.draw(ctx);
    UI.update();
    UI.draw(ctx);
}

// Inicia o loop
requestAnimationFrame(loop);