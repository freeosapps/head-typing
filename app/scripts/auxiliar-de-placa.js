let AuxiliarDePlaca = function() {
    let indiceSeletor = 0;
    let seletor = '.quadro:not(.quadro_oculto)';
    let elemento = null;
    let percorrendoLinha = false;
    let percorrendoCelula = false;
    let trocandoDeArea = false;

    let palavrasSugeridas = (palavras) => {
        $('.sugestoes').empty();
        if (palavras.length) {
            let celulasLinha1 = '';
            for (let i = 0; i < 4 && i < palavras.length; i++) {
                celulasLinha1 += `<td class="celula">${palavras[i]}</td>`;
            }
            for (let i = palavras.length; i < 4; i++) {
                celulasLinha1 += '<td></td>';
            }
            celulasLinha1 += '<td class="celula celula_descrita">Continuar</td>';
            let linha2 = '';
            if (palavras.length > 4) {
                let celulasLinha2 = '';
                for (let i = 4; i < 8 && i < palavras.length; i++) {    
                    celulasLinha2 += `<td class="celula">${palavras[i]}</td>`;
                }
                for (let i = palavras.length - 4; i < 4; i++) {
                    celulasLinha2 += '<td></td>';
                }
                celulasLinha2 += '<td class="celula celula_descrita">Continuar</td>';
                linha2 += `<tr class="linha">${celulasLinha2}</tr>`;
            }        
            $('.sugestoes').append(`<table class="quadro"><tr class="linha">${celulasLinha1}</tr>${linha2}</table>`);
        }
    }    
    
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
            PubSub.publish('deficienteEscolheuOSimbolo', elemento.text());
        }        
    }

    let passaram1500Milisegundos = () => {        
        elemento = $($(seletor)[indiceSeletor]);                
        $('.ponteiro').animate({            
            top: elemento.offset().top,
            left: elemento.offset().left,
            height: elemento.outerHeight(),
            width: elemento.outerWidth()
        });
        indiceSeletor++;
        indiceSeletor = indiceSeletor % $(seletor).length;
        trocandoDeArea = false;
        $('.ponteiro').css('display', 'block');
    }    

    let deficienteGesticulou = () => {
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
                $('.ponteiro').css({
                    display: 'none',
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0
                });
            } else {
                seletor = `${seletor}:eq(${indiceSeletor-1}) .linha`;                
                percorrendoLinha = true;
                let linhas = $(seletor);
                if (linhas.length == 1) {
                    seletor = `${seletor}:eq(0) .celula`;
                    percorrendoCelula = true;
                    percorrendoLinha = false;         
                }
            }
            indiceSeletor = 0;            
        }        
    }
    
    PubSub.subscribe('deficienteGesticulou', (message, data) => deficienteGesticulou(data));
    PubSub.subscribe('passaram1500Milisegundos', (message, data) => passaram1500Milisegundos(data));
    PubSub.subscribe('palavrasSugeridas', (message, data) => palavrasSugeridas(data));
}