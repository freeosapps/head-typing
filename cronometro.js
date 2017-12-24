class Cronometro {
    meAviseAposOTempo(aviso, tempo) {
        this._parado = false;
        setTimeout(() => {
            aviso();
            this._parado = true;
        }, tempo);        
    }
    parado() {
        return this._parado;
    }
}