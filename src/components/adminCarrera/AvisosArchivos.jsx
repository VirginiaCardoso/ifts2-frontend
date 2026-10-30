import CarreraIcon from './CarreraIcon';
import { useState } from 'react';
import { carreraFileUrl } from '../../services/carreraService';
import { boton, campo } from './Controles';
const documentos = [
  ['resolucion', 'Resolución oficial'],
  ['promocionables', 'Mat. promocionables'],
  ['correlatividades', 'Correlatividades'],
];
export default function AvisosArchivos({
  data,
  busy,
  ejecutar,
  pedirEliminar,
  subir,
  setError,
}) {
  const [editando, setEditando] = useState(false);
  const [aviso, setAviso] = useState('');
  return (
    <section className="bg-white rounded-2xl border border-petrol-100 p-6 md:p-8">
      <h2 className="text-sm font-bold tracking-widest text-petrol-600 mb-6 font-body">
        AVISOS Y ARCHIVOS OFICIALES
      </h2>
      <div className="grid xl:grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-bold mb-3">ESTADO DEL CICLO LECTIVO</p>
          {editando ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (
                  await ejecutar(
                    '/carrera/aviso',
                    'PUT',
                    { aviso },
                    'Aviso actualizado.'
                  )
                )
                  setEditando(false);
              }}
            >
              <label className="sr-only" htmlFor="aviso-carrera">
                Estado del ciclo lectivo
              </label>
              <input
                id="aviso-carrera"
                autoFocus
                required
                maxLength={255}
                disabled={busy}
                className={campo}
                value={aviso}
                onChange={(e) => setAviso(e.target.value)}
              />
              <p className="text-xs text-petrol-600 mt-2">
                Este texto aparece visible en la página pública de la carrera.
              </p>
              <div className="flex gap-3 mt-3">
                <button className={boton} disabled={busy}>
                  Guardar
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setEditando(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              disabled={busy}
              className="flex justify-between gap-4 w-full text-left bg-petrol-50 rounded-lg p-4 border border-petrol-100"
              onClick={() => {
                setAviso(data.aviso);
                setEditando(true);
              }}
            >
              <span>{data.aviso || 'Configurar estado del ciclo lectivo'}</span>
              <span aria-label="Editar aviso" className="text-petrol-600">
                <CarreraIcon tipo="editar" />
              </span>
            </button>
          )}
        </div>
        <div>
          <p className="text-xs font-bold mb-3">ARCHIVOS PDF OFICIALES</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {documentos.map(([tipo, titulo]) => {
              const doc = data.documentos[tipo];
              return (
                <div
                  key={tipo}
                  className="rounded-xl border border-dashed border-petrol-200 bg-petrol-50 p-3 text-center flex flex-col gap-2"
                >
                  <span className="text-mint-500 flex justify-center">
                    <CarreraIcon
                      tipo={doc ? 'check' : 'subir'}
                      className="w-6 h-6"
                    />
                  </span>
                  <p className="text-xs font-semibold">{titulo}</p>
                  {doc && <p className="text-xs break-all">{doc.nombre}</p>}
                  <label
                    className={`text-xs text-petrol-700 underline cursor-pointer ${busy ? 'opacity-50' : ''}`}
                  >
                    {doc ? 'Reemplazar PDF' : 'Subir PDF'}
                    <input
                      aria-label={`${doc ? 'Reemplazar' : 'Subir'} ${titulo}`}
                      disabled={busy}
                      className="sr-only"
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        e.target.value = '';
                        if (!file) return;
                        if (
                          !/\.pdf$/i.test(file.name) ||
                          file.size > 10 * 1024 * 1024
                        ) {
                          setError('Seleccioná un PDF de hasta 10 MB.');
                          return;
                        }
                        await subir(tipo, file);
                      }}
                    />
                  </label>
                  {doc && (
                    <div className="flex justify-center flex-wrap gap-2 text-xs">
                      <a
                        href={carreraFileUrl(doc.url)}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        Ver
                      </a>
                      <button
                        disabled={busy}
                        className="text-red-600 underline"
                        onClick={() =>
                          pedirEliminar('pdf', { tipo, nombre: titulo })
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-petrol-600 mt-2">
            Solo PDF · Hasta 10 MB por archivo
          </p>
        </div>
      </div>
    </section>
  );
}
