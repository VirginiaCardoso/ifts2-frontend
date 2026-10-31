import { useState, useEffect } from 'react';
import {
  getMesas,
  createMesa,
  updateMesa,
  deleteMesa,
} from '../../services/mesasService';
import { getProfesores, getMaterias } from '../../services/docentesService';
import MesaCard from './MesaCard';
import MesaForm from './MesaForm';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import { notifyActionError } from '../../utils/userRoles';

export default function MesasSection({ user }) {
  const [mesas, setMesas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [mesaToDelete, setMesaToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── CARGA INICIAL DE DATOS ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [mesasData, materiasData, profesoresData] = await Promise.all([
          getMesas(),
          getMaterias(),
          getProfesores(),
        ]);
        setMesas(mesasData);
        setMaterias(materiasData);
        setProfesores(profesoresData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (formData) => {
    const payload = {
      ...formData,
      materia_id: Number(formData.materia_id),
    };

    try {
      if (editingId) {
        await updateMesa(editingId, payload);

        setMesas(
          mesas.map((m) => {
            if (m.id === editingId) {
              return {
                ...m,
                ...payload,
                materia_nombre: getMateriaNombre(payload.materia_id),
                tribunal: mapProfesores(payload.profesores_ids),
                profesores_ids: payload.profesores_ids,
              };
            }
            return m;
          })
        );
        setEditingId(null);
      } else {
        //POST
        const created = await createMesa(payload);

        const newMesa = {
          ...payload,
          id: created.mesaId || created.id || 'temp-id',
          materia_nombre: getMateriaNombre(payload.materia_id),
          tribunal: mapProfesores(payload.profesores_ids),
          profesores_ids: payload.profesores_ids,
        };
        setMesas([newMesa, ...mesas]);
        setIsCreating(false);
      }
    } catch (err) {
      notifyActionError(err, 'Error al guardar la mesa', user);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      await deleteMesa(id);
      setMesas(mesas.filter((m) => m.id !== id));
      setMesaToDelete(null);
    } catch (err) {
      if (notifyActionError(err, 'Error al eliminar la mesa', user)) {
        setMesaToDelete(null);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const getMateriaNombre = (id) =>
    materias.find((m) => m.id === Number(id))?.nombre || '';
  const mapProfesores = (ids) =>
    profesores
      .filter((p) => ids.includes(p.id))
      .map((p) => ({ id: p.id, nombre_completo: p.nombre_completo }));

  if (loading)
    return (
      <div className="p-8 text-gray-500">Cargando gestión académica...</div>
    );
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="animate-fade-in">
      {/* Título de Sección */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[#143340] mb-2">
          Gestión Académica: Horarios y Exámenes
        </h1>
        <p className="text-gray-500 text-sm">
          Administrá las mesas de exámenes finales y la grilla de cursada
          semanal.
        </p>
      </div>

      {/* Cabecera de Mesas y Botón Agregar */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-[#143340] font-bold text-xs uppercase tracking-widest">
          Mesas de Exámenes · Año en curso
        </h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-[#8BD9CA] text-[#143340] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#7bc8b9] transition-colors"
          >
            <span>+</span> Agregar Mesa
          </button>
        )}
      </div>

      {/* Formulario Superior (Modo Crear) */}
      {isCreating && (
        <MesaForm
          materias={materias}
          profesores={profesores}
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {/* Grilla de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mesas.map((mesa) => (
          <div key={mesa.id}>
            {editingId === mesa.id ? (
              // Formulario Inline (Editar)
              <MesaForm
                initialData={mesa}
                materias={materias}
                profesores={profesores}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
                isInline={true}
              />
            ) : (
              // Tarjeta
              <MesaCard
                mesa={mesa}
                onEdit={(m) => setEditingId(m.id)}
                onDelete={(m) => setMesaToDelete(m)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal de Eliminación */}
      {mesaToDelete && (
        <DeleteConfirmationModal
          submitting={isDeleting}
          title="¿Eliminar mesa?"
          message={`La mesa "${mesaToDelete.materia_nombre} - ${mesaToDelete.fecha?.split('T')[0].split('-').reverse().join('/')} - ${mesaToDelete.hora?.slice(0, 5)} hs" será eliminada permanentemente.`}
          onConfirm={() => handleDelete(mesaToDelete.id)}
          onCancel={() => setMesaToDelete(null)}
        />
      )}
    </div>
  );
}
