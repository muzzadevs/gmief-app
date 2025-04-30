"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import useAppStore from "../../store";

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

const Tag = styled.span`
  background-color: #42518c;
  color: rgb(255, 255, 255);
  border-radius: 12px;
  padding: 4px 8px;
  font-size: 0.9rem;
`;

export default function MinisteriosHeader({ iglesiaNombre }) {
  const router = useRouter();
  const obrerosCount = useAppStore((state) => state.obrerosCount);
  const candidatosCount = useAppStore((state) => state.candidatosCount);

  const handleVolver = () => {
    router.push("/iglesias");
  };

  return (
    <HeaderContainer>
      <StyledButton onClick={handleVolver}>Volver</StyledButton>
      <Title>
        Ministerios de la Iglesia {iglesiaNombre}
        <br />
        <Tag>
          <strong>Obreros:</strong> {obrerosCount}
        </Tag>{" "}
        <Tag>
          <strong>Candidatos:</strong> {candidatosCount}
        </Tag>
      </Title>
    </HeaderContainer>
  );
}
