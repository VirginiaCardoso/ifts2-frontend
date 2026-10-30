export const CARRERA_EVENT = 'ifts2:carrera-actualizada';
export const CARRERA_STORAGE_KEY = 'ifts2_carrera_actualizacion';

export function notificarCambioCarrera() {
  window.dispatchEvent(new Event(CARRERA_EVENT));
  // La señal permite actualizar otra pestaña del mismo sitio sin transmitir datos privados.
  try {
    localStorage.setItem(CARRERA_STORAGE_KEY, `${Date.now()}-${Math.random()}`);
  } catch {
    // Si el navegador bloquea storage, se mantiene la actualización al recuperar el foco.
  }
}

export function escucharCambiosCarrera(actualizar) {
  const storage = (event) => {
    if (event.key === CARRERA_STORAGE_KEY) actualizar();
  };
  const visible = () => {
    if (document.visibilityState === 'visible') actualizar();
  };
  window.addEventListener(CARRERA_EVENT, actualizar);
  window.addEventListener('storage', storage);
  window.addEventListener('focus', actualizar);
  document.addEventListener('visibilitychange', visible);
  return () => {
    window.removeEventListener(CARRERA_EVENT, actualizar);
    window.removeEventListener('storage', storage);
    window.removeEventListener('focus', actualizar);
    document.removeEventListener('visibilitychange', visible);
  };
}
