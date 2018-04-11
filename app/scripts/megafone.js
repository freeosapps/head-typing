let Megafone = function() {
    let deficientePediuParaFalar = (palavras) => {
        responsiveVoice.speak(palavras, 'Brazilian Portuguese Female');
    };    
    PubSub.subscribe(EVENTO.DEFICIENTE_PEDIU_PARA_FALAR, (message, data) => deficientePediuParaFalar(data));
};