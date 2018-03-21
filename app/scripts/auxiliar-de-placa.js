let AuxiliarDePlaca = function(auxiliarDeAnotacoes) {
    let indiceSeletor = 0;
    let seletor = '.quadro:not(.quadro_oculto)';
    let elemento = null;
    let percorrendoLinha = false;
    let percorrendoCelula = false;
    let trocandoDeArea = false;

    let executarSimbolo = function() {
        if (elemento.text() == 'Maiúsculas') {
            $('.quadro_minusculas').addClass('quadro_oculto');
            if ($('.celula_acentuadas-nao-acentuadas').text() == 'Não acentuadas') { // exibindo acentuadas
                $('.quadro_maiusculas.quadro_acentuadas').removeClass('quadro_oculto');
            } else { // exibindo não acentuadas
                $('.quadro_maiusculas.quadro_nao-acentuadas').removeClass('quadro_oculto');
            }
            $('.celula_maiusculas-minusculas').text('Minúsculas');
        } else if (elemento.text() == 'Minúsculas') {
            $('.quadro_maiusculas').addClass('quadro_oculto');
            if ($('.celula_acentuadas-nao-acentuadas').text() == 'Não acentuadas') {
                $('.quadro_minusculas.quadro_acentuadas').removeClass('quadro_oculto');
            } else {
                $('.quadro_minusculas.quadro_nao-acentuadas').removeClass('quadro_oculto');                        
            }
            $('.celula_maiusculas-minusculas').text('Maiúsculas');
        } else if (elemento.text() == 'Acentuadas') {
            $('.quadro_nao-acentuadas').addClass('quadro_oculto');
            if ($('.celula_maiusculas-minusculas').text() == 'Minúsculas') {
                $('.quadro_acentuadas.quadro_maiusculas').removeClass('quadro_oculto');
            } else {
                $('.quadro_acentuadas.quadro_minusculas').removeClass('quadro_oculto');
            }
            $('.celula_acentuadas-nao-acentuadas').text('Não acentuadas');
        } else if (elemento.text() == 'Não acentuadas') {
            $('.quadro_acentuadas').addClass('quadro_oculto');
            if ($('.celula_maiusculas-minusculas').text() == 'Maiúsculas') {                    
                $('.quadro_nao-acentuadas.quadro_minusculas').removeClass('quadro_oculto');
            } else {
                $('.quadro_nao-acentuadas.quadro_maiusculas').removeClass('quadro_oculto');
            }
            $('.celula_acentuadas-nao-acentuadas').text('Acentuadas');
        } else if (elemento.text() != 'Continuar') {
            auxiliarDeAnotacoes.escolheuSimbolo(elemento.text());
        }        
    }

    this.tempoPassou = () => {
        elemento = $($(seletor)[indiceSeletor]);
        $('.ponteiro').animate({            
            top: elemento.offset().top,
            left: elemento.offset().left,
            height: elemento.outerHeight(),
            width: elemento.outerWidth()
        });
        let linhas = elemento.find('.linha');
        if (linhas.length == 1) {
            $('.ponteiro').animate({
                top: $(linhas[0]).offset().top,
                left: $(linhas[0]).offset().left,
                height: $(linhas[0]).outerHeight(),
                width: $(linhas[0]).outerWidth()
            });
            percorrendoLinha = true;
        }
        indiceSeletor++;
        indiceSeletor = indiceSeletor % $(seletor).length;
        trocandoDeArea = false;
    }

    this.deficienteGesticulou = () => {
        if (!trocandoDeArea) {
            trocandoDeArea = true;
            if (percorrendoLinha) {
                seletor = `${seletor}:eq(${indiceSeletor-1}) .celula`;
                percorrendoCelula = true;
                percorrendoLinha = false;
            } else if (percorrendoCelula) {               
                executarSimbolo();
                seletor = '.quadro:not(.quadro_oculto)';
                percorrendoCelula = false;
            } else {
                seletor = `${seletor}:eq(${indiceSeletor-1}) .linha`;
                percorrendoLinha = true;
            }
            indiceSeletor = 0;            
        }
    }
}