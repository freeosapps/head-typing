describe('AuxiliarDeAnotacoes', () => {
    let anotacao = null;
    let celulaEspaco = null;
    let celulaApagarLetra = null;
    let celulaApagarPalavra = null;
    let celulaApagarTudo = null;

    beforeEach(() => {        
        AuxiliarDeAnotacoes();
        anotacao = $('<div>').addClass('anotacao__texto');
        celulaEspaco = $('<div>').html(SIMBOLO.ES_PA_CO);
        celulaApagarLetra = $('<div>').html(SIMBOLO.A_PA_GAR_LE_TRA);
        celulaApagarPalavra = $('<div>').html(SIMBOLO.A_PA_GAR_PA_LA_VRA);
        celulaApagarTudo = $('<div>').html(SIMBOLO.A_PA_GAR_TU_DO);

        $(document.body).append(anotacao).append(celulaEspaco).append(celulaApagarLetra).append(celulaApagarPalavra).append(celulaApagarTudo);
    });
    afterEach(() => {
        PubSub.clearAllSubscriptions();
        anotacao.remove();
        celulaEspaco.remove();
        celulaApagarLetra.remove();
        celulaApagarPalavra.remove();
        celulaApagarTudo.remove();
    })
    let deficienteEscolheuOSimbolo = (simbolo) => {
        PubSub.publishSync(EVENTO.DEFICIENTE_ESCOLHEU_O_SIMBOLO, simbolo);
    }
    let passaram500Milisegundos = () => {
        PubSub.publishSync(EVENTO.PASSARAM_500_MILISEGUNDOS);
    }
    describe('ao escolher o símbolo "Espaço"', () => {
        it('anota um espaço', () => {
            deficienteEscolheuOSimbolo(celulaEspaco.text());
            expect(anotacao.text()).toBe(' ');
        });
        describe('e já tiver anotação', () => {
            it('acrescenta um espaço no final', () => {
                anotacao.text('palavra');
                deficienteEscolheuOSimbolo(celulaEspaco.text());
                expect(anotacao.text()).toBe('palavra ');
            });
        });
    });
    describe('ao escolher o símbolo "."', () => {
        it('anota um ponto final', () => {
            deficienteEscolheuOSimbolo('.');
            expect(anotacao.text()).toBe('.');
        });
        describe('e já tiver anotação', () => {
            it('acrescenta um ponto final no final', () => {
                anotacao.text('palavra');
                deficienteEscolheuOSimbolo('.');
                expect(anotacao.text()).toBe('palavra.');
            });            
        });
        it('não passa palavra com "." no final para o auxiliar de sugestões', () => {
            sinon.spy(PubSub, 'publish');
            anotacao.text('primei');
            deficienteEscolheuOSimbolo('.');
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo ","', () => {
        it('anota uma vírgua', () => {
            deficienteEscolheuOSimbolo(',');
            expect(anotacao.text()).toBe(',');
        });
        describe('e já tiver anotação', () => {
            it('acrescenta uma vírgula no final', () => {
                anotacao.text('palavra');
                deficienteEscolheuOSimbolo(',');
                expect(anotacao.text()).toBe('palavra,');
            });
        });
        it('não passa palavra com "," no final para o auxiliar de sugestões', () => {
            sinon.spy(PubSub, 'publish');
            anotacao.text('primei');
            deficienteEscolheuOSimbolo(',');
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo "Apagar letra"', () => {
        it('apaga uma letra de uma palavra', () => {
            anotacao.text('palavra');
            deficienteEscolheuOSimbolo(celulaApagarLetra.text());
            expect(anotacao.text()).toBe('palavr');
        });
        it('apaga uma letra de outra palavra', () => {
            anotacao.text('outra');
            deficienteEscolheuOSimbolo(celulaApagarLetra.text());
            expect(anotacao.text()).toBe('outr');
        });
        describe('e tiver apenas uma letra', () => {
            it('passa vazio para o auxiliar de sugestões de palavras', () => {
                sinon.spy(PubSub, 'publish');
                anotacao.text('a');
                deficienteEscolheuOSimbolo(celulaApagarLetra.text());
                expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
                PubSub.publish.restore();
            });
        });
    });
    describe('ao escolher o símbolo "Apagar palavra"', () => {
        it('apaga uma palavra', () => {
            anotacao.text('palavra');
            deficienteEscolheuOSimbolo(celulaApagarPalavra.text());
            expect(anotacao.text()).toBe('');
        });
        it('apaga outra palavra', () => {
            anotacao.text('outra palavra');
            deficienteEscolheuOSimbolo(celulaApagarPalavra.text());
            expect(anotacao.text()).toBe('outra ');
        });
        it('apaga uma palavra com espaço no final', () => {
            anotacao.text('outra ');
            deficienteEscolheuOSimbolo(celulaApagarPalavra.text());
            expect(anotacao.text()).toBe('');
        });      
    });
    describe('ao passar o tempo 1 vez', () => {
        it('aponta o final do texto', () => {
            passaram500Milisegundos();
            expect(anotacao.hasClass('anotacao__texto_cursor')).toBe(true);
        });
    });
    describe('ao passar o tempo 2 vezes', () => {
        it('não aponta o final do texto', () => {
            passaram500Milisegundos();
            passaram500Milisegundos();
            expect(anotacao.hasClass('anotacao__texto_cursor')).toBe(false);
        });
    });
    describe('ao escolher uma letra', () => {
        it('anota a letra', () => {
            deficienteEscolheuOSimbolo('A');
            expect(anotacao.text()).toBe('A');
        });
        describe('e já tiver anotação', () => {
            it('acrescenta a letra no final', () => {
                anotacao.text('palavra');
                deficienteEscolheuOSimbolo('C');
                expect(anotacao.text()).toBe('palavraC');
            });            
        });
    });
    describe('ao escolher outra letra', () => {
        it('anota outra letra', () => {
            deficienteEscolheuOSimbolo('B');
            expect(anotacao.text()).toBe('B');
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
            anotacao.text('primeira segund');
            deficienteEscolheuOSimbolo('a');
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, 'segunda')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo "?"', () => {
        it('não passa palavra com "?" no final para o auxiliar de sugestões', () => {
            sinon.spy(PubSub, 'publish');
            anotacao.text('primei');
            deficienteEscolheuOSimbolo('?');
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo "!"', () => {
        it('não passa palavra com "!" no final para o auxiliar de sugestões', () => {
            sinon.spy(PubSub, 'publish');
            anotacao.text('primei');
            deficienteEscolheuOSimbolo('!');
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo "-"', () => {
        it('não passa palavra com "-" no final para o auxiliar de sugestões', () => {
            sinon.spy(PubSub, 'publish');
            anotacao.text('primei');
            deficienteEscolheuOSimbolo('-');
            expect(PubSub.publish.calledOnceWith(EVENTO.ULTIMA_PALAVRA_ANOTADA, '')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao escolher o símbolo "Apagar tudo"', () => {
        it('apaga tudo o que foi anotado', () => {
            anotacao.text('tudo o que foi anotado');
            deficienteEscolheuOSimbolo(celulaApagarTudo.text());
            expect(anotacao.text()).toBe('');
        });
    });
    xdescribe('ao escolher o símbolo "Falar"', () => {
        it('');
    });
});