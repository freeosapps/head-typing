let AuxiliarDeAnotacoes = function(auxiliarDeSugestoesDePalavras) {
    let alterarAnotacao = (texto) => {
        $('.anotacao__texto').text(texto);
        $('.anotacao').scrollTop($('.anotacao').prop('scrollHeight'));
    }

    let anotar = (texto) => {
        alterarAnotacao($('.anotacao__texto').text() + texto);
    }

    let limpar = () => {
        $('.anotacao__texto').empty();
    }

    let copiarUltimaPalavraAnotada = () => {
        let partes = $('.anotacao__texto').text().match(/[^\s\.\,][^\s\.\,]*$/, '');
        let palavra = undefined;
        if (partes) {
            palavra = partes[0];
        } else {
            palavra = '';
        }
        return palavra;
    }

    let apagarLetra = () => {
        alterarAnotacao($('.anotacao__texto').text().substr(0, $('.anotacao__texto').text().length - 1));
    }

    let apagarPalavra = () => {
        alterarAnotacao($('.anotacao__texto').text().replace(/[^|\s][^\s]*$/, ''));
    }

    let executarSimbolo = (simbolo) => {
        switch (simbolo) {
            case 'Espaço':
                anotar(' ');
            break;
            case 'Apagar letra':
                apagarLetra();                
            break;
            case 'Apagar palavra':
                apagarPalavra();
             break;
            case 'Ponto final':
                anotar('.');
            break;
            case 'Vírgula':
                anotar(',');
            break;
            case 'Falar e apagar tudo':
                SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance ||
                        window.mozSpeechSynthesisUtterance ||
                        window.msSpeechSynthesisUtterance ||
                        window.oSpeechSynthesisUtterance ||
                        window.SpeechSynthesisUtterance;
                
                speech = new SpeechSynthesisUtterance();
                speech.text = $('.anotacao__texto').text();
                speech.rate = .5;
                speech.lang = 'pt-BR';
                speechSynthesis.speak(speech); 
                limpar();
            break;
            default:
                anotar(simbolo);
            break;
        } 
    }

    let apontarFinalDoTexto = () => {
        $('.anotacao__texto').toggleClass('anotacao__texto_cursor');
    }

    this.tempoPassou = () => {
        apontarFinalDoTexto();
    }

    this.escolheuSimbolo = (simbolo) => {
        executarSimbolo(simbolo);
        auxiliarDeSugestoesDePalavras.prefixoAnotado(copiarUltimaPalavraAnotada());
    }
}