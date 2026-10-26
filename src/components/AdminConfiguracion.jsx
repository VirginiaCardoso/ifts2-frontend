import { useState, useEffect } from "react";
import UsersTable from "./adminconfiguracion/UsersTable";
import UserForm from "./adminconfiguracion/UserForm";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteConfirmationModal from "./adminNovedades/DeleteConfirmationModal";
import {
  ShieldIcon,
} from '../assets/icons';


export default function AdminConfiguracion(){
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //para mostrar u ocultar el formulario
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null); //guarda el id del usuario en edición
    const [editForm, setEditForm] = useState({}); //guarda los valores temporales de los inputs
    const [userForPasswordReset, setUserForPasswordReset] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const [usuarios, setUsuarios] = useState([]);

    const cargarUsuarios = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('ifts2_token');
            const response = await fetch('http://localhost:3000/api/usuarios' , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 2. Envía el token al backend para que te autorice el acceso
                    'Authorization': `Bearer ${token}` 
                }
            });
            if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('No autorizado. Por favor, vuelve a iniciar sesión.');
                    }
                    throw new Error('Error al cargar los usuarios desde el servidor');
            }
            const data = await response.json();
            setUsuarios(data); 
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const filteredUsers = usuarios.filter(user => {
        const nombre = user.nombre_completo || user.nombre || '';
        const correo = user.correo || '';
        const termino = searchTerm.toLowerCase();

        return (
            nombre.toLowerCase().includes(termino) ||
            correo.toLowerCase().includes(termino)
        );
    });

    //funciones para editar usuario
    const handleEdit = (user) => {
        console.log("Iniciando edición para el usuario:", user);
        setEditingId(user.id);
        setEditForm({
            nombre_completo: user.nombre_completo,
            rol_institucional: user.rol_institucional,
            nivel_de_acceso: user.nivel_de_acceso,
            correo: user.correo
        });
    };
    //cancela la edición y limpia estados
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };
    //envía los datos actualizados al backend
    const handleSaveEdit = async (id) => {
        try{
            const token = localStorage.getItem('ifts2_token');
            const response = await fetch (`http://localhost:3000/api/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });
            if (!response.ok){
                throw new Error('No se pudo actualizar el usuario');
            }
            // Salimos del modo edición y recargamos la tabla
            setEditingId(null);
            cargarUsuarios();
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            alert(error.message);
        }
    };

    const confirmarEliminacion = async () => {
        if (!userToDelete) return;
        setIsDeleting(true);

        try {
            const token = localStorage.getItem('ifts2_token');
            const userId = typeof userToDelete === 'object' ? userToDelete.id : userToDelete;
            const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo eliminar el usuario');
            }

            setUserToDelete(null);
            
            // Recarga la lista de usuarios para actualizar la tabla al instante
            cargarUsuarios();
            
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            alert(error.message);
        } finally {
            setIsDeleting(false);
        }
    };
    
    useEffect(() => {
        cargarUsuarios();
    }, []);

    const handleResetPassword = (user) => {
        setUserForPasswordReset(user);
    };

    const handleDelete = (user) => {
        setUserToDelete(user);
    };

    const handleCreateNew = () => {
        setShowForm(true);
    };

    const handleFormSubmit = () => {
        setShowForm(false);
        cargarUsuarios();
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
                    editingId={editingId}
                    editForm={editForm}
                    setEditForm={setEditForm}
                    onSaveEdit={handleSaveEdit}
                    onCancelEdit={handleCancelEdit}                           
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
            
            {userToDelete && (
                <DeleteConfirmationModal
                    submitting={isDeleting}
                    onCancel={() => setUserToDelete(null)}
                    onConfirm={confirmarEliminacion}
                    title={`¿Eliminar el usuario: ${userToDelete.nombre_completo || userToDelete.nombre}?`}
                    message="Esta acción no se puede deshacer."
                />
            )}
        </div>
    );
}