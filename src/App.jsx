import DivulgarJogo from './pages/DivulgarJogo';

function App() {
  return (
    <>
      <header className="bg-dark text-white py-3">
        <div className="container">
          <h1 className="h3 mb-0">Iara Games</h1>
        </div>
      </header>

      <main>
        <DivulgarJogo />
      </main>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-0">Iara Games — Descubra e divulgue jogos brasileiros.</p>
        </div>
      </footer>
    </>
  );
}

export default App;