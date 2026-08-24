import { NavLink } from "react-router-dom";

const ITENS = [
  { to: "/", rotulo: "Painel", indice: "00", fim: true },
  { to: "/pacientes", rotulo: "Pacientes", indice: "01" },
  { to: "/medicos", rotulo: "Médicos", indice: "02" },
  { to: "/consultas", rotulo: "Consultas", indice: "03" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__marca">
        <span className="sidebar__cruz">+</span>
        <div>
          <p className="sidebar__titulo">Gestão Hospitalar</p>
          <p className="sidebar__subtitulo">prontuário digital</p>
        </div>
      </div>

      <nav className="sidebar__nav">
        {ITENS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.fim}
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--ativo" : "")
            }
          >
            <span className="sidebar__indice">{item.indice}</span>
            {item.rotulo}
          </NavLink>
        ))}
      </nav>

      <p className="sidebar__rodape">SQLite · Express · React</p>
    </aside>
  );
}
