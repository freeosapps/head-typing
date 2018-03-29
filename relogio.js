let Relogio = function(tempo) {
    let temporizador = undefined;

    let parar = (temporizador) => {
        clearInterval(temporizador);
    }

    let acompanharOTempo = () => {
        temporizador = setInterval(() => {
            PubSub.publish(`passaram${tempo}Milisegundos`);
        }, tempo);
        PubSub.subscribe(`pararDeAcompanharOTempoACada${tempo}Milisegundos`, parar.bind(this, temporizador));
    }

    acompanharOTempo();
}