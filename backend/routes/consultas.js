import { useState, useEffect } from "react";
import NavegacaoRegistros from "../components/NavegacaoRegistros";

export default function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Função para buscar consultas do backend
  const carregarConsultas = () => {
    fetch("http://localhost:3000/api/consultas")
      .then((res) => res.json())
      .then((data) => {
        setConsultas(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar consultas:", err);
        setErro("Não foi possível carregar as consultas.");
        setCarregando(false);
      });
  };

  useEffect(() => {
    carregarConsultas();
  }, []);

  if (carregando) return <p>Carregando consultas...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  const consultaAtual = consultas[indiceAtual];

  return (
    <div className="pagina-consultas">
      <h2>Gerenciamento de Consultas</h2>

      {consultas.length === 0 ? (
        <p>Nenhuma consulta cadastrada no sistema.</p>
      ) : (
        <div className="card-consulta">
          <p><strong>ID:</strong> {consultaAtual?.id}</p>
          <p><strong>Paciente:</strong> {consultaAtual?.paciente_nome || consultaAtual?.paciente_id}</p>
          <p><strong>Médico:</strong> {consultaAtual?.medico_nome || consultaAtual?.medico_id}</p>
          <p><strong>Data:</strong> {consultaAtual?.data || "Não informada"}</p>
          <p><strong>Horário:</strong> {consultaAtual?.horario || "Não informado"}</p>
          <p><strong>Status:</strong> {consultaAtual?.status || "Pendente"}</p>
          <p><strong>Observações:</strong> {consultaAtual?.observacoes || "Nenhuma"}</p>
        </div>
      )}

      {/* Componente de navegação reaproveitado */}
      <NavegacaoRegistros
        indice={indiceAtual}
        total={consultas.length}
        onIrPara={(novoIndice) => setIndiceAtual(novoIndice)}
      />
    </div>
  );
}