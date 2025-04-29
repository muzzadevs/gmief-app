import { useState, useEffect } from "react";
import styled from "styled-components";
import AccordionGMIEF from "../components/GmiefUI/AccordionGMIEF";

const StyledButton = styled.button`
  margin-top: 10px;
  background-color: #42518c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

export default function AccordionList({ iglesias }) {
  const [subzonas, setSubzonas] = useState({});

  useEffect(() => {
    const fetchSubzonas = async () => {
      const subzonaIds = [
        ...new Set(iglesias.map((iglesia) => iglesia.subzona_id)),
      ];
      const subzonaData = {};

      for (const id of subzonaIds) {
        try {
          const res = await fetch(`/api/subzonas/${id}`);
          if (res.ok) {
            const data = await res.json();
            subzonaData[id] = data.nombre;
          } else {
            console.error(`Error al obtener subzona con id ${id}`);
          }
        } catch (err) {
          console.error(err);
        }
      }

      setSubzonas(subzonaData);
    };

    fetchSubzonas();
  }, [iglesias]);

  const accordionItems = iglesias.map((iglesia) => ({
    title: `${iglesia.nombre} `,
    subtitle: `| ${subzonas[iglesia.subzona_id] || "Cargando..."}`,
    content: (
      <>
        <p>
          <strong>Dirección:</strong>{" "}
          {`${iglesia.direccion}, ${iglesia.municipio}, ${iglesia.provincia}, ${iglesia.cp}`}
        </p>

        <StyledButton
          onClick={() => alert(`Gestionar ministerios de ${iglesia.nombre}`)}
        >
          Gestionar Ministerios
        </StyledButton>
      </>
    ),
  }));

  return <AccordionGMIEF items={accordionItems} />;
}
