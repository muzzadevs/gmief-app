"use client";

import React from "react";
import Navbar from "./components/Navbar";

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
