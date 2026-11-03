import { useState } from 'react';
import { useCarrinho } from '../context/CarrinhoContext';

export default function CarrinhoOffcanvas() {
  const {
    itens,
    aberto,
    fecharCarrinho,
    removerItem,
    valorTotal,
  } = useCarrinho();

  const [modalAberto, setModalAberto] = useState(false);
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  const [dados, setDados] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    numero: '',
    complemento: '',
  });

  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setDados((valoresAnteriores) => ({
      ...valoresAnteriores,
      [name]: value,
    }));
  };

  const abrirModal = () => {
    setModalAberto(true);
    setCompraFinalizada(false);
    setErroCep('');
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const limparEndereco = () => {
    setDados((valoresAnteriores) => ({
      ...valoresAnteriores,
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
    }));
  };

  const buscarCep = async () => {
    const cep = dados.cep.replace(/\D/g, '');

    setErroCep('');

    if (cep.length !== 8) {
      setErroCep('Digite um CEP válido com 8 números.');
      limparEndereco();
      return;
    }

    try {
      setBuscandoCep(true);

      const resposta = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`
      );

      const dadosCep = await resposta.json();

      if (dadosCep.erro) {
        setErroCep('CEP não encontrado.');
        limparEndereco();
        return;
      }

      setDados((valoresAnteriores) => ({
        ...valoresAnteriores,
        logradouro: dadosCep.logradouro || '',
        bairro: dadosCep.bairro || '',
        localidade: dadosCep.localidade || '',
        uf: dadosCep.uf || '',
      }));
    } catch (erro) {
      setErroCep('Não foi possível consultar o CEP. Tente novamente.');
      limparEndereco();
    } finally {
      setBuscandoCep(false);
    }
  };

  const finalizarCompra = (event) => {
    event.preventDefault();

    setCompraFinalizada(true);
  };

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
                onClick={abrirModal}
              >
                Finalizar compra
              </button>
            </>
          )}
        </div>
      </div>

      {modalAberto && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content checkout-modal">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  Finalizar compra
                </h5>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={fecharModal}
                  aria-label="Fechar"
                ></button>
              </div>

              <div className="modal-body">
                {compraFinalizada ? (
                  <div className="text-center py-4">
                    <i className="bi bi-check-circle-fill compra-sucesso-icone"></i>

                    <h4 className="mt-3 fw-bold">
                      Compra finalizada!
                    </h4>

                    <p className="mb-0">
                      Obrigado, {dados.nomeCompleto}. Seu pedido foi
                      registrado com sucesso.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={finalizarCompra}>
                    <div className="mb-3">
                      <label className="form-label">
                        Nome completo
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="nomeCompleto"
                        value={dados.nomeCompleto}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Data de nascimento
                      </label>

                      <input
                        type="date"
                        className="form-control"
                        name="dataNascimento"
                        value={dados.dataNascimento}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">CEP</label>

                      <div className="d-flex gap-2">
                        <input
                          type="text"
                          className="form-control"
                          name="cep"
                          value={dados.cep}
                          onChange={handleChange}
                          placeholder="00000-000"
                          maxLength="9"
                          required
                        />

                        <button
                          type="button"
                          className="btn btn-warning fw-semibold"
                          onClick={buscarCep}
                          disabled={buscandoCep}
                        >
                          {buscandoCep ? 'Buscando...' : 'Buscar'}
                        </button>
                      </div>

                      {erroCep && (
                        <p className="checkout-erro mt-2 mb-0">
                          {erroCep}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Rua / Logradouro
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="logradouro"
                        value={dados.logradouro}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Bairro</label>

                        <input
                          type="text"
                          className="form-control"
                          name="bairro"
                          value={dados.bairro}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Cidade</label>

                        <input
                          type="text"
                          className="form-control"
                          name="localidade"
                          value={dados.localidade}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">UF</label>

                        <input
                          type="text"
                          className="form-control"
                          name="uf"
                          value={dados.uf}
                          onChange={handleChange}
                          maxLength="2"
                          required
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Número</label>

                        <input
                          type="text"
                          className="form-control"
                          name="numero"
                          value={dados.numero}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">
                          Complemento
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="complemento"
                          value={dados.complemento}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-warning w-100 fw-semibold"
                    >
                      Confirmar pedido
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}