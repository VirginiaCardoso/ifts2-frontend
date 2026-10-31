export function formatearFecha(fechaString, opciones = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}) {
  if (!fechaString) return '';

  const [anio, mes, dia] = String(fechaString).split('T')[0].split('-').map(Number);
  if (!anio || !mes || !dia) return '';

  const fecha = new Date(anio, mes - 1, dia);
  if (
    fecha.getFullYear() !== anio ||
    fecha.getMonth() !== mes - 1 ||
    fecha.getDate() !== dia
  ) {
    return '';
  }

  return fecha.toLocaleDateString('es-AR', opciones);
}
