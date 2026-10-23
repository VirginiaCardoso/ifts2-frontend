import Button from './Button';
import { LoginModalIcon1, LoginModalIcon2, LoginModalIcon3, LoginModalIcon4 } from '../assets/icons';
import useLogin from '../hooks/useLogin';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { errorMessage, formData, handleChange, handleSubmit, loading } = useLogin({
    onClose,
    onLoginSuccess,
  });

  if (!isOpen) return null;

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
            <label htmlFor="login-email" className="block text-[0.7rem] font-bold text-mint-300/70 uppercase tracking-wider mb-1.5">
              Usuario
            </label>
            <input
              id="login-email"
              name="correo"
              type="email"
              required
              autoComplete="username"
              placeholder="usuario@bue.edu.ar"
              value={formData.correo}
              onChange={handleChange}
              className="w-full bg-petrol-800 border border-petrol-700 focus:border-mint-400 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-[0.7rem] font-bold text-mint-300/70 uppercase tracking-wider mb-1.5">
              Contraseña
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
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
            disabled={loading}
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