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

// Problema2 - Campo de busca sem orientação ao usuário
// Solução: validar em tempo real e exibir mensagens de erro/confirmação

(function () {
  const searchInput = document.querySelector('input[aria-label="Buscar jogos"]');

  if (!searchInput) {
    console.warn('Campo de busca não encontrado: input[aria-label="Buscar jogos"]');
    return;
  }

  // Cria elemento de feedback (mensagem abaixo do campo)
  let feedback = searchInput.parentElement.querySelector('.form-text');

  if (!feedback) {
    feedback = document.createElement('div');
    feedback.classList.add('form-text', 'mt-1');
    searchInput.parentElement.appendChild(feedback);
  }

  searchInput.addEventListener('input', () => {
    const value = searchInput.value.trim();

    if (value.length === 0) {
      feedback.textContent = '';
      feedback.classList.remove('text-warning', 'text-success');
      searchInput.classList.remove('is-valid', 'is-invalid');
    } else if (value.length < 3) {
      feedback.textContent = 'Digite pelo menos 3 caracteres para buscar.';
      feedback.classList.remove('text-success');
      feedback.classList.add('text-warning');
      searchInput.classList.remove('is-valid');
      searchInput.classList.add('is-invalid');
    } else {
      feedback.textContent = 'Buscando por "' + value + '"...';
      feedback.classList.remove('text-warning');
      feedback.classList.add('text-success');
      searchInput.classList.remove('is-invalid');
      searchInput.classList.add('is-valid');
    }
  });

  console.log('Validação da busca inicializada com sucesso.');
})();

// Problema3 - Usuário não identifica em qual seção do site está
// Solução: destacar automaticamente o link ativo na navbar com base na URL

(function () {
  const currentPath = window.location.pathname;

  // Seleciona todos os links da navbar
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Ignora links sem href ou com "#"
    if (!href || href === '#') return;

    // Verifica se o href corresponde ao caminho atual
    if (currentPath.endsWith(href)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  console.log('Destaque do link ativo na navbar atualizado com sucesso.');
})();
