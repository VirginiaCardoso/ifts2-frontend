import { useState } from 'react';
import Button from './Button';
import { LoginModalIcon1, LoginModalIcon2, LoginModalIcon3, LoginModalIcon4 } from '../assets/icons';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      // Llamada al endpoint del backend
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: formData.correo,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Credenciales inválidas');
      }

      // Guardamos la sesión en el almacenamiento local
      localStorage.setItem('ifts2_token', data.token);
      localStorage.setItem('ifts2_user', JSON.stringify(data.usuario));

      // Notificamos al componente padre
      onLoginSuccess(data.usuario);
      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051218]/90 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[420px] bg-petrol-950 border-1.5 border-petrol-700 rounded-2xl p-8 shadow-2xl">
        {/* Botón Cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Cerrar modal"
        >
          <LoginModalIcon1 />
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-xl bg-mint-400 flex items-center justify-center shrink-0">
            <LoginModalIcon2 />
          </div>
          <div>
            <h2 className="font-display text-white text-lg font-bold leading-tight">
              Panel de administración
            </h2>
            <p className="text-[0.72rem] text-petrol-600 font-medium mt-0.5">
              IFTS Nº 2 · Acceso exclusivo para personal
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[0.7rem] font-bold text-mint-300/70 uppercase tracking-wider mb-1.5">
              Usuario
            </label>
            <input
              type="email"
              required
              autoComplete="username"
              placeholder="usuario@bue.edu.ar"
              value={formData.correo}
              onChange={(e) => {
                setFormData({ ...formData, correo: e.target.value });
                setErrorMessage('');
              }}
              className="w-full bg-petrol-800 border border-petrol-700 focus:border-mint-400 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[0.7rem] font-bold text-mint-300/70 uppercase tracking-wider mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setErrorMessage('');
              }}
              className="w-full bg-petrol-800 border border-petrol-700 focus:border-mint-400 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors"
            />
          </div>

          {/* Mensaje de error del Backend */}
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5 flex items-center gap-2 text-red-400 text-xs font-medium">
              <LoginModalIcon3 />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Botón de ingreso */}
          <Button
            type="submit"
            variant="primary"
            className="w-full !py-2.5 !rounded-lg !font-bold mt-2"
          >
            {loading ? (
              <span>Verificando...</span>
            ) : (
              <>
                <LoginModalIcon4 />
                Ingresar al panel
              </>
            )}
          </Button>

          <p className="text-center text-[0.7rem] text-white/40 pt-2 leading-relaxed">
            Acceso restringido al personal del IFTS Nº 2.<br />
            Si olvidaste tus credenciales, contactá a soporte.
          </p>
        </form>
      </div>
    </div>
  );
}