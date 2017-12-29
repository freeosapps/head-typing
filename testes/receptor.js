describe('Receptor', () => {
    let backupArvoreDePalavras = null;
    let backupCronometro = null;
    let stubQuaisAsProximasLetras = null;
    let stubMeAviseAposOTempo = null;
    let localizacaoDasLetras = null;
    let localizacaoDaAnotacao = null;
    let clock = null;
    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
        backupArvoreDePalavras = ArvoreDePalavras;
        backupCronometro = Cronometro;
        stubQuaisAsProximasLetras = sinon.stub();
        stubMeAviseAposOTempo = sinon.stub();
        stubParado = sinon.stub();
        stubParado.returns(true);
        localizacaoDasLetras = $('<div>');
        localizacaoDaAnotacao = $('<div>');
        ArvoreDePalavras = function() {
            return {
                quaisAsProximasLetras: stubQuaisAsProximasLetras
            };
        };
        Cronometro = function() {
            return {
                meAviseAposOTempo: stubMeAviseAposOTempo,
                parado: stubParado
            };
        };
        jQuery.fx.off = true;
        clock = sinon.useFakeTimers();
    });
    afterEach(() => {
        ArvoreDePalavras = backupArvoreDePalavras;
        Cronometro = backupCronometro;
        jQuery.fx.off = false;
        clock.restore();
    });

    describe('sem anotações de letras', () => {
        it('mostra duas letras', () => {
            stubQuaisAsProximasLetras.withArgs('').returns(['A', 'B']);
            stubMeAviseAposOTempo
            .callsFake((avancarUmaLetra, tempo) => {
                // Não informa ao passar o tempo para que fique parado na letra inicial
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
                                    
            expect(localizacaoDasLetras).toContainText('.→←AB');
        });
        it('mostra uma letra', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['A']);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                expect(localizacaoDasLetras).toContainText('A.→←');
                done();
            });
            let receptor = new Receptor();                        
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
        });
        it('mostra outra letra', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['B']);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                expect(localizacaoDasLetras).toContainText('B.→←');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);            
        });
        it('mostra outras duas letras', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['C', 'D']);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                expect(localizacaoDasLetras).toContainText('CD.→←');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);            
        });
        it('mostra três letras', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['D', 'E', 'F']);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(4).callsFake((avancarUmaLetra, tempo) => {
                expect(localizacaoDasLetras).toContainText('EF.→←D');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
        });
        it('mostra outras três letras', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['D', 'E', 'F']);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(4).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(5).callsFake((avancarUmaLetra, tempo) => {
                expect(localizacaoDasLetras).toContainText('F.→←DE');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
        });
    });
    describe('com anotações de letras e sem espaço', () => {
        it('mostra uma letra', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['G', 'H', 'I']);
            stubQuaisAsProximasLetras.withArgs('G').returns(['A']);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                // G
                receptor.anoteEstaLetra();
                expect(localizacaoDasLetras).toContainText('.→←A');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
        });
        it('mostra duas letras', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['G', 'H', 'I']);
            stubQuaisAsProximasLetras.withArgs('G').returns(['A']);
            stubQuaisAsProximasLetras.withArgs('GA').returns(['L', 'M']);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                // G
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(4).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(5).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(6).callsFake((avancarUmaLetra, tempo) => {
                // A
                receptor.anoteEstaLetra();                
                expect(localizacaoDasLetras).toContainText('.→←LM');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
        });
        it('mostra a anotação de uma letra', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['C', 'D', 'E']);
            stubQuaisAsProximasLetras.withArgs('C').returns(['I', 'E']);
            stubQuaisAsProximasLetras.withArgs('CE').returns([]);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                // C
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(4).callsFake((avancarUmaLetra, tempo) => {              
                avancarUmaLetra();
            })
            .onCall(5).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(6).callsFake((avancarUmaLetra, tempo) => {                
                avancarUmaLetra();
            })
            .onCall(7).callsFake((avancarUmaLetra, tempo) => {
                // E
                receptor.anoteEstaLetra();
                receptor.mostreMeOQueFoiAnotado(localizacaoDaAnotacao);
                expect(localizacaoDaAnotacao).toContainText('CE');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
        });
        it('mostra a primeira anotação de letra', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['C', 'D', 'E']);
            stubQuaisAsProximasLetras.withArgs('C').returns([]);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                // C
                receptor.anoteEstaLetra();                
                expect(localizacaoDaAnotacao).toContainText('C');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeOQueFoiAnotado(localizacaoDaAnotacao);
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);            
        });
    });
    describe('com anotações de letras e com espaço', () => {
        it('mostra duas letras', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['D', 'E', 'F']);
            stubQuaisAsProximasLetras.withArgs('D').returns(['E']);
            stubQuaisAsProximasLetras.withArgs('DE').returns([]);
            stubQuaisAsProximasLetras.withArgs('F').returns(['A', 'E']);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                // D
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(4).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(5).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(6).callsFake((avancarUmaLetra, tempo) => {
                // E
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(7).callsFake((avancarUmaLetra, tempo) => {
                // →
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(8).callsFake((avancarUmaLetra, tempo) => {      
                avancarUmaLetra();
            })
            .onCall(9).callsFake((avancarUmaLetra, tempo) => {      
                avancarUmaLetra();
            })
            .onCall(10).callsFake((avancarUmaLetra, tempo) => {      
                avancarUmaLetra();
            })
            .onCall(11).callsFake((avancarUmaLetra, tempo) => {      
                avancarUmaLetra();
            })
            .onCall(12).callsFake((avancarUmaLetra, tempo) => {
                // F
                receptor.anoteEstaLetra();                
                expect(localizacaoDasLetras).toContainText('.→←AE');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
        });
    });
    describe('com anotações de letras e com espaço e com backspace', () => {
        it('mostra duas letras', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['C', 'D', 'E']);
            stubQuaisAsProximasLetras.withArgs('D').returns(['A', 'E', 'I', 'O', 'U']);
            stubQuaisAsProximasLetras.withArgs('DA').returns([]);
            stubQuaisAsProximasLetras.withArgs('E').returns(['S', 'M', 'T', 'N']);
            stubQuaisAsProximasLetras.withArgs('ES').returns(['T', 'C', 'P']);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(4).callsFake((avancarUmaLetra, tempo) => {
                // D
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(5).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(6).callsFake((avancarUmaLetra, tempo) => {                
                avancarUmaLetra();
            })
            .onCall(7).callsFake((avancarUmaLetra, tempo) => {
                // C
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(8).callsFake((avancarUmaLetra, tempo) => {
                // →
                receptor.anoteEstaLetra();     
                avancarUmaLetra();
            })
            .onCall(9).callsFake((avancarUmaLetra, tempo) => {
                // →
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(10).callsFake((avancarUmaLetra, tempo) => {      
                avancarUmaLetra();
            })
            .onCall(11).callsFake((avancarUmaLetra, tempo) => {      
                avancarUmaLetra();
            })
            .onCall(12).callsFake((avancarUmaLetra, tempo) => {      
                avancarUmaLetra();
            })
            .onCall(13).callsFake((avancarUmaLetra, tempo) => {      
                avancarUmaLetra();
            })
            .onCall(14).callsFake((avancarUmaLetra, tempo) => {
                // E
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(15).callsFake((avancarUmaLetra, tempo) => {      
                avancarUmaLetra();
            })
            .onCall(16).callsFake((avancarUmaLetra, tempo) => {      
                avancarUmaLetra();
            })
            .onCall(17).callsFake((avancarUmaLetra, tempo) => {
                // S
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(18).callsFake((avancarUmaLetra, tempo) => {      
                avancarUmaLetra();
            })
            .onCall(19).callsFake((avancarUmaLetra, tempo) => {
                // ←
                receptor.anoteEstaLetra();
                expect(localizacaoDasLetras).toContainText('.→←SMTN');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
        });
        it('mostra outras duas', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['C', 'D', 'E']);
            stubQuaisAsProximasLetras.withArgs('D').returns(['A', 'E', 'I', 'O', 'U']);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(4).callsFake((avancarUmaLetra, tempo) => {
                // D
                receptor.anoteEstaLetra();                
                avancarUmaLetra();
            })
            .onCall(5).callsFake((avancarUmaLetra, tempo) => {
                // →
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(6).callsFake((avancarUmaLetra, tempo) => {                
                avancarUmaLetra();
            })
            .onCall(7).callsFake((avancarUmaLetra, tempo) => {
                // ←
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(8).callsFake((avancarUmaLetra, tempo) => {  
                avancarUmaLetra();
            })
            .onCall(9).callsFake((avancarUmaLetra, tempo) => {
                // ←
                receptor.anoteEstaLetra();
                expect(localizacaoDasLetras).toContainText('.→←CDE');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
        });
        it('mostra a anotação de uma letra', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['C', 'D', 'E']);
            stubQuaisAsProximasLetras.withArgs('D').returns(['A', 'E', 'I', 'O', 'U']);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(4).callsFake((avancarUmaLetra, tempo) => {
                // D
                receptor.anoteEstaLetra();                
                avancarUmaLetra();
            })
            .onCall(5).callsFake((avancarUmaLetra, tempo) => {
                // →
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(6).callsFake((avancarUmaLetra, tempo) => {                
                avancarUmaLetra();
            })
            .onCall(7).callsFake((avancarUmaLetra, tempo) => {
                // ←
                receptor.anoteEstaLetra();
                receptor.mostreMeOQueFoiAnotado(localizacaoDaAnotacao);
                expect(localizacaoDaAnotacao).toContainText('D');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
        });
    });
    describe('com anotações de letras e com backspace', () => {
        it('mostra a anotação de uma letra após apagar outra', (done) => {
            stubQuaisAsProximasLetras.withArgs('').returns(['C', 'D', 'E']);
            stubQuaisAsProximasLetras.withArgs('C').returns([]);
            stubQuaisAsProximasLetras.withArgs('D').returns([]);
            stubMeAviseAposOTempo
            .onCall(0).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(1).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(2).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(3).callsFake((avancarUmaLetra, tempo) => {
                // C
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(4).callsFake((avancarUmaLetra, tempo) => {                                
                avancarUmaLetra();
            })
            .onCall(5).callsFake((avancarUmaLetra, tempo) => {
                // ←
                receptor.anoteEstaLetra();
                avancarUmaLetra();
            })
            .onCall(6).callsFake((avancarUmaLetra, tempo) => {                
                avancarUmaLetra();
            })
            .onCall(7).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(8).callsFake((avancarUmaLetra, tempo) => {
                avancarUmaLetra();
            })
            .onCall(9).callsFake((avancarUmaLetra, tempo) => {
                // D
                receptor.anoteEstaLetra();                
                expect(localizacaoDaAnotacao).not.toContainText('C');
                done();
            });
            let receptor = new Receptor();
            receptor.mostreMeAsProximasLetras(localizacaoDasLetras);
            receptor.mostreMeOQueFoiAnotado(localizacaoDaAnotacao);
        });
    });
});