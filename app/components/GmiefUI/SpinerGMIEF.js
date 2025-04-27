"use client";

import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spiner = styled.div`
  margin-top: 2rem;
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top: 4px solid #42518c;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default function SpinerGMIEF() {
  return <Spiner />;
}
