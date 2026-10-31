import { useIngresantes } from './adminIngresantes/useAdminIngresantes';
import BaseCard from './BaseCard';
import Button from './Button';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import SuccessModal from './SuccessModal';
import { AdminNovedadesIcon3 } from '../assets/icons';

import { EditIcon, FooterIcon2, IngresantesIcon1, UploadIcon } from '../assets/icons';

export default function Ingresantes() {
    
    const {
        etapas,
        etapaAEliminar,
        setEtapaAEliminar,
        eliminandoEtapa,
        confirmarEliminarEtapa,
        documentoActual,
        loading,
        error,
        mostrarFormularioNuevo,
        setMostrarFormularioNuevo,
        creandoEtapa,
        formNuevaEtapa,
        setFormNuevaEtapa,
        handleCrearEtapa,
        archivoSeleccionado,
        handleFileChange,
        handleSubirPdf,
        uploadSuccessMessage,
        setUploadSuccessMessage,
        handleEditarEtapa,
        formatearFecha,
        editandoId,
        setEditandoId,
        formEditado,
        setFormEditado,
        handleGuardarEdicion,
        handleEliminarEtapa,
        isUploading
    } = useIngresantes();

    return (
      <div className="w-full space-y-8 pb-10">
        {/* Cabecera */}
        <div>
          <h1 className="font-display text-petrol-900 text-3xl md:text-4xl leading-tight">
            Ingresantes y Fechas Importantes
          </h1>
          <p className="text-petrol-600 text-sm font-medium mt-1">
            Gestioná las etapas del proceso de admisión y el documento de
            descarga para aspirantes.
          </p>
        </div>

        {/* SECCIÓN 1: Tarjetas de Etapas */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="text-[0.68rem] font-bold text-petrol-600 uppercase tracking-wider">
              Etapas del Proceso de Admisión
            </p>
            <Button
              variant="primary"
              onClick={() => {
                setFormNuevaEtapa({
                  anio: String(new Date().getFullYear()),
                  nombre: '',
                  descripcion: '',
                  fecha_inicio: '',
                  fecha_fin: '',
                  requisitos: '',
                  orden: String(
                    Math.max(
                      0,
                      ...etapas.map((etapa) => Number(etapa.orden) || 0)
                    ) + 1
                  ),
                });
                setMostrarFormularioNuevo(true);
              }}
              className="bg-mint-400 text-petrol-900 font-semibold py-2 px-4 rounded-xl cursor-pointer"
            >
              Agregar etapa
            </Button>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {mostrarFormularioNuevo && (
            <BaseCard
              padding="sm"
              className="mb-4 border-petrol-100 shadow-2xs"
            >
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleCrearEtapa();
                }}
                className="space-y-3"
              >
                <h3 className="font-bold text-sm text-petrol-900">
                  Nueva etapa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider">
                    Año
                    <input
                      name="anio"
                      type="number"
                      required
                      value={formNuevaEtapa.anio}
                      onChange={(event) =>
                        setFormNuevaEtapa({
                          ...formNuevaEtapa,
                          anio: event.target.value,
                        })
                      }
                      className="mt-1 w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none"
                    />
                  </label>
                  <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider">
                    Orden
                    <input
                      name="orden"
                      type="number"
                      min="1"
                      required
                      value={formNuevaEtapa.orden}
                      onChange={(event) =>
                        setFormNuevaEtapa({
                          ...formNuevaEtapa,
                          orden: event.target.value,
                        })
                      }
                      className="mt-1 w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none"
                    />
                    <span className="mt-1 block normal-case font-normal tracking-normal">
                      Este número es el que se verá en las etapas.
                    </span>
                  </label>
                  <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider md:col-span-2">
                    Nombre
                    <input
                      name="nombre"
                      type="text"
                      required
                      value={formNuevaEtapa.nombre}
                      onChange={(event) =>
                        setFormNuevaEtapa({
                          ...formNuevaEtapa,
                          nombre: event.target.value,
                        })
                      }
                      className="mt-1 w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none"
                    />
                  </label>
                  <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider">
                    Fecha de inicio
                    <input
                      name="fecha_inicio"
                      type="date"
                      required
                      value={formNuevaEtapa.fecha_inicio}
                      onChange={(event) =>
                        setFormNuevaEtapa({
                          ...formNuevaEtapa,
                          fecha_inicio: event.target.value,
                        })
                      }
                      className="mt-1 w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none"
                    />
                  </label>
                  <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider">
                    Fecha de fin
                    <input
                      name="fecha_fin"
                      type="date"
                      required
                      value={formNuevaEtapa.fecha_fin}
                      onChange={(event) =>
                        setFormNuevaEtapa({
                          ...formNuevaEtapa,
                          fecha_fin: event.target.value,
                        })
                      }
                      className="mt-1 w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none"
                    />
                  </label>
                  <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider md:col-span-2">
                    Descripción
                    <textarea
                      name="descripcion"
                      required
                      rows="3"
                      value={formNuevaEtapa.descripcion}
                      onChange={(event) =>
                        setFormNuevaEtapa({
                          ...formNuevaEtapa,
                          descripcion: event.target.value,
                        })
                      }
                      className="mt-1 w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none resize-y"
                    />
                  </label>
                  <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider md:col-span-2">
                    Requisitos
                    <textarea
                      name="requisitos"
                      required
                      rows="3"
                      value={formNuevaEtapa.requisitos}
                      onChange={(event) =>
                        setFormNuevaEtapa({
                          ...formNuevaEtapa,
                          requisitos: event.target.value,
                        })
                      }
                      className="mt-1 w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none resize-y"
                    />
                  </label>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setMostrarFormularioNuevo(false)}
                    className="px-4 py-1.5 text-xs font-semibold text-petrol-900 bg-white border border-petrol-200 rounded-xl hover:bg-gray-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={creandoEtapa}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-petrol-900 rounded-xl hover:bg-petrol-800 cursor-pointer"
                  >
                    {creandoEtapa ? 'Guardando...' : 'Guardar etapa'}
                  </button>
                </div>
              </form>
            </BaseCard>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {etapas.map((etapa, index) => (
              <BaseCard
                key={etapa.id_etapa}
                padding="sm"
                className="border-petrol-100 shadow-2xs"
              >
                {editandoId === etapa.id_etapa ? (
                  /* MODO EDICIÓN */
                  <div>
                    <div className="-mx-4 -mt-4 p-3.5 px-4 bg-petrol-900 text-white flex items-center justify-between">
                      <div className="flex items-center gap-3 w-full">
                        <span className="w-5 h-5 rounded-lg bg-petrol-800 text-mint-800 flex items-center justify-center text-[0.7rem] font-bold">
                          {etapa.orden ?? index + 1}
                        </span>
                        {/* Input para editar el nombre */}
                        <input
                          name="nombre"
                          type="text"
                          value={formEditado.nombre}
                          onChange={(e) =>
                            setFormEditado({
                              ...formEditado,
                              nombre: e.target.value,
                            })
                          }
                          className="bg-white text-[#1a2e35] text-xs px-2 py-1 rounded w-full border border-petrol-200 outline-none"
                        />
                      </div>
                    </div>
                    {/* Campos de texto / Inputs del cuerpo */}
                    <div className="pt-3.5 space-y-3">
                      <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider block">
                        Orden
                        <input
                          name="orden"
                          type="number"
                          min="1"
                          required
                          value={formEditado.orden}
                          onChange={(e) =>
                            setFormEditado({
                              ...formEditado,
                              orden: e.target.value,
                            })
                          }
                          className="mt-1 w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none"
                        />
                        <span className="mt-1 block normal-case font-normal tracking-normal">
                          Este número es el que se verá en las etapas.
                        </span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider block mb-1">
                            Fecha de inicio
                          </label>
                          <input
                            name="fecha_inicio"
                            type="date"
                            value={formEditado.fecha_inicio}
                            onChange={(e) =>
                              setFormEditado({
                                ...formEditado,
                                fecha_inicio: e.target.value,
                              })
                            }
                            className="w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none"
                            placeholder="Ej: Noviembre 2026"
                          />
                        </div>
                        <div>
                          <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider block mb-1">
                            Fecha de Fin
                          </label>
                          <input
                            name="fecha_fin"
                            type="date"
                            value={formEditado.fecha_fin}
                            onChange={(e) =>
                              setFormEditado({
                                ...formEditado,
                                fecha_fin: e.target.value,
                              })
                            }
                            className="w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none"
                            placeholder="Ej: Enero 2027"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider block mb-1">
                          Descripción
                        </label>
                        <textarea
                          name="descripcion"
                          value={formEditado.descripcion}
                          onChange={(e) =>
                            setFormEditado({
                              ...formEditado,
                              descripcion: e.target.value,
                            })
                          }
                          className="w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none resize-none"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider block mb-1">
                          Requisitos
                        </label>
                        <textarea
                          name="requisitos"
                          value={formEditado.requisitos}
                          onChange={(e) =>
                            setFormEditado({
                              ...formEditado,
                              requisitos: e.target.value,
                            })
                          }
                          className="w-full text-xs text-[#1a2e35] border border-petrol-200 rounded-lg p-2 outline-none resize-none"
                          rows="3"
                        />
                      </div>

                      {/* Botones Cancelar y Guardar */}
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditandoId(null)}
                          className="px-4 py-1.5 text-xs font-semibold text-petrol-900 bg-white border border-petrol-200 rounded-xl hover:bg-gray-50 cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleGuardarEdicion(etapa.id_etapa)}
                          className="px-4 py-1.5 text-xs font-semibold text-white bg-petrol-900 rounded-xl hover:bg-petrol-800 cursor-pointer"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="-mx-4 -mt-4 p-3.5 px-4 bg-petrol-900 text-white flex items-center justify-between">
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-lg bg-petrol-800 text-mint-800 flex items-center justify-center text-[0.7rem] font-bold">
                          {etapa.orden ?? index + 1}
                        </span>
                        <h3 className="font-bold text-xs tracking-wider">
                          {etapa.nombre}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          title="Editar etapa"
                          variant="outline"
                          onClick={() => handleEditarEtapa(etapa.id_etapa)}
                          className="text-mint-600 bg-petrol-700 rounded-xl w-8 h-8 cursor-pointer p-1.5"
                        >
                          <span className="w-4 h-4 flex items-center justify-center">
                            <EditIcon />
                          </span>
                        </Button>
                        <Button
                          title="Eliminar etapa"
                          variant="danger"
                          onClick={() => handleEliminarEtapa(etapa.id_etapa)}
                          className=" rounded-xl w-8 h-8 !py-0.5 !px-0.5 cursor-pointer"
                        >
                          <span className="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">
                            <AdminNovedadesIcon3 />
                          </span>
                        </Button>
                      </div>
                    </div>

                    <div className="pt-3.5 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-petrol-900">
                        <FooterIcon2 className="w-3.5 h-3.5" />
                        <span>{formatearFecha(etapa.fecha_inicio)}</span>
                        <span>- {formatearFecha(etapa.fecha_fin)}</span>
                      </div>
                      <p className="text-xs text-petrol-500 leading-relaxed">
                        {etapa.descripcion}
                      </p>
                      <p className="text-xs text-petrol-500 leading-relaxed">
                        {etapa.requisitos}
                      </p>
                    </div>
                  </div>
                )}
              </BaseCard>
            ))}
          </div>
        </div>

        {/* SECCIÓN 2: Información para Aspirantes (Gestión del PDF) */}
        <div className="space-y-4">
          <BaseCard padding="lg" className="border-petrol-100 shadow-2xs">
            <h3 className="text-[0.68rem] text-petrol-600 font-bold bg-petrol-50/50 uppercase tracking-widest mb-3">
              Información para aspirantes
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Zona de carga (Dropzone / Input file) */}
              <label className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-petrol-50/50 hover:bg-petrol-50/40 transition-colors cursor-pointer">
                <input
                  name="documento"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="w-12 h-12 rounded-xl bg-petrol-50 border border-petrol-100 flex items-center justify-center text-petrol-700 mb-3 shadow-2xs">
                  <UploadIcon className="w-5 h-5" />
                </div>
                <p className="font-bold text-xs text-petrol-900">
                  {archivoSeleccionado
                    ? archivoSeleccionado.name
                    : 'Arrastrá el PDF aquí'}
                </p>
                <p className="text-[0.7rem] text-gray-400 mt-1">
                  o hacé clic para seleccionar desde tu computadora
                </p>
                <span className="text-[0.65rem] text-gray-400 mt-3 font-medium">
                  Formato aceptado: PDF • Tamaño máximo: 10 MB
                </span>
              </label>

              {/* Archivo actual y botón de actualización */}
              <div className="space-y-4">
                <div className="bg-white border border-petrol-100 rounded-xl p-4 shadow-2xs space-y-1">
                  <span className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider">
                    Archivo actual
                  </span>
                  <div className="flex items-center gap-2 text-xs font-bold text-petrol-900 pt-1">
                    <IngresantesIcon1 className="w-4 h-4 text-mint-400" />
                    <span>
                      {/* Muestra el nombre real de la DB, o un aviso si no existe */}
                      {loading
                        ? 'Cargando...'
                        : documentoActual?.nombre || 'Ningún documento cargado'}
                    </span>
                  </div>
                  <p className="text-[0.7rem] text-gray-400">
                    Visible públicamente como enlace de descarga en la sección
                    Ingresantes del sitio.
                  </p>
                </div>

                <Button
                  variant="primary"
                  onClick={handleSubirPdf}
                  // Deshabilita si no hay archivo o si está en proceso de subida
                  disabled={!archivoSeleccionado || isUploading}
                  className="w-full bg-mint-400 text-petrol-900 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer "
                >
                  <UploadIcon className="w-4 h-4 " />
                  {isUploading
                    ? 'Subiendo...'
                    : 'Actualizar PDF de Ingresantes'}
                </Button>
              </div>
            </div>
          </BaseCard>
        </div>

        {etapaAEliminar && (
          <DeleteConfirmationModal
            submitting={eliminandoEtapa}
            title="¿Eliminar etapa?"
            message={`Se eliminará "${etapaAEliminar.nombre || 'esta etapa'}". Esta acción no se puede deshacer.`}
            onCancel={() => setEtapaAEliminar(null)}
            onConfirm={confirmarEliminarEtapa}
          />
        )}
        {uploadSuccessMessage && (
          <SuccessModal
            title="PDF actualizado"
            message={uploadSuccessMessage}
            onClose={() => setUploadSuccessMessage('')}
          />
        )}
      </div>
    );
}
