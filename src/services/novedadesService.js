const API_URL = 'http://localhost:3000/api/novedades';

// Función auxiliar para obtener el header con el Bearer token
function getAuthHeaders() {
  const token = localStorage.getItem('ifts2_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

// Obtener todas las noticias publicadas
export async function getNovedades(admin = false) {
  const url = admin ? `${API_URL}?admin=true` : API_URL;
  const response = await fetch(url, {
    headers: admin ? getAuthHeaders() : {}
  });
  if (!response.ok) {
    throw new Error('Error al obtener el listado de novedades');
  }
  return response.json();
}

// Crear una nueva noticia (Requiere token)
export async function createNovedad(novedadData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(novedadData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Error al crear la novedad');
  }
  return data;
}

// Actualizar una noticia existente (Requiere token)
export async function updateNovedad(id, novedadData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(novedadData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Error al actualizar la novedad');
  }
  return data;
}

// Eliminar una noticia (Requiere token)
export async function deleteNovedad(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Error al eliminar la novedad');
  }
  return data;
}