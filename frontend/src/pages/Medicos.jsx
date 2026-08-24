import { useEffect, useState } from "react";
import { api } from "../api.js";
import NavegacaoRegistros from "../components/NavegacaoRegistros.jsx";

const FORM_VAZIO = { nome: "", crm: "", especialidade: "", telefone: "" };

export default function Medicos() {
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
      const dados = await api.listarMedicos();
      setMedicos(dados);
      setIndice((atual) => Math.min(atual, Math.max(dados.length - 1, 0)));
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  const medicoAtual = medicos[indice] || null;

  useEffect(() => {
    if (medicoAtual) setFormEdicao(medicoAtual);
    setEditando(false);
  }, [medicoAtual?.id]);

  async function aoCadastrar(evento) {
    evento.preventDefault();
    if (!formCadastro.nome.trim()) {
      setMensagem({ tipo: "erro", texto: "Informe o nome do médico." });
      return;
    }
    try {
      await api.criarMedico(formCadastro);
      setMensagem({ tipo: "sucesso", texto: "Médico cadastrado com sucesso!" });
      setFormCadastro(FORM_VAZIO);
      const dados = await api.listarMedicos();
      setMedicos(dados);
      setIndice(dados.length - 1);
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  async function aoSalvarEdicao(evento) {
    evento.preventDefault();
    try {
      await api.atualizarMedico(medicoAtual.id, formEdicao);
      setMensagem({ tipo: "sucesso", texto: "Médico atualizado." });
      setEditando(false);
      carregar();
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  async function aoExcluir() {
    if (!medicoAtual) return;
    if (!confirm(`Excluir o médico "${medicoAtual.nome}"?`)) return;
    try {
      await api.excluirMedico(medicoAtual.id);
      setMensagem({ tipo: "sucesso", texto: "Médico excluído." });
      carregar();
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  return (
    <div className="pagina">
      <header className="pagina__cabecalho">
        <div>
          <p className="pagina__eyebrow">02 · cadastro</p>
          <h1>Médicos</h1>
          <p className="pagina__descricao">Registre e consulte o corpo clínico.</p>
        </div>
      </header>

      {mensagem && <div className={`aviso aviso--${mensagem.tipo}`}>{mensagem.texto}</div>}

      <div className="duas-colunas">
        <form className="cartao formulario" onSubmit={aoCadastrar}>
          <h2>Novo médico</h2>

          <label>
            Nome
            <input
              value={formCadastro.nome}
              onChange={(e) => setFormCadastro({ ...formCadastro, nome: e.target.value })}
              placeholder="Dr(a). Nome completo"
            />
          </label>

          <label>
            CRM
            <input
              value={formCadastro.crm}
              onChange={(e) => setFormCadastro({ ...formCadastro, crm: e.target.value })}
              placeholder="00000-UF"
            />
          </label>

          <label>
            Especialidade
            <input
              value={formCadastro.especialidade}
              onChange={(e) =>
                setFormCadastro({ ...formCadastro, especialidade: e.target.value })
              }
              placeholder="Cardiologia, Pediatria…"
            />
          </label>

          <label>
            Telefone
            <input
              value={formCadastro.telefone}
              onChange={(e) => setFormCadastro({ ...formCadastro, telefone: e.target.value })}
              placeholder="(61) 99999-0000"
            />
          </label>

          <button type="submit" className="botao">
            Cadastrar médico
          </button>
        </form>

        <div className="cartao prontuario">
          <h2>Consulta de registros</h2>

          {carregando ? (
            <p className="prontuario__vazio">Carregando…</p>
          ) : !medicoAtual ? (
            <p className="prontuario__vazio">Nenhum médico cadastrado ainda.</p>
          ) : editando ? (
            <form className="ficha ficha--edicao" onSubmit={aoSalvarEdicao}>
              <label>
                Nome
                <input
                  value={formEdicao.nome}
                  onChange={(e) => setFormEdicao({ ...formEdicao, nome: e.target.value })}
                />
              </label>
              <label>
                CRM
                <input
                  value={formEdicao.crm || ""}
                  onChange={(e) => setFormEdicao({ ...formEdicao, crm: e.target.value })}
                />
              </label>
              <label>
                Especialidade
                <input
                  value={formEdicao.especialidade || ""}
                  onChange={(e) =>
                    setFormEdicao({ ...formEdicao, especialidade: e.target.value })
                  }
                />
              </label>
              <label>
                Telefone
                <input
                  value={formEdicao.telefone || ""}
                  onChange={(e) => setFormEdicao({ ...formEdicao, telefone: e.target.value })}
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
                <dt>Nome</dt>
                <dd>{medicoAtual.nome}</dd>
                <dt>CRM</dt>
                <dd className="mono">{medicoAtual.crm || "—"}</dd>
                <dt>Especialidade</dt>
                <dd>{medicoAtual.especialidade || "—"}</dd>
                <dt>Telefone</dt>
                <dd className="mono">{medicoAtual.telefone || "—"}</dd>
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

          <NavegacaoRegistros indice={indice} total={medicos.length} onIrPara={setIndice} />
        </div>
      </div>
    </div>
  );
}
