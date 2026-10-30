import { useState } from 'react';
import SeleccionMultiple, { boton, campo } from './Controles';
function FormularioRegla({
  regla,
  materias,
  materiasDestino,
  busy,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState(
    regla
      ? {
          materia_id: regla.materia_id,
          cursadas: regla.cursadas.map((m) => m.id),
          aprobadas: regla.aprobadas.map((m) => m.id),
        }
      : { materia_id: '', cursadas: [], aprobadas: [] }
  );
  const opciones = materias.filter((m) => m.id !== Number(form.materia_id));
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSave({ ...form, materia_id: Number(form.materia_id) });
      }}
      className="rounded-xl border border-mint-300 bg-petrol-50 p-5 mb-6"
    >
      <fieldset disabled={busy}>
        <div className="grid lg:grid-cols-3 gap-4">
          <label className="text-xs font-bold text-petrol-900">
            MATERIA PARA CURSAR *
            <select
              autoFocus={!regla}
              disabled={Boolean(regla)}
              className={`${campo} mt-2`}
              required
              value={form.materia_id}
              onChange={(e) => {
                const id = Number(e.target.value);
                setForm({
                  ...form,
                  materia_id: id || '',
                  cursadas: form.cursadas.filter((n) => n !== id),
                  aprobadas: form.aprobadas.filter((n) => n !== id),
                });
              }}
            >
              <option value="">Seleccionar materia</option>
              {materiasDestino.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </label>
          <div>
            <p className="text-xs font-bold text-petrol-900 mb-2">
              REQ. CURSADA
            </p>
            <SeleccionMultiple
              label="Seleccionar requisitos de cursada"
              opciones={opciones.filter((m) => !form.aprobadas.includes(m.id))}
              seleccion={form.cursadas}
              disabled={busy}
              onChange={(ids) => setForm({ ...form, cursadas: ids })}
            />
          </div>
          <div>
            <p className="text-xs font-bold text-petrol-900 mb-2">
              REQ. APROBADA
            </p>
            <SeleccionMultiple
              label="Seleccionar requisitos de aprobación"
              opciones={opciones.filter((m) => !form.cursadas.includes(m.id))}
              seleccion={form.aprobadas}
              disabled={busy}
              onChange={(ids) => setForm({ ...form, aprobadas: ids })}
            />
          </div>
        </div>
        <p className="text-xs text-petrol-600 mt-4">
          Seleccioná al menos un requisito. Todas las condiciones de la regla
          deben cumplirse. «Req. cursada» agrupa cursada aprobada y requisitos
          en curso. El nombre se edita desde Listado de Materias.
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="px-4 py-2 text-petrol-600"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button className={boton}>
            {regla ? 'Guardar cambios' : 'Agregar'}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
export default function ReglasPanel({
  reglas,
  nota,
  materias,
  busy,
  ejecutar,
  pedirEliminar,
}) {
  const [editando, setEditando] = useState(null);
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <p className="text-sm text-petrol-600">
          Definí qué materias deben estar cursadas o aprobadas para habilitar el
          cursado de otra.
        </p>
        <button
          disabled={busy || reglas.length >= materias.length}
          className="rounded-lg bg-mint-400 px-5 py-3 font-semibold text-petrol-900"
          onClick={() => setEditando({ nueva: true })}
        >
          ＋ Agregar regla
        </button>
      </div>
      {nota && (
        <p className="mb-5 rounded-lg bg-petrol-50 p-3 text-xs text-petrol-600">
          {nota}
        </p>
      )}
      {editando && (
        <FormularioRegla
          key={editando.materia_id || 'nueva'}
          regla={editando.nueva ? null : editando}
          materias={materias}
          materiasDestino={
            editando.nueva
              ? materias.filter(
                  (m) => !reglas.some((r) => r.materia_id === m.id)
                )
              : materias
          }
          busy={busy}
          onCancel={() => setEditando(null)}
          onSave={async (body) => {
            if (
              await ejecutar(
                `/carrera/correlatividades${editando.nueva ? '' : '/' + editando.materia_id}`,
                editando.nueva ? 'POST' : 'PUT',
                body,
                'Regla guardada.'
              )
            )
              setEditando(null);
          }}
        />
      )}
      <div className="overflow-x-auto border border-petrol-100 rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-petrol-50 uppercase text-xs text-petrol-600">
            <tr>
              <th className="p-4">Materia para cursar</th>
              <th className="p-4">Req. cursada</th>
              <th className="p-4">Req. aprobada</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reglas.map((r) => (
              <tr key={r.materia_id} className="border-t border-petrol-100">
                <th className="p-4 font-semibold">{r.materia_nombre}</th>
                <td className="p-4">
                  {r.cursadas.length ? (
                    <span className="inline-block rounded-lg bg-blue-100 text-blue-900 px-3 py-2 text-xs font-semibold">
                      ⓘ {r.cursadas.map((m) => m.nombre).join(' · ')}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="p-4">
                  {r.aprobadas.length ? (
                    <span className="inline-block rounded-lg bg-mint-300 px-3 py-2 text-xs font-semibold">
                      ✓ {r.aprobadas.map((m) => m.nombre).join(' · ')}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      disabled={busy}
                      className="bg-mint-300 rounded-lg px-3 py-2"
                      onClick={() => setEditando(r)}
                    >
                      Editar
                    </button>
                    <button
                      disabled={busy}
                      className="bg-red-50 text-red-600 rounded-lg px-3 py-2"
                      onClick={() => pedirEliminar('regla', r)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!reglas.length && (
              <tr>
                <td className="p-6 text-petrol-600" colSpan={4}>
                  Todavía no hay reglas de correlatividad.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
