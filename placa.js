class Placa {
    constructor(letrasMaiusculas) {
        this._letrasMaiusculas = letrasMaiusculas;
    }
    prepararParaMostrar(onde) {
        let primeiroQuadro = $('<div>')
        .addClass('quadro');

        let adicionarSimbolosALinha = (simbolos, linha, classes) => {
            simbolos.forEach((simbolo) => {
                let areaSimbolo = $('<span>');
                classes.forEach((classe) => {
                    areaSimbolo.addClass(classe);
                });
                if (this._letrasMaiusculas) {
                    areaSimbolo.append(simbolo.toUpperCase());
                } else {
                    areaSimbolo.append(simbolo);
                }
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
        let simboloMaiusculasOuMinusculas = undefined;
        if (this._letrasMaiusculas) {
            simboloMaiusculasOuMinusculas = '..';
        } else {
            simboloMaiusculasOuMinusculas = '::';
        }
        adicionarSimbolosALinha(['<', '<<', '<*', simboloMaiusculasOuMinusculas, '.', ','], segundaLinhaTerceiroQuadro, ['simbolo', 'simbolo_pequeno']);
        
        terceiroQuadro
        .append(primeiraLinhaTerceiroQuadro)
        .append(segundaLinhaTerceiroQuadro);

        $(onde)
        .append(primeiroQuadro)
        .append(segundoQuadro)
        .append(terceiroQuadro);
    }
    verOProximoQuadro(quem, areaAtual) {
        let quadros = $('.quadro');
        let proximoQuadro = null;
        quadros.each((indice, quadro) => {
           if ($(quadro).offset().top > $(areaAtual).offset().top) {
               proximoQuadro = $(quadro);
               return false;
           }
        });
        if (proximoQuadro == null) {
            proximoQuadro = $(quadros[0]);
        }
        quem.mostrarOProximoQuadro(proximoQuadro);
    }
    verAProximaLinha(quem, areaAtual) {
        let quadros = $('.quadro');
        let quadroAtual = null;
        quadros.each((indice, quadro) => {
           if (($(quadro).offset().top <= $(areaAtual).offset().top) &&
               ($(quadro).offset().left <= $(areaAtual).offset().left) &&
               ($(quadro).offset().left + $(quadro).width() >= $(areaAtual).offset().left + $(areaAtual).width()) &&
               ($(quadro).offset().top + $(quadro).height() >= $(areaAtual).offset().top + $(areaAtual).height())) {
               quadroAtual = $(quadro); 
               return false;
           }
        });
        let linhas = quadroAtual.find('.linha');
        let proximaLinha = null;
        linhas.each((indice, linha) => {
            if (($(linha).offset().top > $(areaAtual).offset().top) || ($(linha).offset().top >= $(areaAtual).offset().top && $(linha).offset().top + $(linha).height() < $(areaAtual).offset().top + $(areaAtual).height())) {
                proximaLinha = $(linha);
                return false;
            }
        });
        if (proximaLinha == null) {
            proximaLinha = $(linhas[0]);
        }
        quem.mostrarAProximaLinha(proximaLinha);
    }
    verOProximoSimbolo(quem, areaAtual) {
        let linhas = $('.linha');
        let linhaAtual = null;
        linhas.each((indice, linha) => {
           if (($(linha).offset().top <= $(areaAtual).offset().top) &&
               ($(linha).offset().left <= $(areaAtual).offset().left) &&
               ($(linha).offset().left + $(linha).width() >= $(areaAtual).offset().left + $(areaAtual).width()) &&
               ($(linha).offset().top + $(linha).height() >= $(areaAtual).offset().top + $(areaAtual).height())) {
               linhaAtual = $(linha); 
               return false;
           }
        });
        let simbolos = linhaAtual.find('.simbolo');
        let proximoSimbolo = null;
        simbolos.each((indice, simbolo) => {
            if (($(simbolo).offset().left > $(areaAtual).offset().left) || ($(simbolo).offset().left >= $(areaAtual).offset().left && $(simbolo).offset().left + $(simbolo).width() < $(areaAtual).offset().left + $(areaAtual).width())) {
                proximoSimbolo = $(simbolo);
                return false;
            }
        });
        if (proximoSimbolo == null) {
            proximoSimbolo = $(simbolos[0]);
        }
        quem.mostrarOProximoSimbolo(proximoSimbolo, proximoSimbolo.text());
    }
}
