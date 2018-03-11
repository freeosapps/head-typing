class Interlocutor {                
    constructor(placaNaoAcentuadasMinusculas, placaNaoAcentuadasMaiusculas, placaAcentuadasMinusculas, placaAcentuadasMaiusculas, relogio, anotacao) {
        this._placaNaoAcentuadasMinusculas = placaNaoAcentuadasMinusculas;
        this._placaNaoAcentuadasMaiusculas = placaNaoAcentuadasMaiusculas;
        this._placaAcentuadasMinusculas = placaAcentuadasMinusculas;
        this._placaAcentuadasMaiusculas = placaAcentuadasMaiusculas;
        this._placa = placaNaoAcentuadasMinusculas;
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
        this._relogio.acompanharOTempo(1.5, this);                    
    }
    gesticular() {
        if (this._apontarSimbolo) {
            if (this._simboloAtual == 'Apagar letra') {
                this._anotacao.apagarUmSimbolo();
            } else if (this._simboloAtual == 'Apagar palavra') {
                this._anotacao.apagarUmaPalavra();
            } else if (this._simboloAtual == 'Espaço') {
                this._anotacao.anotarUmSimbolo(' ');
            } else if (this._simboloAtual == 'Maiúsculas') {
                if (this._placa == this._placaNaoAcentuadasMinusculas) {
                    this._placa = this._placaNaoAcentuadasMaiusculas;
                } else if (this._placa == this._placaAcentuadasMinusculas) {
                    this._placa = this._placaAcentuadasMaiusculas;
                } else {
                    throw 'A placa deve ser de letras minúsculas, acentuadas ou não.';
                }
                this._areaPlaca.empty();
                this._placa.prepararParaMostrar(this._areaPlaca);
            } else if (this._simboloAtual == 'Minúsculas') {
                if (this._placa == this._placaAcentuadasMaiusculas) {
                    this._placa = this._placaAcentuadasMinusculas;
                } else if (this._placa == this._placaNaoAcentuadasMaiusculas) {
                    this._placa = this._placaNaoAcentuadasMinusculas;
                } else {
                    throw 'A placa deve ser de letras maiúsculas, acentuadas ou não.';
                }
                this._areaPlaca.empty();
                this._placa.prepararParaMostrar(this._areaPlaca); 
            } else if (this._simboloAtual == 'Falar') {

            } else if (this._simboloAtual == 'Acentuadas') {
                if (this._placa == this._placaAcentuadasMaiusculas || this._placa == this._placaAcentuadasMinusculas) {
                    this._placa = this._placaNaoAcentuadasMinusculas;
                } else if (this._placa == this._placaNaoAcentuadasMaiusculas || this._placa == this._placaNaoAcentuadasMinusculas) {
                    this._placa = this._placaAcentuadasMinusculas;
                } else {
                    throw 'A placa deve ser de letras maiúsculas ou minúsculas, acentuadas ou não.';
                }
                this._areaPlaca.empty();
                this._placa.prepararParaMostrar(this._areaPlaca); 
            } else if (this._simboloAtual == 'Não acentuadas') {
                this._placa = this._placaNaoAcentuadasMinusculas;
                this._areaPlaca.empty();
                this._placa.prepararParaMostrar(this._areaPlaca); 
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
