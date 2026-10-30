import { useContext } from 'react';
import { CarreraContext } from './CarreraContext';
export function useCarreraData() {
  return useContext(CarreraContext);
}
