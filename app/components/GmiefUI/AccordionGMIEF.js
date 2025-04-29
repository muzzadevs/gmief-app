import { useState } from "react";
import styled from "styled-components";

const AccordionContainer = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
  height: auto;
`;

const AccordionHeader = styled.div`
  background-color: #f5f7fa;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: #333;

  &:hover {
    cursor: pointer;
  }
`;

const AccordionTitle = styled.div`
  color: #42518c;
`;

const AccordionSubtitle = styled.span`
  color: grey;
  font-weight: 400;
  font-size: 12px;
`;

const AccordionIcon = styled.span`
  font-size: 0.8rem;
  color: black;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.3s ease;
`;

const AccordionContent = styled.div`
  background-color: #fff;
  padding: 1rem;
  font-size: 0.9rem;
  color: #555;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  border-top: 1px solid #ddd;
`;

export default function AccordionGMIEF({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {items.map((item, index) => (
        <AccordionContainer key={index}>
          <AccordionHeader onClick={() => toggleAccordion(index)}>
            <AccordionTitle>
              {item.title}
              <AccordionSubtitle>{item.subtitle}</AccordionSubtitle>
            </AccordionTitle>
            <AccordionIcon $isOpen={openIndex === index}>▼</AccordionIcon>
          </AccordionHeader>
          <AccordionContent $isOpen={openIndex === index}>
            {item.content}
          </AccordionContent>
        </AccordionContainer>
      ))}
    </>
  );
}
