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
            this.placa.verAProximaLinha(this, $('.apontador'));
        } else {
            this.placa.verOProximoSimbolo(this, $('.apontador'));
        }                    
    }
    mostrarOProximoQuadro(proximoQuadro) {
        this.apontador.animate({
            top: proximoQuadro.offset().top,
            left: proximoQuadro.offset().left,
            width: proximoQuadro.width(),
            height: proximoQuadro.height()
        });
    }
    mostrarAProximaLinha(proximaLinha) {
        this.apontador.animate({
            top: proximaLinha.offset().top,
            left: proximaLinha.offset().left,
            width: proximaLinha.width(),
            height: proximaLinha.height()
        });
    }
    mostrarOProximoSimbolo(proximoSimbolo, simbolo) {
        this.apontador.animate({
            top: proximoSimbolo.offset().top,
            left: proximoSimbolo.offset().left,
            width: proximoSimbolo.width(),
            height: proximoSimbolo.height()
        }); 
        this.simboloAtual = simbolo;
    }
}
