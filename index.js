let placaNaoAcentuadasMinusculas = new Placa(letrasMaiusculas = false, letrasAcentuadas = false);
let placaNaoAcentuadasMaiusculas = new Placa(letrasMaiusculas = true, letrasAcentuadas = false);
let placaAcentuadasMinusculas = new Placa(letrasMaiusculas = false, letrasAcentuadas = true);
let placaAcentuadasMaiusculas = new Placa(letrasMaiusculas = true, letrasAcentuadas = true);
let relogio = new Relogio();
let anotacao = new Anotacao();
let interlocutor = new Interlocutor(placaNaoAcentuadasMinusculas, placaNaoAcentuadasMaiusculas, placaAcentuadasMinusculas, placaAcentuadasMaiusculas, relogio, anotacao);
$(() => {
    $(document.body).bind('click', () => {
        interlocutor.gesticular();
    });
    interlocutor.prepararParaMostrar(document.body);
});
