class AuxiliarDeComunicacao {
    constructor() {
        this.arvoreDePalavras = new ArvoreDePalavras();
        this.cronometro = new Cronometro();
        this.anotacao = '';
        this.anotando = false;
        this.conteinerProximasLetras = $('<div>');
        this.conteinerProximasLetras.css({
            'backgroundColor': 'white',
            'fontFamily': 'arial',
            'fontSize': '14pt',
            'padding': '10px',
            'borderStyle': 'solid',
            'borderWidth': '1px',
            'borderRadius': '5px',
            'borderColor': 'gray',
            'boxShadow': '0 0 5px'
        });
        this.conteinerAnotacao = $('<div>');
        this.conteinerAnotacao.css({
            'fontFamily': 'arial',
            'fontSize': '12pt',
            'textDecoration': 'underline'
        });
        this.proximasLetras = this._quaisAsProximasLetras('');
        this._mostrarAsProximasLetras();
        this.avanceUmaLetra = () => {       
            this._moverLetraInicialParaOFinal();            
            this.anotando = false;
        };        
    }
    _mostrarAsProximasLetras() {
        this.conteinerProximasLetras.empty();
        this.proximasLetras.forEach((proximaLetra) => {
            let conteinerProximaLetra = $('<span>');
            conteinerProximaLetra.css({
                'borderRadius': '50px',
                'textAlign': 'center',
                'lineHeight': '40px',
                'height': '40px',
                'width': '40px',
                'display': 'inline-block',
                'overflow': 'hidden'
            });
            conteinerProximaLetra.text(proximaLetra);
            this.conteinerProximasLetras.append(conteinerProximaLetra);
        });       
        $(this.conteinerProximasLetras.children()[0]).css({
            'boxShadow': '0 0 5px',
            'color': 'maroon',
            'fontWeight': 'bold',
            'backgroundColor': 'lightgoldenrodyellow',
            'fontSize': '14pt'
        });
    }
    _moverLetraInicialParaOFinal() {
        let letraInicial = $(this.conteinerProximasLetras.children()[0]);
        letraInicial.animate({'width': 'toggle', 'height': 'toggle', 'opacity': 'toggle'}, 1000, 'swing', () => {
            letraInicial.css({
                'boxShadow': 'none',
                'color': 'black',
                'backgroundColor': 'transparent',
                'fontSize': '14pt',
                'fontWeight': 'normal'
            });
            letraInicial.remove();            
            this.conteinerProximasLetras.append(letraInicial);
            letraInicial.css({'display': 'inline-block'});
            $(this.conteinerProximasLetras.children()[0]).css({
                'boxShadow': '0 0 5px',
                'color': 'maroon',
                'fontWeight': 'bold',
                'backgroundColor': 'lightgoldenrodyellow',
                'fontSize': '14pt'
            });
            this.proximasLetras.push(this.proximasLetras.shift());
            this.cronometro.meAviseAposOTempo(this.avanceUmaLetra, 1000);
        });        
    }
    _quaisAsProximasLetras(prefixo) {
        return ['.', '→', '←'].concat(this.arvoreDePalavras.quaisAsProximasLetras(prefixo));
    }
    anoteEstaLetra() {
        if (!this.anotando) {
            this.anotando = true;
            if (this.proximasLetras[0] == '←') {
                this.anotacao = this.anotacao.substring(0, this.anotacao.length - 1);
            } else if (this.proximasLetras[0] == '→') {
                this.anotacao += ' ';
            } else {
                this.anotacao += this.proximasLetras[0];
            }
            this.conteinerAnotacao.empty();
            this.conteinerAnotacao.append(this.anotacao);
            let partes = this.anotacao.split(' ');
            this.proximasLetras = this._quaisAsProximasLetras(partes[partes.length - 1]);
            this._mostrarAsProximasLetras();
        }        
    }
    mostreMeAsProximasLetras(aqui) {
        aqui.append(this.conteinerProximasLetras);
        this.cronometro.meAviseAposOTempo(this.avanceUmaLetra, 1000);
    }
    mostreMeOQueFoiAnotado(aqui) {
        aqui.append(this.conteinerAnotacao);
    }
}