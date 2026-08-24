import { useState, useEffect } from "react";
import NavegacaoRegistros from "../components/NavegacaoRegistros";

export default function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Função para buscar médicos do backend
  const carregarMedicos = () => {
    fetch("http://localhost:3000/api/medicos")
      .then((res) => res.json())
      .then((data) => {
        setMedicos(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar médicos:", err);
        setErro("Não foi possível carregar os médicos.");
        setCarregando(false);
      });
  };

  useEffect(() => {
    carregarMedicos();
  }, []);

  if (carregando) return <p>Carregando médicos...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  const medicoAtual = medicos[indiceAtual];

  return (
    <div className="pagina-medicos">
      <h2>Gerenciamento de Médicos</h2>

      {medicos.length === 0 ? (
        <p>Nenhum médico cadastrado no sistema.</p>
      ) : (
        <div className="card-medico">
          <p><strong>ID:</strong> {medicoAtual?.id}</p>
          <p><strong>Nome:</strong> {medicoAtual?.nome}</p>
          <p><strong>Especialidade:</strong> {medicoAtual?.especialidade || "Não informada"}</p>
          <p><strong>CRM:</strong> {medicoAtual?.crm || "Não informado"}</p>
          <p><strong>Telefone:</strong> {medicoAtual?.telefone || "Não informado"}</p>
        </div>
      )}

      {/* Componente de navegação reaproveitado */}
      <NavegacaoRegistros
        indice={indiceAtual}
        total={medicos.length}
        onIrPara={(novoIndice) => setIndiceAtual(novoIndice)}
      />
    </div>
  );
}