"use client";

import styled from "styled-components";
import ZonaSubzonaSelect from "./ZonaSubzonaSelect";

const IglesiasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #e5e5e5;
`;

export default function Iglesias() {
  return (
    <IglesiasContainer>
      <ZonaSubzonaSelect />
    </IglesiasContainer>
  );
}
