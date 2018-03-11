class Placa {
    constructor(letrasMaiusculas, letrasAcentuadas) {
        this._letrasMaiusculas = letrasMaiusculas;
        this._letrasAcentuadas = letrasAcentuadas;
    }
    prepararParaMostrar(onde) {

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

        if (this._letrasAcentuadas) {
            let primeiroQuadro = $('<div>')
            .addClass('quadro');

            let primeiraLinhaPrimeiroQuadro = $('<div>');                    
            adicionarSimbolosALinha(['á', 'ã', 'à', 'é', 'ê'], primeiraLinhaPrimeiroQuadro, ['simbolo', 'simbolo_pequeno']);

            let segundaLinhaPrimeiroQuadro = $('<div>');
            adicionarSimbolosALinha(['í', 'ó', 'õ', 'ô', 'ú'], segundaLinhaPrimeiroQuadro, ['simbolo', 'simbolo_pequeno']);

            primeiroQuadro
            .append(primeiraLinhaPrimeiroQuadro)
            .append(segundaLinhaPrimeiroQuadro);

            let segundoQuadro = $('<div>')        
            .addClass('quadro');

            let simboloMaiusculasOuMinusculas = undefined;
            if (this._letrasMaiusculas) {
                simboloMaiusculasOuMinusculas = '..';
            } else {
                simboloMaiusculasOuMinusculas = '::';
            }
            let primeiraLinhaSegundoQuadro = $('<div>');
            adicionarSimbolosALinha(['<>', '<', '<<', '<*'], primeiraLinhaSegundoQuadro, ['simbolo']);
            
            let segundaLinhaSegundoQuadro = $('<div>');
            adicionarSimbolosALinha([simboloMaiusculasOuMinusculas, '.', ',', '><'], segundaLinhaSegundoQuadro, ['simbolo']);

            segundoQuadro
            .append(primeiraLinhaSegundoQuadro)
            .append(segundaLinhaSegundoQuadro);

            $(onde)
            .append(primeiroQuadro)
            .append(segundoQuadro);
        } else {
            let primeiroQuadro = $('<div>')
            .addClass('quadro');

            let primeiraLinhaPrimeiroQuadro = $('<div>');                    
            adicionarSimbolosALinha(['a', 'e', 'o', 's', 'r'], primeiraLinhaPrimeiroQuadro, ['simbolo', 'simbolo_pequeno']);

            let segundaLinhaPrimeiroQuadro = $('<div>');
            adicionarSimbolosALinha(['i', 'n', 'd', 'm', 'u'], segundaLinhaPrimeiroQuadro, ['simbolo', 'simbolo_pequeno']);

            primeiroQuadro
            .append(primeiraLinhaPrimeiroQuadro)
            .append(segundaLinhaPrimeiroQuadro);

            let segundoQuadro = $('<div>')
            .addClass('quadro');
            
            let primeiraLinhaSegundoQuadro = $('<div>');
            adicionarSimbolosALinha(['t', 'c', 'l', 'p'], primeiraLinhaSegundoQuadro, ['simbolo']);                   

            let segundaLinhaSegundoQuadro = $('<div>');
            adicionarSimbolosALinha(['v', 'g', 'h', 'q'], segundaLinhaSegundoQuadro, ['simbolo']);
            
            let terceiraLinhaSegundoQuadro = $('<div>');
            adicionarSimbolosALinha(['b', 'f', 'z', 'j'], terceiraLinhaSegundoQuadro, ['simbolo']);

            let quartaLinhaSegundoQuadro = $('<div>');
            adicionarSimbolosALinha(['x', 'k', 'w', 'y'], quartaLinhaSegundoQuadro, ['simbolo']);

            segundoQuadro
            .append(primeiraLinhaSegundoQuadro)
            .append(segundaLinhaSegundoQuadro)
            .append(terceiraLinhaSegundoQuadro)
            .append(quartaLinhaSegundoQuadro);

            let terceiroQuadro = $('<div>')        
            .addClass('quadro');

            let simboloMaiusculasOuMinusculas = undefined;
            if (this._letrasMaiusculas) {
                simboloMaiusculasOuMinusculas = '..';
            } else {
                simboloMaiusculasOuMinusculas = '::';
            }
            let primeiraLinhaTerceiroQuadro = $('<div>');
            adicionarSimbolosALinha(['<>', '<', '<<', '<*'], primeiraLinhaTerceiroQuadro, ['simbolo']);
            
            let segundaLinhaTerceiroQuadro = $('<div>');
            adicionarSimbolosALinha([simboloMaiusculasOuMinusculas, '.', ',', '><'], segundaLinhaTerceiroQuadro, ['simbolo']);

            terceiroQuadro
            .append(primeiraLinhaTerceiroQuadro)
            .append(segundaLinhaTerceiroQuadro);

            $(onde)
            .append(primeiroQuadro)
            .append(segundoQuadro)
            .append(terceiroQuadro);
        }
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
