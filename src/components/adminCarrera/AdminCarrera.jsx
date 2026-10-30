import { useEffect, useState } from 'react';
import { carreraRequest } from '../../services/carreraService';
import MateriasPanel from './MateriasPanel';
import ReglasPanel from './ReglasPanel';
import AvisosArchivos from './AvisosArchivos';
import { boton, Dialogo } from './Controles';
export default function AdminCarrera() {
  const [data, setData] = useState(null);
  const [profesores, setProfesores] = useState([]);
  const [tab, setTab] = useState('materias');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [eliminando, setEliminando] = useState(null);
  useEffect(() => {
    let activo = true;
    Promise.all([carreraRequest('/carrera'), carreraRequest('/profesores')])
      .then(([carrera, docentes]) => {
        if (activo) {
          setData(carrera);
          setProfesores(docentes);
        }
      })
      .catch((err) => {
        if (activo) setError(err.message);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, []);
  async function ejecutar(ruta, method, body, texto, file) {
    setBusy(true);
    setError('');
    setMensaje('');
    try {
      await carreraRequest(ruta, { method, body, file });
      setMensaje(texto);
      try {
        setData(await carreraRequest('/carrera'));
      } catch {
        setError(
          'El cambio se guardó, pero no se pudo actualizar la vista. Recargá la página.'
        );
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setBusy(false);
    }
  }
  const pedirEliminar = (tipo, item) => {
    setError('');
    setEliminando({ tipo, item });
  };
  async function confirmar() {
    const { tipo, item } = eliminando;
    const ruta =
      tipo === 'materia'
        ? `/materias/${item.id}`
        : tipo === 'regla'
          ? `/carrera/correlatividades/${item.materia_id}`
          : `/carrera/documentos/${item.tipo}`;
    if (await ejecutar(ruta, 'DELETE', undefined, 'Eliminación realizada.'))
      setEliminando(null);
  }
  return (
    <div className="space-y-7 text-petrol-900 pb-10">
      <header>
        <h1 className="text-3xl md:text-4xl mb-3">
          Carrera y Plan de Estudios
        </h1>
        <p className="text-petrol-600">
          Administrá el estado del ciclo lectivo, los archivos oficiales, el
          listado de materias y las correlatividades.
        </p>
      </header>
      {error && (
        <p role="alert" className="bg-red-50 text-red-800 p-4 rounded-xl">
          {error}
        </p>
      )}
      {mensaje && (
        <p role="status" className="bg-mint-300 p-4 rounded-xl">
          {mensaje}
        </p>
      )}
      {loading && <p role="status">Cargando Carrera…</p>}
      {!loading && !data && (
        <button className={boton} onClick={() => window.location.reload()}>
          Reintentar
        </button>
      )}
      {data && (
        <>
          <AvisosArchivos
            data={data}
            busy={busy}
            ejecutar={ejecutar}
            pedirEliminar={pedirEliminar}
            setError={setError}
            subir={(tipo, file) =>
              ejecutar(
                `/carrera/documentos/${tipo}`,
                'PUT',
                undefined,
                'PDF guardado.',
                file
              )
            }
          />
          <section className="bg-white rounded-2xl border border-petrol-100">
            <div
              role="tablist"
              aria-label="Gestión de Carrera"
              className="flex border-b border-petrol-100 bg-petrol-50 rounded-t-2xl"
            >
              {[
                ['materias', 'Listado de Materias'],
                ['reglas', 'Correlatividades'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  id={`tab-${id}`}
                  aria-controls={`panel-${id}`}
                  aria-selected={tab === id}
                  disabled={busy}
                  className={`px-5 md:px-8 py-5 font-semibold border-b-2 ${tab === id ? 'border-mint-400 text-petrol-900' : 'border-transparent text-petrol-600'}`}
                  onClick={() => setTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div
              role="tabpanel"
              id={`panel-${tab}`}
              aria-labelledby={`tab-${tab}`}
              className="p-4 md:p-8"
            >
              {tab === 'materias' ? (
                <MateriasPanel
                  materias={data.materias}
                  profesores={profesores}
                  busy={busy}
                  error={error}
                  ejecutar={ejecutar}
                  pedirEliminar={pedirEliminar}
                />
              ) : (
                <ReglasPanel
                  reglas={data.correlatividades}
                  nota={data.nota_correlatividades}
                  materias={data.materias}
                  busy={busy}
                  ejecutar={ejecutar}
                  pedirEliminar={pedirEliminar}
                />
              )}
            </div>
          </section>
        </>
      )}
      {eliminando && (
        <Dialogo
          titulo="Confirmar eliminación"
          busy={busy}
          error={error}
          onClose={() => setEliminando(null)}
        >
          <p className="mb-4">
            ¿Eliminar {eliminando.item.nombre || eliminando.item.materia_nombre}
            ? Esta acción es permanente.
          </p>
          {eliminando.tipo === 'materia' && (
            <p className="text-sm text-petrol-600 mb-4">
              Primero deben quitarse las asignaciones de docentes, horarios,
              mesas y reglas de correlatividad que utilicen esta materia.
            </p>
          )}
          <div className="flex justify-end gap-3">
            <button disabled={busy} onClick={() => setEliminando(null)}>
              Cancelar
            </button>
            <button
              disabled={busy}
              className="bg-red-700 text-white rounded-lg px-4 py-2"
              onClick={confirmar}
            >
              {busy ? 'Eliminando…' : 'Eliminar'}
            </button>
          </div>
        </Dialogo>
      )}
    </div>
  );
}
