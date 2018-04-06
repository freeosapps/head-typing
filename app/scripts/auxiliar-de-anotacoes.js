let AuxiliarDeAnotacoes = function() {
    let deficienteEscolheuOSimbolo = (simbolo) => {
        if (simbolo == 'Apagar letra') {
            $('.anotacao__texto').text($('.anotacao__texto').text().substr(0, $('.anotacao__texto').text().length - 1));
        } else if (simbolo == 'Apagar palavra') {
            $('.anotacao__texto').text($('.anotacao__texto').text().replace(/[^\s]+(\s+)?$/, ''));
        } else if (simbolo == 'Espaço') {
            $('.anotacao__texto').append(' ');
        } else if (simbolo == 'Apagar tudo') {
            $('.anotacao__texto').text('');
        } else {
            $('.anotacao__texto').append(simbolo);
        }
        let ultimaPalavra = $('.anotacao__texto').text().match(/[^\s\.\,\?\!\-]+$/);
        if (ultimaPalavra) {
            ultimaPalavra = ultimaPalavra[0];
        } else {
            ultimaPalavra = '';
        }
        PubSub.publish('ultimaPalavraAnotada', ultimaPalavra);
    }

    let passaram500Milisegundos = () => {
        $('.anotacao__texto').toggleClass('anotacao__texto_cursor');
    }
    
    PubSub.subscribe('deficienteEscolheuOSimbolo', (message, data) => deficienteEscolheuOSimbolo(data));
    PubSub.subscribe('passaram500Milisegundos', (message, data) => passaram500Milisegundos(data));
}