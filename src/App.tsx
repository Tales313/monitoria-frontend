import { Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login'
import Dashboard from "./Paginas/Dashboard";
import ListarVagasExterno from "./Paginas/ListarVagasExterno";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vagas" element={<ListarVagasExterno />} />
      </Routes>
  );
}

export default App;
