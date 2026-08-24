import { useState, useEffect } from "react";
import NavegacaoRegistros from "../components/NavegacaoRegistros";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Função para buscar pacientes do backend
  const carregarPacientes = () => {
    fetch("http://localhost:3000/api/pacientes")
      .then((res) => res.json())
      .then((data) => {
        setPacientes(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar pacientes:", err);
        setErro("Não foi possível carregar os pacientes.");
        setCarregando(false);
      });
  };

  useEffect(() => {
    carregarPacientes();
  }, []);

  if (carregando) return <p>Carregando pacientes...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  const pacienteAtual = pacientes[indiceAtual];

  return (
    <div className="pagina-pacientes">
      <h2>Gerenciamento de Pacientes</h2>

      {pacientes.length === 0 ? (
        <p>Nenhum paciente cadastrado no sistema.</p>
      ) : (
        <div className="card-paciente">
          <p><strong>ID:</strong> {pacienteAtual?.id}</p>
          <p><strong>Nome:</strong> {pacienteAtual?.nome}</p>
          <p><strong>CPF:</strong> {pacienteAtual?.cpf || "Não informado"}</p>
          <p><strong>Data de Nascimento:</strong> {pacienteAtual?.data_nascimento || "Não informada"}</p>
          <p><strong>Telefone:</strong> {pacienteAtual?.telefone || "Não informado"}</p>
          <p><strong>Endereço:</strong> {pacienteAtual?.endereco || "Não informado"}</p>
        </div>
      )}

      {/* Componente de navegação entre registros */}
      <NavegacaoRegistros
        indice={indiceAtual}
        total={pacientes.length}
        onIrPara={(novoIndice) => setIndiceAtual(novoIndice)}
      />
    </div>
  );
}