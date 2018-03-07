class Placa {
    constructor() {
        this.mostrarPara = undefined;
    }
    prepararParaMostrar(onde) {
        let primeiroQuadro = $('<div>')
        .addClass('quadro')
        .addClass('quadro_apontado');

        let adicionarSimbolosALinha = (simbolos, linha, classes) => {
            simbolos.forEach((simbolo) => {
                let areaSimbolo = $('<span>');
                classes.forEach((classe) => {
                    areaSimbolo.addClass(classe);
                });
                areaSimbolo.append(simbolo);
                linha.append(areaSimbolo)
                .addClass('linha');
            });
        }

        let primeiraLinhaPrimeiroQuadro = $('<div>');                    
        adicionarSimbolosALinha(['a', 'à', 'e', 'é', 'ê'], primeiraLinhaPrimeiroQuadro, ['simbolo']);

        let segundaLinhaPrimeiroQuadro = $('<div>');
        adicionarSimbolosALinha(['o', 'ó', 's', 'r', 'i'], segundaLinhaPrimeiroQuadro, ['simbolo']);

        let terceiraLinhaPrimeiroQuadro = $('<div>');
        adicionarSimbolosALinha(['n', 'd', 'm', 'u', 't'], terceiraLinhaPrimeiroQuadro, ['simbolo']);
        
        primeiroQuadro
        .append(primeiraLinhaPrimeiroQuadro)
        .append(segundaLinhaPrimeiroQuadro)
        .append(terceiraLinhaPrimeiroQuadro);

        let segundoQuadro = $('<div>')
        .addClass('quadro');
        
        let primeiraLinhaSegundoQuadro = $('<div>');
        adicionarSimbolosALinha(['c', 'l', 'p', 'v', 'g'], primeiraLinhaSegundoQuadro, ['simbolo']);                   

        let segundaLinhaSegundoQuadro = $('<div>');
        adicionarSimbolosALinha(['h', 'q', 'b', 'f', 'z'], segundaLinhaSegundoQuadro, ['simbolo']);
        
        let terceiraLinhaSegundoQuadro = $('<div>');
        adicionarSimbolosALinha(['j', 'x', 'k', 'w', 'y'], terceiraLinhaSegundoQuadro, ['simbolo']);

        segundoQuadro
        .append(primeiraLinhaSegundoQuadro)
        .append(segundaLinhaSegundoQuadro)
        .append(terceiraLinhaSegundoQuadro);

        let terceiroQuadro = $('<div>')        
        .addClass('quadro');

        let primeiraLinhaTerceiroQuadro = $('<div>');
        adicionarSimbolosALinha(['á', 'ã', 'í', 'õ', 'ú', '<>'], primeiraLinhaTerceiroQuadro, ['simbolo', 'simbolo_pequeno']);
        
        let segundaLinhaTerceiroQuadro = $('<div>');
        adicionarSimbolosALinha(['<', '<<', '<*', '^', '.', ','], segundaLinhaTerceiroQuadro, ['simbolo', 'simbolo_pequeno']);
        
        terceiroQuadro
        .append(primeiraLinhaTerceiroQuadro)
        .append(segundaLinhaTerceiroQuadro);

        $(onde)
        .append(primeiroQuadro)
        .append(segundoQuadro)
        .append(terceiroQuadro);
    }
    apontarOProximoQuadro() {
        $('.quadro_percorrido').removeClass('quadro_percorrido');
        $('.linha_percorrida').removeClass('linha_percorrida');
        $('.linha_apontada').removeClass('linha_apontada');
        $('.simbolo_apontado').removeClass('simbolo_apontado');
        let quadros = $('.quadro');
        quadros.each((indice, quadro) => {
            if ($(quadro).hasClass('quadro_apontado')) {
                $(quadro).removeClass('quadro_apontado');
                let indiceProximoQuadro = indice + 1;
                if (indiceProximoQuadro < quadros.length) {
                    $(quadros[indiceProximoQuadro]).addClass('quadro_apontado');                    
                    $('html, body').animate({scrollTop: $(quadros[indiceProximoQuadro]).offset().top + $(quadros[indiceProximoQuadro]).height()});
                } else {
                    $(quadros[0]).addClass('quadro_apontado');
                    $('html, body').animate({scrollTop: $(quadros[0]).offset().top - 10});
                }
                return false;
            }
        });
    }
    apontarAProximaLinha() {
        $('.quadro_apontado').addClass('quadro_percorrido');
        let linhas = $(`.quadro_apontado`).find('.linha');
        if (!$('.linha_apontada').length) {
            $(linhas[0]).addClass('linha_apontada');
        } else {
            linhas.each((indice, linha) => {
                if ($(linha).hasClass('linha_apontada')) {
                    $(linha).removeClass('linha_apontada');
                    let indiceProximaLinha = indice + 1;
                    if (indiceProximaLinha < linhas.length) {
                        $(linhas[indiceProximaLinha]).addClass('linha_apontada');
                    } else {
                        $(linhas[0]).addClass('linha_apontada');
                    }
                    return false;
                }
            });
        }
    }
    apontarOProximoSimbolo() {
        $('.linha_apontada').addClass('linha_percorrida');
        let simbolos = $(`.linha_apontada`).find('.simbolo');
        if (!$('.simbolo_apontado').length) {                       
            $(simbolos[0]).addClass('simbolo_apontado');
            this.mostrarPara.mostrarUmSimbolo($(simbolos[0]).text());
        } else {
            simbolos.each((indice, simbolo) => {
                if ($(simbolo).hasClass('simbolo_apontado')) {
                    $(simbolo).removeClass('simbolo_apontado');
                    let indiceProximoSimbolo = indice + 1;                               
                    if (indiceProximoSimbolo < simbolos.length) {                                    
                        $(simbolos[indiceProximoSimbolo]).addClass('simbolo_apontado');
                        this.mostrarPara.mostrarUmSimbolo($(simbolos[indiceProximoSimbolo]).text());
                    } else {                                    
                        $(simbolos[0]).addClass('simbolo_apontado');
                        this.mostrarPara.mostrarUmSimbolo($(simbolos[0]).text());
                    }
                    return false;
                }
            });
        }
    }
    acompanharOsSimbolos(quem) {
        this.mostrarPara = quem;
    }
}