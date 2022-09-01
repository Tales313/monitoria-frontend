import { Routes, Route } from 'react-router-dom';
import Login from './paginas/Login'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
  );
}

export default App;
