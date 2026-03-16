function ganhou() {
    alert("Parabéns! Você ganhou! entre em contato conosco para receber seu prêmio.");
    // Redireciona para a página de contato
    window.location.href = "contato.html";
}

function virar(element) {
    const container = element.parentElement;

    // Permite apenas um clique por vez (uma única carta)
    if (document.body.classList.contains('virado-total')) {
        return;
    }

    // Verifica se esta carta já foi virada
    if (container.classList.contains('virado')) {
        return;
    }

    // Bloqueia cliques em todas as cartas após a primeira virada
    document.body.classList.add('virado-total');
    document.querySelectorAll('.carta-container').forEach(c => {
        c.style.pointerEvents = 'none';
    });

    // Adiciona a classe para iniciar a transição
    container.classList.add('virado');

    // Faz a imagem desaparecer (fade-out)
    element.style.opacity = '0';
    
    // Após a transição, escolhe aleatoriamente uma imagem "win" e mostra no lugar
    setTimeout(() => {
        const winImages = [
            'images/win (1).png',
            'images/win (2).png',
            'images/win (3).png',
            'images/win (4).png',
            'images/win (5).png',
            'images/win (6).png',
        ];
        const indexSorteado = Math.floor(Math.random() * winImages.length);
        const randomSrc = encodeURI(winImages[indexSorteado]);
        const numeroSorteado = indexSorteado + 1; // Números de 1 a 6, correspondendo à win sorteada

        const imagemWin = document.createElement('img');
        imagemWin.src = randomSrc;
        imagemWin.alt = 'Carta virada';
        imagemWin.className = 'carta-virada';
        imagemWin.style.opacity = '0';

        // Remove a imagem original e adiciona a imagem sorteada
        element.style.display = 'none';
        container.appendChild(imagemWin);

        // Força repaint para garantir que a imagem apareça imediatamente
        requestAnimationFrame(() => {
            imagemWin.style.opacity = '1';
            
            // Exibe o número sorteado
            document.getElementById('numeroSorteado').textContent = numeroSorteado;
            document.getElementById('resultado').style.display = 'block';

            // Armazena o número em localStorage para consulta posterior
            localStorage.setItem('ultimoNumeroSorteado', numeroSorteado);

            // Envia os dados para a planilha após o sorteio
            enviarDadosParaPlanilha();
            ganhou();
        });
    }, 300); // Tempo correspondente à transição CSS
}

function enviarDadosParaPlanilha() {
    const cpf = localStorage.getItem('cpfParticipante');
    const nome = localStorage.getItem('nomeParticipante');
    const telefone = localStorage.getItem('telefoneParticipante');
    const numeroSorteado = localStorage.getItem('ultimoNumeroSorteado');

    if (cpf && nome && telefone && numeroSorteado) {
        fetch("https://script.google.com/macros/s/AKfycby56no-V6pFBszB1AYp3MmTXmLD2ty0O5WewW-bxtZhWd___h_WOIdsuxjscWUeoKs4ng/exec", {
            method: "POST",
            body: JSON.stringify({
                cpf: cpf,
                nome: nome,
                telefone: telefone,
                item: numeroSorteado
            })
        }).then(response => {
            if (response.ok) {
                console.log('Dados enviados com sucesso!');
            } else {
                console.error('Erro ao enviar dados');
            }
        }).catch(error => {
            console.error('Erro na requisição:', error);
        });
    }
}

