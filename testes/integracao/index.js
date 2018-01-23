describe('enquanto está anotando', () => {
    let localizacaoDasLetras = null;
    let localizacaoDaAnotacao = null;

    beforeEach(() => {
        localizacaoDasLetras = $('<div>');
        localizacaoDaAnotacao = $('<div>');
    });
    afterEach(() => {
    });

    it('não permite anotar mais letras', (done) => {
        let auxiliarDeComunicacao = new AuxiliarDeComunicacao();
        auxiliarDeComunicacao.mostreMeOQueFoiAnotado(localizacaoDaAnotacao);
        auxiliarDeComunicacao.mostreMeAsProximasLetras(localizacaoDasLetras);

        let gesto = new Gesto();
        auxiliarDeComunicacao.anoteEstaLetra();
        auxiliarDeComunicacao.anoteEstaLetra();
        
        setTimeout(() => {
            expect(localizacaoDaAnotacao.text().length).toBe(1);
            done();
        }, 2000);        
    });
});