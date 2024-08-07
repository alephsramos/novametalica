document.addEventListener('DOMContentLoaded', function () {
    const formElement = document.getElementById('contactForm');
    const textArea = document.getElementById('selectedProducts');
    const submitButton = formElement.querySelector('button[type="submit"]');
    const successAlert = document.getElementById('successAlert');

    formElement.addEventListener('submit', function (event) {
        // Previne o envio padrão do formulário
        event.preventDefault();
        
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
                id: "site_nova_metalica_" + uniqueId,
                user: name,
                title: name,
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
            showSuccessAlert(); // Mostra o alerta de sucesso

            // Limpa o formulário após o envio
            formElement.reset();
            textArea.value = ''; // Limpa o textarea

            // Desativa o botão de envio para impedir envios duplicados
            submitButton.disabled = true;
            submitButton.textContent = "Você já enviou esse formulário";

            // Altera o background para verde de sucesso
            formElement.classList.add('success-background');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Houve um erro ao enviar o formulário.');
        });
    });

    // Função para mostrar o alerta de sucesso
    function showSuccessAlert() {
        successAlert.style.display = 'block';
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 300000); // Esconde o alerta após 3 segundos
    }

    function generateQuoteText() {
        const sidebarProducts = document.querySelectorAll('.sidebar-product');
        let text = "Produtos selecionados:<br>";

        sidebarProducts.forEach(product => {
            const productName = product.querySelector('.sidebar-product-details h6').textContent;
            const productThickness = product.querySelector('.sidebar-product-details p').textContent;
            text += `Produto: ${productName}<br>Medidas: ${productThickness}<br><br>`;
        });

        return text;
    }

    // Função para gerar um identificador único
    function generateUniqueId() {
        return new Date().getTime().toString();
    }

    // Verifica se há uma âncora na URL e rola suavemente até o formulário
    window.addEventListener('load', function() {
        const hash = window.location.hash;
        if (hash === '#form') {
            const formElement = document.getElementById('form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Reativa o botão e restaura o texto ao carregar a página
        submitButton.disabled = false;
        submitButton.textContent = "Enviar";
    });
});
