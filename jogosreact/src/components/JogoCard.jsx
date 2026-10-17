import { useCarrinho } from '../context/CarrinhoContext';

export default function JogoCard({ jogo }) {
  const { adicionarItem, abrirCarrinho } = useCarrinho();

  const precoFormatado = jogo.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const comprarJogo = () => {
    adicionarItem({
      id: jogo.id,
      nome: jogo.titulo,
      preco: jogo.preco,
      imagem: jogo.imagem,
    });

    abrirCarrinho();
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card game-card h-100">
        <div className="game-image-wrapper">
          <img
            src={jogo.imagem}
            alt={`Capa do jogo ${jogo.titulo}`}
            className="card-img-top"
            loading="lazy"
          />
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold mb-3">{jogo.titulo}</h5>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span className="game-price fw-bold">{precoFormatado}</span>

            <button
              type="button"
              className="btn btn-warning btn-sm fw-bold px-3"
              onClick={comprarJogo}
            >
              Comprar <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}