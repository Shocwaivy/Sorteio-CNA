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

    usedCpfs.push(cpf);
    saveUsedCpfs(usedCpfs);

    alert("Obrigado por participar! Seu CPF: " + cpf);
    cpfInput.value = "";

    // Redireciona para a página do sorteio após o cadastro
    window.location.href = "sorteio.html";
}   