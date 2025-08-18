import { useState } from "react";
import "./App.css";

function App() {
  const [despesas, setDespesas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("Outros");
  const [erro, setErro] = useState("");

  const adicionarDespesa = (e) => {
    e.preventDefault();
    if (!descricao || !valor || parseFloat(valor) <= 0) {
      setErro("Preencha todos os campos e insira um valor positivo.");
      return;
    }
    const novaDespesa = {
      id: Date.now(),
      descricao,
      valor: parseFloat(valor),
      categoria,
    };
    setDespesas([...despesas, novaDespesa]);
    setDescricao("");
    setValor("");
    setCategoria("Outros");
    setErro("");
  };

  // Calcular total automaticamente
  const total = despesas.reduce((acc, d) => acc + d.valor, 0);

  return (
    <div className="App">
      <h1>Calculadora de Orçamento</h1>
      <form onSubmit={adicionarDespesa}>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option>Outros</option>
          <option>Alimentação</option>
          <option>Transporte</option>
          <option>Educação</option>
          <option>Moradia</option>
          <option>Lazer</option>
        </select>
        <button type="submit">Adicionar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <ul>
        {despesas.map((d) => (
          <li key={d.id}>
            {d.descricao} - R${d.valor.toFixed(2)} ({d.categoria})
          </li>
        ))}
      </ul>

      {/* Total dos gastos */}
      <h2>Total de Gastos: R$ {total.toFixed(2)}</h2>
    </div>
  );
}

export default App;
