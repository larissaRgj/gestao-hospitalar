import { useEffect, useState } from "react";
import { api } from "../api.js";
import NavegacaoRegistros from "../components/NavegacaoRegistros.jsx";

const FORM_VAZIO = { nome: "", cpf: "", data_nascimento: "", telefone: "", endereco: "" };

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [indice, setIndice] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState(null);

  const [formCadastro, setFormCadastro] = useState(FORM_VAZIO);
  const [editando, setEditando] = useState(false);
  const [formEdicao, setFormEdicao] = useState(FORM_VAZIO);

  async function carregar() {
    setCarregando(true);
    try {
      const dados = await api.listarPacientes();
      setPacientes(dados);
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

  const pacienteAtual = pacientes[indice] || null;

  useEffect(() => {
    if (pacienteAtual) setFormEdicao(pacienteAtual);
    setEditando(false);
  }, [pacienteAtual?.id]);

  async function aoCadastrar(evento) {
    evento.preventDefault();
    if (!formCadastro.nome.trim()) {
      setMensagem({ tipo: "erro", texto: "Informe o nome do paciente." });
      return;
    }
    try {
      await api.criarPaciente(formCadastro);
      setMensagem({ tipo: "sucesso", texto: "Paciente cadastrado com sucesso!" });
      setFormCadastro(FORM_VAZIO);
      const dados = await api.listarPacientes();
      setPacientes(dados);
      setIndice(dados.length - 1); // pula para o registro recém-criado
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  async function aoSalvarEdicao(evento) {
    evento.preventDefault();
    try {
      await api.atualizarPaciente(pacienteAtual.id, formEdicao);
      setMensagem({ tipo: "sucesso", texto: "Paciente atualizado." });
      setEditando(false);
      carregar();
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  async function aoExcluir() {
    if (!pacienteAtual) return;
    if (!confirm(`Excluir o paciente "${pacienteAtual.nome}"?`)) return;
    try {
      await api.excluirPaciente(pacienteAtual.id);
      setMensagem({ tipo: "sucesso", texto: "Paciente excluído." });
      carregar();
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  return (
    <div className="pagina">
      <header className="pagina__cabecalho">
        <div>
          <p className="pagina__eyebrow">01 · cadastro</p>
          <h1>Pacientes</h1>
          <p className="pagina__descricao">Registre e consulte os dados dos pacientes.</p>
        </div>
      </header>

      {mensagem && <div className={`aviso aviso--${mensagem.tipo}`}>{mensagem.texto}</div>}

      <div className="duas-colunas">
        <form className="cartao formulario" onSubmit={aoCadastrar}>
          <h2>Novo paciente</h2>

          <label>
            Nome
            <input
              value={formCadastro.nome}
              onChange={(e) => setFormCadastro({ ...formCadastro, nome: e.target.value })}
              placeholder="Nome completo"
            />
          </label>

          <label>
            CPF
            <input
              value={formCadastro.cpf}
              onChange={(e) => setFormCadastro({ ...formCadastro, cpf: e.target.value })}
              placeholder="000.000.000-00"
            />
          </label>

          <label>
            Data de nascimento
            <input
              type="date"
              value={formCadastro.data_nascimento}
              onChange={(e) =>
                setFormCadastro({ ...formCadastro, data_nascimento: e.target.value })
              }
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

          <label>
            Endereço
            <input
              value={formCadastro.endereco}
              onChange={(e) => setFormCadastro({ ...formCadastro, endereco: e.target.value })}
              placeholder="Rua, número, cidade"
            />
          </label>

          <button type="submit" className="botao">
            Cadastrar paciente
          </button>
        </form>

        <div className="cartao prontuario">
          <h2>Consulta de registros</h2>

          {carregando ? (
            <p className="prontuario__vazio">Carregando…</p>
          ) : !pacienteAtual ? (
            <p className="prontuario__vazio">Nenhum paciente cadastrado ainda.</p>
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
                CPF
                <input
                  value={formEdicao.cpf || ""}
                  onChange={(e) => setFormEdicao({ ...formEdicao, cpf: e.target.value })}
                />
              </label>
              <label>
                Data de nascimento
                <input
                  type="date"
                  value={formEdicao.data_nascimento || ""}
                  onChange={(e) =>
                    setFormEdicao({ ...formEdicao, data_nascimento: e.target.value })
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
              <label>
                Endereço
                <input
                  value={formEdicao.endereco || ""}
                  onChange={(e) => setFormEdicao({ ...formEdicao, endereco: e.target.value })}
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
                <dd>{pacienteAtual.nome}</dd>
                <dt>CPF</dt>
                <dd className="mono">{pacienteAtual.cpf || "—"}</dd>
                <dt>Data de nascimento</dt>
                <dd className="mono">{pacienteAtual.data_nascimento || "—"}</dd>
                <dt>Telefone</dt>
                <dd className="mono">{pacienteAtual.telefone || "—"}</dd>
                <dt>Endereço</dt>
                <dd>{pacienteAtual.endereco || "—"}</dd>
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

          <NavegacaoRegistros indice={indice} total={pacientes.length} onIrPara={setIndice} />
        </div>
      </div>
    </div>
  );
}
