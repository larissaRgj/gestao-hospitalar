import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function Painel() {
  const [contagens, setContagens] = useState({ pacientes: 0, medicos: 0, consultas: 0 });
  const [mensagem, setMensagem] = useState(null);
  const [carregando, setCarregando] = useState(true);

  async function carregarContagens() {
    setCarregando(true);
    try {
      const [pacientes, medicos, consultas] = await Promise.all([
        api.listarPacientes(),
        api.listarMedicos(),
        api.listarConsultas(),
      ]);
      setContagens({
        pacientes: pacientes.length,
        medicos: medicos.length,
        consultas: consultas.length,
      });
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarContagens();
  }, []);

  async function aoCriarBanco() {
    try {
      const resultado = await api.criarBanco();
      setMensagem({ tipo: "sucesso", texto: resultado.mensagem });
      carregarContagens();
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  return (
    <div className="pagina">
      <header className="pagina__cabecalho">
        <div>
          <p className="pagina__eyebrow">painel</p>
          <h1>Gestão Hospitalar</h1>
          <p className="pagina__descricao">
            Cadastro e consulta de pacientes, médicos e agendamentos, com um único prontuário
            de origem.
          </p>
        </div>
        <button type="button" className="botao botao--fantasma" onClick={aoCriarBanco}>
          Preparar banco de dados
        </button>
      </header>

      {mensagem && (
        <div className={`aviso aviso--${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

      <div className="grade-cartoes">
        <Link to="/pacientes" className="cartao-resumo">
          <span className="cartao-resumo__indice">01</span>
          <span className="cartao-resumo__numero">
            {carregando ? "—" : contagens.pacientes}
          </span>
          <span className="cartao-resumo__rotulo">Pacientes cadastrados</span>
        </Link>

        <Link to="/medicos" className="cartao-resumo">
          <span className="cartao-resumo__indice">02</span>
          <span className="cartao-resumo__numero">
            {carregando ? "—" : contagens.medicos}
          </span>
          <span className="cartao-resumo__rotulo">Médicos cadastrados</span>
        </Link>

        <Link to="/consultas" className="cartao-resumo">
          <span className="cartao-resumo__indice">03</span>
          <span className="cartao-resumo__numero">
            {carregando ? "—" : contagens.consultas}
          </span>
          <span className="cartao-resumo__rotulo">Consultas agendadas</span>
        </Link>
      </div>

      <div className="cartao cartao--nota">
        <p>
          <strong>Como começar:</strong> clique em "Preparar banco de dados" para garantir que
          as tabelas existam (isso já acontece automaticamente ao ligar o servidor). Depois,
          cadastre pacientes e médicos antes de agendar consultas — o formulário de consultas
          usa esses cadastros para preencher os seletores.
        </p>
      </div>
    </div>
  );
}
