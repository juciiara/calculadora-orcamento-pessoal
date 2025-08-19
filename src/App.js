import { useState } from "react";
import "./App.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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

  // Agrupar por categoria para o resumo
  const resumo = despesas.reduce((acc, d) => {
    acc[d.categoria] = (acc[d.categoria] || 0) + d.valor;
    return acc;
  }, {});

  // Converter resumo em array para usar no gráfico
  const dadosGrafico = Object.keys(resumo).map((cat) => ({
    name: cat,
    value: resumo[cat],
  }));

  // Cores do gráfico
  const cores = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF4444"];

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

      {/* Resumo Mensal */}
      <h3>Resumo Mensal por Categoria</h3>
      <table border="1" style={{ margin: "0 auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Valor (R$)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(resumo).map((cat) => (
            <tr key={cat}>
              <td>{cat}</td>
              <td>R$ {resumo[cat].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Gráfico */}
      {dadosGrafico.length > 0 && (
        <PieChart width={400} height={300}>
          <Pie
            data={dadosGrafico}
            cx={200}
            cy={150}
            outerRadius={100}
            dataKey="value"
            label
          >
            {dadosGrafico.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

export default App;
