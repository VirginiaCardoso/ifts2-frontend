import { escucharCambiosCarrera } from '../services/carreraUpdates';
import { useEffect, useState } from 'react';
import {
  getAutoridades,
  getBedeles,
  getProfesores,
} from '../services/docentesService';

export default function usePublicPlantel() {
  const [autoridades, setAutoridades] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [ayudantes, setAyudantes] = useState([]);
  const [bedeles, setBedeles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    let version = 0;

    async function loadPlantel() {
      const actual = ++version;
      try {
        const [authoritiesData, professorsData, bedelesData] =
          await Promise.all([getAutoridades(), getProfesores(), getBedeles()]);
        if (!isMounted || actual !== version) return;
        setError('');

        const professors = Array.isArray(professorsData) ? professorsData : [];
        setAutoridades(Array.isArray(authoritiesData) ? authoritiesData : []);
        setDocentes(
          professors.filter(
            (professor) =>
              !professor.materias_detalle?.some(
                (subject) => subject.rol === 'ayudante'
              )
          )
        );
        setAyudantes(
          professors.filter((professor) =>
            professor.materias_detalle?.some(
              (subject) => subject.rol === 'ayudante'
            )
          )
        );
        setBedeles(Array.isArray(bedelesData) ? bedelesData : []);
      } catch (loadError) {
        if (isMounted && actual === version) {
          setError(loadError.message || 'No se pudo cargar el plantel');
          console.error(
            'Error al cargar plantel en la vista pública:',
            loadError
          );
        }
      }
    }

    void loadPlantel();
    const dejarEscuchar = escucharCambiosCarrera(loadPlantel);
    return () => {
      isMounted = false;
      dejarEscuchar();
    };
  }, []);

  return { autoridades, docentes, ayudantes, bedeles, error };
}
