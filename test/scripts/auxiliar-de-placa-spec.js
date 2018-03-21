describe('AuxiliarDePlaca', () => {
    let auxiliarDePlaca = null;
    let auxiliarDeAnotacoes = null;
    let quadroA = null;
    let quadroB = null;
    let quadroC = null;
    let linhaAQuadroA = null;
    let linhaBQuadroA = null;
    let linhaCQuadroA = null;
    let linhaAQuadroB = null;
    let linhaAQuadroC = null;                
    let celulaALinhaAQuadroA = null;
    let celulaALinhaAQuadroB = null;
    let celulaALinhaAQuadroC = null;
    let celulaBLinhaAQuadroC = null;
    let ponteiro = null;

    beforeEach(() => {
        $.fx.off = true; // Desabilita animações do jQuery
        auxiliarDeAnotacoes = new AuxiliarDeAnotacoes(null);
        auxiliarDePlaca = new AuxiliarDePlaca(auxiliarDeAnotacoes);
        ponteiro = $('<div>').addClass('ponteiro ponteiro_oculto').css({
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
        celulaALinhaAQuadroB = $('<div>').addClass('celula');
        linhaAQuadroB.append(celulaALinhaAQuadroB);
        quadroB = $('<div>').addClass('quadro').css({
            position: 'absolute'
        });
        quadroB.append(linhaAQuadroB);
        quadroC = $('<div>').addClass('quadro').addClass('quadro_oculto').css({
            position: 'absolute'
        });
        linhaAQuadroC = $('<div>').addClass('linha');
        celulaALinhaAQuadroC = $('<div>').addClass('celula');
        celulaBLinhaAQuadroC = $('<div>').addClass('celula');
        linhaAQuadroC.append(celulaALinhaAQuadroC).append(celulaBLinhaAQuadroC);;
        quadroC.append(linhaAQuadroC);
        $(document.body).append(ponteiro).append(quadroA).append(quadroB).append(quadroC);
    });
    afterEach(() => {
        ponteiro.remove();
        quadroA.remove();
        quadroB.remove();
        quadroC.remove();
        linhaAQuadroA.remove();
        linhaBQuadroA.remove();
        linhaCQuadroA.remove();
        celulaALinhaAQuadroA.remove();
        celulaALinhaAQuadroB.remove();
        celulaALinhaAQuadroC.remove();
    });
    describe('ao passar o tempo 1 vez', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y do primeiro quadro', () => {
                quadroA.css('top', '50px');
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.offset().top).toBe(50);
            });
            it('em outra posição Y do primeiro quadro', () => {
                quadroA.css('top', '100px');
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.offset().top).toBe(100);
            });
            it('na posição X do primeiro quadro', () => {
                quadroA.css('left', '10px');
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.offset().left).toBe(10);
            });
            it('em outra posição X do primeiro quadro', () => {
                quadroA.css('left', '30px');
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.offset().left).toBe(30);
            });
        });
        describe('dimensiona o ponteiro', () => {
            it('com a mesma altura do primeiro quadro', () => {
                quadroA.css('height', '200px');
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.outerHeight()).toBe(200);
            });
            it('com outra altura do primeiro quadro', () => {
                quadroA.css('height', '550px');
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.outerHeight()).toBe(550);
            });
            it('com a mesma altura do primeiro quadro com borda', () => {
                quadroA.css({
                    height: '125px',
                    borderWidth: '10px',
                    borderStyle: 'solid'
                });
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.outerHeight()).toBe(145);
            });
            it('com a mesma largura do primeiro quadro', () => {
                quadroA.css('width', '783px');
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.outerWidth()).toBe(783);
            });
            it('com outra largura do primeiro quadro', () => {
                quadroA.css('width', '16px');
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.outerWidth()).toBe(16);
            });
            it('com a mesma largura do primeiro quadro com borda', () => {
                quadroA.css({
                    width: '88px',
                    borderWidth: '5px',
                    borderStyle: 'solid'
                });
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.outerWidth()).toBe(98);
            });
        });
    });
    describe('ao passar o tempo 2 vezes', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y do segundo quadro', () => {
                quadroA.css('top', '11px');
                quadroB.css('top', '451px');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.offset().top).toBe(451);
            });
            it('na posição X do segundo quadro', () => {
                quadroA.css('left', '67px');
                quadroB.css('left', '972px');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.offset().left).toBe(972);
            });
        });
        describe('dimensiona o ponteiro', () => {
            it('com a mesma altura do segundo quadro', () => {                            
                quadroA.css('height', '85px');
                quadroB.css('height', '20px');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.outerHeight()).toBe(20);
            });
            it('com a mesma largura do segundo quadro', () => {                            
                quadroA.css('width', '72px');
                quadroB.css('width', '73px');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.outerWidth()).toBe(73);
            });
        });
        describe('e o segundo quadro estiver oculto', () => {
            describe('posiciona o ponteiro', () => {
                it('na posição Y do primeiro quadro', () => {
                    quadroA.css('top', '98px');
                    quadroB.css('top', '273px').addClass('quadro_oculto');
                    auxiliarDePlaca.tempoPassou();
                    auxiliarDePlaca.tempoPassou();
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.offset().top).toBe(12);
            });
        });
    });
    describe('ao passar o tempo 1 vez, gesticular e passar o tempo 1 vez', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y da primeira linha do primeiro quadro', () => {                        
                quadroA.css('top', '54px');                           
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.offset().top).toBe(54);
            });
            it('em outra posição Y da primeira linha do primeiro quadro', () => {
                quadroA.css('top', '33px');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.offset().top).toBe(33);
            });
        });
        describe('dimensiona o ponteiro', () => {
            it('com a largura da primeira linha do primeiro quadro', () => {
                quadroA.css('width', '560px');
                linhaAQuadroA.css('width', '330px');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.outerWidth()).toBe(330);
            });
        });
        describe('dimensiona o ponteiro', () => {
            it('com a altura da primeira linha do primeiro quadro', () => {
                quadroA.css('height', '601px');
                linhaAQuadroA.css('height', '33px');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.outerHeight()).toBe(33);
            });
        });
    });
    describe('ao passar o tempo 1 vez, gesticular e passar o tempo 2 vezes', () => {
        describe('posiciona o ponteiro', () => {
            it('na posição Y da segunda linha do primeiro quadro', () => {
                quadroA.css('top', '160px');
                linhaAQuadroA.css('height', '20px');
                linhaBQuadroA.css('height', '20px');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.offset().top).toBe(220);
            });
        });
    });
    describe('ao gesticular antes de posicionar o ponteiro sobre o primeiro quadro', () => {
        it('não altera a posição Y do ponteiro', () => {
            quadroA.css('height', '31px');
            ponteiro.css('top', '0');
            linhaAQuadroA.css('height', '33px');
            auxiliarDePlaca.deficienteGesticulou();
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                expect(ponteiro.offset().top).toBe(10);
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();                            
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
                    auxiliarDePlaca.tempoPassou();
                    auxiliarDePlaca.deficienteGesticulou();
                    auxiliarDePlaca.tempoPassou();
                    auxiliarDePlaca.deficienteGesticulou();
                    auxiliarDePlaca.tempoPassou();
                    auxiliarDePlaca.deficienteGesticulou();
                    auxiliarDePlaca.tempoPassou();                            
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();                                
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
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
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            expect(quadroB.hasClass('quadro_oculto')).toBe(false);
        });
        it('não exibe o quadro de minúsculas', () => {
            quadroA.addClass('quadro_minusculas')
            quadroB.addClass('quadro_maiusculas').addClass('quadro_oculto');
            quadroC.removeClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            expect(quadroA.hasClass('quadro_oculto')).toBe(true);
        });
        it('não exibe minúsculas quando ele está inicialmente oculto', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_oculto');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_oculto');
            quadroC.removeClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            expect(quadroA.hasClass('quadro_oculto')).toBe(true);
        });
        describe('e passar o tempo 1 vez', () => {                    
            it('posiciona o ponteiro na posição Y do quadro de maiúsculas não-acentuadas', () => {
                quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto').css('top', '50px');
                quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // Maiúsculas
                auxiliarDePlaca.tempoPassou();
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // quadroC
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // Maiúsculas
                auxiliarDePlaca.tempoPassou();
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // quadroC
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // Maiúsculas
                expect(quadroA.hasClass('quadro_oculto')).toBe(false);
            });
            it('não exibe o quadro de maiúsculas não acentuadas', () => {
                quadroA.addClass('quadro_maiusculas').addClass('quadro_acentuadas').addClass('quadro_oculto').css('top', '50px');
                quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
                celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // quadroC
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // Maiúsculas
                expect(quadroB.hasClass('quadro_oculto')).toBe(true);
            });
        });
        it('troca o texto de "Maiúsculas" para "Minúsculas"', () => {
            quadroA.addClass('quadro_maiusculas').addClass('quadro_acentuadas').addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Maiúsculas
            expect(celulaALinhaAQuadroC.text()).toBe('Minúsculas');
        });
        it('não troca o texto de "Acentuadas" para "Não acentuadas"', () => {
            quadroA.addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_oculto').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Minúsculas
            expect(celulaBLinhaAQuadroC.text()).toBe('Acentuadas');
        });
    });
    describe('ao gesticular no símbolo "Minúsculas"', () => {
        it('troca o texto de "Minúsculas" para "Maiúsculas"', () => {
            quadroA.addClass('quadro_maiusculas').addClass('quadro_acentuadas').addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Minúsculas
            expect(celulaALinhaAQuadroC.text()).toBe('Maiúsculas');
        });
        it('exibe o quadro de minúsculas', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            quadroC.removeClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            expect(quadroA.hasClass('quadro_oculto')).toBe(false);
        });
        it('não exibe o quadro de maiúsculas', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas');
            quadroC.removeClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            expect(quadroB.hasClass('quadro_oculto')).toBe(true);
        });
        describe('e estiver exibindo o quadro de acentuadas', () => {
            it('exibe o quadro de minúsculas acentuadas', () => {
                quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
                quadroB.addClass('quadro_minusculas').addClass('quadro_acentuadas').addClass('quadro_oculto');
                quadroC.removeClass('quadro_oculto');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                expect(quadroB.hasClass('quadro_oculto')).toBe(false);
            });
            it('não exibe o quadro de minúsculas não acentuadas', () => {
                quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
                quadroB.addClass('quadro_minusculas').addClass('quadro_acentuadas').addClass('quadro_oculto');
                quadroC.removeClass('quadro_oculto');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                expect(quadroA.hasClass('quadro_oculto')).toBe(false);
            });
            it('não exibe o quadro de minúsculas acentuadas', () => {
                quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
                quadroB.addClass('quadro_minusculas').addClass('quadro_acentuadas').addClass('quadro_oculto');
                quadroC.removeClass('quadro_oculto');
                celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou();
                expect(quadroB.hasClass('quadro_oculto')).toBe(true);
            });
        });
        it('não troca o texto de "Acentuadas" para "Não acentuadas"', () => {
            quadroA.addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_oculto').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            celulaBLinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Maiúsculas
            expect(celulaBLinhaAQuadroC.text()).toBe('Acentuadas');
        });
    });
    describe('ao gesticular no símbolo "Acentuadas"', () => {
        it('troca o texto de "Acentuadas" para "Não acentuadas"', () => {
            quadroA.addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_oculto').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Acentuadas
            expect(celulaALinhaAQuadroC.text()).toBe('Não acentuadas');
        });
        it('exibe o quadro de acentuadas', () => {
            quadroA.addClass('quadro_oculto').addClass('quadro_acentuadas').addClass('quadro_minusculas').css('top', '50px');
            quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Acentuadas
            expect(quadroA.hasClass('quadro_oculto')).toBe(false);
        });
        describe('e estiver exibindo o quadro de minúsculas', () => {
            it('não exibe o quadro de acentuadas maiúsculas', () => {
                quadroA.addClass('quadro_oculto').addClass('quadro_acentuadas').addClass('quadro_maiusculas').css('top', '50px');
                quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
                celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // quadroC
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // Acentuadas
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // quadroC
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // Acentuadas
                expect(quadroA.hasClass('quadro_oculto')).toBe(false);
            });
            it('não exibe o quadro de acentuadas minúsculas', () => {
                quadroA.addClass('quadro_oculto').addClass('quadro_acentuadas').addClass('quadro_minusculas').css('top', '50px');
                quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
                celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // quadroC
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // Acentuadas
                expect(quadroA.hasClass('quadro_oculto')).toBe(true);
            });
        });
        it('não exibe o quadro de não acentuadas', () => {
            quadroA.addClass('quadro_oculto').addClass('quadro_acentuadas').addClass('quadro_minusculas').css('top', '50px');
            quadroB.addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Acentuadas');
            celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Acentuadas
            expect(quadroB.hasClass('quadro_oculto')).toBe(true);
        });
    });
    describe('ao gesticular no símbolo "Não acentuadas"', () => {
        it('troca o texto de "Não acentuadas" para "Acentuadas"', () => {
            quadroA.addClass('quadro_oculto').css('top', '50px');
            quadroB.addClass('quadro_oculto').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Não acentuadas
            expect(celulaALinhaAQuadroC.text()).toBe('Acentuadas');
        });
        it('exibe o quadro de não acentuadas', () => {
            quadroA.addClass('quadro_oculto').addClass('quadro_acentuadas').addClass('quadro_minusculas').css('top', '50px');
            quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
            celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Não acentuadas
            expect(quadroB.hasClass('quadro_oculto')).toBe(false);
        });
        describe('e estiver exibindo o quadro de maiúsculas', () => {
            it('não exibe o quadro de não acentuadas minúsculas', () => {
                quadroA.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '50px');
                quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // quadroC
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // Não acentuadas
                expect(quadroA.hasClass('quadro_oculto')).toBe(true);
            });
            it('exibe o quadro de não acentuadas maiúsculas', () => {
                quadroA.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_minusculas').css('top', '50px');
                quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
                quadroC.removeClass('quadro_oculto').css('top', '250px');
                celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
                celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // quadroC
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // Não acentuadas
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
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // quadroC
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
                auxiliarDePlaca.tempoPassou();
                auxiliarDePlaca.deficienteGesticulou(); // Não acentuadas
                expect(quadroB.hasClass('quadro_oculto')).toBe(true);
            });
        });
        it('não exibe o quadro de acentuadas', () => {
            quadroA.addClass('quadro_acentuadas').addClass('quadro_maiusculas').css('top', '50px');
            quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
            celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Não acentuadas
            expect(quadroA.hasClass('quadro_oculto')).toBe(true);
        });
        it('não informa o símbolo escolhido', () => {
            sinon.spy(auxiliarDeAnotacoes, 'escolheuSimbolo');
            quadroA.addClass('quadro_acentuadas').addClass('quadro_maiusculas').css('top', '50px');
            quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.addClass('celula_acentuadas-nao-acentuadas').text('Não acentuadas');
            celulaBLinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Minúsculas');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Não acentuadas
            expect(auxiliarDeAnotacoes.escolheuSimbolo.calledWith('a')).toBe(false);
        });        
    });
    describe('ao gesticular na letra "a"', () => {
        it('não exibe o quadro de maiúsculas não acentuadas', () => {
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('a');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            expect(quadroB.hasClass('quadro_oculto')).toBe(true);
        });
        it('informa o símbolo escolhido para o auxiliar de anotações', () => {
            sinon.spy(auxiliarDeAnotacoes, 'escolheuSimbolo');
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('a');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();            
            expect(auxiliarDeAnotacoes.escolheuSimbolo.calledWith('a')).toBe(true);
        });
    });
    describe('ao gesticular na letra "b"', () => {
        it('informa o símbolo escolhido para o auxiliar de anotações', () => {
            sinon.spy(auxiliarDeAnotacoes, 'escolheuSimbolo');
            quadroA.addClass('quadro_minusculas').addClass('quadro_nao-acentuadas');
            celulaALinhaAQuadroA.text('b');
            quadroB.addClass('quadro_maiusculas').addClass('quadro_nao-acentuadas').addClass('quadro_oculto');
            celulaALinhaAQuadroC.addClass('celula_maiusculas-minusculas').text('Maiúsculas');
            quadroC.removeClass('quadro_oculto');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();            
            expect(auxiliarDeAnotacoes.escolheuSimbolo.calledWith('b')).toBe(true);
        });
    });
    describe('ao gesticular em "Continuar"', () => {
        it('não informa o símbolo escolhido ao gesticular em "Continuar"', () => {
            sinon.spy(auxiliarDeAnotacoes, 'escolheuSimbolo');
            quadroA.addClass('quadro_acentuadas').addClass('quadro_maiusculas').css('top', '50px');
            quadroB.addClass('quadro_oculto').addClass('quadro_nao-acentuadas').addClass('quadro_maiusculas').css('top', '150px');
            quadroC.removeClass('quadro_oculto').css('top', '250px');
            celulaALinhaAQuadroC.text('Continuar');
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linha 1, quadro C
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // Continuar
            expect(auxiliarDeAnotacoes.escolheuSimbolo.calledWith('Continuar')).toBe(false);
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
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            quadroB.prepend(substituitoDoQuadroA);            
            quadroA.remove();
            auxiliarDePlaca.tempoPassou();
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
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroA
            auxiliarDePlaca.tempoPassou();
            linhaBQuadroA.prepend(substitutoDaLinhaAQuadroA);
            linhaAQuadroA.remove();            
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();
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
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // quadroC
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.deficienteGesticulou(); // linhaAQuadroC
            auxiliarDePlaca.tempoPassou();
            celulaBLinhaAQuadroC.prepend(substitutoDaCelulaALinhaAQuadroA);
            celulaALinhaAQuadroC.remove();            
            auxiliarDePlaca.tempoPassou();
            auxiliarDePlaca.tempoPassou();            
            expect(ponteiro.offset().top).not.toBe(0);
        });
    });
});