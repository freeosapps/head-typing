describe('Megafone', () => {
    let backupResponsiveVoiceSpeak = null;
    let responsiveVoiceSpeakSpy = null;
    beforeEach(() => {
        Megafone();
        backupResponsiveVoiceSpeak = responsiveVoice.speak;
        responsiveVoiceSpeakSpy = sinon.spy();
        responsiveVoice.speak = responsiveVoiceSpeakSpy;
    });
    afterEach(() => {
        PubSub.clearAllSubscriptions();
        responsiveVoice.speak = backupResponsiveVoiceSpeak;
    });
    let falou = (palavras) => {
        PubSub.publishSync(EVENTO.DEFICIENTE_PEDIU_PARA_FALAR, palavras);        
    };
    describe('ao falar', () => {
        it('reproduz as palavras', () => {
            falou('palavras');
            expect(responsiveVoice.speak.calledOnceWith('palavras', 'Brazilian Portuguese Female')).toBe(true);            
        });
        it('reproduz outras palavras', () => {
            falou('outras palavras');
            expect(responsiveVoice.speak.calledOnceWith('outras palavras', 'Brazilian Portuguese Female')).toBe(true);
        });
    });
});