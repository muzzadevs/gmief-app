import Link from "next/link";
import React from "react";
import styled from "styled-components";
import useAppStore from "../../store"; // Importar la store

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-start;
  align-items: center;
  height: 10%;
  width: 100vw;
  background-color: #42518c;
  color: white;
`;

const LogoContainer = styled.div`
  // Cambiado de 'a' a 'div'
  cursor: pointer;
  margin-left: 2rem;
  padding: 5px 20px;
  color: #42518c;
  background-color: white;
  font-weight: 900;
  font-size: 1.5rem;
`;

const Navbar = () => {
  const resetStore = useAppStore((state) => state.resetStore); // Obtener la acción resetStore

  const handleLogoClick = () => {
    resetStore(); // Limpiar la store al hacer clic en el logo
  };

  return (
    <NavbarContainer>
      <Link href="/" passHref>
        <LogoContainer onClick={handleLogoClick}>GMIEF</LogoContainer>
      </Link>
    </NavbarContainer>
  );
};

export default Navbar;
