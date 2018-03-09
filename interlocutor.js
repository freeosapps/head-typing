class Interlocutor {                
    constructor(placa, relogio, anotacao) {
        this.placa = placa;
        this.relogio = relogio;
        this.anotacao = anotacao;
        this.apontarLinha = false;
        this.apontarSimbolo = false;
        this.simboloAtual = undefined;
        this.apontador = null;
    }
    prepararParaMostrar(onde) {
        this.apontador = $('<div>')
        .addClass('apontador'); 
        let areaPlaca = $('<div>');                   
        let areaAnotacao = $('<div>')
        .addClass('anotacao');

        $(onde)
        .append(this.apontador)
        .append(areaPlaca)                    
        .append(areaAnotacao);
        
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
            this.placa.verOProximoQuadro(this, $('.apontador'));
        } else if (this.apontarLinha) {
            this.placa.apontarAProximaLinha();
        } else {
            this.placa.apontarOProximoSimbolo();
        }                    
    }
    mostrarOProximoQuadro(proximaArea) {
        this.areaAtual = proximaArea;
        this.apontador.animate({
            top: proximaArea.offset().top,
            left: proximaArea.offset().left,
            width: proximaArea.width(),
            height: proximaArea.height()
        });
    }
    mostrarAProximaLinha(linhaAnterior, proximaLinha) {
        linhaAnterior.removeClass('linha_apontada');
        proximaLinha.addClass('linha_apontada');
    }
    mostrarUmSimbolo(simbolo) {
        this.simboloAtual = simbolo;
    }
}
