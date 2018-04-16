describe('AuxiliarDeAnotacoes', () => {
    let anotacao = null;
    let textoAnotacao = null;
    let celulaEspaco = null;
    let celulaApagarLetra = null;
    let celulaApagarPalavra = null;
    let celulaApagarTudo = null;
    let espacoHtml = null;

    beforeEach(() => {
        $.fx.off = true; // Desabilita animações do jQuery
        AuxiliarDeAnotacoes();
        anotacao = $('<div>').addClass('anotacao');
        textoAnotacao = $('<span>').addClass('anotacao__texto');
        anotacao.append(textoAnotacao);
        celulaEspaco = $('<div>').html(SIMBOLO.ES_PA_CO);
        celulaApagarLetra = $('<div>').html(SIMBOLO.A_PA_GAR_LE_TRA);
        celulaApagarPalavra = $('<div>').html(SIMBOLO.A_PA_GAR_PA_LA_VRA);
        celulaApagarTudo = $('<div>').html(SIMBOLO.A_PA_GAR_TU_DO);
        espacoHtml = $('<div>').append('&nbsp;');

        $(document.body).append(anotacao).append(celulaEspaco).append(celulaApagarLetra).append(celulaApagarPalavra).append(celulaApagarTudo).append(espacoHtml);
    });
    afterEach(() => {
        PubSub.clearAllSubscriptions();
        textoAnotacao.remove();
        anotacao.remove();
        celulaEspaco.remove();
        celulaApagarLetra.remove();
        celulaApagarPalavra.remove();
        celulaApagarTudo.remove();
    })
    let deficienteEscolheuOSimbolo = (simbolo) => {
        PubSub.publishSync(EVENTO.DEFICIENTE_ESCOLHEU_O_SIMBOLO, simbolo);
    }
    describe('ao escolher o símbolo "Espaço"', () => {
        it('anota um espaço', () => {
            deficienteEscolheuOSimbolo(celulaEspaco.text());
            expect(textoAnotacao.text()).toBe(espacoHtml.text());
        });
        describe('e já tiver anotação', () => {
            it('acrescenta um espaço no final', () => {
                textoAnotacao.text('palavra');
                deficienteEscolheuOSimbolo(celulaEspaco.text());
                expect(textoAnotacao.text()).toBe(`palavra${espacoHtml.text()}`);
            });
        });
    });
    describe('ao escolher o símbolo "."', () => {
        it('anota um ponto final', () => {
            deficienteEscolheuOSimbolo(SIMBOLO.PONTO_FINAL);
            expect(textoAnotacao.text()).toBe(SIMBOLO.PONTO_FINAL);
        });
        describe('e já tiver anotação', () => {
            it('acrescenta um ponto final no final', () => {
                textoAnotacao.text('palavra');
                deficienteEscolheuOSimbolo(SIMBOLO.PONTO_FINAL);
                expect(textoAnotacao.text()).toBe('palavra.');
            });            
        });
        it('não passa palavra com "." no final para o auxiliar de sugestões', () => {
            sinon.spy(PubSub, 'publish');
            textoAnotacao.text('primei');
            deficienteEscolheuOSimbolo(SIMBOLO.PONTO_FINAL);
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo ","', () => {
        it('anota uma vírgua', () => {
            deficienteEscolheuOSimbolo(SIMBOLO.VIRGULA);
            expect(textoAnotacao.text()).toBe(SIMBOLO.VIRGULA);
        });
        describe('e já tiver anotação', () => {
            it('acrescenta uma vírgula no final', () => {
                textoAnotacao.text('palavra');
                deficienteEscolheuOSimbolo(SIMBOLO.VIRGULA);
                expect(textoAnotacao.text()).toBe('palavra,');
            });
        });
        it('não passa palavra com "," no final para o auxiliar de sugestões', () => {
            sinon.spy(PubSub, 'publish');
            textoAnotacao.text('primei');
            deficienteEscolheuOSimbolo(SIMBOLO.VIRGULA);
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo "Apagar letra"', () => {
        it('apaga uma letra de uma palavra', () => {
            textoAnotacao.text('palavra');
            deficienteEscolheuOSimbolo(celulaApagarLetra.text());
            expect(textoAnotacao.text()).toBe('palavr');
        });
        it('apaga uma letra de outra palavra', () => {
            textoAnotacao.text('outra');
            deficienteEscolheuOSimbolo(celulaApagarLetra.text());
            expect(textoAnotacao.text()).toBe('outr');
        });
        describe('e tiver apenas uma letra', () => {
            it('passa vazio para o auxiliar de sugestões de palavras', () => {
                sinon.spy(PubSub, 'publish');
                textoAnotacao.text('a');
                deficienteEscolheuOSimbolo(celulaApagarLetra.text());
                expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
                PubSub.publish.restore();
            });
        });
    });
    describe('ao escolher o símbolo "Apagar palavra"', () => {
        it('apaga uma palavra', () => {
            textoAnotacao.text('palavra');
            deficienteEscolheuOSimbolo(celulaApagarPalavra.text());
            expect(textoAnotacao.text()).toBe('');
        });
        it('apaga outra palavra', () => {
            textoAnotacao.text('outra palavra');
            deficienteEscolheuOSimbolo(celulaApagarPalavra.text());
            expect(textoAnotacao.text()).toBe('outra ');
        });
        it('apaga uma palavra com espaço no final', () => {
            textoAnotacao.text('outra ');
            deficienteEscolheuOSimbolo(celulaApagarPalavra.text());
            expect(textoAnotacao.text()).toBe('');
        });      
    });
    describe('ao escolher uma letra', () => {
        it('anota a letra', () => {
            deficienteEscolheuOSimbolo('A');
            expect(textoAnotacao.text()).toBe('A');
        });
        describe('e já tiver anotação', () => {
            it('acrescenta a letra no final', () => {
                textoAnotacao.text('palavra');
                deficienteEscolheuOSimbolo('C');
                expect(textoAnotacao.text()).toBe('palavraC');
            });            
        });
    });
    describe('ao escolher outra letra', () => {
        it('anota outra letra', () => {
            deficienteEscolheuOSimbolo('B');
            expect(textoAnotacao.text()).toBe('B');
        });
    });
    describe('ao escolher um símbolo', () => {
        it('passa a última palavra para o auxiliar de sugestões de palavras', () => {
            sinon.spy(PubSub, 'publish');
            deficienteEscolheuOSimbolo('X');
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, 'X')).toBe(true);
            PubSub.publish.restore();
        });
        it('passa outra última palavra para o auxiliar de sugestões de palavras', () => {
            sinon.spy(PubSub, 'publish');
            deficienteEscolheuOSimbolo('W');
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, 'W')).toBe(true);
            PubSub.publish.restore();
        });
        it('não passa a primeira palavra para o auxiliar de sugestões', () => {
            sinon.spy(PubSub, 'publish');
            textoAnotacao.text('primeira segund');
            deficienteEscolheuOSimbolo('a');
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, 'segunda')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo "?"', () => {
        it('não passa palavra com "?" no final para o auxiliar de sugestões', () => {
            sinon.spy(PubSub, 'publish');
            textoAnotacao.text('primei');
            deficienteEscolheuOSimbolo(SIMBOLO.INTERROGACAO);
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo "!"', () => {
        it('não passa palavra com "!" no final para o auxiliar de sugestões', () => {
            sinon.spy(PubSub, 'publish');
            textoAnotacao.text('primei');
            deficienteEscolheuOSimbolo(SIMBOLO.EXCLAMACAO);
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo "-"', () => {
        it('não passa palavra com "-" no final para o auxiliar de sugestões', () => {
            sinon.spy(PubSub, 'publish');
            textoAnotacao.text('primei');
            deficienteEscolheuOSimbolo(SIMBOLO.HIFEN);
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo "Apagar tudo"', () => {
        it('apaga tudo o que foi anotado', () => {
            textoAnotacao.text('tudo o que foi anotado');
            deficienteEscolheuOSimbolo(celulaApagarTudo.text());
            expect(textoAnotacao.text()).toBe('');
        });
    });
    describe('ao quebrar uma linha', () => {
        it('mostra o final do texto', () => {
            textoAnotacao.css({
                fontFamily: 'arial',
                fontSize: '20px',
                padding: 0,
                margin: 0,
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap'
            })
            .text('A');
            anotacao.css({
                height: '23px',
                width: '14px',
                overflowY: 'scroll'
            });
            deficienteEscolheuOSimbolo('B');
            expect(anotacao.scrollTop()).toBe(23);
        });
    });
    describe('ao quebrar duas linhas', () => {
        it('mostra o final do texto', () => {
            textoAnotacao.css({
                fontFamily: 'arial',
                fontSize: '20px',
                padding: 0,
                margin: 0,
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap'
            })
            .text('A');
            anotacao.css({
                height: '23px',
                width: '14px',
                overflowY: 'scroll'
            });
            deficienteEscolheuOSimbolo('B');
            deficienteEscolheuOSimbolo('C');
            expect(anotacao.scrollTop()).toBe(46);
        });
    });
    describe('ao quebrar uma linha com "Espaço"', () => {
        it('mostra o final do texto', () => {
            textoAnotacao.css({
                fontFamily: 'arial',
                fontSize: '20px',
                padding: 0,
                margin: 0,
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap'
            })
            .text('A');
            anotacao.css({
                height: '23px',
                width: '14px',
                overflowY: 'scroll'
            });
            deficienteEscolheuOSimbolo(SIMBOLO.ESPACO);
            expect(anotacao.scrollTop()).toBe(23);
        });
    });
    describe('ao escolher o símbolo "Falar"', () => {
        it('fala as palavras', () => {
            sinon.spy(PubSub, 'publish');
            textoAnotacao.text('palavras');
            deficienteEscolheuOSimbolo(SIMBOLO.FALAR);
            expect(PubSub.publish.calledWith(EVENTO.DEFICIENTE_PEDIU_PARA_FALAR, 'palavras')).toBe(true);
            PubSub.publish.restore();
        });
        it('fala outras palavras', () => {
            sinon.spy(PubSub, 'publish');
            textoAnotacao.text('outras palavras');
            deficienteEscolheuOSimbolo(SIMBOLO.FALAR);
            expect(PubSub.publish.calledWith(EVENTO.DEFICIENTE_PEDIU_PARA_FALAR, 'outras palavras')).toBe(true);
            PubSub.publish.restore();
        });
    });
});