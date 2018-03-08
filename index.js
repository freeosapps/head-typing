let placa = new Placa();
let relogio = new Relogio();
let anotacao = new Anotacao();
let interlocutor = new Interlocutor(placa, relogio, anotacao);
$(() => {
    $(document.body).bind('click', () => {
        interlocutor.gesticular();
    });
    interlocutor.prepararParaMostrar(document.body);
});
