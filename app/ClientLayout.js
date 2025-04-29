"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react"; // Importar ChakraProvider
import Navbar from "./components/Navbar";

export default function ClientLayout({ children }) {
  return (
    <ChakraProvider>
      <Navbar />
      {children}
    </ChakraProvider>
  );
}
