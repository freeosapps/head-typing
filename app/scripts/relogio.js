let Relogio = function(tempo) {
    setInterval(() => {
        PubSub.publish(`passaram${tempo}Milisegundos`);
    }, tempo);    
};