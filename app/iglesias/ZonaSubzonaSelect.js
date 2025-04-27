"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import useAppStore from "../../store";
import SelectGMIEF from "../components/GmiefUI/SelectGMIEF";

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem 2rem 0;
  gap: 1rem;
`;

export default function ZonaSubzonaSelect() {
  const { zonaSeleccionada, setZonaSeleccionada, setSubzonaSeleccionada } =
    useAppStore();
  const [zonas, setZonas] = useState([]);
  const [subzonas, setSubzonas] = useState([]);
  const [loadingSubzonas, setLoadingSubzonas] = useState(false);

  // Obtener las zonas al cargar el componente
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

  // Obtener las subzonas cuando cambia la zona seleccionada
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

  const handleZonaChange = (event) => {
    const selectedId = event.target.value;
    const selectedZona = zonas.find((zona) => zona.id === parseInt(selectedId));
    setZonaSeleccionada(selectedZona);
  };

  const handleSubzonaChange = (event) => {
    const selectedId = event.target.value;
    const selectedSubzona = subzonas.find(
      (subzona) => subzona.id === parseInt(selectedId)
    );
    setSubzonaSeleccionada(selectedSubzona);
  };

  return (
    <SelectContainer>
      {/* Select de Zonas */}
      <SelectGMIEF
        defaultValue={zonaSeleccionada?.id || ""}
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

      {/* Select de Subzonas */}
      <SelectGMIEF
        defaultValue=""
        onChange={handleSubzonaChange}
        disabled={loadingSubzonas || subzonas.length === 0}
      >
        <option value="" disabled>
          {loadingSubzonas ? "Cargando subzonas..." : "Seleccione una subzona"}
        </option>
        {subzonas.map(({ id, nombre }) => (
          <option key={id} value={id}>
            {nombre}
          </option>
        ))}
      </SelectGMIEF>
    </SelectContainer>
  );
}
