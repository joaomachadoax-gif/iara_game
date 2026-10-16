import JogoCard from '../components/JogoCard';
import { jogos } from '../data/jogos';

export default function Jogos() {
  return (
    <main className="jogos-page">
      <section className="py-5 mb-5">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12">
              <a
                href="/"
                className="btn btn-link text-decoration-none jogos-page-back mb-4 d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-arrow-left"></i>
                <span>Voltar para a home</span>
              </a>

              <h1 className="display-4 fw-bold text-light">
                Todos os Jogos
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid pb-5">
        <div className="row g-4">
          {jogos.map((jogo) => (
            <JogoCard key={jogo.id} jogo={jogo} />
          ))}
        </div>
      </section>
    </main>
  );
}