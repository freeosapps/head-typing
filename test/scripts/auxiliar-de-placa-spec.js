describe('AuxiliarDePlaca', () => {
    let quadroA = null;
    let quadroB = null;
    let quadroC = null;
    let linhaAQuadroA = null;
    let linhaBQuadroA = null;
    let linhaCQuadroA = null;
    let linhaAQuadroB = null;
    let linhaBQuadroB = null;
    let linhaAQuadroC = null;
    let linhaBQuadroC = null;    
    let celulaALinhaAQuadroA = null;
    let celulaALinhaAQuadroB = null;
    let celulaALinhaAQuadroC = null;
    let celulaBLinhaAQuadroC = null;
    let ponteiro = null;
    let sugestoes = null;

    beforeEach(() => {       
        AuxiliarDePlaca();
        sugestoes = $('<div>')
        .addClass('sugestoes');
        $.fx.off = true; // Desabilita animações do jQuery                
        ponteiro = $('<div>').addClass('ponteiro').css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: 0
        });
        quadroA = $('<div>').addClass('quadro').css({
            position: 'absolute'
        });
        linhaAQuadroA = $('<div>').addClass('linha');
        celulaALinhaAQuadroA = $('<div>').addClass('celula');
        linhaAQuadroA.append(celulaALinhaAQuadroA);
        linhaBQuadroA = $('<div>').addClass('linha');
        linhaCQuadroA = $('<div>').addClass('linha');
        quadroA.append(linhaAQuadroA).append(linhaBQuadroA).append(linhaCQuadroA);
        linhaAQuadroB = $('<div>').addClass('linha');
        linhaBQuadroB = $('<div>').addClass('linha');
        celulaALinhaAQuadroB = $('<div>').addClass('celula');
        linhaAQuadroB.append(celulaALinhaAQuadroB);
        quadroB = $('<div>').addClass('quadro').css({
            position: 'absolute'
        });
        quadroB.append(linhaAQuadroB).append(linhaBQuadroB);
        quadroC = $('<div>').addClass('quadro').addClass('quadro_oculto').css({
            position: 'absolute'
        });
        linhaAQuadroC = $('<div>').addClass('linha');
        linhaBQuadroC = $('<div>').addClass('linha');
        celulaALinhaAQuadroC = $('<div>').addClass('celula');
        celulaBLinhaAQuadroC = $('<div>').addClass('celula');
        linhaAQuadroC.append(celulaALinhaAQuadroC).append(celulaBLinhaAQuadroC);
        quadroC.append(linhaAQuadroC).append(linhaBQuadroC);
        $(document.body).append(ponteiro).append(sugestoes).append(quadroA).append(quadroB).append(quadroC);
    });
    afterEach(() => {
        PubSub.clearAllSubscriptions();
        sugestoes.remove();
        ponteiro.remove();
        quadroA.remove();
        quadroB.remove();
        quadroC.remove();
        linhaAQuadroA.remove();
        linhaBQuadroA.remove();
        linhaCQuadroA.remove();
        linhaAQuadroB.remove();
        linhaBQuadroB.remove();
        linhaAQuadroC.remove();
        linhaBQuadroC.remove();        
        celulaALinhaAQuadroA.remove();
        celulaALinhaAQuadroB.remove();
        celulaALinhaAQuadroC.remove();
    });
    let passaram1500Milisegundos = () => {
        PubSub.publishSync('passaram1500Milisegundos');
    }
    let deficienteGesticulou = () => {
        PubSub.publishSync('deficienteGesticulou');
    }
    let palavrasSugeridas = (palavras) => {
        PubSub.publishSync('palavrasSugeridas', palavras);
    }    
    describe('ao passar o tempo 1 vez', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y do primeiro quadro', () => {
                quadroA.css('top', '50px');
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(50);
            });
            it('em outra posição Y do primeiro quadro', () => {
                quadroA.css('top', '100px');
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(100);
            });
            it('na posição X do primeiro quadro', () => {
                quadroA.css('left', '10px');
                passaram1500Milisegundos();
                expect(ponteiro.offset().left).toBe(10);
            });
            it('em outra posição X do primeiro quadro', () => {
                quadroA.css('left', '30px');
                passaram1500Milisegundos();
                expect(ponteiro.offset().left).toBe(30);
            });
        });
        describe('dimensiona o ponteiro', () => {
            it('com a mesma altura do primeiro quadro', () => {
                quadroA.css('height', '200px');
                passaram1500Milisegundos();
                expect(ponteiro.outerHeight()).toBe(200);
            });
            it('com outra altura do primeiro quadro', () => {
                quadroA.css('height', '550px');
                passaram1500Milisegundos();
                expect(ponteiro.outerHeight()).toBe(550);
            });
            it('com a mesma altura do primeiro quadro com borda', () => {
                quadroA.css({
                    height: '125px',
                    borderWidth: '10px',
                    borderStyle: 'solid'
                });
                passaram1500Milisegundos();
                expect(ponteiro.outerHeight()).toBe(145);
            });
            it('com a mesma largura do primeiro quadro', () => {
                quadroA.css('width', '783px');
                passaram1500Milisegundos();
                expect(ponteiro.outerWidth()).toBe(783);
            });
            it('com outra largura do primeiro quadro', () => {
                quadroA.css('width', '16px');
                passaram1500Milisegundos();
                expect(ponteiro.outerWidth()).toBe(16);
            });
            it('com a mesma largura do primeiro quadro com borda', () => {
                quadroA.css({
                    width: '88px',
                    borderWidth: '5px',
                    borderStyle: 'solid'
                });
                passaram1500Milisegundos();
                expect(ponteiro.outerWidth()).toBe(98);
            });
        });
    });
    describe('ao passar o tempo 2 vezes', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y do segundo quadro', () => {
                quadroA.css('top', '11px');
                quadroB.css('top', '451px');
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(451);
            });
            it('na posição X do segundo quadro', () => {
                quadroA.css('left', '67px');
                quadroB.css('left', '972px');
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                expect(ponteiro.offset().left).toBe(972);
            });
        });
        describe('dimensiona o ponteiro', () => {
            it('com a mesma altura do segundo quadro', () => {                            
                quadroA.css('height', '85px');
                quadroB.css('height', '20px');
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                expect(ponteiro.outerHeight()).toBe(20);
            });
            it('com a mesma largura do segundo quadro', () => {                            
                quadroA.css('width', '72px');
                quadroB.css('width', '73px');
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                expect(ponteiro.outerWidth()).toBe(73);
            });
        });
        describe('e o segundo quadro estiver oculto', () => {
            describe('posiciona o ponteiro', () => {
                it('na posição Y do primeiro quadro', () => {
                    quadroA.css('top', '98px');
                    quadroB.css('top', '273px').addClass('quadro_oculto');
                    passaram1500Milisegundos();
                    passaram1500Milisegundos();
                    expect(ponteiro.offset().top).toBe(98);
                });
            });
        });
    });
    describe('ao passar o tempo 3 vezes', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y do primeiro quadro', () => {
                quadroA.css('top', '1px');
                quadroB.css('top', '51px');
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(1);
            });
        });
    });
    describe('ao remover 1 quadro e passar o tempo 2 vezes', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y do primeiro e único quadro', () => {
                quadroA.css('top', '16px');
                quadroB.css('top', '12px');
                quadroA.remove();
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(12);
            });
        });
    });
    describe('ao passar o tempo 1 vez, gesticular e passar o tempo 1 vez', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y da primeira linha do primeiro quadro', () => {                        
                quadroA.css('top', '54px');                           
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(54);
            });
            it('em outra posição Y da primeira linha do primeiro quadro', () => {
                quadroA.css('top', '33px');
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(33);
            });
        });
        describe('dimensiona o ponteiro', () => {
            it('com a largura da primeira linha do primeiro quadro', () => {
                quadroA.css('width', '560px');
                linhaAQuadroA.css('width', '330px');
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                expect(ponteiro.outerWidth()).toBe(330);
            });
        });
        describe('dimensiona o ponteiro', () => {
            it('com a altura da primeira linha do primeiro quadro', () => {
                quadroA.css('height', '601px');
                linhaAQuadroA.css('height', '33px');
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                expect(ponteiro.outerHeight()).toBe(33);
            });
        });
        describe('e ele tiver apenas uma linha', () => {
            it('dimensiona o ponteiro com a altura da primeira célula', () => {
                quadroA.addClass('quadro_oculto');
                quadroB.addClass('quadro_oculto');
                quadroC.removeClass('quadro_oculto').css({
                    top: '30px',
                    left: '10px',
                    width: '600px',
                    height: '60px'
                });
                linhaAQuadroC.css({
                    width: '600px',
                    height: '30px'
                });
                linhaBQuadroC.remove();
                celulaALinhaAQuadroC.css({
                    width: '100px',
                    height: '25px'
                });
                celulaBLinhaAQuadroC.css({
                    width: '100px',
                    height: '20px'
                });
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                expect(ponteiro.outerHeight()).toBe(25);
            });            
        });
    });
    describe('ao passar o tempo 1 vez, gesticular e passar o tempo 2 vezes', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y da segunda linha do primeiro quadro', () => {
                quadroA.css('top', '160px');
                linhaAQuadroA.css('height', '20px');
                linhaBQuadroA.css('height', '20px');
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(180);
            });
        });
    });
    describe('ao passar o tempo 1 vez, gesticular e passar o tempo 3 vezes', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y da terceira linha do primeiro quadro', () => {
                quadroA.css('top', '160px');
                linhaAQuadroA.css('height', '20px');
                linhaBQuadroA.css('height', '20px');
                linhaCQuadroA.css('height', '20px');
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(200);
            });
        });
    });
    describe('ao passar o tempo 2 vezes, gesticular e passar o tempo 1 vez', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y da primeira linha do segundo quadro', () => {
                quadroA.css('top', '160px');
                linhaAQuadroA.css('height', '20px');
                linhaBQuadroA.css('height', '20px');
                linhaCQuadroA.css('height', '20px');
                quadroB.css('top', '220px');
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(220);
            });
        });
    });
    describe('ao gesticular antes de posicionar o ponteiro sobre o primeiro quadro', () => {
        it('não altera a posição Y do ponteiro', () => {
            quadroA.css('height', '31px');
            ponteiro.css('top', '0');
            linhaAQuadroA.css('height', '33px');
            deficienteGesticulou();
            expect(ponteiro.offset().top).toBe(0);
        });
    });
    describe('ao passar o tempo 1 vez, gesticular, passar o tempo 1 vez, gesticular e passar o tempo 1 vez', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y da primeira célula da primeira linha do primeiro quadro', () => {
                quadroA.css('top', '10px');
                linhaAQuadroA.css({
                    height: '30px',
                    width: '600px'
                });
                celulaALinhaAQuadroA.css({
                    height: '15px',
                    width: '50px'
                })
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(10);
            });
        });
        describe('e ele tiver apenas uma linha', () => {
            it('dimensiona o ponteiro com a altura do primeiro quadro ', () => {
                quadroA.addClass('quadro_oculto');
                quadroB.addClass('quadro_oculto');
                quadroC.removeClass('quadro_oculto').css({
                    top: '30px',
                    left: '10px',
                    width: '600px',
                    height: '60px'
                });
                linhaAQuadroC.css({
                    width: '600px',
                    height: '30px'
                });
                linhaBQuadroC.remove();
                celulaALinhaAQuadroC.css({
                    width: '100px',
                    height: '25px'
                });
                celulaBLinhaAQuadroC.css({
                    width: '100px',
                    height: '20px'
                });
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                expect(ponteiro.outerHeight()).toBe(60);
            });            
        });
    });
    describe('ao passar o tempo 1 vez, gesticular, passar o tempo 1 vez, gesticular, passar o tempo 1 vez, gesticular e passar o tempo 1 vez', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y do primeiro quadro', () => {
                quadroA.css('top', '17px');
                linhaAQuadroA.css({
                    height: '20px',
                    width: '800px'
                });
                celulaALinhaAQuadroA.css({
                    height: '20px',
                    width: '40px'
                })
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();                            
                expect(ponteiro.offset().top).toBe(17);
            });
        });
        describe('e o primeiro quadro estiver oculto', () => {
            describe('posiciona o ponteiro', () => {
                it('na posição Y do segundo quadro', () => {
                    quadroA.css('top', '17px').addClass('quadro_oculto');
                    quadroB.css('top', '528px');
                    linhaAQuadroB.css({
                        height: '25px',
                        width: '300px'
                    });
                    celulaALinhaAQuadroB.css({
                        height: '30px',
                        width: '50px'
                    })
                    passaram1500Milisegundos();
                    deficienteGesticulou();
                    passaram1500Milisegundos();
                    deficienteGesticulou();
                    passaram1500Milisegundos();
                    deficienteGesticulou();
                    passaram1500Milisegundos();                            
                    expect(ponteiro.offset().top).toBe(528);
                });
            });
        });
    });
    describe('ao passar o tempo 1 vez, gesticular, passar o tempo 1 vez, gesticular, passar o tempo 1 vez, gesticular e passar o tempo 1 vez', () => {
        describe('dimensiona o ponteiro', () => {
            it('com a largura da primeira linha do primeiro quadro', () => {
                quadroA.css({
                    top: '37px',
                    width: '1280px'
                });
                linhaAQuadroA.css({
                    height: '60px',
                    width: '900px'
                });
                celulaALinhaAQuadroA.css({
                    height: '30px',
                    width: '50px'
                })
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();                                
                expect(ponteiro.outerWidth()).toBe(900);
            });
        });
    });
    describe('ao passar o tempo 1 vez, gesticular 2 vezes e passar o tempo 1 vez', () => {
        describe('dimensiona o ponteiro', () => {
            it('com a largura da primeira linha do primeiro quadro', () => {
                quadroA.css({
                    top: '10px',
                    height: '70px'
                });
                linhaAQuadroA.css({
                    height: '35px',
                    width: '430px'
                });
                celulaALinhaAQuadroA.css({
                    height: '35px',
                    width: '35px'
                });
                passaram1500Milisegundos();
                deficienteGesticulou();
                deficienteGesticulou();
                passaram1500Milisegundos();
                expect(ponteiro.outerWidth()).toBe(430);
            });
        });
    });
    describe('ao gesticular no símbolo "Maiúsculas"', () => {
        it('exibe o quadro de maiúsculas', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            quadroC.removeClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            expect(quadroB.hasClass('quadro_oculto')).toBe(false);
        });
        it('não exibe o quadro de minúsculas', () => {
            quadroA.addClass('quadro_minusculas')
            quadroB.addClass('quadro_maiusculas').addClass('quadro_oculto');
            quadroC.removeClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            expect(quadroA.hasClass('quadro_oculto')).toBe(true);
        });
        it('não exibe minúsculas quando ele está inicialmente oculto', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_oculto');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_oculto');
            quadroC.removeClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            expect(quadroA.hasClass('quadro_oculto')).toBe(true);
        });
        describe('e passar o tempo 1 vez', () => {                    
            it('posiciona o ponteiro na posição Y do quadro de maiúsculas não-acentuadas', () => {
                quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto').css('top', '50px');
                quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou(); // Maiúsculas
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(150);
            });
        });
        describe('e estiver exibindo o quadro de não acentuadas', () => {
            it('não exibe acentuadas', () => {
                quadroA.addClass('quadro_maiusculas').addClass('quadro_acentuadas').addClass('quadro_oculto').css('top', '50px');
                quadroB.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
                celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                deficienteGesticulou(); // quadroC
                passaram1500Milisegundos();
                deficienteGesticulou(); // linha 1, quadro C
                passaram1500Milisegundos();
                deficienteGesticulou(); // Maiúsculas
                passaram1500Milisegundos();
                expect(ponteiro.offset().top).toBe(250); // quadroC
            });
        });
        describe('e estiver exibindo o quadro de acentuadas', () => {
            it('exibe o quadro de maiúsculas acentuadas', () => {
                quadroA.addClass('quadro_maiusculas').addClass('quadro_acentuadas').addClass('quadro_oculto').css('top', '50px');
                quadroB.addClass('quadro_minusculas').addClass('quadro_acentuadas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
                celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                passaram1500Milisegundos();
                passaram1500Milisegundos();
                deficienteGesticulou(); // quadroC
                passaram1500Milisegundos();
                deficienteGesticulou(); // linha 1, quadro C
                passaram1500Milisegundos();
                deficienteGesticulou(); // Maiúsculas
                expect(quadroA.hasClass('quadro_oculto')).toBe(false);
            });
            it('não exibe o quadro de maiúsculas não acentuadas', () => {
                quadroA.addClass('quadro_maiusculas').addClass('quadro_acentuadas').addClass('quadro_oculto').css('top', '50px');
                quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
                celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                passaram1500Milisegundos();
                deficienteGesticulou(); // quadroC
                passaram1500Milisegundos();
                deficienteGesticulou(); // linha 1, quadro C
                passaram1500Milisegundos();
                deficienteGesticulou(); // Maiúsculas
                expect(quadroB.hasClass('quadro_oculto')).toBe(true);
            });
        });
        it('troca o texto de "Maiúsculas" para "Minúsculas"', () => {
            quadroA.addClass('quadro_maiusculas').addClass('quadro_acentuadas').addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Maiúsculas
            expect(celulaALinhaAQuadroC.text()).toBe('Minúsculas');
        });
        it('não troca o texto de "Acentuadas" para "Não acentuadas"', () => {
            quadroA.addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_oculto').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Minúsculas
            expect(celulaBLinhaAQuadroC.text()).toBe('Acentuadas');
        });
    });
    describe('ao gesticular no símbolo "Minúsculas"', () => {
        it('troca o texto de "Minúsculas" para "Maiúsculas"', () => {
            quadroA.addClass('quadro_maiusculas').addClass('quadro_acentuadas').addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Minúsculas
            expect(celulaALinhaAQuadroC.text()).toBe('Maiúsculas');
        });
        it('exibe o quadro de minúsculas', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            quadroC.removeClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            expect(quadroA.hasClass('quadro_oculto')).toBe(false);
        });
        it('não exibe o quadro de maiúsculas', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas');
            quadroC.removeClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            expect(quadroB.hasClass('quadro_oculto')).toBe(true);
        });
        describe('e estiver exibindo o quadro de acentuadas', () => {
            it('exibe o quadro de minúsculas acentuadas', () => {
                quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
                quadroB.addClass('quadro_minusculas').addClass('quadro_acentuadas').addClass('quadro_oculto');
                quadroC.removeClass('quadro_oculto');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                expect(quadroB.hasClass('quadro_oculto')).toBe(false);
            });
            it('não exibe o quadro de minúsculas não acentuadas', () => {
                quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
                quadroB.addClass('quadro_minusculas').addClass('quadro_acentuadas').addClass('quadro_oculto');
                quadroC.removeClass('quadro_oculto');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                expect(quadroA.hasClass('quadro_oculto')).toBe(true);
            });
        });
        describe('e estiver exibindo o quadro de não acentuadas', () => {
            it('exibe o quadro de minúsculas não acentuadas', () => {
                quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
                quadroB.addClass('quadro_minusculas').addClass('quadro_acentuadas').addClass('quadro_oculto');
                quadroC.removeClass('quadro_oculto');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                expect(quadroA.hasClass('quadro_oculto')).toBe(false);
            });
            it('não exibe o quadro de minúsculas acentuadas', () => {
                quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
                quadroB.addClass('quadro_minusculas').addClass('quadro_acentuadas').addClass('quadro_oculto');
                quadroC.removeClass('quadro_oculto');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                passaram1500Milisegundos();
                deficienteGesticulou();
                expect(quadroB.hasClass('quadro_oculto')).toBe(true);
            });
        });
        it('não troca o texto de "Acentuadas" para "Não acentuadas"', () => {
            quadroA.addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_oculto').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Maiúsculas
            expect(celulaBLinhaAQuadroC.text()).toBe('Acentuadas');
        });
    });
    describe('ao gesticular no símbolo "Acentuadas"', () => {
        it('troca o texto de "Acentuadas" para "Não acentuadas"', () => {
            quadroA.addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_oculto').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Acentuadas
            expect(celulaALinhaAQuadroC.text()).toBe('Não acentuadas');
        });
        it('exibe o quadro de acentuadas', () => {
            quadroA.addClass('quadro_oculto').addClass('quadro_acentuadas').addClass('quadro_minusculas').css('top', '50px');
            quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Acentuadas
            expect(quadroA.hasClass('quadro_oculto')).toBe(false);
        });
        describe('e estiver exibindo o quadro de minúsculas', () => {
            it('não exibe o quadro de acentuadas maiúsculas', () => {
                quadroA.addClass('quadro_oculto').addClass('quadro_acentuadas').addClass('quadro_maiusculas').css('top', '50px');
                quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
                celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
                passaram1500Milisegundos();
                deficienteGesticulou(); // quadroC
                passaram1500Milisegundos();
                deficienteGesticulou(); // linha 1, quadro C
                passaram1500Milisegundos();
                deficienteGesticulou(); // Acentuadas
                expect(quadroA.hasClass('quadro_oculto')).toBe(true);
            });
        });
        describe('e estiver exibindo o quadro de maiúsculas', () => {
            it('exibe o quadro de acentuadas maiúsculas', () => {
                quadroA.addClass('quadro_oculto').addClass('quadro_acentuadas').addClass('quadro_maiusculas').css('top', '50px');
                quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
                celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                passaram1500Milisegundos();
                deficienteGesticulou(); // quadroC
                passaram1500Milisegundos();
                deficienteGesticulou(); // linha 1, quadro C
                passaram1500Milisegundos();
                deficienteGesticulou(); // Acentuadas
                expect(quadroA.hasClass('quadro_oculto')).toBe(false);
            });
            it('não exibe o quadro de acentuadas minúsculas', () => {
                quadroA.addClass('quadro_oculto').addClass('quadro_acentuadas').addClass('quadro_minusculas').css('top', '50px');
                quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
                celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                passaram1500Milisegundos();
                deficienteGesticulou(); // quadroC
                passaram1500Milisegundos();
                deficienteGesticulou(); // linha 1, quadro C
                passaram1500Milisegundos();
                deficienteGesticulou(); // Acentuadas
                expect(quadroA.hasClass('quadro_oculto')).toBe(true);
            });
        });
        it('não exibe o quadro de não acentuadas', () => {
            quadroA.addClass('quadro_oculto').addClass('quadro_acentuadas').addClass('quadro_minusculas').css('top', '50px');
            quadroB.addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Acentuadas
            expect(quadroB.hasClass('quadro_oculto')).toBe(true);
        });
    });
    describe('ao gesticular no símbolo "Não acentuadas"', () => {
        it('troca o texto de "Não acentuadas" para "Acentuadas"', () => {
            quadroA.addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_oculto').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Não acentuadas
            expect(celulaALinhaAQuadroC.text()).toBe('Acentuadas');
        });
        it('exibe o quadro de não acentuadas', () => {
            quadroA.addClass('quadro_oculto').addClass('quadro_acentuadas').addClass('quadro_minusculas').css('top', '50px');
            quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
            celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Não acentuadas
            expect(quadroB.hasClass('quadro_oculto')).toBe(false);
        });
        describe('e estiver exibindo o quadro de maiúsculas', () => {
            it('não exibe o quadro de não acentuadas minúsculas', () => {
                quadroA.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '50px');
                quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                passaram1500Milisegundos();
                deficienteGesticulou(); // quadroC
                passaram1500Milisegundos();
                deficienteGesticulou(); // linha 1, quadro C
                passaram1500Milisegundos();
                deficienteGesticulou(); // Não acentuadas
                expect(quadroA.hasClass('quadro_oculto')).toBe(true);
            });
            it('exibe o quadro de não acentuadas maiúsculas', () => {
                quadroA.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '50px');
                quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                passaram1500Milisegundos();
                deficienteGesticulou(); // quadroC
                passaram1500Milisegundos();
                deficienteGesticulou(); // linha 1, quadro C
                passaram1500Milisegundos();
                deficienteGesticulou(); // Não acentuadas
                expect(quadroB.hasClass('quadro_oculto')).toBe(false);
            });
        });
        describe('e estiver exibindo o quadro de minúsculas', () => {
            it('não exibe o quadro de não acentuadas maiúsculas', () => {
                quadroA.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '50px');
                quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
                passaram1500Milisegundos();
                deficienteGesticulou(); // quadroC
                passaram1500Milisegundos();
                deficienteGesticulou(); // linha 1, quadro C
                passaram1500Milisegundos();
                deficienteGesticulou(); // Não acentuadas
                expect(quadroB.hasClass('quadro_oculto')).toBe(true);
            });
        });
        it('não exibe o quadro de acentuadas', () => {
            quadroA.addClass('quadro_acentuadas').addClass('quadro_maiusculas').css('top', '50px');
            quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
            celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Não acentuadas
            expect(quadroA.hasClass('quadro_oculto')).toBe(true);
        });
        it('não informa o símbolo escolhido', () => {
            sinon.spy(PubSub, 'publish');
            quadroA.addClass('quadro_acentuadas').addClass('quadro_maiusculas').css('top', '50px');
            quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
            celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Não acentuadas
            expect(PubSub.publish.calledWith('deficienteEscolheuOSimbolo', 'a')).toBe(false);
            PubSub.publish.restore();
        });        
    });
    describe('ao gesticular na letra "a"', () => {
        it('não exibe o quadro de maiúsculas não acentuadas', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('a');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            expect(quadroB.hasClass('quadro_oculto')).toBe(true);
        });
        it('informa o símbolo escolhido para o auxiliar de anotações', () => {
            sinon.spy(PubSub, 'publish');
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('a');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();            
            expect(PubSub.publish.calledWith('deficienteEscolheuOSimbolo', 'a')).toBe(true);
            PubSub.publish.restore();
        });
        it('oculta o ponteiro', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('a');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // linhaAQuadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // celulaALinhaAQuadroA
            expect(ponteiro.css('display')).toBe('none');
        });
        it('dimensiona o ponteiro com largura 0', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('a');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // linhaAQuadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // celulaALinhaAQuadroA
            expect(ponteiro.css('width')).toBe('0px');
        });
        it('dimensiona o ponteiro com altura 0', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('a');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // linhaAQuadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // celulaALinhaAQuadroA
            expect(ponteiro.css('height')).toBe('0px');
        });
        it('posiciona o ponteiro na posição Y 0', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('a');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // linhaAQuadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // celulaALinhaAQuadroA
            expect(ponteiro.css('top')).toBe('0px');
        });
        it('posiciona o ponteiro na posição X 0', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('a');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // linhaAQuadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // celulaALinhaAQuadroA
            expect(ponteiro.css('left')).toBe('0px');
        });
    });
    describe('ao gesticular na letra "b"', () => {
        it('informa o símbolo escolhido para o auxiliar de anotações', () => {
            sinon.spy(PubSub, 'publish');
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('b');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();            
            expect(PubSub.publish.calledWith('deficienteEscolheuOSimbolo', 'b')).toBe(true);
            PubSub.publish.restore();
        });
    });
    describe('ao gesticular em "Continuar"', () => {
        it('não informa o símbolo escolhido ao gesticular em "Continuar"', () => {
            sinon.spy(PubSub, 'publish');
            quadroA.addClass('quadro_acentuadas').addClass('quadro_maiusculas').css('top', '50px');
            quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.text('Continuar');
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linha 1, quadro C
            passaram1500Milisegundos();
            deficienteGesticulou(); // Continuar
            expect(PubSub.publish.calledWith('deficienteEscolheuOSimbolo', 'Continuar')).toBe(false);
            PubSub.publish.restore();
        });
    });
    describe('ao gesticular e substituir o primeiro quadro por outro', () => {
        it('não percorre o quadro removido, cuja posição Y é 0', () => {
            let substituitoDoQuadroA = $('<div>').addClass('quadro').css({
                position: 'absolute',
                top: '40px'
            });
            quadroA.css('top', '50px');
            celulaALinhaAQuadroA.text('Continuar');
            quadroB.css('top', '150px');
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            deficienteGesticulou();
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            quadroB.prepend(substituitoDoQuadroA);            
            quadroA.remove();
            passaram1500Milisegundos();
            expect(ponteiro.offset().top).not.toBe(0);
        });
    });
    describe('ao gesticular e substituir a primeira linha do primeiro quadro por outra', () => {
        it('não percorre a linha removida, cuja posição Y é 0', () => {
            let substitutoDaLinhaAQuadroA = $('<div>').addClass('linha').css({
                height: '20px',
                width: '500px'
            });
            quadroA.css('top', '50px');
            linhaAQuadroA.css({
                height: '25px',
                width: '510px'
            });
            linhaBQuadroA.css({
                height: '25px',
                width: '510px'
            })
            celulaALinhaAQuadroA.css({
                width: '30px',
                height: '25px'
            });
            quadroB.css('top', '150px');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroA
            passaram1500Milisegundos();
            linhaBQuadroA.prepend(substitutoDaLinhaAQuadroA);
            linhaAQuadroA.remove();            
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            passaram1500Milisegundos();
            expect(ponteiro.offset().top).not.toBe(0);
        });
    });
    describe('ao gesticular e substituir a primeira célua da primeira linha do primeiro quadro por outra', () => {
        it('não percorre a célula removida, cuja posição Y é 0', () => {
            let substitutoDaCelulaALinhaAQuadroA = $('<div>').addClass('celula').css({
                width: '50px',
                height: '20px'
            });
            quadroA.addClass('quadro_oculto');
            quadroB.addClass('quadro_oculto');
            quadroC.removeClass('quadro_oculto').css('top', '50px');
            linhaAQuadroC.css({                
                width: '510px',
                height: '25px'
            });
            celulaALinhaAQuadroC.css({
                width: '30px',
                height: '25px'
            });
            celulaBLinhaAQuadroC.css({
                width: '30px',
                height: '25px'
            })
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroC
            passaram1500Milisegundos();
            deficienteGesticulou(); // linhaAQuadroC
            passaram1500Milisegundos();
            celulaBLinhaAQuadroC.prepend(substitutoDaCelulaALinhaAQuadroA);
            celulaALinhaAQuadroC.remove();            
            passaram1500Milisegundos();
            passaram1500Milisegundos();            
            expect(ponteiro.offset().top).not.toBe(0);
        });
    });    
    describe('ao gesticular em linha', () => {
        it('não oculta o ponteiro', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('a');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // linhaAQuadroA
            expect(ponteiro.css('display')).toBe('block');
        });
    });
    describe('ao passar o tempo após ocultar o ponteiro', () => {
        it('exibe o ponteiro', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('a');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            passaram1500Milisegundos();
            deficienteGesticulou(); // quadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // linhaAQuadroA
            passaram1500Milisegundos();
            deficienteGesticulou(); // celulaALinhaAQuadroA
            passaram1500Milisegundos();
            expect(ponteiro.css('position')).toBe('absolute');
        });
    });
    describe('ao sugerir 2 palavras', () => {
        it('exibe o quadro de sugestões de palavras', () => {            
            palavrasSugeridas(['a', 'b']);
            expect(sugestoes.is(':empty')).toBe(false);
        });
        it('exibe a tabela de sugestões de palavras', () => {
            palavrasSugeridas(['c', 'd']);
            expect(sugestoes.children().first().is('div')).toBe(true);
        });
        it('exibe a tabela de sugestões de palavras com 5 células', () => {
            palavrasSugeridas(['x', 'y']);
            expect(sugestoes.children().first().children().first().children().length).toBe(5);
        });
        it('exibe a tabela de sugestões de palavras marcada como quadro', () => {
            palavrasSugeridas(['c', 'd']);
            expect(sugestoes.children().first().hasClass('quadro')).toBe(true);
        });
        it('exibe a segunda palavra na célula 2 da linha 1', () => {
            palavrasSugeridas(['a', 'b']);
            expect(sugestoes.children().first().children().first().children().filter(':nth-child(2)').text()).toBe('b');
        });
        it('exibe a primeira palavra na célula 1 da linha 1', () => {
            palavrasSugeridas(['a', 'b']);
            expect(sugestoes.children().first().children().first().children().filter(':nth-child(1)').text()).toBe('a');
        });
    });
    describe('ao sugerir 1 palavra', () => {
        it('exibe a tabela de sugestões de palavras com 1 linha', () => {
            palavrasSugeridas(['x']);
            expect(sugestoes.children().first().children().length).toBe(1);
        });
        it('exibe a tabela de sugestões de palavras com 1 linha e 5 células', () => {
            palavrasSugeridas(['z']);
            expect(sugestoes.children().first().children().first().children().length).toBe(5);
        });
        it('exibe a tabela de sugestões de palavras com a linha 1 marcada como linha', () => {
            palavrasSugeridas(['x']);
            expect(sugestoes.children().first().children().filter(':nth-child(1)').hasClass('linha')).toBe(true);
        });
        it('exibe a tabela de sugestões de palavras com 1 linha e com a célula 1 marcada como célula', () => {
            palavrasSugeridas(['z']);
            expect(sugestoes.children().first().children().first().children().first().hasClass('celula')).toBe(true);
        });
        it('exibe a tabela de sugestões de palavras com 1 linha e com a célula 2 sem marcação de célula', () => {
            palavrasSugeridas(['z']);
            expect(sugestoes.children().first().children().first().children().filter(':nth-child(2)').hasClass('celula')).toBe(false);
        });
        it('exibe a tabela de sugestões de palavras com 1 linha e com a célula 3 sem marcação de célula', () => {
            palavrasSugeridas(['z']);
            expect(sugestoes.children().first().children().first().children().filter(':nth-child(3)').hasClass('celula')).toBe(false);
        });
        it('exibe a tabela de sugestões de palavras com 1 linha e com a célula 5 com marcação de célula', () => {
            palavrasSugeridas(['z']);
            expect(sugestoes.children().first().children().first().children().filter(':nth-child(5)').hasClass('celula')).toBe(true);
        });
        it('exibe o símbolo "Continuar" na célula 5 da linha 1', () => {
            palavrasSugeridas(['z']);
            expect(sugestoes.children().first().children().first().children().filter(':nth-child(5)').text()).toBe('Continuar');
        });
        it('exibe a primeira palavra na célula 1 da linha 1', () => {
            palavrasSugeridas(['z']);
            expect(sugestoes.children().first().children().first().children().filter(':nth-child(1)').text()).toBe('z');
        });
        it('exibe o símbolo "Continuar" com marcação de célula descrita', () => {
            palavrasSugeridas(['z']);
            expect(sugestoes.children().first().children().first().children().filter(':nth-child(5)').hasClass('celula_descrita')).toBe(true);
        });
    });
    describe('ao sugerir 5 palavras', () => {
        it('exibe a tabela de sugestões de palavras com 2 linhas', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e']);
            expect(sugestoes.children().first().children().length).toBe(2);
        });
        it('exibe a segunda linha da tabela de sugestões de palavras com 5 células', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().length).toBe(5);
        });
        it('exibe a tabela de sugestões de palavras com a linha 2 marcada como linha', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').hasClass('linha')).toBe(true);
        });
        it('exibe a segunda linha da tabela de sugestões de palavras com a célula 1 marcada como célula', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(1)').hasClass('celula')).toBe(true);
        });
        it('exibe a célula 2 da linha 2 da tabela de sugestões de palavras sem marcação de célula', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(2)').hasClass('celula')).toBe(false);
        });
        it('exibe a tabela de sugestões de palavras com 2 linhas e com a célula 5 com marcação de célula', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(5)').hasClass('celula')).toBe(true);
        });
        it('exibe o símbolo "Continuar" na célula 5 da linha 2', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(5)').text()).toBe('Continuar');
        });
        it('exibe a terceira palavra na célula 3 da linha 1', () => {
            palavrasSugeridas(['x', 'y', 'l', 'w', 'k']);
            expect(sugestoes.children().first().children().first().children().filter(':nth-child(3)').text()).toBe('l');
        });
        it('exibe a quarta palavra na célula 4 da linha 1', () => {
            palavrasSugeridas(['x', 'y', 'l', 'w', 'k']);
            expect(sugestoes.children().first().children().first().children().filter(':nth-child(4)').text()).toBe('w');
        });
        it('exibe a segunda palavra na célula 2 da linha 1', () => {
            palavrasSugeridas(['x', 'y', 'l', 'w', 'k']);
            expect(sugestoes.children().first().children().first().children().filter(':nth-child(2)').text()).toBe('y');
        });
        it('exibe a quinta palavra na célula 1 da linha 2', () => {
            palavrasSugeridas(['x', 'y', 'l', 'w', 'k']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(1)').text()).toBe('k');
        });
        it('exibe o símbolo "Continuar" com marcação de célula descrita', () => {
            palavrasSugeridas(['x', 'y', 'l', 'w', 'k']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(5)').hasClass('celula_descrita')).toBe(true);
        });
    });
    describe('ao sugerir 6 palavras', () => {
        it('exibe a tabela de sugestões de palavras com 2 linhas', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e', 'f']);
            expect(sugestoes.children().first().children().length).toBe(2);
        });
        it('exibe a linha 2 da tabela de sugestões de palavras com 5 células', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e', 'f']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().length).toBe(5);
        });
        it('exibe a linha 1 da tabela de sugestões de palavras com 5 células', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e', 'f']);
            expect(sugestoes.children().first().children().filter(':nth-child(1)').children().length).toBe(5);
        });
        it('exibe a célula 3 da linha 2 da tabela de sugestões de palavras sem marcação de célula', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e', 'f']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(3)').hasClass('celula')).toBe(false);
        });
        it('exibe a quinta palavra na célula 1 da linha 2', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e', 'f']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(1)').text()).toBe('e');
        });
        it('exibe a sexta palavra na célula 2 da linha 2', () => {
            palavrasSugeridas(['a', 'b', 'c', 'd', 'e', 'f']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(2)').text()).toBe('f');
        });
    });
    describe('ao sugerir 7 palavras', () => {
        it('exibe a sétima palavra na célula 3 da linha 2', () => {
            palavrasSugeridas(['q', 'n', 't', 's', 'v', 'p', 'g']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(3)').text()).toBe('g');
        });
        it('exibe a sexta palavra na célula 2 da linha 2', () => {
            palavrasSugeridas(['q', 'n', 't', 's', 'v', 'p', 'g']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(2)').text()).toBe('p');
        });        
    });
    describe('ao sugerir 8 palavras', () => {
        it('exibe a sétima palavra na célula 3 da linha 2', () => {
            palavrasSugeridas(['e', 'o', 'i', 'm', 'j', 'u', 'y', 's']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(3)').text()).toBe('y');
        });
        it('exibe a oitava palavra na célula 4 da linha 2', () => {
            palavrasSugeridas(['e', 'o', 'i', 'm', 'j', 'u', 'y', 's']);
            expect(sugestoes.children().first().children().filter(':nth-child(2)').children().filter(':nth-child(4)').text()).toBe('s');
        });
    });
    describe('ao sugerir 0 palavras', () => {
        it('não exibe a tabela de sugestões de palavras', () => {
            palavrasSugeridas([]);
            expect(sugestoes.children().length).toBe(0);
        });
        describe('e a tabela de sugestões de palavras já estiver preenchida', () => {
            it('não exibe a tabela de sugestões de palavras', () => {
                sugestoes.append('<div><div><div></div></div></div>');
                palavrasSugeridas([]);
                expect(sugestoes.children().length).toBe(0);
            });
        });
    });
});