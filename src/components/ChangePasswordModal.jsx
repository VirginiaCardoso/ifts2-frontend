import { useState } from 'react';
import { authService } from '../services/authService';
import { ChangePasswordModalIcon1 } from '../assets/icons';

export default function ChangePasswordModal({ isOpen, onClose, onSuccess, user }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Si recibe un 'userName', estamos restableciendo la contraseña de un tercero desde el panel de admin
  const isResetMode = Boolean(user);
  const userName = user?.nombre_completo || user?.nombre || '';
  const userId = user?.id;

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      return setError('La nueva contraseña debe tener al menos 8 caracteres.');
    }

    if (newPassword !== confirmPassword) {
      return setError('Las contraseñas nuevas no coinciden.');
    }

    setIsLoading(true);

    try {
      if (isResetMode) {
      // Llamada al backend para restablecer la contraseña del usuario seleccionado
        const response = await fetch(`http://localhost:3000/api/usuarios/${userId}/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPassword })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al restablecer la contraseña');
        }
        } else {
              // Modo normal: cambiar contraseña propia
          await authService.changePassword(currentPassword, newPassword);
        }

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        onClose();
        if (onSuccess) {
          onSuccess();
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const handleClose = () => {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      onClose();
    };

    return (
      <div className="fixed inset-0 z-0 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
          {/* Ícono superior */}
          <div className="w-14 h-14 bg-[#C2F2E9] rounded-2xl flex items-center justify-center mb-6">
            <ChangePasswordModalIcon1 />
          </div>

          {/* Títulos */}
          <h2
            className="text-[1.75rem] font-bold text-[#143340] mb-2 leading-tight"
            style={{ fontFamily: 'var(--font-display, serif)' }}
          >
            {isResetMode ? 'Restablecer contraseña' : 'Cambiar mi contraseña'}
          </h2>
          <p className="text-[#849A9A] text-[0.95rem] leading-relaxed mb-6">
            {isResetMode
            ? `Definí una nueva contraseña para ${userName}.`
            : 'Ingresá tu contraseña actual y elegí una nueva de al menos 8 caracteres.'}
          </p>

          {/* Mensaje de error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isResetMode && (
              <div>
                <label className="block text-[0.7rem] font-bold text-[#143340] tracking-widest uppercase mb-2">
                  Contraseña actual
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required={!isResetMode}
                  className="w-full px-4 py-3 rounded-xl border border-[#C2F2E9] bg-[#F8FDFD] focus:outline-none focus:ring-2 focus:ring-[#8BD9CA] focus:bg-white text-[#143340] transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-[0.7rem] font-bold text-[#143340] tracking-widest uppercase mb-2">
                Nueva contraseña
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border border-[#C2F2E9] bg-[#F8FDFD] focus:outline-none focus:ring-2 focus:ring-[#8BD9CA] focus:bg-white text-[#143340] transition-all"
              />
            </div>

            <div>
              <label className="block text-[0.7rem] font-bold text-[#143340] tracking-widest uppercase mb-2">
                Confirmar nueva contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border border-[#C2F2E9] bg-[#F8FDFD] focus:outline-none focus:ring-2 focus:ring-[#8BD9CA] focus:bg-white text-[#143340] transition-all"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 py-3.5 px-4 rounded-xl border border-[#E5E7EB] text-[#235459] font-bold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#235459] text-white font-bold hover:bg-[#143340] transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? 'Guardando...' : 'Guardar contraseña'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}
