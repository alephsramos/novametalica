document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.animatedCounter');
    const duration = 2000; // Duração da animação em milissegundos

    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target'); // Obtém o número alvo do atributo data-target
        const increment = target / (duration / 16); // Incremento por frame (assumindo 60fps)
        let currentNumber = 0;

        function updateCounter() {
            currentNumber += increment;
            if (currentNumber < target) {
                counter.innerText = Math.floor(currentNumber) + (counter.innerText.includes('%') ? '%' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + (counter.innerText.includes('%') ? '%' : '+');
            }
        }

        updateCounter();
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Inicia a contagem quando 10% do elemento estiver visível
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.innerText = entry.target.getAttribute('data-target').includes('%') ? '0%' : '0+'; // Reinicia o texto do contador
                animateCounter(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
});