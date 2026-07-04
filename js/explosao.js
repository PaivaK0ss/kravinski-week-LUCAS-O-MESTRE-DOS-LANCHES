// ===========================================
// EXPLOSÕES
// ===========================================
const Explosoes = {
    lista: [],
    criar(x, y) {
        this.lista.push({
            x: x,
            y: y,
            width: 160,
            height: 160,
            imagem: Assets.gifs.explosao,
            frame: 8,
            totalFrames: 17,
            frameWidth: 142,
            frameHeight: 200,
            velocidade: 3,
            contador: 0
        });
    },
    update() {
        for (let i = this.lista.length - 1; i >= 0; i--) {
            const explosao = this.lista[i];
            explosao.contador++;
            if (explosao.contador >= explosao.velocidade) {
                explosao.contador = 0;
                explosao.frame++;
            }
            if (explosao.frame >= explosao.totalFrames) {
                this.lista.splice(i, 1);
            }
        }
    },
    draw(ctx) {
        for (const explosao of this.lista) {
            ctx.drawImage(
                explosao.imagem,
                explosao.frame * explosao.frameWidth,
                0,
                explosao.frameWidth,
                explosao.frameHeight,
                explosao.x - explosao.width / 2,
                explosao.y - explosao.height / 2,
                explosao.width,
                explosao.height
            );
        }
    }
};