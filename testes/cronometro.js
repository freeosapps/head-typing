describe('Cronometro', () => {
    let cronometro = null;
    let clock = null;
    beforeAll(() => {
        cronometro = new Cronometro();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
        clock = sinon.useFakeTimers();        
    });
    afterAll(() => {
        clock.restore();
    });
    describe('ao finalizar o tempo informado', () => {
        it('avisa', () => {
            let aviso = sinon.spy();
            cronometro.meAviseAposOTempo(aviso, 1000);
            clock.tick(1001);
            expect(aviso.calledOnce).toBe(true);
        });
    });
    describe('bem antes de finalizar o tempo informado', () => {
        it('não avisa', () => {
            let aviso = sinon.spy();
            cronometro.meAviseAposOTempo(aviso, 1000);
            clock.tick(500);
            expect(aviso.called).toBe(false);
        });
    });
    describe('logo antes de finalizar o tempo informado', () => {
        it('não avisa', () => {
            let aviso = sinon.spy();
            cronometro.meAviseAposOTempo(aviso, 1000);
            clock.tick(951);
            expect(aviso.called).toBe(false);
        });
    });    
    describe('ao finalizar outro tempo informado', () => {
        it('avisa', () => {
            let aviso = sinon.spy();
            cronometro.meAviseAposOTempo(aviso, 321);
            clock.tick(322);
            expect(aviso.calledOnce).toBe(true);
        });
    });
    describe('logo ao iniciar a contagem', () => {
        it('indica que a contagem está em andamento', () => {
            let aviso = sinon.stub();
            cronometro.meAviseAposOTempo(aviso, 500);
            expect(cronometro.parado()).toBe(false);
        });
    });
    describe('após finalizar a contagem', () => {
        it('indica que a contagem não está em andamento', () => {
            let aviso = sinon.stub();
            cronometro.meAviseAposOTempo(aviso, 500);
            clock.tick(501);
            expect(cronometro.parado()).toBe(true);
        });
    });
    describe('após reiniciar a contagem', () => {
        it('indica que a contagem está em andamento', () => {
            let aviso = sinon.stub();
            cronometro.meAviseAposOTempo(aviso, 500);
            clock.tick(501);
            cronometro.meAviseAposOTempo(aviso, 500);
            expect(cronometro.parado()).toBe(false);
        });
    });
});