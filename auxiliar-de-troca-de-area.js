let AuxiliarDeTrocaDeArea = function(auxiliarDeAnotacoes) {
    let permitirTrocaDeArea = true;
    let percorrendoQuadros = true;
    let percorrendoLinhas = false;
    let elementoAtual = null;
    let maiusculas = false;
    let acentuadas = false; 
    let quadros = null;
    let linhas = null;
    let celulas = null;

    let exibirPonteiro = () => {
        $('.ponteiro').removeClass('ponteiro_oculto');
    };

    let ocultarPonteiro = () => {
        $('.ponteiro').addClass('ponteiro_oculto');
        $('.ponteiro').css({
            top: 0,
            left: 0,
            width: 0,
            height: 0
        });
    };

    let moverPonteiro = (elementoAtual) => {
        $('.ponteiro').animate({
            top: elementoAtual.offset().top,
            left: elementoAtual.offset().left,
            width: elementoAtual.outerWidth(),
            height: elementoAtual.outerHeight()
        });
    }

    let listarQuadrosVisiveis = () => {
        return $('.quadro:not(.quadro_oculto)');
    }

    let listarLinhas = (elementoAtual) => {
        return elementoAtual.find('.linha');
    }

    let listarCelulas = (elementoAtual) => {
        return elementoAtual.find('.celula');
    }

    let exibirQuadrosDeAcentuadas = (maiusculas) => {
        $('.quadro_letras').addClass('quadro_oculto');
        if (maiusculas) {
            $('.quadro_acentuadas.quadro_maiusculas').removeClass('quadro_oculto');
        } else {
            $('.quadro_acentuadas.quadro_minusculas').removeClass('quadro_oculto');
        }
        $('.celula_acentuadas-nao-acentuadas').text('Não acentuadas');
    }

    let exibirQuadrosDeNaoAcentuadas = (maiusculas) => {
        $('.quadro_letras').addClass('quadro_oculto');
        if (maiusculas) {
            $('.quadro_nao-acentuadas.quadro_maiusculas').removeClass('quadro_oculto');
        } else {
            $('.quadro_nao-acentuadas.quadro_minusculas').removeClass('quadro_oculto');
        }
        $('.celula_acentuadas-nao-acentuadas').text('Acentuadas');
    }

    let exibirQuadrosDeMaiusculas = (acentuadas) => {
        $('.quadro_letras').addClass('quadro_oculto');
        if (acentuadas) {
            $('.quadro_maiusculas.quadro_acentuadas').removeClass('quadro_oculto');
        } else {
            $('.quadro_maiusculas.quadro_nao-acentuadas').removeClass('quadro_oculto');
        }
        $('.celula_maiusculas-minusculas').text('Minúsculas');
    }

    let exibirQuadrosDeMinusculas = (acentuadas) => {
        $('.quadro_letras').addClass('quadro_oculto');
        if (acentuadas) {
            $('.quadro_minusculas.quadro_acentuadas').removeClass('quadro_oculto');
        } else {
            $('.quadro_minusculas.quadro_nao-acentuadas').removeClass('quadro_oculto');
        }
        $('.celula_maiusculas-minusculas').text('Maiúsculas');
    }

    let executarSimbolo = () => {
        ocultarPonteiro();
        switch (elementoAtual.text()) {
            case 'Acentuadas':
                acentuadas = true;
                exibirQuadrosDeAcentuadas(maiusculas);                
            break;
            case 'Não acentuadas':
                acentuadas = false;
                exibirQuadrosDeNaoAcentuadas(maiusculas);                
            break;
            case 'Maiúsculas':
                maiusculas = true;
                exibirQuadrosDeMaiusculas(acentuadas);                
            break;
            case 'Minúsculas':
                maiusculas = false;
                exibirQuadrosDeMinusculas(acentuadas);                
            break;
            case 'Continuar':
                // Não faz nada.
            break;
            default:
                // Passar para o auxiliar de anotações
                auxiliarDeAnotacoes.simboloEscolhido(elementoAtual.text());
            break;
        } 
    }

    let executarLetraOuSimbolo = () => {
        if (elementoAtual.hasClass('celula_descrita')) {
            executarSimbolo();
        } else {
            // Passar para o auxiliar de anotações
            auxiliarDeAnotacoes.simboloEscolhido(elementoAtual.text());
        }
    }

    let percorrerAreas = (elementos) => {
        elementoAtual = $(elementos.shift());
        exibirPonteiro();
        moverPonteiro(elementoAtual);
        elementos.push(elementoAtual[0]);
     }

    let trocarParaQuadros = () => {
        percorrendoQuadros = true;
    }

    let trocarParaLinhas = () => {
        percorrendoQuadros = false;
        percorrendoLinhas = true;
        let linhas = listarLinhas(elementoAtual);
        if (linhas.length == 1) {
            elementoAtual = $(linhas[0]);
            percorrendoLinhas = false;
        }
    }

    let trocarParaCelulas = () => {
        percorrendoLinhas = false;
    }

    let trocarAreaPercorrida = function() {
        if (permitirTrocaDeArea) {
            permitirTrocaDeArea = false;
            if (percorrendoQuadros) {
                trocarParaLinhas();
            } else if (percorrendoLinhas) {
                trocarParaCelulas();
            } else {
                executarLetraOuSimbolo();
                trocarParaQuadros();
            }            
        }
    }

    this.tempoPassou = () => {
        if (percorrendoQuadros) {
            celulas = null;
            if (!quadros) {
                quadros = listarQuadrosVisiveis().toArray();
            }
            percorrerAreas(quadros);
        } else if (percorrendoLinhas) {
            quadros = null;
            if (!linhas) {
                linhas = listarLinhas(elementoAtual).toArray();
            }
            percorrerAreas(linhas);
        } else {
            linhas = null;
            if (!celulas) {
                celulas = listarCelulas(elementoAtual).toArray();
            }
            percorrerAreas(celulas);
        }
        permitirTrocaDeArea = true;
    }

    this.gesticulou = () => {
        trocarAreaPercorrida();
    }

    this.parar = () => {
        ocultarPonteiro();
    }
}