// ===========================================
// CUTSCENE CHERRYCAM
// ===========================================

function cutsceneCherrycam() {
    Game.cutscene = true;
    setTimeout(() => {
        Game.cutscene = false;
    }, 2000);
}

function drawCherrycam() {
    const img = Assets.imagens.cherrycam;
    const gradiente = ctx.createLinearGradient(
        0, 0,
        CONFIG.largura, 0
    );

    ctx.font = "36px Luckiest Guy";
    ctx.fillStyle = "#c70000";
    ctx.fillText(
        "CHERRY",
        Game.cherrycam.x - 70,
        Game.cherrycam.y - 40,
        350
    );
    ctx.fillStyle = "#00a329";
    ctx.fillText(
        "CAM",
        Game.cherrycam.x + 50,
        Game.cherrycam.y - 40,
        350
    );
    ctx.drawImage(
        Assets.imagens.cherrycam,
        Game.cherrycam.x - 50,
        Game.cherrycam.y - 25,
        player.width + 75,
        player.height + 25
    );
}