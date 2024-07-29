document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('projetos-cards-div');
    const cards = document.querySelectorAll('.projetos-cards');
    const rightButton = document.getElementById('projeto_right');
    const rightLeft = document.getElementById('projeto_left');

    let currentIndex = 0; // Índice do primeiro card visível

    // Função para atualizar a visibilidade dos cards
    function updateCards() {
        // Ocultar todos os cards inicialmente
        cards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        });

        // Exibir os três próximos cards
        for (let i = 0; i < 3; i++) {
            let index = (currentIndex + i) % cards.length;
            cards[index].style.display = 'block';
            cards[index].classList.add('fade-in');
        }
    }

    rightLeft.addEventListener('click', function() {
        // Atualizar o índice do primeiro card visível
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;

        // Atualizar a visibilidade dos cards
        updateCards();
    });

    rightButton.addEventListener('click', function() {
        // Atualizar o índice do primeiro card visível
        currentIndex = (currentIndex + 1) % cards.length;

        // Atualizar a visibilidade dos cards
        updateCards();
    });

    // Inicializar a visibilidade dos cards
    updateCards();
});


function initMap() {
    const japeri = { lat: -22.6431, lng: -43.6534 }; // Coordenadas de Japeri
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: japeri,
    });

    const marker = new google.maps.Marker({
      position: japeri,
      map: map,
      title: "Meu Negócio",
    });
  }
