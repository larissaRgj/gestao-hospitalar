import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Painel from "./pages/Painel.jsx";
import Pacientes from "./pages/Pacientes.jsx";
import Medicos from "./pages/Medicos.jsx";
import Consultas from "./pages/Consultas.jsx";

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="conteudo">
        <Routes>
          <Route path="/" element={<Painel />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/medicos" element={<Medicos />} />
          <Route path="/consultas" element={<Consultas />} />
        </Routes>
      </main>
    </div>
  );
}
