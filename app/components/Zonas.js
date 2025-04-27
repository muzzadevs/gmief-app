"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import SelectGMIEF from "./GmiefUI/SelectGMIEF";
import SpinerGMIEF from "./GmiefUI/SpinerGMIEF";
import useAppStore from "../../store";

const ZonasContainer = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 0;
`;

export default function Zonas() {
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setZonaSeleccionada = useAppStore((state) => state.setZonaSeleccionada);
  const router = useRouter();

  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const res = await fetch("/api/zonas");
        if (!res.ok) throw new Error("Error al obtener zonas");
        const data = await res.json();
        setZonas(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las zonas");
      } finally {
        setLoading(false);
      }
    };

    fetchZonas();
  }, []);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selectedZona = zonas.find((zona) => zona.id === parseInt(selectedId));

    if (selectedZona) {
      setZonaSeleccionada(selectedZona);
      router.push("/iglesias");
    }
  };

  const renderSelect = () => (
    <SelectGMIEF defaultValue="" onChange={handleChange}>
      <option value="" disabled>
        Seleccione una zona
      </option>
      {zonas.map(({ id, nombre }) => (
        <option key={id} value={id}>
          {nombre}
        </option>
      ))}
    </SelectGMIEF>
  );

  return (
    <ZonasContainer>
      {loading && <SpinerGMIEF />}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && renderSelect()}
    </ZonasContainer>
  );
}
