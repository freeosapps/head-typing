let placa = new Placa();
let relogio = new Relogio();
let anotacao = new Anotacao();
let interlocutor = new Interlocutor(placa, relogio, anotacao);
$(() => {
    interlocutor.prepararParaMostrar(document.body);
});