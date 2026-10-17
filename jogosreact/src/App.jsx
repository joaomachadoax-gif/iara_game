import { CarrinhoProvider } from './context/CarrinhoContext';
import Navbar from './components/Navbar';
import CarrinhoOffcanvas from './components/CarrinhoOffcanvas';
import DivulgarJogo from './pages/DivulgarJogo';
import Jogos from './page/Jogos';
import 'src/assets/images/Logo.png';

function App() {
  return (
    <CarrinhoProvider>
      <Navbar />
      <main>
        <DivulgarJogo />
      </main>

      <CarrinhoOffcanvas />
    </CarrinhoProvider>
  );
}

export default App;