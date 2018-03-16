let Relogio = function() {
    let temporizador = undefined;
    
    this.avisarAoPassarOTempo = (tempo, aviso) => {
        temporizador = setInterval(aviso, tempo);
    }

    this.parar = () => {
        clearInterval(temporizador);
    }
}