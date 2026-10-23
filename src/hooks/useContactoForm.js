import { useEffect, useRef, useState } from 'react';
import { contactoService } from '../services/contactoService';

const initialFormData = {
  nombre: '',
  correo: '',
  asunto: '',
  mensaje: '',
};

export default function useContactoForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({
    loading: false,
    error: '',
    success: false,
  });
  const successTimeout = useRef(null);

  useEffect(() => () => {
    if (successTimeout.current) clearTimeout(successTimeout.current);
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (successTimeout.current) clearTimeout(successTimeout.current);
    setStatus({ loading: true, error: '', success: false });

    try {
      await contactoService.enviarConsulta(formData);
      setStatus({ loading: false, error: '', success: true });
      setFormData(initialFormData);
      successTimeout.current = setTimeout(
        () => setStatus((current) => ({ ...current, success: false })),
        5000
      );
    } catch (error) {
      setStatus({
        loading: false,
        error: error.message || 'No se pudo enviar la consulta. Intentá nuevamente.',
        success: false,
      });
    }
  }

  return { formData, status, handleChange, handleSubmit };
}
