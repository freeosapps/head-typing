class Relogio {
    constructor() {

    }
    acompanharOTempo(segundos, quem) {
        setInterval(() => {
            quem.passarOTempo();
        }, segundos * 1000);
    }                
}