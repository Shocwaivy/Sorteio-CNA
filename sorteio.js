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
        const randomSrc = encodeURI(winImages[Math.floor(Math.random() * winImages.length)]);

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
        });
    }, 300); // Tempo correspondente à transição CSS
}
