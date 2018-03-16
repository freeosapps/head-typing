let Anotacao = function() {
    let alterarAnotacao = (texto) => {
        $('.anotacao__texto').text(texto);
        $('.anotacao').scrollTop($('.anotacao').prop('scrollHeight'));
    }

    let anotar = (texto) => {
        alterarAnotacao($('.anotacao__texto').text() + texto);
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

    this.anotar = (texto) => {
        anotar(texto);
    }

    this.apagarLetra = () => {
        alterarAnotacao($('.anotacao__texto').text().substr(0, $('.anotacao__texto').text().length - 1));
    }

    this.limpar = () => {
        $('.anotacao__texto').empty();
    }

    this.apontarFinalDoTexto = () => {
        $('.anotacao__texto').toggleClass('anotacao__texto_cursor');
    }
    
    this.copiarUltimaPalavraAnotada = () => {
        return recortarUltimaPalavraAnotada();
    }
}