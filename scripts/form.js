document.addEventListener('DOMContentLoaded', function () {
    const formElement = document.getElementById('contactForm');
    const textArea = document.getElementById('selectedProducts');
    const submitButton = document.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const whatsappIcon = submitButton.querySelector('.whatsapp-icon');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const spinner = loadingOverlay.querySelector('.spinner');
    const spinnerIcon = spinner.querySelector('.fa-spinner');
    const checkIcon = spinner.querySelector('.fa-check');

    formElement.addEventListener('submit', function (event) {
        // Previne o envio padrão do formulário
        event.preventDefault();

        // Exibe o overlay de carregamento
        loadingOverlay.style.display = 'flex';

        // Preenche o textarea com os dados dos produtos selecionados
        textArea.value = generateQuoteText();

        // Captura os valores dos campos do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const tel = document.getElementById('tel').value;
        const selectedProducts = textArea.value;

        // Gera um identificador único para cada submissão
        const uniqueId = generateUniqueId();

        // Monta o payload conforme necessário para o PipeRun
        const payload = {
            leads: [{
                id: "WebSite_Nova_Metalica",
                user: name,
                email: email,
                name: name,
                personal_phone: tel,
                mobile_phone: tel,
                last_conversion: {
                    source: "site_nova_metalica"
                },
                custom_fields: {
                    selectedProducts,
                    uniqueId
                }
            }]
        };

        // Envia a requisição para o endpoint do PipeRun
        fetch('https://app.pipe.run/webservice/integradorJson?hash=56c50ba8-44e9-42fd-ba51-93207130106f', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);

            // Oculta o spinner e mostra o ícone de check
            setTimeout(() => {
                spinner.classList.add('show-check');
                setTimeout(() => {
                    loadingOverlay.style.display = 'none'; // Oculta o overlay após a animação
                }, 500); // Tempo para a transição do check
            }, 300); // Tempo da animação do spinner

            // Limpa o formulário após o envio
            formElement.reset();
            textArea.value = ''; // Limpa o textarea

            // Altera o botão para o link do WhatsApp com ícone
            submitButton.classList.add('success-background');
            buttonText.style.display = 'none'; // Esconde o texto do botão
            whatsappIcon.style.display = 'inline-block'; // Mostra o ícone do WhatsApp

            // Muda o texto do h2 para "Já enviado" com ícone de check
            const heading = document.querySelector('#contactForm .form-right-text h2');
            heading.innerHTML = 'Enviado com sucesso!';

            submitButton.onclick = function() {
                window.open('https://wa.link/fiqr5h', '_blank');
            };
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Houve um erro ao enviar o formulário.');
        });
    });

    function generateQuoteText() {
        const sidebarProducts = document.querySelectorAll('.sidebar-product');
        let text = "<b>Produtos selecionados:</b><br>";

        sidebarProducts.forEach(product => {
            const productName = product.querySelector('.sidebar-product-details h6').textContent;
            const productThickness = product.querySelector('.sidebar-product-details p').textContent;
            text += `<b>Produto:</b> ${productName}<br><b>Medidas:</b> ${productThickness}<br><br>`;
        });

        return text;
    }

    // Função para gerar um identificador único
    function generateUniqueId() {
        return new Date().getTime().toString();
    }
});
