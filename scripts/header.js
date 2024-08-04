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

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navSidebar = document.getElementById('navSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const navLinks = document.querySelectorAll('.nav-sidebar-links a');

    // Função para abrir a sidebar
    function openSidebar() {
        navSidebar.classList.add('show');
        document.body.style.overflow = 'hidden'; // Impede o scroll da página
    }

    // Função para fechar a sidebar
    function closeSidebarFunc() {
        navSidebar.classList.remove('show');
        document.body.style.overflow = ''; // Restaura o scroll da página
    }

    // Abre a sidebar ao clicar no menu hamburger
    hamburgerMenu.addEventListener('click', openSidebar);

    // Fecha a sidebar ao clicar no botão X
    closeSidebar.addEventListener('click', closeSidebarFunc);

    // Fecha a sidebar ao clicar fora dela
    window.addEventListener('click', (event) => {
        if (!navSidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            closeSidebarFunc();
        }
    });

    // Fecha a sidebar ao clicar em qualquer link dentro dela
    navLinks.forEach(link => {
        link.addEventListener('click', closeSidebarFunc);
    });
});
