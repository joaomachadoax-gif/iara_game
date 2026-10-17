import { useCarrinho } from '../context/CarrinhoContext';

export default function Navbar() {
  const { abrirCarrinho, itens } = useCarrinho();

  const quantidadeItens = itens.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <nav className="navbar navbar-expand-lg py-3">
      <div className="navbar-container">
        <a
          className="navbar-brand d-flex align-items-center gap-3 me-4"
          href="#"
        >
          <img
            src="/src/images/logo-iara-games.svg"
            alt="Logo da Iara Games"
            width="59"
            height="49"
          />

          <span className="fw-bold fs-2 title">Iara Games</span>
        </a>

        <div className="navbar-content">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link px-3 fw-semibold" href="/pages/jogos.html">
                Loja
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link px-3 fw-semibold" href="#">
                Comunidade
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link px-3 fw-semibold" href="#">
                Sobre
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link px-3 fw-semibold" href="pages/suporte.html">
                Suporte
              </a>
            </li>
          </ul>

          <div className="navbar-actions">
            <div className="position-relative search-wrapper">
              <i
                className="bi bi-search position-absolute top-50 translate-middle-y"
                style={{
                  left: '12px',
                  fontSize: '15px',
                  pointerEvents: 'none',
                  color: '#aaa',
                }}
              ></i>

              <input
                className="form-control ps-5"
                type="search"
                placeholder="Buscar jogos"
                aria-label="Buscar jogos"
              />
            </div>

            <a
              href="#"
              className="login-btn text-nowrap fw-semibold"
            >
              Entrar
            </a>

            <button
              type="button"
              className="carrinho-btn position-relative"
              onClick={abrirCarrinho}
              aria-label="Abrir carrinho de compras"
            >
              <i className="bi bi-cart-fill" aria-hidden="true"></i>

              {quantidadeItens > 0 && (
                <span className="carrinho-quantidade">
                  {quantidadeItens}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}