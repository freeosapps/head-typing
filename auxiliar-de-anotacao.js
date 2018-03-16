let AuxiliarDeAnotacao = function(ponteiro, dicionario, placa, sugestoesDePalavras, relogio1, relogio2, anotacao) {
    let permitirTrocaDeArea = true;
    let percorrendoQuadros = false;
    let percorrendoLinhas = false;
    let elementoAtual = null;
    let maiusculas = false;
    let acentuadas = false; 

    let percorrerAreas = (elementos) => {
        let arrayElementos = elementos.toArray();
        relogio1.parar();
        relogio1.acompanharOTempo(1500, () => {
            elementoAtual = $(arrayElementos.shift());
            ponteiro.exibir();
            ponteiro.posicionarSobre(elementoAtual);
            arrayElementos.push(elementoAtual[0]);
            permitirTrocaDeArea = true;
        });
    }

    let percorrerQuadros = () => {
        let quadros = placa.listarQuadrosVisiveis();
        percorrerAreas(quadros);
        percorrendoQuadros = true;
    }

    let sugerirPalavras = () => {
        sugestoesDePalavras.limpar();
        ponteiro.ocultar();
        let prefixo = anotacao.copiarUltimaPalavraAnotada();
        let sufixos = dicionario.pesquisarSufixos(prefixo);
        if (sufixos.length) {
            sugestoesDePalavras.anotar(sufixos);
        }
    }

    let trocarParaQuadros = () => {
        percorrerQuadros();
    }

    let trocarParaLinhas = () => {
        percorrendoQuadros = false;
        percorrendoLinhas = true;
        let linhas = placa.listarLinhas(elementoAtual);
        if (linhas.length == 1) {
            elementoAtual = $(linhas[0]);
            percorrendoLinhas = false;
            let celulas = placa.listarCelulas(elementoAtual);
            if (celulas.length == 1) {
                percorrendoQuadros = true;
                anotacao.anotar($(celulas[0].text()));
            } else {
                percorrerAreas(celulas);
            }
        } else {
            percorrerAreas(linhas);
        }
    }

    let trocarParaCelulas = () => {
        percorrendoLinhas = false;
        let celulas = placa.listarCelulas(elementoAtual);
        percorrerAreas(celulas);
    }

    let executarSimbolo = () => {
        switch (elementoAtual.text()) {
            case 'Espaço':
                anotacao.anotar(' ');
                sugerirPalavras();
            break;
            case 'Apagar letra':
                anotacao.apagarLetra();                
                sugerirPalavras();
            break;
            case 'Apagar palavra':
                alterarAnotacao($('.anotacao__texto').text().replace(/[^|\s][^\s]*$/, ''));
                sugerirPalavras();
            break;
            case 'Acentuadas':
                acentuadas = true;
                ponteiro.ocultar();
                placa.exibirQuadrosDeAcentuadas(maiusculas);                
            break;
            case 'Não acentuadas':
                acentuadas = false;
                ponteiro.ocultar();
                placa.exibirQuadrosDeNaoAcentuadas(maiusculas);                
            break;
            case 'Maiúsculas':
                maiusculas = true;
                ponteiro.ocultar();
                placa.exibirQuadrosDeMaiusculas(acentuadas);                
            break;
            case 'Minúsculas':
                maiusculas = false;
                ponteiro.ocultar();
                placa.exibirQuadrosDeMinusculas(acentuadas);                
            break;
            case 'Ponto final':
                anotacao.anotar('.');
                sugerirPalavras();
            break;
            case 'Vírgula':
                anotacao.anotar(',');
                sugerirPalavras();
            break;
            case 'Falar e apagar tudo':
                SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance ||
                        window.mozSpeechSynthesisUtterance ||
                        window.msSpeechSynthesisUtterance ||
                        window.oSpeechSynthesisUtterance ||
                        window.SpeechSynthesisUtterance;
                
                speech = new SpeechSynthesisUtterance();
                speech.text = $('.anotacao__texto').text();
                speech.rate = .5;
                speech.lang = 'pt-BR';
                speechSynthesis.speak(speech); 
                anotacao.limpar();
                sugerirPalavras();
            break;
            case 'Continuar':
                // Não faz nada.
            break;
            default:
                throw 'Símbolo desconhecido';
            break;
        } 
    }

    let executarLetraOuSimbolo = () => {
        if (elementoAtual.hasClass('celula_descrita')) {
            executarSimbolo();
        } else {
            anotacao.anotar(elementoAtual.text());
            sugerirPalavras();
        }
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

    this.gesticular = () => {
        trocarAreaPercorrida();
    }

    this.comecar = () => {
        sugerirPalavras();
        percorrerQuadros();
        relogio2.acompanharOTempo(500, () => {
            anotacao.apontarFinalDoTexto();
        });
    }

    this.parar = () => {
        ponteiro.ocultar();
        relogio1.parar();
        relogio2.parar();
    }
}