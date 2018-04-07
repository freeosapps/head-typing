describe('AuxiliarDeSugestoesDePalavras', () => {
    beforeEach(() => {
        let dicionario = '\nde\ndo\nem\numa\ncom\nse\npara\nos\na';
        AuxiliarDeSugestoesDePalavras(dicionario);
    });
    afterEach(() => {
        PubSub.clearAllSubscriptions();
    });
    let ultimaPalavraAnotada = (palavra) => {
        PubSub.publishSync(EVENTO.ULTIMA_PALAVRA_ANOTADA, palavra);
    }
    describe('ao anotar a palavra ""', () => {
        it('sugere todas as palavras do dicionário', () => {
            sinon.spy(PubSub, 'publish');
            ultimaPalavraAnotada('');
            expect(PubSub.publish.calledWith(EVENTO.PALAVRAS_SUGERIDAS, ['de', 'do', 'em', 'uma', 'com', 'se', 'para', 'os', 'a'])).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao anotar a palavara "d"', () => {
        it('sugere as palavras com prefixo "d"', () => {
            sinon.spy(PubSub, 'publish');
            ultimaPalavraAnotada('d');
            expect(PubSub.publish.calledWith(EVENTO.PALAVRAS_SUGERIDAS, ['e', 'o'])).toBe(true);
            PubSub.publish.restore();
        });
        it('não sugere outras palavras', () => {
            sinon.spy(PubSub, 'publish');
            ultimaPalavraAnotada('d');
            expect(PubSub.publish.calledWith(EVENTO.PALAVRAS_SUGERIDAS, ['de', 'do', 'em', 'uma', 'com', 'se', 'para', 'os', 'a'])).toBe(false);
            PubSub.publish.restore();
        });
    });    
    describe('ao anotar a palavra "o"', () => {
        it('sugere as palavras com prefixo "o"', () => {
            sinon.spy(PubSub, 'publish');
            ultimaPalavraAnotada('o');
            expect(PubSub.publish.calledWith(EVENTO.PALAVRAS_SUGERIDAS, ['s'])).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao anotar uma palavra que não existe no dicionário', () => {
        it('sugere uma lista sem palavras', () => {
            sinon.spy(PubSub, 'publish');
            ultimaPalavraAnotada('x');
            expect(PubSub.publish.calledWith(EVENTO.PALAVRAS_SUGERIDAS, [])).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao anotar uma palavra de uma letra só', () => {
        it('não sugere vazio', () => {
            sinon.spy(PubSub, 'publish');
            ultimaPalavraAnotada('a');
            expect(PubSub.publish.calledWith(EVENTO.PALAVRAS_SUGERIDAS, [''])).toBe(false);
            PubSub.publish.restore();
        });
    });
});