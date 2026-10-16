import { createRoot } from 'react-dom/client';
import { CarrinhoProvider } from './context/CarrinhoContext';
import Navbar from './components/Navbar';
import CarrinhoOffcanvas from './components/CarrinhoOffcanvas';
import Jogos from './page/Jogos';

const elemento = document.getElementById('navbar-root');

if (!elemento) {
  throw new Error('Elemento #navbar-root não encontrado no index.html.');
}

const paginaAtual = window.location.pathname;
const ehPaginaDeJogos = paginaAtual.includes('jogos.html');

createRoot(elemento).render(
  <CarrinhoProvider>
    <Navbar />

    {ehPaginaDeJogos && (
      <main>
        <Jogos />
      </main>
    )}

    <CarrinhoOffcanvas />
  </CarrinhoProvider>
);