function buscarCep() {
    const cep = document.getElementById("cepInput").value;

    const ceps = {
        "17250-000": { lat: -22.0744, lng: -48.7405, horario: "08:00" },
        "17255-154": { lat: -22.08158, lng: -48.74606, horario: "09:30" },
        "05000-000": { lat: -23.530, lng: -46.620, horario: "10:15" }
    };

    if (ceps[cep]) {
        const local = ceps[cep];
        map.setView([local.lat, local.lng], 15);

        L.marker([local.lat, local.lng]).addTo(map)
            .bindPopup("Local selecionado: " + cep)
            .openPopup();

        document.getElementById("horario").innerText = local.horario;
    } else {
        alert("CEP não encontrado no sistema.");
    }
}






document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("notificacoesContainer");
    const agora = new Date();
    const hora = agora.getHours();
    const minutos = agora.getMinutes();

    function adicionarNotificacao(horario, mensagem) {
        const div = document.createElement("div");
        div.classList.add("notificacao");
        div.innerHTML = `<small>${horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${horario.toLocaleDateString()}</small>${mensagem}`;
        container.prepend(div);
    }

    function gerarNotificacoes() {
        const hoje = new Date();
        const base = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 12, 0, 0);

        if (agora >= base) {
            adicionarNotificacao(base, "🟢 O caminhão já chegou!");
        } else if (agora >= new Date(base.getTime() - 30 * 60000)) {
            adicionarNotificacao(new Date(base.getTime() - 30 * 60000), "🕑 O caminhão chegará em 30 minutos.");
        } else if (agora >= new Date(base.getTime() - 60 * 60000)) {
            adicionarNotificacao(new Date(base.getTime() - 60 * 60000), "🕑 O caminhão chegará em 60 minutos.");
        } else if (agora >= new Date(base.getTime() - 120 * 60000)) {
            adicionarNotificacao(new Date(base.getTime() - 120 * 60000), "🚮 Já colocou o lixo lá fora?");
        } else {
            adicionarNotificacao(agora, "🔔 Nenhuma nova notificação no momento.");
        }

        adicionarNotificacao(new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 6, 0, 0), "🔔 Lembrete: Dia de coleta hoje.");
        adicionarNotificacao(new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 1, 8, 5, 0), "✅ Caminhão passou ontem com sucesso.");
    }

    gerarNotificacoes();
});
