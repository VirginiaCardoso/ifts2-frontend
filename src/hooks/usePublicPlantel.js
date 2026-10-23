import { useEffect, useState } from 'react';
import { getAutoridades, getBedeles, getProfesores } from '../services/docentesService';

export default function usePublicPlantel() {
  const [autoridades, setAutoridades] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [ayudantes, setAyudantes] = useState([]);
  const [bedeles, setBedeles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadPlantel() {
      try {
        const [authoritiesData, professorsData, bedelesData] = await Promise.all([
          getAutoridades(),
          getProfesores(),
          getBedeles(),
        ]);
        if (!isMounted) return;

        const professors = Array.isArray(professorsData) ? professorsData : [];
        setAutoridades(Array.isArray(authoritiesData) ? authoritiesData : []);
        setDocentes(professors.filter(
          (professor) => !professor.materias_detalle?.some((subject) => subject.rol === 'ayudante')
        ));
        setAyudantes(professors.filter(
          (professor) => professor.materias_detalle?.some((subject) => subject.rol === 'ayudante')
        ));
        setBedeles(Array.isArray(bedelesData) ? bedelesData : []);
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudo cargar el plantel');
          console.error('Error al cargar plantel en la vista pública:', loadError);
        }
      }
    }

    void loadPlantel();
    return () => {
      isMounted = false;
    };
  }, []);

  return { autoridades, docentes, ayudantes, bedeles, error };
}
