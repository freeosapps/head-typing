let Megafone = function(speechSynthesisUtterance) {
    let deficientePediuParaFalar = (palavras) => {
        speechSynthesisUtterance.text = palavras;
        speechSynthesisUtterance.lang = 'pt-BR';
        speechSynthesis.speak(speechSynthesisUtterance);
    };    
    PubSub.subscribe(EVENTO.DEFICIENTE_PEDIU_PARA_FALAR, (message, data) => deficientePediuParaFalar(data));
};