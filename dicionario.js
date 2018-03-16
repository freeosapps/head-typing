let Dicionario = function(palavras) {
    let pesquisarSufixos = (prefixo) => {
        let regex = new RegExp(`\\n${prefixo}.{2,}\\n`, 'g');
        let encontradas = palavras.match(regex);
        if (!encontradas) {
            encontradas = [];
        }
        return encontradas.map((palavra) => {
            let sufixo = palavra.replace(/\n/g, '')
            sufixo = sufixo.slice(prefixo.length, sufixo.length);
            return sufixo;
        });
    }
    this.pesquisarSufixos = (prefixo) => {
        return pesquisarSufixos(prefixo);
    }
}