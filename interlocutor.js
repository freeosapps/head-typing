class Interlocutor {                
    constructor(placa, relogio, anotacao) {
        this.placa = placa;
        this.relogio = relogio;
        this.anotacao = anotacao;
        this.apontarLinha = false;
        this.apontarSimbolo = false;
        this.simboloAtual = undefined;
    }
    prepararParaMostrar(onde) {
        let areaPlaca = $('<div>');                   
        let areaAnotacao = $('<div>');
        let botaoGesticular = $('<button>')
        .addClass('gesto')
        .text('Gesticular')
        .bind('click', () => {
            this.gesticular();
        });
        $(onde)
        .append(areaPlaca)                    
        .append(areaAnotacao)
        .append(botaoGesticular);
        
        this.placa.prepararParaMostrar(areaPlaca);
        this.placa.acompanharOsSimbolos(this);                    
        this.anotacao.prepararParaMostrar(areaAnotacao);
        this.relogio.acompanharOTempo(1, this);                    
    }
    gesticular() {
        if (!this.apontarSimbolo && !this.apontarLinha) {
            this.apontarLinha = true;
        } else if (this.apontarLinha) {
            this.apontarLinha = false;
            this.apontarSimbolo = true;
        } else {
            if (this.simboloAtual == '<') {
                this.anotacao.apagarUmSimbolo();
            } else if (this.simboloAtual == '<<') {
                this.anotacao.apagarUmaPalavra();
            } else if (this.simboloAtual == '<>') {
                this.anotacao.anotarUmSimbolo(' ');
            } else {
                this.anotacao.anotarUmSimbolo(this.simboloAtual);
            }                    
            this.apontarSimbolo = false;
        }
    }
    passarOTempo() {
        if (!this.apontarSimbolo && !this.apontarLinha) {
            this.placa.apontarOProximoQuadro();
        } else if (this.apontarLinha) {
            this.placa.apontarAProximaLinha();
        } else {
            this.placa.apontarOProximoSimbolo();
        }                    
    }
    mostrarUmSimbolo(simbolo) {
        this.simboloAtual = simbolo;
    }
}