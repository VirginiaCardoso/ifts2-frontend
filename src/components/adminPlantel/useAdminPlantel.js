import { useEffect, useMemo, useState } from 'react';
import {
  createBedel,
  createProfesor,
  deleteBedel,
  deleteProfesor,
  getAutoridades,
  getBedeles,
  getMaterias,
  getProfesores,
  updateAutoridad,
  updateBedel,
  updateProfesor,
} from '../../services/docentesService';
import { notifyActionError } from '../../utils/userRoles';

function createProfessorForm() {
  return { nombre_completo: '', rol: 'titular', materias: [] };
}

function createBedelForm() {
  return { nombre: '', anio_asignado: 'Primer Año' };
}

async function fetchPlantelData() {
  const [autoridades, profesores, materias, bedeles] = await Promise.all([
    getAutoridades(),
    getProfesores(),
    getMaterias(),
    getBedeles(),
  ]);

  return {
    autoridades: Array.isArray(autoridades) ? autoridades : [],
    profesores: Array.isArray(profesores) ? profesores : [],
    materias: Array.isArray(materias) ? materias : [],
    bedeles: Array.isArray(bedeles) ? bedeles : [],
  };
}

export default function useAdminPlantel() {
  const [tabActiva, setTabActiva] = useState('docentes');
  const [autoridades, setAutoridades] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [bedeles, setBedeles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAuthorityId, setEditingAuthorityId] = useState(null);
  const [authorityName, setAuthorityName] = useState('');
  const [isProfessorFormOpen, setIsProfessorFormOpen] = useState(false);
  const [editingProfessorId, setEditingProfessorId] = useState(null);
  const [professorForm, setProfessorForm] = useState(createProfessorForm);
  const [isBedelFormOpen, setIsBedelFormOpen] = useState(false);
  const [editingBedelId, setEditingBedelId] = useState(null);
  const [bedelForm, setBedelForm] = useState(createBedelForm);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function updatePlantel(data) {
    setAutoridades(data.autoridades);
    setProfesores(data.profesores);
    setMaterias(data.materias);
    setBedeles(data.bedeles);
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const data = await fetchPlantelData();
        if (isMounted) updatePlantel(data);
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudo cargar el plantel');
          console.error('Error al inicializar plantel:', loadError);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProfesores = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return profesores.filter((profesor) =>
      (profesor.nombre_completo || '').toLowerCase().includes(query) ||
      (profesor.materias_texto || '').toLowerCase().includes(query)
    );
  }, [profesores, searchTerm]);

  async function reloadPlantel() {
    try {
      setLoading(true);
      setError('');
      updatePlantel(await fetchPlantelData());
    } catch (loadError) {
      setError(loadError.message || 'No se pudo actualizar el plantel');
      throw loadError;
    } finally {
      setLoading(false);
    }
  }

  function openCreateProfessor() {
    setEditingProfessorId(null);
    setProfessorForm(createProfessorForm());
    setIsProfessorFormOpen(true);
  }

  function openEditProfessor(professor) {
    setEditingProfessorId(professor.id);
    setProfessorForm({
      nombre_completo: professor.nombre_completo || '',
      rol: professor.materias_detalle?.[0]?.rol || 'titular',
      materias: professor.materias_detalle?.map((subject) => subject.materia_id) || [],
    });
    setIsProfessorFormOpen(true);
  }

  async function saveProfessor(event) {
    event.preventDefault();
    try {
      setSubmitting(true);
      if (editingProfessorId) {
        await updateProfesor(editingProfessorId, professorForm);
      } else {
        await createProfesor(professorForm);
      }
      setIsProfessorFormOpen(false);
      await reloadPlantel();
    } catch (saveError) {
      notifyActionError(saveError, 'Error al guardar docente');
    } finally {
      setSubmitting(false);
    }
  }

  function removeProfessor(id) {
    const professor = profesores.find((item) => item.id === id);
    setDeleteTarget({
      type: 'professor',
      id,
      name: professor?.nombre_completo || 'este integrante del plantel docente',
    });
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      setSubmitting(true);
      if (deleteTarget.type === 'professor') {
        await deleteProfesor(deleteTarget.id);
      } else {
        await deleteBedel(deleteTarget.id);
      }
      setDeleteTarget(null);
      await reloadPlantel();
    } catch (deleteError) {
      if (notifyActionError(deleteError, 'Error al eliminar')) {
        setDeleteTarget(null);
      }
    } finally {
      setSubmitting(false);
    }
  }

  function openCreateBedel() {
    setEditingBedelId(null);
    setBedelForm(createBedelForm());
    setIsBedelFormOpen(true);
  }

  function openEditBedel(bedel) {
    setEditingBedelId(bedel.id);
    setBedelForm({
      nombre: bedel.nombre || '',
      anio_asignado: bedel.anio_asignado || 'Primer Año',
    });
    setIsBedelFormOpen(true);
  }

  async function saveBedel(event) {
    event.preventDefault();
    try {
      setSubmitting(true);
      if (editingBedelId) {
        await updateBedel(editingBedelId, bedelForm);
      } else {
        await createBedel(bedelForm);
      }
      setIsBedelFormOpen(false);
      await reloadPlantel();
    } catch (saveError) {
      notifyActionError(saveError, 'Error al guardar bedel');
    } finally {
      setSubmitting(false);
    }
  }

  function removeBedel(id) {
    const bedel = bedeles.find((item) => item.id === id);
    setDeleteTarget({
      type: 'bedel',
      id,
      name: bedel?.nombre || 'este bedel',
    });
  }

  async function saveAuthority(authority) {
    try {
      setSubmitting(true);
      await updateAutoridad(authority.id, {
        cargo: authority.cargo,
        nombre_responsable: authorityName.trim() || authority.nombre_responsable,
      });
      setEditingAuthorityId(null);
      await reloadPlantel();
    } catch (saveError) {
      notifyActionError(saveError, 'Error al actualizar autoridad');
    } finally {
      setSubmitting(false);
    }
  }

  return {
    autoridades,
    bedelForm,
    bedeles,
    deleteTarget,
    editingAuthorityId,
    editingBedelId,
    editingProfessorId,
    error,
    filteredProfesores,
    isBedelFormOpen,
    isProfessorFormOpen,
    loading,
    materias,
    professorForm,
    searchTerm,
    submitting,
    tabActiva,
    authorityName,
    setAuthorityName,
    setBedelForm,
    setDeleteTarget,
    setEditingAuthorityId,
    setIsBedelFormOpen,
    setIsProfessorFormOpen,
    setProfessorForm,
    setSearchTerm,
    setTabActiva,
    openCreateBedel,
    openCreateProfessor,
    openEditBedel,
    openEditProfessor,
    removeBedel,
    removeProfessor,
    confirmDelete,
    saveAuthority,
    saveBedel,
    saveProfessor,
  };
}
