import { useEffect, useState } from "react";
import { api } from "../api.js";
import NavegacaoRegistros from "../components/NavegacaoRegistros.jsx";

const STATUS_OPCOES = ["Agendada", "Confirmada", "Realizada", "Cancelada"];

const FORM_VAZIO = {
  paciente_id: "",
  medico_id: "",
  data: "",
  horario: "",
  status: "Agendada",
  observacoes: "",
};

export default function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [indice, setIndice] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState(null);

  const [formCadastro, setFormCadastro] = useState(FORM_VAZIO);
  const [editando, setEditando] = useState(false);
  const [formEdicao, setFormEdicao] = useState(FORM_VAZIO);

  async function carregar() {
    setCarregando(true);
    try {
      const [listaConsultas, listaPacientes, listaMedicos] = await Promise.all([
        api.listarConsultas(),
        api.listarPacientes(),
        api.listarMedicos(),
      ]);
      setConsultas(listaConsultas);
      setPacientes(listaPacientes);
      setMedicos(listaMedicos);
      setIndice((atual) => Math.min(atual, Math.max(listaConsultas.length - 1, 0)));
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  const consultaAtual = consultas[indice] || null;
  const semCadastrosBase = pacientes.length === 0 || medicos.length === 0;

  useEffect(() => {
    if (consultaAtual) setFormEdicao(consultaAtual);
    setEditando(false);
  }, [consultaAtual?.id]);

  async function aoCadastrar(evento) {
    evento.preventDefault();
    if (!formCadastro.paciente_id || !formCadastro.medico_id) {
      setMensagem({ tipo: "erro", texto: "Selecione o paciente e o médico." });
      return;
    }
    if (!formCadastro.data || !formCadastro.horario) {
      setMensagem({ tipo: "erro", texto: "Informe a data e o horário." });
      return;
    }
    try {
      await api.criarConsulta(formCadastro);
      setMensagem({ tipo: "sucesso", texto: "Consulta agendada com sucesso!" });
      setFormCadastro(FORM_VAZIO);
      const dados = await api.listarConsultas();
      setConsultas(dados);
      setIndice(dados.length - 1);
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  async function aoSalvarEdicao(evento) {
    evento.preventDefault();
    try {
      await api.atualizarConsulta(consultaAtual.id, formEdicao);
      setMensagem({ tipo: "sucesso", texto: "Consulta atualizada." });
      setEditando(false);
      carregar();
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  async function aoExcluir() {
    if (!consultaAtual) return;
    if (!confirm(`Cancelar/excluir a consulta de "${consultaAtual.paciente_nome}"?`)) return;
    try {
      await api.excluirConsulta(consultaAtual.id);
      setMensagem({ tipo: "sucesso", texto: "Consulta excluída." });
      carregar();
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  return (
    <div className="pagina">
      <header className="pagina__cabecalho">
        <div>
          <p className="pagina__eyebrow">03 · agenda</p>
          <h1>Consultas</h1>
          <p className="pagina__descricao">Agende e consulte os atendimentos marcados.</p>
        </div>
      </header>

      {mensagem && <div className={`aviso aviso--${mensagem.tipo}`}>{mensagem.texto}</div>}
      {semCadastrosBase && !carregando && (
        <div className="aviso aviso--erro">
          Cadastre ao menos um paciente e um médico antes de agendar uma consulta.
        </div>
      )}

      <div className="duas-colunas">
        <form className="cartao formulario" onSubmit={aoCadastrar}>
          <h2>Nova consulta</h2>

          <label>
            Paciente
            <select
              value={formCadastro.paciente_id}
              onChange={(e) => setFormCadastro({ ...formCadastro, paciente_id: e.target.value })}
            >
              <option value="">Selecione…</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </label>

          <label>
            Médico
            <select
              value={formCadastro.medico_id}
              onChange={(e) => setFormCadastro({ ...formCadastro, medico_id: e.target.value })}
            >
              <option value="">Selecione…</option>
              {medicos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nome}
                </option>
              ))}
            </select>
          </label>

          <label>
            Data
            <input
              type="date"
              value={formCadastro.data}
              onChange={(e) => setFormCadastro({ ...formCadastro, data: e.target.value })}
            />
          </label>

          <label>
            Horário
            <input
              type="time"
              value={formCadastro.horario}
              onChange={(e) => setFormCadastro({ ...formCadastro, horario: e.target.value })}
            />
          </label>

          <label>
            Status
            <select
              value={formCadastro.status}
              onChange={(e) => setFormCadastro({ ...formCadastro, status: e.target.value })}
            >
              {STATUS_OPCOES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label>
            Observações
            <textarea
              rows={3}
              value={formCadastro.observacoes}
              onChange={(e) => setFormCadastro({ ...formCadastro, observacoes: e.target.value })}
              placeholder="Opcional"
            />
          </label>

          <button type="submit" className="botao" disabled={semCadastrosBase}>
            Agendar consulta
          </button>
        </form>

        <div className="cartao prontuario">
          <h2>Consulta de registros</h2>

          {carregando ? (
            <p className="prontuario__vazio">Carregando…</p>
          ) : !consultaAtual ? (
            <p className="prontuario__vazio">Nenhuma consulta agendada ainda.</p>
          ) : editando ? (
            <form className="ficha ficha--edicao" onSubmit={aoSalvarEdicao}>
              <label>
                Paciente
                <select
                  value={formEdicao.paciente_id}
                  onChange={(e) => setFormEdicao({ ...formEdicao, paciente_id: e.target.value })}
                >
                  {pacientes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Médico
                <select
                  value={formEdicao.medico_id}
                  onChange={(e) => setFormEdicao({ ...formEdicao, medico_id: e.target.value })}
                >
                  {medicos.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Data
                <input
                  type="date"
                  value={formEdicao.data || ""}
                  onChange={(e) => setFormEdicao({ ...formEdicao, data: e.target.value })}
                />
              </label>
              <label>
                Horário
                <input
                  type="time"
                  value={formEdicao.horario || ""}
                  onChange={(e) => setFormEdicao({ ...formEdicao, horario: e.target.value })}
                />
              </label>
              <label>
                Status
                <select
                  value={formEdicao.status}
                  onChange={(e) => setFormEdicao({ ...formEdicao, status: e.target.value })}
                >
                  {STATUS_OPCOES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Observações
                <textarea
                  rows={3}
                  value={formEdicao.observacoes || ""}
                  onChange={(e) => setFormEdicao({ ...formEdicao, observacoes: e.target.value })}
                />
              </label>
              <div className="ficha__acoes">
                <button type="submit" className="botao">
                  Salvar
                </button>
                <button
                  type="button"
                  className="botao botao--fantasma"
                  onClick={() => setEditando(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="ficha">
              <dl className="ficha__lista">
                <dt>Paciente</dt>
                <dd>{consultaAtual.paciente_nome}</dd>
                <dt>Médico</dt>
                <dd>{consultaAtual.medico_nome}</dd>
                <dt>Data</dt>
                <dd className="mono">{consultaAtual.data}</dd>
                <dt>Horário</dt>
                <dd className="mono">{consultaAtual.horario}</dd>
                <dt>Status</dt>
                <dd>
                  <span className={`selo selo--${consultaAtual.status?.toLowerCase()}`}>
                    {consultaAtual.status}
                  </span>
                </dd>
                <dt>Observações</dt>
                <dd>{consultaAtual.observacoes || "—"}</dd>
              </dl>
              <div className="ficha__acoes">
                <button type="button" className="botao botao--fantasma" onClick={() => setEditando(true)}>
                  Editar
                </button>
                <button type="button" className="botao botao--perigo" onClick={aoExcluir}>
                  Excluir
                </button>
              </div>
            </div>
          )}

          <NavegacaoRegistros indice={indice} total={consultas.length} onIrPara={setIndice} />
        </div>
      </div>
    </div>
  );
}
