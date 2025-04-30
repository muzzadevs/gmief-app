"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import ZonaSubzonaSelect from "./ZonaSubzonaSelect";
import AccordionList from "./AccordionList";
import useAppStore from "../../store";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #e5e5e5;
  padding: 2rem 2rem 0;
  gap: 20px;
`;

const Title = styled.h4`
  margin-left: 5px;
  color: #42518c;
`;

export default function Iglesias() {
  const [iglesias, setIglesias] = useState([]);
  const [filteredIglesias, setFilteredIglesias] = useState([]);

  const subzonaSeleccionada = useAppStore((state) => state.subzonaSeleccionada);
  const zona = useAppStore((state) => state.zonaSeleccionada);
  const zonaSeleccionada = zona?.nombre || "Zona desconocida";

  // Determinar el título dinámico
  const tituloDinamico = subzonaSeleccionada
    ? subzonaSeleccionada.id === "all"
      ? `Iglesias de la ${zonaSeleccionada}`
      : `Iglesias de la Subzona ${subzonaSeleccionada.nombre}`
    : `Iglesias de la ${zonaSeleccionada}`;

  useEffect(() => {
    const fetchIglesias = async () => {
      try {
        let url;

        if (!zona) {
          console.error("Zona no seleccionada");
          return; // Salir si no hay zona seleccionada
        }

        if (subzonaSeleccionada === null || subzonaSeleccionada?.id === "all") {
          url = `/api/iglesias?zonaId=${zona.id}`;
        } else if (subzonaSeleccionada) {
          url = `/api/iglesias?subzonaId=${subzonaSeleccionada.id}`;
        } else {
          url = "/api/iglesias";
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener iglesias");
        const data = await response.json();
        setIglesias(data);
        setFilteredIglesias(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIglesias();
  }, [subzonaSeleccionada, zona]);

  return (
    <PageContainer>
      <ZonaSubzonaSelect />
      <Title>
        <strong>{tituloDinamico}</strong> | Cantidad de iglesias:{" "}
        {filteredIglesias.length}
      </Title>
      <AccordionList iglesias={filteredIglesias} />
    </PageContainer>
  );
}
