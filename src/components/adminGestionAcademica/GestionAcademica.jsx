import MesasSection from './MesasSection';
import HorariosCursada from './HorariosCursada';

export default function GestionAcademica({ user }) {
  return (
    <>
      <MesasSection user={user} />
      <HorariosCursada user={user} />
    </>
  );
}
