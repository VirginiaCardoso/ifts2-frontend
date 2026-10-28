const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getAuthHeaders() {
    const token = localStorage.getItem('ifts2_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
}


export async function getEnlaces() {
    const res = await fetch(`${API_URL}/api/enlaces-externos`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al obtener los enlaces externos');
    return res.json();
}

export async function updateEnlace(id, url_destino) {
  
    const res = await fetch(`${API_URL}/api/enlaces-externos/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ url_destino })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al actualizar el enlace');
    return data;
}