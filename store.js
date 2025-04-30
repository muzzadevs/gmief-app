import { create } from "zustand";

const useAppStore = create((set) => ({
  zonaSeleccionada: null,
  subzonaSeleccionada: null,
  iglesiaSeleccionada: null,
  ministerioSeleccionado: null,
  obrerosCount: 0,
  candidatosCount: 0,

  setZonaSeleccionada: (zona) => set({ zonaSeleccionada: zona }),
  setSubzonaSeleccionada: (subzona) => set({ subzonaSeleccionada: subzona }),
  setIglesiaSeleccionada: (iglesia) => set({ iglesiaSeleccionada: iglesia }),
  setMinisterioSeleccionado: (ministerio) =>
    set({ ministerioSeleccionado: ministerio }),

  // Acciones para actualizar los contadores
  setObrerosCount: (count) => set({ obrerosCount: count }),
  setCandidatosCount: (count) => set({ candidatosCount: count }),

  // Acción para limpiar la store
  resetStore: () =>
    set({
      zonaSeleccionada: null,
      subzonaSeleccionada: null,
      iglesiaSeleccionada: null,
      ministerioSeleccionado: null,
      obrerosCount: 0,
      candidatosCount: 0,
    }),
}));

export default useAppStore;
