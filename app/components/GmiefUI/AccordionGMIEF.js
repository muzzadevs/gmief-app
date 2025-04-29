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

const TitleWrapper = styled.div`
  color: #42518c;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Subtitle = styled.span`
  color: grey;
  font-weight: 400;
  font-size: 12px;
`;

const AccordionContent = styled.div`
  background-color: #fff;
  padding: 1rem;
  font-size: 0.9rem;
  color: #555;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  border-top: 1px solid #ddd;
`;

const Arrow = styled.div`
  position: relative;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #42518c;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
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
            <TitleWrapper>
              {item.title}
              <Subtitle>{item.subtitle}</Subtitle>
            </TitleWrapper>
            <Arrow $isOpen={openIndex === index} />
          </AccordionHeader>
          <AccordionContent $isOpen={openIndex === index}>
            {item.content}
          </AccordionContent>
        </AccordionContainer>
      ))}
    </>
  );
}
