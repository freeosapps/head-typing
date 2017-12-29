describe('Gesto', () => {
    let gesto = null;
    let video = null;
    let stubOn = null;
    let stubTrack = null;
    let spyAviso = null;
    let backupColorTracker = tracking.ColorTracker;
    let backupCallback = null;
    let backupTracking = null;
    beforeEach(() => {
        video = $('<video>')[0];
        gesto = new Gesto();
        stubOn = sinon.stub();
        stubTrack = sinon.stub();
        spyAviso = sinon.spy();
        backupTracking = tracking;
        tracking = {
            ColorTracker: function(cores) {
                return {
                    on: stubOn
                };
            },
            track: stubTrack
        };
        stubOn.withArgs(sinon.match('track'), sinon.match.any).callsFake((tipoDeteccao, callback) => {
            backupCallback = callback;
        });
    });
    afterEach(() => {
        tracking = backupTracking;
    });
    describe('quando é capaz de perceber movimento', () => {
        it('avisa', () => {
            stubTrack.withArgs(sinon.match.same(video), sinon.match.object).callsFake(() => {
                backupCallback({
                    data: [{
                        x: 0,
                        y: 0
                    }]
                });
                backupCallback({
                    data: [{
                        x: 0,
                        y: 10
                    }]
                });
            });
            gesto.detecteEMeAvise(video, spyAviso);
            expect(spyAviso.calledOnce).toBe(true);
        });
    });
    describe('quando não é capaz de perceber um movimento', () => {
        it('não avisa', () => {
            stubTrack.withArgs(sinon.match.same(video), sinon.match.object).callsFake(() => {
                backupCallback({
                    data: [{
                        x: 0,
                        y: 0
                    }]
                });
                backupCallback({
                    data: [{
                        x: 0,
                        y: 9
                    }]
                });
            });
            gesto.detecteEMeAvise(video, spyAviso);
            expect(spyAviso.called).toBe(false);
        });
    });
    describe('quando é capaz de perceber outro movimento', () => {
        it('avisa', () => {
            stubTrack.withArgs(sinon.match.same(video), sinon.match.object).callsFake(() => {
                backupCallback({
                    data: [{
                        x: 0,
                        y: 0
                    }]
                });
                backupCallback({
                    data: [{
                        x: 0,
                        y: 11
                    }]
                });
            });
            gesto.detecteEMeAvise(video, spyAviso);
            expect(spyAviso.calledOnce).toBe(true);
        });
    });
    describe('quando é capaz de perceber ainda outro movimento', () => {
        it('avisa', () => {
            stubTrack.withArgs(sinon.match.same(video), sinon.match.object).callsFake(() => {
                backupCallback({
                    data: [{
                        x: 0,
                        y: 0
                    }]
                });
                backupCallback({
                    data: [{
                        x: 0,
                        y: 12
                    }]
                });
            });
            gesto.detecteEMeAvise(video, spyAviso);
            expect(spyAviso.calledOnce).toBe(true);
        });
    });
    describe('quando não existe movimento', () => {
        it('não avisa', () => {
            stubTrack.withArgs(sinon.match.same(video), sinon.match.object).callsFake(() => {
                backupCallback({
                    data: []
                });
            });
            gesto.detecteEMeAvise(video, spyAviso);
            expect(spyAviso.called).toBe(false);
        });
    });
});