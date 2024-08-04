document.addEventListener('DOMContentLoaded', function () {
    const heartButtons = document.querySelectorAll('.produto-card-btn-right');
    const sidebar = document.querySelector('.sidebar');
    const sidebarProductsContainer = document.querySelector('.sidebar-products');
    const closeSidebarButton = document.querySelector('.sidebar-close');
    const quoteButton = document.getElementById('quote-button');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const floatingButton = document.getElementById('floating-button');
    const badge = floatingButton.querySelector('.badge');
    const filterButtons = document.querySelectorAll('.produtos-topics-div-btn button');
    const productCards = Array.from(document.querySelectorAll('.produtos-card'));
    let currentPage = 0;
    let filteredCards = productCards;
    let savedProductsCount = 0;

    const leftButton = document.getElementById('produto_btn_left');
    const rightButton = document.getElementById('produto_btn_right');

    function updateItemsPerPage() {
        if (window.matchMedia("(max-width: 568px)").matches) {
            itemsPerPage = 1; // Menor tela
        } else if (window.matchMedia("(max-width: 992px)").matches) {
            itemsPerPage = 2; // Tela intermediária
        } else {
            itemsPerPage = 4; // Tela maior
        }
        currentPage = 0;
        showPage(currentPage); // Atualiza a exibição após a atualização
    }

    window.addEventListener('resize', updateItemsPerPage);
    updateItemsPerPage(); // Verificação inicial

    heartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.produtos-card');
            const productId = productCard.getAttribute('data-id');
            const heartIcon = this.querySelector('i');

            if (heartIcon.classList.contains('fa-regular')) {
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
                addProductToSidebar(productCard, productId);
            } else {
                heartIcon.classList.remove('fa-solid');
                heartIcon.classList.add('fa-regular');
                removeProductFromSidebar(productId);
            }
        });
    });

    function addProductToSidebar(productCard, productId) {
        if (!sidebarProductsContainer.querySelector(`[data-id="${productId}"]`)) {
            const productImage = productCard.querySelector('.produto-card-img img').cloneNode(true);
            const productName = productCard.querySelector('.produto-card-text-top h6').cloneNode(true);
            const productThickness = productCard.querySelector('.produto-card-text-center-center p').cloneNode(true);

            const sidebarProduct = document.createElement('div');
            sidebarProduct.classList.add('sidebar-product');
            sidebarProduct.setAttribute('data-id', productId);

            const sidebarProductDetails = document.createElement('div');
            sidebarProductDetails.classList.add('sidebar-product-details');

            sidebarProductDetails.appendChild(productName);
            sidebarProductDetails.appendChild(productThickness);

            const removeButton = document.createElement('button');
            removeButton.classList.add('sidebar-product-remove');
            removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

            removeButton.addEventListener('click', function (event) {
                event.stopPropagation();
                removeProductFromSidebar(productId);

                const heartButton = document.querySelector(`.produto-card-btn-right[data-id="${productId}"]`);
                if (heartButton) {
                    const heartIcon = heartButton.querySelector('i');
                    heartIcon.classList.remove('fa-solid');
                    heartIcon.classList.add('fa-regular');
                }
            });

            sidebarProduct.appendChild(productImage);
            sidebarProduct.appendChild(sidebarProductDetails);
            sidebarProduct.appendChild(removeButton);
            sidebarProductsContainer.appendChild(sidebarProduct);

            savedProductsCount++;
            updateFloatingButton();
            updateTextarea(); // Atualiza o textarea quando um produto é adicionado
        }
    }

    function removeProductFromSidebar(productId) {
        const sidebarProduct = sidebarProductsContainer.querySelector(`[data-id="${productId}"]`);
        if (sidebarProduct) {
            sidebarProductsContainer.removeChild(sidebarProduct);
            savedProductsCount--;
            updateFloatingButton();
            updateTextarea(); // Atualiza o textarea quando um produto é removido
        }
    }

    function updateFloatingButton() {
        if (savedProductsCount > 0) {
            floatingButton.classList.add('visible');
            badge.textContent = savedProductsCount;
        } else {
            floatingButton.classList.remove('visible');
            badge.textContent = '';
        }
    }

    function openSidebar() {
        sidebar.style.right = '0';
        sidebarOverlay.style.display = 'block';
        floatingButton.style.display = 'none';
    }

    function closeSidebar() {
        sidebar.style.right = '-100%';
        sidebarOverlay.style.display = 'none';
        floatingButton.style.display = 'block';
    }

    closeSidebarButton.addEventListener('click', closeSidebar);
    floatingButton.addEventListener('click', openSidebar);

    document.addEventListener('click', function (event) {
        if (!sidebar.contains(event.target) && !sidebarOverlay.contains(event.target) && !event.target.closest('.produto-card-btn-right') && !event.target.closest('#floating-button')) {
            closeSidebar();
        }
    });

    quoteButton.addEventListener('click', function () {
        closeSidebar();

        const formElement = document.getElementById("contactForm");
        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth" });
        }
    });

    function updateTextarea() {
        const textArea = document.getElementById("selectedProducts");
        if (textArea) {
            textArea.value = generateQuoteText();
        }
    }

    function generateQuoteText() {
        const products = Array.from(sidebarProductsContainer.children);
        let text = "Produtos selecionados:\n\n";

        products.forEach(product => {
            const productName = product.querySelector('.sidebar-product-details h6').textContent;
            const productThickness = product.querySelector('.sidebar-product-details p').textContent;
            text += `Produto: ${productName}\nEspessura: ${productThickness}\n\n\n`; // Adiciona uma quebra de linha extra entre os produtos
        });

        return text;
    }

    function showPage(pageIndex) {
        filteredCards.forEach((card, index) => {
            if (index >= pageIndex * itemsPerPage && index < (pageIndex + 1) * itemsPerPage) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function handleSwipe(startX, endX) {
        if (endX < startX) {
            // Swipe left (move para o próximo item)
            const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
            if (currentPage < totalPages - 1) {
                currentPage++;
                showPage(currentPage);
            }
        } else if (endX > startX) {
            // Swipe right (voltar ao item anterior)
            if (currentPage > 0) {
                currentPage--;
                showPage(currentPage);
            }
        }
    }

    let startX = 0;
    let isSwiping = false;

    function setupSwipeEvents() {
        document.addEventListener('touchstart', (e) => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                startX = e.touches[0].clientX;
                isSwiping = true;
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (isSwiping) {
                handleSwipe(startX, e.touches[0].clientX);
                startX = e.touches[0].clientX; // Atualiza startX para navegação contínua
            }
        });

        document.addEventListener('touchend', () => {
            isSwiping = false;
        });
    }

    setupSwipeEvents();

    rightButton.addEventListener('click', function () {
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
        if (currentPage < totalPages - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });

    leftButton.addEventListener('click', function () {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            filteredCards = productCards.filter(card => {
                return category === 'all' || card.getAttribute('data-category') === category;
            });

            currentPage = 0;

            showPage(currentPage); // Atualiza a exibição após aplicar o filtro
        });
    });
});