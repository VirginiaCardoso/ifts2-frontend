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
        const data = await response.json();
        return Array.isArray(data)
            ? data.sort((a, b) => Number(a.orden ?? a.id_etapa ?? a.id ?? 0) - Number(b.orden ?? b.id_etapa ?? b.id ?? 0))
            : data;
    },

    async crearEtapa(datos) {
        const token = localStorage.getItem('ifts2_token');
        const response = await fetch(`${API_URL}/api/ingresantes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.mensaje || 'Error al crear la etapa');
        }
        return response.json();
    },

    async actualizarEtapa (id, datos) {
        const token = localStorage.getItem('ifts2_token');
        const response = await fetch(`${API_URL}/api/ingresantes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.mensaje || 'Error al actualizar la etapa');
        }
        return response.json();
    },

    async eliminarEtapa (id) {
       const token = localStorage.getItem('ifts2_token');
       const response = await fetch(`${API_URL}/api/ingresantes/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
       });
       if (!response.ok) {
           const errorData = await response.json().catch(() => ({}));
           throw new Error(errorData.mensaje || 'Error al eliminar la etapa');
       } 
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