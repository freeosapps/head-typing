describe('Megafone', () => {
    let speechSynthesisUtteranceMock = null;
    let speechSynthesisSpy = null;
    let speechSynthesisBackup = null;
    beforeEach(() => {
        speechSynthesisSpeakSpy = sinon.spy();
        speechSynthesisSpeakBackup = speechSynthesis.speak;
        speechSynthesis.speak = speechSynthesisSpeakSpy;
        speechSynthesisUtteranceMock = sinon.mock(new SpeechSynthesisUtterance());
        Megafone(speechSynthesisUtteranceMock);
    });
    afterEach(() => {
        PubSub.clearAllSubscriptions();
        speechSynthesis.speak = speechSynthesisSpeakBackup;
    });
    let falou = (palavras) => {
        PubSub.publishSync(EVENTO.DEFICIENTE_PEDIU_PARA_FALAR, palavras);        
    };
    describe('ao falar', () => {
        it('reproduz o que for dito', () => {
            falou('dito');
            expect(speechSynthesis.speak.calledOnceWith(speechSynthesisUtteranceMock)).toBe(true);            
        });
        it('reproduz as palavras', () => {
            falou('palavras');
            expect(speechSynthesisUtteranceMock.text).toBe('palavras');
        });
        it('reproduz outras palavras', () => {
            falou('outras palavras');
            expect(speechSynthesisUtteranceMock.text).toBe('outras palavras');
        });
        it('reproduz as palavras em português do Brasil', () => {
            falou('palavras');
            expect(speechSynthesisUtteranceMock.lang).toBe('pt-BR');
        });
    });
});