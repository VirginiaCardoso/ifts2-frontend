import { notificarCambioCarrera } from './carreraUpdates';
const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const carreraFileUrl = (url) => (url ? `${API}${url}` : '');
export async function carreraRequest(
  ruta,
  { method = 'GET', body, file } = {}
) {
  const token = localStorage.getItem('ifts2_token');
  const headers = { ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  if (file) {
    headers['Content-Type'] = 'application/pdf';
    headers['X-File-Name'] = encodeURIComponent(file.name);
  } else if (body !== undefined) headers['Content-Type'] = 'application/json';
  const response = await fetch(`${API}/api${ruta}`, {
    method,
    headers,
    body: file || (body !== undefined ? JSON.stringify(body) : undefined),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(
      data.error ||
        (response.status === 401
          ? 'La sesión venció. Volvé a iniciar sesión.'
          : 'No se pudo completar la operación.')
    );
  if (method !== 'GET') notificarCambioCarrera();
  return data;
}
