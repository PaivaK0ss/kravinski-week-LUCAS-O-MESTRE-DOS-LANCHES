// ===========================================
// UI
// LUCAS, O MESTRE DOS LANCHES DOS GAMES
// ===========================================

const UI = {
    notifications: [],
    showNotification(texto, cor = "#3498db") {
        this.notifications.push({
            texto: texto,
            cor: cor,
            tempo: 180,
            y: 30
        });
    },
    update() {
        for (let i = this.notifications.length - 1; i >= 0; i--) {
            const n = this.notifications[i];
            n.tempo--;
            if (n.y < 50) {
                n.y += 1;
            }
            if (n.tempo <= 0) {
                this.notifications.splice(i, 1);
            }
        }
    },
    draw(ctx) {
        let offset = 0;
        for (const n of this.notifications) {
            ctx.save();
            ctx.globalAlpha = Math.min(n.tempo / 60, 1);
            // Fundo
            ctx.fillStyle = "#222";
            ctx.fillRect(
                CONFIG.largura - 340,
                n.y + offset,
                310,
                50
            );

            // Borda
            ctx.strokeStyle = n.cor;
            ctx.lineWidth = 3;
            ctx.strokeRect(
                CONFIG.largura - 340,
                n.y + offset,
                310,
                50
            );

            // Texto
            ctx.fillStyle = "white";
            ctx.font = "18px Arial";
            ctx.fillText(
                texto = n.texto,
                CONFIG.largura - 320,
                n.y + 30 + offset
            );
            ctx.restore();
            offset += 60;
        }
    }
};