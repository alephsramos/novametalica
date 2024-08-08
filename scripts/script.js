<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "nk8w5pi1uz");
</script>


fetch('produtos.json')
  .then(response => response.json())
  .then(data => {
    const produtos = data.produtos;
    const container = document.getElementById('produtos-container');

    produtos.forEach(produto => {
      const button = document.createElement('button');
      button.innerText = produto.nome;

      button.addEventListener('click', () => {
        window.location.href = produto.pagina;
      });

      container.appendChild(button);
    });
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));


document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('projetos-cards-div');
    const cards = document.querySelectorAll('.projetos-cards');
    const rightButton = document.getElementById('projeto_right');
    const leftButton = document.getElementById('projeto_left');

    let currentIndex = 0; // Índice do primeiro card visível
    let autoScrollInterval; // Intervalo de rotação automática

    // Função para atualizar a visibilidade dos cards
    function updateCards() {
        // Ocultar todos os cards inicialmente
        cards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('card-large');
        });

        // Exibir os três próximos cards
        for (let i = 0; i < 3; i++) {
            let index = (currentIndex + i) % cards.length;
            cards[index].style.display = 'block';

            // Aplicar o estilo ao card central
            if (i === 1) {
                cards[index].classList.add('card-large');
            }
        }

        // Atualizar a visibilidade dos botões
        rightButton.style.display = (currentIndex + 3 < cards.length) ? 'block' : 'none';
        leftButton.style.display = (currentIndex > 0) ? 'block' : 'none';
    }

    // Função para mover automaticamente os cards
    function autoScroll() {
        autoScrollInterval = setInterval(() => {
            if (currentIndex + 3 < cards.length) {
                currentIndex += 1;
            } else {
                // Reverso quando chegar ao final
                currentIndex = 0;
            }
            updateCards();
        }, 5000); // Tempo em milissegundos entre cada movimento automático
    }

    leftButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            // Atualizar o índice do primeiro card visível
            currentIndex -= 1;
            // Atualizar a visibilidade dos cards
            updateCards();
        }
    });

    rightButton.addEventListener('click', function() {
        if (currentIndex + 3 < cards.length) {
            // Atualizar o índice do primeiro card visível
            currentIndex += 1;
            // Atualizar a visibilidade dos cards
            updateCards();
        }
    });

    // Inicializar a visibilidade dos cards
    updateCards();

    // Iniciar a rotação automática dos cards
    autoScroll();

    // Parar a rotação automática quando o usuário interage com os botões
    leftButton.addEventListener('click', () => clearInterval(autoScrollInterval));
    rightButton.addEventListener('click', () => clearInterval(autoScrollInterval));
});




document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.scroll-element');

    function checkVisibility() {
        const triggerHeight = window.innerHeight / 1.2;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerHeight) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Run initially to check visibility on load
});
  