import JogoCard from '../components/JogoCard';
import { jogos } from '../data/jogos';

export default function Jogos() {
  return (
    <main className="jogos-page">
      <section className="py-5 mb-5">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12">
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