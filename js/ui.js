// ===========================================
// UI
// LUCAS, O MESTRE DOS LANCHES DOS GAMES
// ===========================================
const UI = {
    notifications: [],
    showNotification(texto, cor = "#00cc66") {
        this.notifications.push({
            texto,
            cor,
            tempoMax: 90,
            tempo: 90
        });
    },
    update() {
        for (let i = this.notifications.length - 1; i >= 0; i--) {
            const n = this.notifications[i];
            n.tempo--;
            if (n.tempo <= 0) {
                this.notifications.splice(i, 1);
            }
        }
    },
    draw(ctx) {
        let posY = 20;
        for (const n of this.notifications) {
            const alpha = Math.min(
                1,
                n.tempo / 60
            );
            ctx.save();
            ctx.globalAlpha = alpha;

            // Fundo
            ctx.fillStyle = "rgba(23,23,23,0.5)";
            ctx.fillRect(
                CONFIG.largura - 330,
                posY,
                300,
                60
            );

            // Borda
            ctx.strokeStyle = n.cor;
            ctx.lineWidth = 3;
            ctx.strokeRect(
                CONFIG.largura - 330,
                posY,
                300,
                60
            );

            // Texto principal
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 15px Arial";
            ctx.fillText(
                n.texto,
                CONFIG.largura - 310,
                posY + 37
            );
            ctx.restore();
            posY += 70;
        }
    },
    itemColetado(item) {
        let cor = "#00cc66";
        let texto = "";
        switch (item.idItem) {
            case 1:
                texto = "Burgão DOS GAMES +1 ponto";
                break;
            case 2:
                texto = "Milkshake MANEIRO +2 pontos";
                break;
            case 3:
                texto = "Dogão ÉPICO +3 ponto";
                break;
            case 4:
                texto = "The Nine -4 pontos";
                cor = "#b000ff";
                break;
            case 5:
                texto = "ROCKET LENDÁRIO +10";
                cor = "#FFD700";
                break;
            case 6:
                texto = "AYLA LENDÁRIA +10";
                cor = "#FFD700";
                break;
            default:
                texto = item.nome;
        }
        this.showNotification(
            texto,
            cor
        );
    }
};