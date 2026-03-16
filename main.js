function verificarCampos() {
    const cpf = document.getElementById("cpf").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const botao = document.getElementById("botaoPartipar");

    if (cpf && nome && telefone) {
        botao.removeAttribute("disabled");
    } else {
        botao.setAttribute("disabled", "disabled");
    }
}

// Monitorar mudanças nos campos
document.addEventListener("DOMContentLoaded", function() {
    const cpfInput = document.getElementById("cpf");
    const nomeInput = document.getElementById("nome");
    const telefoneInput = document.getElementById("telefone");

    cpfInput.addEventListener("input", verificarCampos);
    nomeInput.addEventListener("input", verificarCampos);
    telefoneInput.addEventListener("input", verificarCampos);
});

function getUsedCpfs() {
    const stored = localStorage.getItem("usedCpfs");
    return stored ? JSON.parse(stored) : [];
}

function saveUsedCpfs(cpfs) {
    localStorage.setItem("usedCpfs", JSON.stringify(cpfs));
}

function participar() {
    const cpfInput = document.getElementById("cpf");
    const cpf = (cpfInput.value || "").trim();
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const item = localStorage.getItem("ultimoNumeroSorteado") || "0";


    if (!cpf) {
        alert("Por favor, insira seu CPF para participar.");
        return;
    }

    if (!/^\d{11}$/.test(cpf)) {
        alert("CPF inválido. Por favor, insira um CPF válido com 11 dígitos.");
        return;
    }

    const usedCpfs = getUsedCpfs();
    if (usedCpfs.includes(cpf)) {
        alert("Este CPF já foi utilizado");
        return;
    }


    // Armazena os dados do participante no localStorage para envio posterior
    localStorage.setItem('cpfParticipante', cpf);
    localStorage.setItem('nomeParticipante', nome);
    localStorage.setItem('telefoneParticipante', telefone);

    usedCpfs.push(cpf);
    saveUsedCpfs(usedCpfs);

    alert("Obrigado por participar! Seu CPF: " + cpf);
    cpfInput.value = "";
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";

    // Redireciona para a página do sorteio após o cadastro
    window.location.href = "sorteio.html";
}   

