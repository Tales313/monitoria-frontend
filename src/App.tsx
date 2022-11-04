import { Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login'
import ListarVagas from "./Paginas/ListarVagas";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vagas" element={<ListarVagas />} />
      </Routes>
  );
}

export default App;
