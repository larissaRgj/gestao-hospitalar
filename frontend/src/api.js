// api.js
// Cliente HTTP simples para conversar com a API Express (http://localhost:3001).

const BASE_URL = "http://localhost:3001/api";

async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${BASE_URL}${caminho}`, {
    headers: { "Content-Type": "application/json" },
    ...opcoes,
  });

  // 204 No Content não tem corpo para parsear
  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    const mensagem = dados?.erro || `Erro na requisição (HTTP ${resposta.status})`;
    throw new Error(mensagem);
  }

  return dados;
}

export const api = {
  criarBanco: () => requisicao("/criar-banco", { method: "POST" }),

  // Pacientes
  listarPacientes: () => requisicao("/pacientes"),
  criarPaciente: (paciente) =>
    requisicao("/pacientes", { method: "POST", body: JSON.stringify(paciente) }),
  atualizarPaciente: (id, paciente) =>
    requisicao(`/pacientes/${id}`, { method: "PUT", body: JSON.stringify(paciente) }),
  excluirPaciente: (id) => requisicao(`/pacientes/${id}`, { method: "DELETE" }),

  // Médicos
  listarMedicos: () => requisicao("/medicos"),
  criarMedico: (medico) =>
    requisicao("/medicos", { method: "POST", body: JSON.stringify(medico) }),
  atualizarMedico: (id, medico) =>
    requisicao(`/medicos/${id}`, { method: "PUT", body: JSON.stringify(medico) }),
  excluirMedico: (id) => requisicao(`/medicos/${id}`, { method: "DELETE" }),

  // Consultas
  listarConsultas: () => requisicao("/consultas"),
  criarConsulta: (consulta) =>
    requisicao("/consultas", { method: "POST", body: JSON.stringify(consulta) }),
  atualizarConsulta: (id, consulta) =>
    requisicao(`/consultas/${id}`, { method: "PUT", body: JSON.stringify(consulta) }),
  excluirConsulta: (id) => requisicao(`/consultas/${id}`, { method: "DELETE" }),
};
