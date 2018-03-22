describe('AuxiliarDeAnotacoes', () => {
    let anotacao = null;
    let auxiliarDeAnotacoes = null;
    beforeEach(() => {
        auxiliarDeAnotacoes = new AuxiliarDeAnotacoes(null);
        anotacao = $('<div>').addClass('anotacao__texto');
        $(document.body).append(anotacao);
    });
    afterEach(() => {
        anotacao.remove();
    })
    describe('ao escolher o símbolo "Espaço"', () => {
        it('anota um espaço', () => {
            auxiliarDeAnotacoes.escolheuSimbolo('Espaço');
            expect(anotacao.text()).toBe(' ');
        });
        describe('e já tiver anotação', () => {
            it('acrescenta um espaço no final', () => {
                anotacao.text('palavra');
                auxiliarDeAnotacoes.escolheuSimbolo('Espaço');
                expect(anotacao.text()).toBe('palavra ');
            });
        });
    });
    describe('ao escolher o símbolo "Ponto final"', () => {
        it('anota um ponto final', () => {
            auxiliarDeAnotacoes.escolheuSimbolo('Ponto final');
            expect(anotacao.text()).toBe('.');
        });
        describe('e já tiver anotação', () => {
            it('acrescenta um ponto final no final', () => {
                anotacao.text('palavra');
                auxiliarDeAnotacoes.escolheuSimbolo('Ponto final');
                expect(anotacao.text()).toBe('palavra.');
            });            
        });
    });
    describe('ao escolher o símbolo "Vírgula"', () => {
        it('anota uma vírgua', () => {
            auxiliarDeAnotacoes.escolheuSimbolo('Vírgula');
            expect(anotacao.text()).toBe(',');
        });
        describe('e já tiver anotação', () => {
            it('acrescenta uma vírgula no final', () => {
                anotacao.text('palavra');
                auxiliarDeAnotacoes.escolheuSimbolo('Vírgula');
                expect(anotacao.text()).toBe('palavra,');
            });
        });
    });
    describe('ao escolher o símbolo "Apagar letra"', () => {
        it('apaga uma letra de uma palavra', () => {
            anotacao.text('palavra');
            auxiliarDeAnotacoes.escolheuSimbolo('Apagar letra');
            expect(anotacao.text()).toBe('palavr');
        });
        it('apaga uma letra de outra palavra', () => {
            anotacao.text('outra');
            auxiliarDeAnotacoes.escolheuSimbolo('Apagar letra');
            expect(anotacao.text()).toBe('outr');
        });
    });
    describe('ao escolher o símbolo "Apagar palavra"', () => {
        it('apaga uma palavra', () => {
            anotacao.text('palavra');
            auxiliarDeAnotacoes.escolheuSimbolo('Apagar palavra');
            expect(anotacao.text()).toBe('');
        });
        it('apaga outra palavra', () => {
            anotacao.text('outra palavra');
            auxiliarDeAnotacoes.escolheuSimbolo('Apagar palavra');
            expect(anotacao.text()).toBe('outra ');
        });
        it('apaga uma palavra com espaço no final', () => {
            anotacao.text('outra ');
            auxiliarDeAnotacoes.escolheuSimbolo('Apagar palavra');
            expect(anotacao.text()).toBe('');
        });      
    });
    describe('ao passar o tempo 1 vez', () => {
        it('aponta o final do texto', () => {
            auxiliarDeAnotacoes.tempoPassou();
            expect(anotacao.hasClass('anotacao__texto_cursor')).toBe(true);
        });
    });
    describe('ao passar o tempo 2 vezes', () => {
        it('não aponta o final do texto', () => {
            auxiliarDeAnotacoes.tempoPassou();
            auxiliarDeAnotacoes.tempoPassou();
            expect(anotacao.hasClass('anotacao__texto_cursor')).toBe(false);
        });
    });
    describe('ao escolher uma letra', () => {
        it('anota a letra', () => {
            auxiliarDeAnotacoes.escolheuSimbolo('A');
            expect(anotacao.text()).toBe('A');
        });
        describe('e já tiver anotação', () => {
            it('acrescenta a letra no final', () => {
                anotacao.text('palavra');
                auxiliarDeAnotacoes.escolheuSimbolo('C');
                expect(anotacao.text()).toBe('palavraC');
            });            
        });
    });
    describe('ao escolher outra letra', () => {
        it('anota outra letra', () => {
            auxiliarDeAnotacoes.escolheuSimbolo('B');
            expect(anotacao.text()).toBe('B');
        });
    });
});