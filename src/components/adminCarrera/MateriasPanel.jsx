import CarreraIcon from './CarreraIcon';
import { useState } from 'react';
import SeleccionMultiple, { boton, campo, Dialogo } from './Controles';
function FormularioMateria({
  materia,
  anio,
  cuatrimestre,
  profesores,
  busy,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState(
    materia
      ? {
          nombre: materia.nombre,
          anio_carrera: Number(materia.anio_carrera),
          cuatrimestre: materia.es_anual ? null : materia.cuatrimestre || 1,
          es_anual: Boolean(materia.es_anual),
          es_promocional: materia.es_promocional,
          profesores_ids: materia.profesores_ids,
        }
      : {
          nombre: '',
          anio_carrera: anio,
          cuatrimestre,
          es_anual: false,
          es_promocional: false,
          profesores_ids: [],
        }
  );
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSave(form);
      }}
      className="space-y-3"
    >
      <fieldset disabled={busy} className="space-y-3">
        <label className="block">
          <span className="sr-only">Nombre de la materia</span>
          <input
            autoFocus
            className={campo}
            placeholder="Nombre de la materia…"
            required
            maxLength={255}
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
        </label>
        {materia && (
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              Año
              <select
                className={campo}
                value={form.anio_carrera}
                onChange={(e) =>
                  setForm({ ...form, anio_carrera: Number(e.target.value) })
                }
              >
                {[1, 2, 3].map((n) => (
                  <option key={n} value={n}>
                    {n}º Año
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Cuatrimestre
              <select
                className={campo}
                disabled={form.es_anual}
                value={form.cuatrimestre || 1}
                onChange={(e) =>
                  setForm({ ...form, cuatrimestre: Number(e.target.value) })
                }
              >
                {[1, 2].map((n) => (
                  <option key={n} value={n}>
                    {n}º Cuatrimestre
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        <label className="flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.es_anual}
            onChange={(e) =>
              setForm({
                ...form,
                es_anual: e.target.checked,
                cuatrimestre: e.target.checked
                  ? null
                  : cuatrimestre || materia?.cuatrimestre || 1,
              })
            }
          />
          Materia anual (ambos cuatrimestres)
        </label>
        <SeleccionMultiple
          label="Asignar profesores…"
          opciones={profesores}
          seleccion={form.profesores_ids}
          disabled={busy}
          onChange={(ids) => setForm({ ...form, profesores_ids: ids })}
        />
        {materia && (
          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.es_promocional}
              onChange={(e) =>
                setForm({ ...form, es_promocional: e.target.checked })
              }
            />
            Materia promocionable
          </label>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            className={`${campo} text-petrol-600`}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button className={`${boton} w-full`}>
            {materia ? 'Guardar cambios' : 'Agregar'}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
export default function MateriasPanel({
  materias,
  profesores,
  busy,
  error,
  ejecutar,
  pedirEliminar,
}) {
  const [agregando, setAgregando] = useState(null);
  const [editando, setEditando] = useState(null);
  const [asignando, setAsignando] = useState(null);
  const [seleccion, setSeleccion] = useState([]);
  const guardar = async (form, id) =>
    ejecutar(
      `/materias${id ? '/' + id : ''}`,
      id ? 'PUT' : 'POST',
      form,
      id ? 'Materia actualizada.' : 'Materia creada.'
    );
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 mb-7">
        <p className="text-petrol-600 text-sm">
          Gestioná materias, profesores asignados y estado promocional por año y
          cuatrimestre.
        </p>
        <span className="rounded-full bg-mint-300 px-3 py-1 text-xs font-bold">
          ● = Promocional
        </span>
      </div>
      <div className="grid xl:grid-cols-3 gap-6 items-start">
        {[1, 2, 3].map((anio) => (
          <article
            key={anio}
            className="rounded-2xl overflow-visible border border-petrol-100 bg-white"
          >
            <header className="bg-petrol-900 text-white rounded-t-2xl px-5 py-4 flex justify-between items-center">
              <h3 className="text-xl flex items-center gap-2">
                <CarreraIcon tipo="graduacion" />
                {anio}º Año
              </h3>
              <span className="rounded bg-petrol-700 text-xs px-2 py-1">
                {materias.filter((m) => Number(m.anio_carrera) === anio).length}{' '}
                mat.
              </span>
            </header>
            {[1, 2].map((cuatrimestre) => {
              const lista = materias.filter(
                (m) =>
                  Number(m.anio_carrera) === anio &&
                  (m.es_anual || m.cuatrimestre === cuatrimestre)
              );
              const key = `${anio}-${cuatrimestre}`;
              return (
                <section key={key}>
                  <header className="flex justify-between bg-petrol-50 border-y border-petrol-100 px-4 py-3 text-xs text-petrol-600">
                    <strong>{cuatrimestre}º CUATRIMESTRE</strong>
                    <span>
                      {lista.filter((m) => m.es_promocional).length} prom.
                    </span>
                  </header>
                  {lista.map((m) => (
                    <div
                      key={m.id}
                      className="border-b border-petrol-100 px-4 py-3"
                    >
                      <div className="flex gap-2 items-start">
                        <button
                          disabled={busy}
                          className="flex-1 text-left text-sm text-petrol-900 hover:underline"
                          title="Editar materia"
                          onClick={() => setEditando(m)}
                        >
                          {m.nombre}
                          {m.es_anual && (
                            <span className="block text-xs text-petrol-600 mt-1">
                              Anual
                            </span>
                          )}
                        </button>
                        <button
                          disabled={busy}
                          role="switch"
                          aria-checked={m.es_promocional}
                          aria-label={`Promocional: ${m.nombre}`}
                          title={
                            m.es_promocional
                              ? 'Quitar promocional'
                              : 'Marcar promocional'
                          }
                          className={`shrink-0 w-10 h-6 rounded-full flex items-center px-1 ${m.es_promocional ? 'bg-mint-400 justify-end' : 'bg-petrol-100 justify-start'}`}
                          onClick={() =>
                            ejecutar(
                              `/materias/${m.id}/promocional`,
                              'PATCH',
                              { es_promocional: !m.es_promocional },
                              'Estado promocional actualizado.'
                            )
                          }
                        >
                          <span
                            className={`w-4 h-4 rounded-full ${m.es_promocional ? 'bg-petrol-900' : 'bg-petrol-600'}`}
                          />
                        </button>
                        <button
                          disabled={busy}
                          aria-label={`Asignar profesores a ${m.nombre}`}
                          title="Profesores asignados"
                          className="bg-petrol-50 rounded p-1 text-petrol-700"
                          onClick={() => {
                            setSeleccion(m.profesores_ids);
                            setAsignando(m);
                          }}
                        >
                          <CarreraIcon tipo="docentes" />
                        </button>
                        <button
                          disabled={busy}
                          aria-label={`Eliminar ${m.nombre}`}
                          className="bg-red-50 text-red-600 rounded p-1"
                          onClick={() => pedirEliminar('materia', m)}
                        >
                          <CarreraIcon tipo="eliminar" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {m.profesores.map((p) => (
                          <span
                            key={p.id}
                            className="text-[0.65rem] bg-petrol-50 rounded px-2 py-0.5 text-petrol-600 font-semibold"
                          >
                            {p.nombre_completo}
                          </span>
                        ))}
                        {!m.profesores.length && (
                          <span className="text-xs text-petrol-600 italic">
                            Sin profesores asignados
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {!lista.length && (
                    <p className="p-4 text-sm text-petrol-600">Sin materias.</p>
                  )}
                  <div className="p-4">
                    {agregando === key ? (
                      <FormularioMateria
                        anio={anio}
                        cuatrimestre={cuatrimestre}
                        profesores={profesores}
                        busy={busy}
                        onCancel={() => setAgregando(null)}
                        onSave={async (form) => {
                          if (await guardar(form)) setAgregando(null);
                        }}
                      />
                    ) : (
                      <button
                        disabled={busy}
                        className="w-full text-petrol-600 text-sm py-1"
                        onClick={() => setAgregando(key)}
                      >
                        ＋ Agregar materia
                      </button>
                    )}
                  </div>
                </section>
              );
            })}
          </article>
        ))}
      </div>
      {materias.some(
        (m) => !m.es_anual && ![1, 2].includes(m.cuatrimestre)
      ) && (
        <section className="mt-5 p-4 bg-amber-50 rounded-lg">
          <h3>Materias sin cuatrimestre asignado</h3>
          {materias
            .filter((m) => !m.es_anual && ![1, 2].includes(m.cuatrimestre))
            .map((m) => (
              <button
                key={m.id}
                disabled={busy}
                className="underline m-2"
                onClick={() => setEditando(m)}
              >
                {m.nombre}
                {m.es_anual && (
                  <span className="block text-xs text-petrol-600 mt-1">
                    Anual
                  </span>
                )}
              </button>
            ))}
        </section>
      )}
      {editando && (
        <Dialogo
          titulo="Editar materia"
          onClose={() => setEditando(null)}
          busy={busy}
          error={error}
        >
          <FormularioMateria
            materia={editando}
            profesores={profesores}
            busy={busy}
            onCancel={() => setEditando(null)}
            onSave={async (form) => {
              if (await guardar(form, editando.id)) setEditando(null);
            }}
          />
        </Dialogo>
      )}
      {asignando && (
        <Dialogo
          titulo="Profesores asignados"
          onClose={() => setAsignando(null)}
          busy={busy}
          error={error}
        >
          <p className="text-petrol-600 mb-6">{asignando.nombre}</p>
          <SeleccionMultiple
            label="Seleccionar profesores"
            opciones={profesores}
            seleccion={seleccion}
            onChange={setSeleccion}
            disabled={busy}
          />
          <p className="text-xs text-petrol-600 mt-4">
            Los roles existentes se conservan. Los nuevos se administran desde
            Plantel.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              disabled={busy}
              className={campo}
              onClick={() => setAsignando(null)}
            >
              Cancelar
            </button>
            <button
              disabled={busy}
              className={boton}
              onClick={async () => {
                if (
                  await ejecutar(
                    `/materias/${asignando.id}/profesores`,
                    'PUT',
                    { profesores_ids: seleccion },
                    'Profesores asignados.'
                  )
                )
                  setAsignando(null);
              }}
            >
              Guardar
            </button>
          </div>
        </Dialogo>
      )}
    </>
  );
}
