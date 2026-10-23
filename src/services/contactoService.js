const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const contactoService = {
    enviarConsulta: async (datosFormulario) => {
        try {
            const response = await fetch(`${API_URL}/api/contacto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosFormulario),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar el formulario.');
            }

            return data;
        } catch (error) {
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                throw new Error('Error de conexión con el servidor. Inténtalo más tarde.', { cause: error });
            }
            throw error;
        }
    }
};