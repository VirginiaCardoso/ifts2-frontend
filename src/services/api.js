// src/services/api.js
const API_BASE = 'http://localhost:3000/api';

export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem('ifts2_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Sesión expirada o token inválido
    localStorage.removeItem('ifts2_token');
    localStorage.removeItem('ifts2_user');
    window.location.href = '/';
  }

  return response;
}