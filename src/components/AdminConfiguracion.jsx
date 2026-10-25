import { useState } from "react";
import UsersTable from "./adminconfiguracion/UsersTable";
import UserForm from "./adminconfiguracion/UserForm";
import ChangePasswordModal from "./ChangePasswordModal";
import {
  ShieldIcon,
} from '../assets/icons';


export default function AdminConfiguracion(){
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //para mostrar u ocultar el formulario
    const [showForm, setShowForm] = useState(false);
    const [userForPasswordReset, setUserForPasswordReset] = useState(null);
    
    const [usuarios] = useState([
        {
        id: 1,
        nombre: 'Matías Peláez',
        iniciales: 'MP',
        estado: 'Activo',
        rolInstitucional: 'Referente Digital',
        nivelAcceso: 'Administrador general',
        correo: 'mpelaez@ifts2.edu.ar',
        ultimoAcceso: 'Hoy, 09:42 hs'
        },
        {
        id: 2,
        nombre: 'María del Carmen Canovi',
        iniciales: 'MC',
        estado: 'Activo',
        rolInstitucional: 'Secretaria Académica',
        nivelAcceso: 'Gestión académica',
        correo: 'mcanovi@ifts2.edu.ar',
        ultimoAcceso: 'Ayer, 14:15 hs'
        },
        {
        id: 3,
        nombre: 'Prof. Alicia E. Ruidiaz',
        iniciales: 'AR',
        estado: 'Activo',
        rolInstitucional: 'Profesor',
        nivelAcceso: 'Administrador general',
        correo: 'aruidiaz@ifts2.edu.ar',
        ultimoAcceso: 'Hace 3 d'
        }
    ]);
    const filteredUsers = usuarios.filter(user => {
        const nombre = user.nombre_completo || user.nombre || '';
        const correo = user.correo || '';
        const termino = searchTerm.toLowerCase();

        return (
            nombre.toLowerCase().includes(termino) ||
            correo.toLowerCase().includes(termino)
        );
    });

    const handleEdit = (user) => {
        console.log('Editar usuario:', user);
    };

    const handleResetPassword = (user) => {
        setUserForPasswordReset(user);
    };

    const handleDelete = (id) => {
        console.log('Eliminar usuario con ID:', id);
    };

    const handleCreateNew = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (data) => {
        console.log("Guardar nuevo usuario:", data);
        // Aquí llamaremos al backend para guardar
        setShowForm(false);
    };

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <h1 className="font-display text-petrol-900 text-3xl md:text-4xl leading-tight">
                        Configuración de Usuarios y Accesos
                    </h1>
                    <p className="text-petrol-600 text-sm font-medium mt-1">
                        Administrá las cuentas con acceso al panel. Podés crear usuarios, restablecer contraseñas y gestionar roles.
                    </p>
                </div>
            </div>
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700 mt-0.5">
                    <ShieldIcon />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                        Acceso seguro sin límite de usuarios
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Cada cuenta tiene credenciales independientes. Las contraseñas se almacenan cifradas y nunca se muestran en texto plano.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                    <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                        <ShieldIcon />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">Administrador general</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Puede editar todas las secciones y administrar usuarios.</p>
                    </div>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                    <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                        <ShieldIcon />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">Administrador general</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Puede editar todas las secciones y administrar usuarios.</p>
                    </div>
                </div>
            </div>
            {/* 3. FORMULARIO DESPLEGABLE*/}
            {showForm && (
                <UserForm 
                    onCancel={() => setShowForm(false)} 
                    onSubmitSuccess={handleFormSubmit} 
                />
            )}
            <div>
                   <UsersTable 
                    error={error}
                    loading={loading}
                    users={filteredUsers}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onEdit={handleEdit}
                    onResetPassword={handleResetPassword}
                    onDelete={handleDelete}
                    onCreateNew={handleCreateNew}                           
                   />
            </div>
            <ChangePasswordModal 
                isOpen={Boolean(userForPasswordReset)}
                onClose={() => setUserForPasswordReset(null)}
                user={userForPasswordReset}
                onSuccess={() => {
                    alert("Contraseña restablecida con éxito");
                    setUserForPasswordReset(null);
                }}
            />
        </div>
    );
}