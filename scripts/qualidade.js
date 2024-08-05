const container = document.querySelector('.qualidades-container');
let lastScrollPercent = 0; // Armazena a última porcentagem de rolagem

function updateBackgroundPosition() {
    const containerTop = container.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Verifica se o container está na tela
    if (containerTop < windowHeight && containerTop > -container.offsetHeight) {
        // Calcula a porcentagem de rolagem dentro da seção
        const scrollPercent = (windowHeight - containerTop) / (windowHeight + container.offsetHeight);

        // Verifica se a diferença em relação à última posição é significativa
        if (Math.abs(scrollPercent - lastScrollPercent) > 0.01) { // Tolerância de 1%
            lastScrollPercent = scrollPercent;

            // Calcula a nova posição do background (0% a 100%)
            const backgroundPositionX = scrollPercent * 100;

            // Atualiza a posição do background
            container.style.backgroundPosition = `${backgroundPositionX}% center`;
        }
    }

    // Chama requestAnimationFrame apenas se o container estiver visível
    if (containerTop < windowHeight && containerTop > -container.offsetHeight) {
        requestAnimationFrame(updateBackgroundPosition);
    }
}

function startAnimationIfDesktop() {
    // Verifica se a tela é maior que 768px (ou qualquer largura que defina como o ponto de corte para mobile)
    if (window.innerWidth > 768) {
        if (container.getBoundingClientRect().top < window.innerHeight) {
            requestAnimationFrame(updateBackgroundPosition);
        }

        window.addEventListener('scroll', () => {
            // Atualiza a animação durante o scroll
            if (container.getBoundingClientRect().top < window.innerHeight) {
                requestAnimationFrame(updateBackgroundPosition);
            }
        });
    }
}

// Chama a função para iniciar a animação se estiver em um dispositivo desktop
startAnimationIfDesktop();

// Adiciona um event listener para lidar com a mudança de tamanho da janela
window.addEventListener('resize', () => {
    // Remove todos os event listeners de rolagem quando em mobile
    if (window.innerWidth <= 768) {
        window.removeEventListener('scroll', updateBackgroundPosition);
    } else {
        // Se for redimensionado para desktop, inicia a animação novamente
        startAnimationIfDesktop();
    }
});
