// Problema1 - Botão "Entrar" sem feeedback
//Solução: adicionar um modal informativo ao clicar no botão "Entrar"

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();

            //Abre o modal Bootstrap
            const modalElement =
            document.getElementById('loginEmDesenvolvimentoModal');
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }
        });
    }
});