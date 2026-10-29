const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getAuthHeaders() {
    const token = localStorage.getItem('ifts2_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
}

export async function getTramites() {
    const res = await fetch(`${API_URL}/api/tramites`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al obtener los trámites');
    return res.json();
}

export async function updateTramite(id, data) {
    const res = await fetch(`${API_URL}/api/tramites/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    const resData = await res.json();
    if (!res.ok) throw new Error(resData.error || 'Error al actualizar el trámite');
    return resData;
}