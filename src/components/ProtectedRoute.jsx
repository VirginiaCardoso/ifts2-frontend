import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('ifts2_token');

  // Si no hay token guardado, bloquea el acceso y manda a la landing pública
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}