import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Demo from './pages/Demo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />
        
        {/* Demo componentes */}
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;