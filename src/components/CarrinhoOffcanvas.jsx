import { useCarrinho } from '../context/CarrinhoContext';

export default function CarrinhoOffcanvas() {
  const {
    itens,
    aberto,
    fecharCarrinho,
    removerItem,
    valorTotal,
  } = useCarrinho();

  return (
    <>
      {aberto && (
        <div
          className="offcanvas-backdrop show"
          onClick={fecharCarrinho}
        ></div>
      )}

      <div
        className={`offcanvas offcanvas-end carrinho-offcanvas ${
          aberto ? 'show' : ''
        }`}
        style={{
          visibility: aberto ? 'visible' : 'hidden',
        }}
        tabIndex="-1"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold">Seu carrinho</h5>

          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={fecharCarrinho}
            aria-label="Fechar carrinho"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column">
          {itens.length === 0 ? (
            <p className="text-center mt-4">Seu carrinho está vazio.</p>
          ) : (
            <>
              <div className="carrinho-itens flex-grow-1">
                {itens.map((item) => (
                  <div key={item.id} className="carrinho-item">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="carrinho-item-img"
                    />

                    <div className="carrinho-item-info">
                      <p className="carrinho-item-titulo mb-1">
                        {item.nome}
                      </p>

                      <p className="carrinho-item-preco mb-0">
                        {item.quantidade} x{' '}
                        {item.preco.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="btn-remove-item"
                      onClick={() => removerItem(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="carrinho-total mt-3">
                <span>Valor total:</span>

                <span className="fw-bold">
                  {valorTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>

              <button
                type="button"
                className="btn btn-warning fw-semibold finalizar-compra-btn mt-3"
              >
                Finalizar compra
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}