import { Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login'
import ListarVagas from "./Paginas/ListarVagas";
import Coordenador from "./Paginas/Coordenador/Coordenador";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vagas" element={<ListarVagas />} />
        <Route path="/coordenador" element={<Coordenador />} />
      </Routes>
  );
}

export default App;
