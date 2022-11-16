import { Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login'
import ListarVagas from "./Paginas/ListarVagas";
import Coordenador from "./Paginas/Coordenador";
import Resultados from "./Paginas/Resultados";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vagas" element={<ListarVagas />} />
        <Route path="/coordenador" element={<Coordenador />} />
        <Route path="/resultados" element={<Resultados />} />
      </Routes>
  );
}

export default App;
