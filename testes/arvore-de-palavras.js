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

        it('possui raiz com a letra "D" como primeira letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[0]).toBe('D');
        });

        it('possui raiz com a letra "E" como segunda letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[1]).toBe('E');
        });

        it('possui raiz com a letra "A" como terceira letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[2]).toBe('A');
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

        it('possui raiz com a letra "Q" como primeira letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[0]).toBe('Q');
        });

        it('possui raiz com a letra "U" como segunda letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[1]).toBe('U');
        });

        it('possui raiz com a letra "O" como terceira letra', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[2]).toBe('O');
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

        it('possui raiz com a palavra "CO"', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('C')[0]).toBe('O');
        });

        it('possui raiz com a palavra "UM"', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('U')[0]).toBe('M');
        });

        it('possui raiz com a palavra "COM"', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('CO')[0]).toBe('M');
        });
    });
    describe('com 3 palavras e com espaço', () => {
        let arvoreDePalavras = null;
        beforeEach(() => {
            $('#wordlist-d').prop('id', 'wordlist');
            arvoreDePalavras = new ArvoreDePalavras();
        });

        afterEach(() => {
            $('#wordlist').prop('id', 'wordlist-d');
        });

        it('não considera espaço', () => {
            expect(arvoreDePalavras.quaisAsProximasLetras('')[2]).toBe('D');
        });
    });
});