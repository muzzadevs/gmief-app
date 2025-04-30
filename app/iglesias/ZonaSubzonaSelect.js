"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import useAppStore from "../../store";
import SelectGMIEF from "../components/GmiefUI/SelectGMIEF";

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export default function ZonaSubzonaSelect() {
  const {
    zonaSeleccionada,
    setZonaSeleccionada,
    subzonaSeleccionada,
    setSubzonaSeleccionada,
  } = useAppStore();
  const [zonas, setZonas] = useState([]);
  const [subzonas, setSubzonas] = useState([]);
  const [loadingSubzonas, setLoadingSubzonas] = useState(false);

  // Cargar las zonas al montar el componente
  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const res = await fetch("/api/zonas");
        if (!res.ok) throw new Error("Error al obtener zonas");
        const data = await res.json();
        setZonas(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchZonas();
  }, []);

  // Cargar las subzonas cuando cambia la zona seleccionada
  useEffect(() => {
    if (!zonaSeleccionada) return;

    const fetchSubzonas = async () => {
      setLoadingSubzonas(true);
      try {
        const res = await fetch(`/api/zonas/${zonaSeleccionada.id}/subzonas`);
        if (!res.ok) throw new Error("Error al obtener subzonas");
        const data = await res.json();
        setSubzonas(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSubzonas(false);
      }
    };

    fetchSubzonas();
  }, [zonaSeleccionada]);

  // Manejar el cambio de zona
  const handleZonaChange = (event) => {
    const selectedId = event.target.value;
    const selectedZona = zonas.find((zona) => zona.id === parseInt(selectedId));
    setZonaSeleccionada(selectedZona); // Actualizar la zona seleccionada en la store
    setSubzonaSeleccionada(null); // Resetear la subzona seleccionada
  };

  // Manejar el cambio de subzona
  const handleSubzonaChange = (event) => {
    const selectedId = event.target.value;

    if (selectedId === "all") {
      setSubzonaSeleccionada(null); // Resetear la subzona seleccionada para mostrar todas las iglesias
    } else {
      const selectedSubzona = subzonas.find(
        (subzona) => subzona.id === parseInt(selectedId)
      );
      setSubzonaSeleccionada(selectedSubzona); // Actualizar la subzona seleccionada en la store
    }
  };

  return (
    <SelectContainer>
      <SelectGMIEF
        value={zonaSeleccionada?.id || ""} // Usar value en lugar de defaultValue
        onChange={handleZonaChange}
      >
        <option value="" disabled>
          Seleccione una zona
        </option>
        {zonas.map(({ id, nombre }) => (
          <option key={id} value={id}>
            {nombre}
          </option>
        ))}
      </SelectGMIEF>

      <SelectGMIEF
        value={subzonaSeleccionada?.id || ""} // Usar value en lugar de defaultValue
        onChange={handleSubzonaChange}
        disabled={loadingSubzonas || subzonas.length === 0}
      >
        <option value="" disabled>
          {loadingSubzonas ? "Cargando subzonas..." : "Seleccione una subzona"}
        </option>
        <option value="all">Todas</option> {/* Añadir opción "Todas" */}
        {subzonas.map(({ id, nombre }) => (
          <option key={id} value={id}>
            {nombre}
          </option>
        ))}
      </SelectGMIEF>
    </SelectContainer>
  );
}
