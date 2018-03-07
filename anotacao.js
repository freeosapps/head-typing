class Anotacao {                
    constructor() {
        this.areaAnotacao = undefined;
    }
    prepararParaMostrar(onde) {
        this.areaAnotacao = onde;
    }
    anotarUmSimbolo(simbolo) {
        this.areaAnotacao.append(simbolo);
    }
    apagarUmSimbolo() {
        this.areaAnotacao.text(this.areaAnotacao.text().substr(0, this.areaAnotacao.text().length - 1));
    }
    apagarUmaPalavra() {
        this.areaAnotacao.text(this.areaAnotacao.text().replace(/[^|\s].*$/, ''));
    }
}