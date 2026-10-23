// src/services/docentesService.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getAuthHeaders() {
  const token = localStorage.getItem('ifts2_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

// ── AUTORIDADES ──
export async function getAutoridades() {
  const res = await fetch(`${API_URL}/api/autoridades`);
  if (!res.ok) throw new Error('Error al obtener la lista de autoridades');
  return res.json();
}

export async function createAutoridad(data) {
  const res = await fetch(`${API_URL}/api/autoridades`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Error al registrar autoridad');
  return resData;
}

export async function updateAutoridad(id, data) {
  const res = await fetch(`${API_URL}/api/autoridades/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Error al actualizar autoridad');
  return resData;
}

export async function deleteAutoridad(id) {
  const res = await fetch(`${API_URL}/api/autoridades/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Error al eliminar autoridad');
  return resData;
}

// ── PROFESORES / AYUDANTES ──
export async function getProfesores(rol = null) {
  const url = rol ? `${API_URL}/api/profesores?rol=${rol}` : `${API_URL}/api/profesores`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener la nómina de profesores');
  return res.json();
}

export async function createProfesor(data) {
  const res = await fetch(`${API_URL}/api/profesores`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Error al registrar profesor');
  return resData;
}

export async function updateProfesor(id, data) {
  const res = await fetch(`${API_URL}/api/profesores/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Error al actualizar profesor');
  return resData;
}

export async function deleteProfesor(id) {
  const res = await fetch(`${API_URL}/api/profesores/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Error al eliminar profesor');
  return resData;
}

// ── MATERIAS (Catálogo para el selector) ──
export async function getMaterias() {
  const res = await fetch(`${API_URL}/api/materias`);
  if (!res.ok) throw new Error('Error al obtener materias');
  return res.json();
}

// ── BEDELES ──
export async function getBedeles() {
  const res = await fetch(`${API_URL}/api/bedeles`);
  if (!res.ok) throw new Error('Error al obtener la lista de bedeles');
  return res.json();
}

export async function createBedel(data) {
  const res = await fetch(`${API_URL}/api/bedeles`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Error al registrar bedel');
  return resData;
}

export async function updateBedel(id, data) {
  const res = await fetch(`${API_URL}/api/bedeles/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Error al actualizar bedel');
  return resData;
}

export async function deleteBedel(id) {
  const res = await fetch(`${API_URL}/api/bedeles/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Error al eliminar bedel');
  return resData;
}