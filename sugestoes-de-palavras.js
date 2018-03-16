let SugestoesDePalavras = function() {
    let criarLinhaDeSugestoes = (sufixos, linha) => {
        for (let i = 0; i < 4; i++) {
            let celula = $('<td>');
            if (sufixos[i]) {
                celula.addClass('celula').text(sufixos[i]);
            }
            linha.append(celula);
        } 
        if (sufixos.length) {
            let celula = $('<td>').addClass('celula').addClass('celula_descrita').text('Continuar');
            linha.append(celula);
        }
    }

    let criarQuadroDeSugestoes = (sufixos) => { 
        let sugestoes = sufixos.slice(0, Math.min(8, sufixos.length));
        let sugestoesLinha1 = sugestoes.slice(0, 4);
        let sugestoesLinha2 = sugestoes.slice(4, 8);
        let quadro = $('<table>').addClass('quadro');
        let linha1 = $('<tr>').addClass('linha');
        let linha2 = $('<tr>').addClass('linha');
        if (sugestoesLinha1.length) {
            quadro.append(linha1);
            if (sugestoesLinha2.length) {
                quadro.append(linha2);
            }
        }
        if (sugestoesLinha1.length) {
            criarLinhaDeSugestoes(sugestoesLinha1, linha1);
        }
        if (sugestoesLinha2.length) {
            criarLinhaDeSugestoes(sugestoesLinha2, linha2);
        }
        return quadro;
    }

    this.anotar = (sufixos) => {
        let quadroSugestoes = criarQuadroDeSugestoes(sufixos);
        $('.sugestoes').append(quadroSugestoes);
    }

    this.limpar = () => {
        $('.sugestoes').empty();
    }
}