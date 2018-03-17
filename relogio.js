let Relogio = function() {
    let temporizador = undefined;
    
    this.notificarOTempo = (tempo, quem) => {
        temporizador = setInterval(() => {
            quem.tempoPassou();
        }, tempo);
    }

    this.parar = () => {
        clearInterval(temporizador);
    }
}