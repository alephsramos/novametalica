const container = document.querySelector('.qualidades-container');

function updateBackgroundPosition() {
    const containerTop = container.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (containerTop < windowHeight && containerTop > -container.offsetHeight) {
        // Calcula a porcentagem de rolagem dentro da seção
        const scrollPercent = (windowHeight - containerTop) / (windowHeight + container.offsetHeight);

        // Calcula a nova posição do background (0% a 100%)
        const backgroundPositionX = scrollPercent * 100;

        // Atualiza a posição do background
        container.style.backgroundPosition = `${backgroundPositionX}% center`;
    }

    requestAnimationFrame(updateBackgroundPosition);
}

// Inicia o loop de animação
requestAnimationFrame(updateBackgroundPosition);