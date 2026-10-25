import { useState } from "react";
import Button from '../Button';
import { ChangePasswordModalIcon1 } from "../../assets/icons";

export default function UserForm({ onCancel, onSubmitSuccess }) {
    const [formData, setFormData] = useState({
        nombre: '',
        rolInstitucional: '',
        correo: '',
        nivelAcceso: 'Gestión académica',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError("Las contraseñas no coinciden");
        }

        if (formData.password.length < 8) {
            return setError("La contraseña debe tener al menos 8 caracteres");
        }
        setIsLoading(true);
        try {
            const token = localStorage.getItem('ifts2_token');
            // Mapeamos los datos para que coincidan con el req.body del backend
            const datosParaEnviar = {
                nombre_completo: formData.nombre,
                rol_institucional: formData.rolInstitucional,
                nivel_de_acceso: formData.nivelAcceso,
                correo: formData.correo,
                password: formData.password
            };
            const response = await fetch('http://localhost:3000/api/usuarios', {
                method: 'POST',
                headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(datosParaEnviar)
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al registrar el usuario.');
            }
            alert("¡Usuario creado exitosamente!");
            if (onSubmitSuccess) {
                onSubmitSuccess(data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-base">Nuevo administrador</h3>
            {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs border border-red-100">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre completo *</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Ej: Laura Gómez" 
                            value={formData.nombre}
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-mint-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rol institucional *</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Ej: Coordinadora" 
                            value={formData.rolInstitucional}
                            onChange={(e) => setFormData({...formData, rolInstitucional: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-mint-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Correo / Usuario *</label>
                        <input 
                            type="email" 
                            required
                            placeholder="usuario@ifts2.edu.ar" 
                            value={formData.correo}
                            onChange={(e) => setFormData({...formData, correo: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-mint-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nivel de acceso *</label>
                        <select 
                            value={formData.nivelAcceso}
                            onChange={(e) => setFormData({...formData, nivelAcceso: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-mint-400"
                        >
                            <option value="Gestión académica">Gestión académica</option>
                            <option value="Administrador general">Administrador general</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contraseña inicial *</label>
                        <input 
                            type="password" 
                            required
                            placeholder="Mínimo 8 caracteres" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-mint-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Confirmar contraseña *</label>
                        <input 
                            type="password" 
                            required
                            placeholder="Repetí la contraseña" 
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-mint-400"
                        />
                    </div>
                </div>

                <div className="flex gap-2 bg-emerald-50/50 border border-emerald-100 rounded-lg p-2 text-xs text-emerald-800 items-center">
                    <div className="w-4 h-4 shrink-0 [&>svg]:w-full [&>svg]:h-full ml-1">
                        <ChangePasswordModalIcon1 />
                    </div>
                    <span>Entregale esta contraseña al usuario de forma segura. Luego podrá cambiarla desde su perfil.</span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button 
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="!border-petrol-100 !text-petrol-600 !py-2 !px-4"
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit"
                        variant="primary"
                        disabled={isLoading}
                        className="!py-2 !px-5"
                    >
                        {isLoading ? 'Guardando...' : 'Crear usuario'}
                    </Button>
                </div>
            </form>
        </div>
    );
}