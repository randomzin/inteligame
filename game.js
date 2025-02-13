const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [MainMenu, Conversation, Cenainicial],
    scale: {
        mode: Phaser.Scale.RESIZE, // 🔴 Redimensiona automaticamente
        autoCenter: Phaser.Scale.CENTER_BOTH // 🔴 Mantém centralizado
    }
};

const game = new Phaser.Game(config);
