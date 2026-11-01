export async function fetchApi(url, options) {
  try {
    return await fetch(url, options);
  } catch {
    throw new Error('No se pudo conectar con el servidor. Revisá tu conexión e intentá nuevamente.');
  }
}

export function createHttpError(response, data, fallbackMessage) {
  const error = new Error(
    data?.error || data?.message || data?.mensaje ||
      (response.status === 401 ? 'La sesión venció. Volvé a iniciar sesión.' :
        response.status === 403 ? 'No tenés permisos para realizar esta acción.' : fallbackMessage)
  );
  error.status = response.status;
  return error;
}
