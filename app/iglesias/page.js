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

export default function Iglesias() {
  const [iglesias, setIglesias] = useState([]);
  const [filteredIglesias, setFilteredIglesias] = useState([]);
  const subzonaSeleccionada = useAppStore((state) => state.subzonaSeleccionada);
  useEffect(() => {
    const fetchIglesias = async () => {
      try {
        const url = subzonaSeleccionada
          ? `/api/iglesias?subzonaId=${subzonaSeleccionada.id}`
          : "/api/iglesias";
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
  }, [subzonaSeleccionada]);

  return (
    <PageContainer>
      <ZonaSubzonaSelect />
      <AccordionList iglesias={filteredIglesias} />
    </PageContainer>
  );
}
