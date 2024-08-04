window.addEventListener('scroll', function() {
    // Verifica se a largura da janela é maior que 768px
    if (window.innerWidth > 768) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let header = document.querySelector('.header');
        let scale = 1 + scrollTop / 1000; // Ajuste esse valor conforme necessário
        
        header.style.backgroundSize = scale * 100 + '%';
    }
});

document.getElementById('contact_btn').addEventListener('click', function() {
    document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
});