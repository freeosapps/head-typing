let AuxiliarDeAnotacoes = function() {
    this.escolheuSimbolo = (simbolo) => {
        if (simbolo == 'Ponto final') {
            $('.anotacao__texto').append('.');    
        } else if (simbolo == 'Vírgula') {
            $('.anotacao__texto').append(',');
        } else if (simbolo == 'Apagar letra') {
            $('.anotacao__texto').text($('.anotacao__texto').text().substr(0, $('.anotacao__texto').text().length - 1));
        } else if (simbolo == 'Apagar palavra') {
            $('.anotacao__texto').text($('.anotacao__texto').text().replace(/[^\s]+(\s+)?$/, ''));
        } else if (simbolo == 'Espaço') {
            $('.anotacao__texto').append(' ');
        } else {
            $('.anotacao__texto').append(simbolo);
        }
    }

    this.tempoPassou = () => {
        $('.anotacao__texto').toggleClass('anotacao__texto_cursor');
    }
}