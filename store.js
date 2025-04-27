import { create } from "zustand";

const useAppStore = create((set) => ({
  zonaSeleccionada: null,
  subzonaSeleccionada: null,
  iglesiaSeleccionada: null,
  ministerioSeleccionado: null,

  // Acción para actualizar la zona seleccionada
  setZonaSeleccionada: (zona) => set({ zonaSeleccionada: zona }),
  setSubzonaSeleccionada: (subzona) => set({ subzonaSeleccionada: subzona }),
  // Acciones futuras para otros estados
  setIglesiaSeleccionada: (iglesia) => set({ iglesiaSeleccionada: iglesia }),
  setMinisterioSeleccionado: (ministerio) =>
    set({ ministerioSeleccionado: ministerio }),
}));

export default useAppStore;
