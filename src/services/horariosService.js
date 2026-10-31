import { createHttpError } from './httpError';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getAuthHeaders() {
    const token = localStorage.getItem('ifts2_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
}


export async function getHorarios() {
  const res = await fetch(`${API_URL}/api/horarios-cursada`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener los horarios');
  return res.json();
}

export async function createHorario(data) {
  const res = await fetch(`${API_URL}/api/horarios-cursada`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw createHttpError(res, resData, 'Error al crear horario');
  }
  return resData;
}

export async function updateHorario(id, data) {
  const res = await fetch(`${API_URL}/api/horarios-cursada/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw createHttpError(res, resData, 'Error al actualizar horario');
  }
  return resData;
}

export async function deleteHorario(id) {
  const res = await fetch(`${API_URL}/api/horarios-cursada/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const resData = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw createHttpError(res, resData, 'Error al eliminar horario');
  }
  return resData;
}