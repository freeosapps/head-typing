let AuxiliarDeSugestoesDePalavras = function(dicionario) {
    PubSub.subscribe(EVENTO.ULTIMA_PALAVRA_ANOTADA, (message, data) => {
        let encontradas = dicionario.match(new RegExp(`\n${data}.+`, 'g'));
        if (!encontradas) {
            encontradas = [];
        }
        PubSub.publish(EVENTO.PALAVRAS_SUGERIDAS, encontradas.map((palavra) => palavra.replace(/\n/, '').substr(data.length)));
    });   
}