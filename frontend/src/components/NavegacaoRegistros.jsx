// components/NavegacaoRegistros.jsx
// Barra de navegação "Primeiro / Anterior / Próximo / Último" reaproveitada
// pelas telas de Pacientes, Médicos e Consultas. Os botões ficam desabilitados
// automaticamente nas extremidades da lista, evitando índices inválidos.

export default function NavegacaoRegistros({ indice, total, onIrPara }) {
  const semRegistros = total === 0;
  const noPrimeiro = semRegistros || indice === 0;
  const noUltimo = semRegistros || indice === total - 1;

  return (
    <div className="navegacao">
      <div className="navegacao__botoes">
        <button
          type="button"
          className="navegacao__botao"
          onClick={() => onIrPara(0)}
          disabled={noPrimeiro}
          title="Primeiro registro"
        >
          «
        </button>
        <button
          type="button"
          className="navegacao__botao"
          onClick={() => onIrPara(indice - 1)}
          disabled={noPrimeiro}
          title="Registro anterior"
        >
          ‹
        </button>
        <button
          type="button"
          className="navegacao__botao"
          onClick={() => onIrPara(indice + 1)}
          disabled={noUltimo}
          title="Próximo registro"
        >
          ›
        </button>
        <button
          type="button"
          className="navegacao__botao"
          onClick={() => onIrPara(total - 1)}
          disabled={noUltimo}
          title="Último registro"
        >
          »
        </button>
      </div>

      <span className="navegacao__tab">
        {semRegistros ? "Nenhum registro" : `Registro ${indice + 1} de ${total}`}
      </span>
    </div>
  );
}
