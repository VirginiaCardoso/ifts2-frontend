// src/components/AdminPlantel.jsx
import React, { useState, useEffect, useMemo } from 'react';
import Button from './Button';
import MultiSelectMaterias from './MultiSelectMaterias';
import {
  getAutoridades,
  updateAutoridad,
  createAutoridad,
  deleteAutoridad,
  getProfesores,
  createProfesor,
  updateProfesor,
  deleteProfesor,
  getMaterias,
  getBedeles,
  createBedel,
  updateBedel,
  deleteBedel
} from '../services/docentesService';
import { AdminPlantelIcon1, AdminPlantelIcon2 } from '../assets/icons';

export default function AdminPlantel() {
  const [tabActiva, setTabActiva] = useState('docentes'); // 'docentes' | 'bedeles'
  const [autoridades, setAutoridades] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [bedeles, setBedeles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Edición rápida de Autoridad (como en el video)
  const [editingAutoId, setEditingAutoId] = useState(null);
  const [editAutoNombre, setEditAutoNombre] = useState('');

  // Formulario Docente (Alta / Edición)
  const [isProfFormOpen, setIsProfFormOpen] = useState(false);
  const [editingProfId, setEditingProfId] = useState(null);
  const [profForm, setProfForm] = useState({
    nombre_completo: '',
    rol: 'titular',
    materias: []
  });

  // Formulario Bedel
  const [isBedelFormOpen, setIsBedelFormOpen] = useState(false);
  const [editingBedelId, setEditingBedelId] = useState(null);
  const [bedelForm, setBedelForm] = useState({
    nombre: '',
    anio_asignado: 'Primer Año'
  });

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [autos, profs, mats, beds] = await Promise.all([
        getAutoridades().catch(() => []),
        getProfesores().catch(() => []),
        getMaterias().catch(() => []),
        getBedeles().catch(() => [])
      ]);
      setAutoridades(Array.isArray(autos) ? autos : []);
      setProfesores(Array.isArray(profs) ? profs : []);
      setMaterias(Array.isArray(mats) ? mats : []);
      setBedeles(Array.isArray(beds) ? beds : []);
    } catch (err) {
      console.error('Error al inicializar plantel:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Guardar edición rápida de autoridad
  const handleSaveAutoridad = async (auto) => {
    try {
      setSubmitting(true);
      await updateAutoridad(auto.id, {
        cargo: auto.cargo,
        nombre_responsable: editAutoNombre.trim() || auto.nombre_responsable
      });
      setEditingAutoId(null);
      await cargarDatos();
    } catch (err) {
      alert(err.message || 'Error al actualizar autoridad');
    } finally {
      setSubmitting(false);
    }
  };

  // Manejo de Docentes
  const handleOpenCreateProf = () => {
    setEditingProfId(null);
    setProfForm({ nombre_completo: '', rol: 'titular', materias: [] });
    setIsProfFormOpen(true);
  };

  const handleOpenEditProf = (prof) => {
    setEditingProfId(prof.id);
    const materiaIds = prof.materias_detalle ? prof.materias_detalle.map((m) => m.materia_id) : [];
    const rolActual = prof.materias_detalle?.[0]?.rol || 'titular';
    setProfForm({
      nombre_completo: prof.nombre_completo || '',
      rol: rolActual,
      materias: materiaIds
    });
    setIsProfFormOpen(true);
  };

  const handleSubmitProf = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingProfId) {
        await updateProfesor(editingProfId, profForm);
      } else {
        await createProfesor(profForm);
      }
      setIsProfFormOpen(false);
      await cargarDatos();
    } catch (err) {
      alert(err.message || 'Error al guardar docente');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProf = async (id) => {
    if (!window.confirm('¿Desea eliminar a este integrante del plantel docente?')) return;
    try {
      setSubmitting(true);
      await deleteProfesor(id);
      await cargarDatos();
    } catch (err) {
      alert(err.message || 'Error al eliminar');
    } finally {
      setSubmitting(false);
    }
  };

  // Manejo de Bedeles
  const handleOpenCreateBedel = () => {
    setEditingBedelId(null);
    setBedelForm({ nombre: '', anio_asignado: 'Primer Año' });
    setIsBedelFormOpen(true);
  };

  const handleOpenEditBedel = (bedel) => {
    setEditingBedelId(bedel.id);
    setBedelForm({ nombre: bedel.nombre, anio_asignado: bedel.anio_asignado });
    setIsBedelFormOpen(true);
  };

  const handleSubmitBedel = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingBedelId) {
        await updateBedel(editingBedelId, bedelForm);
      } else {
        await createBedel(bedelForm);
      }
      setIsBedelFormOpen(false);
      await cargarDatos();
    } catch (err) {
      alert(err.message || 'Error al guardar bedel');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBedel = async (id) => {
    if (!window.confirm('¿Desea eliminar este bedel?')) return;
    try {
      setSubmitting(true);
      await deleteBedel(id);
      await cargarDatos();
    } catch (err) {
      alert(err.message || 'Error al eliminar');
    } finally {
      setSubmitting(false);
    }
  };

  const profesoresFiltrados = useMemo(() => {
    return profesores.filter((p) =>
      p.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.materias_texto && p.materias_texto.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [profesores, searchTerm]);

  return (
    <div className="w-full space-y-8">
      {/* ── SECCIÓN 1: AUTORIDADES INSTITUCIONALES (CARDS DEL VIDEO) ── */}
      <div>
        <div className="mb-3">
          <p className="text-petrol-600 text-xs font-bold tracking-widest uppercase">
            Autoridades Institucionales
          </p>
          <h2 className="text-xl font-display font-bold text-petrol-900">
            Cargos Directivos y Gestión
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {autoridades.map((auto) => {
            const isEditing = editingAutoId === auto.id;
            return (
              <div
                key={auto.id}
                className="bg-white border border-petrol-100 rounded-xl p-4 shadow-2xs relative flex flex-col justify-between min-h-[90px]"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[0.68rem] font-bold tracking-wider uppercase text-petrol-600">
                    {auto.cargo}
                  </span>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAutoId(auto.id);
                        setEditAutoNombre(auto.nombre_responsable);
                      }}
                      className="text-petrol-400 hover:text-petrol-800 transition-colors"
                      title="Editar nombre"
                    >
                      <AdminPlantelIcon1 />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="flex items-center gap-1.5 mt-1">
                    <input
                      type="text"
                      value={editAutoNombre}
                      onChange={(e) => setEditAutoNombre(e.target.value)}
                      className="w-full bg-petrol-50 border border-mint-400 rounded px-2 py-1 text-xs font-semibold text-petrol-900 focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => handleSaveAutoridad(auto)}
                      className="bg-mint-400 hover:bg-mint-500 text-petrol-900 text-[0.7rem] font-bold px-2 py-1 rounded"
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingAutoId(null)}
                      className="bg-gray-200 text-petrol-700 text-[0.7rem] font-bold px-2 py-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <p className="text-sm font-bold text-petrol-900 truncate">
                    {auto.nombre_responsable}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SECCIÓN 2: TABS Y GESTIÓN DE PLANTEL ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-petrol-100 pb-3">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setTabActiva('docentes')}
              className={`pb-2 text-sm font-bold transition-colors border-b-2 ${
                tabActiva === 'docentes'
                  ? 'border-[#143340] text-petrol-900'
                  : 'border-transparent text-petrol-600 hover:text-petrol-900'
              }`}
            >
              Cuerpo Docente y Ayudantes
            </button>
            <button
              type="button"
              onClick={() => setTabActiva('bedeles')}
              className={`pb-2 text-sm font-bold transition-colors border-b-2 ${
                tabActiva === 'bedeles'
                  ? 'border-[#143340] text-petrol-900'
                  : 'border-transparent text-petrol-600 hover:text-petrol-900'
              }`}
            >
              Bedeles ({bedeles.length})
            </button>
          </div>

          <div>
            {tabActiva === 'docentes' ? (
              <Button variant="primary" onClick={handleOpenCreateProf} className="!rounded-lg !py-1.5 !px-3.5 !text-xs">
                + Agregar Docente
              </Button>
            ) : (
              <Button variant="primary" onClick={handleOpenCreateBedel} className="!rounded-lg !py-1.5 !px-3.5 !text-xs">
                + Agregar Bedel
              </Button>
            )}
          </div>
        </div>

        {/* Modal / Formulario Desplegable Docente */}
        {isProfFormOpen && (
          <form onSubmit={handleSubmitProf} className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-petrol-900">
              {editingProfId ? 'Editar registro docente' : 'Nuevo registro de profesor'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[0.7rem] font-bold text-petrol-900 uppercase tracking-wider mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Prof. Daniel Buczel"
                  value={profForm.nombre_completo}
                  onChange={(e) => setProfForm({ ...profForm, nombre_completo: e.target.value })}
                  className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-1.5 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
                />
              </div>

              <div>
                <label className="block text-[0.7rem] font-bold text-petrol-900 uppercase tracking-wider mb-1">
                  Rol en la Asignación
                </label>
                <select
                  value={profForm.rol}
                  onChange={(e) => setProfForm({ ...profForm, rol: e.target.value })}
                  className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-1.5 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
                >
                  <option value="titular">Docente Titular</option>
                  <option value="ayudante">Profesor Ayudante de Trabajos (ATP)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[0.7rem] font-bold text-petrol-900 uppercase tracking-wider mb-1">
                  Materias Asignadas (Catálogo)
                </label>
                <MultiSelectMaterias
                  materiasDisponibles={materias}
                  seleccionadas={profForm.materias}
                  onChange={(mats) => setProfForm({ ...profForm, materias: mats })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsProfFormOpen(false)}
                className="!py-1.5 !px-3 !text-xs !border-petrol-100"
              >
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={submitting} className="!py-1.5 !px-4 !text-xs">
                {submitting ? 'Guardando...' : (editingProfId ? 'Guardar Cambios' : 'Registrar')}
              </Button>
            </div>
          </form>
        )}

        {/* Modal / Formulario Desplegable Bedel */}
        {isBedelFormOpen && (
          <form onSubmit={handleSubmitBedel} className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-petrol-900">
              {editingBedelId ? 'Editar Bedel' : 'Nuevo Bedel'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[0.7rem] font-bold text-petrol-900 uppercase tracking-wider mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Sra. Andrea Barrios"
                  value={bedelForm.nombre}
                  onChange={(e) => setBedelForm({ ...bedelForm, nombre: e.target.value })}
                  className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-1.5 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
                />
              </div>

              <div>
                <label className="block text-[0.7rem] font-bold text-petrol-900 uppercase tracking-wider mb-1">
                  Año a Cargo *
                </label>
                <select
                  value={bedelForm.anio_asignado}
                  onChange={(e) => setBedelForm({ ...bedelForm, anio_asignado: e.target.value })}
                  className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-1.5 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
                >
                  <option value="Primer Año">Primer Año</option>
                  <option value="Segundo Año">Segundo Año</option>
                  <option value="Tercer Año">Tercer Año</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsBedelFormOpen(false)}
                className="!py-1.5 !px-3 !text-xs !border-petrol-100"
              >
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={submitting} className="!py-1.5 !px-4 !text-xs">
                {submitting ? 'Guardando...' : (editingBedelId ? 'Guardar Cambios' : 'Registrar')}
              </Button>
            </div>
          </form>
        )}

        {/* Tablas según la pestaña activa */}
        {tabActiva === 'docentes' ? (
          <div className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs font-bold text-petrol-900 uppercase tracking-wider">
                Nómina Docente · {profesoresFiltrados.length} miembros
              </p>
              <div className="relative w-full sm:w-60">
                <input
                  type="text"
                  placeholder="Buscar docente o materia…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-petrol-50 border border-petrol-100 rounded-lg pl-8 pr-3 py-1 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
                />
                <AdminPlantelIcon2 />
              </div>
            </div>

            {loading ? (
              <p className="text-center py-6 text-xs text-petrol-600">Cargando datos del plantel...</p>
            ) : profesoresFiltrados.length === 0 ? (
              <p className="text-center py-6 text-xs text-petrol-600">No se encontraron profesores.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-petrol-100 text-[0.68rem] uppercase tracking-wider text-petrol-600 font-bold">
                      <th className="pb-2.5 px-3">Profesor</th>
                      <th className="pb-2.5 px-3">Materias asignadas</th>
                      <th className="pb-2.5 px-3">Rol</th>
                      <th className="pb-2.5 px-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-petrol-50 text-xs">
                    {profesoresFiltrados.map((item) => {
                      const esAyudante = item.materias_detalle?.some((m) => m.rol === 'ayudante');
                      return (
                        <tr key={item.id} className="hover:bg-petrol-50/50 transition-colors">
                          <td className="py-2.5 px-3 font-semibold text-petrol-900">
                            {item.nombre_completo}
                          </td>
                          <td className="py-2.5 px-3 text-petrol-600">
                            {item.materias_texto ? (
                              <span>{item.materias_texto}</span>
                            ) : (
                              <span className="italic text-gray-400">Sin materias</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider ${
                                esAyudante ? 'bg-amber-100 text-amber-800' : 'bg-mint-100 text-petrol-900'
                              }`}
                            >
                              {esAyudante ? 'Ayudante' : 'Titular'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right space-x-1.5 whitespace-nowrap">
                            <Button
                              variant="outline"
                              onClick={() => handleOpenEditProf(item)}
                              className="!py-1 !px-2 !text-[0.7rem] !border-petrol-100"
                            >
                              Editar
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteProf(item.id)}
                              className="!py-1 !px-2 !text-[0.7rem]"
                            >
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-2xs space-y-4">
            <p className="text-xs font-bold text-petrol-900 uppercase tracking-wider">
              Personal de Bedelía
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-petrol-100 text-[0.68rem] uppercase tracking-wider text-petrol-600 font-bold">
                    <th className="pb-2.5 px-3">Año asignado</th>
                    <th className="pb-2.5 px-3">Nombre</th>
                    <th className="pb-2.5 px-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-petrol-50 text-xs">
                  {bedeles.map((bedel) => (
                    <tr key={bedel.id} className="hover:bg-petrol-50/50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-petrol-900">
                        <span className="bg-petrol-50 border border-petrol-100 px-2 py-0.5 rounded text-[0.68rem] tracking-wide uppercase">
                          {bedel.anio_asignado}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-petrol-900">
                        {bedel.nombre}
                      </td>
                      <td className="py-2.5 px-3 text-right space-x-1.5 whitespace-nowrap">
                        <Button
                          variant="outline"
                          onClick={() => handleOpenEditBedel(bedel)}
                          className="!py-1 !px-2 !text-[0.7rem] !border-petrol-100"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteBedel(bedel.id)}
                          className="!py-1 !px-2 !text-[0.7rem]"
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}