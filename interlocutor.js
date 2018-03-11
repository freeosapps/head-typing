class Interlocutor {                
    constructor(placaMinusculas, placaMaiusculas, relogio, anotacao) {
        this._placaMinusculas = placaMinusculas;
        this._placaMaiusculas = placaMaiusculas;
        this._placa = placaMinusculas;
        this._relogio = relogio;
        this._anotacao = anotacao;
        this._apontarLinha = false;
        this._apontarSimbolo = false;
        this._simboloAtual = undefined;
        this._apontador = $('<div>')
        .addClass('apontador'); 
        this._areaPlaca = $('<div>');                   
    }
    prepararParaMostrar(onde) {
        let areaAnotacao = $('<div>')
        .addClass('anotacao');

        $(onde)
        .append(this._apontador)
        .append(this._areaPlaca)                    
        .append(areaAnotacao);
        
        this._placa.prepararParaMostrar(this._areaPlaca);
        this._anotacao.prepararParaMostrar(areaAnotacao);
        this._relogio.acompanharOTempo(1, this);                    
    }
    gesticular() {
        if (this._apontarSimbolo) {
            if (this._simboloAtual == '<') {
                this._anotacao.apagarUmSimbolo();
            } else if (this._simboloAtual == '<<') {
                this._anotacao.apagarUmaPalavra();
            } else if (this._simboloAtual == '<>') {
                this._anotacao.anotarUmSimbolo(' ');
            } else if (this._simboloAtual == '::') {
                this._placa = this._placaMaiusculas;
                this._areaPlaca.empty();
                this._placa.prepararParaMostrar(this._areaPlaca);
            } else if (this._simboloAtual == '..') {
                this._placa = this._placaMinusculas;
                this._areaPlaca.empty();
                this._placa.prepararParaMostrar(this._areaPlaca); 
            } else if (this._simboloAtual == '<*') {

            } else {
                this._anotacao.anotarUmSimbolo(this._simboloAtual);
            }                    
            this._apontarSimbolo = false;
        } else if (this._apontarLinha) {
            this._apontarLinha = false;
            this._apontarSimbolo = true;
        } else {
            this._apontarLinha = true;
        }
    }
    passarOTempo() {
        if (this._apontarSimbolo) {
            this._placa.verOProximoSimbolo(this, $('.apontador'));
        } else if (this._apontarLinha) {
            this._placa.verAProximaLinha(this, $('.apontador'));
        } else {
            this._placa.verOProximoQuadro(this, $('.apontador'));
        }                    
    }
    _apontarAProximaArea(area) {
        this._apontador.animate({
            top: area.offset().top,
            left: area.offset().left,
            width: area.width(),
            height: area.height()
        });
    }
    mostrarOProximoQuadro(areaProximoQuadro) {
        this._apontarAProximaArea(areaProximoQuadro);
    }
    mostrarAProximaLinha(areaProximaLinha) {
        this._apontarAProximaArea(areaProximaLinha);
    }
    mostrarOProximoSimbolo(areaProximoSimbolo, simbolo) {
        this._apontarAProximaArea(areaProximoSimbolo);
        this._simboloAtual = simbolo;
    }
}
