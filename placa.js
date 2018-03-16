let Placa = function() {
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

    this.listarQuadrosVisiveis = () => {
        return listarQuadrosVisiveis();
    }

    this.listarLinhas = (quadro) => {
        return listarLinhas(quadro);
    }

    this.listarCelulas = (linha) => {
        return listarCelulas(linha);
    }

    this.exibirQuadrosDeMaiusculas = (acentuadas) => {
        exibirQuadrosDeMaiusculas(acentuadas);
    }

    this.exibirQuadrosDeMinusculas = (acentuadas) => {
        exibirQuadrosDeMinusculas(acentuadas);
    }

    this.exibirQuadrosDeAcentuadas = (maiusculas) => {
        exibirQuadrosDeAcentuadas(maiusculas);
    }

    this.exibirQuadrosDeNaoAcentuadas = (maiusculas) => {
        exibirQuadrosDeNaoAcentuadas(maiusculas);
    }
}