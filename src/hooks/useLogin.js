import { useState } from 'react';
import { authService } from '../services/authService';

export default function useLogin({ onClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrorMessage('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const data = await authService.login(formData.correo, formData.password);
      localStorage.setItem('ifts2_token', data.token);
      localStorage.setItem('ifts2_user', JSON.stringify(data.usuario));
      onLoginSuccess(data.usuario);
      onClose();
    } catch (error) {
      setErrorMessage(error.message || 'Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  }

  return { errorMessage, formData, handleChange, handleSubmit, loading };
}
