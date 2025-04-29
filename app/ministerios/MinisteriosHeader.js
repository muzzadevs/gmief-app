"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 10px;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: #42518c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const Title = styled.h4`
  color: #42518c;
  margin: 0;
`;

export default function MinisteriosHeader({ iglesiaNombre }) {
  const router = useRouter();

  const handleVolver = () => {
    router.push("/iglesias");
  };

  return (
    <HeaderContainer>
      <StyledButton onClick={handleVolver}>Volver</StyledButton>
      <Title>Ministerios de la Iglesia {iglesiaNombre}</Title>
    </HeaderContainer>
  );
}
