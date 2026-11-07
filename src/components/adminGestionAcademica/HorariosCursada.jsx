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
const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export default function HorariosCursada({ user }) {
  const [horarios, setHorarios] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [horarioToDelete, setHorarioToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cuatrimestre, setCuatrimestre] = useState(() => (new Date().getMonth() >= 7 ? 2 : 1));
  const [anioCarrera, setAnioCarrera] = useState(1);


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
    const materia = materias.find((m) => m.id === payload.materia_id);
    const profesorNombre =
      profesores.find((p) => p.id === payload.profesor_id)?.nombre_completo ||
      null;
    const datosVista = {
      materia_nombre: materia?.nombre || '',
      anio_carrera: materia?.anio_carrera,
      profesor_nombre: profesorNombre,
    };

    if (editingId) {
      await updateHorario(editingId, payload);
      setHorarios(
        horarios.map((h) =>
          h.id === editingId ? { ...h, ...payload, ...datosVista } : h
        )
      );
      setEditingId(null);
    } else {
      const created = await createHorario(payload);
      setHorarios([
        { ...payload, ...datosVista, id: created.horarioId || 'temp-id' },
        ...horarios,
      ]);
      setIsCreating(false);
    }

    setCuatrimestre(payload.cuatrimestre);
    if (materia) setAnioCarrera(Number(materia.anio_carrera));
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

  const horariosVisibles = horarios
  .filter(
    (h) => h.cuatrimestre === cuatrimestre && Number(h.anio_carrera) === anioCarrera
  )
  .sort(
    (a, b) =>
      DIAS.indexOf(a.dia_semana) - DIAS.indexOf(b.dia_semana) ||
      a.hora_inicio.localeCompare(b.hora_inicio)
  );


  if (loading)
    return <div className="p-8 text-gray-500">Cargando horarios...</div>;

  return (
    <div className="animate-fade-in mt-12">
      {/* Cabecera */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-[#143340] font-bold text-xs uppercase tracking-widest">
          Horarios de Cursada · {anioCarrera}º año · {cuatrimestre}º cuatrimestre
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
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            aria-label="Año de la carrera"
            value={anioCarrera}
            onChange={(e) => setAnioCarrera(Number(e.target.value))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          >
            {[1, 2, 3].map((n) => <option key={n} value={n}>{n}º año</option>)}
          </select>
          <select
            aria-label="Cuatrimestre"
            value={cuatrimestre}
            onChange={(e) => setCuatrimestre(Number(e.target.value))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          >
            {[1, 2].map((n) => <option key={n} value={n}>{n}º cuatrimestre</option>)}
          </select>
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
          {horariosVisibles.map((horario) => (
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
                    {horario.profesor_nombre || 'Sin asignar'}
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

          {horariosVisibles.length === 0 && !loading && (
            <div className="p-8 text-center text-gray-500">
              No hay horarios cargados para este año y cuatrimestre.
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
