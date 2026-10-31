import { useState, useEffect } from 'react';
import {
  getHorarios,
  createHorario,
  updateHorario,
  deleteHorario,
} from '../../services/horariosService';
import { getProfesores, getMaterias } from '../../services/docentesService';
import HorarioForm from './HorarioForm';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import { MesaLapiz, MesaTacho } from '../../assets/icons';
import { notifyActionError } from '../../utils/userRoles';

export default function HorariosCursada({ user }) {
  const [horarios, setHorarios] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [horarioToDelete, setHorarioToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [horariosData, materiasData, profesoresData] = await Promise.all([
          getHorarios(),
          getMaterias(),
          getProfesores(),
        ]);
        setHorarios(horariosData);
        setMaterias(materiasData);
        setProfesores(profesoresData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (payload) => {
    try {
      const materiaNombre =
        materias.find((m) => m.id === payload.materia_id)?.nombre || '';
      const profesorNombre =
        profesores.find((p) => p.id === payload.profesor_id)?.nombre_completo ||
        null;

      if (editingId) {
        await updateHorario(editingId, payload);
        setHorarios(
          horarios.map((h) =>
            h.id === editingId
              ? {
                  ...h,
                  ...payload,
                  materia_nombre: materiaNombre,
                  profesor_nombre: profesorNombre,
                }
              : h
          )
        );
        setEditingId(null);
      } else {
        const created = await createHorario(payload);
        const newHorario = {
          ...payload,
          id: created.horarioId || 'temp-id',
          materia_nombre: materiaNombre,
          profesor_nombre: profesorNombre,
        };
        setHorarios([newHorario, ...horarios]);
        setIsCreating(false);
      }
    } catch (err) {
      notifyActionError(err, 'Error al guardar el horario', user);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      await deleteHorario(id);
      setHorarios(horarios.filter((h) => h.id !== id));
      setHorarioToDelete(null);
    } catch (err) {
      if (notifyActionError(err, 'Error al eliminar el horario', user)) {
        setHorarioToDelete(null);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading)
    return <div className="p-8 text-gray-500">Cargando horarios...</div>;

  return (
    <div className="animate-fade-in">
      {/* Cabecera */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-[#143340] font-bold text-xs uppercase tracking-widest">
          Horarios de Cursada · Primer Cuatrimestre 2026
        </h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-[#8BD9CA] text-[#143340] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#7bc8b9] transition-colors"
          >
            <span>+</span> Asignar Horario
          </button>
        )}
      </div>

      {/* Formulario*/}
      {isCreating && (
        <HorarioForm
          materias={materias}
          profesores={profesores}
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {/* Grilla de Horarios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50/50 text-[0.7rem] font-bold text-gray-500 uppercase tracking-widest">
          <div className="col-span-2">Día</div>
          <div className="col-span-3">Franja Horaria</div>
          <div className="col-span-3">Materia</div>
          <div className="col-span-3">Docente a cargo</div>
          <div className="col-span-1 text-right">Acciones</div>
        </div>

        <div className="divide-y divide-gray-100">
          {horarios.map((horario) => (
            <div key={horario.id}>
              {editingId === horario.id ? (
                <div className="p-2">
                  <HorarioForm
                    initialData={horario}
                    materias={materias}
                    profesores={profesores}
                    onSave={handleSave}
                    onCancel={() => setEditingId(null)}
                    isInline={true}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50/50 transition-colors text-sm">
                  {/* Píldora del Día */}
                  <div className="col-span-2">
                    <span className="bg-[#143340] text-white px-3 py-1 rounded-full font-bold text-xs">
                      {horario.dia_semana}
                    </span>
                  </div>
                  {/* Horas */}
                  <div className="col-span-3 font-bold text-[#143340]">
                    {horario.hora_inicio?.slice(0, 5)} –{' '}
                    {horario.hora_fin?.slice(0, 5)} hs
                  </div>
                  {/* Materia */}
                  <div className="col-span-3 font-bold text-[#143340] truncate">
                    {horario.materia_nombre}
                  </div>
                  {/* Profesor */}
                  <div className="col-span-3 text-gray-500 truncate">
                    {horario.profesor_nombre
                      ? `Prof. ${horario.profesor_nombre}`
                      : 'Sin asignar'}
                  </div>
                  {/* Botones de Acción */}
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingId(horario.id)}
                      className="bg-[#C2F2E9]/50 hover:bg-[#C2F2E9] text-[#143340] px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <MesaLapiz /> Editar
                    </button>
                    <button
                      onClick={() => setHorarioToDelete(horario)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <MesaTacho /> Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {horarios.length === 0 && !loading && (
            <div className="p-8 text-center text-gray-500">
              No hay horarios registrados.
            </div>
          )}
        </div>
      </div>

      {horarioToDelete && (
        <DeleteConfirmationModal
          submitting={isDeleting}
          title="¿Eliminar horario?"
          message={`Se eliminará "${horarioToDelete.materia_nombre}" del ${horarioToDelete.dia_semana} a las ${horarioToDelete.hora_inicio?.slice(0, 5)}-${horarioToDelete.hora_fin?.slice(0, 5)} hs.`}
          onConfirm={() => handleDelete(horarioToDelete.id)}
          onCancel={() => setHorarioToDelete(null)}
        />
      )}
    </div>
  );
}
