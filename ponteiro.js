let Ponteiro = function() {
    let exibir = () => {
        $('.ponteiro').removeClass('ponteiro_oculto');
    };

    let ocultar = () => {
        $('.ponteiro').addClass('ponteiro_oculto');
        $('.ponteiro').css({
            top: 0,
            left: 0,
            width: 0,
            height: 0
        });
    };

    let mover = (elementoAtual) => {
        $('.ponteiro').animate({
            top: elementoAtual.offset().top,
            left: elementoAtual.offset().left,
            width: elementoAtual.outerWidth(),
            height: elementoAtual.outerHeight()
        });
    }

    this.ocultar = () => {
        ocultar();
    }

    this.exibir = () => {
        exibir();
    }

    this.posicionarSobre = (elemento) => {
        mover(elemento);
    }
}