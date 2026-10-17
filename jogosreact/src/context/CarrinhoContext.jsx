import { createContext, useContext, useMemo, useState } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);
  const [aberto, setAberto] = useState(false);

  const adicionarItem = (jogo) => {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find(
        (item) => item.id === jogo.id
      );

      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.id === jogo.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [
        ...itensAtuais,
        {
          id: jogo.id,
          nome: jogo.nome,
          preco: jogo.preco,
          imagem: jogo.imagem,
          quantidade: 1,
        },
      ];
    });
  };

  const removerItem = (id) => {
    setItens((itensAtuais) =>
      itensAtuais.filter((item) => item.id !== id)
    );
  };

  const abrirCarrinho = () => setAberto(true);
  const fecharCarrinho = () => setAberto(false);

  const valorTotal = useMemo(() => {
    return itens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  }, [itens]);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        aberto,
        adicionarItem,
        removerItem,
        abrirCarrinho,
        fecharCarrinho,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}