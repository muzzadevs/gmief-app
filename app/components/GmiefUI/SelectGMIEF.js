"use client";

import React from "react";
import styled from "styled-components";

const SelectWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 50px;
  padding: 0 3rem 0 1rem;
  border: 1px solid #cfd8dc;
  border-radius: 10px;
  background-color: #f5f7fa;
  color: #42518c;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  outline: none;
  box-shadow: none;

  &:hover {
    border-color: #b0bec5;
  }

  &:focus {
    border-color: #90a4ae;
    box-shadow: none;
    outline: none;
  }

  option {
    background-color: #f5f7fa;
    color: #42518c;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  pointer-events: none;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #42518c;
`;

export default function SelectGMIEF({ children, ...props }) {
  return (
    <SelectWrapper>
      <StyledSelect {...props}>{children}</StyledSelect>
      <Arrow />
    </SelectWrapper>
  );
}
