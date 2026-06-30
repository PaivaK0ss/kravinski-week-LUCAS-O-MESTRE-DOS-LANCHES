// ===========================================
// ASSETS DO JOGO
// LUCAS, O MESTRE DOS LANCHES DOS GAMES
// ===========================================
class Assets {
    static imagens = {
        cachorro: new Image(),
        hamburguer: new Image(),
        milkshake: new Image(),
        rocket: new Image(),
        ayla: new Image(),
        nina: new Image(),
        lucas: new Image()
    };

    static carregar() {
        this.imagens.cachorro.src =
            "assets/imagens/cachorro_quente.png";
        this.imagens.hamburguer.src =
            "assets/imagens/hamburguer.png";
        this.imagens.milkshake.src =
            "assets/imagens/milkshake.png";
        this.imagens.rocket.src =
            "assets/imagens/rocket.png";
        this.imagens.ayla.src =
            "assets/imagens/ayla.png";
        this.imagens.nina.src =
            "assets/imagens/nina.png";
        this.imagens.lucas.src =
            "assets/imagens/lucas.png";
    }
}