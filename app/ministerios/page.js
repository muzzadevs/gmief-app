"use client";

import styled from "styled-components";
import useAppStore from "../../store";
import MinisteriosHeader from "./MinisteriosHeader";
import MinisteriosList from "./MinisteriosList";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #e5e5e5;
  padding: 2rem;
`;

export default function Ministerios() {
  const iglesiaSeleccionada = useAppStore((state) => state.iglesiaSeleccionada);

  if (!iglesiaSeleccionada) {
    return <p>No hay iglesia seleccionada.</p>;
  }

  return (
    <PageContainer>
      <MinisteriosHeader iglesiaNombre={iglesiaSeleccionada.nombre} />
      <MinisteriosList iglesiaId={iglesiaSeleccionada.id} />
    </PageContainer>
  );
}
