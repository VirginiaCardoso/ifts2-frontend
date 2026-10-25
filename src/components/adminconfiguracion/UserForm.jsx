import { useState } from "react";
import Button from '../Button';

export default function UserForm({ onCancel, onSubmitSuccess }) {
    const [formData, setFormData] = useState({
        nombre: '',
        rolInstitucional: '',
        correo: '',
        nivelAcceso: 'Gestión académica',
        password: '',
        confirmPassword: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        
        // Aquí llamaremos a la API del backend más adelante
        onSubmitSuccess(formData);
    };
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-base">Nuevo administrador</h3>
            
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

                <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 text-xs text-emerald-800">
                     Entregale esta contraseña al usuario de forma segura. Luego podrá cambiarla desde su perfil.
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
                        className="!py-2 !px-5"
                    >
                        Crear usuario
                    </Button>
                </div>
            </form>
        </div>
    );
}