export default function NewsMetrics({ metrics }) {
  const cards = [
    { label: 'Total novedades', value: metrics.total, valueClass: 'text-petrol-900' },
    { label: 'Total publicadas', value: metrics.publicadas, valueClass: 'text-mint-500' },
    { label: 'Borradores', value: metrics.borradores, valueClass: 'text-amber-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ label, value, valueClass }) => (
        <div key={label} className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-xs">
          <p className={`font-display text-2xl font-bold ${valueClass}`}>{value}</p>
          <p className="text-xs text-petrol-600 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}