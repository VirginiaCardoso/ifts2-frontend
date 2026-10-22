import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Demo from './pages/Demo';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />
        
        {/* Demo componentes */}
        <Route path="/demo" element={<Demo />} />

        {/* Panel administración: solo accesible si inició sesión */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;