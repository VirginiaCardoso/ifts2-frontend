import { createHttpError } from './httpError';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getAuthHeaders() {
    const token = localStorage.getItem('ifts2_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
}


export async function getMesas() {
    const res = await fetch(`${API_URL}/api/mesas-examenes`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al obtener las mesas de exámenes');
    return res.json();
}

export async function createMesa(data) {
    const res = await fetch(`${API_URL}/api/mesas-examenes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    const resData = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw createHttpError(res, resData, 'Error al crear la mesa');
    }
    return resData;
}

export async function updateMesa(id, data) {
    const res = await fetch(`${API_URL}/api/mesas-examenes/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    const resData = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw createHttpError(res, resData, 'Error al actualizar la mesa');
    }
    return resData;
}

export async function deleteMesa(id) {
    const res = await fetch(`${API_URL}/api/mesas-examenes/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    const resData = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw createHttpError(res, resData, 'Error al eliminar la mesa');
    }
    return resData;
}
