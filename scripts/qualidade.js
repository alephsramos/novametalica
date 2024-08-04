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

// Inicia o loop de animação apenas se o container estiver visível
if (container.getBoundingClientRect().top < window.innerHeight) {
    requestAnimationFrame(updateBackgroundPosition);
}

window.addEventListener('scroll', () => {
    // Atualiza a animação durante o scroll
    if (container.getBoundingClientRect().top < window.innerHeight) {
        requestAnimationFrame(updateBackgroundPosition);
    }
});
