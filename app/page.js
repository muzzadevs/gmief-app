"use client";

import styled from "styled-components";
import Zonas from "./components/Zonas";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  width: 100vw;
  background-color: #e5e5e5;
`;

export default function Home() {
  return (
    <HomeContainer>
      <Zonas />
    </HomeContainer>
  );
}
