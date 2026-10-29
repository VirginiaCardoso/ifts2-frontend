const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const ingresantesService = {
    //obtener datos de backend
    async obtenerDatosIngresantes() {
        const token = localStorage.getItem('ifts2_token');
        const response = await fetch(`${API_URL}/api/ingresantes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Error al cargar la información de ingresantes');
        return response.json();
    },

    // Obtener el documento actual desde la tabla 'documentos'
    async obtenerDocumento() {
        const token = localStorage.getItem('ifts2_token');
        const response = await fetch(`${API_URL}/api/ingresantes/documento`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Error al cargar el documento');
        return response.json();
    },

    // Actualizar el PDF
    async actualizarDocumento(formData) {
        const token = localStorage.getItem('ifts2_token');
        const response = await fetch(`${API_URL}/api/ingresantes/documento`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
                // Nota: Al usar FormData, fetch configura automáticamente el Content-Type con el boundary correcto.
            },
            body: formData
        });

        if (!response.ok) throw new Error('No se pudo actualizar el documento');
        return response.json();
    }
};