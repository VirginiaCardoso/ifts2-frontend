import Button from "../Button";
import { AdminNovedadesIcon1,
    ContactoIcon1,
    FooterIcon2,
 } from "../../assets/icons";

 export default function UsersTable({
    error,
    loading,
    users,
    searchTerm,
    onSearchChange,
    onEdit,
    onResetPassword,
    onDelete,
    onCreateNew,
 }) {
    return (
        <div className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-2xs space-y-4">
            {/* Cabecera con Buscador y Botón */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs font-bold text-petrol-900 uppercase tracking-wider">
                    Cuentas de Administrador · {users.length} Usuarios
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-60">
                       <input
                        type="search"
                        placeholder="Buscar usuario o correo..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-1 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
                       />
                    </div>
                    <button
                        onClick={onCreateNew}
                        className="bg-mint-300 hover:bg-mint-400 text-petrol-950 font-semibold px-4 py-1.5 rounded-lg text-xs flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                        <AdminNovedadesIcon1 />
                        Crear nuevo usuario
                    </button>
                </div>
            </div>
            {/* Estados de carga, error o listado vacío */}
            {loading ? (
                <p className="text-center py-6 text-xs text-petrol-600">Cargando cuentas...</p>
            ) : error ? (
                <p role="alert" className="text-center py-6 text-xs text-red-600">{error}</p>
            ) : users.length === 0 ? (
                <p className="text-center py-6 text-xs text-petrol-600">No se encontraron usuarios.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-petrol-100 text-[0.68rem] uppercase tracking-wider text-petrol-600 font-bold bg-petrol-50/50">
                                <th className="py-2.5 px-3">Nombre</th>
                                <th className="py-2.5 px-3">Rol Institucional</th>
                                <th className="py-2.5 px-3">Nivel de acceso</th>
                                <th className="py-2.5 px-3">Correo / usuario</th>
                                <th className="py-2.5 px-3">Último acceso</th>
                                <th className="py-2.5 px-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-petrol-50 text-xs">
                          {users.map((user) => (  
                            <tr key={user.id} className="hover:bg-petrol-50/50 transition-colors">
                                <td className="py-2.5 px-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-petrol-900 text-mint-300 font-bold text-xs flex items-center justify-center">
                                            {user.iniciales || (user.nombre_completo || user.nombre || 'US').substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-petrol-900">{user.nombre}</div>
                                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full mt-0.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                {user.estado || 'Activo'}
                                            </span>  
                                        </div>
                                    </div>
                                </td>
                                {/* Rol Institucional */}
                                <td className="py-2.5 px-3 font-semibold text-petrol-700">
                                    {user.rol_institucional || user.rolInstitucional}
                                </td>
                                {/* Nivel de Acceso */}
                                <td className="py-2.5 px-3">
                                    <span className="inline-block text-[0.65rem] font-bold px-2 py-0.5 rounded bg-petrol-50 text-petrol-900 border border-petrol-100 uppercase tracking-wider">
                                        {user.nivel_de_acceso || user.nivelAcceso || user.rol}
                                    </span>
                                </td>
                                {/* Correo */}
                                <td className="py-2.5 px-3 text-petrol-600">
                                    <div className="flex items-center gap-1.5">
                                        <ContactoIcon1 className="w-3.5 h-3.5 text-petrol-400" />
                                        <span>{user.correo}</span>
                                    </div>
                                </td>
                                {/* Último Acceso */}
                                <td className="py-2.5 px-3 text-petrol-500 text-[0.7rem]">
                                    <div className="flex items-center gap-1.5">
                                        <FooterIcon2 className="w-3.5 h-3.5 text-petrol-400" />
                                        <span>{user.ultimo_acceso || user.ultimoAcceso || 'Hoy'}</span>
                                    </div>
                                </td>
                                {/* Acciones */}
                                <td className="py-2.5 px-3 text-right space-x-1 whitespace-nowrap">
                                    <Button
                                        variant="outline"
                                        onClick={() => onEdit && onEdit(user)}
                                        className="!py-1 !px-2 !text-[0.7rem] !border-petrol-100"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => onResetPassword && onResetPassword(user)}
                                        className="!py-1 !px-2 !text-[0.7rem] !border-petrol-100"
                                    >
                                        Contraseña
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => onDelete && onDelete(user.id)}
                                        className="!py-1 !px-2 !text-[0.7rem]"
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                          ))}
                        </tbody>
                    </table> 
                </div>
            )}
        </div>
    );
 }