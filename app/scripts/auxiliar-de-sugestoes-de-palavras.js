let AuxiliarDeSugestoesDePalavras = function(dicionario) {
    PubSub.subscribe('ultimaPalavraAnotada', (message, data) => {
        let encontradas = dicionario.match(new RegExp(`\n${data}.+`, 'g'));
        if (!encontradas) {
            encontradas = [];
        }
        PubSub.publish('palavrasSugeridas', encontradas.map((palavra) => palavra.replace(/\n/, '').substr(data.length)));
    });   
}