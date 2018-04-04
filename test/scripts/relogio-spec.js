describe('Relogio', () => {
    beforeEach(() => {
        jasmine.clock().install();
    });
    afterEach(() => {
        jasmine.clock().uninstall();
        PubSub.clearAllSubscriptions();
    });
    describe('ao passar 500 milisegundos', () => {
        it('avisa', () => {
            let passaram500MilisegundosSpy = sinon.spy();
            PubSub.subscribe('passaram500Milisegundos', passaram500MilisegundosSpy);
            Relogio(500);
            jasmine.clock().tick(501);
            expect(passaram500MilisegundosSpy.calledOnce).toBe(true);
        });
    });
    describe('antes de passar 500 milisegundos', () => {
        it('não avisa', () => {
            let passaram500MilisegundosSpy = sinon.spy();
            PubSub.subscribe('passaram500Milisegundos', passaram500MilisegundosSpy);
            Relogio(500);            
            jasmine.clock().tick(499);
            expect(passaram500MilisegundosSpy.calledOnce).toBe(false);
        });
    });
    describe('ao passar 1500 milisegundos', () => {
        it('avisa', () => {
            let passaram1500MilisegundosSpy = sinon.spy();
            PubSub.subscribe('passaram1500Milisegundos', passaram1500MilisegundosSpy);
            Relogio(1500);
            jasmine.clock().tick(1501);
            expect(passaram1500MilisegundosSpy.calledOnce).toBe(true);
        });
        describe('e depois passar mais 1500 milisegundos', () => {
            it('avisa 2 vezes', () => {
                let passaram1500MilisegundosSpy = sinon.spy();
                PubSub.subscribe('passaram1500Milisegundos', passaram1500MilisegundosSpy);
                Relogio(1500);
                jasmine.clock().tick(1501);
                jasmine.clock().tick(1501);
                expect(passaram1500MilisegundosSpy.calledTwice).toBe(true);
            });
        });
    });
});