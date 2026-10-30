export default function CarreraIcon({ tipo, className = 'w-4 h-4' }) {
  const paths = {
    graduacion: (
      <>
        <path d="m2 9 10-5 10 5-10 5L2 9Z" />
        <path d="M6 11v6c3 3 9 3 12 0v-6M22 9v6" />
      </>
    ),
    docentes: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 15a6 6 0 0 1 3 5" />
      </>
    ),
    eliminar: (
      <>
        <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" />
      </>
    ),
    subir: (
      <>
        <path d="M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6" />
      </>
    ),
    editar: (
      <>
        <path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14v6ZM12 4H3v17h17v-9" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[tipo]}
    </svg>
  );
}
