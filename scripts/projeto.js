// Função para abrir o modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

// Função para fechar o modal
function closeModal(modal) {
    if (modal) {
        modal.style.display = "none";
    }
}

// Configura os eventos de clique para os botões
document.querySelectorAll(".openModal").forEach(function(button) {
    button.addEventListener("click", function() {
        var modalId = this.getAttribute("data-modal");
        openModal(modalId);
    });
});

// Configura os eventos de clique para os botões de fechar
document.querySelectorAll(".close").forEach(function(span) {
    span.addEventListener("click", function() {
        closeModal(this.closest(".modal"));
    });
});

// Fecha o modal quando o usuário clica fora dele
window.addEventListener("click", function(event) {
    if (event.target.classList.contains("modal")) {
        closeModal(event.target);
    }
});
