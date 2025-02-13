class Conversation extends Phaser.Scene {
    constructor() {
        super({ key: "Conversation" });
    }

    preload() {
        this.load.font('Rainyhearts', 'assets/fonts/rainyhearts.ttf');
        this.load.image("caixa_dialogo", "assets/imagens/caixadialogo.png");
        this.load.image("fundoconversation", "assets/imagens/fundoconversation.png");
        this.load.image("homemcabelopreto", "assets/imagens/homemcabelopreto.png");
        this.load.image("cientista", "assets/imagens/cientistacientista.png");
        this.load.image("botao_retangular", "assets/imagens/botao_retangular.png");
        
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.image(centerX, centerY, "fundoconversation")
            .setOrigin(0.5)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.dialogos = [
            { personagem: "Agente P.", texto: "Bem-vindo à Agência Global de Proteção de Dados recruta. A partir de hoje, você não é mais um civil qualquer.", img: "cientista" },
            { personagem: "Agente P.", texto: "Seu codinome agora é DPO Hero.", img: "cientista" },
            { personagem: "Agente ??", texto: "É um grande prazer ser selecionado para trabalhar em prol da sociedade.", img: "homemcabelopreto" },
            { personagem: "Agente P.", texto: "Cada dia, milhões de pessoas têm suas informações expostas.", img: "cientista" },
            { personagem: "Agente P.", texto: "Aqui nossa missão é garantir que a Lei de Proteção de Dados seja respeitada em todos os lugares.", img: "cientista"},
        ];

        this.indice = 0;

        this.personagemEsquerda = this.add.image(centerX - 300, centerY + 30, "homemcabelopreto").setOrigin(0.5).setScale(0.8);
        this.personagemDireita = this.add.image(centerX + 440, centerY, "cientista").setOrigin(0.5).setScale(0.9);

        const caixaDialogo = this.add.image(centerX, centerY + 130, "caixa_dialogo").setOrigin(0.5).setScale(0.85);

        this.personagemTexto = this.add.text(centerX - 260, centerY + 50, "", {
            fontSize: "34px",
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",  
        }).setOrigin(0, 0.5);

        this.textoAtual = this.add.text(centerX - 260, centerY + 90, "", {
            fontSize: "27px",
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",
            wordWrap: { width: 450, useAdvancedWrap: true }
        }).setOrigin(0, 0);

        this.atualizarTexto();

        // Botão de Voltar
        this.botaoVoltar = this.add.text(centerX - 280, centerY + 200, "VOLTAR", {
            fontSize: "24px",
            fill: "#00BFFF",
            fontFamily: "Rainyhearts",
        }).setInteractive().on("pointerdown", () => this.dialogoAnterior());

        // Botão de Continua
        let botaoContinuar = this.add.text(centerX + 170, centerY + 200, "CONTINUAR", {
            fontSize: "24px",
            fill: "#00BFFF",
            fontFamily: "Rainyhearts",
        }).setInteractive().on("pointerdown", () => this.proximoDialogo());

        let botaoMenu = this.add.image(100, this.cameras.main.height - 560, "botao_retangular").setInteractive().setOrigin(0.5).setScale(0.5);
        let textoMenu = this.add.text(100, this.cameras.main.height - 60, "MENU", {
            fontSize: "35px",
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",
            fontStyle: "bold"
        })
        .setInteractive().setOrigin(0.5, 14.78);

        botaoContinuar.on("pointerover", () => botaoContinuar.setTint(0xaaaaaa));
        botaoContinuar.on("pointerout", () => botaoContinuar.clearTint());

        this.botaoVoltar.on("pointerover", () => this.botaoVoltar.setTint(0xaaaaaa));
        this.botaoVoltar.on("pointerout", () => this.botaoVoltar.clearTint());

        textoMenu.on("pointerover", () => textoMenu.setTint(0xaaaaaa));
        textoMenu.on("pointerout", () => textoMenu.clearTint());

        botaoMenu.on("pointerover", () => botaoMenu.setTint(0xaaaaaa));
        botaoMenu.on("pointerout", () => botaoMenu.clearTint());

        botaoMenu.on("pointerdown", () => this.scene.start("MainMenu"));
        textoMenu.on("pointerdown", () => this.scene.start("MainMenu"));

        // Inicialmente, o botão de voltar estará invisível
        this.botaoVoltar.setVisible(false);

        // Atualizar a visibilidade do botão "VOLTAR" quando necessário
        this.atualizarVisibilidadeVoltar();
    }

    atualizarTexto() {
        let fala = this.dialogos[this.indice];
        this.personagemTexto.setText(fala.personagem);
        this.textoAtual.setText(fala.texto);
        
        this.personagemEsquerda.setVisible(fala.img === "homemcabelopreto");
        this.personagemDireita.setVisible(fala.img === "cientista");
    }

    // Função para atualizar a visibilidade do botão "VOLTAR"
    atualizarVisibilidadeVoltar() {
        if (this.indice > 0) {  // O botão de voltar aparece a partir do segundo diálogo (índice 1)
            this.botaoVoltar.setVisible(true);
        } else {
            this.botaoVoltar.setVisible(false);
        }
    }

    proximoDialogo() {
        if (this.indice < this.dialogos.length - 1) {
            this.indice++;
            this.atualizarTexto();
            this.atualizarVisibilidadeVoltar(); // Atualiza a visibilidade ao avançar
        } else {
            // Efeito de transição para a nova cena
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start("Cenainicial");
            });
        }
    }
    
    

    dialogoAnterior() {
        if (this.indice > 0) {  // Corrigido para garantir que o índice só diminua até 0
            this.indice--;
            this.atualizarTexto();
        }
        this.atualizarVisibilidadeVoltar();  // Atualiza a visibilidade do botão "VOLTAR"
    }
}

window.Conversation = Conversation;
