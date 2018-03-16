let Relogio = function() {
    let temporizador = undefined;
    
    this.acompanharOTempo = (tempo, aviso) => {
        temporizador = setInterval(aviso, tempo);
    }

    this.parar = () => {
        clearInterval(temporizador);
    }
}