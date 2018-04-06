let AuxiliarDePlaca = function() {
    const MAI_US_CU_LAS = 'Mai&shy;ús&shy;cu&shy;las';
    const MAIUSCULAS = 'Maiúsculas';
    const MI_NUS_CU_LAS = 'Mi&shy;nús&shy;cu&shy;las';
    const MINUSCULAS = 'Minúsculas';
    const A_CEN_TU_A_DAS = 'A&shy;cen&shy;tu&shy;a&shy;das';
    const ACENTUADAS = 'Acentuadas';
    const NAO_A_CEN_TU_A_DAS = 'Não a&shy;cen&shy;tu&shy;a&shy;das';
    const NAO_ACENTUADAS = 'Não acentuadas';
    const CONTINUAR = 'Continuar';
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
                celulasLinha1 += `<div class="celula celula_sugestao">${palavras[i]}</div>`;
            }
            for (let i = palavras.length; i < 4; i++) {
                celulasLinha1 += '<div class="celula_oculta"></div>';
            }
            celulasLinha1 += '<div class="celula celula_descrita">Continuar</div>';
            let linha2 = '';
            if (palavras.length > 4) {
                let celulasLinha2 = '';
                for (let i = 4; i < 8 && i < palavras.length; i++) {    
                    celulasLinha2 += `<div class="celula celula_sugestao">${palavras[i]}</div>`;
                }
                for (let i = palavras.length - 4; i < 4; i++) {
                    celulasLinha2 += '<div class="celula_oculta"></div>';
                }
                celulasLinha2 += '<div class="celula celula_descrita">Continuar</div>';
                linha2 += `<div class="linha">${celulasLinha2}</div>`;
            }        
            $('.sugestoes').append(`<div class="quadro"><div class="linha">${celulasLinha1}</div>${linha2}</div>`);
        }
    }    
    
    let executarSimbolo = function() {
        if (elemento.text().localeCompare(MAIUSCULAS) == 0) {
            $('.quadro_minusculas').addClass('quadro_oculto');
            if ($('.celula_acentuadas-nao-acentuadas').text().localeCompare(NAO_ACENTUADAS) == 0) { // exibindo acentuadas
                $('.quadro_maiusculas.quadro_acentuadas').removeClass('quadro_oculto');
            } else { // exibindo não acentuadas
                $('.quadro_maiusculas.quadro_nao-acentuadas').removeClass('quadro_oculto');
            }
            $('.celula_maiusculas-minusculas').html(MI_NUS_CU_LAS);
        } else if (elemento.text().localeCompare(MINUSCULAS) == 0) {
            $('.quadro_maiusculas').addClass('quadro_oculto');
            if ($('.celula_acentuadas-nao-acentuadas').text().localeCompare(NAO_ACENTUADAS) == 0) {
                $('.quadro_minusculas.quadro_acentuadas').removeClass('quadro_oculto');
            } else {
                $('.quadro_minusculas.quadro_nao-acentuadas').removeClass('quadro_oculto');                        
            }
            $('.celula_maiusculas-minusculas').html(MAI_US_CU_LAS);
        } else if (elemento.text().localeCompare(ACENTUADAS) == 0) {
            $('.quadro_nao-acentuadas').addClass('quadro_oculto');
            if ($('.celula_maiusculas-minusculas').text().localeCompare(MINUSCULAS) == 0) {
                $('.quadro_acentuadas.quadro_maiusculas').removeClass('quadro_oculto');
            } else {
                $('.quadro_acentuadas.quadro_minusculas').removeClass('quadro_oculto');
            }
            $('.celula_acentuadas-nao-acentuadas').html(NAO_ACENTUADAS);
        } else if (elemento.text().localeCompare(NAO_ACENTUADAS) == 0) {
            $('.quadro_acentuadas').addClass('quadro_oculto');
            if ($('.celula_maiusculas-minusculas').text().localeCompare(MAIUSCULAS) == 0) {                    
                $('.quadro_nao-acentuadas.quadro_minusculas').removeClass('quadro_oculto');
            } else {
                $('.quadro_nao-acentuadas.quadro_maiusculas').removeClass('quadro_oculto');
            }
            $('.celula_acentuadas-nao-acentuadas').html(A_CEN_TU_A_DAS);
        } else if (elemento.text().localeCompare(CONTINUAR) != 0) {
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

    PubSub.subscribe('palavrasSugeridas', (message, data) => palavrasSugeridas(data));
    PubSub.subscribe('deficienteNaoEstaPreparado', (message, data) => {
        PubSub.unsubscribe('passaram1500Milisegundos');
        PubSub.unsubscribe('deficienteGesticulou');
    });
    PubSub.subscribe('deficienteEstaPreparado', (message, data) => {
        PubSub.subscribe('passaram1500Milisegundos', (message, data) => passaram1500Milisegundos());
        PubSub.subscribe('deficienteGesticulou', (message, data) => deficienteGesticulou(data));
    });
}