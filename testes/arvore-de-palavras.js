describe('ArvoreDePalavras', () => {
    describe('com 10 palavras e sem prefixo', () => {
        let arvoreDePalavras = null;
        beforeEach(() => {                       
            $('#wordlist-a').prop('id', 'wordlist');
            arvoreDePalavras = new ArvoreDePalavras();
        });

        afterEach(() => {
            $('#wordlist').prop('id', 'wordlist-a');
        });
        
        it('possui raiz', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('') instanceof Array).toBe(true);
        });

        it('possui raiz com 6 elementos', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('').length).toBe(6);
        });

        it('possui raiz com a letra "d" como primeira letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[0]).toBe('d');
        });

        it('possui raiz com a letra "e" como segunda letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[1]).toBe('e');
        });

        it('possui raiz com a letra "a" como terceira letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[2]).toBe('a');
        });
    });
    describe('com 5 palavras e sem prefixo', () => {
        let arvoreDePalavras = null;
        beforeEach(() => {
            $('#wordlist-b').prop('id', 'wordlist');
            arvoreDePalavras = new ArvoreDePalavras();
        });

        afterEach(() => {
            $('#wordlist').prop('id', 'wordlist-b');
        });

        it('possui raiz com a letra "q" como primeira letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[0]).toBe('q');
        });

        it('possui raiz com a letra "u" como segunda letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[1]).toBe('u');
        });

        it('possui raiz com a letra "o" como terceira letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[2]).toBe('o');
        });
    });
    describe('com 3 palavras e com prefixo', () => {
        let arvoreDePalavras = null;
        beforeEach(() => {
            $('#wordlist-c').prop('id', 'wordlist');
            arvoreDePalavras = new ArvoreDePalavras();
        });

        afterEach(() => {
            $('#wordlist').prop('id', 'wordlist-c');
        });

        it('possui raiz com a palavra "co"', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('c')[0]).toBe('o');
        });

        it('possui raiz com a palavra "um"', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('u')[0]).toBe('m');
        });

        it('possui raiz com a palavra "com"', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('co')[0]).toBe('m');
        });
    });
});