const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const authService = {
    changePassword: async (password_actual, nueva_password) => {
        const token = localStorage.getItem('ifts2_token');

        if (!token) {
            throw new Error('No hay una sesión activa. Por favor, vuelve a iniciar sesión.');
        }

        const response = await fetch(`${API_URL}/api/auth/cambiar-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                password_actual,
                nueva_password  
            })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.error || 'Error al cambiar la contraseña');
        }

        return data;
    }
};