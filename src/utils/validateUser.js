export function validateUser(form) {
  if (!form.nombre_completo?.trim()) return 'Ingresá el nombre completo.';
  if (!form.rol_institucional?.trim()) return 'Ingresá el rol institucional.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo?.trim() || '')) return 'Ingresá un correo electrónico válido.';
  if (!['Administrador General', 'Gestión Académica'].includes(form.nivel_de_acceso)) return 'Seleccioná un nivel de acceso válido.';
  return '';
}
