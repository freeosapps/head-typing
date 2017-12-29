class Gesto {
    detecteEMeAvise(video, aviso) {
        let yAntes = Number.MAX_VALUE; 
        let cores = new tracking.ColorTracker(['magenta']);
        cores.on('track', (evento) => {
            if (evento.data.length) {
                if (evento.data[0].y - yAntes >= 10) {
                    aviso();
                }
                yAntes = evento.data[0].y;
            }
        });
        tracking.track(video, cores);
    }
}