class Anotacao {                
    constructor() {
        this._areaAnotacao = null;
    }
    prepararParaMostrar(onde) {
        this._areaAnotacao = onde;
    }
    anotarUmSimbolo(simbolo) {
        this._areaAnotacao.append(simbolo);
    }
    apagarUmSimbolo() {
        this._areaAnotacao.text(this._areaAnotacao.text().substr(0, this._areaAnotacao.text().length - 1));
    }
    apagarUmaPalavra() {
        this._areaAnotacao.text(this._areaAnotacao.text().replace(/[^|\s][^\s]*$/, ''));
    }
}