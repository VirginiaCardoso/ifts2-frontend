import Button from './Button';
import { AdminTopbarIcon1 } from '../assets/icons';

export default function AdminTopbar({ title, subtitle }) {
  return (
    <header className="sticky top-0 z-10 h-16 bg-white border-b border-petrol-100 px-8 flex items-center justify-between">
      <div>
        <p className="text-sm font-bold text-petrol-900 leading-none tracking-tight">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-petrol-600 font-normal mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <Button
        variant="outline"
        onClick={() => window.open('/', '_blank')}
        className="!border-petrol-100 !text-petrol-600 hover:!text-petrol-900 hover:!border-mint-400 hover:!bg-petrol-50 !py-1.5 !px-3 !text-xs !rounded-lg"
      >
        <AdminTopbarIcon1 />
        Ver sitio
      </Button>
    </header>
  );
}