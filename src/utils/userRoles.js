function normalizeRole(role) {
  return role
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export function isGestionAcademicaRole(user) {
  const roles = [
    user?.rol_institucional,
    user?.rolInstitucional,
    user?.nivel_de_acceso,
    user?.nivelAcceso,
    user?.rol,
  ];

  return roles.some(
    (role) =>
      typeof role === 'string' &&
      normalizeRole(role) === 'gestion academica'
  );
}

export function showUnauthorizedActionModal(error, user) {
  const message =
    typeof error === 'string'
      ? error
      : error?.message ||
        error?.error ||
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.response?.data?.mensaje ||
        '';
  const normalizedMessage = normalizeRole(message);
  const status = Number(
    error?.status ?? error?.statusCode ?? error?.response?.status
  );
  const isUnauthorized =
    status === 401 ||
    status === 403 ||
    /no autorizad[oa]|no (?:tienes|tiene|tenes) autorizacion|sin autorizacion|permiso|acceso denegado|forbidden|unauthorized|\b403\b/.test(
      normalizedMessage
    );

  let currentUser = user;
  if (!currentUser) {
    try {
      currentUser = JSON.parse(localStorage.getItem('ifts2_user') || '{}');
    } catch (parseError) {
      console.error('No se pudo leer el usuario de la sesión:', parseError);
      return false;
    }
  }

  if (!isGestionAcademicaRole(currentUser) || !isUnauthorized) return false;

  window.dispatchEvent(
    new CustomEvent('ifts2:unauthorized-action', {
      detail: {
        message: message || 'No tenés permisos para realizar esta acción.',
      },
    })
  );
  return true;
}

export function notifyActionError(error, fallbackMessage, user) {
  if (showUnauthorizedActionModal(error, user)) return true;
  window.alert(error?.message || fallbackMessage);
  return false;
}
