let placaMinusculas = new Placa(letrasMaiusculas = false);
let placaMaiusculas = new Placa(letrasMaiusculas = true);
let relogio = new Relogio();
let anotacao = new Anotacao();
let interlocutor = new Interlocutor(placaMinusculas, placaMaiusculas, relogio, anotacao);
$(() => {
    $(document.body).bind('click', () => {
        interlocutor.gesticular();
    });
    interlocutor.prepararParaMostrar(document.body);
});
