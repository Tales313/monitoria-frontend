import { Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login'
import Dashboard from "./Paginas/Dashboard";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
}

export default App;
